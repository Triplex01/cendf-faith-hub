<?php
/**
 * CENDF Theme - Template principal
 * 
 * Sert l'application React buildée avec gestion dynamique des assets
 * Support du SEO, cache-busting et configuration WordPress
 */

// Récupérer le chemin du build
$dist_path = get_template_directory() . '/dist/index.html';
$dist_url = get_template_directory_uri() . '/dist';

// Vérifier si le build existe
if (!file_exists($dist_path)) {
    cendf_render_fallback();
    exit;
}

// Lire le contenu du build
$html = file_get_contents($dist_path);

// Récupérer la version pour le cache-busting
$version_file = get_template_directory() . '/dist/version.txt';
$version = file_exists($version_file) ? trim(file_get_contents($version_file)) : time();

// Remplacer les chemins relatifs par les chemins WordPress
$html = str_replace('="/assets/', '="' . $dist_url . '/assets/', $html);
$html = str_replace("='/assets/", "='" . $dist_url . "/assets/", $html);
$html = str_replace('href="/assets/', 'href="' . $dist_url . '/assets/', $html);
$html = str_replace('src="/assets/', 'src="' . $dist_url . '/assets/', $html);

// Ajouter le cache-busting aux assets CSS et JS
$html = preg_replace('/\.css"/', '.css?v=' . $version . '"', $html);
$html = preg_replace('/\.js"/', '.js?v=' . $version . '"', $html);

// Injecter la configuration WordPress
$wp_config = array(
    'siteUrl' => home_url(),
    'apiUrl' => rest_url(),
    'themeUrl' => get_template_directory_uri(),
    'siteName' => get_bloginfo('name'),
    'siteDescription' => get_bloginfo('description'),
    'version' => $version,
    'nonce' => wp_create_nonce('wp_rest'),
    'isAdmin' => current_user_can('manage_options'),
);

$config_script = '<script>window.CENDF_CONFIG = ' . json_encode($wp_config) . ';</script>';

// Injecter avant la fermeture de </head>
$html = str_replace('</head>', $config_script . "\n</head>", $html);

// Ajouter les meta tags SEO dynamiques
$seo_meta = cendf_get_seo_meta();
$html = str_replace('</head>', $seo_meta . "\n</head>", $html);

// Ajouter le preload des ressources critiques
$preload = cendf_get_preload_tags($dist_url);
$html = str_replace('</head>', $preload . "\n</head>", $html);

// Afficher le HTML final
echo $html;

/**
 * Génère les meta tags SEO dynamiques
 */
function cendf_get_seo_meta() {
    $meta = '';
    
    // Open Graph basique
    $og_title = get_bloginfo('name') . ' - Commission Épiscopale pour la Doctrine de la Foi';
    $og_description = get_bloginfo('description') ?: 'Radio Espoir - Première radio catholique de Côte d\'Ivoire';
    $og_image = get_template_directory_uri() . '/dist/assets/hero-church.jpg';
    
    // Vérifier si on est sur un article spécifique (via query string)
    $path = $_SERVER['REQUEST_URI'] ?? '';
    
    $meta .= '<meta property="og:title" content="' . esc_attr($og_title) . '" />' . "\n";
    $meta .= '<meta property="og:description" content="' . esc_attr($og_description) . '" />' . "\n";
    $meta .= '<meta property="og:image" content="' . esc_url($og_image) . '" />' . "\n";
    $meta .= '<meta property="og:url" content="' . esc_url(home_url($path)) . '" />' . "\n";
    $meta .= '<meta property="og:type" content="website" />' . "\n";
    $meta .= '<meta property="og:site_name" content="CENDF - Radio Espoir" />' . "\n";
    
    // Twitter Cards
    $meta .= '<meta name="twitter:card" content="summary_large_image" />' . "\n";
    $meta .= '<meta name="twitter:title" content="' . esc_attr($og_title) . '" />' . "\n";
    $meta .= '<meta name="twitter:description" content="' . esc_attr($og_description) . '" />' . "\n";
    $meta .= '<meta name="twitter:image" content="' . esc_url($og_image) . '" />' . "\n";
    
    return $meta;
}

/**
 * Génère les tags de preload pour les ressources critiques
 */
function cendf_get_preload_tags($dist_url) {
    $preload = '';
    
    // Preload des fonts si utilisées
    $preload .= '<link rel="preconnect" href="https://fonts.googleapis.com" />' . "\n";
    $preload .= '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />' . "\n";
    
    // DNS prefetch pour les services externes
    $preload .= '<link rel="dns-prefetch" href="//stream.radioespoir.ci" />' . "\n";
    
    return $preload;
}

/**
 * Affiche la page de fallback si le build n'existe pas
 */
function cendf_render_fallback() {
    ?>
    <!DOCTYPE html>
    <html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title><?php bloginfo('name'); ?> - Installation</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { 
                font-family: system-ui, -apple-system, sans-serif; 
                display: flex; 
                align-items: center; 
                justify-content: center; 
                min-height: 100vh; 
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); 
                color: white;
                padding: 20px;
            }
            .container { 
                text-align: center; 
                padding: 40px;
                max-width: 600px;
                background: rgba(255,255,255,0.05);
                border-radius: 20px;
                backdrop-filter: blur(10px);
            }
            h1 { 
                color: #FFD700; 
                margin-bottom: 20px;
                font-size: 2rem;
            }
            .logo {
                font-size: 4rem;
                margin-bottom: 20px;
            }
            p { 
                margin: 15px 0; 
                line-height: 1.6;
                color: #ccc;
            }
            code { 
                background: rgba(255,215,0,0.2); 
                padding: 4px 10px; 
                border-radius: 5px;
                font-size: 0.9rem;
                color: #FFD700;
            }
            .steps {
                text-align: left;
                margin-top: 30px;
                padding: 20px;
                background: rgba(0,0,0,0.2);
                border-radius: 10px;
            }
            .steps li {
                margin: 10px 0;
                padding-left: 10px;
            }
            .btn {
                display: inline-block;
                margin-top: 20px;
                padding: 12px 30px;
                background: #FFD700;
                color: #1a1a2e;
                text-decoration: none;
                border-radius: 30px;
                font-weight: bold;
                transition: transform 0.2s;
            }
            .btn:hover {
                transform: scale(1.05);
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="logo">⛪</div>
            <h1>CENDF - Radio Espoir</h1>
            <p>Le build React n'a pas été trouvé.</p>
            
            <div class="steps">
                <p><strong>Pour installer l'application:</strong></p>
                <ol>
                    <li>Exécutez <code>npm run build</code> dans le projet</li>
                    <li>Copiez le contenu de <code>dist/</code> vers <code>wp-content/themes/cendf-theme/dist/</code></li>
                    <li>Rafraîchissez cette page</li>
                </ol>
                <p style="margin-top: 20px;">Ou utilisez le script automatique:</p>
                <code>./deploy-to-wordpress.sh /chemin/wordpress</code>
            </div>
            
            <a href="<?php echo admin_url(); ?>" class="btn">Accéder à l'Admin</a>
        </div>
    </body>
    </html>
    <?php
}
