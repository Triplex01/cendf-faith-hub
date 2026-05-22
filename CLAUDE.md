# CLAUDE.md — Instructions de migration CEDF vers WordPress natif

## À CLAUDE CODE : LIS CE FICHIER EN ENTIER AVANT TOUTE ACTION

Ce projet est l'application web **cedfci.org** (Commission Épiscopale pour la
Doctrine de la Foi, Côte d'Ivoire) construite avec **Lovable / React + Vite +
TypeScript + Tailwind + shadcn/ui** et un backend **Supabase (Lovable Cloud)**.

L'objectif est de migrer ce site vers **WordPress natif** page par page, en
préservant la charte (Bordeaux #A90B0C / Or #CD9804 / Noir, esthétique
Vatican-inspirée) et les flux fonctionnels existants.

---

## 1. PAGES ET ROUTES DE L'APPLICATION

| Route                                  | Composant            | Description                                | Auth requise |
|----------------------------------------|----------------------|--------------------------------------------|--------------|
| `/`                                    | `Index`              | Page d'accueil (Hero + sections)           | Non          |
| `/a-propos`                            | `APropos`            | Présentation de la CEDF                    | Non          |
| `/missions`                            | `Missions`           | Missions de la Commission                  | Non          |
| `/activites`                           | `Activites`          | Activités de la CEDF                       | Non          |
| `/actualites`                          | `Actualites`         | Liste des actualités                       | Non          |
| `/actualites/:slug`                    | `ArticleDetail`      | Détail d'une actualité                     | Non          |
| `/enseignements`                       | `Enseignements`      | Catalogue des enseignements                | Non          |
| `/enseignement/:slug`                  | `EnseignementDetail` | Catégorie d'enseignement                   | Non          |
| `/enseignements/article/:slug`         | `EnseignementArticle`| Article d'enseignement (style Vatican)     | Non          |
| `/documents-archives`                  | `DocumentsArchives`  | Documents magistériels & archives          | Non          |
| `/bible`                               | `BibleEnLigne`       | Bible en ligne                             | Non          |
| `/saint-du-jour`                       | `SaintDuJour`        | Saint du jour                              | Non          |
| `/prieres`                             | `Prieres`            | Recueil de prières (TTS)                   | Non          |
| `/calendrier-liturgique`               | `CalendrierLiturgique` | Calendrier liturgique                    | Non          |
| `/radio`                               | `Radio`              | Radios catholiques & podcasts              | Non          |
| `/boutique`                            | `Boutique`           | Boutique (magazines Credo)                 | Non          |
| `/abonnement`                          | `Abonnement`         | Offres d'abonnement Credo                  | Non          |
| `/inscription`                         | `Inscription`        | Formulaire abonnement + paiement Genius    | Non          |
| `/paiement-succes`                     | `PaiementSucces`     | Page succès paiement                       | Non          |
| `/paiement-echec`                      | `PaiementEchec`      | Page échec paiement                        | Non          |
| `/confirmation-commande`               | `ConfirmationCommande` | Confirmation commande boutique           | Non          |
| `/connexion`                           | `Connexion`          | Connexion abonné                           | Non          |
| `/espace-abonne`                       | `EspaceAbonne`       | Espace abonné (PDF reader)                 | **Oui**      |
| `/contact`                             | `Contact`            | Formulaire de contact                      | Non          |
| `/faq`                                 | `FAQ`                | Foire aux questions                        | Non          |
| `/confidentialite`                     | `PolitiqueConfidentialite` | Politique de confidentialité         | Non          |
| `/mentions-legales`                    | `MentionsLegales`    | Mentions légales                           | Non          |
| `/gestion/connexion`                   | `AdminLogin`         | Login admin                                | Non          |
| `/gestion`                             | `AdminLayout`        | Layout admin (dashboard)                   | **Admin**    |
| `/gestion/magazines`                   | `AdminMagazines`     | Gestion magazines                          | **Admin**    |
| `/gestion/actualites`                  | `AdminActualites`    | Gestion actualités                         | **Admin**    |
| `/gestion/paiements`                   | `AdminPaiements`     | Suivi paiements / abonnements              | **Admin**    |
| `/gestion/statistiques`                | `AdminStatistiques`  | Statistiques                               | **Admin**    |
| `/gestion/utilisateurs`                | `AdminUtilisateurs`  | Gestion utilisateurs / rôles               | **Admin**    |
| `/gestion/parametres`                  | `AdminParametres`    | Paramètres                                 | **Admin**    |
| `*`                                    | `NotFound`           | 404                                        | Non          |

---

## 2. STRUCTURE DES DONNÉES (CPT WordPress à créer)

### Type : Magazine
```json
{
  "post_type": "magazine",
  "fields": {
    "titre": "string",
    "numero": "integer",
    "date_publication": "date",
    "description": "text",
    "fichier_pdf": "file_url",
    "couverture": "image_url",
    "prix": "float",
    "is_gratuit": "boolean",
    "auteur": "string",
    "categorie": "taxonomy"
  }
}
```

### Type : Actualité
```json
{
  "post_type": "actualite",
  "fields": {
    "slug": "string",
    "titre": "string",
    "excerpt": "text",
    "contenu": "html",
    "image": "image_url",
    "date": "date",
    "categorie": "taxonomy"
  }
}
```

### Type : Enseignement
```json
{
  "post_type": "enseignement",
  "fields": {
    "slug": "string",
    "titre": "string",
    "auteur": "string",
    "auteur_bio": "text",
    "categorie": "taxonomy (liturgie|fondements-foi|etudes-bibliques|vie-spirituelle|vie-familiale)",
    "excerpt": "text",
    "contenu": "html",
    "image": "image_url",
    "date": "date"
  }
}
```

### Type : Document magistériel
```json
{
  "post_type": "document",
  "fields": {
    "titre": "string",
    "type_document": "taxonomy",
    "auteur_ecclesiastique": "string",
    "date_publication": "date",
    "fichier_pdf": "file_url",
    "langue": "string"
  }
}
```

### Type : Podcast / Émission
```json
{
  "post_type": "emission",
  "fields": {
    "titre": "string",
    "description": "text",
    "radio": "string",
    "schedule": "string",
    "image": "image_url",
    "fichier_audio": "file_url"
  }
}
```

### Type : Prière
```json
{
  "post_type": "priere",
  "fields": {
    "titre": "string",
    "categorie": "taxonomy (Profession de foi|Prières quotidiennes|Prières mariales)",
    "texte": "text"
  }
}
```

---

## 3. VARIABLES D'ENVIRONNEMENT (NOMS UNIQUEMENT — JAMAIS LES VALEURS)

```bash
# Supabase (Lovable Cloud — front-end)
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_SUPABASE_PROJECT_ID=

# Supabase Edge Functions (back-end / secrets)
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_DB_URL=

# Paiement Genius (PayDunya / Genius CI)
GENIUS_API_KEY=
GENIUS_MERCHANT_ID=
GENIUS_WEBHOOK_SECRET=

# Email (Resend)
RESEND_API_KEY=

# Lovable AI Gateway (assistant IA)
LOVABLE_API_KEY=

# Radio stream
RADIO_STREAM_URL=
```

**Règle de sécurité Claude Code :**
- Toutes les valeurs réelles doivent être placées dans `wp-config.php` ou un
  `.env` local — **jamais** committées dans le repo.
- `.env`, `wp-config.php` et tout fichier de secrets doivent figurer dans
  `.gitignore`.
- Ne jamais écrire de clé API en dur dans le code PHP / JS.

---

## 4. FLUX DE PAIEMENT ABONNEMENT CREDO

### FLUX ACTUEL (Lovable / React + Supabase + Genius)

1. Visiteur ouvre `/inscription`, choisit une formule d'abonnement et remplit
   le formulaire (email, mot de passe, nom, prénom, pays, téléphone).
2. Front appelle l'edge function `create-pending-subscription` :
   - Vérifie qu'aucun compte actif n'existe déjà pour cet email
   - Crée une entrée `pending_subscriptions` (id, email, plan, mot de passe
     haché, métadonnées)
   - Crée une session de paiement Genius avec `success_url` et `error_url`
     contenant `?pid={pending.id}`
3. Le `PaymentModal` ouvre l'iframe Genius (brandée CEDF) — l'utilisateur paie
   par Mobile Money / Carte.
4. Genius envoie un webhook signé HMAC-SHA256 (`x-genius-signature`) à l'edge
   function `genius-webhook` :
   - Vérifie la signature avec `GENIUS_WEBHOOK_SECRET`
   - Si succès : crée le compte Supabase Auth, crée la ligne `subscriptions`
     (active, date d'expiration), supprime la pending row
   - Si échec : marque la pending row `failed`
5. Le navigateur est redirigé vers `/paiement-succes?pid=...` (ou
   `/paiement-echec`).
6. L'utilisateur se connecte sur `/connexion` avec l'email + mot de passe
   choisis et accède à `/espace-abonne` (PDFs Credo).

### FLUX CIBLE (WordPress / WooCommerce)

1. L'utilisateur ajoute l'abonnement Credo au panier WooCommerce.
2. Checkout WooCommerce → plugin **WooCommerce Subscriptions** + passerelle
   **Genius / PayDunya** (ou Stripe).
3. Webhook Genius → WooCommerce marque la commande `completed` et active
   l'abonnement.
4. WooCommerce crée automatiquement le compte client + envoie l'email de
   confirmation.
5. Le client accède à « Mon compte » → onglet « Magazines » avec liens de
   téléchargement protégés (plugin **Download Monitor** ou natif WC).

---

## 5. EXPORT BASE DE DONNÉES — SCHÉMA SQL

```sql
-- ============================================
-- EXPORT SCHEMA BASE DE DONNÉES CEDF
-- À importer dans : LocalWP → MySQL
-- ============================================

CREATE TABLE IF NOT EXISTS `cedf_magazines` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `numero` int(11) DEFAULT NULL,
  `date_publication` date DEFAULT NULL,
  `description` longtext,
  `fichier_pdf_url` varchar(500) DEFAULT NULL,
  `couverture_url` varchar(500) DEFAULT NULL,
  `prix` decimal(10,2) DEFAULT 0.00,
  `is_gratuit` tinyint(1) DEFAULT 0,
  `auteur` varchar(255) DEFAULT NULL,
  `categorie` varchar(100) DEFAULT NULL,
  `statut` enum('publie','brouillon','archive') DEFAULT 'brouillon',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `cedf_actualites` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `slug` varchar(200) NOT NULL UNIQUE,
  `titre` varchar(255) NOT NULL,
  `excerpt` text,
  `contenu` longtext,
  `image_url` varchar(500) DEFAULT NULL,
  `date_publication` date DEFAULT NULL,
  `categorie` varchar(100) DEFAULT NULL,
  `statut` enum('publie','brouillon') DEFAULT 'brouillon',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `cedf_enseignements` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `slug` varchar(200) NOT NULL UNIQUE,
  `titre` varchar(255) NOT NULL,
  `auteur` varchar(255) DEFAULT NULL,
  `auteur_bio` text,
  `categorie` varchar(100) DEFAULT NULL,
  `excerpt` text,
  `contenu` longtext,
  `image_url` varchar(500) DEFAULT NULL,
  `date_publication` date DEFAULT NULL,
  `statut` enum('publie','brouillon') DEFAULT 'brouillon',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `cedf_documents` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `titre` varchar(255) NOT NULL,
  `type_document` varchar(100) DEFAULT NULL,
  `auteur_ecclesiastique` varchar(255) DEFAULT NULL,
  `date_publication` date DEFAULT NULL,
  `fichier_pdf_url` varchar(500) DEFAULT NULL,
  `langue` varchar(10) DEFAULT 'fr',
  `statut` enum('publie','brouillon') DEFAULT 'brouillon',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `cedf_abonnes` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL UNIQUE,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `pays` varchar(100) DEFAULT NULL,
  `telephone` varchar(50) DEFAULT NULL,
  `date_abonnement` timestamp DEFAULT CURRENT_TIMESTAMP,
  `date_expiration` date DEFAULT NULL,
  `plan` varchar(50) DEFAULT NULL,
  `statut_abonnement` enum('actif','expire','annule','pending') DEFAULT 'pending',
  `genius_customer_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `cedf_transactions` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `abonne_id` bigint(20) DEFAULT NULL,
  `magazine_id` bigint(20) DEFAULT NULL,
  `genius_reference` varchar(255) DEFAULT NULL,
  `montant` decimal(10,2) DEFAULT NULL,
  `devise` varchar(3) DEFAULT 'XOF',
  `statut` enum('en_attente','complete','rembourse','echoue') DEFAULT 'en_attente',
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`abonne_id`) REFERENCES `cedf_abonnes`(`id`),
  FOREIGN KEY (`magazine_id`) REFERENCES `cedf_magazines`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
```

---

## 6. COMPOSANTS UI → MAPPING ELEMENTOR / WORDPRESS

| Composant React            | Équivalent WordPress / Elementor                              |
|----------------------------|---------------------------------------------------------------|
| `<Header />`               | Menu WordPress natif + widget Elementor Header                |
| `<Footer />`               | Widget Elementor Footer                                       |
| `<Hero />` / `<HeroCarousel />` | Widget Elementor Slider / Hero                          |
| `<NewsSection />`          | Loop Elementor sur CPT `actualite`                            |
| `<TeachingsSection />`     | Loop Elementor sur CPT `enseignement`                         |
| `<DocumentsSection />`     | Loop Elementor sur CPT `document`                             |
| `<RadioPlayer />` / `<FloatingMediaPlayer />` | Widget HTML custom + JS (stream URL) |
| `<EcclesiaTVPlayer />`     | Widget HTML custom + iframe                                   |
| `<OrderModal />`           | Bouton WooCommerce natif + modale                             |
| `<PaymentModal />`         | Passerelle Genius / Stripe WooCommerce                        |
| PDF reader (`EspaceAbonne`)| Plugin **PDF Embedder** + Download Monitor                    |
| `<SEO />`                  | Plugin **Yoast SEO** ou **RankMath**                          |
| `<LanguageSelector />`     | Plugin **Polylang** ou **WPML**                               |
| `<CookieConsent />`        | Plugin **Complianz** ou **CookieYes**                         |
| `<AIAssistant />`          | Widget custom appelant Lovable AI Gateway via REST            |

---

## 7. DESIGN SYSTEM

```css
/* ============ COULEURS CEDF (HSL) ============ */
--background:       0 0% 100%;
--foreground:       0 0% 10%;
--primary:          359 86% 36%;   /* Bordeaux #A90B0C */
--primary-foreground: 0 0% 100%;
--secondary:        43 95% 41%;    /* Or #CD9804 */
--secondary-foreground: 0 0% 10%;
--accent:           45 30% 94%;    /* Crème Vatican */
--muted:            0 0% 96%;
--border:           0 0% 90%;
--destructive:      0 84% 60%;

/* ============ POLICES ============ */
--font-display: 'Playfair Display', Georgia, serif;  /* titres */
--font-sans:    'Inter', system-ui, sans-serif;      /* corps */

/* ============ BREAKPOINTS (Tailwind defaults) ============ */
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px

/* ============ ESPACEMENTS / RAYONS ============ */
--radius:        0.75rem;     /* rounded-xl */
--shadow-elegant: 0 10px 30px -10px hsl(var(--primary) / 0.2);
--shadow-card:    0 4px 12px -2px hsl(0 0% 0% / 0.08);
```

---

## 8. DÉPENDANCES NPM PRINCIPALES

- `react` 18 + `react-dom`
- `react-router-dom` 6
- `vite` 5 + `@vitejs/plugin-react-swc`
- `typescript` 5
- `tailwindcss` 3 + `tailwindcss-animate` + `tailwind-merge`
- `@radix-ui/*` (primitives shadcn/ui)
- `lucide-react` (icônes)
- `@tanstack/react-query` (data fetching)
- `@supabase/supabase-js` (backend)
- `react-hook-form` + `zod` + `@hookform/resolvers` (formulaires)
- `framer-motion` (animations)
- `embla-carousel-react` + `embla-carousel-autoplay`
- `dompurify` (sanitization HTML — sécurité)
- `sonner` (toasts)
- `recharts` (graphiques admin)

---

## 9. INSTRUCTIONS SPÉCIALES POUR CLAUDE CODE

Quand tu lis ce fichier, tu dois :

1. **NE JAMAIS** écrire de clé API en dur dans le code.
2. **TOUJOURS** vérifier que `.gitignore` contient `.env` et `wp-config.php`.
3. **COMMENCER** par créer la structure de fichiers avant d'écrire le code.
4. **TESTER** chaque CPT après création avec `wp post list --post_type=XXX`.
5. **VÉRIFIER** la sécurité des endpoints REST avant de passer à la page suivante.
6. **UTILISER WP-CLI** pour toutes les opérations en ligne de commande.
7. **CRÉER** un fichier `MIGRATION_LOG.md` et noter chaque étape complétée.

### Ordre de travail obligatoire

```
Phase 1 : cedf-core plugin → CPT → Sécurité API REST
Phase 2 : Thème enfant → Page accueil → Page actualités/enseignements
Phase 3 : WooCommerce → Genius/Stripe → Tests paiement abonnement
Phase 4 : Toutes les autres pages → SEO (Yoast) → Performance
Phase 5 : Export BDD Supabase → Import MySQL → Déploiement production
```

### Commande de démarrage

Quand l'utilisateur tape **« démarre la migration »** ou **« start migration »**,
tu dois automatiquement :

1. Créer la structure de dossiers complète (`wp-content/plugins/cedf-core/`,
   `wp-content/themes/cedf-theme/`).
2. Initialiser le plugin `cedf-core.php` avec en-tête WordPress standard.
3. Créer le fichier `.gitignore` sécurisé (incluant `.env`, `wp-config.php`,
   `node_modules`, `vendor`).
4. Créer le fichier `.env.example` avec tous les noms de variables listés
   en section 3.
5. Afficher le plan de travail de la session.

---

> Ce fichier `CLAUDE.md` a été généré automatiquement par Lovable.
> Projet : **cedfci.org** — CEDF Côte d'Ivoire.
> Ne pas supprimer — Claude Code en a besoin pour fonctionner.
