<?php
/**
 * Header Template - SEO et Meta Tags dynamiques
 * 
 * Ce fichier est utilisé pour générer les meta tags SEO
 * quand WordPress a besoin de les afficher
 */

// Récupérer les informations de la page courante
$page_title = get_the_title() ?: get_bloginfo('name');
$page_description = get_the_excerpt() ?: get_bloginfo('description');
$page_image = get_the_post_thumbnail_url(null, 'large') ?: get_template_directory_uri() . '/dist/assets/hero-church.jpg';
$page_url = get_permalink() ?: home_url();
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title><?php echo esc_html($page_title); ?> | CENDF - Radio Espoir</title>
    <meta name="description" content="<?php echo esc_attr($page_description); ?>">
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?php echo esc_attr($page_title); ?>">
    <meta property="og:description" content="<?php echo esc_attr($page_description); ?>">
    <meta property="og:image" content="<?php echo esc_url($page_image); ?>">
    <meta property="og:url" content="<?php echo esc_url($page_url); ?>">
    <meta property="og:site_name" content="CENDF - Radio Espoir">
    <meta property="og:locale" content="fr_FR">
    
    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo esc_attr($page_title); ?>">
    <meta name="twitter:description" content="<?php echo esc_attr($page_description); ?>">
    <meta name="twitter:image" content="<?php echo esc_url($page_image); ?>">
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/dist/favicon.png">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/dist/favicon.png">
    
    <!-- Theme Color -->
    <meta name="theme-color" content="#1a1a2e">
    <meta name="msapplication-TileColor" content="#1a1a2e">
    
    <!-- Preconnect pour performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
