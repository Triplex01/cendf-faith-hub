<?php
/**
 * Enregistrement des champs ACF
 */

if (!defined('ABSPATH')) {
    exit;
}

class CENDF_ACF {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('acf/init', [$this, 'register_field_groups']);
    }
    
    public function register_field_groups() {
        if (!function_exists('acf_add_local_field_group')) {
            return;
        }
        
        // === ÉVÉNEMENTS ===
        acf_add_local_field_group([
            'key' => 'group_event',
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
                    'type' => 'text',
                    'placeholder' => '14h00 - 17h00',
                ],
                [
                    'key' => 'field_event_location',
                    'label' => 'Lieu',
                    'name' => 'location',
                    'type' => 'text',
                ],
                [
                    'key' => 'field_event_organizer',
                    'label' => 'Organisateur',
                    'name' => 'organizer',
                    'type' => 'text',
                ],
                [
                    'key' => 'field_event_registration_url',
                    'label' => 'Lien d\'inscription',
                    'name' => 'registration_url',
                    'type' => 'url',
                ],
            ],
            'location' => [
                [[
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'event',
                ]],
            ],
        ]);
        
        // === PODCASTS ===
        acf_add_local_field_group([
            'key' => 'group_podcast',
            'title' => 'Détails du podcast',
            'fields' => [
                [
                    'key' => 'field_podcast_audio',
                    'label' => 'Fichier audio',
                    'name' => 'audio_url',
                    'type' => 'file',
                    'return_format' => 'url',
                    'mime_types' => 'mp3,wav,ogg,m4a',
                ],
                [
                    'key' => 'field_podcast_video',
                    'label' => 'URL vidéo YouTube',
                    'name' => 'video_url',
                    'type' => 'url',
                    'instructions' => 'URL YouTube pour les podcasts vidéo',
                ],
                [
                    'key' => 'field_podcast_duration',
                    'label' => 'Durée',
                    'name' => 'duration',
                    'type' => 'text',
                    'placeholder' => '45:30',
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
                    'label' => 'Date de diffusion',
                    'name' => 'date',
                    'type' => 'date_picker',
                    'return_format' => 'Y-m-d',
                ],
            ],
            'location' => [
                [[
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'podcast',
                ]],
            ],
        ]);
        
        // === PROGRAMMES ===
        acf_add_local_field_group([
            'key' => 'group_program',
            'title' => 'Détails du programme',
            'fields' => [
                [
                    'key' => 'field_program_time_slot',
                    'label' => 'Créneau horaire',
                    'name' => 'time_slot',
                    'type' => 'text',
                    'placeholder' => '06h00 - 08h00',
                ],
                [
                    'key' => 'field_program_days',
                    'label' => 'Jours de diffusion',
                    'name' => 'day_of_week',
                    'type' => 'checkbox',
                    'choices' => [
                        'lundi' => 'Lundi',
                        'mardi' => 'Mardi',
                        'mercredi' => 'Mercredi',
                        'jeudi' => 'Jeudi',
                        'vendredi' => 'Vendredi',
                        'samedi' => 'Samedi',
                        'dimanche' => 'Dimanche',
                    ],
                ],
                [
                    'key' => 'field_program_host',
                    'label' => 'Animateur',
                    'name' => 'host',
                    'type' => 'post_object',
                    'post_type' => ['animator'],
                    'return_format' => 'id',
                ],
                [
                    'key' => 'field_program_type',
                    'label' => 'Type',
                    'name' => 'type',
                    'type' => 'select',
                    'choices' => [
                        'spiritual' => 'Spirituel',
                        'music' => 'Musical',
                        'teaching' => 'Enseignement',
                        'news' => 'Actualités',
                        'interactive' => 'Interactif',
                    ],
                ],
            ],
            'location' => [
                [[
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'program',
                ]],
            ],
        ]);
        
        // === ANIMATEURS ===
        acf_add_local_field_group([
            'key' => 'group_animator',
            'title' => 'Profil de l\'animateur',
            'fields' => [
                [
                    'key' => 'field_animator_role',
                    'label' => 'Rôle',
                    'name' => 'role',
                    'type' => 'text',
                    'placeholder' => 'Animateur principal',
                ],
                [
                    'key' => 'field_animator_bio',
                    'label' => 'Biographie courte',
                    'name' => 'bio',
                    'type' => 'textarea',
                    'rows' => 4,
                ],
                [
                    'key' => 'field_animator_email',
                    'label' => 'Email',
                    'name' => 'email',
                    'type' => 'email',
                ],
            ],
            'location' => [
                [[
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'animator',
                ]],
            ],
        ]);
        
        // === ENSEIGNEMENTS ===
        acf_add_local_field_group([
            'key' => 'group_teaching',
            'title' => 'Détails de l\'enseignement',
            'fields' => [
                [
                    'key' => 'field_teaching_author',
                    'label' => 'Auteur / Prédicateur',
                    'name' => 'author',
                    'type' => 'text',
                ],
                [
                    'key' => 'field_teaching_duration',
                    'label' => 'Durée',
                    'name' => 'duration',
                    'type' => 'text',
                    'placeholder' => '1h30',
                ],
                [
                    'key' => 'field_teaching_audio',
                    'label' => 'Fichier audio',
                    'name' => 'audio_url',
                    'type' => 'file',
                    'return_format' => 'url',
                    'mime_types' => 'mp3,wav,ogg',
                ],
                [
                    'key' => 'field_teaching_video',
                    'label' => 'URL vidéo',
                    'name' => 'video_url',
                    'type' => 'url',
                ],
                [
                    'key' => 'field_teaching_date',
                    'label' => 'Date',
                    'name' => 'date',
                    'type' => 'date_picker',
                    'return_format' => 'Y-m-d',
                ],
            ],
            'location' => [
                [[
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'teaching',
                ]],
            ],
        ]);
        
        // === DOCUMENTS ===
        acf_add_local_field_group([
            'key' => 'group_document',
            'title' => 'Fichier du document',
            'fields' => [
                [
                    'key' => 'field_document_file',
                    'label' => 'Fichier',
                    'name' => 'file_url',
                    'type' => 'file',
                    'return_format' => 'url',
                ],
                [
                    'key' => 'field_document_type',
                    'label' => 'Type de fichier',
                    'name' => 'file_type',
                    'type' => 'select',
                    'choices' => [
                        'pdf' => 'PDF',
                        'doc' => 'Word',
                        'xls' => 'Excel',
                        'ppt' => 'PowerPoint',
                        'other' => 'Autre',
                    ],
                ],
                [
                    'key' => 'field_document_size',
                    'label' => 'Taille du fichier',
                    'name' => 'file_size',
                    'type' => 'text',
                    'placeholder' => '2.5 MB',
                ],
                [
                    'key' => 'field_document_date',
                    'label' => 'Date de publication',
                    'name' => 'date',
                    'type' => 'date_picker',
                    'return_format' => 'Y-m-d',
                ],
            ],
            'location' => [
                [[
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'document',
                ]],
            ],
        ]);
        
        // === PRODUITS ===
        acf_add_local_field_group([
            'key' => 'group_product',
            'title' => 'Détails du produit',
            'fields' => [
                [
                    'key' => 'field_product_price',
                    'label' => 'Prix (XOF)',
                    'name' => 'price',
                    'type' => 'number',
                    'required' => 1,
                ],
                [
                    'key' => 'field_product_sale_price',
                    'label' => 'Prix promotionnel',
                    'name' => 'sale_price',
                    'type' => 'number',
                ],
                [
                    'key' => 'field_product_stock',
                    'label' => 'Stock',
                    'name' => 'stock',
                    'type' => 'number',
                    'default_value' => 0,
                ],
                [
                    'key' => 'field_product_gallery',
                    'label' => 'Galerie d\'images',
                    'name' => 'gallery',
                    'type' => 'gallery',
                    'return_format' => 'array',
                ],
                [
                    'key' => 'field_product_downloadable',
                    'label' => 'Produit téléchargeable',
                    'name' => 'is_downloadable',
                    'type' => 'true_false',
                ],
                [
                    'key' => 'field_product_download_file',
                    'label' => 'Fichier à télécharger',
                    'name' => 'download_file',
                    'type' => 'file',
                    'return_format' => 'url',
                    'conditional_logic' => [
                        [[
                            'field' => 'field_product_downloadable',
                            'operator' => '==',
                            'value' => 1,
                        ]],
                    ],
                ],
            ],
            'location' => [
                [[
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'product',
                ]],
            ],
        ]);
        
        // === ACTIVITÉS ===
        acf_add_local_field_group([
            'key' => 'group_activity',
            'title' => 'Détails de l\'activité',
            'fields' => [
                [
                    'key' => 'field_activity_schedule',
                    'label' => 'Horaire',
                    'name' => 'schedule',
                    'type' => 'text',
                    'placeholder' => 'Dimanche 8h00',
                ],
                [
                    'key' => 'field_activity_location',
                    'label' => 'Lieu',
                    'name' => 'location',
                    'type' => 'text',
                ],
                [
                    'key' => 'field_activity_participants',
                    'label' => 'Nombre de participants',
                    'name' => 'participants',
                    'type' => 'text',
                    'placeholder' => '50 participants',
                ],
                [
                    'key' => 'field_activity_youtube',
                    'label' => 'Playlist YouTube',
                    'name' => 'youtube_url',
                    'type' => 'url',
                    'instructions' => 'URL de la playlist YouTube liée',
                ],
                [
                    'key' => 'field_activity_gallery',
                    'label' => 'Galerie photos',
                    'name' => 'gallery',
                    'type' => 'gallery',
                    'return_format' => 'array',
                ],
            ],
            'location' => [
                [[
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'activity',
                ]],
            ],
        ]);
    }
}
