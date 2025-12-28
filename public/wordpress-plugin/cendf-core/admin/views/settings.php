<?php
if (!defined('ABSPATH')) {
    exit;
}

// Sauvegarder les paramètres
if (isset($_POST['cendf_save_settings']) && check_admin_referer('cendf_settings_nonce')) {
    // Options générales
    update_option('cendf_site_name', sanitize_text_field($_POST['cendf_site_name'] ?? ''));
    update_option('cendf_radio_stream_url', esc_url_raw($_POST['cendf_radio_stream_url'] ?? ''));
    
    // Contact
    update_option('cendf_contact_email', sanitize_email($_POST['cendf_contact_email'] ?? ''));
    update_option('cendf_phone', sanitize_text_field($_POST['cendf_phone'] ?? ''));
    update_option('cendf_address', sanitize_textarea_field($_POST['cendf_address'] ?? ''));
    
    // Réseaux sociaux
    update_option('cendf_facebook_url', esc_url_raw($_POST['cendf_facebook_url'] ?? ''));
    update_option('cendf_youtube_url', esc_url_raw($_POST['cendf_youtube_url'] ?? ''));
    update_option('cendf_twitter_url', esc_url_raw($_POST['cendf_twitter_url'] ?? ''));
    update_option('cendf_instagram_url', esc_url_raw($_POST['cendf_instagram_url'] ?? ''));
    update_option('cendf_whatsapp', sanitize_text_field($_POST['cendf_whatsapp'] ?? ''));
    
    // Paiements
    update_option('cendf_orange_money_merchant', sanitize_text_field($_POST['cendf_orange_money_merchant'] ?? ''));
    update_option('cendf_wave_merchant', sanitize_text_field($_POST['cendf_wave_merchant'] ?? ''));
    
    // CORS
    update_option('cendf_cors_origins', sanitize_textarea_field($_POST['cendf_cors_origins'] ?? ''));
    
    echo '<div class="notice notice-success"><p>Paramètres enregistrés avec succès !</p></div>';
}
?>

<div class="wrap cendf-settings">
    <h1>
        <span class="dashicons dashicons-admin-settings"></span>
        Paramètres CENDF
    </h1>
    
    <form method="post" action="">
        <?php wp_nonce_field('cendf_settings_nonce'); ?>
        
        <!-- Général -->
        <div class="cendf-settings-section">
            <h2>Paramètres généraux</h2>
            
            <table class="form-table">
                <tr>
                    <th><label for="cendf_site_name">Nom du site</label></th>
                    <td>
                        <input type="text" id="cendf_site_name" name="cendf_site_name" 
                               value="<?php echo esc_attr(get_option('cendf_site_name', 'CENDF - Radio Espoir')); ?>" 
                               class="regular-text" />
                    </td>
                </tr>
                <tr>
                    <th><label for="cendf_radio_stream_url">URL du flux radio</label></th>
                    <td>
                        <input type="url" id="cendf_radio_stream_url" name="cendf_radio_stream_url" 
                               value="<?php echo esc_attr(get_option('cendf_radio_stream_url', '')); ?>" 
                               class="regular-text" 
                               placeholder="https://stream.radioespoir.ci/live" />
                        <p class="description">URL du stream audio en direct (mp3, m3u8, etc.)</p>
                    </td>
                </tr>
            </table>
        </div>
        
        <!-- Contact -->
        <div class="cendf-settings-section">
            <h2>Informations de contact</h2>
            
            <table class="form-table">
                <tr>
                    <th><label for="cendf_contact_email">Email de contact</label></th>
                    <td>
                        <input type="email" id="cendf_contact_email" name="cendf_contact_email" 
                               value="<?php echo esc_attr(get_option('cendf_contact_email', '')); ?>" 
                               class="regular-text" />
                    </td>
                </tr>
                <tr>
                    <th><label for="cendf_phone">Téléphone</label></th>
                    <td>
                        <input type="text" id="cendf_phone" name="cendf_phone" 
                               value="<?php echo esc_attr(get_option('cendf_phone', '')); ?>" 
                               class="regular-text" 
                               placeholder="+225 XX XX XX XX XX" />
                    </td>
                </tr>
                <tr>
                    <th><label for="cendf_address">Adresse</label></th>
                    <td>
                        <textarea id="cendf_address" name="cendf_address" 
                                  rows="3" class="large-text"><?php echo esc_textarea(get_option('cendf_address', '')); ?></textarea>
                    </td>
                </tr>
            </table>
        </div>
        
        <!-- Réseaux sociaux -->
        <div class="cendf-settings-section">
            <h2>Réseaux sociaux</h2>
            
            <table class="form-table">
                <tr>
                    <th><label for="cendf_facebook_url">Facebook</label></th>
                    <td>
                        <input type="url" id="cendf_facebook_url" name="cendf_facebook_url" 
                               value="<?php echo esc_attr(get_option('cendf_facebook_url', '')); ?>" 
                               class="regular-text" 
                               placeholder="https://facebook.com/..." />
                    </td>
                </tr>
                <tr>
                    <th><label for="cendf_youtube_url">YouTube</label></th>
                    <td>
                        <input type="url" id="cendf_youtube_url" name="cendf_youtube_url" 
                               value="<?php echo esc_attr(get_option('cendf_youtube_url', '')); ?>" 
                               class="regular-text" 
                               placeholder="https://youtube.com/@..." />
                    </td>
                </tr>
                <tr>
                    <th><label for="cendf_twitter_url">Twitter/X</label></th>
                    <td>
                        <input type="url" id="cendf_twitter_url" name="cendf_twitter_url" 
                               value="<?php echo esc_attr(get_option('cendf_twitter_url', '')); ?>" 
                               class="regular-text" />
                    </td>
                </tr>
                <tr>
                    <th><label for="cendf_instagram_url">Instagram</label></th>
                    <td>
                        <input type="url" id="cendf_instagram_url" name="cendf_instagram_url" 
                               value="<?php echo esc_attr(get_option('cendf_instagram_url', '')); ?>" 
                               class="regular-text" />
                    </td>
                </tr>
                <tr>
                    <th><label for="cendf_whatsapp">WhatsApp</label></th>
                    <td>
                        <input type="text" id="cendf_whatsapp" name="cendf_whatsapp" 
                               value="<?php echo esc_attr(get_option('cendf_whatsapp', '')); ?>" 
                               class="regular-text" 
                               placeholder="+225XXXXXXXXXX" />
                        <p class="description">Numéro au format international (sans espaces)</p>
                    </td>
                </tr>
            </table>
        </div>
        
        <!-- Paiements -->
        <div class="cendf-settings-section">
            <h2>Configuration des paiements</h2>
            
            <table class="form-table">
                <tr>
                    <th><label for="cendf_orange_money_merchant">Code marchand Orange Money</label></th>
                    <td>
                        <input type="text" id="cendf_orange_money_merchant" name="cendf_orange_money_merchant" 
                               value="<?php echo esc_attr(get_option('cendf_orange_money_merchant', '')); ?>" 
                               class="regular-text" />
                    </td>
                </tr>
                <tr>
                    <th><label for="cendf_wave_merchant">ID marchand Wave</label></th>
                    <td>
                        <input type="text" id="cendf_wave_merchant" name="cendf_wave_merchant" 
                               value="<?php echo esc_attr(get_option('cendf_wave_merchant', '')); ?>" 
                               class="regular-text" />
                    </td>
                </tr>
            </table>
        </div>
        
        <!-- Sécurité / CORS -->
        <div class="cendf-settings-section">
            <h2>Sécurité (CORS)</h2>
            
            <table class="form-table">
                <tr>
                    <th><label for="cendf_cors_origins">Origines autorisées</label></th>
                    <td>
                        <textarea id="cendf_cors_origins" name="cendf_cors_origins" 
                                  rows="4" class="large-text"><?php echo esc_textarea(get_option('cendf_cors_origins', '')); ?></textarea>
                        <p class="description">Une URL par ligne. Ex: https://monsite.com<br>
                        localhost est automatiquement autorisé en développement.</p>
                    </td>
                </tr>
            </table>
        </div>
        
        <p class="submit">
            <input type="submit" name="cendf_save_settings" class="button button-primary" value="Enregistrer les paramètres" />
        </p>
    </form>
</div>

<style>
.cendf-settings h1 {
    display: flex;
    align-items: center;
    gap: 10px;
}
.cendf-settings-section {
    background: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
}
.cendf-settings-section h2 {
    margin-top: 0;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    color: #8B1538;
}
</style>
