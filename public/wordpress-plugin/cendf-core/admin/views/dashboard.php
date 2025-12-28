<?php
if (!defined('ABSPATH')) {
    exit;
}

// Récupérer les stats
$stats = [
    'posts' => wp_count_posts('post')->publish,
    'events' => wp_count_posts('event')->publish,
    'podcasts' => wp_count_posts('podcast')->publish,
    'teachings' => wp_count_posts('teaching')->publish,
    'products' => wp_count_posts('product')->publish,
    'activities' => wp_count_posts('activity')->publish,
];
?>

<div class="wrap cendf-dashboard">
    <h1>
        <span class="dashicons dashicons-megaphone"></span>
        CENDF - Tableau de bord
    </h1>
    
    <div class="cendf-welcome">
        <h2>Bienvenue sur le tableau de bord CENDF</h2>
        <p>Gérez facilement le contenu de votre site Radio Espoir depuis cette interface.</p>
    </div>
    
    <!-- Statistiques -->
    <div class="cendf-stats-grid">
        <div class="cendf-stat-box">
            <span class="dashicons dashicons-admin-post"></span>
            <div class="cendf-stat-content">
                <h3><?php echo esc_html($stats['posts']); ?></h3>
                <p>Articles</p>
            </div>
        </div>
        
        <div class="cendf-stat-box">
            <span class="dashicons dashicons-calendar-alt"></span>
            <div class="cendf-stat-content">
                <h3><?php echo esc_html($stats['events']); ?></h3>
                <p>Événements</p>
            </div>
        </div>
        
        <div class="cendf-stat-box">
            <span class="dashicons dashicons-microphone"></span>
            <div class="cendf-stat-content">
                <h3><?php echo esc_html($stats['podcasts']); ?></h3>
                <p>Podcasts</p>
            </div>
        </div>
        
        <div class="cendf-stat-box">
            <span class="dashicons dashicons-welcome-learn-more"></span>
            <div class="cendf-stat-content">
                <h3><?php echo esc_html($stats['teachings']); ?></h3>
                <p>Enseignements</p>
            </div>
        </div>
        
        <div class="cendf-stat-box">
            <span class="dashicons dashicons-cart"></span>
            <div class="cendf-stat-content">
                <h3><?php echo esc_html($stats['products']); ?></h3>
                <p>Produits</p>
            </div>
        </div>
        
        <div class="cendf-stat-box">
            <span class="dashicons dashicons-groups"></span>
            <div class="cendf-stat-content">
                <h3><?php echo esc_html($stats['activities']); ?></h3>
                <p>Activités</p>
            </div>
        </div>
    </div>
    
    <!-- Liens rapides -->
    <div class="cendf-quick-links">
        <h2>Actions rapides</h2>
        <div class="cendf-links-grid">
            <a href="<?php echo admin_url('post-new.php'); ?>" class="cendf-quick-link">
                <span class="dashicons dashicons-plus-alt"></span>
                Nouvel article
            </a>
            <a href="<?php echo admin_url('post-new.php?post_type=event'); ?>" class="cendf-quick-link">
                <span class="dashicons dashicons-calendar-alt"></span>
                Nouvel événement
            </a>
            <a href="<?php echo admin_url('post-new.php?post_type=podcast'); ?>" class="cendf-quick-link">
                <span class="dashicons dashicons-microphone"></span>
                Nouveau podcast
            </a>
            <a href="<?php echo admin_url('post-new.php?post_type=product'); ?>" class="cendf-quick-link">
                <span class="dashicons dashicons-cart"></span>
                Nouveau produit
            </a>
            <a href="<?php echo admin_url('admin.php?page=cendf-ticker'); ?>" class="cendf-quick-link">
                <span class="dashicons dashicons-megaphone"></span>
                Bandeau défilant
            </a>
            <a href="<?php echo admin_url('admin.php?page=cendf-settings'); ?>" class="cendf-quick-link">
                <span class="dashicons dashicons-admin-settings"></span>
                Paramètres
            </a>
        </div>
    </div>
    
    <!-- Endpoints API -->
    <div class="cendf-api-info">
        <h2>Endpoints API REST</h2>
        <p>Votre frontend React peut accéder aux données via ces endpoints :</p>
        
        <table class="widefat">
            <thead>
                <tr>
                    <th>Contenu</th>
                    <th>Endpoint</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Articles</td>
                    <td><code><?php echo home_url('/wp-json/wp/v2/posts'); ?></code></td>
                </tr>
                <tr>
                    <td>Événements</td>
                    <td><code><?php echo home_url('/wp-json/wp/v2/events'); ?></code></td>
                </tr>
                <tr>
                    <td>Podcasts</td>
                    <td><code><?php echo home_url('/wp-json/wp/v2/podcasts'); ?></code></td>
                </tr>
                <tr>
                    <td>Programmes</td>
                    <td><code><?php echo home_url('/wp-json/wp/v2/programs'); ?></code></td>
                </tr>
                <tr>
                    <td>Enseignements</td>
                    <td><code><?php echo home_url('/wp-json/wp/v2/teachings'); ?></code></td>
                </tr>
                <tr>
                    <td>Documents</td>
                    <td><code><?php echo home_url('/wp-json/wp/v2/documents'); ?></code></td>
                </tr>
                <tr>
                    <td>Produits</td>
                    <td><code><?php echo home_url('/wp-json/wp/v2/products'); ?></code></td>
                </tr>
                <tr>
                    <td>Activités</td>
                    <td><code><?php echo home_url('/wp-json/wp/v2/activities'); ?></code></td>
                </tr>
                <tr>
                    <td>Bandeau défilant</td>
                    <td><code><?php echo home_url('/wp-json/cendf/v1/ticker'); ?></code></td>
                </tr>
                <tr>
                    <td>Paramètres site</td>
                    <td><code><?php echo home_url('/wp-json/cendf/v1/settings'); ?></code></td>
                </tr>
                <tr>
                    <td>Recherche globale</td>
                    <td><code><?php echo home_url('/wp-json/cendf/v1/search?q=...'); ?></code></td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

<style>
.cendf-dashboard h1 {
    display: flex;
    align-items: center;
    gap: 10px;
}
.cendf-welcome {
    background: linear-gradient(135deg, #8B1538 0%, #6B0F2A 100%);
    color: white;
    padding: 30px;
    border-radius: 10px;
    margin: 20px 0;
}
.cendf-welcome h2 {
    color: white;
    margin: 0 0 10px;
}
.cendf-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 20px;
    margin: 20px 0;
}
.cendf-stat-box {
    background: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 15px;
}
.cendf-stat-box .dashicons {
    font-size: 40px;
    width: 40px;
    height: 40px;
    color: #8B1538;
}
.cendf-stat-content h3 {
    font-size: 28px;
    margin: 0;
    color: #333;
}
.cendf-stat-content p {
    margin: 5px 0 0;
    color: #666;
}
.cendf-quick-links,
.cendf-api-info {
    background: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    margin: 20px 0;
}
.cendf-links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 15px;
    margin-top: 15px;
}
.cendf-quick-link {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px;
    background: #f5f5f5;
    border-radius: 8px;
    text-decoration: none;
    color: #333;
    transition: all 0.2s;
}
.cendf-quick-link:hover {
    background: #8B1538;
    color: white;
}
.cendf-quick-link .dashicons {
    font-size: 24px;
    width: 24px;
    height: 24px;
}
.cendf-api-info table {
    margin-top: 15px;
}
.cendf-api-info code {
    background: #f0f0f0;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 12px;
}
</style>
