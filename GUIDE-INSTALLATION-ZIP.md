# 📦 Installation via fichiers ZIP

Ce guide explique comment installer SCEDF sur WordPress en utilisant simplement les fichiers ZIP, **sans aucune ligne de commande**.

---

## 📥 Étape 1: Télécharger les packages

### Option A: Télécharger les ZIPs prêts à l'emploi

Si vous avez reçu les fichiers ZIP directement:
- `cendf-core.zip` - Le plugin principal
- `cendf-theme.zip` - Le thème avec l'application

### Option B: Générer les ZIPs vous-même

Si vous avez accès au code source:
```bash
chmod +x package-wordpress.sh
./package-wordpress.sh
```
Les ZIPs seront créés dans le dossier `wordpress-packages/`.

---

## 🔌 Étape 2: Installer le Plugin

1. Connectez-vous à votre **admin WordPress** (`votre-site.com/wp-admin`)

2. Allez dans **Extensions** > **Ajouter**

3. Cliquez sur le bouton **"Téléverser une extension"** (en haut)

4. Cliquez sur **"Choisir un fichier"** et sélectionnez `cendf-core.zip`

5. Cliquez sur **"Installer maintenant"**

6. Une fois installé, cliquez sur **"Activer l'extension"**

![Installation plugin](https://via.placeholder.com/600x300?text=Extensions+>+Ajouter+>+Téléverser)

---

## 🎨 Étape 3: Installer le Thème

1. Allez dans **Apparence** > **Thèmes**

2. Cliquez sur le bouton **"Ajouter"** (en haut)

3. Cliquez sur **"Téléverser un thème"**

4. Sélectionnez le fichier `cendf-theme.zip`

5. Cliquez sur **"Installer maintenant"**

6. Cliquez sur **"Activer"**

---

## 🔧 Étape 4: Assistant d'installation

Après activation du plugin, un menu **"🔧 Installation"** apparaît dans la barre latérale.

### L'assistant vous guide pour:

1. **Installer les plugins requis**
   - Advanced Custom Fields (ACF)
   - ACF to REST API
   - *(Installation automatique en 1 clic)*

2. **Configurer WordPress**
   - Permaliens (Nom de l'article)
   - Fuseau horaire (Africa/Abidjan)
   - Format de date français

3. **Créer les catégories par défaut**
   - Catégories d'enseignements
   - Types de documents
   - Catégories de produits

4. **Finaliser**
   - Cliquez sur "Terminer l'installation"

---

## ✅ Étape 5: Vérification

### Vérifiez que tout fonctionne:

1. **Visitez votre site** - L'application SCEDF devrait s'afficher

2. **Testez l'API** - Allez sur `votre-site.com/wp-json/wp/v2/posts`

3. **Tableau de bord** - Menu SCEDF > Tableau de bord

---

## 📝 Après l'installation

### Configurer le site

1. Allez dans **SCEDF** > **Paramètres**
2. Remplissez:
   - Nom du site
   - Email de contact
   - URL du flux radio
   - Réseaux sociaux

### Ajouter du contenu

Utilisez les menus WordPress pour ajouter:
- 📰 **Articles** - Actualités
- 📅 **Événements** - Calendrier
- 🎙️ **Podcasts** - Émissions audio/vidéo
- 📚 **Enseignements** - Catéchèses
- 📄 **Documents** - PDFs, lettres pastorales
- 🛒 **Produits** - Boutique

---

## ❓ Dépannage

### Page blanche ou erreur

1. Vérifiez que le **thème est actif** (Apparence > Thèmes)
2. Vérifiez que le **plugin est actif** (Extensions)
3. Allez dans **Réglages** > **Permaliens** et cliquez "Enregistrer"

### "Build React non trouvé"

Le thème ZIP inclut normalement le build React. Si ce message apparaît:
1. Le ZIP a peut-être été créé sans le build
2. Contactez-nous pour obtenir un ZIP complet

### Plugins requis non installés

1. Allez dans **🔧 Installation**
2. Cliquez sur les boutons "Installer" à côté de chaque plugin
3. Attendez l'installation automatique

### API inaccessible (erreur 404)

1. Allez dans **Réglages** > **Permaliens**
2. Sélectionnez **"Nom de l'article"**
3. Cliquez **"Enregistrer les modifications"**

---

## 📞 Support

- **Documentation**: Voir `GUIDE-INSTALLATION-WORDPRESS.md`
- **Email**: support@scedf-ci.org
- **Issues**: GitHub du projet

---

## 🔄 Mises à jour

Pour mettre à jour le site:

1. Téléchargez les nouveaux fichiers ZIP
2. Désactivez temporairement le thème
3. Supprimez l'ancien thème
4. Installez le nouveau thème ZIP
5. Réactivez

*Note: Le plugin peut être mis à jour de la même façon. Vos données de contenu sont conservées.*
