<?php
/**
 * CENDF Theme Functions
 * 
 * Gestion avancée du thème WordPress pour l'application React
 * - Routes SPA
 * - SEO dynamique
 * - Preload ressources
 * - Service Worker
 */

// Empêcher l'accès direct
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Configuration du thème
 */
add_action('after_setup_theme', 'cendf_theme_setup');
function cendf_theme_setup() {
    // Support des fonctionnalités WordPress
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'script',
        'style'
    ));
    
    // Tailles d'images personnalisées
    add_image_size('cendf-hero', 1920, 1080, true);
    add_image_size('cendf-card', 600, 400, true);
    add_image_size('cendf-thumbnail', 300, 200, true);
    
    // Traductions
    load_theme_textdomain('cendf', get_template_directory() . '/languages');
}

/**
 * Rediriger toutes les requêtes frontend vers l'app React (SPA)
 */
add_action('template_redirect', 'cendf_spa_redirect');
function cendf_spa_redirect() {
    // Ne pas rediriger les requêtes API
    if (strpos($_SERVER['REQUEST_URI'], '/wp-json/') !== false) {
        return;
    }
    
    // Ne pas rediriger l'admin
    if (is_admin()) {
        return;
    }
    
    // Ne pas rediriger les fichiers statiques
    $extension = pathinfo($_SERVER['REQUEST_URI'], PATHINFO_EXTENSION);
    $static_extensions = array('js', 'css', 'png', 'jpg', 'jpeg', 'gif', 'svg', 'ico', 'woff', 'woff2', 'ttf', 'eot', 'mp3', 'mp4', 'pdf');
    if (in_array(strtolower($extension), $static_extensions)) {
        return;
    }
    
    // Ne pas rediriger les uploads
    if (strpos($_SERVER['REQUEST_URI'], '/wp-content/uploads/') !== false) {
        return;
    }
    
    // Ne pas rediriger wp-login et wp-admin
    if (strpos($_SERVER['REQUEST_URI'], 'wp-login') !== false || 
        strpos($_SERVER['REQUEST_URI'], 'wp-admin') !== false) {
        return;
    }
    
    // Tout le reste va vers index.php (React SPA)
}

/**
 * Personnaliser le titre de la page pour le SEO
 */
add_filter('document_title_parts', 'cendf_document_title');
function cendf_document_title($title) {
    $title['site'] = 'CENDF - Radio Espoir';
    
    // Personnaliser selon la route
    $path = trim($_SERVER['REQUEST_URI'], '/');
    $routes_titles = array(
        '' => 'Accueil',
        'actualites' => 'Actualités',
        'enseignements' => 'Enseignements',
        'radio' => 'Radio en Direct',
        'documents-archives' => 'Documents & Archives',
        'boutique' => 'Boutique',
        'contact' => 'Contact',
        'prieres' => 'Prières',
        'bible' => 'Bible en Ligne',
        'saint-du-jour' => 'Saint du Jour',
        'calendrier-liturgique' => 'Calendrier Liturgique',
        'missions' => 'Nos Missions',
        'activites' => 'Activités',
        'a-propos' => 'À Propos',
    );
    
    if (isset($routes_titles[$path])) {
        $title['title'] = $routes_titles[$path];
    }
    
    return $title;
}

/**
 * Ajouter les headers de sécurité et cache
 */
add_action('send_headers', 'cendf_security_headers');
function cendf_security_headers() {
    // Headers de sécurité
    header('X-Content-Type-Options: nosniff');
    header('X-Frame-Options: SAMEORIGIN');
    header('X-XSS-Protection: 1; mode=block');
    header('Referrer-Policy: strict-origin-when-cross-origin');
    
    // Cache pour les assets statiques
    if (preg_match('/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2)$/', $_SERVER['REQUEST_URI'])) {
        header('Cache-Control: public, max-age=31536000, immutable');
    }
}

/**
 * Enregistrer le Service Worker pour le mode offline
 */
add_action('wp_head', 'cendf_register_service_worker');
function cendf_register_service_worker() {
    $sw_path = get_template_directory() . '/dist/sw.js';
    if (file_exists($sw_path)) {
        ?>
        <script>
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                    navigator.serviceWorker.register('<?php echo get_template_directory_uri(); ?>/dist/sw.js')
                        .then(function(registration) {
                            console.log('CENDF ServiceWorker registered:', registration.scope);
                        })
                        .catch(function(error) {
                            console.log('CENDF ServiceWorker registration failed:', error);
                        });
                });
            }
        </script>
        <?php
    }
}

/**
 * Ajouter le manifest pour PWA
 */
add_action('wp_head', 'cendf_pwa_manifest');
function cendf_pwa_manifest() {
    $manifest_path = get_template_directory() . '/dist/manifest.json';
    if (file_exists($manifest_path)) {
        echo '<link rel="manifest" href="' . get_template_directory_uri() . '/dist/manifest.json">' . "\n";
    }
    
    // Theme color pour mobile
    echo '<meta name="theme-color" content="#1a1a2e">' . "\n";
    echo '<meta name="apple-mobile-web-app-capable" content="yes">' . "\n";
    echo '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">' . "\n";
}

/**
 * API: Récupérer la configuration du site
 */
add_action('rest_api_init', 'cendf_register_config_endpoint');
function cendf_register_config_endpoint() {
    register_rest_route('cendf/v1', '/config', array(
        'methods' => 'GET',
        'callback' => 'cendf_get_config',
        'permission_callback' => '__return_true',
    ));
}

function cendf_get_config() {
    $config = array(
        'site' => array(
            'name' => get_bloginfo('name'),
            'description' => get_bloginfo('description'),
            'url' => home_url(),
            'adminEmail' => get_option('admin_email'),
        ),
        'theme' => array(
            'url' => get_template_directory_uri(),
            'version' => cendf_get_build_version(),
        ),
        'radio' => array(
            'streamUrl' => get_option('cendf_radio_stream', 'https://stream.radioespoir.ci/live'),
            'name' => get_option('cendf_radio_name', 'Radio Espoir'),
        ),
        'contact' => array(
            'email' => get_option('cendf_contact_email', 'contact@cendf-ci.org'),
            'phone' => get_option('cendf_contact_phone', '+225 27 22 44 35 28'),
            'address' => get_option('cendf_contact_address', 'Cocody II Plateaux, Abidjan, Côte d\'Ivoire'),
        ),
        'social' => array(
            'facebook' => get_option('cendf_facebook', ''),
            'youtube' => get_option('cendf_youtube', ''),
            'twitter' => get_option('cendf_twitter', ''),
            'instagram' => get_option('cendf_instagram', ''),
            'whatsapp' => get_option('cendf_whatsapp', ''),
        ),
        'features' => array(
            'pwa' => file_exists(get_template_directory() . '/dist/sw.js'),
            'offline' => true,
        ),
    );
    
    return rest_ensure_response($config);
}

/**
 * Récupérer la version du build
 */
function cendf_get_build_version() {
    $version_file = get_template_directory() . '/dist/version.txt';
    if (file_exists($version_file)) {
        return trim(file_get_contents($version_file));
    }
    return '1.0.0';
}

/**
 * Nettoyer le head WordPress
 */
add_action('init', 'cendf_clean_head');
function cendf_clean_head() {
    // Retirer les éléments inutiles du head
    remove_action('wp_head', 'wp_generator');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
    remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('admin_print_scripts', 'print_emoji_detection_script');
    remove_action('admin_print_styles', 'print_emoji_styles');
}

/**
 * Désactiver l'éditeur de blocs pour ce thème
 */
add_filter('use_block_editor_for_post', '__return_false');

/**
 * Ajouter les types MIME pour les fichiers modernes
 */
add_filter('upload_mimes', 'cendf_custom_mimes');
function cendf_custom_mimes($mimes) {
    $mimes['svg'] = 'image/svg+xml';
    $mimes['webp'] = 'image/webp';
    $mimes['woff'] = 'font/woff';
    $mimes['woff2'] = 'font/woff2';
    return $mimes;
}
