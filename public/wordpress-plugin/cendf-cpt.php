<?php
/**
 * Plugin Name: CENDF Radio Espoir - Custom Post Types
 * Description: Crée automatiquement tous les Custom Post Types et champs ACF nécessaires pour le frontend React
 * Version: 1.0.0
 * Author: CENDF
 * Text Domain: cendf-cpt
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * =====================================================
 * ÉTAPE 1 : CUSTOM POST TYPES
 * =====================================================
 */

add_action('init', 'cendf_register_custom_post_types');

function cendf_register_custom_post_types() {
    
    // 1. Événements
    register_post_type('events', [
        'labels' => [
            'name' => 'Événements',
            'singular_name' => 'Événement',
            'add_new' => 'Ajouter',
            'add_new_item' => 'Ajouter un événement',
            'edit_item' => 'Modifier l\'événement',
            'view_item' => 'Voir l\'événement',
            'search_items' => 'Rechercher',
            'not_found' => 'Aucun événement trouvé',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'rest_base' => 'events',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
        'menu_icon' => 'dashicons-calendar-alt',
        'rewrite' => ['slug' => 'evenements'],
    ]);

    // 2. Podcasts
    register_post_type('podcasts', [
        'labels' => [
            'name' => 'Podcasts',
            'singular_name' => 'Podcast',
            'add_new' => 'Ajouter',
            'add_new_item' => 'Ajouter un podcast',
            'edit_item' => 'Modifier le podcast',
            'view_item' => 'Voir le podcast',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'rest_base' => 'podcasts',
        'supports' => ['title', 'editor', 'thumbnail'],
        'menu_icon' => 'dashicons-microphone',
        'rewrite' => ['slug' => 'podcasts'],
    ]);

    // 3. Programmes Radio
    register_post_type('programs', [
        'labels' => [
            'name' => 'Programmes',
            'singular_name' => 'Programme',
            'add_new' => 'Ajouter',
            'add_new_item' => 'Ajouter un programme',
            'edit_item' => 'Modifier le programme',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'rest_base' => 'programs',
        'supports' => ['title', 'editor'],
        'menu_icon' => 'dashicons-playlist-audio',
        'rewrite' => ['slug' => 'programmes'],
    ]);

    // 4. Animateurs
    register_post_type('animators', [
        'labels' => [
            'name' => 'Animateurs',
            'singular_name' => 'Animateur',
            'add_new' => 'Ajouter',
            'add_new_item' => 'Ajouter un animateur',
            'edit_item' => 'Modifier l\'animateur',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'rest_base' => 'animators',
        'supports' => ['title', 'editor', 'thumbnail'],
        'menu_icon' => 'dashicons-admin-users',
        'rewrite' => ['slug' => 'animateurs'],
    ]);

    // 5. Documents
    register_post_type('documents', [
        'labels' => [
            'name' => 'Documents',
            'singular_name' => 'Document',
            'add_new' => 'Ajouter',
            'add_new_item' => 'Ajouter un document',
            'edit_item' => 'Modifier le document',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'rest_base' => 'documents',
        'supports' => ['title', 'editor'],
        'menu_icon' => 'dashicons-media-document',
        'rewrite' => ['slug' => 'documents'],
    ]);

    // 6. Archives
    register_post_type('archives', [
        'labels' => [
            'name' => 'Archives',
            'singular_name' => 'Archive',
            'add_new' => 'Ajouter',
            'add_new_item' => 'Ajouter une archive',
            'edit_item' => 'Modifier l\'archive',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'rest_base' => 'archives',
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
        'menu_icon' => 'dashicons-archive',
        'rewrite' => ['slug' => 'archives'],
    ]);

    // 7. Enseignements
    register_post_type('teachings', [
        'labels' => [
            'name' => 'Enseignements',
            'singular_name' => 'Enseignement',
            'add_new' => 'Ajouter',
            'add_new_item' => 'Ajouter un enseignement',
            'edit_item' => 'Modifier l\'enseignement',
        ],
        'public' => true,
        'has_archive' => true,
        'show_in_rest' => true,
        'rest_base' => 'teachings',
        'supports' => ['title', 'editor', 'thumbnail'],
        'menu_icon' => 'dashicons-book-alt',
        'rewrite' => ['slug' => 'enseignements'],
    ]);
}

/**
 * =====================================================
 * ÉTAPE 2 : CHAMPS ACF (si ACF est installé)
 * =====================================================
 */

add_action('acf/init', 'cendf_register_acf_fields');

function cendf_register_acf_fields() {
    
    if (!function_exists('acf_add_local_field_group')) {
        return;
    }

    // Champs pour Événements
    acf_add_local_field_group([
        'key' => 'group_events',
        'title' => 'Détails de l\'événement',
        'fields' => [
            [
                'key' => 'field_event_date',
                'label' => 'Date',
                'name' => 'date',
                'type' => 'date_picker',
                'required' => 1,
                'display_format' => 'd/m/Y',
                'return_format' => 'Y-m-d',
            ],
            [
                'key' => 'field_event_time',
                'label' => 'Heure',
                'name' => 'time',
                'type' => 'time_picker',
                'required' => 1,
                'display_format' => 'H:i',
                'return_format' => 'H:i',
            ],
            [
                'key' => 'field_event_location',
                'label' => 'Lieu',
                'name' => 'location',
                'type' => 'text',
                'required' => 1,
            ],
            [
                'key' => 'field_event_organizer',
                'label' => 'Organisateur',
                'name' => 'organizer',
                'type' => 'text',
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'events',
                ],
            ],
        ],
    ]);

    // Champs pour Podcasts
    acf_add_local_field_group([
        'key' => 'group_podcasts',
        'title' => 'Détails du podcast',
        'fields' => [
            [
                'key' => 'field_podcast_audio',
                'label' => 'URL Audio',
                'name' => 'audio_url',
                'type' => 'url',
                'required' => 1,
            ],
            [
                'key' => 'field_podcast_duration',
                'label' => 'Durée',
                'name' => 'duration',
                'type' => 'text',
                'placeholder' => 'Ex: 45 min',
            ],
            [
                'key' => 'field_podcast_episode',
                'label' => 'Numéro d\'épisode',
                'name' => 'episode_number',
                'type' => 'number',
            ],
            [
                'key' => 'field_podcast_host',
                'label' => 'Animateur',
                'name' => 'host',
                'type' => 'text',
            ],
            [
                'key' => 'field_podcast_date',
                'label' => 'Date de publication',
                'name' => 'date',
                'type' => 'date_picker',
                'display_format' => 'd/m/Y',
                'return_format' => 'Y-m-d',
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'podcasts',
                ],
            ],
        ],
    ]);

    // Champs pour Programmes
    acf_add_local_field_group([
        'key' => 'group_programs',
        'title' => 'Détails du programme',
        'fields' => [
            [
                'key' => 'field_program_time',
                'label' => 'Horaire',
                'name' => 'time_slot',
                'type' => 'text',
                'placeholder' => 'Ex: 06:00 - 08:00',
                'required' => 1,
            ],
            [
                'key' => 'field_program_day',
                'label' => 'Jour(s)',
                'name' => 'day_of_week',
                'type' => 'text',
                'placeholder' => 'Ex: Lundi - Vendredi',
            ],
            [
                'key' => 'field_program_host',
                'label' => 'Animateur',
                'name' => 'host',
                'type' => 'text',
            ],
            [
                'key' => 'field_program_type',
                'label' => 'Type d\'émission',
                'name' => 'type',
                'type' => 'select',
                'choices' => [
                    'Louange' => 'Louange',
                    'Enseignement' => 'Enseignement',
                    'Prière' => 'Prière',
                    'Magazine' => 'Magazine',
                    'Jeunesse' => 'Jeunesse',
                    'Autre' => 'Autre',
                ],
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'programs',
                ],
            ],
        ],
    ]);

    // Champs pour Animateurs
    acf_add_local_field_group([
        'key' => 'group_animators',
        'title' => 'Profil de l\'animateur',
        'fields' => [
            [
                'key' => 'field_animator_role',
                'label' => 'Rôle',
                'name' => 'role',
                'type' => 'text',
                'placeholder' => 'Ex: Animateur principal',
            ],
            [
                'key' => 'field_animator_bio',
                'label' => 'Biographie',
                'name' => 'bio',
                'type' => 'textarea',
                'rows' => 4,
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'animators',
                ],
            ],
        ],
    ]);

    // Champs pour Documents
    acf_add_local_field_group([
        'key' => 'group_documents',
        'title' => 'Détails du document',
        'fields' => [
            [
                'key' => 'field_document_file',
                'label' => 'Fichier',
                'name' => 'file_url',
                'type' => 'file',
                'return_format' => 'url',
                'required' => 1,
            ],
            [
                'key' => 'field_document_type',
                'label' => 'Type de fichier',
                'name' => 'file_type',
                'type' => 'select',
                'choices' => [
                    'PDF' => 'PDF',
                    'Word' => 'Word',
                    'Excel' => 'Excel',
                    'Image' => 'Image',
                    'Autre' => 'Autre',
                ],
            ],
            [
                'key' => 'field_document_size',
                'label' => 'Taille du fichier',
                'name' => 'file_size',
                'type' => 'text',
                'placeholder' => 'Ex: 2.5 MB',
            ],
            [
                'key' => 'field_document_category',
                'label' => 'Catégorie',
                'name' => 'category',
                'type' => 'select',
                'choices' => [
                    'Lettres pastorales' => 'Lettres pastorales',
                    'Catéchèse' => 'Catéchèse',
                    'Liturgie' => 'Liturgie',
                    'Administration' => 'Administration',
                    'Formation' => 'Formation',
                    'Autre' => 'Autre',
                ],
            ],
            [
                'key' => 'field_document_date',
                'label' => 'Date',
                'name' => 'date',
                'type' => 'date_picker',
                'display_format' => 'd/m/Y',
                'return_format' => 'Y-m-d',
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'documents',
                ],
            ],
        ],
    ]);

    // Champs pour Enseignements
    acf_add_local_field_group([
        'key' => 'group_teachings',
        'title' => 'Détails de l\'enseignement',
        'fields' => [
            [
                'key' => 'field_teaching_author',
                'label' => 'Auteur/Prédicateur',
                'name' => 'author',
                'type' => 'text',
                'required' => 1,
            ],
            [
                'key' => 'field_teaching_duration',
                'label' => 'Durée',
                'name' => 'duration',
                'type' => 'text',
                'placeholder' => 'Ex: 45 min',
            ],
            [
                'key' => 'field_teaching_audio',
                'label' => 'URL Audio',
                'name' => 'audio_url',
                'type' => 'url',
            ],
            [
                'key' => 'field_teaching_video',
                'label' => 'URL Vidéo',
                'name' => 'video_url',
                'type' => 'url',
            ],
            [
                'key' => 'field_teaching_category',
                'label' => 'Catégorie',
                'name' => 'category',
                'type' => 'select',
                'choices' => [
                    'Fondements' => 'Fondements',
                    'Prière' => 'Prière',
                    'Bible' => 'Bible',
                    'Vie spirituelle' => 'Vie spirituelle',
                    'Famille' => 'Famille',
                    'Autre' => 'Autre',
                ],
            ],
            [
                'key' => 'field_teaching_date',
                'label' => 'Date',
                'name' => 'date',
                'type' => 'date_picker',
                'display_format' => 'd/m/Y',
                'return_format' => 'Y-m-d',
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'teachings',
                ],
            ],
        ],
    ]);

    // Champs pour le Bandeau Défilant (News Ticker)
    acf_add_local_field_group([
        'key' => 'group_news_ticker',
        'title' => 'Textes du bandeau défilant',
        'fields' => [
            [
                'key' => 'field_ticker_items',
                'label' => 'Messages défilants',
                'name' => 'ticker_items',
                'type' => 'repeater',
                'min' => 1,
                'max' => 20,
                'layout' => 'table',
                'button_label' => 'Ajouter un message',
                'sub_fields' => [
                    [
                        'key' => 'field_ticker_text',
                        'label' => 'Texte',
                        'name' => 'text',
                        'type' => 'text',
                        'required' => 1,
                        'placeholder' => 'Ex: 🎄 Messe de minuit le 24 décembre',
                    ],
                    [
                        'key' => 'field_ticker_link',
                        'label' => 'Lien',
                        'name' => 'link',
                        'type' => 'url',
                        'placeholder' => 'https://...',
                    ],
                    [
                        'key' => 'field_ticker_active',
                        'label' => 'Actif',
                        'name' => 'active',
                        'type' => 'true_false',
                        'default_value' => 1,
                        'ui' => 1,
                    ],
                ],
            ],
        ],
        'location' => [
            [
                [
                    'param' => 'options_page',
                    'operator' => '==',
                    'value' => 'cendf-ticker-settings',
                ],
            ],
        ],
    ]);
}
}

/**
 * =====================================================
 * ÉTAPE 3 : CONFIGURATION CORS
 * =====================================================
 */

add_action('rest_api_init', 'cendf_add_cors_headers', 15);

function cendf_add_cors_headers() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    
    add_filter('rest_pre_serve_request', function($value) {
        $origin = get_http_origin();
        
        // Liste des domaines autorisés (modifiez selon vos besoins)
        $allowed_origins = [
            'http://localhost:5173',
            'http://localhost:8080',
            'http://localhost:3000',
        ];
        
        // Ajouter votre domaine de production
        // $allowed_origins[] = 'https://votre-frontend.com';
        
        // Autoriser tous les domaines Lovable
        if (strpos($origin, 'lovableproject.com') !== false || 
            strpos($origin, 'lovable.app') !== false) {
            header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
        } elseif (in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
        }
        
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        
        return $value;
    });
}

// Gérer les requêtes OPTIONS (preflight CORS)
add_action('init', function() {
    if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
        header('Access-Control-Max-Age: 86400');
        exit(0);
    }
});

/**
 * =====================================================
 * ÉTAPE 4 : FLUSH REWRITE RULES À L'ACTIVATION
 * =====================================================
 */

register_activation_hook(__FILE__, function() {
    cendf_register_custom_post_types();
    flush_rewrite_rules();
});

register_deactivation_hook(__FILE__, function() {
    flush_rewrite_rules();
});

/**
 * =====================================================
 * ÉTAPE 5 : PAGE D'AIDE DANS L'ADMIN
 * =====================================================
 */

add_action('admin_menu', function() {
    add_menu_page(
        'CENDF Integration',
        'CENDF',
        'manage_options',
        'cendf-integration',
        'cendf_admin_page',
        'dashicons-admin-site',
        100
    );
    
    // Sous-menu pour le bandeau défilant
    add_submenu_page(
        'cendf-integration',
        'Bandeau Défilant',
        'Bandeau Défilant',
        'manage_options',
        'cendf-ticker-settings',
        'cendf_ticker_settings_page'
    );
});

function cendf_admin_page() {
    $site_url = get_site_url();
    ?>
    <div class="wrap">
        <h1>🌐 CENDF Radio Espoir - Intégration Frontend</h1>
        
        <div class="card" style="max-width: 800px; padding: 20px; margin-top: 20px;">
            <h2>✅ Configuration réussie !</h2>
            <p>Votre WordPress est maintenant configuré pour fonctionner avec le frontend React.</p>
            
            <h3>📋 Endpoints API disponibles :</h3>
            <ul style="list-style: disc; margin-left: 20px;">
                <li><a href="<?php echo $site_url; ?>/wp-json/wp/v2/posts" target="_blank">Articles</a></li>
                <li><a href="<?php echo $site_url; ?>/wp-json/wp/v2/events" target="_blank">Événements</a></li>
                <li><a href="<?php echo $site_url; ?>/wp-json/wp/v2/podcasts" target="_blank">Podcasts</a></li>
                <li><a href="<?php echo $site_url; ?>/wp-json/wp/v2/programs" target="_blank">Programmes</a></li>
                <li><a href="<?php echo $site_url; ?>/wp-json/wp/v2/animators" target="_blank">Animateurs</a></li>
                <li><a href="<?php echo $site_url; ?>/wp-json/wp/v2/documents" target="_blank">Documents</a></li>
                <li><a href="<?php echo $site_url; ?>/wp-json/wp/v2/archives" target="_blank">Archives</a></li>
                <li><a href="<?php echo $site_url; ?>/wp-json/wp/v2/teachings" target="_blank">Enseignements</a></li>
            </ul>
            
            <h3>⚙️ Configuration du Frontend :</h3>
            <p>Dans le fichier <code>.env</code> du projet React :</p>
            <pre style="background: #f1f1f1; padding: 10px; border-radius: 5px;">VITE_WORDPRESS_URL=<?php echo $site_url; ?></pre>
            
            <h3>🔌 Plugins requis :</h3>
            <ul style="list-style: disc; margin-left: 20px;">
                <li>
                    <strong>Advanced Custom Fields (ACF)</strong> - 
                    <?php if (class_exists('ACF')): ?>
                        <span style="color: green;">✓ Installé</span>
                    <?php else: ?>
                        <span style="color: red;">✗ Non installé</span>
                        <a href="https://wordpress.org/plugins/advanced-custom-fields/" target="_blank">Télécharger</a>
                    <?php endif; ?>
                </li>
                <li>
                    <strong>ACF to REST API</strong> - 
                    <?php if (class_exists('ACF_To_REST_API')): ?>
                        <span style="color: green;">✓ Installé</span>
                    <?php else: ?>
                        <span style="color: red;">✗ Non installé</span>
                        <a href="https://wordpress.org/plugins/acf-to-rest-api/" target="_blank">Télécharger</a>
                    <?php endif; ?>
                </li>
            </ul>
        </div>
    </div>
    <?php
}

/**
 * =====================================================
 * ÉTAPE 6 : BANDEAU DÉFILANT (TICKER) SETTINGS
 * =====================================================
 */

// Page de configuration du ticker
function cendf_ticker_settings_page() {
    ?>
    <div class="wrap">
        <h1>📢 Bandeau Défilant - Configuration</h1>
        
        <div class="card" style="max-width: 800px; padding: 20px; margin-top: 20px;">
            <h2>Configuration du bandeau d'informations</h2>
            <p>Gérez les messages qui défilent sur la page d'accueil de votre site.</p>
            
            <h3>📋 Méthode 1 : Via ACF (Recommandé)</h3>
            <p>Si vous avez <strong>ACF Pro</strong>, les champs apparaîtront automatiquement ici.</p>
            
            <h3>📋 Méthode 2 : Via GoPiPlus (Alternative)</h3>
            <p>Pour utiliser le plugin <strong>GoPiPlus Horizontal Scrolling News Ticker</strong> :</p>
            <ol style="margin-left: 20px;">
                <li>Installez le plugin <a href="https://wordpress.org/plugins/jeevo-developer-developer-developer/" target="_blank">GoPiPlus News Ticker</a></li>
                <li>Créez vos textes défilants dans le plugin</li>
                <li>Utilisez l'endpoint API ci-dessous pour récupérer les données</li>
            </ol>
            
            <h3>🔌 API Endpoint :</h3>
            <pre style="background: #f1f1f1; padding: 10px; border-radius: 5px;"><?php echo get_site_url(); ?>/wp-json/cendf/v1/ticker</pre>
            
            <h3>📝 Shortcode GoPiPlus compatible :</h3>
            <p>Ce plugin crée un endpoint REST compatible avec GoPiPlus pour récupérer les textes.</p>
            <pre style="background: #f1f1f1; padding: 10px; border-radius: 5px;">[jeevo-developer-news speed="50" direction="left"]</pre>
        </div>
    </div>
    <?php
}

/**
 * =====================================================
 * ÉTAPE 7 : API REST POUR LE BANDEAU DÉFILANT
 * =====================================================
 */

add_action('rest_api_init', function() {
    // Endpoint pour récupérer les textes du ticker
    register_rest_route('cendf/v1', '/ticker', [
        'methods' => 'GET',
        'callback' => 'cendf_get_ticker_items',
        'permission_callback' => '__return_true',
    ]);
    
    // Endpoint pour les données GoPiPlus
    register_rest_route('cendf/v1', '/gopiplus', [
        'methods' => 'GET',
        'callback' => 'cendf_get_gopiplus_data',
        'permission_callback' => '__return_true',
    ]);
});

function cendf_get_ticker_items() {
    // Option 1: Essayer de récupérer depuis ACF Options
    if (function_exists('get_field')) {
        $ticker_items = get_field('ticker_items', 'option');
        if ($ticker_items && is_array($ticker_items)) {
            $items = [];
            foreach ($ticker_items as $index => $item) {
                if (!empty($item['active'])) {
                    $items[] = [
                        'id' => $index + 1,
                        'text' => $item['text'],
                        'link' => $item['link'] ?? '',
                    ];
                }
            }
            return rest_ensure_response($items);
        }
    }
    
    // Option 2: Récupérer depuis les options WordPress standard
    $ticker_option = get_option('cendf_ticker_items', []);
    if (!empty($ticker_option)) {
        return rest_ensure_response($ticker_option);
    }
    
    // Option 3: Récupérer depuis la table GoPiPlus si elle existe
    global $wpdb;
    $table_name = $wpdb->prefix . 'jeevo_developer_developer_developer';
    
    if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") == $table_name) {
        $results = $wpdb->get_results("SELECT * FROM $table_name WHERE jeevo_developer_developer_developer_status = 1 ORDER BY jeevo_developer_developer_developer_order ASC", ARRAY_A);
        
        if ($results) {
            $items = [];
            foreach ($results as $index => $row) {
                $items[] = [
                    'id' => (int) $row['jeevo_developer_developer_developer_id'],
                    'text' => $row['jeevo_developer_developer_developer_title'],
                    'link' => $row['jeevo_developer_developer_developer_link'] ?? '',
                ];
            }
            return rest_ensure_response($items);
        }
    }
    
    // Données par défaut si rien n'est configuré
    return rest_ensure_response([
        ['id' => 1, 'text' => '🎄 Bienvenue sur Radio Espoir - La voix de la foi', 'link' => '/'],
        ['id' => 2, 'text' => '📻 Écoutez-nous 24h/24', 'link' => '/radio'],
        ['id' => 3, 'text' => '📚 Découvrez nos enseignements', 'link' => '/enseignements'],
    ]);
}

function cendf_get_gopiplus_data() {
    global $wpdb;
    
    // Vérifier si la table GoPiPlus existe
    $table_name = $wpdb->prefix . 'jeevo_developer_developer_developer';
    
    if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {
        return rest_ensure_response([
            'success' => false,
            'message' => 'Plugin GoPiPlus non installé. Utilisez ACF ou les options WordPress.',
            'data' => []
        ]);
    }
    
    $results = $wpdb->get_results("SELECT * FROM $table_name WHERE jeevo_developer_developer_developer_status = 1 ORDER BY jeevo_developer_developer_developer_order ASC", ARRAY_A);
    
    return rest_ensure_response([
        'success' => true,
        'plugin' => 'GoPiPlus',
        'data' => $results
    ]);
}

/**
 * =====================================================
 * ÉTAPE 8 : OPTIONS PAGE POUR ACF (si Pro)
 * =====================================================
 */

add_action('acf/init', function() {
    if (function_exists('acf_add_options_page')) {
        acf_add_options_sub_page([
            'page_title' => 'Bandeau Défilant',
            'menu_title' => 'Bandeau (ACF)',
            'parent_slug' => 'cendf-integration',
            'capability' => 'manage_options',
            'menu_slug' => 'cendf-ticker-settings',
        ]);
    }
});

/**
 * =====================================================
 * ÉTAPE 9 : FORMULAIRE SIMPLE POUR GÉRER LE TICKER
 * =====================================================
 */

// Sauvegarder les options du ticker via formulaire simple
add_action('admin_init', function() {
    if (isset($_POST['cendf_save_ticker']) && wp_verify_nonce($_POST['cendf_ticker_nonce'], 'cendf_save_ticker')) {
        $items = [];
        
        if (!empty($_POST['ticker_text']) && is_array($_POST['ticker_text'])) {
            foreach ($_POST['ticker_text'] as $index => $text) {
                if (!empty(trim($text))) {
                    $items[] = [
                        'id' => $index + 1,
                        'text' => sanitize_text_field($text),
                        'link' => sanitize_url($_POST['ticker_link'][$index] ?? ''),
                    ];
                }
            }
        }
        
        update_option('cendf_ticker_items', $items);
        add_action('admin_notices', function() {
            echo '<div class="notice notice-success"><p>Messages du bandeau mis à jour !</p></div>';
        });
    }
});

// Ajouter le formulaire à la page ticker settings
add_action('admin_footer', function() {
    $screen = get_current_screen();
    if ($screen && $screen->id === 'cendf_page_cendf-ticker-settings') {
        $items = get_option('cendf_ticker_items', []);
        if (empty($items)) {
            $items = [
                ['id' => 1, 'text' => '', 'link' => ''],
            ];
        }
        ?>
        <div class="card" style="max-width: 800px; padding: 20px; margin-top: 20px;">
            <h2>📝 Gérer les messages (sans ACF)</h2>
            <form method="post">
                <?php wp_nonce_field('cendf_save_ticker', 'cendf_ticker_nonce'); ?>
                
                <table class="widefat" style="margin-top: 15px;">
                    <thead>
                        <tr>
                            <th>Texte du message</th>
                            <th>Lien (optionnel)</th>
                        </tr>
                    </thead>
                    <tbody id="ticker-items">
                        <?php foreach ($items as $index => $item): ?>
                        <tr>
                            <td><input type="text" name="ticker_text[]" value="<?php echo esc_attr($item['text']); ?>" style="width: 100%;" placeholder="Ex: 🎄 Messe de minuit le 24 décembre" /></td>
                            <td><input type="url" name="ticker_link[]" value="<?php echo esc_url($item['link']); ?>" style="width: 100%;" placeholder="/actualites" /></td>
                        </tr>
                        <?php endforeach; ?>
                        <?php for ($i = count($items); $i < 10; $i++): ?>
                        <tr>
                            <td><input type="text" name="ticker_text[]" value="" style="width: 100%;" placeholder="Ex: 📻 Écoutez Radio Espoir 24h/24" /></td>
                            <td><input type="url" name="ticker_link[]" value="" style="width: 100%;" placeholder="/radio" /></td>
                        </tr>
                        <?php endfor; ?>
                    </tbody>
                </table>
                
                <p style="margin-top: 15px;">
                    <button type="submit" name="cendf_save_ticker" class="button button-primary">💾 Enregistrer les messages</button>
                </p>
            </form>
        </div>
        <?php
    }
});
