<?php
/**
 * Plugin Name: CENDF Core
 * Plugin URI: https://cendf-ci.org
 * Description: Plugin principal pour la Commission Épiscopale pour la Doctrine de la Foi - Radio Espoir. Gère les CPT, API REST, et options.
 * Version: 1.0.0
 * Author: CENDF
 * Author URI: https://cendf-ci.org
 * License: GPL v2 or later
 * Text Domain: cendf-core
 * Domain Path: /languages
 */

if (!defined('ABSPATH')) {
    exit;
}

// Définitions
define('CENDF_VERSION', '1.0.0');
define('CENDF_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('CENDF_PLUGIN_URL', plugin_dir_url(__FILE__));

// Chargement des modules
require_once CENDF_PLUGIN_DIR . 'includes/class-cendf-cpt.php';
require_once CENDF_PLUGIN_DIR . 'includes/class-cendf-api.php';
require_once CENDF_PLUGIN_DIR . 'includes/class-cendf-options.php';
require_once CENDF_PLUGIN_DIR . 'includes/class-cendf-acf.php';
require_once CENDF_PLUGIN_DIR . 'includes/class-cendf-security.php';

/**
 * Classe principale du plugin
 */
class CENDF_Core {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('plugins_loaded', [$this, 'init']);
        register_activation_hook(__FILE__, [$this, 'activate']);
        register_deactivation_hook(__FILE__, [$this, 'deactivate']);
    }
    
    public function init() {
        // Charger les traductions
        load_plugin_textdomain('cendf-core', false, dirname(plugin_basename(__FILE__)) . '/languages');
        
        // Initialiser les modules
        CENDF_CPT::get_instance();
        CENDF_API::get_instance();
        CENDF_Options::get_instance();
        CENDF_ACF::get_instance();
        CENDF_Security::get_instance();
        
        // Actions admin
        add_action('admin_menu', [$this, 'add_admin_menu']);
        add_action('admin_enqueue_scripts', [$this, 'admin_scripts']);
    }
    
    public function activate() {
        // Créer les tables personnalisées si nécessaire
        $this->create_tables();
        
        // Flush rewrite rules
        flush_rewrite_rules();
        
        // Options par défaut
        $default_options = [
            'cendf_site_name' => 'CENDF - Radio Espoir',
            'cendf_radio_stream_url' => '',
            'cendf_contact_email' => 'contact@cendf-ci.org',
            'cendf_facebook_url' => '',
            'cendf_youtube_url' => '',
            'cendf_whatsapp' => '',
            'cendf_address' => '',
            'cendf_phone' => '',
        ];
        
        foreach ($default_options as $key => $value) {
            if (get_option($key) === false) {
                add_option($key, $value);
            }
        }
    }
    
    public function deactivate() {
        flush_rewrite_rules();
    }
    
    private function create_tables() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();
        
        // Table pour les paiements
        $table_payments = $wpdb->prefix . 'cendf_payments';
        $sql_payments = "CREATE TABLE IF NOT EXISTS $table_payments (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            order_id varchar(100) NOT NULL,
            amount decimal(10,2) NOT NULL,
            currency varchar(10) DEFAULT 'XOF',
            payment_method varchar(50) NOT NULL,
            phone_number varchar(20),
            email varchar(100),
            status varchar(20) DEFAULT 'pending',
            transaction_id varchar(100),
            metadata longtext,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY order_id (order_id),
            KEY status (status)
        ) $charset_collate;";
        
        // Table pour les abonnés newsletter
        $table_subscribers = $wpdb->prefix . 'cendf_subscribers';
        $sql_subscribers = "CREATE TABLE IF NOT EXISTS $table_subscribers (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            email varchar(100) NOT NULL UNIQUE,
            name varchar(100),
            status varchar(20) DEFAULT 'active',
            subscribed_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY email (email)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql_payments);
        dbDelta($sql_subscribers);
    }
    
    public function add_admin_menu() {
        add_menu_page(
            __('CENDF', 'cendf-core'),
            __('CENDF', 'cendf-core'),
            'manage_options',
            'cendf-dashboard',
            [$this, 'render_dashboard'],
            'dashicons-megaphone',
            30
        );
        
        add_submenu_page(
            'cendf-dashboard',
            __('Tableau de bord', 'cendf-core'),
            __('Tableau de bord', 'cendf-core'),
            'manage_options',
            'cendf-dashboard',
            [$this, 'render_dashboard']
        );
        
        add_submenu_page(
            'cendf-dashboard',
            __('Paramètres', 'cendf-core'),
            __('Paramètres', 'cendf-core'),
            'manage_options',
            'cendf-settings',
            [$this, 'render_settings']
        );
        
        add_submenu_page(
            'cendf-dashboard',
            __('Bandeau défilant', 'cendf-core'),
            __('Bandeau défilant', 'cendf-core'),
            'manage_options',
            'cendf-ticker',
            [$this, 'render_ticker']
        );
    }
    
    public function admin_scripts($hook) {
        if (strpos($hook, 'cendf') === false) {
            return;
        }
        
        wp_enqueue_style('cendf-admin', CENDF_PLUGIN_URL . 'assets/css/admin.css', [], CENDF_VERSION);
        wp_enqueue_script('cendf-admin', CENDF_PLUGIN_URL . 'assets/js/admin.js', ['jquery'], CENDF_VERSION, true);
    }
    
    public function render_dashboard() {
        include CENDF_PLUGIN_DIR . 'admin/views/dashboard.php';
    }
    
    public function render_settings() {
        include CENDF_PLUGIN_DIR . 'admin/views/settings.php';
    }
    
    public function render_ticker() {
        include CENDF_PLUGIN_DIR . 'admin/views/ticker.php';
    }
}

// Initialisation
CENDF_Core::get_instance();
