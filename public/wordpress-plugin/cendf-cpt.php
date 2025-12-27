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
