<?php
/**
 * CENDF Theme - Sert l'app React buildée
 * 
 * Ce thème charge directement le build React depuis /dist/
 * Toutes les routes sont gérées côté client (SPA)
 */

// Charger le fichier index.html du build React
$dist_path = get_template_directory() . '/dist/index.html';

if (file_exists($dist_path)) {
    // Lire et afficher le contenu du build
    echo file_get_contents($dist_path);
} else {
    // Fallback si le build n'existe pas
    ?>
    <!DOCTYPE html>
    <html <?php language_attributes(); ?>>
    <head>
        <meta charset="<?php bloginfo('charset'); ?>">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title><?php bloginfo('name'); ?></title>
        <style>
            body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #1a1a2e; color: white; }
            .message { text-align: center; padding: 40px; }
            h1 { color: #FFD700; }
        </style>
    </head>
    <body>
        <div class="message">
            <h1>CENDF - Radio Espoir</h1>
            <p>Le build React n'a pas été trouvé.</p>
            <p>Copiez le contenu de <code>dist/</code> dans <code>wp-content/themes/cendf-theme/dist/</code></p>
        </div>
    </body>
    </html>
    <?php
}
