<?php
/**
 * Endpoints REST API personnalisés
 */

if (!defined('ABSPATH')) {
    exit;
}

class CENDF_API {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('rest_api_init', [$this, 'register_routes']);
        add_filter('rest_prepare_post', [$this, 'add_acf_to_response'], 10, 3);
        add_filter('rest_prepare_event', [$this, 'add_acf_to_response'], 10, 3);
        add_filter('rest_prepare_podcast', [$this, 'add_acf_to_response'], 10, 3);
        add_filter('rest_prepare_program', [$this, 'add_acf_to_response'], 10, 3);
        add_filter('rest_prepare_animator', [$this, 'add_acf_to_response'], 10, 3);
        add_filter('rest_prepare_teaching', [$this, 'add_acf_to_response'], 10, 3);
        add_filter('rest_prepare_document', [$this, 'add_acf_to_response'], 10, 3);
        add_filter('rest_prepare_archive_item', [$this, 'add_acf_to_response'], 10, 3);
        add_filter('rest_prepare_product', [$this, 'add_acf_to_response'], 10, 3);
        add_filter('rest_prepare_activity', [$this, 'add_acf_to_response'], 10, 3);
    }
    
    public function register_routes() {
        $namespace = 'cendf/v1';
        
        // === TICKER / BANDEAU DÉFILANT ===
        register_rest_route($namespace, '/ticker', [
            'methods' => 'GET',
            'callback' => [$this, 'get_ticker'],
            'permission_callback' => '__return_true',
        ]);
        
        // === PARAMÈTRES DU SITE ===
        register_rest_route($namespace, '/settings', [
            'methods' => 'GET',
            'callback' => [$this, 'get_settings'],
            'permission_callback' => '__return_true',
        ]);
        
        // === RÉSEAUX SOCIAUX ===
        register_rest_route($namespace, '/social', [
            'methods' => 'GET',
            'callback' => [$this, 'get_social'],
            'permission_callback' => '__return_true',
        ]);
        
        // === CONTACT ===
        register_rest_route($namespace, '/contact', [
            'methods' => 'POST',
            'callback' => [$this, 'submit_contact'],
            'permission_callback' => '__return_true',
            'args' => [
                'name' => ['required' => true, 'sanitize_callback' => 'sanitize_text_field'],
                'email' => ['required' => true, 'sanitize_callback' => 'sanitize_email'],
                'message' => ['required' => true, 'sanitize_callback' => 'sanitize_textarea_field'],
                'subject' => ['required' => false, 'sanitize_callback' => 'sanitize_text_field'],
            ],
        ]);
        
        // === NEWSLETTER ===
        register_rest_route($namespace, '/newsletter/subscribe', [
            'methods' => 'POST',
            'callback' => [$this, 'newsletter_subscribe'],
            'permission_callback' => '__return_true',
            'args' => [
                'email' => ['required' => true, 'sanitize_callback' => 'sanitize_email'],
                'name' => ['required' => false, 'sanitize_callback' => 'sanitize_text_field'],
            ],
        ]);
        
        // === PAIEMENTS ===
        register_rest_route($namespace, '/payment/initiate', [
            'methods' => 'POST',
            'callback' => [$this, 'initiate_payment'],
            'permission_callback' => '__return_true',
        ]);
        
        register_rest_route($namespace, '/payment/verify', [
            'methods' => 'POST',
            'callback' => [$this, 'verify_payment'],
            'permission_callback' => '__return_true',
        ]);
        
        // === RECHERCHE GLOBALE ===
        register_rest_route($namespace, '/search', [
            'methods' => 'GET',
            'callback' => [$this, 'global_search'],
            'permission_callback' => '__return_true',
            'args' => [
                'q' => ['required' => true, 'sanitize_callback' => 'sanitize_text_field'],
            ],
        ]);
        
        // === SITEMAP JSON ===
        register_rest_route($namespace, '/sitemap', [
            'methods' => 'GET',
            'callback' => [$this, 'get_sitemap'],
            'permission_callback' => '__return_true',
        ]);
        
        // === STATISTIQUES (admin) ===
        register_rest_route($namespace, '/stats', [
            'methods' => 'GET',
            'callback' => [$this, 'get_stats'],
            'permission_callback' => function() {
                return current_user_can('manage_options');
            },
        ]);
    }
    
    /**
     * Ajouter les champs ACF à la réponse REST
     */
    public function add_acf_to_response($response, $post, $request) {
        if (function_exists('get_fields')) {
            $acf = get_fields($post->ID);
            if ($acf) {
                $response->data['acf'] = $acf;
            }
        }
        
        // Ajouter l'URL de l'image à la une directement
        if (has_post_thumbnail($post->ID)) {
            $response->data['featured_image_url'] = get_the_post_thumbnail_url($post->ID, 'large');
        }
        
        return $response;
    }
    
    /**
     * Récupérer les messages du bandeau défilant
     */
    public function get_ticker() {
        $messages = get_option('cendf_ticker_messages', []);
        
        if (empty($messages)) {
            // Messages par défaut
            $messages = [
                ['text' => 'Bienvenue sur CENDF - Radio Espoir', 'active' => true],
                ['text' => 'Écoutez-nous en direct 24h/24', 'active' => true],
            ];
        }
        
        // Filtrer les messages actifs
        $active = array_filter($messages, function($m) {
            return !empty($m['active']);
        });
        
        return rest_ensure_response([
            'messages' => array_values($active),
            'speed' => get_option('cendf_ticker_speed', 'normal'),
        ]);
    }
    
    /**
     * Récupérer les paramètres du site
     */
    public function get_settings() {
        return rest_ensure_response([
            'site_name' => get_option('cendf_site_name', 'CENDF - Radio Espoir'),
            'tagline' => get_bloginfo('description'),
            'radio_stream_url' => get_option('cendf_radio_stream_url', ''),
            'contact_email' => get_option('cendf_contact_email', ''),
            'phone' => get_option('cendf_phone', ''),
            'address' => get_option('cendf_address', ''),
            'logo_url' => get_option('cendf_logo_url', ''),
        ]);
    }
    
    /**
     * Récupérer les liens réseaux sociaux
     */
    public function get_social() {
        return rest_ensure_response([
            'facebook' => get_option('cendf_facebook_url', ''),
            'youtube' => get_option('cendf_youtube_url', ''),
            'twitter' => get_option('cendf_twitter_url', ''),
            'instagram' => get_option('cendf_instagram_url', ''),
            'whatsapp' => get_option('cendf_whatsapp', ''),
        ]);
    }
    
    /**
     * Soumettre le formulaire de contact
     */
    public function submit_contact($request) {
        $name = $request->get_param('name');
        $email = $request->get_param('email');
        $message = $request->get_param('message');
        $subject = $request->get_param('subject') ?: 'Nouveau message de contact';
        
        // Validation
        if (!is_email($email)) {
            return new WP_Error('invalid_email', 'Email invalide', ['status' => 400]);
        }
        
        if (strlen($message) < 10) {
            return new WP_Error('message_too_short', 'Message trop court (min. 10 caractères)', ['status' => 400]);
        }
        
        // Honeypot check
        if ($request->get_param('website')) {
            return new WP_Error('spam_detected', 'Spam détecté', ['status' => 400]);
        }
        
        // Envoyer l'email
        $to = get_option('cendf_contact_email', get_option('admin_email'));
        $headers = [
            'Content-Type: text/html; charset=UTF-8',
            'From: ' . get_bloginfo('name') . ' <noreply@' . parse_url(home_url(), PHP_URL_HOST) . '>',
            'Reply-To: ' . $name . ' <' . $email . '>',
        ];
        
        $body = sprintf(
            '<h2>Nouveau message de contact</h2>
            <p><strong>Nom:</strong> %s</p>
            <p><strong>Email:</strong> %s</p>
            <p><strong>Message:</strong></p>
            <p>%s</p>',
            esc_html($name),
            esc_html($email),
            nl2br(esc_html($message))
        );
        
        $sent = wp_mail($to, $subject, $body, $headers);
        
        if ($sent) {
            return rest_ensure_response(['success' => true, 'message' => 'Message envoyé avec succès']);
        } else {
            return new WP_Error('email_failed', 'Erreur lors de l\'envoi', ['status' => 500]);
        }
    }
    
    /**
     * Inscription newsletter
     */
    public function newsletter_subscribe($request) {
        global $wpdb;
        
        $email = $request->get_param('email');
        $name = $request->get_param('name') ?: '';
        
        if (!is_email($email)) {
            return new WP_Error('invalid_email', 'Email invalide', ['status' => 400]);
        }
        
        $table = $wpdb->prefix . 'cendf_subscribers';
        
        // Vérifier si déjà inscrit
        $exists = $wpdb->get_var($wpdb->prepare(
            "SELECT id FROM $table WHERE email = %s",
            $email
        ));
        
        if ($exists) {
            return rest_ensure_response(['success' => true, 'message' => 'Vous êtes déjà inscrit']);
        }
        
        // Insérer
        $inserted = $wpdb->insert($table, [
            'email' => $email,
            'name' => $name,
            'status' => 'active',
        ]);
        
        if ($inserted) {
            return rest_ensure_response(['success' => true, 'message' => 'Inscription réussie']);
        }
        
        return new WP_Error('insert_failed', 'Erreur lors de l\'inscription', ['status' => 500]);
    }
    
    /**
     * Initier un paiement
     */
    public function initiate_payment($request) {
        global $wpdb;
        
        $amount = floatval($request->get_param('amount'));
        $method = sanitize_text_field($request->get_param('method')); // orange_money, wave, etc.
        $phone = sanitize_text_field($request->get_param('phone'));
        $email = sanitize_email($request->get_param('email'));
        $product_id = intval($request->get_param('product_id'));
        
        if ($amount <= 0) {
            return new WP_Error('invalid_amount', 'Montant invalide', ['status' => 400]);
        }
        
        // Générer un ID de commande unique
        $order_id = 'CENDF-' . time() . '-' . wp_rand(1000, 9999);
        
        $table = $wpdb->prefix . 'cendf_payments';
        
        $inserted = $wpdb->insert($table, [
            'order_id' => $order_id,
            'amount' => $amount,
            'currency' => 'XOF',
            'payment_method' => $method,
            'phone_number' => $phone,
            'email' => $email,
            'status' => 'pending',
            'metadata' => json_encode(['product_id' => $product_id]),
        ]);
        
        if (!$inserted) {
            return new WP_Error('db_error', 'Erreur base de données', ['status' => 500]);
        }
        
        // Retourner les infos pour le frontend (à compléter avec l'API du provider)
        return rest_ensure_response([
            'success' => true,
            'order_id' => $order_id,
            'amount' => $amount,
            'currency' => 'XOF',
            'method' => $method,
            // URL de paiement à générer selon le provider
            'payment_url' => null,
            'instructions' => $this->get_payment_instructions($method, $phone, $amount),
        ]);
    }
    
    private function get_payment_instructions($method, $phone, $amount) {
        switch ($method) {
            case 'orange_money':
                return sprintf(
                    'Composez #144*82# puis entrez le montant %s XOF pour valider le paiement.',
                    number_format($amount, 0, ',', ' ')
                );
            case 'wave':
                return sprintf(
                    'Ouvrez Wave, scannez le QR code ou envoyez %s XOF au numéro affiché.',
                    number_format($amount, 0, ',', ' ')
                );
            default:
                return 'Suivez les instructions de paiement.';
        }
    }
    
    /**
     * Vérifier le statut d'un paiement
     */
    public function verify_payment($request) {
        global $wpdb;
        
        $order_id = sanitize_text_field($request->get_param('order_id'));
        
        $table = $wpdb->prefix . 'cendf_payments';
        $payment = $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table WHERE order_id = %s",
            $order_id
        ));
        
        if (!$payment) {
            return new WP_Error('not_found', 'Paiement introuvable', ['status' => 404]);
        }
        
        return rest_ensure_response([
            'order_id' => $payment->order_id,
            'status' => $payment->status,
            'amount' => floatval($payment->amount),
            'method' => $payment->payment_method,
            'created_at' => $payment->created_at,
        ]);
    }
    
    /**
     * Recherche globale
     */
    public function global_search($request) {
        $query = $request->get_param('q');
        $per_page = min(intval($request->get_param('per_page') ?: 10), 50);
        
        $post_types = ['post', 'event', 'podcast', 'teaching', 'document', 'product', 'activity'];
        
        $args = [
            's' => $query,
            'post_type' => $post_types,
            'posts_per_page' => $per_page,
            'post_status' => 'publish',
        ];
        
        $search_query = new WP_Query($args);
        $results = [];
        
        foreach ($search_query->posts as $post) {
            $results[] = [
                'id' => $post->ID,
                'title' => $post->post_title,
                'excerpt' => wp_trim_words(strip_tags($post->post_content), 20),
                'type' => $post->post_type,
                'url' => get_permalink($post),
                'date' => $post->post_date,
                'thumbnail' => get_the_post_thumbnail_url($post->ID, 'medium'),
            ];
        }
        
        return rest_ensure_response([
            'query' => $query,
            'total' => $search_query->found_posts,
            'results' => $results,
        ]);
    }
    
    /**
     * Sitemap JSON
     */
    public function get_sitemap() {
        $post_types = ['post', 'page', 'event', 'podcast', 'program', 'teaching', 'document', 'product', 'activity'];
        $sitemap = [];
        
        foreach ($post_types as $type) {
            $posts = get_posts([
                'post_type' => $type,
                'posts_per_page' => 100,
                'post_status' => 'publish',
            ]);
            
            foreach ($posts as $post) {
                $sitemap[] = [
                    'loc' => get_permalink($post),
                    'lastmod' => get_the_modified_date('c', $post),
                    'type' => $type,
                ];
            }
        }
        
        return rest_ensure_response($sitemap);
    }
    
    /**
     * Statistiques admin
     */
    public function get_stats() {
        global $wpdb;
        
        $stats = [
            'posts' => wp_count_posts('post')->publish,
            'events' => wp_count_posts('event')->publish,
            'podcasts' => wp_count_posts('podcast')->publish,
            'teachings' => wp_count_posts('teaching')->publish,
            'products' => wp_count_posts('product')->publish,
        ];
        
        // Abonnés newsletter
        $table_subs = $wpdb->prefix . 'cendf_subscribers';
        $stats['subscribers'] = intval($wpdb->get_var("SELECT COUNT(*) FROM $table_subs WHERE status = 'active'"));
        
        // Paiements
        $table_payments = $wpdb->prefix . 'cendf_payments';
        $stats['payments_completed'] = intval($wpdb->get_var("SELECT COUNT(*) FROM $table_payments WHERE status = 'completed'"));
        $stats['payments_total'] = floatval($wpdb->get_var("SELECT SUM(amount) FROM $table_payments WHERE status = 'completed'"));
        
        return rest_ensure_response($stats);
    }
}
