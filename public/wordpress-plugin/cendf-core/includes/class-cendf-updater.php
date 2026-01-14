<?php
/**
 * CENDF Auto-Updater
 * Système de mise à jour automatique depuis GitHub
 */

if (!defined('ABSPATH')) {
    exit;
}

class CENDF_Updater {
    
    private static $instance = null;
    
    // Configuration GitHub
    private $github_username = 'votre-username'; // À modifier
    private $github_repo = 'cendf-faith-hub';    // À modifier
    private $plugin_slug = 'cendf-core';
    private $theme_slug = 'cendf-theme';
    
    // Cache de 12 heures
    private $cache_time = 43200;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        // Hooks pour les mises à jour plugin
        add_filter('pre_set_site_transient_update_plugins', [$this, 'check_plugin_update']);
        add_filter('plugins_api', [$this, 'plugin_info'], 10, 3);
        add_filter('upgrader_post_install', [$this, 'after_plugin_install'], 10, 3);
        
        // Hooks pour les mises à jour thème
        add_filter('pre_set_site_transient_update_themes', [$this, 'check_theme_update']);
        
        // Page de configuration
        add_action('admin_menu', [$this, 'add_updater_menu']);
        add_action('admin_init', [$this, 'register_settings']);
        
        // Notice de mise à jour
        add_action('admin_notices', [$this, 'update_notice']);
        
        // AJAX pour forcer la vérification
        add_action('wp_ajax_cendf_check_updates', [$this, 'ajax_check_updates']);
        add_action('wp_ajax_cendf_force_update', [$this, 'ajax_force_update']);
    }
    
    /**
     * Obtenir la configuration GitHub depuis les options
     */
    private function get_github_config() {
        return [
            'username' => get_option('cendf_github_username', $this->github_username),
            'repo' => get_option('cendf_github_repo', $this->github_repo),
            'token' => get_option('cendf_github_token', ''), // Token privé optionnel
        ];
    }
    
    /**
     * Récupérer les infos de la dernière release GitHub
     */
    private function get_github_release() {
        $config = $this->get_github_config();
        $cache_key = 'cendf_github_release';
        
        // Vérifier le cache
        $cached = get_transient($cache_key);
        if ($cached !== false) {
            return $cached;
        }
        
        $url = sprintf(
            'https://api.github.com/repos/%s/%s/releases/latest',
            $config['username'],
            $config['repo']
        );
        
        $args = [
            'headers' => [
                'Accept' => 'application/vnd.github.v3+json',
                'User-Agent' => 'WordPress/' . get_bloginfo('version'),
            ],
            'timeout' => 10,
        ];
        
        // Ajouter le token si configuré (pour les repos privés)
        if (!empty($config['token'])) {
            $args['headers']['Authorization'] = 'token ' . $config['token'];
        }
        
        $response = wp_remote_get($url, $args);
        
        if (is_wp_error($response)) {
            return false;
        }
        
        $body = wp_remote_retrieve_body($response);
        $data = json_decode($body);
        
        if (empty($data) || isset($data->message)) {
            return false;
        }
        
        $release = [
            'version' => ltrim($data->tag_name, 'v'),
            'name' => $data->name,
            'body' => $data->body,
            'published_at' => $data->published_at,
            'html_url' => $data->html_url,
            'zipball_url' => $data->zipball_url,
            'assets' => [],
        ];
        
        // Récupérer les assets (ZIPs uploadés)
        if (!empty($data->assets)) {
            foreach ($data->assets as $asset) {
                $release['assets'][$asset->name] = [
                    'url' => $asset->browser_download_url,
                    'size' => $asset->size,
                ];
            }
        }
        
        // Mettre en cache
        set_transient($cache_key, $release, $this->cache_time);
        
        return $release;
    }
    
    /**
     * Vérifier les mises à jour du plugin
     */
    public function check_plugin_update($transient) {
        if (empty($transient->checked)) {
            return $transient;
        }
        
        $release = $this->get_github_release();
        if (!$release) {
            return $transient;
        }
        
        $plugin_file = $this->plugin_slug . '/cendf-core.php';
        $current_version = CENDF_VERSION;
        
        if (version_compare($release['version'], $current_version, '>')) {
            // Déterminer l'URL de téléchargement
            $download_url = $release['zipball_url'];
            
            // Préférer l'asset ZIP si disponible
            if (isset($release['assets'][$this->plugin_slug . '.zip'])) {
                $download_url = $release['assets'][$this->plugin_slug . '.zip']['url'];
            }
            
            $transient->response[$plugin_file] = (object) [
                'slug' => $this->plugin_slug,
                'new_version' => $release['version'],
                'url' => $release['html_url'],
                'package' => $download_url,
                'icons' => [
                    '1x' => CENDF_PLUGIN_URL . 'assets/images/icon-128.png',
                    '2x' => CENDF_PLUGIN_URL . 'assets/images/icon-256.png',
                ],
                'banners' => [
                    'low' => CENDF_PLUGIN_URL . 'assets/images/banner-772x250.png',
                    'high' => CENDF_PLUGIN_URL . 'assets/images/banner-1544x500.png',
                ],
            ];
        }
        
        return $transient;
    }
    
    /**
     * Informations du plugin pour la popup de détails
     */
    public function plugin_info($result, $action, $args) {
        if ($action !== 'plugin_information' || $args->slug !== $this->plugin_slug) {
            return $result;
        }
        
        $release = $this->get_github_release();
        if (!$release) {
            return $result;
        }
        
        $config = $this->get_github_config();
        
        return (object) [
            'name' => 'SCEDF Core',
            'slug' => $this->plugin_slug,
            'version' => $release['version'],
            'author' => '<a href="https://scedf-ci.org">SCEDF</a>',
            'homepage' => 'https://github.com/' . $config['username'] . '/' . $config['repo'],
            'requires' => '5.8',
            'tested' => '6.4',
            'requires_php' => '7.4',
            'downloaded' => 0,
            'last_updated' => $release['published_at'],
            'sections' => [
                'description' => 'Plugin principal pour la Sous-Commission Épiscopale pour la Doctrine de la Foi.',
                'changelog' => $this->parse_changelog($release['body']),
                'installation' => 'Mettez à jour via le bouton ci-dessus ou téléchargez depuis GitHub.',
            ],
            'download_link' => $release['zipball_url'],
            'banners' => [
                'low' => CENDF_PLUGIN_URL . 'assets/images/banner-772x250.png',
                'high' => CENDF_PLUGIN_URL . 'assets/images/banner-1544x500.png',
            ],
        ];
    }
    
    /**
     * Après installation - renommer le dossier
     */
    public function after_plugin_install($response, $hook_extra, $result) {
        global $wp_filesystem;
        
        if (!isset($hook_extra['plugin']) || strpos($hook_extra['plugin'], $this->plugin_slug) === false) {
            return $response;
        }
        
        $plugin_dir = WP_PLUGIN_DIR . '/' . $this->plugin_slug;
        
        // GitHub nomme les dossiers différemment, on doit renommer
        if (isset($result['destination']) && $result['destination'] !== $plugin_dir) {
            $wp_filesystem->move($result['destination'], $plugin_dir);
            $result['destination'] = $plugin_dir;
        }
        
        // Réactiver le plugin
        activate_plugin($this->plugin_slug . '/cendf-core.php');
        
        return $response;
    }
    
    /**
     * Vérifier les mises à jour du thème
     */
    public function check_theme_update($transient) {
        if (empty($transient->checked)) {
            return $transient;
        }
        
        $release = $this->get_github_release();
        if (!$release) {
            return $transient;
        }
        
        $theme = wp_get_theme($this->theme_slug);
        if (!$theme->exists()) {
            return $transient;
        }
        
        $current_version = $theme->get('Version');
        
        if (version_compare($release['version'], $current_version, '>')) {
            $download_url = $release['zipball_url'];
            
            if (isset($release['assets'][$this->theme_slug . '.zip'])) {
                $download_url = $release['assets'][$this->theme_slug . '.zip']['url'];
            }
            
            $transient->response[$this->theme_slug] = [
                'theme' => $this->theme_slug,
                'new_version' => $release['version'],
                'url' => $release['html_url'],
                'package' => $download_url,
            ];
        }
        
        return $transient;
    }
    
    /**
     * Convertir le markdown du changelog en HTML
     */
    private function parse_changelog($markdown) {
        if (empty($markdown)) {
            return '<p>Aucune note de version disponible.</p>';
        }
        
        // Conversion basique markdown -> HTML
        $html = $markdown;
        $html = preg_replace('/^### (.+)$/m', '<h4>$1</h4>', $html);
        $html = preg_replace('/^## (.+)$/m', '<h3>$1</h3>', $html);
        $html = preg_replace('/^# (.+)$/m', '<h2>$1</h2>', $html);
        $html = preg_replace('/\*\*(.+?)\*\*/', '<strong>$1</strong>', $html);
        $html = preg_replace('/\*(.+?)\*/', '<em>$1</em>', $html);
        $html = preg_replace('/^- (.+)$/m', '<li>$1</li>', $html);
        $html = preg_replace('/(<li>.*<\/li>)/s', '<ul>$1</ul>', $html);
        $html = nl2br($html);
        
        return $html;
    }
    
    /**
     * Ajouter le menu de configuration
     */
    public function add_updater_menu() {
        add_submenu_page(
            'cendf-dashboard',
            __('Mises à jour', 'cendf-core'),
            __('Mises à jour', 'cendf-core'),
            'manage_options',
            'cendf-updates',
            [$this, 'render_updates_page']
        );
    }
    
    /**
     * Enregistrer les paramètres
     */
    public function register_settings() {
        register_setting('cendf_updater', 'cendf_github_username');
        register_setting('cendf_updater', 'cendf_github_repo');
        register_setting('cendf_updater', 'cendf_github_token');
        register_setting('cendf_updater', 'cendf_auto_update');
    }
    
    /**
     * Afficher la notice de mise à jour
     */
    public function update_notice() {
        $release = $this->get_github_release();
        if (!$release) {
            return;
        }
        
        $current_version = CENDF_VERSION;
        
        if (version_compare($release['version'], $current_version, '>')) {
            ?>
            <div class="notice notice-info is-dismissible cendf-update-notice">
                <p>
                    <strong>🆕 SCEDF v<?php echo esc_html($release['version']); ?> disponible!</strong>
                    Vous utilisez la version <?php echo esc_html($current_version); ?>.
                    <a href="<?php echo admin_url('admin.php?page=cendf-updates'); ?>">
                        Voir les détails →
                    </a>
                </p>
            </div>
            <?php
        }
    }
    
    /**
     * Page de gestion des mises à jour
     */
    public function render_updates_page() {
        $release = $this->get_github_release();
        $config = $this->get_github_config();
        $current_plugin_version = CENDF_VERSION;
        
        $theme = wp_get_theme($this->theme_slug);
        $current_theme_version = $theme->exists() ? $theme->get('Version') : 'Non installé';
        
        include CENDF_PLUGIN_DIR . 'admin/views/updates.php';
    }
    
    /**
     * AJAX: Vérifier les mises à jour
     */
    public function ajax_check_updates() {
        check_ajax_referer('cendf_updates', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error('Permission denied');
        }
        
        // Supprimer le cache pour forcer la vérification
        delete_transient('cendf_github_release');
        
        $release = $this->get_github_release();
        
        if ($release) {
            wp_send_json_success([
                'version' => $release['version'],
                'name' => $release['name'],
                'published_at' => $release['published_at'],
                'current_plugin' => CENDF_VERSION,
                'update_available' => version_compare($release['version'], CENDF_VERSION, '>'),
            ]);
        } else {
            wp_send_json_error('Impossible de contacter GitHub');
        }
    }
    
    /**
     * AJAX: Forcer la mise à jour
     */
    public function ajax_force_update() {
        check_ajax_referer('cendf_updates', 'nonce');
        
        if (!current_user_can('update_plugins')) {
            wp_send_json_error('Permission denied');
        }
        
        // Supprimer les transients pour forcer la vérification
        delete_transient('cendf_github_release');
        delete_site_transient('update_plugins');
        delete_site_transient('update_themes');
        
        wp_send_json_success('Cache vidé. Rechargez la page pour voir les mises à jour.');
    }
}

// Initialiser
add_action('plugins_loaded', function() {
    CENDF_Updater::get_instance();
}, 15);
