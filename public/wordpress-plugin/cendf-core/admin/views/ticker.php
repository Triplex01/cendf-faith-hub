<?php
if (!defined('ABSPATH')) {
    exit;
}

// Sauvegarder les messages
if (isset($_POST['cendf_save_ticker']) && check_admin_referer('cendf_ticker_nonce')) {
    $messages = [];
    
    if (!empty($_POST['ticker_messages']) && is_array($_POST['ticker_messages'])) {
        foreach ($_POST['ticker_messages'] as $msg) {
            if (!empty($msg['text'])) {
                $messages[] = [
                    'text' => sanitize_text_field($msg['text']),
                    'active' => isset($msg['active']) ? true : false,
                ];
            }
        }
    }
    
    update_option('cendf_ticker_messages', $messages);
    update_option('cendf_ticker_speed', sanitize_text_field($_POST['cendf_ticker_speed'] ?? 'normal'));
    
    echo '<div class="notice notice-success"><p>Bandeau défilant mis à jour !</p></div>';
}

$messages = get_option('cendf_ticker_messages', []);
$speed = get_option('cendf_ticker_speed', 'normal');

// Ajouter une ligne vide si aucun message
if (empty($messages)) {
    $messages = [['text' => '', 'active' => true]];
}
?>

<div class="wrap cendf-ticker">
    <h1>
        <span class="dashicons dashicons-megaphone"></span>
        Bandeau défilant
    </h1>
    
    <p class="description">
        Gérez les messages qui défilent en haut du site. Les messages actifs seront affichés en rotation.
    </p>
    
    <form method="post" action="">
        <?php wp_nonce_field('cendf_ticker_nonce'); ?>
        
        <div class="cendf-ticker-section">
            <h2>Messages</h2>
            
            <div id="ticker-messages">
                <?php foreach ($messages as $index => $msg) : ?>
                <div class="ticker-message-row">
                    <label class="ticker-active">
                        <input type="checkbox" name="ticker_messages[<?php echo $index; ?>][active]" 
                               <?php checked(!empty($msg['active'])); ?> />
                        Actif
                    </label>
                    <input type="text" name="ticker_messages[<?php echo $index; ?>][text]" 
                           value="<?php echo esc_attr($msg['text']); ?>" 
                           class="regular-text ticker-text" 
                           placeholder="Entrez votre message..." />
                    <button type="button" class="button ticker-remove" title="Supprimer">
                        <span class="dashicons dashicons-trash"></span>
                    </button>
                </div>
                <?php endforeach; ?>
            </div>
            
            <button type="button" id="add-ticker-message" class="button button-secondary">
                <span class="dashicons dashicons-plus-alt"></span>
                Ajouter un message
            </button>
        </div>
        
        <div class="cendf-ticker-section">
            <h2>Paramètres</h2>
            
            <table class="form-table">
                <tr>
                    <th><label for="cendf_ticker_speed">Vitesse de défilement</label></th>
                    <td>
                        <select id="cendf_ticker_speed" name="cendf_ticker_speed">
                            <option value="slow" <?php selected($speed, 'slow'); ?>>Lent</option>
                            <option value="normal" <?php selected($speed, 'normal'); ?>>Normal</option>
                            <option value="fast" <?php selected($speed, 'fast'); ?>>Rapide</option>
                        </select>
                    </td>
                </tr>
            </table>
        </div>
        
        <p class="submit">
            <input type="submit" name="cendf_save_ticker" class="button button-primary" value="Enregistrer" />
        </p>
    </form>
    
    <div class="cendf-ticker-preview">
        <h2>Aperçu</h2>
        <div class="ticker-preview-container">
            <div class="ticker-preview-content" id="ticker-preview">
                <?php 
                $active_messages = array_filter($messages, function($m) { return !empty($m['active']); });
                echo esc_html(implode(' • ', array_column($active_messages, 'text')));
                ?>
            </div>
        </div>
    </div>
</div>

<style>
.cendf-ticker h1 {
    display: flex;
    align-items: center;
    gap: 10px;
}
.cendf-ticker-section {
    background: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
}
.cendf-ticker-section h2 {
    margin-top: 0;
    color: #8B1538;
}
.ticker-message-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 5px;
}
.ticker-active {
    display: flex;
    align-items: center;
    gap: 5px;
    white-space: nowrap;
}
.ticker-text {
    flex: 1;
}
.ticker-remove {
    color: #dc3545;
}
.ticker-remove .dashicons {
    vertical-align: middle;
}
#add-ticker-message {
    margin-top: 10px;
}
#add-ticker-message .dashicons {
    vertical-align: middle;
    margin-right: 5px;
}
.cendf-ticker-preview {
    background: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
}
.ticker-preview-container {
    background: #8B1538;
    color: #FFD700;
    padding: 10px 20px;
    border-radius: 5px;
    overflow: hidden;
}
.ticker-preview-content {
    white-space: nowrap;
    animation: ticker-scroll 20s linear infinite;
}
@keyframes ticker-scroll {
    0% { transform: translateX(100%); }
    100% { transform: translateX(-100%); }
}
</style>

<script>
jQuery(document).ready(function($) {
    var messageIndex = <?php echo count($messages); ?>;
    
    // Ajouter un message
    $('#add-ticker-message').on('click', function() {
        var html = '<div class="ticker-message-row">' +
            '<label class="ticker-active">' +
            '<input type="checkbox" name="ticker_messages[' + messageIndex + '][active]" checked /> Actif' +
            '</label>' +
            '<input type="text" name="ticker_messages[' + messageIndex + '][text]" class="regular-text ticker-text" placeholder="Entrez votre message..." />' +
            '<button type="button" class="button ticker-remove" title="Supprimer"><span class="dashicons dashicons-trash"></span></button>' +
            '</div>';
        $('#ticker-messages').append(html);
        messageIndex++;
    });
    
    // Supprimer un message
    $(document).on('click', '.ticker-remove', function() {
        if ($('.ticker-message-row').length > 1) {
            $(this).closest('.ticker-message-row').remove();
        } else {
            $(this).closest('.ticker-message-row').find('.ticker-text').val('');
        }
    });
});
</script>
