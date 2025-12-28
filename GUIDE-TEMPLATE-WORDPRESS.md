# Guide d'installation - Template WordPress CENDF

## Structure créée

```
public/
├── wordpress-plugin/
│   └── cendf-core/          # Plugin principal
│       ├── cendf-core.php   # Fichier principal
│       ├── includes/        # Classes PHP
│       │   ├── class-cendf-cpt.php      # Custom Post Types
│       │   ├── class-cendf-api.php      # Endpoints REST
│       │   ├── class-cendf-options.php  # Options admin
│       │   ├── class-cendf-acf.php      # Champs ACF
│       │   └── class-cendf-security.php # CORS & sécurité
│       ├── admin/views/     # Pages admin
│       └── assets/          # CSS/JS admin
│
└── wordpress-theme/
    └── cendf-theme/         # Thème léger
        ├── style.css
        ├── index.php        # Charge le build React
        └── functions.php
```

## Installation

### 1. Plugin CENDF Core

```bash
# Copier le plugin
cp -r public/wordpress-plugin/cendf-core/ /var/www/html/wp-content/plugins/

# Activer dans WordPress Admin > Extensions
```

### 2. Thème CENDF

```bash
# Copier le thème
cp -r public/wordpress-theme/cendf-theme/ /var/www/html/wp-content/themes/

# Builder l'app React
npm run build

# Copier le build dans le thème
cp -r dist/ /var/www/html/wp-content/themes/cendf-theme/dist/

# Activer le thème dans WordPress Admin > Apparence > Thèmes
```

### 3. Plugins requis

- **Advanced Custom Fields (ACF)** - Pour les champs personnalisés
- **ACF to REST API** - Expose les champs ACF dans l'API

## Endpoints API disponibles

| Contenu | Endpoint |
|---------|----------|
| Articles | `/wp-json/wp/v2/posts` |
| Événements | `/wp-json/wp/v2/events` |
| Podcasts | `/wp-json/wp/v2/podcasts` |
| Programmes | `/wp-json/wp/v2/programs` |
| Enseignements | `/wp-json/wp/v2/teachings` |
| Documents | `/wp-json/wp/v2/documents` |
| Produits | `/wp-json/wp/v2/products` |
| Activités | `/wp-json/wp/v2/activities` |
| Bandeau défilant | `/wp-json/cendf/v1/ticker` |
| Paramètres | `/wp-json/cendf/v1/settings` |
| Contact (POST) | `/wp-json/cendf/v1/contact` |
| Paiement | `/wp-json/cendf/v1/payment/initiate` |

## Configuration React (.env)

```env
VITE_WORDPRESS_URL=https://votre-site.com
```
