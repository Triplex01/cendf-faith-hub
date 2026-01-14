<?php
/**
 * Page de gestion des mises à jour SCEDF
 */
if (!defined('ABSPATH')) {
    exit;
}

$has_update = $release && version_compare($release['version'], $current_plugin_version, '>');
?>
<div class="wrap cendf-updates">
    <h1>🔄 Mises à jour SCEDF</h1>
    <p class="description">Gérez les mises à jour automatiques depuis GitHub/Lovable</p>
    
    <!-- Statut actuel -->
    <div class="cendf-update-status <?php echo $has_update ? 'has-update' : 'up-to-date'; ?>">
        <?php if ($has_update): ?>
            <div class="status-icon">🆕</div>
            <div class="status-info">
                <h2>Mise à jour disponible!</h2>
                <p>
                    Version <strong><?php echo esc_html($release['version']); ?></strong> disponible
                    (vous avez la version <?php echo esc_html($current_plugin_version); ?>)
                </p>
                <p class="release-date">
                    Publiée le <?php echo date_i18n('d/m/Y à H:i', strtotime($release['published_at'])); ?>
                </p>
            </div>
            <div class="status-actions">
                <a href="<?php echo admin_url('update-core.php'); ?>" class="button button-primary button-hero">
                    <span class="dashicons dashicons-update"></span>
                    Mettre à jour maintenant
                </a>
            </div>
        <?php else: ?>
            <div class="status-icon">✅</div>
            <div class="status-info">
                <h2>Tout est à jour!</h2>
                <p>Vous utilisez la dernière version de SCEDF (<?php echo esc_html($current_plugin_version); ?>)</p>
            </div>
            <div class="status-actions">
                <button type="button" class="button" id="cendf-check-updates">
                    <span class="dashicons dashicons-update"></span>
                    Vérifier les mises à jour
                </button>
            </div>
        <?php endif; ?>
    </div>
    
    <!-- Versions installées -->
    <div class="cendf-versions-grid">
        <div class="cendf-version-card">
            <h3>🔌 Plugin SCEDF Core</h3>
            <div class="version-number"><?php echo esc_html($current_plugin_version); ?></div>
            <p>Types de contenu, API REST, paramètres</p>
            <?php if ($has_update): ?>
                <span class="update-badge">→ <?php echo esc_html($release['version']); ?></span>
            <?php endif; ?>
        </div>
        
        <div class="cendf-version-card">
            <h3>🎨 Thème SCEDF</h3>
            <div class="version-number"><?php echo esc_html($current_theme_version); ?></div>
            <p>Application React, SEO, PWA</p>
        </div>
    </div>
    
    <!-- Notes de version -->
    <?php if ($release && !empty($release['body'])): ?>
    <div class="cendf-changelog">
        <h3>📋 Notes de version <?php echo esc_html($release['version']); ?></h3>
        <div class="changelog-content">
            <?php echo wp_kses_post(nl2br($release['body'])); ?>
        </div>
        <a href="<?php echo esc_url($release['html_url']); ?>" target="_blank" class="button">
            Voir sur GitHub →
        </a>
    </div>
    <?php endif; ?>
    
    <!-- Configuration GitHub -->
    <div class="cendf-github-config">
        <h3>⚙️ Configuration GitHub</h3>
        <p class="description">Connectez votre repository GitHub pour les mises à jour automatiques</p>
        
        <form method="post" action="options.php">
            <?php settings_fields('cendf_updater'); ?>
            
            <table class="form-table">
                <tr>
                    <th scope="row">
                        <label for="cendf_github_username">Nom d'utilisateur GitHub</label>
                    </th>
                    <td>
                        <input type="text" 
                               id="cendf_github_username" 
                               name="cendf_github_username" 
                               value="<?php echo esc_attr($config['username']); ?>" 
                               class="regular-text"
                               placeholder="votre-username">
                        <p class="description">Votre nom d'utilisateur ou organisation GitHub</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="cendf_github_repo">Nom du repository</label>
                    </th>
                    <td>
                        <input type="text" 
                               id="cendf_github_repo" 
                               name="cendf_github_repo" 
                               value="<?php echo esc_attr($config['repo']); ?>" 
                               class="regular-text"
                               placeholder="cendf-faith-hub">
                        <p class="description">Nom du repository contenant le projet</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">
                        <label for="cendf_github_token">Token d'accès (optionnel)</label>
                    </th>
                    <td>
                        <input type="password" 
                               id="cendf_github_token" 
                               name="cendf_github_token" 
                               value="<?php echo esc_attr($config['token']); ?>" 
                               class="regular-text"
                               placeholder="ghp_xxxxxxxxxxxx">
                        <p class="description">
                            Nécessaire uniquement pour les repositories privés.
                            <a href="https://github.com/settings/tokens" target="_blank">Créer un token</a>
                        </p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Mises à jour automatiques</th>
                    <td>
                        <label>
                            <input type="checkbox" 
                                   name="cendf_auto_update" 
                                   value="1" 
                                   <?php checked(get_option('cendf_auto_update'), 1); ?>>
                            Activer les mises à jour automatiques en arrière-plan
                        </label>
                        <p class="description">
                            Si activé, les mises à jour mineures seront installées automatiquement.
                        </p>
                    </td>
                </tr>
            </table>
            
            <?php submit_button('Enregistrer la configuration'); ?>
        </form>
    </div>
    
    <!-- Guide de publication -->
    <div class="cendf-publish-guide">
        <h3>📤 Comment publier une mise à jour</h3>
        <div class="guide-steps">
            <div class="guide-step">
                <span class="step-number">1</span>
                <div class="step-content">
                    <h4>Modifier sur Lovable</h4>
                    <p>Effectuez vos modifications dans l'éditeur Lovable</p>
                </div>
            </div>
            <div class="guide-step">
                <span class="step-number">2</span>
                <div class="step-content">
                    <h4>Synchroniser avec GitHub</h4>
                    <p>Les changements sont automatiquement synchronisés</p>
                </div>
            </div>
            <div class="guide-step">
                <span class="step-number">3</span>
                <div class="step-content">
                    <h4>Créer une Release</h4>
                    <p>Sur GitHub, créez une nouvelle release avec un tag de version (ex: v1.0.1)</p>
                </div>
            </div>
            <div class="guide-step">
                <span class="step-number">4</span>
                <div class="step-content">
                    <h4>Mise à jour WordPress</h4>
                    <p>WordPress détecte la mise à jour et propose l'installation</p>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
.cendf-updates {
    max-width: 1000px;
}

.cendf-update-status {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 30px;
    border-radius: 12px;
    margin: 20px 0;
}

.cendf-update-status.has-update {
    background: linear-gradient(135deg, #fef3c7, #fde68a);
    border: 2px solid #f59e0b;
}

.cendf-update-status.up-to-date {
    background: linear-gradient(135deg, #d1fae5, #a7f3d0);
    border: 2px solid #10b981;
}

.status-icon {
    font-size: 48px;
}

.status-info h2 {
    margin: 0 0 5px;
}

.status-info p {
    margin: 0;
    color: #374151;
}

.release-date {
    font-size: 13px;
    opacity: 0.8;
}

.status-actions {
    margin-left: auto;
}

.cendf-versions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    margin: 30px 0;
}

.cendf-version-card {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    position: relative;
}

.cendf-version-card h3 {
    margin: 0 0 10px;
    font-size: 16px;
}

.version-number {
    font-size: 32px;
    font-weight: bold;
    color: #6366f1;
    margin-bottom: 10px;
}

.cendf-version-card p {
    margin: 0;
    color: #64748b;
    font-size: 13px;
}

.update-badge {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #f59e0b;
    color: white;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
}

.cendf-changelog {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    margin-bottom: 30px;
}

.cendf-changelog h3 {
    margin: 0 0 15px;
}

.changelog-content {
    background: #f8fafc;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 15px;
    max-height: 300px;
    overflow-y: auto;
}

.cendf-github-config {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    margin-bottom: 30px;
}

.cendf-github-config h3 {
    margin: 0 0 5px;
}

.cendf-github-config > .description {
    margin-bottom: 20px;
}

.cendf-publish-guide {
    background: linear-gradient(135deg, #ede9fe, #ddd6fe);
    border-radius: 12px;
    padding: 25px;
}

.cendf-publish-guide h3 {
    margin: 0 0 20px;
}

.guide-steps {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}

.guide-step {
    display: flex;
    gap: 15px;
    align-items: flex-start;
}

.step-number {
    background: #6366f1;
    color: white;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
}

.step-content h4 {
    margin: 0 0 5px;
    font-size: 14px;
}

.step-content p {
    margin: 0;
    font-size: 13px;
    color: #4c1d95;
}

.button-hero {
    font-size: 16px !important;
    padding: 12px 24px !important;
    height: auto !important;
}

.button-hero .dashicons {
    margin-right: 8px;
    vertical-align: middle;
}

/* Animation spinner */
.checking .dashicons-update {
    animation: cendf-spin 1s linear infinite;
}

@keyframes cendf-spin {
    100% { transform: rotate(360deg); }
}
</style>

<script>
jQuery(document).ready(function($) {
    var nonce = '<?php echo wp_create_nonce('cendf_updates'); ?>';
    
    $('#cendf-check-updates').on('click', function() {
        var $btn = $(this);
        $btn.addClass('checking').prop('disabled', true).text('Vérification...');
        
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'cendf_check_updates',
                nonce: nonce
            },
            success: function(response) {
                if (response.success) {
                    if (response.data.update_available) {
                        location.reload();
                    } else {
                        alert('Vous utilisez la dernière version (' + response.data.version + ')');
                    }
                } else {
                    alert('Erreur: ' + response.data);
                }
            },
            complete: function() {
                $btn.removeClass('checking').prop('disabled', false).html('<span class="dashicons dashicons-update"></span> Vérifier les mises à jour');
            }
        });
    });
});
</script>
