<?php
/**
 * CENDF Deploy - Gestion du déploiement du build React
 * 
 * Permet d'uploader et gérer le build React directement depuis l'admin WordPress
 */

if (!defined('ABSPATH')) {
    exit;
}

class CENDF_Deploy {
    
    private static $instance = null;
    
    public static function get_instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function __construct() {
        add_action('admin_menu', array($this, 'add_deploy_menu'), 20);
        add_action('admin_init', array($this, 'handle_upload'));
        add_action('wp_ajax_cendf_check_build', array($this, 'ajax_check_build'));
    }
    
    /**
     * Ajouter le menu de déploiement
     */
    public function add_deploy_menu() {
        add_submenu_page(
            'cendf-dashboard',
            'Déploiement',
            'Déploiement',
            'manage_options',
            'cendf-deploy',
            array($this, 'render_deploy_page')
        );
    }
    
    /**
     * Gérer l'upload du build
     */
    public function handle_upload() {
        if (!isset($_POST['cendf_deploy_nonce']) || 
            !wp_verify_nonce($_POST['cendf_deploy_nonce'], 'cendf_deploy_action')) {
            return;
        }
        
        if (!current_user_can('manage_options')) {
            return;
        }
        
        if (!isset($_FILES['cendf_build']) || $_FILES['cendf_build']['error'] !== UPLOAD_ERR_OK) {
            add_settings_error('cendf_deploy', 'upload_error', 'Erreur lors de l\'upload du fichier.', 'error');
            return;
        }
        
        $file = $_FILES['cendf_build'];
        
        // Vérifier le type de fichier (zip uniquement)
        $file_type = wp_check_filetype($file['name']);
        if ($file_type['ext'] !== 'zip') {
            add_settings_error('cendf_deploy', 'type_error', 'Seuls les fichiers ZIP sont acceptés.', 'error');
            return;
        }
        
        // Chemin de destination
        $theme_dir = get_theme_root() . '/cendf-theme';
        $dist_dir = $theme_dir . '/dist';
        $temp_dir = $theme_dir . '/dist-temp';
        $backup_dir = $theme_dir . '/dist-backup-' . date('Y-m-d-H-i-s');
        
        // Créer le répertoire temporaire
        if (!file_exists($temp_dir)) {
            wp_mkdir_p($temp_dir);
        }
        
        // Extraire le ZIP
        $zip = new ZipArchive();
        if ($zip->open($file['tmp_name']) === true) {
            $zip->extractTo($temp_dir);
            $zip->close();
            
            // Vérifier que le build est valide (contient index.html)
            $index_path = $temp_dir . '/index.html';
            if (!file_exists($index_path)) {
                // Chercher dans un sous-dossier
                $dirs = glob($temp_dir . '/*', GLOB_ONLYDIR);
                foreach ($dirs as $dir) {
                    if (file_exists($dir . '/index.html')) {
                        $temp_dir = $dir;
                        $index_path = $dir . '/index.html';
                        break;
                    }
                }
            }
            
            if (!file_exists($index_path)) {
                $this->cleanup_temp($temp_dir);
                add_settings_error('cendf_deploy', 'invalid_build', 'Le build n\'est pas valide (index.html manquant).', 'error');
                return;
            }
            
            // Sauvegarder l'ancien build
            if (file_exists($dist_dir)) {
                rename($dist_dir, $backup_dir);
            }
            
            // Déplacer le nouveau build
            rename($temp_dir, $dist_dir);
            
            // Créer le fichier de version
            $version = date('YmdHis');
            file_put_contents($dist_dir . '/version.txt', $version);
            
            // Nettoyer les anciens backups (garder les 3 derniers)
            $this->cleanup_old_backups($theme_dir);
            
            add_settings_error('cendf_deploy', 'success', 'Build déployé avec succès! Version: ' . $version, 'updated');
            
        } else {
            add_settings_error('cendf_deploy', 'zip_error', 'Impossible d\'extraire le fichier ZIP.', 'error');
        }
    }
    
    /**
     * Nettoyer le répertoire temporaire
     */
    private function cleanup_temp($dir) {
        if (is_dir($dir)) {
            $files = array_diff(scandir($dir), array('.', '..'));
            foreach ($files as $file) {
                $path = $dir . '/' . $file;
                is_dir($path) ? $this->cleanup_temp($path) : unlink($path);
            }
            rmdir($dir);
        }
    }
    
    /**
     * Nettoyer les anciens backups
     */
    private function cleanup_old_backups($theme_dir) {
        $backups = glob($theme_dir . '/dist-backup-*', GLOB_ONLYDIR);
        if (count($backups) > 3) {
            usort($backups, function($a, $b) {
                return filemtime($a) - filemtime($b);
            });
            
            $to_delete = array_slice($backups, 0, count($backups) - 3);
            foreach ($to_delete as $backup) {
                $this->cleanup_temp($backup);
            }
        }
    }
    
    /**
     * AJAX: Vérifier le statut du build
     */
    public function ajax_check_build() {
        check_ajax_referer('cendf_deploy_nonce', 'nonce');
        
        $build_info = $this->get_build_info();
        
        wp_send_json_success($build_info);
    }
    
    /**
     * Récupérer les informations du build
     */
    private function get_build_info() {
        $theme_dir = get_theme_root() . '/cendf-theme';
        $dist_dir = $theme_dir . '/dist';
        $index_file = $dist_dir . '/index.html';
        $version_file = $dist_dir . '/version.txt';
        
        $info = array(
            'installed' => file_exists($index_file),
            'version' => null,
            'last_modified' => null,
            'size' => null,
        );
        
        if ($info['installed']) {
            if (file_exists($version_file)) {
                $info['version'] = trim(file_get_contents($version_file));
            }
            
            $info['last_modified'] = date('d/m/Y H:i:s', filemtime($index_file));
            $info['size'] = $this->get_directory_size($dist_dir);
        }
        
        return $info;
    }
    
    /**
     * Calculer la taille d'un répertoire
     */
    private function get_directory_size($dir) {
        $size = 0;
        
        foreach (new RecursiveIteratorIterator(new RecursiveDirectoryIterator($dir)) as $file) {
            if ($file->isFile()) {
                $size += $file->getSize();
            }
        }
        
        // Formater la taille
        $units = array('B', 'KB', 'MB', 'GB');
        $unit = 0;
        while ($size >= 1024 && $unit < count($units) - 1) {
            $size /= 1024;
            $unit++;
        }
        
        return round($size, 2) . ' ' . $units[$unit];
    }
    
    /**
     * Afficher la page de déploiement
     */
    public function render_deploy_page() {
        $build_info = $this->get_build_info();
        ?>
        <div class="wrap cendf-deploy-page">
            <h1>🚀 Déploiement du Build React</h1>
            
            <?php settings_errors('cendf_deploy'); ?>
            
            <div class="cendf-deploy-grid">
                <!-- Status actuel -->
                <div class="cendf-deploy-card">
                    <h2>📊 Status actuel</h2>
                    <table class="cendf-status-table">
                        <tr>
                            <td>Build installé:</td>
                            <td>
                                <?php if ($build_info['installed']): ?>
                                    <span class="cendf-badge cendf-badge-success">✓ Oui</span>
                                <?php else: ?>
                                    <span class="cendf-badge cendf-badge-error">✗ Non</span>
                                <?php endif; ?>
                            </td>
                        </tr>
                        <?php if ($build_info['installed']): ?>
                        <tr>
                            <td>Version:</td>
                            <td><code><?php echo esc_html($build_info['version']); ?></code></td>
                        </tr>
                        <tr>
                            <td>Dernière modification:</td>
                            <td><?php echo esc_html($build_info['last_modified']); ?></td>
                        </tr>
                        <tr>
                            <td>Taille:</td>
                            <td><?php echo esc_html($build_info['size']); ?></td>
                        </tr>
                        <?php endif; ?>
                    </table>
                    
                    <?php if ($build_info['installed']): ?>
                    <a href="<?php echo home_url(); ?>" target="_blank" class="button button-secondary" style="margin-top: 15px;">
                        Voir le site →
                    </a>
                    <?php endif; ?>
                </div>
                
                <!-- Upload nouveau build -->
                <div class="cendf-deploy-card">
                    <h2>📦 Déployer un nouveau build</h2>
                    <p>Uploadez le fichier ZIP contenant le build React (dossier <code>dist/</code>).</p>
                    
                    <form method="post" enctype="multipart/form-data" class="cendf-upload-form">
                        <?php wp_nonce_field('cendf_deploy_action', 'cendf_deploy_nonce'); ?>
                        
                        <div class="cendf-upload-zone" id="upload-zone">
                            <input type="file" name="cendf_build" id="cendf-build-file" accept=".zip" required>
                            <label for="cendf-build-file">
                                <span class="cendf-upload-icon">📁</span>
                                <span class="cendf-upload-text">Cliquez ou déposez le fichier ZIP ici</span>
                                <span class="cendf-upload-hint">dist.zip (max 50MB)</span>
                            </label>
                        </div>
                        
                        <button type="submit" class="button button-primary button-hero">
                            🚀 Déployer le build
                        </button>
                    </form>
                </div>
                
                <!-- Instructions -->
                <div class="cendf-deploy-card cendf-deploy-full">
                    <h2>📖 Instructions</h2>
                    <div class="cendf-instructions">
                        <div class="cendf-instruction">
                            <h3>1. Générer le build</h3>
                            <p>Dans votre projet React, exécutez:</p>
                            <code>npm run build</code>
                        </div>
                        <div class="cendf-instruction">
                            <h3>2. Créer le ZIP</h3>
                            <p>Compressez le dossier <code>dist/</code> en ZIP:</p>
                            <code>cd dist && zip -r ../build.zip .</code>
                        </div>
                        <div class="cendf-instruction">
                            <h3>3. Uploader</h3>
                            <p>Uploadez le fichier ZIP ci-dessus.</p>
                        </div>
                        <div class="cendf-instruction">
                            <h3>Alternative: Script automatique</h3>
                            <p>Utilisez le script de déploiement:</p>
                            <code>./deploy-to-wordpress.sh /chemin/wordpress</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <style>
            .cendf-deploy-page { max-width: 1200px; }
            .cendf-deploy-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 20px;
                margin-top: 20px;
            }
            .cendf-deploy-card {
                background: white;
                border: 1px solid #ddd;
                border-radius: 10px;
                padding: 25px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            }
            .cendf-deploy-card h2 {
                margin-top: 0;
                padding-bottom: 15px;
                border-bottom: 2px solid #f0f0f0;
            }
            .cendf-deploy-full {
                grid-column: 1 / -1;
            }
            .cendf-status-table {
                width: 100%;
                border-collapse: collapse;
            }
            .cendf-status-table td {
                padding: 10px 0;
                border-bottom: 1px solid #f0f0f0;
            }
            .cendf-status-table td:first-child {
                font-weight: 600;
                width: 50%;
            }
            .cendf-badge {
                display: inline-block;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
            }
            .cendf-badge-success {
                background: #d4edda;
                color: #155724;
            }
            .cendf-badge-error {
                background: #f8d7da;
                color: #721c24;
            }
            .cendf-upload-zone {
                border: 2px dashed #ccc;
                border-radius: 10px;
                padding: 40px;
                text-align: center;
                margin: 20px 0;
                transition: all 0.3s ease;
                position: relative;
            }
            .cendf-upload-zone:hover {
                border-color: #2271b1;
                background: #f0f7ff;
            }
            .cendf-upload-zone input[type="file"] {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                opacity: 0;
                cursor: pointer;
            }
            .cendf-upload-icon {
                font-size: 48px;
                display: block;
                margin-bottom: 10px;
            }
            .cendf-upload-text {
                display: block;
                font-size: 16px;
                font-weight: 600;
                margin-bottom: 5px;
            }
            .cendf-upload-hint {
                display: block;
                color: #666;
                font-size: 13px;
            }
            .cendf-instructions {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 20px;
            }
            .cendf-instruction {
                background: #f9f9f9;
                padding: 20px;
                border-radius: 8px;
            }
            .cendf-instruction h3 {
                margin-top: 0;
                color: #1a1a2e;
            }
            .cendf-instruction code {
                display: block;
                background: #1a1a2e;
                color: #FFD700;
                padding: 10px;
                border-radius: 5px;
                margin-top: 10px;
                font-size: 12px;
            }
            @media (max-width: 1024px) {
                .cendf-deploy-grid { grid-template-columns: 1fr; }
                .cendf-instructions { grid-template-columns: repeat(2, 1fr); }
            }
            @media (max-width: 600px) {
                .cendf-instructions { grid-template-columns: 1fr; }
            }
        </style>
        <?php
    }
}

// Initialiser
CENDF_Deploy::get_instance();
