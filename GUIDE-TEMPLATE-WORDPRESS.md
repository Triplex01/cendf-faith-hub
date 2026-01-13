# Guide d'installation - Template WordPress CENDF

## 🚀 Installation rapide

```bash
# Méthode automatique (recommandée)
chmod +x deploy-to-wordpress.sh
./deploy-to-wordpress.sh /chemin/vers/wordpress
```

## Structure créée

```
public/
├── wordpress-plugin/
│   └── cendf-core/              # Plugin principal
│       ├── cendf-core.php       # Fichier principal
│       ├── includes/            # Classes PHP
│       │   ├── class-cendf-cpt.php          # Custom Post Types (9 types)
│       │   ├── class-cendf-cpt-extended.php # CPT additionnels (prières, citations, radios)
│       │   ├── class-cendf-api.php          # Endpoints REST
│       │   ├── class-cendf-options.php      # Options admin
│       │   ├── class-cendf-acf.php          # Champs ACF
│       │   ├── class-cendf-security.php     # CORS & sécurité
│       │   └── class-cendf-deploy.php       # Déploiement build React
│       ├── admin/views/         # Pages admin
│       └── assets/              # CSS/JS admin
│
└── wordpress-theme/
    └── cendf-theme/             # Thème SPA
        ├── style.css
        ├── index.php            # Charge le build React avec SEO
        ├── functions.php        # Routes SPA, PWA, config
        ├── header.php           # Meta tags SEO
        ├── 404.php              # Fallback SPA
        └── dist/                # Build React (après déploiement)

deploy-to-wordpress.sh           # Script de déploiement automatique
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

### Contenus standards
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

### Contenus additionnels (nouveaux CPT)
| Contenu | Endpoint |
|---------|----------|
| Prières | `/wp-json/wp/v2/prayers` |
| Citations | `/wp-json/wp/v2/citations` |
| Radios | `/wp-json/wp/v2/radio-streams` |
| Saints | `/wp-json/wp/v2/saints` |
| Lectures | `/wp-json/wp/v2/readings` |

### API personnalisée CENDF
| Fonction | Endpoint |
|---------|----------|
| Bandeau défilant | `/wp-json/cendf/v1/ticker` |
| Configuration | `/wp-json/cendf/v1/config` |
| Paramètres | `/wp-json/cendf/v1/settings` |
| Contact (POST) | `/wp-json/cendf/v1/contact` |
| Newsletter | `/wp-json/cendf/v1/newsletter/subscribe` |
| Paiement | `/wp-json/cendf/v1/payment/initiate` |
| Recherche | `/wp-json/cendf/v1/search` |

## Configuration React (.env)

```env
VITE_WORDPRESS_URL=https://votre-site.com
```

## Fonctionnalités du thème

### SEO automatique
- Meta tags Open Graph dynamiques
- Twitter Cards
- Titres de pages personnalisés par route
- Preload des ressources critiques

### PWA Ready
- Support Service Worker
- Manifest.json
- Mode offline (si SW activé)

### Performance
- Cache-busting automatique
- Preconnect aux services externes
- Headers de sécurité

## Hook React: useWordPressConfig

```tsx
import { useWordPressConfig } from '@/hooks/useWordPressConfig';

function MyComponent() {
  const { config, isLoading, error } = useWordPressConfig();
  
  if (isLoading) return <div>Chargement...</div>;
  
  return (
    <div>
      <h1>{config?.site.name}</h1>
      <p>Radio: {config?.radio.name}</p>
      <p>Stream: {config?.radio.streamUrl}</p>
    </div>
  );
}
```

## Page de déploiement WordPress

Accédez à **CENDF > Déploiement** dans l'admin WordPress pour:
- Voir le statut du build actuel
- Uploader un nouveau build (ZIP)
- Voir la version et la taille du build
