<?php
/**
 * Gestion des Custom Post Types
 */

if (!defined('ABSPATH')) {
    exit;
}

class CENDF_CPT {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('init', [$this, 'register_post_types']);
        add_action('init', [$this, 'register_taxonomies']);
    }
    
    public function register_post_types() {
        
        // === ÉVÉNEMENTS ===
        register_post_type('event', [
            'labels' => [
                'name' => __('Événements', 'cendf-core'),
                'singular_name' => __('Événement', 'cendf-core'),
                'add_new' => __('Ajouter', 'cendf-core'),
                'add_new_item' => __('Ajouter un événement', 'cendf-core'),
                'edit_item' => __('Modifier l\'événement', 'cendf-core'),
                'new_item' => __('Nouvel événement', 'cendf-core'),
                'view_item' => __('Voir l\'événement', 'cendf-core'),
                'search_items' => __('Rechercher des événements', 'cendf-core'),
                'not_found' => __('Aucun événement trouvé', 'cendf-core'),
                'menu_name' => __('Événements', 'cendf-core'),
            ],
            'public' => true,
            'has_archive' => true,
            'rewrite' => ['slug' => 'evenements', 'with_front' => false],
            'menu_icon' => 'dashicons-calendar-alt',
            'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
            'show_in_rest' => true,
            'rest_base' => 'events',
        ]);
        
        // === PODCASTS ===
        register_post_type('podcast', [
            'labels' => [
                'name' => __('Podcasts', 'cendf-core'),
                'singular_name' => __('Podcast', 'cendf-core'),
                'add_new' => __('Ajouter', 'cendf-core'),
                'add_new_item' => __('Ajouter un podcast', 'cendf-core'),
                'edit_item' => __('Modifier le podcast', 'cendf-core'),
                'menu_name' => __('Podcasts', 'cendf-core'),
            ],
            'public' => true,
            'has_archive' => true,
            'rewrite' => ['slug' => 'podcasts', 'with_front' => false],
            'menu_icon' => 'dashicons-microphone',
            'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
            'show_in_rest' => true,
            'rest_base' => 'podcasts',
        ]);
        
        // === PROGRAMMES RADIO ===
        register_post_type('program', [
            'labels' => [
                'name' => __('Programmes', 'cendf-core'),
                'singular_name' => __('Programme', 'cendf-core'),
                'add_new' => __('Ajouter', 'cendf-core'),
                'add_new_item' => __('Ajouter un programme', 'cendf-core'),
                'edit_item' => __('Modifier le programme', 'cendf-core'),
                'menu_name' => __('Programmes Radio', 'cendf-core'),
            ],
            'public' => true,
            'has_archive' => true,
            'rewrite' => ['slug' => 'programmes', 'with_front' => false],
            'menu_icon' => 'dashicons-playlist-audio',
            'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
            'show_in_rest' => true,
            'rest_base' => 'programs',
        ]);
        
        // === ANIMATEURS ===
        register_post_type('animator', [
            'labels' => [
                'name' => __('Animateurs', 'cendf-core'),
                'singular_name' => __('Animateur', 'cendf-core'),
                'add_new' => __('Ajouter', 'cendf-core'),
                'add_new_item' => __('Ajouter un animateur', 'cendf-core'),
                'edit_item' => __('Modifier l\'animateur', 'cendf-core'),
                'menu_name' => __('Animateurs', 'cendf-core'),
            ],
            'public' => true,
            'has_archive' => true,
            'rewrite' => ['slug' => 'animateurs', 'with_front' => false],
            'menu_icon' => 'dashicons-admin-users',
            'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
            'show_in_rest' => true,
            'rest_base' => 'animators',
        ]);
        
        // === ENSEIGNEMENTS ===
        register_post_type('teaching', [
            'labels' => [
                'name' => __('Enseignements', 'cendf-core'),
                'singular_name' => __('Enseignement', 'cendf-core'),
                'add_new' => __('Ajouter', 'cendf-core'),
                'add_new_item' => __('Ajouter un enseignement', 'cendf-core'),
                'edit_item' => __('Modifier l\'enseignement', 'cendf-core'),
                'menu_name' => __('Enseignements', 'cendf-core'),
            ],
            'public' => true,
            'has_archive' => true,
            'rewrite' => ['slug' => 'enseignements', 'with_front' => false],
            'menu_icon' => 'dashicons-welcome-learn-more',
            'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
            'show_in_rest' => true,
            'rest_base' => 'teachings',
        ]);
        
        // === DOCUMENTS ===
        register_post_type('document', [
            'labels' => [
                'name' => __('Documents', 'cendf-core'),
                'singular_name' => __('Document', 'cendf-core'),
                'add_new' => __('Ajouter', 'cendf-core'),
                'add_new_item' => __('Ajouter un document', 'cendf-core'),
                'edit_item' => __('Modifier le document', 'cendf-core'),
                'menu_name' => __('Documents', 'cendf-core'),
            ],
            'public' => true,
            'has_archive' => true,
            'rewrite' => ['slug' => 'documents', 'with_front' => false],
            'menu_icon' => 'dashicons-media-document',
            'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
            'show_in_rest' => true,
            'rest_base' => 'documents',
        ]);
        
        // === ARCHIVES ===
        register_post_type('archive_item', [
            'labels' => [
                'name' => __('Archives', 'cendf-core'),
                'singular_name' => __('Archive', 'cendf-core'),
                'add_new' => __('Ajouter', 'cendf-core'),
                'add_new_item' => __('Ajouter une archive', 'cendf-core'),
                'edit_item' => __('Modifier l\'archive', 'cendf-core'),
                'menu_name' => __('Archives', 'cendf-core'),
            ],
            'public' => true,
            'has_archive' => true,
            'rewrite' => ['slug' => 'archives', 'with_front' => false],
            'menu_icon' => 'dashicons-archive',
            'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
            'show_in_rest' => true,
            'rest_base' => 'archives',
        ]);
        
        // === PRODUITS ===
        register_post_type('product', [
            'labels' => [
                'name' => __('Produits', 'cendf-core'),
                'singular_name' => __('Produit', 'cendf-core'),
                'add_new' => __('Ajouter', 'cendf-core'),
                'add_new_item' => __('Ajouter un produit', 'cendf-core'),
                'edit_item' => __('Modifier le produit', 'cendf-core'),
                'menu_name' => __('Boutique', 'cendf-core'),
            ],
            'public' => true,
            'has_archive' => true,
            'rewrite' => ['slug' => 'boutique', 'with_front' => false],
            'menu_icon' => 'dashicons-cart',
            'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
            'show_in_rest' => true,
            'rest_base' => 'products',
        ]);
        
        // === ACTIVITÉS ===
        register_post_type('activity', [
            'labels' => [
                'name' => __('Activités', 'cendf-core'),
                'singular_name' => __('Activité', 'cendf-core'),
                'add_new' => __('Ajouter', 'cendf-core'),
                'add_new_item' => __('Ajouter une activité', 'cendf-core'),
                'edit_item' => __('Modifier l\'activité', 'cendf-core'),
                'menu_name' => __('Activités', 'cendf-core'),
            ],
            'public' => true,
            'has_archive' => true,
            'rewrite' => ['slug' => 'activites', 'with_front' => false],
            'menu_icon' => 'dashicons-groups',
            'supports' => ['title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'],
            'show_in_rest' => true,
            'rest_base' => 'activities',
        ]);
    }
    
    public function register_taxonomies() {
        
        // Catégories d'enseignements
        register_taxonomy('teaching_category', 'teaching', [
            'labels' => [
                'name' => __('Catégories d\'enseignements', 'cendf-core'),
                'singular_name' => __('Catégorie', 'cendf-core'),
            ],
            'hierarchical' => true,
            'show_in_rest' => true,
            'rewrite' => ['slug' => 'categorie-enseignement'],
        ]);
        
        // Catégories de documents
        register_taxonomy('document_category', 'document', [
            'labels' => [
                'name' => __('Catégories de documents', 'cendf-core'),
                'singular_name' => __('Catégorie', 'cendf-core'),
            ],
            'hierarchical' => true,
            'show_in_rest' => true,
            'rewrite' => ['slug' => 'categorie-document'],
        ]);
        
        // Catégories de produits
        register_taxonomy('product_category', 'product', [
            'labels' => [
                'name' => __('Catégories de produits', 'cendf-core'),
                'singular_name' => __('Catégorie', 'cendf-core'),
            ],
            'hierarchical' => true,
            'show_in_rest' => true,
            'rewrite' => ['slug' => 'categorie-produit'],
        ]);
        
        // Types d'activités
        register_taxonomy('activity_type', 'activity', [
            'labels' => [
                'name' => __('Types d\'activités', 'cendf-core'),
                'singular_name' => __('Type', 'cendf-core'),
            ],
            'hierarchical' => true,
            'show_in_rest' => true,
            'rewrite' => ['slug' => 'type-activite'],
        ]);
    }
}
