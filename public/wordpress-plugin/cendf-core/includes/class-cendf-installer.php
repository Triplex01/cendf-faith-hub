<?php
/**
 * CENDF Installer - Assistant d'installation automatique
 * Gère l'installation automatique des dépendances et la configuration
 */

if (!defined('ABSPATH')) {
    exit;
}

class CENDF_Installer {
    
    private static $instance = null;
    
    // Plugins requis avec leurs URLs de téléchargement
    private $required_plugins = [
        'advanced-custom-fields' => [
            'name' => 'Advanced Custom Fields',
            'slug' => 'advanced-custom-fields',
            'file' => 'advanced-custom-fields/acf.php',
            'required' => true,
            'description' => 'Champs personnalisés pour les contenus',
        ],
        'acf-to-rest-api' => [
            'name' => 'ACF to REST API',
            'slug' => 'acf-to-rest-api',
            'file' => 'acf-to-rest-api/class-acf-to-rest-api.php',
            'required' => true,
            'description' => 'Expose les champs ACF via l\'API REST',
        ],
    ];
    
    // Plugins recommandés
    private $recommended_plugins = [
        'classic-editor' => [
            'name' => 'Classic Editor',
            'slug' => 'classic-editor',
            'file' => 'classic-editor/classic-editor.php',
            'required' => false,
            'description' => 'Interface d\'édition classique (recommandé)',
        ],
        'wordfence' => [
            'name' => 'Wordfence Security',
            'slug' => 'wordfence',
            'file' => 'wordfence/wordfence.php',
            'required' => false,
            'description' => 'Sécurité et pare-feu WordPress',
        ],
        'wp-super-cache' => [
            'name' => 'WP Super Cache',
            'slug' => 'wp-super-cache',
            'file' => 'wp-super-cache/wp-cache.php',
            'required' => false,
            'description' => 'Cache pour performances optimales',
        ],
    ];
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('admin_menu', [$this, 'add_installer_menu'], 5);
        add_action('admin_init', [$this, 'handle_installation']);
        add_action('admin_notices', [$this, 'show_setup_notice']);
        add_action('wp_ajax_cendf_check_plugins', [$this, 'ajax_check_plugins']);
        add_action('wp_ajax_cendf_install_plugin', [$this, 'ajax_install_plugin']);
        add_action('wp_ajax_cendf_run_setup', [$this, 'ajax_run_setup']);
    }
    
    /**
     * Ajouter le menu d'installation
     */
    public function add_installer_menu() {
        // Afficher seulement si l'installation n'est pas complète
        if (!$this->is_setup_complete()) {
            add_menu_page(
                __('Installation SCEDF', 'cendf-core'),
                __('🔧 Installation', 'cendf-core'),
                'manage_options',
                'cendf-installer',
                [$this, 'render_installer'],
                'dashicons-admin-generic',
                2
            );
        }
        
        // Toujours ajouter comme sous-menu de CENDF
        add_submenu_page(
            'cendf-dashboard',
            __('Assistant d\'installation', 'cendf-core'),
            __('Installation', 'cendf-core'),
            'manage_options',
            'cendf-installer',
            [$this, 'render_installer']
        );
    }
    
    /**
     * Afficher une notice si l'installation n'est pas complète
     */
    public function show_setup_notice() {
        if ($this->is_setup_complete()) {
            return;
        }
        
        $screen = get_current_screen();
        if ($screen && $screen->id === 'toplevel_page_cendf-installer') {
            return;
        }
        
        $missing = $this->get_missing_required_plugins();
        if (empty($missing)) {
            return;
        }
        
        ?>
        <div class="notice notice-warning is-dismissible">
            <p>
                <strong>⚠️ SCEDF - Configuration requise:</strong>
                Des plugins essentiels sont manquants.
                <a href="<?php echo admin_url('admin.php?page=cendf-installer'); ?>">
                    Lancer l'assistant d'installation →
                </a>
            </p>
        </div>
        <?php
    }
    
    /**
     * Vérifier si l'installation est complète
     */
    public function is_setup_complete() {
        // Vérifier les plugins requis
        if (!empty($this->get_missing_required_plugins())) {
            return false;
        }
        
        // Vérifier si le thème est actif
        $theme = wp_get_theme();
        if ($theme->get_template() !== 'cendf-theme') {
            // Le thème n'est pas obligatoire mais recommandé
        }
        
        // Vérifier les permaliens
        if (get_option('permalink_structure') === '') {
            return false;
        }
        
        // Vérifier l'option de setup
        return get_option('cendf_setup_complete', false);
    }
    
    /**
     * Obtenir les plugins requis manquants
     */
    public function get_missing_required_plugins() {
        $missing = [];
        foreach ($this->required_plugins as $key => $plugin) {
            if (!is_plugin_active($plugin['file'])) {
                $missing[$key] = $plugin;
            }
        }
        return $missing;
    }
    
    /**
     * Obtenir le statut de tous les plugins
     */
    public function get_all_plugins_status() {
        include_once ABSPATH . 'wp-admin/includes/plugin.php';
        
        $status = [
            'required' => [],
            'recommended' => [],
        ];
        
        foreach ($this->required_plugins as $key => $plugin) {
            $status['required'][$key] = [
                'name' => $plugin['name'],
                'description' => $plugin['description'],
                'installed' => file_exists(WP_PLUGIN_DIR . '/' . $plugin['file']),
                'active' => is_plugin_active($plugin['file']),
                'slug' => $plugin['slug'],
            ];
        }
        
        foreach ($this->recommended_plugins as $key => $plugin) {
            $status['recommended'][$key] = [
                'name' => $plugin['name'],
                'description' => $plugin['description'],
                'installed' => file_exists(WP_PLUGIN_DIR . '/' . $plugin['file']),
                'active' => is_plugin_active($plugin['file']),
                'slug' => $plugin['slug'],
            ];
        }
        
        return $status;
    }
    
    /**
     * Afficher la page d'installation
     */
    public function render_installer() {
        $plugins_status = $this->get_all_plugins_status();
        $is_complete = $this->is_setup_complete();
        $theme = wp_get_theme();
        $theme_active = ($theme->get_template() === 'cendf-theme');
        $permalinks_ok = (get_option('permalink_structure') !== '');
        $build_exists = file_exists(get_theme_root() . '/cendf-theme/dist/index.html');
        
        include CENDF_PLUGIN_DIR . 'admin/views/installer.php';
    }
    
    /**
     * Gérer les actions d'installation
     */
    public function handle_installation() {
        if (!isset($_POST['cendf_install_action'])) {
            return;
        }
        
        if (!wp_verify_nonce($_POST['_wpnonce'], 'cendf_install')) {
            return;
        }
        
        if (!current_user_can('manage_options')) {
            return;
        }
        
        $action = sanitize_text_field($_POST['cendf_install_action']);
        
        switch ($action) {
            case 'complete_setup':
                update_option('cendf_setup_complete', true);
                flush_rewrite_rules();
                wp_redirect(admin_url('admin.php?page=cendf-dashboard&setup=complete'));
                exit;
                
            case 'reset_setup':
                delete_option('cendf_setup_complete');
                wp_redirect(admin_url('admin.php?page=cendf-installer'));
                exit;
        }
    }
    
    /**
     * AJAX: Vérifier le statut des plugins
     */
    public function ajax_check_plugins() {
        check_ajax_referer('cendf_installer', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error('Permission denied');
        }
        
        wp_send_json_success($this->get_all_plugins_status());
    }
    
    /**
     * AJAX: Installer un plugin
     */
    public function ajax_install_plugin() {
        check_ajax_referer('cendf_installer', 'nonce');
        
        if (!current_user_can('install_plugins')) {
            wp_send_json_error('Permission denied');
        }
        
        $plugin_slug = sanitize_text_field($_POST['plugin_slug']);
        
        // Trouver le plugin
        $plugin = null;
        foreach (array_merge($this->required_plugins, $this->recommended_plugins) as $key => $p) {
            if ($p['slug'] === $plugin_slug) {
                $plugin = $p;
                break;
            }
        }
        
        if (!$plugin) {
            wp_send_json_error('Plugin not found');
        }
        
        // Installer le plugin
        include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
        include_once ABSPATH . 'wp-admin/includes/plugin-install.php';
        
        $api = plugins_api('plugin_information', [
            'slug' => $plugin_slug,
            'fields' => ['sections' => false],
        ]);
        
        if (is_wp_error($api)) {
            wp_send_json_error($api->get_error_message());
        }
        
        $upgrader = new Plugin_Upgrader(new WP_Ajax_Upgrader_Skin());
        $result = $upgrader->install($api->download_link);
        
        if (is_wp_error($result)) {
            wp_send_json_error($result->get_error_message());
        }
        
        // Activer le plugin
        $activate = activate_plugin($plugin['file']);
        
        if (is_wp_error($activate)) {
            wp_send_json_success([
                'installed' => true,
                'activated' => false,
                'message' => 'Plugin installé mais non activé: ' . $activate->get_error_message(),
            ]);
        }
        
        wp_send_json_success([
            'installed' => true,
            'activated' => true,
            'message' => 'Plugin installé et activé avec succès',
        ]);
    }
    
    /**
     * AJAX: Lancer la configuration automatique
     */
    public function ajax_run_setup() {
        check_ajax_referer('cendf_installer', 'nonce');
        
        if (!current_user_can('manage_options')) {
            wp_send_json_error('Permission denied');
        }
        
        $steps = [];
        
        // Étape 1: Permaliens
        if (get_option('permalink_structure') === '') {
            update_option('permalink_structure', '/%postname%/');
            flush_rewrite_rules();
            $steps[] = ['name' => 'Permaliens', 'status' => 'success'];
        } else {
            $steps[] = ['name' => 'Permaliens', 'status' => 'already_done'];
        }
        
        // Étape 2: Fuseau horaire
        if (get_option('timezone_string') === '') {
            update_option('timezone_string', 'Africa/Abidjan');
            $steps[] = ['name' => 'Fuseau horaire', 'status' => 'success'];
        } else {
            $steps[] = ['name' => 'Fuseau horaire', 'status' => 'already_done'];
        }
        
        // Étape 3: Format de date français
        update_option('date_format', 'd/m/Y');
        update_option('time_format', 'H:i');
        $steps[] = ['name' => 'Format de date', 'status' => 'success'];
        
        // Étape 4: Flush rewrite rules
        flush_rewrite_rules();
        $steps[] = ['name' => 'Règles de réécriture', 'status' => 'success'];
        
        // Étape 5: Créer les catégories par défaut
        $this->create_default_terms();
        $steps[] = ['name' => 'Catégories par défaut', 'status' => 'success'];
        
        // Marquer comme complet
        update_option('cendf_setup_complete', true);
        
        wp_send_json_success([
            'steps' => $steps,
            'complete' => true,
        ]);
    }
    
    /**
     * Créer les termes par défaut
     */
    private function create_default_terms() {
        // Catégories d'enseignements
        $teaching_cats = ['Doctrine', 'Théologie', 'Morale', 'Liturgie', 'Spiritualité', 'Catéchèse'];
        foreach ($teaching_cats as $cat) {
            if (!term_exists($cat, 'teaching_category')) {
                wp_insert_term($cat, 'teaching_category');
            }
        }
        
        // Catégories de documents
        $doc_cats = ['Encycliques', 'Lettres pastorales', 'Homélies', 'Décrets', 'Communiqués'];
        foreach ($doc_cats as $cat) {
            if (!term_exists($cat, 'document_category')) {
                wp_insert_term($cat, 'document_category');
            }
        }
        
        // Catégories de produits
        $prod_cats = ['Livres', 'Chapelets', 'Médailles', 'Articles religieux'];
        foreach ($prod_cats as $cat) {
            if (!term_exists($cat, 'product_category')) {
                wp_insert_term($cat, 'product_category');
            }
        }
    }
    
    /**
     * Générer les fichiers JSON ACF pour export
     */
    public static function export_acf_json() {
        if (!function_exists('acf_get_field_groups')) {
            return false;
        }
        
        $groups = acf_get_field_groups();
        $export = [];
        
        foreach ($groups as $group) {
            if (strpos($group['key'], 'group_') === 0) {
                $group['fields'] = acf_get_fields($group['key']);
                $export[] = $group;
            }
        }
        
        return $export;
    }
}

// Initialiser
add_action('plugins_loaded', function() {
    CENDF_Installer::get_instance();
}, 5);
