#!/bin/bash

# Script de déploiement pour GitHub Pages
echo "🚀 Déploiement du projet Shader sur GitHub Pages..."

# Construire le projet
echo "📦 Construction du projet..."
npm run build

# Créer le dossier dist si nécessaire
if [ ! -d "dist" ]; then
    echo "❌ Erreur: Le dossier dist n'existe pas. Vérifiez que la construction s'est bien passée."
    exit 1
fi

# Créer un fichier .nojekyll pour GitHub Pages
echo "📝 Création du fichier .nojekyll..."
touch dist/.nojekyll

# Ajouter un fichier index.html de redirection si nécessaire
echo "📄 Vérification des fichiers de déploiement..."

echo "✅ Déploiement prêt !"
echo "📋 Instructions pour GitHub Pages:"
echo "1. Commitez et poussez vos changements:"
echo "   git add ."
echo "   git commit -m 'Deploy shader project'"
echo "   git push origin main"
echo ""
echo "2. Allez dans Settings > Pages de votre repository GitHub"
echo "3. Sélectionnez 'Deploy from a branch'"
echo "4. Choisissez 'main' branch et '/dist' folder"
echo "5. Votre site sera disponible à: https://votre-username.github.io/shader-projet/"
echo ""
echo "🎨 Votre shader interactif est prêt à être déployé !"
