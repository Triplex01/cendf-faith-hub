<?php
/**
 * Sécurité et CORS
 */

if (!defined('ABSPATH')) {
    exit;
}

class CENDF_Security {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('rest_api_init', [$this, 'add_cors_headers'], 15);
        add_filter('rest_pre_serve_request', [$this, 'handle_preflight'], 10, 4);
        
        // Sécurité supplémentaire
        add_filter('rest_endpoints', [$this, 'restrict_user_endpoints']);
        add_action('init', [$this, 'rate_limiting']);
    }
    
    /**
     * Ajouter les headers CORS
     */
    public function add_cors_headers() {
        // Origines autorisées
        $allowed_origins = $this->get_allowed_origins();
        
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
        
        // Vérifier si l'origine est autorisée
        if (in_array($origin, $allowed_origins) || $this->is_localhost($origin)) {
            header("Access-Control-Allow-Origin: $origin");
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
            header("Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce, X-Requested-With");
            header("Access-Control-Allow-Credentials: true");
            header("Access-Control-Max-Age: 86400");
        }
    }
    
    /**
     * Gérer les requêtes preflight OPTIONS
     */
    public function handle_preflight($served, $result, $request, $server) {
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
            $allowed_origins = $this->get_allowed_origins();
            
            if (in_array($origin, $allowed_origins) || $this->is_localhost($origin)) {
                header("Access-Control-Allow-Origin: $origin");
                header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
                header("Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce, X-Requested-With");
                header("Access-Control-Allow-Credentials: true");
                header("Access-Control-Max-Age: 86400");
                header("Content-Length: 0");
                header("Content-Type: text/plain");
                exit(0);
            }
        }
        return $served;
    }
    
    /**
     * Origines autorisées
     */
    private function get_allowed_origins() {
        $origins = [
            home_url(),
            'https://cendf-ci.org',
            'https://www.cendf-ci.org',
            'https://radioespoir.ci',
        ];
        
        // Ajouter des origines personnalisées depuis les options
        $custom = get_option('cendf_cors_origins', '');
        if ($custom) {
            $custom_origins = array_map('trim', explode("\n", $custom));
            $origins = array_merge($origins, $custom_origins);
        }
        
        return array_filter($origins);
    }
    
    /**
     * Vérifier si localhost (pour le développement)
     */
    private function is_localhost($origin) {
        $localhost_patterns = [
            'http://localhost',
            'http://127.0.0.1',
            'https://localhost',
            'https://127.0.0.1',
        ];
        
        foreach ($localhost_patterns as $pattern) {
            if (strpos($origin, $pattern) === 0) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Restreindre les endpoints users
     */
    public function restrict_user_endpoints($endpoints) {
        // Supprimer l'endpoint users pour éviter l'énumération
        if (isset($endpoints['/wp/v2/users'])) {
            unset($endpoints['/wp/v2/users']);
        }
        if (isset($endpoints['/wp/v2/users/(?P<id>[\d]+)'])) {
            unset($endpoints['/wp/v2/users/(?P<id>[\d]+)']);
        }
        
        return $endpoints;
    }
    
    /**
     * Rate limiting basique
     */
    public function rate_limiting() {
        // Uniquement pour les requêtes API
        if (strpos($_SERVER['REQUEST_URI'], '/wp-json/') === false) {
            return;
        }
        
        $ip = $this->get_client_ip();
        $transient_key = 'cendf_rate_' . md5($ip);
        $limit = 100; // Requêtes par minute
        $window = 60; // Secondes
        
        $current = get_transient($transient_key);
        
        if ($current === false) {
            set_transient($transient_key, 1, $window);
        } elseif ($current >= $limit) {
            header('HTTP/1.1 429 Too Many Requests');
            header('Retry-After: ' . $window);
            wp_die('Trop de requêtes. Veuillez patienter.', 'Rate Limit', ['response' => 429]);
        } else {
            set_transient($transient_key, $current + 1, $window);
        }
    }
    
    /**
     * Obtenir l'IP du client
     */
    private function get_client_ip() {
        $ip_keys = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
        
        foreach ($ip_keys as $key) {
            if (!empty($_SERVER[$key])) {
                $ip = $_SERVER[$key];
                // Prendre la première IP si plusieurs
                if (strpos($ip, ',') !== false) {
                    $ip = trim(explode(',', $ip)[0]);
                }
                if (filter_var($ip, FILTER_VALIDATE_IP)) {
                    return $ip;
                }
            }
        }
        
        return '0.0.0.0';
    }
}
