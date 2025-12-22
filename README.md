# CENDF Faith Hub

Application web pour le Centre d'Enseignement de la Doctrine de la Foi (CENDF) en Côte d'Ivoire.

## 🎯 À Propos

CENDF Faith Hub est une application moderne qui connecte les fidèles aux enseignements, documents officiels, programmes radio et archives de l'Église catholique en Côte d'Ivoire. L'application utilise React pour le frontend et WordPress avec GraphQL pour le backend.

## ✨ Fonctionnalités

- 📰 **Actualités & Missions** : Dernières nouvelles et événements de l'Église
- 📚 **Enseignements** : Accès à des enseignements par catégories (Catéchèse, Doctrine Sociale, Vie Spirituelle, etc.)
- 📄 **Documents Officiels** : Téléchargement de lettres pastorales, encycliques, décrets
- 📻 **Radio & Podcasts** : Streaming en direct et archives audio
- 🗂️ **Archives** : Timeline historique et collection de documents d'archives

## 🛠️ Technologies

### Frontend
- **React 18** avec TypeScript
- **Vite** pour le build et dev server
- **TailwindCSS** pour le styling
- **shadcn/ui** pour les composants UI
- **Apollo Client** pour GraphQL
- **React Router** pour la navigation
- **TanStack Query** pour le state management

### Backend
- **WordPress 6.0+** avec PHP 7.4+
- **WPGraphQL** pour l'API GraphQL
- **JWT Authentication** pour la sécurité
- Custom Post Types pour les contenus spécialisés

## 📋 Prérequis

- **Node.js** 18+ et npm
- **WordPress** 6.0+ (pour le backend)
- **PHP** 7.4+
- **MySQL** 5.7+ ou MariaDB 10.3+

## 🚀 Installation

### 1. Cloner le Repository

```bash
git clone <YOUR_GIT_URL>
cd cendf-faith-hub
```

### 2. Installer les Dépendances

```bash
npm install
```

### 3. Configurer les Variables d'Environnement

Copiez le fichier `.env.example` vers `.env` et configurez les variables :

```bash
cp .env.example .env
```

Éditez `.env` :
```env
VITE_GRAPHQL_ENDPOINT=http://localhost/wordpress/graphql
VITE_WORDPRESS_URL=http://localhost/wordpress
```

### 4. Configurer WordPress Backend

Suivez le guide complet dans [INTEGRATION.md](./INTEGRATION.md) pour :
- Installer et configurer WordPress
- Installer les plugins nécessaires (WPGraphQL, JWT Auth)
- Créer les Custom Post Types
- Configurer l'authentification JWT

### 5. Lancer l'Application

```bash
# Mode développement
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview
```

L'application sera accessible sur `http://localhost:5173`

## 📁 Structure du Projet

```
cendf-faith-hub/
├── src/
│   ├── components/        # Composants réutilisables
│   │   ├── ui/           # Composants shadcn/ui
│   │   ├── NewsCard.tsx
│   │   ├── TeachingCard.tsx
│   │   ├── DocumentCard.tsx
│   │   ├── AudioPlayer.tsx
│   │   ├── OptimizedImage.tsx
│   │   └── ...
│   ├── contexts/         # React Contexts (Auth, etc.)
│   ├── graphql/          # Queries et Mutations GraphQL
│   │   ├── queries.ts
│   │   ├── mutations.ts
│   │   └── types.ts
│   ├── hooks/            # Custom Hooks
│   │   ├── useNews.ts
│   │   ├── useTeachings.ts
│   │   ├── useDocuments.ts
│   │   └── useRadioPrograms.ts
│   ├── lib/              # Utilitaires et configuration
│   │   ├── apollo-client.ts
│   │   ├── auth.ts
│   │   └── utils.ts
│   ├── pages/            # Pages de l'application
│   │   ├── Index.tsx
│   │   ├── Actualites.tsx
│   │   ├── Enseignements.tsx
│   │   ├── Documents.tsx
│   │   ├── Radio.tsx
│   │   └── Archives.tsx
│   ├── App.tsx
│   └── main.tsx
├── public/               # Assets statiques
├── INTEGRATION.md        # Guide d'intégration WordPress
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🎨 Design System

Le projet utilise un design system basé sur :
- **Couleurs principales** : Bordeaux (#A90B0C) et Or (#CD9804)
- **Typographie** : Montserrat (titres) et Georgia (corps de texte)
- **Composants** : shadcn/ui avec customisation
- **Animations** : TailwindCSS animate

## 🔐 Authentification

L'application utilise JWT (JSON Web Tokens) pour l'authentification :

```typescript
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { login, logout, user, isAuthenticated } = useAuth();
  
  // Login
  await login('username', 'password');
  
  // Logout
  logout();
}
```

## 📡 GraphQL API

### Exemples de Queries

**Récupérer les actualités :**
```graphql
query GetNews {
  posts(first: 10) {
    nodes {
      id
      title
      excerpt
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}
```

**Récupérer les enseignements :**
```graphql
query GetTeachings {
  teachings(first: 10) {
    nodes {
      id
      title
      content
      teachingCategories {
        nodes {
          name
        }
      }
    }
  }
}
```

Voir [INTEGRATION.md](./INTEGRATION.md) pour plus d'exemples.

## 🧪 Tests

```bash
# Linter
npm run lint

# Build de production (test)
npm run build
```

## 📦 Déploiement

### Build pour Production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`.

### Déploiement sur Vercel/Netlify

1. Connectez votre repository GitHub
2. Configurez les variables d'environnement :
   - `VITE_GRAPHQL_ENDPOINT`
   - `VITE_WORDPRESS_URL`
3. Déployez !

### Déploiement Manuel

```bash
# Build
npm run build

# Copier le contenu de dist/ vers votre serveur
scp -r dist/* user@server:/var/www/html/
```

## 🐛 Troubleshooting

### Erreur CORS

Si vous rencontrez des erreurs CORS :
1. Vérifiez la configuration WordPress (voir INTEGRATION.md)
2. Assurez-vous que les CORS sont activés dans `.htaccess`

### GraphQL n'est pas accessible

1. Vérifiez que WPGraphQL est activé
2. Régénérez les permaliens dans WordPress
3. Vérifiez l'URL de l'endpoint dans `.env`

### Images ne se chargent pas

1. Vérifiez les permissions du dossier `wp-content/uploads`
2. Assurez-vous que les URLs des images sont accessibles
3. Vérifiez la configuration CORS

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📄 License

Ce projet est sous licence privée - voir le fichier LICENSE pour plus de détails.

## 📞 Contact

Pour toute question ou support :
- Email: contact@cendf-ci.org
- Website: https://cendf-faith-hub.com

## 🙏 Remerciements

- L'équipe du CENDF pour leur soutien
- La communauté WordPress et React
- Tous les contributeurs du projet

---

**Version:** 1.0.0  
**Dernière mise à jour:** Décembre 2025

Fait avec ❤️ pour la communauté catholique de Côte d'Ivoire
