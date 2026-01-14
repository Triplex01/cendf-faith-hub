<?php
/**
 * Vue de l'assistant d'installation SCEDF
 */
if (!defined('ABSPATH')) {
    exit;
}
?>
<div class="wrap cendf-installer">
    <h1>
        <img src="<?php echo CENDF_PLUGIN_URL; ?>assets/images/logo-scedf.png" alt="SCEDF" style="height: 40px; vertical-align: middle; margin-right: 10px;" onerror="this.style.display='none'">
        Assistant d'installation SCEDF
    </h1>
    
    <?php if ($is_complete): ?>
    <div class="cendf-success-banner">
        <span class="dashicons dashicons-yes-alt"></span>
        <div>
            <h2>Installation complète !</h2>
            <p>Votre site SCEDF est prêt à être utilisé.</p>
            <a href="<?php echo admin_url('admin.php?page=cendf-dashboard'); ?>" class="button button-primary">
                Aller au tableau de bord →
            </a>
        </div>
    </div>
    <?php endif; ?>
    
    <div class="cendf-installer-grid">
        <!-- Colonne principale -->
        <div class="cendf-installer-main">
            
            <!-- Étape 1: Plugins requis -->
            <div class="cendf-installer-step <?php echo empty($this->get_missing_required_plugins()) ? 'complete' : 'pending'; ?>">
                <div class="step-header">
                    <span class="step-number">1</span>
                    <div class="step-info">
                        <h3>Plugins requis</h3>
                        <p>Extensions WordPress nécessaires au fonctionnement</p>
                    </div>
                    <span class="step-status">
                        <?php if (empty($this->get_missing_required_plugins())): ?>
                            <span class="dashicons dashicons-yes-alt text-success"></span>
                        <?php else: ?>
                            <span class="dashicons dashicons-warning text-warning"></span>
                        <?php endif; ?>
                    </span>
                </div>
                
                <div class="step-content">
                    <table class="cendf-plugins-table">
                        <thead>
                            <tr>
                                <th>Plugin</th>
                                <th>Description</th>
                                <th>Statut</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($plugins_status['required'] as $key => $plugin): ?>
                            <tr data-plugin="<?php echo esc_attr($key); ?>">
                                <td><strong><?php echo esc_html($plugin['name']); ?></strong></td>
                                <td><?php echo esc_html($plugin['description']); ?></td>
                                <td>
                                    <?php if ($plugin['active']): ?>
                                        <span class="status-badge success">Actif</span>
                                    <?php elseif ($plugin['installed']): ?>
                                        <span class="status-badge warning">Installé</span>
                                    <?php else: ?>
                                        <span class="status-badge error">Non installé</span>
                                    <?php endif; ?>
                                </td>
                                <td>
                                    <?php if (!$plugin['active']): ?>
                                        <button type="button" 
                                                class="button cendf-install-plugin" 
                                                data-slug="<?php echo esc_attr($plugin['slug']); ?>"
                                                data-installed="<?php echo $plugin['installed'] ? '1' : '0'; ?>">
                                            <?php echo $plugin['installed'] ? 'Activer' : 'Installer'; ?>
                                        </button>
                                    <?php else: ?>
                                        <span class="dashicons dashicons-yes"></span>
                                    <?php endif; ?>
                                </td>
                            </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <!-- Étape 2: Thème -->
            <div class="cendf-installer-step <?php echo $theme_active ? 'complete' : 'pending'; ?>">
                <div class="step-header">
                    <span class="step-number">2</span>
                    <div class="step-info">
                        <h3>Thème SCEDF</h3>
                        <p>Thème WordPress optimisé pour l'application React</p>
                    </div>
                    <span class="step-status">
                        <?php if ($theme_active): ?>
                            <span class="dashicons dashicons-yes-alt text-success"></span>
                        <?php else: ?>
                            <span class="dashicons dashicons-info text-info"></span>
                        <?php endif; ?>
                    </span>
                </div>
                
                <div class="step-content">
                    <?php if ($theme_active): ?>
                        <div class="cendf-notice success">
                            <span class="dashicons dashicons-yes"></span>
                            Thème SCEDF actif
                        </div>
                    <?php else: ?>
                        <div class="cendf-notice warning">
                            <span class="dashicons dashicons-warning"></span>
                            Le thème cendf-theme n'est pas actif.
                            <a href="<?php echo admin_url('themes.php'); ?>" class="button">
                                Gérer les thèmes
                            </a>
                        </div>
                    <?php endif; ?>
                    
                    <?php if ($theme_active && !$build_exists): ?>
                        <div class="cendf-notice warning" style="margin-top: 10px;">
                            <span class="dashicons dashicons-warning"></span>
                            Le build React n'est pas présent dans le thème.
                            <br><small>Exécutez <code>npm run build</code> puis copiez le dossier <code>dist/</code> dans le thème.</small>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
            
            <!-- Étape 3: Configuration -->
            <div class="cendf-installer-step <?php echo $permalinks_ok ? 'complete' : 'pending'; ?>">
                <div class="step-header">
                    <span class="step-number">3</span>
                    <div class="step-info">
                        <h3>Configuration WordPress</h3>
                        <p>Permaliens, fuseau horaire, et paramètres essentiels</p>
                    </div>
                    <span class="step-status">
                        <?php if ($permalinks_ok): ?>
                            <span class="dashicons dashicons-yes-alt text-success"></span>
                        <?php else: ?>
                            <span class="dashicons dashicons-warning text-warning"></span>
                        <?php endif; ?>
                    </span>
                </div>
                
                <div class="step-content">
                    <ul class="cendf-checklist">
                        <li class="<?php echo $permalinks_ok ? 'done' : ''; ?>">
                            <span class="dashicons <?php echo $permalinks_ok ? 'dashicons-yes' : 'dashicons-no'; ?>"></span>
                            Permaliens en mode "Nom de l'article"
                        </li>
                        <li class="<?php echo get_option('timezone_string') === 'Africa/Abidjan' ? 'done' : ''; ?>">
                            <span class="dashicons <?php echo get_option('timezone_string') === 'Africa/Abidjan' ? 'dashicons-yes' : 'dashicons-no'; ?>"></span>
                            Fuseau horaire: Africa/Abidjan
                        </li>
                        <li class="<?php echo get_option('date_format') === 'd/m/Y' ? 'done' : ''; ?>">
                            <span class="dashicons <?php echo get_option('date_format') === 'd/m/Y' ? 'dashicons-yes' : 'dashicons-no'; ?>"></span>
                            Format de date français (d/m/Y)
                        </li>
                    </ul>
                    
                    <button type="button" class="button button-primary" id="cendf-run-setup">
                        <span class="dashicons dashicons-admin-generic"></span>
                        Configurer automatiquement
                    </button>
                </div>
            </div>
            
            <!-- Étape 4: Finalisation -->
            <div class="cendf-installer-step <?php echo $is_complete ? 'complete' : 'pending'; ?>">
                <div class="step-header">
                    <span class="step-number">4</span>
                    <div class="step-info">
                        <h3>Finalisation</h3>
                        <p>Terminer l'installation et accéder au tableau de bord</p>
                    </div>
                </div>
                
                <div class="step-content">
                    <?php if ($is_complete): ?>
                        <div class="cendf-notice success">
                            <span class="dashicons dashicons-yes"></span>
                            Installation terminée !
                        </div>
                        <form method="post" style="margin-top: 15px;">
                            <?php wp_nonce_field('cendf_install'); ?>
                            <input type="hidden" name="cendf_install_action" value="reset_setup">
                            <button type="submit" class="button">
                                Réinitialiser l'assistant
                            </button>
                        </form>
                    <?php else: ?>
                        <form method="post">
                            <?php wp_nonce_field('cendf_install'); ?>
                            <input type="hidden" name="cendf_install_action" value="complete_setup">
                            <button type="submit" class="button button-primary button-hero">
                                <span class="dashicons dashicons-yes"></span>
                                Terminer l'installation
                            </button>
                        </form>
                    <?php endif; ?>
                </div>
            </div>
            
        </div>
        
        <!-- Sidebar -->
        <div class="cendf-installer-sidebar">
            
            <!-- Plugins recommandés -->
            <div class="cendf-installer-box">
                <h3>📦 Plugins recommandés</h3>
                <ul class="cendf-recommended-plugins">
                    <?php foreach ($plugins_status['recommended'] as $key => $plugin): ?>
                    <li>
                        <div class="plugin-info">
                            <strong><?php echo esc_html($plugin['name']); ?></strong>
                            <small><?php echo esc_html($plugin['description']); ?></small>
                        </div>
                        <?php if ($plugin['active']): ?>
                            <span class="status-badge success small">Actif</span>
                        <?php else: ?>
                            <button type="button" 
                                    class="button button-small cendf-install-plugin" 
                                    data-slug="<?php echo esc_attr($plugin['slug']); ?>">
                                Installer
                            </button>
                        <?php endif; ?>
                    </li>
                    <?php endforeach; ?>
                </ul>
            </div>
            
            <!-- Aide rapide -->
            <div class="cendf-installer-box">
                <h3>📖 Documentation</h3>
                <ul class="cendf-help-links">
                    <li>
                        <a href="#" onclick="cendfShowDoc('installation'); return false;">
                            <span class="dashicons dashicons-media-document"></span>
                            Guide d'installation complet
                        </a>
                    </li>
                    <li>
                        <a href="#" onclick="cendfShowDoc('content'); return false;">
                            <span class="dashicons dashicons-edit"></span>
                            Gestion du contenu
                        </a>
                    </li>
                    <li>
                        <a href="#" onclick="cendfShowDoc('api'); return false;">
                            <span class="dashicons dashicons-rest-api"></span>
                            API REST
                        </a>
                    </li>
                </ul>
            </div>
            
            <!-- Informations système -->
            <div class="cendf-installer-box">
                <h3>ℹ️ Informations système</h3>
                <ul class="cendf-system-info">
                    <li>
                        <span>WordPress</span>
                        <strong><?php echo get_bloginfo('version'); ?></strong>
                    </li>
                    <li>
                        <span>PHP</span>
                        <strong><?php echo PHP_VERSION; ?></strong>
                    </li>
                    <li>
                        <span>CENDF Core</span>
                        <strong><?php echo CENDF_VERSION; ?></strong>
                    </li>
                    <li>
                        <span>Thème</span>
                        <strong><?php echo $theme->get('Name'); ?></strong>
                    </li>
                </ul>
            </div>
            
        </div>
    </div>
</div>

<!-- Modal Documentation -->
<div id="cendf-doc-modal" class="cendf-modal" style="display: none;">
    <div class="cendf-modal-content">
        <button class="cendf-modal-close">&times;</button>
        <div id="cendf-doc-content"></div>
    </div>
</div>

<style>
.cendf-installer {
    max-width: 1400px;
}

.cendf-success-banner {
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    padding: 30px;
    border-radius: 12px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    gap: 20px;
}

.cendf-success-banner .dashicons {
    font-size: 48px;
    width: 48px;
    height: 48px;
}

.cendf-success-banner h2 {
    margin: 0 0 5px;
    color: white;
}

.cendf-success-banner p {
    margin: 0 0 15px;
    opacity: 0.9;
}

.cendf-installer-grid {
    display: grid;
    grid-template-columns: 1fr 350px;
    gap: 30px;
    margin-top: 20px;
}

@media (max-width: 1200px) {
    .cendf-installer-grid {
        grid-template-columns: 1fr;
    }
}

.cendf-installer-step {
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    margin-bottom: 20px;
    overflow: hidden;
}

.cendf-installer-step.complete {
    border-left: 4px solid #10b981;
}

.cendf-installer-step.pending {
    border-left: 4px solid #f59e0b;
}

.step-header {
    display: flex;
    align-items: center;
    padding: 20px;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    gap: 15px;
}

.step-number {
    background: linear-gradient(135deg, #6366f1, #8b5cf6);
    color: white;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 16px;
}

.step-info h3 {
    margin: 0;
    font-size: 16px;
}

.step-info p {
    margin: 5px 0 0;
    color: #64748b;
    font-size: 13px;
}

.step-status {
    margin-left: auto;
}

.step-content {
    padding: 20px;
}

.cendf-plugins-table {
    width: 100%;
    border-collapse: collapse;
}

.cendf-plugins-table th,
.cendf-plugins-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
}

.cendf-plugins-table th {
    background: #f8fafc;
    font-weight: 600;
    font-size: 12px;
    text-transform: uppercase;
    color: #64748b;
}

.status-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
}

.status-badge.success {
    background: #d1fae5;
    color: #065f46;
}

.status-badge.warning {
    background: #fef3c7;
    color: #92400e;
}

.status-badge.error {
    background: #fee2e2;
    color: #991b1b;
}

.status-badge.small {
    padding: 2px 8px;
    font-size: 11px;
}

.text-success { color: #10b981; }
.text-warning { color: #f59e0b; }
.text-info { color: #3b82f6; }

.cendf-notice {
    padding: 12px 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
}

.cendf-notice.success {
    background: #d1fae5;
    color: #065f46;
}

.cendf-notice.warning {
    background: #fef3c7;
    color: #92400e;
}

.cendf-checklist {
    list-style: none;
    padding: 0;
    margin: 0 0 20px;
}

.cendf-checklist li {
    padding: 10px 0;
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #e2e8f0;
}

.cendf-checklist li.done .dashicons {
    color: #10b981;
}

.cendf-checklist li:not(.done) .dashicons {
    color: #ef4444;
}

.cendf-installer-sidebar .cendf-installer-box {
    background: white;
    border-radius: 12px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    padding: 20px;
    margin-bottom: 20px;
}

.cendf-installer-box h3 {
    margin: 0 0 15px;
    font-size: 15px;
}

.cendf-recommended-plugins {
    list-style: none;
    padding: 0;
    margin: 0;
}

.cendf-recommended-plugins li {
    padding: 12px 0;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
}

.cendf-recommended-plugins li:last-child {
    border-bottom: none;
}

.cendf-recommended-plugins .plugin-info {
    flex: 1;
}

.cendf-recommended-plugins .plugin-info strong {
    display: block;
    font-size: 13px;
}

.cendf-recommended-plugins .plugin-info small {
    color: #64748b;
    font-size: 11px;
}

.cendf-help-links {
    list-style: none;
    padding: 0;
    margin: 0;
}

.cendf-help-links li {
    margin-bottom: 10px;
}

.cendf-help-links a {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #3b82f6;
    text-decoration: none;
}

.cendf-help-links a:hover {
    text-decoration: underline;
}

.cendf-system-info {
    list-style: none;
    padding: 0;
    margin: 0;
}

.cendf-system-info li {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px solid #e2e8f0;
    font-size: 13px;
}

.cendf-system-info li:last-child {
    border-bottom: none;
}

.cendf-modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100000;
}

.cendf-modal-content {
    background: white;
    border-radius: 12px;
    max-width: 800px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 30px;
    position: relative;
}

.cendf-modal-close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #64748b;
}

.button-hero {
    font-size: 16px !important;
    padding: 12px 24px !important;
    height: auto !important;
}

.button-hero .dashicons {
    margin-right: 8px;
}

/* Loading spinner */
.cendf-loading {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid #e2e8f0;
    border-top-color: #3b82f6;
    border-radius: 50%;
    animation: cendf-spin 0.8s linear infinite;
}

@keyframes cendf-spin {
    to { transform: rotate(360deg); }
}
</style>

<script>
jQuery(document).ready(function($) {
    var nonce = '<?php echo wp_create_nonce('cendf_installer'); ?>';
    
    // Installer/Activer un plugin
    $('.cendf-install-plugin').on('click', function() {
        var $btn = $(this);
        var slug = $btn.data('slug');
        var originalText = $btn.text();
        
        $btn.prop('disabled', true).html('<span class="cendf-loading"></span> Installation...');
        
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'cendf_install_plugin',
                plugin_slug: slug,
                nonce: nonce
            },
            success: function(response) {
                if (response.success) {
                    $btn.html('<span class="dashicons dashicons-yes"></span> OK');
                    $btn.closest('tr').find('.status-badge').removeClass('error warning').addClass('success').text('Actif');
                    
                    // Reload après un délai
                    setTimeout(function() {
                        location.reload();
                    }, 1500);
                } else {
                    alert('Erreur: ' + response.data);
                    $btn.prop('disabled', false).text(originalText);
                }
            },
            error: function() {
                alert('Erreur de connexion');
                $btn.prop('disabled', false).text(originalText);
            }
        });
    });
    
    // Configuration automatique
    $('#cendf-run-setup').on('click', function() {
        var $btn = $(this);
        $btn.prop('disabled', true).html('<span class="cendf-loading"></span> Configuration...');
        
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'cendf_run_setup',
                nonce: nonce
            },
            success: function(response) {
                if (response.success) {
                    $btn.html('<span class="dashicons dashicons-yes"></span> Configuré !');
                    setTimeout(function() {
                        location.reload();
                    }, 1000);
                } else {
                    alert('Erreur: ' + response.data);
                    $btn.prop('disabled', false).html('<span class="dashicons dashicons-admin-generic"></span> Configurer automatiquement');
                }
            }
        });
    });
});

// Afficher la documentation
function cendfShowDoc(section) {
    var docs = {
        'installation': `
            <h2>📖 Guide d'installation complet</h2>
            <h3>Prérequis</h3>
            <ul>
                <li>WordPress 5.8 ou supérieur</li>
                <li>PHP 7.4 ou supérieur</li>
                <li>Node.js 16+ (pour le build React)</li>
            </ul>
            <h3>Installation automatique</h3>
            <ol>
                <li>Clonez le projet depuis GitHub</li>
                <li>Exécutez <code>npm install && npm run build</code></li>
                <li>Exécutez <code>./deploy-to-wordpress.sh /chemin/wordpress</code></li>
                <li>Activez le plugin et le thème</li>
                <li>Utilisez cet assistant pour finaliser</li>
            </ol>
            <h3>Installation manuelle</h3>
            <ol>
                <li>Copiez <code>public/wordpress-plugin/cendf-core</code> dans <code>wp-content/plugins/</code></li>
                <li>Copiez <code>public/wordpress-theme/cendf-theme</code> dans <code>wp-content/themes/</code></li>
                <li>Copiez le dossier <code>dist/</code> dans le thème</li>
                <li>Activez le plugin CENDF Core</li>
                <li>Activez le thème CENDF Theme</li>
            </ol>
        `,
        'content': `
            <h2>📝 Gestion du contenu</h2>
            <h3>Types de contenu disponibles</h3>
            <ul>
                <li><strong>Articles</strong> - Actualités et nouvelles</li>
                <li><strong>Événements</strong> - Calendrier et manifestations</li>
                <li><strong>Podcasts</strong> - Émissions audio/vidéo</li>
                <li><strong>Programmes</strong> - Grille radio</li>
                <li><strong>Enseignements</strong> - Catéchèse et doctrine</li>
                <li><strong>Documents</strong> - PDF et archives</li>
                <li><strong>Produits</strong> - Boutique</li>
                <li><strong>Activités</strong> - Actions pastorales</li>
            </ul>
            <h3>Champs personnalisés</h3>
            <p>Chaque type de contenu dispose de champs ACF spécifiques. Remplissez-les pour enrichir l'affichage sur le site.</p>
        `,
        'api': `
            <h2>🔌 API REST</h2>
            <h3>Endpoints WordPress standard</h3>
            <ul>
                <li><code>/wp-json/wp/v2/posts</code> - Articles</li>
                <li><code>/wp-json/wp/v2/events</code> - Événements</li>
                <li><code>/wp-json/wp/v2/podcasts</code> - Podcasts</li>
                <li><code>/wp-json/wp/v2/teachings</code> - Enseignements</li>
            </ul>
            <h3>Endpoints CENDF personnalisés</h3>
            <ul>
                <li><code>/wp-json/cendf/v1/ticker</code> - Bandeau défilant</li>
                <li><code>/wp-json/cendf/v1/settings</code> - Paramètres du site</li>
                <li><code>/wp-json/cendf/v1/search?q=...</code> - Recherche globale</li>
                <li><code>/wp-json/cendf/v1/contact</code> - Formulaire de contact</li>
            </ul>
        `
    };
    
    document.getElementById('cendf-doc-content').innerHTML = docs[section] || '<p>Documentation non disponible.</p>';
    document.getElementById('cendf-doc-modal').style.display = 'flex';
}

// Fermer le modal
document.querySelector('.cendf-modal-close')?.addEventListener('click', function() {
    document.getElementById('cendf-doc-modal').style.display = 'none';
});

document.getElementById('cendf-doc-modal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        this.style.display = 'none';
    }
});
</script>
