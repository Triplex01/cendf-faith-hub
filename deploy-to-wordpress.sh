#!/bin/bash

# =============================================================================
# CENDF - Script de déploiement WordPress
# Déploie automatiquement le plugin, thème et build React vers WordPress
# =============================================================================

set -e

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration par défaut
WP_PATH="${WP_PATH:-/var/www/html}"
PLUGIN_NAME="cendf-core"
THEME_NAME="cendf-theme"

echo -e "${BLUE}"
echo "=============================================="
echo "   CENDF - Déploiement WordPress"
echo "   Commission Épiscopale pour la Doctrine"
echo "   de la Foi - Radio Espoir"
echo "=============================================="
echo -e "${NC}"

# Vérifier si le chemin WordPress est fourni
if [ "$1" != "" ]; then
    WP_PATH="$1"
fi

echo -e "${YELLOW}Chemin WordPress: ${WP_PATH}${NC}"

# Vérifier si le répertoire WordPress existe
if [ ! -d "$WP_PATH/wp-content" ]; then
    echo -e "${RED}Erreur: Le répertoire WordPress n'existe pas à ${WP_PATH}${NC}"
    echo "Usage: ./deploy-to-wordpress.sh /chemin/vers/wordpress"
    exit 1
fi

# Étape 1: Build React
echo -e "\n${BLUE}[1/5] Build de l'application React...${NC}"
if command -v npm &> /dev/null; then
    npm run build
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Build React réussi${NC}"
    else
        echo -e "${RED}✗ Erreur lors du build React${NC}"
        exit 1
    fi
else
    echo -e "${RED}✗ npm n'est pas installé${NC}"
    exit 1
fi

# Étape 2: Copier le plugin
echo -e "\n${BLUE}[2/5] Copie du plugin ${PLUGIN_NAME}...${NC}"
PLUGIN_SRC="public/wordpress-plugin/${PLUGIN_NAME}"
PLUGIN_DEST="${WP_PATH}/wp-content/plugins/${PLUGIN_NAME}"

if [ -d "$PLUGIN_SRC" ]; then
    rm -rf "$PLUGIN_DEST"
    cp -r "$PLUGIN_SRC" "$PLUGIN_DEST"
    echo -e "${GREEN}✓ Plugin copié vers ${PLUGIN_DEST}${NC}"
else
    echo -e "${RED}✗ Plugin source non trouvé: ${PLUGIN_SRC}${NC}"
    exit 1
fi

# Étape 3: Copier le thème
echo -e "\n${BLUE}[3/5] Copie du thème ${THEME_NAME}...${NC}"
THEME_SRC="public/wordpress-theme/${THEME_NAME}"
THEME_DEST="${WP_PATH}/wp-content/themes/${THEME_NAME}"

if [ -d "$THEME_SRC" ]; then
    rm -rf "$THEME_DEST"
    cp -r "$THEME_SRC" "$THEME_DEST"
    echo -e "${GREEN}✓ Thème copié vers ${THEME_DEST}${NC}"
else
    echo -e "${RED}✗ Thème source non trouvé: ${THEME_SRC}${NC}"
    exit 1
fi

# Étape 4: Copier le build React dans le thème
echo -e "\n${BLUE}[4/5] Copie du build React dans le thème...${NC}"
BUILD_SRC="dist"
BUILD_DEST="${THEME_DEST}/dist"

if [ -d "$BUILD_SRC" ]; then
    rm -rf "$BUILD_DEST"
    cp -r "$BUILD_SRC" "$BUILD_DEST"
    
    # Créer le fichier de version
    VERSION=$(date +"%Y%m%d%H%M%S")
    echo "$VERSION" > "${BUILD_DEST}/version.txt"
    
    echo -e "${GREEN}✓ Build React copié (version: ${VERSION})${NC}"
else
    echo -e "${RED}✗ Build React non trouvé: ${BUILD_SRC}${NC}"
    echo -e "${YELLOW}Avez-vous exécuté 'npm run build' ?${NC}"
    exit 1
fi

# Étape 5: Définir les permissions
echo -e "\n${BLUE}[5/5] Configuration des permissions...${NC}"
if [ -w "$PLUGIN_DEST" ] && [ -w "$THEME_DEST" ]; then
    chmod -R 755 "$PLUGIN_DEST"
    chmod -R 755 "$THEME_DEST"
    echo -e "${GREEN}✓ Permissions configurées${NC}"
else
    echo -e "${YELLOW}⚠ Impossible de modifier les permissions (exécutez avec sudo si nécessaire)${NC}"
fi

# Résumé
echo -e "\n${GREEN}"
echo "=============================================="
echo "   ✓ Déploiement terminé avec succès!"
echo "=============================================="
echo -e "${NC}"

echo -e "${BLUE}Prochaines étapes:${NC}"
echo ""
echo "1. Connectez-vous à WordPress Admin"
echo "   ${WP_PATH}/wp-admin/"
echo ""
echo "2. Activez le plugin:"
echo "   Extensions > CENDF Core > Activer"
echo ""
echo "3. Activez le thème:"
echo "   Apparence > Thèmes > CENDF Theme > Activer"
echo ""
echo "4. Configurez les permaliens:"
echo "   Réglages > Permaliens > Nom de l'article"
echo ""
echo "5. Configurez CENDF:"
echo "   CENDF > Paramètres"
echo ""
echo -e "${YELLOW}Documentation: GUIDE-TEMPLATE-WORDPRESS.md${NC}"
echo ""
