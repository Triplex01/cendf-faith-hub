#!/bin/bash

# =============================================================================
# SCEDF - Script de création des packages WordPress
# Génère les fichiers ZIP prêts à installer via l'admin WordPress
# =============================================================================

set -e

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Configuration
VERSION="1.0.0"
OUTPUT_DIR="wordpress-packages"
PLUGIN_NAME="cendf-core"
THEME_NAME="cendf-theme"

echo -e "${CYAN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║     SCEDF - Générateur de packages WordPress               ║"
echo "║     Sous-Commission Épiscopale pour la Doctrine de la Foi  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Créer le dossier de sortie
mkdir -p "$OUTPUT_DIR"

# Vérifier si le build React existe
BUILD_EXISTS=false
if [ -d "dist" ]; then
    BUILD_EXISTS=true
    echo -e "${GREEN}✓ Build React trouvé${NC}"
else
    echo -e "${YELLOW}⚠ Build React non trouvé. Exécution de npm run build...${NC}"
    if command -v npm &> /dev/null; then
        npm run build
        if [ -d "dist" ]; then
            BUILD_EXISTS=true
            echo -e "${GREEN}✓ Build React créé${NC}"
        fi
    else
        echo -e "${RED}✗ npm non disponible. Le thème sera créé sans le build React.${NC}"
    fi
fi

# ============================================
# CRÉATION DU ZIP PLUGIN
# ============================================
echo -e "\n${BLUE}[1/3] Création du package plugin...${NC}"

# Nettoyer l'ancien
rm -rf "$OUTPUT_DIR/$PLUGIN_NAME"
rm -f "$OUTPUT_DIR/$PLUGIN_NAME.zip"

# Copier le plugin
cp -r "public/wordpress-plugin/$PLUGIN_NAME" "$OUTPUT_DIR/$PLUGIN_NAME"

# Créer le ZIP
cd "$OUTPUT_DIR"
zip -r "$PLUGIN_NAME.zip" "$PLUGIN_NAME" -x "*.DS_Store" -x "*__MACOSX*"
rm -rf "$PLUGIN_NAME"
cd ..

PLUGIN_SIZE=$(du -h "$OUTPUT_DIR/$PLUGIN_NAME.zip" | cut -f1)
echo -e "${GREEN}✓ Plugin créé: $OUTPUT_DIR/$PLUGIN_NAME.zip ($PLUGIN_SIZE)${NC}"

# ============================================
# CRÉATION DU ZIP THÈME (avec build React)
# ============================================
echo -e "\n${BLUE}[2/3] Création du package thème...${NC}"

# Nettoyer l'ancien
rm -rf "$OUTPUT_DIR/$THEME_NAME"
rm -f "$OUTPUT_DIR/$THEME_NAME.zip"

# Copier le thème
cp -r "public/wordpress-theme/$THEME_NAME" "$OUTPUT_DIR/$THEME_NAME"

# Copier le build React si disponible
if [ "$BUILD_EXISTS" = true ]; then
    cp -r "dist" "$OUTPUT_DIR/$THEME_NAME/dist"
    
    # Créer le fichier de version
    echo "$VERSION-$(date +%Y%m%d%H%M%S)" > "$OUTPUT_DIR/$THEME_NAME/dist/version.txt"
    
    echo -e "${GREEN}✓ Build React inclus dans le thème${NC}"
fi

# Créer le ZIP
cd "$OUTPUT_DIR"
zip -r "$THEME_NAME.zip" "$THEME_NAME" -x "*.DS_Store" -x "*__MACOSX*"
rm -rf "$THEME_NAME"
cd ..

THEME_SIZE=$(du -h "$OUTPUT_DIR/$THEME_NAME.zip" | cut -f1)
echo -e "${GREEN}✓ Thème créé: $OUTPUT_DIR/$THEME_NAME.zip ($THEME_SIZE)${NC}"

# ============================================
# CRÉATION DU GUIDE D'INSTALLATION
# ============================================
echo -e "\n${BLUE}[3/3] Création du guide d'installation...${NC}"

cat > "$OUTPUT_DIR/INSTALLATION.txt" << 'EOF'
╔════════════════════════════════════════════════════════════════╗
║           GUIDE D'INSTALLATION RAPIDE - SCEDF                  ║
╚════════════════════════════════════════════════════════════════╝

PRÉREQUIS
---------
• WordPress 5.8 ou supérieur
• PHP 7.4 ou supérieur
• Thème et plugin fournis dans ce dossier

ÉTAPE 1: INSTALLER LE PLUGIN
----------------------------
1. Connectez-vous à votre admin WordPress
2. Allez dans: Extensions > Ajouter
3. Cliquez sur "Téléverser une extension"
4. Sélectionnez le fichier: cendf-core.zip
5. Cliquez sur "Installer maintenant"
6. Cliquez sur "Activer l'extension"

ÉTAPE 2: INSTALLER LE THÈME
---------------------------
1. Allez dans: Apparence > Thèmes
2. Cliquez sur "Ajouter"
3. Cliquez sur "Téléverser un thème"
4. Sélectionnez le fichier: cendf-theme.zip
5. Cliquez sur "Installer maintenant"
6. Cliquez sur "Activer"

ÉTAPE 3: CONFIGURATION AUTOMATIQUE
----------------------------------
1. Un menu "🔧 Installation" apparaît dans la barre latérale
2. Cliquez dessus pour ouvrir l'assistant
3. Suivez les étapes:
   - Installation des plugins requis (ACF)
   - Configuration des permaliens
   - Paramètres du site
4. Cliquez sur "Terminer l'installation"

ÉTAPE 4: VÉRIFICATION
---------------------
1. Visitez votre site
2. L'application SCEDF devrait s'afficher
3. Allez dans SCEDF > Tableau de bord pour gérer le contenu

DÉPANNAGE
---------
• Page blanche: Vérifiez que le thème est bien actif
• Erreur 404: Réglages > Permaliens > Enregistrer
• API inaccessible: Vérifiez les permaliens

SUPPORT
-------
Documentation complète: GUIDE-INSTALLATION-WORDPRESS.md
Email: support@scedf-ci.org

═══════════════════════════════════════════════════════════════════
EOF

echo -e "${GREEN}✓ Guide créé: $OUTPUT_DIR/INSTALLATION.txt${NC}"

# ============================================
# RÉSUMÉ
# ============================================
echo -e "\n${GREEN}"
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              ✓ PACKAGES CRÉÉS AVEC SUCCÈS                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

echo -e "Fichiers générés dans ${CYAN}$OUTPUT_DIR/${NC}:"
echo ""
ls -lh "$OUTPUT_DIR"/*.zip 2>/dev/null || echo "Aucun fichier ZIP trouvé"
echo ""

echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}PROCHAINES ÉTAPES:${NC}"
echo ""
echo "1. Ouvrez votre admin WordPress"
echo ""
echo "2. Installez le plugin:"
echo "   Extensions > Ajouter > Téléverser > ${CYAN}cendf-core.zip${NC}"
echo ""
echo "3. Installez le thème:"
echo "   Apparence > Thèmes > Ajouter > Téléverser > ${CYAN}cendf-theme.zip${NC}"
echo ""
echo "4. Suivez l'assistant d'installation (menu 🔧 Installation)"
echo ""
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
