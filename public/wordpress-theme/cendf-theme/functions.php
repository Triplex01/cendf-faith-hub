<?php
/**
 * CENDF Theme Functions
 */

// Rediriger toutes les requêtes vers l'app React (SPA)
add_action('template_redirect', 'cendf_spa_redirect');
function cendf_spa_redirect() {
    // Ne pas rediriger les requêtes API
    if (strpos($_SERVER['REQUEST_URI'], '/wp-json/') !== false) {
        return;
    }
    // Ne pas rediriger l'admin
    if (is_admin()) {
        return;
    }
}

// SEO: Ajouter les meta tags Open Graph
add_action('wp_head', 'cendf_og_tags');
function cendf_og_tags() {
    if (is_singular()) {
        global $post;
        ?>
        <meta property="og:title" content="<?php echo esc_attr(get_the_title()); ?>" />
        <meta property="og:description" content="<?php echo esc_attr(wp_trim_words(strip_tags($post->post_content), 30)); ?>" />
        <meta property="og:url" content="<?php echo esc_url(get_permalink()); ?>" />
        <meta property="og:type" content="article" />
        <?php if (has_post_thumbnail()): ?>
        <meta property="og:image" content="<?php echo esc_url(get_the_post_thumbnail_url($post->ID, 'large')); ?>" />
        <?php endif; ?>
        <?php
    }
}

// Désactiver l'éditeur de blocs pour ce thème
add_filter('use_block_editor_for_post', '__return_false');

// Support du thème
add_action('after_setup_theme', 'cendf_theme_setup');
function cendf_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'gallery', 'caption']);
}
