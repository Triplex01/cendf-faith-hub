<?php
/**
 * Gestion des options du plugin
 */

if (!defined('ABSPATH')) {
    exit;
}

class CENDF_Options {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('admin_init', [$this, 'register_settings']);
    }
    
    public function register_settings() {
        // === Section Général ===
        add_settings_section(
            'cendf_general_section',
            __('Paramètres généraux', 'cendf-core'),
            null,
            'cendf-settings'
        );
        
        // Nom du site
        register_setting('cendf_options', 'cendf_site_name', [
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
            'default' => 'CENDF - Radio Espoir',
        ]);
        
        add_settings_field(
            'cendf_site_name',
            __('Nom du site', 'cendf-core'),
            [$this, 'render_text_field'],
            'cendf-settings',
            'cendf_general_section',
            ['option' => 'cendf_site_name', 'description' => 'Nom affiché sur le site']
        );
        
        // URL du flux radio
        register_setting('cendf_options', 'cendf_radio_stream_url', [
            'type' => 'string',
            'sanitize_callback' => 'esc_url_raw',
        ]);
        
        add_settings_field(
            'cendf_radio_stream_url',
            __('URL du flux radio', 'cendf-core'),
            [$this, 'render_text_field'],
            'cendf-settings',
            'cendf_general_section',
            ['option' => 'cendf_radio_stream_url', 'type' => 'url', 'description' => 'URL du stream audio (mp3, m3u8, etc.)']
        );
        
        // === Section Contact ===
        add_settings_section(
            'cendf_contact_section',
            __('Informations de contact', 'cendf-core'),
            null,
            'cendf-settings'
        );
        
        register_setting('cendf_options', 'cendf_contact_email', [
            'type' => 'string',
            'sanitize_callback' => 'sanitize_email',
        ]);
        
        add_settings_field(
            'cendf_contact_email',
            __('Email de contact', 'cendf-core'),
            [$this, 'render_text_field'],
            'cendf-settings',
            'cendf_contact_section',
            ['option' => 'cendf_contact_email', 'type' => 'email']
        );
        
        register_setting('cendf_options', 'cendf_phone', [
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
        ]);
        
        add_settings_field(
            'cendf_phone',
            __('Téléphone', 'cendf-core'),
            [$this, 'render_text_field'],
            'cendf-settings',
            'cendf_contact_section',
            ['option' => 'cendf_phone', 'type' => 'tel']
        );
        
        register_setting('cendf_options', 'cendf_address', [
            'type' => 'string',
            'sanitize_callback' => 'sanitize_textarea_field',
        ]);
        
        add_settings_field(
            'cendf_address',
            __('Adresse', 'cendf-core'),
            [$this, 'render_textarea_field'],
            'cendf-settings',
            'cendf_contact_section',
            ['option' => 'cendf_address']
        );
        
        // === Section Réseaux Sociaux ===
        add_settings_section(
            'cendf_social_section',
            __('Réseaux sociaux', 'cendf-core'),
            null,
            'cendf-settings'
        );
        
        $social_networks = [
            'cendf_facebook_url' => 'Facebook',
            'cendf_youtube_url' => 'YouTube',
            'cendf_twitter_url' => 'Twitter/X',
            'cendf_instagram_url' => 'Instagram',
            'cendf_whatsapp' => 'WhatsApp (numéro)',
        ];
        
        foreach ($social_networks as $option => $label) {
            register_setting('cendf_options', $option, [
                'type' => 'string',
                'sanitize_callback' => $option === 'cendf_whatsapp' ? 'sanitize_text_field' : 'esc_url_raw',
            ]);
            
            add_settings_field(
                $option,
                __($label, 'cendf-core'),
                [$this, 'render_text_field'],
                'cendf-settings',
                'cendf_social_section',
                ['option' => $option, 'type' => 'url']
            );
        }
        
        // === Section Paiements ===
        add_settings_section(
            'cendf_payment_section',
            __('Configuration des paiements', 'cendf-core'),
            null,
            'cendf-settings'
        );
        
        register_setting('cendf_options', 'cendf_orange_money_merchant', [
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
        ]);
        
        add_settings_field(
            'cendf_orange_money_merchant',
            __('Code marchand Orange Money', 'cendf-core'),
            [$this, 'render_text_field'],
            'cendf-settings',
            'cendf_payment_section',
            ['option' => 'cendf_orange_money_merchant']
        );
        
        register_setting('cendf_options', 'cendf_wave_merchant', [
            'type' => 'string',
            'sanitize_callback' => 'sanitize_text_field',
        ]);
        
        add_settings_field(
            'cendf_wave_merchant',
            __('ID marchand Wave', 'cendf-core'),
            [$this, 'render_text_field'],
            'cendf-settings',
            'cendf_payment_section',
            ['option' => 'cendf_wave_merchant']
        );
    }
    
    public function render_text_field($args) {
        $option = $args['option'];
        $value = get_option($option, '');
        $type = $args['type'] ?? 'text';
        $description = $args['description'] ?? '';
        
        printf(
            '<input type="%s" id="%s" name="%s" value="%s" class="regular-text" />',
            esc_attr($type),
            esc_attr($option),
            esc_attr($option),
            esc_attr($value)
        );
        
        if ($description) {
            printf('<p class="description">%s</p>', esc_html($description));
        }
    }
    
    public function render_textarea_field($args) {
        $option = $args['option'];
        $value = get_option($option, '');
        
        printf(
            '<textarea id="%s" name="%s" rows="4" class="large-text">%s</textarea>',
            esc_attr($option),
            esc_attr($option),
            esc_textarea($value)
        );
    }
}
