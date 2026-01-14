<?php
/**
 * Guide d'utilisation pour les éditeurs de contenu
 */
if (!defined('ABSPATH')) {
    exit;
}
?>
<div class="wrap cendf-content-guide">
    <h1>📖 Guide de gestion du contenu</h1>
    <p class="description">Ce guide vous aidera à gérer efficacement le contenu du site SCEDF.</p>
    
    <div class="cendf-guide-grid">
        <!-- Navigation rapide -->
        <div class="cendf-guide-nav">
            <h3>Navigation rapide</h3>
            <ul>
                <li><a href="#articles">📰 Articles</a></li>
                <li><a href="#events">📅 Événements</a></li>
                <li><a href="#podcasts">🎙️ Podcasts</a></li>
                <li><a href="#teachings">📚 Enseignements</a></li>
                <li><a href="#documents">📄 Documents</a></li>
                <li><a href="#products">🛒 Produits</a></li>
                <li><a href="#medias">🖼️ Images et médias</a></li>
                <li><a href="#tips">💡 Conseils</a></li>
            </ul>
        </div>
        
        <!-- Contenu principal -->
        <div class="cendf-guide-content">
            
            <!-- Articles -->
            <section id="articles" class="cendf-guide-section">
                <h2>📰 Articles / Actualités</h2>
                <p>Les articles sont les actualités du site. Ils apparaissent sur la page d'accueil et dans la section Actualités.</p>
                
                <h4>Pour créer un article:</h4>
                <ol>
                    <li>Allez dans <strong>Articles > Ajouter</strong></li>
                    <li>Saisissez un <strong>titre accrocheur</strong></li>
                    <li>Rédigez le contenu dans l'éditeur</li>
                    <li>Ajoutez une <strong>image à la une</strong> (important pour l'affichage)</li>
                    <li>Sélectionnez une <strong>catégorie</strong></li>
                    <li>Cliquez sur <strong>Publier</strong></li>
                </ol>
                
                <div class="cendf-guide-tip">
                    <strong>💡 Conseil:</strong> L'image à la une doit être au minimum 800x600 pixels pour un affichage optimal.
                </div>
            </section>
            
            <!-- Événements -->
            <section id="events" class="cendf-guide-section">
                <h2>📅 Événements</h2>
                <p>Les événements apparaissent dans le calendrier et sur la page d'accueil.</p>
                
                <h4>Champs importants:</h4>
                <table class="cendf-fields-table">
                    <tr>
                        <td><strong>Date</strong></td>
                        <td>Date de l'événement (obligatoire)</td>
                    </tr>
                    <tr>
                        <td><strong>Heure</strong></td>
                        <td>Ex: "14h00 - 17h00"</td>
                    </tr>
                    <tr>
                        <td><strong>Lieu</strong></td>
                        <td>Adresse complète</td>
                    </tr>
                    <tr>
                        <td><strong>Lien d'inscription</strong></td>
                        <td>URL vers formulaire d'inscription (optionnel)</td>
                    </tr>
                </table>
            </section>
            
            <!-- Podcasts -->
            <section id="podcasts" class="cendf-guide-section">
                <h2>🎙️ Podcasts</h2>
                <p>Les podcasts sont les émissions audio et vidéo disponibles en replay.</p>
                
                <h4>Comment ajouter un podcast:</h4>
                <ol>
                    <li>Allez dans <strong>Podcasts > Ajouter</strong></li>
                    <li>Saisissez le titre de l'émission</li>
                    <li>Uploadez le <strong>fichier audio</strong> (MP3, max 50 Mo)</li>
                    <li>OU collez l'<strong>URL YouTube</strong> pour une vidéo</li>
                    <li>Indiquez la <strong>durée</strong> (ex: "45:30")</li>
                    <li>Ajoutez une image à la une</li>
                </ol>
                
                <div class="cendf-guide-warning">
                    <strong>⚠️ Important:</strong> Pour les fichiers audio volumineux, utilisez un service externe (SoundCloud, Anchor) et collez le lien.
                </div>
            </section>
            
            <!-- Enseignements -->
            <section id="teachings" class="cendf-guide-section">
                <h2>📚 Enseignements</h2>
                <p>Les enseignements sont les catéchèses, homélies et formations doctrinales.</p>
                
                <h4>Catégories disponibles:</h4>
                <ul>
                    <li><strong>Doctrine</strong> - Enseignements fondamentaux de la foi</li>
                    <li><strong>Théologie</strong> - Approfondissements théologiques</li>
                    <li><strong>Morale</strong> - Éthique et vie chrétienne</li>
                    <li><strong>Liturgie</strong> - Célébrations et sacrements</li>
                    <li><strong>Spiritualité</strong> - Vie de prière et intérieure</li>
                    <li><strong>Catéchèse</strong> - Formation des fidèles</li>
                </ul>
            </section>
            
            <!-- Documents -->
            <section id="documents" class="cendf-guide-section">
                <h2>📄 Documents</h2>
                <p>Section pour les PDF, lettres pastorales, encycliques, etc.</p>
                
                <h4>Types de documents:</h4>
                <ul>
                    <li>Encycliques</li>
                    <li>Lettres pastorales</li>
                    <li>Homélies</li>
                    <li>Décrets</li>
                    <li>Communiqués</li>
                </ul>
                
                <h4>Pour ajouter un document:</h4>
                <ol>
                    <li>Allez dans <strong>Documents > Ajouter</strong></li>
                    <li>Saisissez le titre du document</li>
                    <li>Uploadez le <strong>fichier PDF</strong></li>
                    <li>Sélectionnez le <strong>type de fichier</strong></li>
                    <li>Indiquez la <strong>taille</strong> (ex: "2.5 MB")</li>
                    <li>Ajoutez une image de couverture si disponible</li>
                </ol>
            </section>
            
            <!-- Produits -->
            <section id="products" class="cendf-guide-section">
                <h2>🛒 Produits (Boutique)</h2>
                <p>Articles en vente: livres, chapelets, médailles, etc.</p>
                
                <h4>Champs produit:</h4>
                <table class="cendf-fields-table">
                    <tr>
                        <td><strong>Prix (XOF)</strong></td>
                        <td>Prix normal en Francs CFA</td>
                    </tr>
                    <tr>
                        <td><strong>Prix promo</strong></td>
                        <td>Prix réduit (optionnel)</td>
                    </tr>
                    <tr>
                        <td><strong>Stock</strong></td>
                        <td>Quantité disponible</td>
                    </tr>
                    <tr>
                        <td><strong>Galerie</strong></td>
                        <td>Photos supplémentaires du produit</td>
                    </tr>
                </table>
            </section>
            
            <!-- Médias -->
            <section id="medias" class="cendf-guide-section">
                <h2>🖼️ Images et médias</h2>
                
                <h4>Tailles recommandées:</h4>
                <table class="cendf-fields-table">
                    <tr>
                        <td><strong>Image à la une</strong></td>
                        <td>1200 x 630 pixels (ratio 1.9:1)</td>
                    </tr>
                    <tr>
                        <td><strong>Photo animateur</strong></td>
                        <td>400 x 400 pixels (carré)</td>
                    </tr>
                    <tr>
                        <td><strong>Image événement</strong></td>
                        <td>800 x 600 pixels</td>
                    </tr>
                    <tr>
                        <td><strong>Couverture produit</strong></td>
                        <td>600 x 800 pixels (portrait)</td>
                    </tr>
                </table>
                
                <div class="cendf-guide-tip">
                    <strong>💡 Conseil:</strong> Compressez vos images avant upload avec <a href="https://tinypng.com" target="_blank">TinyPNG</a> pour améliorer la vitesse du site.
                </div>
            </section>
            
            <!-- Conseils -->
            <section id="tips" class="cendf-guide-section">
                <h2>💡 Conseils et bonnes pratiques</h2>
                
                <h4>Rédaction</h4>
                <ul>
                    <li>Utilisez des <strong>titres courts et accrocheurs</strong></li>
                    <li>Structurez avec des <strong>sous-titres (H2, H3)</strong></li>
                    <li>Ajoutez des <strong>images</strong> pour illustrer</li>
                    <li>Relisez avant de publier</li>
                </ul>
                
                <h4>SEO (Référencement)</h4>
                <ul>
                    <li>Remplissez l'<strong>extrait</strong> (résumé)</li>
                    <li>Utilisez des <strong>mots-clés</strong> dans le titre</li>
                    <li>Ajoutez un <strong>texte alternatif</strong> aux images</li>
                </ul>
                
                <h4>Organisation</h4>
                <ul>
                    <li>Utilisez les <strong>catégories</strong> pour organiser</li>
                    <li>Archivez les anciens contenus dans les <strong>Archives</strong></li>
                    <li>Mettez à jour régulièrement les informations</li>
                </ul>
            </section>
            
        </div>
    </div>
</div>

<style>
.cendf-content-guide {
    max-width: 1200px;
}

.cendf-guide-grid {
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 30px;
    margin-top: 20px;
}

@media (max-width: 900px) {
    .cendf-guide-grid {
        grid-template-columns: 1fr;
    }
}

.cendf-guide-nav {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    position: sticky;
    top: 40px;
    height: fit-content;
}

.cendf-guide-nav h3 {
    margin: 0 0 15px;
    font-size: 14px;
    color: #64748b;
    text-transform: uppercase;
}

.cendf-guide-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.cendf-guide-nav li {
    margin-bottom: 8px;
}

.cendf-guide-nav a {
    display: block;
    padding: 8px 12px;
    border-radius: 6px;
    text-decoration: none;
    color: #334155;
    transition: all 0.2s;
}

.cendf-guide-nav a:hover {
    background: #f1f5f9;
    color: #6366f1;
}

.cendf-guide-content {
    background: white;
    border-radius: 12px;
    padding: 30px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.cendf-guide-section {
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #e2e8f0;
}

.cendf-guide-section:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
}

.cendf-guide-section h2 {
    color: #1e293b;
    margin: 0 0 15px;
    padding-top: 10px;
}

.cendf-guide-section h4 {
    color: #475569;
    margin: 20px 0 10px;
}

.cendf-guide-section ol,
.cendf-guide-section ul {
    margin: 0 0 15px 20px;
}

.cendf-guide-section li {
    margin-bottom: 8px;
    line-height: 1.6;
}

.cendf-fields-table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
}

.cendf-fields-table td {
    padding: 10px 15px;
    border: 1px solid #e2e8f0;
}

.cendf-fields-table tr:nth-child(even) {
    background: #f8fafc;
}

.cendf-guide-tip {
    background: #dbeafe;
    border-left: 4px solid #3b82f6;
    padding: 15px;
    border-radius: 0 8px 8px 0;
    margin: 15px 0;
}

.cendf-guide-warning {
    background: #fef3c7;
    border-left: 4px solid #f59e0b;
    padding: 15px;
    border-radius: 0 8px 8px 0;
    margin: 15px 0;
}
</style>
