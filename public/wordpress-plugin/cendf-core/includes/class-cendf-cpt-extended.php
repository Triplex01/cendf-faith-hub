<?php
/**
 * CENDF CPT Extended - Custom Post Types additionnels
 * 
 * Nouveaux CPT pour les prières, citations et flux radio
 */

if (!defined('ABSPATH')) {
    exit;
}

class CENDF_CPT_Extended {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('init', array($this, 'register_extended_post_types'), 15);
        add_action('init', array($this, 'register_extended_taxonomies'), 15);
    }
    
    /**
     * Enregistrer les CPT additionnels
     */
    public function register_extended_post_types() {
        
        // CPT: Prières
        register_post_type('prayer', array(
            'labels' => array(
                'name' => 'Prières',
                'singular_name' => 'Prière',
                'menu_name' => 'Prières',
                'add_new' => 'Ajouter',
                'add_new_item' => 'Ajouter une prière',
                'edit_item' => 'Modifier la prière',
                'new_item' => 'Nouvelle prière',
                'view_item' => 'Voir la prière',
                'search_items' => 'Rechercher des prières',
                'not_found' => 'Aucune prière trouvée',
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'prieres'),
            'menu_icon' => 'dashicons-heart',
            'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'show_in_rest' => true,
            'rest_base' => 'prayers',
        ));
        
        // CPT: Citations
        register_post_type('citation', array(
            'labels' => array(
                'name' => 'Citations',
                'singular_name' => 'Citation',
                'menu_name' => 'Citations',
                'add_new' => 'Ajouter',
                'add_new_item' => 'Ajouter une citation',
                'edit_item' => 'Modifier la citation',
                'new_item' => 'Nouvelle citation',
                'view_item' => 'Voir la citation',
                'search_items' => 'Rechercher des citations',
                'not_found' => 'Aucune citation trouvée',
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'citations'),
            'menu_icon' => 'dashicons-format-quote',
            'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
            'show_in_rest' => true,
            'rest_base' => 'citations',
        ));
        
        // CPT: Flux Radio
        register_post_type('radio_stream', array(
            'labels' => array(
                'name' => 'Radios',
                'singular_name' => 'Radio',
                'menu_name' => 'Radios',
                'add_new' => 'Ajouter',
                'add_new_item' => 'Ajouter une radio',
                'edit_item' => 'Modifier la radio',
                'new_item' => 'Nouvelle radio',
                'view_item' => 'Voir la radio',
                'search_items' => 'Rechercher des radios',
                'not_found' => 'Aucune radio trouvée',
            ),
            'public' => true,
            'has_archive' => false,
            'rewrite' => array('slug' => 'radios'),
            'menu_icon' => 'dashicons-controls-volumeon',
            'supports' => array('title', 'thumbnail', 'custom-fields'),
            'show_in_rest' => true,
            'rest_base' => 'radio-streams',
        ));
        
        // CPT: Saint du jour
        register_post_type('saint', array(
            'labels' => array(
                'name' => 'Saints',
                'singular_name' => 'Saint',
                'menu_name' => 'Saints du jour',
                'add_new' => 'Ajouter',
                'add_new_item' => 'Ajouter un saint',
                'edit_item' => 'Modifier le saint',
                'new_item' => 'Nouveau saint',
                'view_item' => 'Voir le saint',
                'search_items' => 'Rechercher des saints',
                'not_found' => 'Aucun saint trouvé',
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'saints'),
            'menu_icon' => 'dashicons-awards',
            'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'show_in_rest' => true,
            'rest_base' => 'saints',
        ));
        
        // CPT: Lectures liturgiques
        register_post_type('reading', array(
            'labels' => array(
                'name' => 'Lectures',
                'singular_name' => 'Lecture',
                'menu_name' => 'Lectures liturgiques',
                'add_new' => 'Ajouter',
                'add_new_item' => 'Ajouter une lecture',
                'edit_item' => 'Modifier la lecture',
                'new_item' => 'Nouvelle lecture',
                'view_item' => 'Voir la lecture',
                'search_items' => 'Rechercher des lectures',
                'not_found' => 'Aucune lecture trouvée',
            ),
            'public' => true,
            'has_archive' => true,
            'rewrite' => array('slug' => 'lectures'),
            'menu_icon' => 'dashicons-book-alt',
            'supports' => array('title', 'editor', 'custom-fields'),
            'show_in_rest' => true,
            'rest_base' => 'readings',
        ));
    }
    
    /**
     * Enregistrer les taxonomies additionnelles
     */
    public function register_extended_taxonomies() {
        
        // Taxonomie: Catégorie de prière
        register_taxonomy('prayer_category', 'prayer', array(
            'labels' => array(
                'name' => 'Catégories de prières',
                'singular_name' => 'Catégorie de prière',
                'menu_name' => 'Catégories',
                'search_items' => 'Rechercher',
                'all_items' => 'Toutes les catégories',
                'parent_item' => 'Catégorie parente',
                'edit_item' => 'Modifier',
                'add_new_item' => 'Ajouter',
            ),
            'hierarchical' => true,
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'rewrite' => array('slug' => 'categorie-priere'),
            'show_in_rest' => true,
        ));
        
        // Taxonomie: Auteur de citation
        register_taxonomy('citation_author', 'citation', array(
            'labels' => array(
                'name' => 'Auteurs',
                'singular_name' => 'Auteur',
                'menu_name' => 'Auteurs',
                'search_items' => 'Rechercher',
                'all_items' => 'Tous les auteurs',
                'edit_item' => 'Modifier',
                'add_new_item' => 'Ajouter',
            ),
            'hierarchical' => false,
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'rewrite' => array('slug' => 'auteur'),
            'show_in_rest' => true,
        ));
        
        // Taxonomie: Temps liturgique
        register_taxonomy('liturgical_time', array('reading', 'saint'), array(
            'labels' => array(
                'name' => 'Temps liturgiques',
                'singular_name' => 'Temps liturgique',
                'menu_name' => 'Temps liturgiques',
                'search_items' => 'Rechercher',
                'all_items' => 'Tous les temps',
                'edit_item' => 'Modifier',
                'add_new_item' => 'Ajouter',
            ),
            'hierarchical' => true,
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'rewrite' => array('slug' => 'temps-liturgique'),
            'show_in_rest' => true,
        ));
    }
}

// Initialiser
CENDF_CPT_Extended::get_instance();
