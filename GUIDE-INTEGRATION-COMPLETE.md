# Guide d'intégration WordPress - CENDF/Radio Espoir

## 🔒 Sécurité Renforcée

### 1. Configuration CORS sécurisée (functions.php)

```php
<?php
// Ajouter dans functions.php de votre thème WordPress

// Configuration CORS sécurisée - Remplacez par votre domaine
define('ALLOWED_ORIGINS', [
    'https://votre-domaine.com',
    'https://www.votre-domaine.com',
    'http://localhost:5173', // Dev seulement - À retirer en production
]);

add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $origin = get_http_origin();
        
        if (in_array($origin, ALLOWED_ORIGINS)) {
            header('Access-Control-Allow-Origin: ' . esc_url($origin));
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
            header('Access-Control-Allow-Credentials: true');
            header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        }
        
        return $value;
    });
}, 15);

// Protection contre les injections
add_filter('rest_pre_dispatch', function($result, $server, $request) {
    // Limiter le taux de requêtes
    $ip = $_SERVER['REMOTE_ADDR'];
    $transient_key = 'rate_limit_' . md5($ip);
    $requests = get_transient($transient_key) ?: 0;
    
    if ($requests > 100) { // 100 requêtes par minute max
        return new WP_Error('rate_limit_exceeded', 'Trop de requêtes', ['status' => 429]);
    }
    
    set_transient($transient_key, $requests + 1, 60);
    
    return $result;
}, 10, 3);

// Désactiver l'énumération des utilisateurs via l'API
add_filter('rest_endpoints', function($endpoints) {
    if (isset($endpoints['/wp/v2/users'])) {
        unset($endpoints['/wp/v2/users']);
    }
    if (isset($endpoints['/wp/v2/users/(?P<id>[\d]+)'])) {
        unset($endpoints['/wp/v2/users/(?P<id>[\d]+)']);
    }
    return $endpoints;
});
```

### 2. Validation des entrées (functions.php)

```php
<?php
// Fonction de sanitization pour les données entrantes
function cendf_sanitize_input($data) {
    if (is_array($data)) {
        return array_map('cendf_sanitize_input', $data);
    }
    return sanitize_text_field(wp_unslash($data));
}

// Validation des emails
function cendf_validate_email($email) {
    $email = sanitize_email($email);
    if (!is_email($email)) {
        return false;
    }
    return $email;
}
```

---

## 📧 Configuration Email Contact

### Plugin Contact Form (functions.php ou plugin séparé)

```php
<?php
// Endpoint API pour le formulaire de contact
add_action('rest_api_init', function() {
    register_rest_route('cendf/v1', '/contact', [
        'methods' => 'POST',
        'callback' => 'cendf_handle_contact_form',
        'permission_callback' => '__return_true',
    ]);
});

function cendf_handle_contact_form($request) {
    // Récupérer et valider les données
    $name = sanitize_text_field($request->get_param('name'));
    $email = sanitize_email($request->get_param('email'));
    $subject = sanitize_text_field($request->get_param('subject'));
    $message = sanitize_textarea_field($request->get_param('message'));
    
    // Validation
    if (empty($name) || strlen($name) < 2 || strlen($name) > 100) {
        return new WP_Error('invalid_name', 'Nom invalide', ['status' => 400]);
    }
    
    if (!is_email($email)) {
        return new WP_Error('invalid_email', 'Email invalide', ['status' => 400]);
    }
    
    if (empty($message) || strlen($message) < 10 || strlen($message) > 2000) {
        return new WP_Error('invalid_message', 'Message invalide', ['status' => 400]);
    }
    
    // Protection anti-spam (honeypot)
    if (!empty($request->get_param('website'))) {
        return new WP_Error('spam_detected', 'Spam détecté', ['status' => 403]);
    }
    
    // Envoi de l'email
    $to = 'contact@cendf-ci.org';
    $email_subject = '[CENDF Contact] ' . $subject;
    $email_body = "Nouveau message de contact:\n\n";
    $email_body .= "Nom: $name\n";
    $email_body .= "Email: $email\n";
    $email_body .= "Sujet: $subject\n\n";
    $email_body .= "Message:\n$message";
    
    $headers = [
        'From: CENDF Website <noreply@cendf-ci.org>',
        'Reply-To: ' . $name . ' <' . $email . '>',
        'Content-Type: text/plain; charset=UTF-8',
    ];
    
    $sent = wp_mail($to, $email_subject, $email_body, $headers);
    
    if ($sent) {
        return ['success' => true, 'message' => 'Message envoyé avec succès'];
    }
    
    return new WP_Error('email_failed', 'Erreur lors de l\'envoi', ['status' => 500]);
}
```

---

## 🛒 Intégration Boutique avec Paiement Mobile

### Plugin WooCommerce + Orange Money/Wave

```php
<?php
/**
 * Plugin Name: CENDF Mobile Payments
 * Description: Intégration Orange Money et Wave pour CENDF
 * Version: 1.0.0
 */

// Endpoint pour initier un paiement
add_action('rest_api_init', function() {
    register_rest_route('cendf/v1', '/payment/initiate', [
        'methods' => 'POST',
        'callback' => 'cendf_initiate_payment',
        'permission_callback' => '__return_true',
    ]);
    
    register_rest_route('cendf/v1', '/payment/verify', [
        'methods' => 'POST',
        'callback' => 'cendf_verify_payment',
        'permission_callback' => '__return_true',
    ]);
});

function cendf_initiate_payment($request) {
    $amount = absint($request->get_param('amount'));
    $method = sanitize_text_field($request->get_param('method')); // 'orange' ou 'wave'
    $phone = sanitize_text_field($request->get_param('phone'));
    $order_id = sanitize_text_field($request->get_param('order_id'));
    
    // Validation
    if ($amount < 100 || $amount > 10000000) {
        return new WP_Error('invalid_amount', 'Montant invalide', ['status' => 400]);
    }
    
    if (!preg_match('/^[0-9]{10}$/', $phone)) {
        return new WP_Error('invalid_phone', 'Numéro de téléphone invalide', ['status' => 400]);
    }
    
    // Configuration API (à stocker dans wp_options de manière sécurisée)
    $api_config = [
        'orange' => [
            'merchant_key' => get_option('cendf_orange_merchant_key'),
            'api_url' => 'https://api.orange.com/orange-money-webpay/ci/v1/webpayment',
        ],
        'wave' => [
            'api_key' => get_option('cendf_wave_api_key'),
            'api_url' => 'https://api.wave.com/v1/checkout/sessions',
        ],
    ];
    
    // Créer l'enregistrement de commande
    $payment_data = [
        'order_id' => $order_id,
        'amount' => $amount,
        'method' => $method,
        'phone' => $phone,
        'status' => 'pending',
        'created_at' => current_time('mysql'),
    ];
    
    // Sauvegarder dans la base de données
    global $wpdb;
    $wpdb->insert($wpdb->prefix . 'cendf_payments', $payment_data);
    
    return [
        'success' => true,
        'payment_id' => $wpdb->insert_id,
        'message' => 'Paiement initié. Veuillez confirmer sur votre téléphone.',
    ];
}

// Créer la table des paiements lors de l'activation
register_activation_hook(__FILE__, function() {
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE IF NOT EXISTS {$wpdb->prefix}cendf_payments (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        order_id varchar(50) NOT NULL,
        amount bigint(20) NOT NULL,
        method varchar(20) NOT NULL,
        phone varchar(20) NOT NULL,
        status varchar(20) DEFAULT 'pending',
        transaction_id varchar(100) DEFAULT NULL,
        created_at datetime DEFAULT CURRENT_TIMESTAMP,
        updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY order_id (order_id),
        KEY status (status)
    ) $charset_collate;";
    
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
});
```

---

## 📱 Réseaux Sociaux depuis le Backend

### Configuration dans WordPress Options

```php
<?php
// Ajouter une page de paramètres dans l'admin
add_action('admin_menu', function() {
    add_options_page(
        'CENDF Réseaux Sociaux',
        'Réseaux Sociaux',
        'manage_options',
        'cendf-social',
        'cendf_social_page'
    );
});

function cendf_social_page() {
    if (isset($_POST['cendf_social_nonce']) && 
        wp_verify_nonce($_POST['cendf_social_nonce'], 'cendf_social_save')) {
        
        update_option('cendf_facebook', esc_url_raw($_POST['facebook']));
        update_option('cendf_twitter', esc_url_raw($_POST['twitter']));
        update_option('cendf_instagram', esc_url_raw($_POST['instagram']));
        update_option('cendf_youtube', esc_url_raw($_POST['youtube']));
        update_option('cendf_whatsapp', sanitize_text_field($_POST['whatsapp']));
        
        echo '<div class="notice notice-success"><p>Paramètres sauvegardés.</p></div>';
    }
    
    ?>
    <div class="wrap">
        <h1>Réseaux Sociaux CENDF</h1>
        <form method="post">
            <?php wp_nonce_field('cendf_social_save', 'cendf_social_nonce'); ?>
            <table class="form-table">
                <tr>
                    <th>Facebook</th>
                    <td><input type="url" name="facebook" class="regular-text" value="<?php echo esc_attr(get_option('cendf_facebook')); ?>"></td>
                </tr>
                <tr>
                    <th>Twitter/X</th>
                    <td><input type="url" name="twitter" class="regular-text" value="<?php echo esc_attr(get_option('cendf_twitter')); ?>"></td>
                </tr>
                <tr>
                    <th>Instagram</th>
                    <td><input type="url" name="instagram" class="regular-text" value="<?php echo esc_attr(get_option('cendf_instagram')); ?>"></td>
                </tr>
                <tr>
                    <th>YouTube</th>
                    <td><input type="url" name="youtube" class="regular-text" value="<?php echo esc_attr(get_option('cendf_youtube')); ?>"></td>
                </tr>
                <tr>
                    <th>WhatsApp (numéro)</th>
                    <td><input type="text" name="whatsapp" class="regular-text" value="<?php echo esc_attr(get_option('cendf_whatsapp')); ?>" placeholder="+2250787830395"></td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

// Endpoint API pour récupérer les réseaux sociaux
add_action('rest_api_init', function() {
    register_rest_route('cendf/v1', '/social', [
        'methods' => 'GET',
        'callback' => function() {
            return [
                'facebook' => get_option('cendf_facebook', ''),
                'twitter' => get_option('cendf_twitter', ''),
                'instagram' => get_option('cendf_instagram', ''),
                'youtube' => get_option('cendf_youtube', ''),
                'whatsapp' => get_option('cendf_whatsapp', ''),
            ];
        },
        'permission_callback' => '__return_true',
    ]);
});
```

---

## 🔍 Optimisation SEO

### Plugin SEO pour CENDF

```php
<?php
// Ajouter les métadonnées SEO automatiquement
add_action('wp_head', function() {
    if (is_singular()) {
        $post = get_post();
        $title = get_the_title();
        $description = wp_trim_words(get_the_excerpt(), 25);
        $image = get_the_post_thumbnail_url($post->ID, 'large');
        
        echo '<meta property="og:title" content="' . esc_attr($title) . '">';
        echo '<meta property="og:description" content="' . esc_attr($description) . '">';
        echo '<meta property="og:image" content="' . esc_url($image) . '">';
        echo '<meta property="og:type" content="article">';
        echo '<meta property="og:site_name" content="CENDF - Radio Espoir">';
        
        echo '<meta name="twitter:card" content="summary_large_image">';
        echo '<meta name="twitter:title" content="' . esc_attr($title) . '">';
        echo '<meta name="twitter:description" content="' . esc_attr($description) . '">';
    }
});

// Génération automatique du sitemap
add_action('rest_api_init', function() {
    register_rest_route('cendf/v1', '/sitemap', [
        'methods' => 'GET',
        'callback' => function() {
            $posts = get_posts([
                'post_type' => ['post', 'teachings', 'documents', 'products'],
                'posts_per_page' => -1,
                'post_status' => 'publish',
            ]);
            
            $urls = [];
            foreach ($posts as $post) {
                $urls[] = [
                    'loc' => get_permalink($post->ID),
                    'lastmod' => get_the_modified_date('c', $post->ID),
                    'priority' => $post->post_type === 'post' ? '0.8' : '0.6',
                ];
            }
            
            return $urls;
        },
        'permission_callback' => '__return_true',
    ]);
});
```

---

## 📁 Structure des fichiers WordPress

```
wp-content/
├── plugins/
│   └── cendf-integration/
│       ├── cendf-integration.php      # Plugin principal
│       ├── includes/
│       │   ├── class-cpt.php          # Custom Post Types
│       │   ├── class-api.php          # Endpoints API REST
│       │   ├── class-security.php     # Sécurité
│       │   ├── class-payments.php     # Paiements mobiles
│       │   └── class-social.php       # Réseaux sociaux
│       └── admin/
│           └── settings.php           # Page de paramètres
└── themes/
    └── cendf-theme/
        └── functions.php              # Configurations CORS et filtres
```

---

## ⚙️ Variables d'environnement React

Créez un fichier `.env` à la racine du projet React:

```env
# URL de votre WordPress
VITE_WORDPRESS_URL=https://votre-wordpress.com

# Contact email (pour fallback)
VITE_CONTACT_EMAIL=contact@cendf-ci.org

# Numéros de paiement
VITE_PAYMENT_PHONE=0787830395
```

---

## 🚀 Checklist de déploiement

- [ ] Configurer CORS avec vos domaines de production
- [ ] Installer et activer le plugin CENDF Integration
- [ ] Configurer les clés API Orange Money et Wave
- [ ] Configurer l'email SMTP WordPress
- [ ] Tester le formulaire de contact
- [ ] Vérifier les endpoints API
- [ ] Configurer le SSL (HTTPS obligatoire)
- [ ] Sauvegarder la base de données
- [ ] Tester les paiements en mode sandbox
