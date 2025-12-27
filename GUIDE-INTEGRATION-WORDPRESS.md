# Guide d'Intégration WordPress - CENDF/Radio Espoir

Ce guide vous aidera à connecter votre installation WordPress au frontend React.

## 🚀 Étape 1 : Configuration de l'URL WordPress

### Option A : Variable d'environnement (Recommandé)

Créez un fichier `.env` à la racine du projet :

```env
VITE_WORDPRESS_URL=https://votre-domaine.com
```

### Option B : Configuration directe

Modifiez le fichier `src/config/wordpress.ts` :

```typescript
export const WORDPRESS_CONFIG = {
  baseUrl: "https://votre-domaine.com",
  // ...
};
```

---

## 📦 Étape 2 : Plugins WordPress Requis

### Plugins obligatoires à installer :

1. **Advanced Custom Fields (ACF)** - Gratuit
   - Télécharger : https://wordpress.org/plugins/advanced-custom-fields/
   - Permet de créer des champs personnalisés

2. **ACF to REST API** - Gratuit
   - Télécharger : https://wordpress.org/plugins/acf-to-rest-api/
   - Expose les champs ACF dans l'API REST

3. **Custom Post Type UI** - Gratuit
   - Télécharger : https://wordpress.org/plugins/custom-post-type-ui/
   - Permet de créer des types de contenu personnalisés

4. **JWT Authentication for WP REST API** (Optionnel)
   - Pour l'authentification sécurisée

---

## 📝 Étape 3 : Créer les Custom Post Types

### Via Custom Post Type UI, créez ces types :

#### 1. Événements (`events`)
```
Nom : Événements
Slug : events
Supports : title, editor, thumbnail, excerpt
Public : Oui
Show in REST : Oui ✓
```

#### 2. Podcasts (`podcasts`)
```
Nom : Podcasts
Slug : podcasts
Supports : title, editor, thumbnail
Public : Oui
Show in REST : Oui ✓
```

#### 3. Programmes Radio (`programs`)
```
Nom : Programmes
Slug : programs
Supports : title, editor
Public : Oui
Show in REST : Oui ✓
```

#### 4. Animateurs (`animators`)
```
Nom : Animateurs
Slug : animators
Supports : title, editor, thumbnail
Public : Oui
Show in REST : Oui ✓
```

#### 5. Documents (`documents`)
```
Nom : Documents
Slug : documents
Supports : title, editor
Public : Oui
Show in REST : Oui ✓
```

#### 6. Archives (`archives`)
```
Nom : Archives
Slug : archives
Supports : title, editor, thumbnail, excerpt
Public : Oui
Show in REST : Oui ✓
```

#### 7. Enseignements (`teachings`)
```
Nom : Enseignements
Slug : teachings
Supports : title, editor, thumbnail
Public : Oui
Show in REST : Oui ✓
```

---

## 🔧 Étape 4 : Configurer les Champs ACF

### Groupe : Champs Événement
Emplacement : Type d'article = events

| Nom du champ | Slug | Type |
|--------------|------|------|
| Date | `date` | Date Picker |
| Heure | `time` | Time Picker |
| Lieu | `location` | Texte |
| Organisateur | `organizer` | Texte |

### Groupe : Champs Podcast
Emplacement : Type d'article = podcasts

| Nom du champ | Slug | Type |
|--------------|------|------|
| URL Audio | `audio_url` | URL |
| Durée | `duration` | Texte |
| Numéro épisode | `episode_number` | Nombre |
| Animateur | `host` | Texte |
| Date | `date` | Date Picker |

### Groupe : Champs Programme
Emplacement : Type d'article = programs

| Nom du champ | Slug | Type |
|--------------|------|------|
| Horaire | `time_slot` | Texte |
| Jour | `day_of_week` | Texte |
| Animateur | `host` | Texte |
| Type | `type` | Texte |

### Groupe : Champs Animateur
Emplacement : Type d'article = animators

| Nom du champ | Slug | Type |
|--------------|------|------|
| Rôle | `role` | Texte |
| Biographie | `bio` | Zone de texte |
| Photo | `photo` | Image |

### Groupe : Champs Document
Emplacement : Type d'article = documents

| Nom du champ | Slug | Type |
|--------------|------|------|
| URL Fichier | `file_url` | Fichier |
| Type fichier | `file_type` | Texte |
| Taille | `file_size` | Texte |
| Catégorie | `category` | Texte |
| Date | `date` | Date Picker |

### Groupe : Champs Enseignement
Emplacement : Type d'article = teachings

| Nom du champ | Slug | Type |
|--------------|------|------|
| Auteur | `author` | Texte |
| Durée | `duration` | Texte |
| URL Audio | `audio_url` | URL |
| URL Vidéo | `video_url` | URL |
| Catégorie | `category` | Texte |
| Date | `date` | Date Picker |

---

## 🌐 Étape 5 : Configurer CORS (Important!)

Ajoutez dans votre fichier `functions.php` du thème WordPress :

```php
<?php
// Activer CORS pour l'API REST
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        $origin = get_http_origin();
        
        // Domaines autorisés (ajoutez le vôtre)
        $allowed_origins = [
            'http://localhost:5173',
            'http://localhost:8080',
            'https://votre-frontend.com',
            'https://votre-projet.lovable.app'
        ];
        
        if (in_array($origin, $allowed_origins)) {
            header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
        }
        
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
        
        return $value;
    });
});

// Gérer les requêtes OPTIONS (preflight)
add_action('init', function() {
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Authorization, Content-Type');
        exit(0);
    }
});
?>
```

---

## ✅ Étape 6 : Vérification

### Testez votre API :

1. Ouvrez dans votre navigateur :
   - `https://votre-domaine.com/wp-json/wp/v2/posts`
   - `https://votre-domaine.com/wp-json/wp/v2/events`

2. Vous devriez voir du JSON

### Vérifiez les champs ACF :
   - `https://votre-domaine.com/wp-json/wp/v2/events?_embed=true`
   - Les champs ACF doivent apparaître dans `acf: {}`

---

## 🎨 Étape 7 : Gestion des Images

### Images à la une (Featured Images)
- Toutes les images doivent être définies comme "Image mise en avant" dans WordPress
- Le frontend les récupère automatiquement via `_embedded["wp:featuredmedia"]`

### Tailles recommandées :
- Articles/Actualités : 1200x630px (ratio 16:9)
- Événements : 800x600px (ratio 4:3)
- Podcasts : 400x400px (carré)
- Enseignements : 800x450px (ratio 16:9)

---

## 🔄 Mode Démo

Le frontend inclut un mode démonstration automatique :
- **Activé** quand `VITE_WORDPRESS_URL` n'est pas défini
- **Désactivé** quand une URL WordPress valide est configurée

Cela permet de voir le site fonctionner avant la connexion WordPress.

---

## 🆘 Dépannage

### Page blanche ?
1. Vérifiez la console du navigateur (F12)
2. Assurez-vous que CORS est configuré
3. Vérifiez que l'URL WordPress est correcte

### Images non affichées ?
1. Vérifiez que les images sont bien définies comme "Image mise en avant"
2. Vérifiez que `_embed=true` est dans les requêtes
3. Vérifiez les permissions des médias dans WordPress

### Erreur 404 sur les Custom Post Types ?
1. Allez dans Réglages > Permaliens
2. Cliquez "Enregistrer" (sans rien changer)
3. Cela régénère les règles de réécriture

### Champs ACF non visibles ?
1. Installez "ACF to REST API"
2. Vérifiez que le plugin est activé
3. Rafraîchissez la page

---

## 📞 Support

Pour toute question, contactez l'équipe de développement.

**Bonne intégration !** 🎉
