<?php
/**
 * Template 404 - Redirection vers React SPA
 * 
 * Ce fichier gère les routes qui ne correspondent pas à des fichiers WordPress
 * et les redirige vers l'application React qui gère son propre routage
 */

// Charger le template principal (React SPA)
// React Router gérera l'affichage de la page 404 appropriée
get_template_part('index');
