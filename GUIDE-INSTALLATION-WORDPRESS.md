# 📖 Guide d'Installation WordPress - SCEDF

Ce guide détaille l'installation complète du site SCEDF (Sous-Commission Épiscopale pour la Doctrine de la Foi) comme template WordPress natif.

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Installation rapide (automatique)](#installation-rapide)
3. [Installation manuelle](#installation-manuelle)
4. [Configuration WordPress](#configuration-wordpress)
5. [Plugins indispensables](#plugins-indispensables)
6. [Gestion du contenu](#gestion-du-contenu)
7. [API REST](#api-rest)
8. [Migration et déploiement](#migration-et-déploiement)
9. [Dépannage](#dépannage)

---

## 🔧 Prérequis

### Serveur
- **PHP** 7.4 ou supérieur (recommandé: 8.1+)
- **MySQL** 5.7+ ou MariaDB 10.3+
- **WordPress** 5.8 ou supérieur
- **Mémoire PHP** 256 Mo minimum

### Développement (pour le build React)
- **Node.js** 16 ou supérieur
- **npm** ou **yarn**
- **Git** (pour cloner le projet)

---

## ⚡ Installation rapide

### Option 1: Script automatique

```bash
# 1. Cloner le projet
git clone https://github.com/votre-repo/cendf-faith-hub.git
cd cendf-faith-hub

# 2. Installer les dépendances et builder
npm install
npm run build

# 3. Déployer vers WordPress
chmod +x deploy-to-wordpress.sh
./deploy-to-wordpress.sh /chemin/vers/wordpress
```

### Option 2: Import GitHub + CI/CD

Le projet inclut un workflow GitHub Actions pour déployer automatiquement:

1. Forkez le repository
2. Configurez les secrets GitHub:
   - `WP_HOST`: Hôte FTP/SSH
   - `WP_USER`: Utilisateur
   - `WP_PATH`: Chemin WordPress
3. Chaque push sur `main` déploie automatiquement

---

## 🛠️ Installation manuelle

### Étape 1: Build React

```bash
# Dans le dossier du projet
npm install
npm run build
```

### Étape 2: Copier le plugin

```bash
cp -r public/wordpress-plugin/cendf-core /var/www/html/wp-content/plugins/
```

### Étape 3: Copier le thème

```bash
cp -r public/wordpress-theme/cendf-theme /var/www/html/wp-content/themes/
```

### Étape 4: Copier le build React dans le thème

```bash
cp -r dist /var/www/html/wp-content/themes/cendf-theme/
```

### Étape 5: Permissions

```bash
chown -R www-data:www-data /var/www/html/wp-content/plugins/cendf-core
chown -R www-data:www-data /var/www/html/wp-content/themes/cendf-theme
chmod -R 755 /var/www/html/wp-content/plugins/cendf-core
chmod -R 755 /var/www/html/wp-content/themes/cendf-theme
```

---

## ⚙️ Configuration WordPress

### 1. Activer le plugin

1. Allez dans **Extensions** > **Extensions installées**
2. Activez **CENDF Core**
3. Un menu **🔧 Installation** apparaît

### 2. Utiliser l'assistant d'installation

L'assistant automatise:
- Installation des plugins requis (ACF, ACF to REST API)
- Configuration des permaliens
- Fuseau horaire Africa/Abidjan
- Création des catégories par défaut

### 3. Activer le thème

1. Allez dans **Apparence** > **Thèmes**
2. Activez **CENDF Theme**

### 4. Configurer les permaliens

1. **Réglages** > **Permaliens**
2. Sélectionnez **Nom de l'article**
3. Enregistrez

### 5. Configuration CORS (si API externe)

Ajoutez dans `wp-config.php`:

```php
define('CENDF_ALLOWED_ORIGINS', 'https://votre-domaine.com,https://preview.lovable.app');
```

---

## 📦 Plugins indispensables

### Requis (installés automatiquement)

| Plugin | Rôle |
|--------|------|
| **Advanced Custom Fields (ACF)** | Champs personnalisés pour tous les types de contenu |
| **ACF to REST API** | Expose les champs ACF via l'API REST |

### Recommandés

| Plugin | Rôle |
|--------|------|
| **Classic Editor** | Interface d'édition simplifiée |
| **Wordfence Security** | Pare-feu et protection |
| **WP Super Cache** | Cache pour performances |
| **Yoast SEO** | Optimisation SEO |

---

## 📝 Gestion du contenu

### Types de contenu disponibles

| Type | Menu WordPress | Endpoint API |
|------|----------------|--------------|
| Articles | Articles | `/wp-json/wp/v2/posts` |
| Événements | Événements | `/wp-json/wp/v2/events` |
| Podcasts | Podcasts | `/wp-json/wp/v2/podcasts` |
| Programmes Radio | Programmes Radio | `/wp-json/wp/v2/programs` |
| Animateurs | Animateurs | `/wp-json/wp/v2/animators` |
| Enseignements | Enseignements | `/wp-json/wp/v2/teachings` |
| Documents | Documents | `/wp-json/wp/v2/documents` |
| Archives | Archives | `/wp-json/wp/v2/archives` |
| Produits | Boutique | `/wp-json/wp/v2/products` |
| Activités | Activités | `/wp-json/wp/v2/activities` |

### Champs personnalisés (ACF)

Chaque type de contenu dispose de champs spécifiques:

#### Événements
- Date (date picker)
- Heure
- Lieu
- Organisateur
- Lien d'inscription

#### Podcasts
- Fichier audio (MP3)
- URL YouTube
- Durée
- Numéro d'épisode
- Animateur

#### Enseignements
- Auteur/Prédicateur
- Durée
- Fichier audio
- URL vidéo
- Catégorie

#### Produits
- Prix (XOF)
- Prix promotionnel
- Stock
- Galerie d'images
- Fichier téléchargeable

---

## 🔌 API REST

### Endpoints WordPress standard

```bash
# Articles
GET /wp-json/wp/v2/posts

# Événements
GET /wp-json/wp/v2/events

# Avec paramètres
GET /wp-json/wp/v2/posts?per_page=10&_embed=true
```

### Endpoints CENDF personnalisés

```bash
# Bandeau défilant
GET /wp-json/cendf/v1/ticker

# Paramètres du site
GET /wp-json/cendf/v1/settings

# Réseaux sociaux
GET /wp-json/cendf/v1/social

# Recherche globale
GET /wp-json/cendf/v1/search?q=terme

# Formulaire de contact
POST /wp-json/cendf/v1/contact

# Newsletter
POST /wp-json/cendf/v1/newsletter/subscribe

# Paiements
POST /wp-json/cendf/v1/payment/initiate
POST /wp-json/cendf/v1/payment/verify
```

### Configuration React

Le fichier `src/config/wordpress.ts` gère automatiquement:
- Détection local vs production
- Variable d'environnement `VITE_WORDPRESS_URL`
- Fallback vers données de démonstration

---

## 🚀 Migration et déploiement

### De local vers production

1. **Exporter la base de données**
```bash
mysqldump -u user -p database > backup.sql
```

2. **Rechercher/Remplacer les URLs**
```bash
# Avec WP-CLI
wp search-replace 'http://localhost' 'https://production.com' --all-tables
```

3. **Rebuild React**
```bash
npm run build
```

4. **Déployer**
```bash
./deploy-to-wordpress.sh /chemin/production
```

### Mise à jour du site

```bash
# 1. Pull les modifications
git pull

# 2. Rebuild
npm run build

# 3. Redéployer
./deploy-to-wordpress.sh /chemin/wordpress
```

---

## 🔧 Dépannage

### Page blanche

1. Vérifiez le fichier `.htaccess`:
```apache
# BEGIN WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.php$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]
</IfModule>
# END WordPress
```

2. Augmentez la mémoire PHP dans `wp-config.php`:
```php
define('WP_MEMORY_LIMIT', '256M');
```

### Erreur 404 sur les routes React

Le thème gère automatiquement les routes SPA. Vérifiez:
1. Thème cendf-theme actif
2. Permaliens en mode "Nom de l'article"
3. `.htaccess` correct

### API inaccessible

1. Vérifiez les permaliens
2. Testez: `https://votre-site.com/wp-json/wp/v2/posts`
3. Vérifiez CORS si domaine différent

### Images non affichées

1. Vérifiez les permissions du dossier `uploads/`
2. Rechercher/Remplacer les URLs dans la base
3. Regenerate thumbnails avec un plugin

### ACF non visible dans l'API

1. Vérifiez que ACF to REST API est actif
2. Dans ACF > Groupe de champs, activez "Show in REST API"

---

## 📞 Support

- **Documentation**: Ce fichier
- **Issues**: GitHub Issues du projet
- **Email**: support@cendf-ci.org

---

## 📄 Licence

Ce projet est sous licence GPL v2 ou ultérieure, compatible avec WordPress.
