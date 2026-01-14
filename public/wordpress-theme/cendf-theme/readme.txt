=== SCEDF Theme ===
Contributors: scedf
Tags: one-column, custom-colors, custom-logo, featured-images, full-width-template, theme-options
Requires at least: 5.8
Tested up to: 6.4
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Thème WordPress optimisé pour l'application React SCEDF / Radio Espoir.

== Description ==

SCEDF Theme est un thème WordPress spécialement conçu pour servir l'application React de la Sous-Commission Épiscopale pour la Doctrine de la Foi.

**Caractéristiques:**

* Sert automatiquement l'application React
* SEO optimisé (meta tags, Open Graph, Twitter Cards)
* PWA ready (Service Worker, manifest)
* Routing SPA automatique
* Cache optimisé pour les performances
* Sécurité renforcée

**Prérequis:**

* Plugin SCEDF Core activé
* Build React présent dans le dossier dist/

== Installation ==

**Méthode 1: Via l'admin WordPress**

1. Téléchargez le fichier ZIP du thème
2. Allez dans Apparence > Thèmes > Ajouter > Téléverser un thème
3. Sélectionnez le fichier ZIP et cliquez sur "Installer maintenant"
4. Activez le thème

**Méthode 2: Via FTP**

1. Décompressez le fichier ZIP
2. Uploadez le dossier `cendf-theme` dans `/wp-content/themes/`
3. Activez le thème dans Apparence > Thèmes

**Important:** N'oubliez pas de copier le dossier `dist/` (build React) dans le thème après installation.

== Frequently Asked Questions ==

= Pourquoi ai-je une page d'erreur "Build React non trouvé" ? =

Le thème nécessite le build React pour fonctionner. Vous devez:
1. Builder le projet React (`npm run build`)
2. Copier le dossier `dist/` dans le dossier du thème

= Comment mettre à jour le build React ? =

1. Exécutez `npm run build` dans le projet
2. Remplacez le dossier `dist/` dans le thème par le nouveau

= Le thème fonctionne-t-il sans le plugin SCEDF Core ? =

Le thème peut fonctionner, mais les types de contenu personnalisés et l'API ne seront pas disponibles.

== Changelog ==

= 1.0.0 =
* Version initiale
* Support complet de l'application React
* SEO automatique
* PWA support

== Resources ==

* Plugin requis: SCEDF Core
* Documentation: GUIDE-INSTALLATION-WORDPRESS.md
