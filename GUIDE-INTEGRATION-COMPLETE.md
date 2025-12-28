# Guide d'Intégration Complète WordPress + React CENDF

## 🎯 Vue d'ensemble

Ce guide explique comment intégrer le frontend React comme template WordPress natif.

---

## 📁 Structure des fichiers

```
wp-content/
├── plugins/
│   └── cendf-core/          ← Plugin (CPT + API + ACF)
└── themes/
    └── cendf-theme/         ← Thème qui sert React
        ├── dist/            ← Build React (créé automatiquement)
        ├── index.php
        ├── functions.php
        └── style.css
```

---

## 🚀 Installation Automatique

### Étape 1 : Build du projet React

```bash
# Dans le dossier du projet Lovable (local ou après git clone)
npm install
npm run build
```

Cela crée le dossier `dist/` avec tous les assets compilés.

### Étape 2 : Déploiement sur WordPress

**Option A : Script automatique (recommandé)**

Créez ce script `deploy-to-wordpress.sh` :

```bash
#!/bin/bash

# Configuration - MODIFIEZ CES CHEMINS
WP_PATH="/chemin/vers/wordpress"  # ex: /var/www/html/wordpress
PROJECT_PATH="."                   # chemin du projet React

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "🚀 Déploiement CENDF vers WordPress..."

# 1. Build React
echo "📦 Build du projet React..."
cd "$PROJECT_PATH"
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}❌ Erreur: Le dossier dist/ n'existe pas${NC}"
    exit 1
fi

# 2. Copier le plugin
echo "🔌 Installation du plugin cendf-core..."
mkdir -p "$WP_PATH/wp-content/plugins/cendf-core"
cp -r public/wordpress-plugin/cendf-core/* "$WP_PATH/wp-content/plugins/cendf-core/"

# 3. Copier le thème
echo "🎨 Installation du thème cendf-theme..."
mkdir -p "$WP_PATH/wp-content/themes/cendf-theme"
cp -r public/wordpress-theme/cendf-theme/* "$WP_PATH/wp-content/themes/cendf-theme/"

# 4. Copier le build React dans le thème
echo "📁 Copie du build React..."
mkdir -p "$WP_PATH/wp-content/themes/cendf-theme/dist"
cp -r dist/* "$WP_PATH/wp-content/themes/cendf-theme/dist/"

echo -e "${GREEN}✅ Déploiement terminé !${NC}"
echo ""
echo "📋 Actions restantes dans WordPress Admin :"
echo "   1. Activer le plugin 'CENDF Core'"
echo "   2. Activer le thème 'CENDF Theme'"
echo "   3. Aller dans Réglages → Permaliens → 'Nom de l'article'"
echo "   4. Vider le cache si nécessaire"
```

**Option B : Déploiement manuel**

```bash
# 1. Build
npm run build

# 2. Copier le plugin
cp -r public/wordpress-plugin/cendf-core/ /var/www/html/wordpress/wp-content/plugins/

# 3. Copier le thème
cp -r public/wordpress-theme/cendf-theme/ /var/www/html/wordpress/wp-content/themes/

# 4. Copier le build React dans le thème
cp -r dist/ /var/www/html/wordpress/wp-content/themes/cendf-theme/dist/
```

---

## ⚙️ Configuration des URLs

### Configuration automatique

Le projet détecte automatiquement l'environnement :

| Contexte | URL WordPress utilisée |
|----------|------------------------|
| Développement (localhost, lovable.dev) | `http://cendf-ci.local` |
| Production | `https://cedfci.org` |

### Configuration manuelle (optionnelle)

Si vos URLs sont différentes, créez un fichier `.env` :

```env
# Pour développement local
VITE_WORDPRESS_URL=http://cendf-ci.local

# Pour production (dans le serveur de build)
VITE_WORDPRESS_URL=https://cedfci.org
```

---

## 🔧 Configuration WordPress

### 1. Activer le plugin et thème

```
WordPress Admin → Extensions → Activer "CENDF Core"
WordPress Admin → Apparence → Thèmes → Activer "CENDF Theme"
```

### 2. Configurer les permaliens

```
WordPress Admin → Réglages → Permaliens → "Nom de l'article"
```

### 3. Configuration CORS (si API externe)

Le plugin gère automatiquement les CORS. Si problèmes, ajoutez dans `wp-config.php` :

```php
// Autoriser CORS pour le développement
define('CENDF_CORS_ORIGINS', 'http://localhost:8080,https://votre-preview.lovable.app');
```

---

## 🔄 Migration Local → Production

### Étape 1 : Exporter la base de données

```bash
# Via WP-CLI
wp db export cendf_local.sql

# Ou via phpMyAdmin : Exporter la base de données complète
```

### Étape 2 : Rechercher/Remplacer les URLs

```bash
# Via WP-CLI (recommandé)
wp search-replace 'http://cendf-ci.local' 'https://cedfci.org' --all-tables

# Ou utiliser le plugin "Better Search Replace"
```

### Étape 3 : Rebuild avec l'URL de production

```bash
# Créer .env.production
echo "VITE_WORDPRESS_URL=https://cedfci.org" > .env.production

# Build pour production
npm run build
```

### Étape 4 : Déployer

```bash
# Upload via FTP/SFTP
# - wp-content/plugins/cendf-core/
# - wp-content/themes/cendf-theme/ (avec dist/)
```

---

## 🖼️ Problèmes d'images courants

### Les images ne s'affichent pas

1. **Vérifier les permaliens** : Réglages → Permaliens → Enregistrer

2. **Vérifier l'URL WordPress** :
   ```javascript
   // Dans la console du navigateur
   console.log("[WordPress Config]"); // Voir les logs automatiques
   ```

3. **Images avec URL locale en production** :
   ```bash
   # Rechercher/remplacer dans la base
   wp search-replace 'http://cendf-ci.local' 'https://cedfci.org' --all-tables
   ```

4. **Vérifier les permissions** :
   ```bash
   chmod -R 755 wp-content/uploads/
   ```

---

## 📋 Checklist de déploiement

- [ ] `npm run build` exécuté avec succès
- [ ] Plugin `cendf-core` copié dans `wp-content/plugins/`
- [ ] Thème `cendf-theme` copié dans `wp-content/themes/`
- [ ] Dossier `dist/` copié dans `cendf-theme/dist/`
- [ ] Plugin activé dans WordPress
- [ ] Thème activé dans WordPress
- [ ] Permaliens configurés sur "Nom de l'article"
- [ ] CORS configurés si nécessaire
- [ ] Images testées et fonctionnelles
- [ ] Navigation SPA fonctionnelle

---

## 🆘 Dépannage

### Page blanche

```bash
# Vérifier que dist/ existe
ls wp-content/themes/cendf-theme/dist/

# Vérifier les logs PHP
tail -f /var/log/apache2/error.log  # ou nginx
```

### Erreurs 404 sur les routes React

```apache
# .htaccess dans le dossier WordPress
<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/wp-admin
RewriteCond %{REQUEST_URI} !^/wp-json
RewriteRule . /index.html [L]
</IfModule>
```

### API WordPress non accessible

```php
// Dans wp-config.php, vérifier que REST API n'est pas désactivée
// Supprimer ou commenter ces lignes si présentes :
// add_filter('rest_enabled', '__return_false');
// add_filter('rest_jsonp_enabled', '__return_false');
```

---

## 🔒 Sécurité Renforcée

### Configuration CORS sécurisée (dans le plugin)

Le plugin `cendf-core` gère automatiquement :
- CORS sécurisés avec liste blanche de domaines
- Rate limiting (100 requêtes/minute par IP)
- Protection contre l'énumération des utilisateurs
- Validation des entrées

### Ajouter des domaines autorisés

Dans `wp-config.php` :

```php
define('CENDF_CORS_ORIGINS', 'https://cedfci.org,https://www.cedfci.org');
```

---

## 📧 Configuration Email Contact

Le plugin inclut un endpoint `/wp-json/cendf/v1/contact` pour le formulaire de contact.

Configurez l'email destinataire dans :
```
WordPress Admin → CENDF → Paramètres → Email de contact
```

---

## 🛒 Intégration Paiements Mobiles

Les endpoints de paiement sont inclus dans le plugin :
- `/wp-json/cendf/v1/payment/initiate`
- `/wp-json/cendf/v1/payment/verify`

Configurez les clés API dans :
```
WordPress Admin → CENDF → Paramètres → Paiements
```

---

## 📞 Support

Pour toute question :
- Consultez la documentation WordPress REST API
- Vérifiez les logs PHP et la console navigateur
