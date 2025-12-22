# Guide d'Intégration WordPress - CENDF Faith Hub

Ce document décrit comment configurer WordPress pour fonctionner avec l'application React via GraphQL.

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Installation WordPress](#installation-wordpress)
3. [Configuration des Plugins](#configuration-des-plugins)
4. [Custom Post Types](#custom-post-types)
5. [Configuration GraphQL](#configuration-graphql)
6. [Configuration JWT](#configuration-jwt)
7. [Structure des Données](#structure-des-données)
8. [Tests et Validation](#tests-et-validation)
9. [Troubleshooting](#troubleshooting)

---

## 🔧 Prérequis

- WordPress 6.0+ installé et configuré
- PHP 7.4+
- MySQL 5.7+ ou MariaDB 10.3+
- Accès administrateur WordPress
- Accès au fichier `wp-config.php`

---

## 📦 Installation WordPress

### 1. Installer WordPress

Si WordPress n'est pas encore installé :

```bash
# Télécharger WordPress
wget https://wordpress.org/latest.tar.gz
tar -xzvf latest.tar.gz
mv wordpress /var/www/html/

# Configurer les permissions
sudo chown -R www-data:www-data /var/www/html/wordpress
sudo chmod -R 755 /var/www/html/wordpress
```

### 2. Créer la Base de Données

```sql
CREATE DATABASE cendf_faith_hub CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'cendf_user'@'localhost' IDENTIFIED BY 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON cendf_faith_hub.* TO 'cendf_user'@'localhost';
FLUSH PRIVILEGES;
```

---

## 🔌 Configuration des Plugins

### Plugins Requis

Installez et activez les plugins suivants :

1. **WPGraphQL** (v1.14+)
   - Plugin officiel pour exposer WordPress via GraphQL
   - URL : https://www.wpgraphql.com/

2. **WPGraphQL JWT Authentication** (v0.7+)
   - Authentification JWT pour GraphQL
   - URL : https://github.com/wp-graphql/wp-graphql-jwt-authentication

3. **WPGraphQL for Advanced Custom Fields** (optionnel mais recommandé)
   - Pour exposer les champs ACF via GraphQL
   - URL : https://github.com/wp-graphql/wp-graphql-acf

### Installation via WP-CLI

```bash
# WPGraphQL
wp plugin install wp-graphql --activate

# JWT Authentication
wp plugin install https://github.com/wp-graphql/wp-graphql-jwt-authentication/archive/refs/heads/master.zip --activate

# ACF (optionnel)
wp plugin install advanced-custom-fields --activate
wp plugin install https://github.com/wp-graphql/wp-graphql-acf/archive/refs/heads/master.zip --activate
```

### Installation via l'Interface WordPress

1. Allez dans **Extensions > Ajouter**
2. Recherchez "WPGraphQL"
3. Installez et activez
4. Répétez pour les autres plugins

---

## 🎨 Custom Post Types

Créez les Custom Post Types nécessaires pour l'application.

### 1. Créer `functions.php` ou un Plugin Custom

Ajoutez ce code dans `wp-content/themes/votre-theme/functions.php` ou créez un plugin :

```php
<?php
/**
 * Plugin Name: CENDF Custom Post Types
 * Description: Custom Post Types pour CENDF Faith Hub
 * Version: 1.0
 */

// Post Type: Enseignements
function cendf_register_teaching_cpt() {
    $labels = array(
        'name'               => 'Enseignements',
        'singular_name'      => 'Enseignement',
        'add_new'            => 'Ajouter',
        'add_new_item'       => 'Ajouter un Enseignement',
        'edit_item'          => 'Modifier l\'Enseignement',
        'new_item'           => 'Nouvel Enseignement',
        'view_item'          => 'Voir l\'Enseignement',
        'search_items'       => 'Rechercher',
        'not_found'          => 'Aucun enseignement trouvé',
        'not_found_in_trash' => 'Aucun enseignement dans la corbeille',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => true,
        'has_archive'         => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'teaching',
        'graphql_plural_name' => 'teachings',
        'menu_icon'           => 'dashicons-book',
        'supports'            => array('title', 'editor', 'excerpt', 'thumbnail'),
        'rewrite'             => array('slug' => 'enseignements'),
    );

    register_post_type('teaching', $args);

    // Taxonomy pour catégories d'enseignements
    register_taxonomy('teaching_category', 'teaching', array(
        'label'              => 'Catégories d\'Enseignements',
        'hierarchical'       => true,
        'show_in_rest'       => true,
        'show_in_graphql'    => true,
        'graphql_single_name' => 'teachingCategory',
        'graphql_plural_name' => 'teachingCategories',
    ));
}
add_action('init', 'cendf_register_teaching_cpt');

// Post Type: Documents
function cendf_register_document_cpt() {
    $labels = array(
        'name'               => 'Documents',
        'singular_name'      => 'Document',
        'add_new'            => 'Ajouter',
        'add_new_item'       => 'Ajouter un Document',
        'edit_item'          => 'Modifier le Document',
        'new_item'           => 'Nouveau Document',
        'view_item'          => 'Voir le Document',
        'search_items'       => 'Rechercher',
        'not_found'          => 'Aucun document trouvé',
        'not_found_in_trash' => 'Aucun document dans la corbeille',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => true,
        'has_archive'         => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'document',
        'graphql_plural_name' => 'documents',
        'menu_icon'           => 'dashicons-media-document',
        'supports'            => array('title', 'excerpt', 'thumbnail'),
        'rewrite'             => array('slug' => 'documents'),
    );

    register_post_type('document', $args);

    // Taxonomy pour catégories de documents
    register_taxonomy('document_category', 'document', array(
        'label'              => 'Catégories de Documents',
        'hierarchical'       => true,
        'show_in_rest'       => true,
        'show_in_graphql'    => true,
        'graphql_single_name' => 'documentCategory',
        'graphql_plural_name' => 'documentCategories',
    ));
}
add_action('init', 'cendf_register_document_cpt');

// Post Type: Programmes Radio
function cendf_register_radio_program_cpt() {
    $labels = array(
        'name'               => 'Programmes Radio',
        'singular_name'      => 'Programme Radio',
        'add_new'            => 'Ajouter',
        'add_new_item'       => 'Ajouter un Programme',
        'edit_item'          => 'Modifier le Programme',
        'new_item'           => 'Nouveau Programme',
        'view_item'          => 'Voir le Programme',
        'search_items'       => 'Rechercher',
        'not_found'          => 'Aucun programme trouvé',
        'not_found_in_trash' => 'Aucun programme dans la corbeille',
    );

    $args = array(
        'labels'              => $labels,
        'public'              => true,
        'has_archive'         => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_nav_menus'   => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'radioProgram',
        'graphql_plural_name' => 'radioPrograms',
        'menu_icon'           => 'dashicons-microphone',
        'supports'            => array('title', 'editor', 'excerpt', 'thumbnail'),
        'rewrite'             => array('slug' => 'radio'),
    );

    register_post_type('radio_program', $args);
}
add_action('init', 'cendf_register_radio_program_cpt');

// Ajouter les champs personnalisés (ACF ou Meta Boxes)
function cendf_register_custom_fields() {
    // Champ pour le fichier de document
    register_post_meta('document', 'document_file', array(
        'type'         => 'string',
        'single'       => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
    ));

    // Champ pour l'URL de streaming radio
    register_post_meta('radio_program', 'streaming_url', array(
        'type'         => 'string',
        'single'       => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
    ));

    // Champ pour l'horaire du programme
    register_post_meta('radio_program', 'schedule', array(
        'type'         => 'string',
        'single'       => true,
        'show_in_rest' => true,
        'show_in_graphql' => true,
    ));
}
add_action('init', 'cendf_register_custom_fields');
```

### 2. Activer les Permaliens

Allez dans **Réglages > Permaliens** et choisissez "Nom de l'article" ou "Structure personnalisée".

---

## 🔐 Configuration JWT

### 1. Modifier `wp-config.php`

Ajoutez ces lignes **avant** `/* C'est tout, ne touchez pas à ce qui suit ! */` :

```php
// Configuration JWT
define('GRAPHQL_JWT_AUTH_SECRET_KEY', 'votre-cle-secrete-tres-longue-et-aleatoire-ici');
define('JWT_AUTH_CORS_ENABLE', true);

// Activer les erreurs GraphQL en développement (à désactiver en production)
define('GRAPHQL_DEBUG', true);
```

Générez une clé secrète sécurisée :

```bash
# Linux/Mac
openssl rand -base64 64

# Ou utilisez :
https://api.wordpress.org/secret-key/1.1/salt/
```

### 2. Configurer les CORS dans `.htaccess`

Ajoutez au début du fichier `.htaccess` :

```apache
# CORS pour l'API GraphQL
<IfModule mod_headers.c>
    SetEnvIf Origin "http(s)?://(localhost:5173|votre-domaine.com)$" AccessControlAllowOrigin=$0
    Header add Access-Control-Allow-Origin %{AccessControlAllowOrigin}e env=AccessControlAllowOrigin
    Header set Access-Control-Allow-Credentials "true"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
</IfModule>

# Gérer les requêtes OPTIONS
RewriteEngine On
RewriteCond %{REQUEST_METHOD} OPTIONS
RewriteRule ^(.*)$ $1 [R=200,L]
```

---

## 📊 Configuration GraphQL

### 1. Vérifier l'Endpoint GraphQL

L'endpoint GraphQL sera disponible à :
```
http://votre-domaine.com/graphql
```

### 2. Tester dans GraphiQL IDE

WPGraphQL inclut un IDE GraphQL accessible via :
```
http://votre-domaine.com/wp-admin/ > GraphQL > GraphiQL IDE
```

### 3. Requêtes de Test

**Tester les Posts :**
```graphql
query GetPosts {
  posts(first: 5) {
    nodes {
      id
      title
      excerpt
      date
      featuredImage {
        node {
          sourceUrl
        }
      }
    }
  }
}
```

**Tester l'Authentification :**
```graphql
mutation Login {
  login(input: {username: "admin", password: "votre_password"}) {
    authToken
    user {
      id
      name
      email
    }
  }
}
```

---

## 📁 Structure des Données

### Posts (Actualités)
- **Type:** `post` (natif WordPress)
- **Champs:** title, content, excerpt, date, featuredImage, author, categories
- **GraphQL:** `posts`, `post`

### Enseignements
- **Type:** `teaching` (custom)
- **Champs:** title, content, excerpt, date, featuredImage
- **Taxonomie:** `teaching_category`
- **GraphQL:** `teachings`, `teaching`

### Documents
- **Type:** `document` (custom)
- **Champs:** title, excerpt, date, document_file (meta)
- **Taxonomie:** `document_category`
- **GraphQL:** `documents`, `document`

### Programmes Radio
- **Type:** `radio_program` (custom)
- **Champs:** title, content, excerpt, streaming_url (meta), schedule (meta), featuredImage
- **GraphQL:** `radioPrograms`, `radioProgram`

---

## ✅ Tests et Validation

### 1. Tester les Queries GraphQL

Utilisez GraphiQL IDE ou Postman :

```bash
# Test avec curl
curl -X POST \
  http://localhost/wordpress/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"{ posts(first: 5) { nodes { title } } }"}'
```

### 2. Tester l'Authentification JWT

```bash
# Login
curl -X POST \
  http://localhost/wordpress/graphql \
  -H 'Content-Type: application/json' \
  -d '{"query":"mutation { login(input: {username: \"admin\", password: \"password\"}) { authToken } }"}'

# Utiliser le token
curl -X POST \
  http://localhost/wordpress/graphql \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer VOTRE_TOKEN_ICI' \
  -d '{"query":"{ viewer { name email } }"}'
```

---

## 🐛 Troubleshooting

### Erreur: "Cannot query field 'posts'"

**Solution:** Assurez-vous que WPGraphQL est activé et que les permaliens sont configurés.

```bash
wp plugin activate wp-graphql
wp rewrite flush
```

### Erreur: "Invalid token"

**Solution:** Vérifiez que `GRAPHQL_JWT_AUTH_SECRET_KEY` est défini dans `wp-config.php`.

### Erreur CORS

**Solution:** 
1. Vérifiez la configuration `.htaccess`
2. Assurez-vous que `JWT_AUTH_CORS_ENABLE` est `true` dans `wp-config.php`
3. Vérifiez que le domaine frontend est autorisé

### Custom Post Types n'apparaissent pas

**Solution:**
1. Vérifiez que `show_in_graphql` est `true`
2. Régénérez les permaliens : **Réglages > Permaliens > Enregistrer**
3. Videz le cache si vous utilisez un plugin de cache

### Images Featured ne s'affichent pas

**Solution:**
1. Vérifiez que les images ont des URL accessibles
2. Assurez-vous que les permissions des dossiers uploads sont correctes :
```bash
chmod -R 755 wp-content/uploads
```

---

## 🔒 Sécurité - Best Practices

### 1. En Production

Dans `wp-config.php` :
```php
// Désactiver le debug GraphQL
define('GRAPHQL_DEBUG', false);

// Limiter la profondeur des queries
define('GRAPHQL_QUERY_DEPTH_MAX', 15);
```

### 2. Limiter les Taux de Requêtes

Utilisez un plugin comme **WP-GraphQL Rate Limit** ou configurez au niveau serveur.

### 3. Protéger l'Admin

```php
// Dans wp-config.php - Changer l'URL d'admin
define('WP_ADMIN_DIR', 'mon-admin-secret');
```

---

## 📚 Ressources Supplémentaires

- [Documentation WPGraphQL](https://www.wpgraphql.com/docs/)
- [WPGraphQL JWT Authentication](https://github.com/wp-graphql/wp-graphql-jwt-authentication)
- [GraphQL Learn](https://graphql.org/learn/)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)

---

## 🆘 Support

Pour toute question ou problème :
- Ouvrir une issue sur le repository GitHub
- Consulter la documentation WPGraphQL
- Contacter l'équipe de développement CENDF

---

**Version:** 1.0  
**Dernière mise à jour:** Décembre 2025
