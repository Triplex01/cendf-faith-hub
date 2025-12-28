# Guide d'intégration ReactPress - CENDF

Ce guide explique comment intégrer l'application React CENDF dans WordPress via le plugin **ReactPress**.

## 📋 Prérequis

- WordPress installé (local ou serveur)
- Plugin **ReactPress** installé et activé
- Les plugins CENDF installés:
  - `cendf-core` (CPT, ACF, API, Options)
- Node.js pour builder l'application React

## 🚀 Installation de ReactPress

### Étape 1: Installer le plugin

1. Dans WordPress Admin → **Extensions** → **Ajouter**
2. Rechercher "**ReactPress**"
3. Cliquer sur **Installer** puis **Activer**

### Étape 2: Créer une nouvelle application React

1. Aller dans WordPress Admin → **ReactPress**
2. Cliquer sur "**Add New App**"
3. Configurer:
   - **App Name**: `cendf-app`
   - **App Slug**: `cendf`
   - **Page Template**: `Default` ou `Full Width`

## 📦 Configuration du Build React

### Étape 1: Configurer Vite pour ReactPress

Modifier `vite.config.ts`:

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Configuration pour ReactPress
  base: mode === 'production' 
    ? '/wp-content/reactpress/apps/cendf-app/' 
    : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Générer un manifest pour ReactPress
    manifest: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
    },
  },
}));
```

### Étape 2: Configurer les variables d'environnement

Créer `.env.production`:

```env
# URL WordPress - Adapter selon votre environnement
VITE_WORDPRESS_URL=https://cedfci.org

# Pour le développement local
# VITE_WORDPRESS_URL=http://cendf-ci.local
```

### Étape 3: Builder l'application

```bash
# Installer les dépendances
npm install

# Builder pour production
npm run build
```

## 📂 Déploiement dans WordPress

### Méthode 1: Via l'interface ReactPress

1. Dans WordPress Admin → **ReactPress**
2. Sélectionner votre application `cendf-app`
3. Cliquer sur "**Upload Build**"
4. Sélectionner le dossier `dist/` généré
5. Cliquer sur "**Upload**"

### Méthode 2: Manuellement (FTP/SSH)

1. Builder l'application: `npm run build`
2. Copier le contenu de `dist/` vers:
   ```
   wp-content/reactpress/apps/cendf-app/
   ```
3. Structure finale:
   ```
   wp-content/
   └── reactpress/
       └── apps/
           └── cendf-app/
               ├── index.html
               ├── assets/
               │   ├── index-[hash].js
               │   ├── index-[hash].css
               │   └── images/
               └── ...
   ```

## 🔧 Configuration WordPress

### Étape 1: Configurer la page d'accueil

1. Aller dans **Pages** → **Ajouter**
2. Créer une page nommée "Accueil"
3. Ajouter le shortcode ReactPress:
   ```
   [reactpress app="cendf-app"]
   ```
4. Publier la page
5. Dans **Réglages** → **Lecture**:
   - Sélectionner "Une page statique"
   - Choisir "Accueil" comme page d'accueil

### Étape 2: Configurer les permaliens

1. Aller dans **Réglages** → **Permaliens**
2. Choisir "**Nom de l'article**" (/%postname%/)
3. Enregistrer

### Étape 3: Vérifier les plugins CENDF

S'assurer que `cendf-core` est activé:
- WordPress Admin → **Extensions**
- Vérifier que "CENDF Core" est activé
- Vérifier dans **CENDF** → **Tableau de bord**

## 🔄 Synchronisation des données

### API WordPress disponibles

L'application React utilise ces endpoints:

```
GET /wp-json/wp/v2/posts        → Articles/Actualités
GET /wp-json/wp/v2/events       → Événements (CPT)
GET /wp-json/wp/v2/teachings    → Enseignements (CPT)
GET /wp-json/wp/v2/documents    → Documents (CPT)
GET /wp-json/cendf/v1/ticker    → Messages ticker
GET /wp-json/cendf/v1/options   → Options du site
```

### Vérifier la connexion API

Tester dans le navigateur:
```
http://cendf-ci.local/wp-json/wp/v2/posts?_embed=true
```

## 🖼️ Gestion des images

### Images à la une dans WordPress

1. Lors de la création d'un article:
   - Cliquer sur "**Définir l'image mise en avant**"
   - Sélectionner ou uploader une image
   - Cliquer sur "**Définir l'image mise en avant**"

2. L'application React récupère automatiquement les images via `_embedded`

### Images de fallback

Si WordPress ne renvoie pas d'image, l'application utilise les images locales:
- `src/assets/reunion-eglise.jpg`
- `src/assets/basilique-rome.jpg`
- `src/assets/basilique-notredame.jpg`
- `src/assets/teaching-priest.jpg`

## 📱 Pages et Routes

L'application React gère ces routes:

| Route | Description |
|-------|-------------|
| `/` | Page d'accueil |
| `/actualites` | Liste des actualités |
| `/actualites/:slug` | Détail d'un article |
| `/enseignements` | Enseignements |
| `/radio` | Radio en ligne |
| `/documents` | Documents téléchargeables |
| `/archives` | Archives |
| `/contact` | Page de contact |

## 🔐 Gestion des erreurs CORS

Si vous rencontrez des erreurs CORS, ajouter dans `functions.php` du thème actif:

```php
// Autoriser les requêtes CORS pour l'API REST
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        return $value;
    });
});
```

## 🚀 Migration Local → Production

### Script automatique

Créer `deploy-reactpress.sh`:

```bash
#!/bin/bash

# Configuration
LOCAL_DIR="./dist"
REMOTE_USER="votre_user"
REMOTE_HOST="cedfci.org"
REMOTE_PATH="/home/user/public_html/wp-content/reactpress/apps/cendf-app/"

# Build pour production
echo "🔨 Building application..."
npm run build

# Déploiement via rsync
echo "📤 Uploading to server..."
rsync -avz --delete \
    $LOCAL_DIR/ \
    $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH

echo "✅ Deployment complete!"
```

### Variables d'environnement par environnement

**Développement local** (`.env.development`):
```env
VITE_WORDPRESS_URL=http://cendf-ci.local
```

**Production** (`.env.production`):
```env
VITE_WORDPRESS_URL=https://cedfci.org
```

## ✅ Checklist de déploiement

- [ ] Plugin ReactPress installé et activé
- [ ] Plugin cendf-core activé
- [ ] Application buildée (`npm run build`)
- [ ] Fichiers copiés dans `wp-content/reactpress/apps/cendf-app/`
- [ ] Page créée avec shortcode `[reactpress app="cendf-app"]`
- [ ] Page définie comme page d'accueil
- [ ] Permaliens configurés en "Nom de l'article"
- [ ] API REST accessible (`/wp-json/wp/v2/posts`)
- [ ] Images à la une configurées sur les articles
- [ ] CORS configuré si nécessaire

## 🆘 Dépannage

### L'application ne charge pas

1. Vérifier les fichiers dans `wp-content/reactpress/apps/cendf-app/`
2. Vérifier la console du navigateur pour les erreurs
3. S'assurer que le shortcode est correct

### Les images ne s'affichent pas

1. Vérifier que les articles ont une image à la une
2. Tester l'API: `?_embed=true` renvoie `wp:featuredmedia`
3. Vérifier les permissions des fichiers images

### Erreurs 404 sur les sous-pages

1. Vérifier les permaliens WordPress
2. Configurer le routing côté serveur pour le SPA
3. Ajouter dans `.htaccess`:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

## 📞 Support

Pour toute question, contacter l'équipe technique CENDF.
