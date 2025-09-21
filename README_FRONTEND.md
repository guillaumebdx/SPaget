# SPaget - Squelette Frontend

## Description

Squelette front-end pour l'application SPaget basé sur la maquette fournie. Interface de gestion des User Stories avec dashboard, tableau interactif et panneau de détails.

## Structure des fichiers

### Templates Twig
- `templates/base.html.twig` - Layout principal avec header, sidebar et zone de contenu
- `templates/partials/header.html.twig` - Header avec logo SPaget et navigation utilisateur
- `templates/partials/sidebar.html.twig` - Sidebar avec navigation principale et projets
- `templates/partials/right-panel.html.twig` - Panneau de droite pour les détails des stories
- `templates/dashboard/list.html.twig` - Page principale avec bandeau de capacité et tableau des US

### Assets statiques
- `public/css/app.css` - Styles CSS personnalisés avec palette de couleurs
- `public/js/app.js` - JavaScript minimal pour les interactions
- `public/logoSPAget.png` - Logo existant (utilisé dans le header)

### Données d'exemple
- `assets/_sample_data.json` - 8 User Stories d'exemple pour les tests
- `src/Controller/DashboardController.php` - Contrôleur Symfony pour servir les données

## Palette de couleurs

### Couleurs principales
- **Violet foncé** : `#2c3e50` / `#3d4465` (header, sidebar)
- **Jaune/Or** : `#f39c12` / `#f1c40f` (accents, icônes noodles)
- **Blanc/Gris clair** : `#ffffff` / `#f8f9fa` (arrière-plans, textes)

### Couleurs de statut
- **Ouvert** : `#28a745` (vert)
- **En cours** : `#17a2b8` (bleu)
- **Terminé** : `#6c757d` (gris)
- **Bloqué** : `#dc3545` (rouge)

## Fonctionnalités

### Bandeau de capacité
- **Total SP** : Affichage du total des Story Points
- **Capacity** : Capacité de l'équipe (mis en évidence)
- **Delta** : Différence (affiché en rouge si négatif)
- **Jauge** : Barre de progression visuelle
- **Bouton Synchroniser** : Action de synchronisation

### Tableau des User Stories
- **Colonnes** : #, Titre, Est., Dev, Team, Conf., Deps, Statut, Actions
- **Estimation** : SP affiché en gras avec unité
- **Équipes** : Badges colorés par équipe
- **Confiance** : Barre de progression horizontale
- **Dépendances** : Compteur ou tiret si aucune
- **Actions** : Boutons d'édition et options

### Panneau de détails (Right Panel)
- **En-tête** : Titre de la story avec bouton de fermeture
- **Métadonnées** : Type, sprint, assigné, statut
- **Description** : Texte descriptif de la story
- **Checklist** : Liste de tâches avec cases à cocher
- **Dépendances** : Liste des stories liées
- **Activité** : Historique des modifications

## Responsivité

### Desktop (≥ 768px)
- Sidebar collapsible avec bouton de réduction
- Tableau complet avec toutes les colonnes
- Right panel fixe à droite

### Mobile/Tablet (< 768px)
- Sidebar en overlay avec bouton hamburger
- Tableau remplacé par des cartes empilées
- Right panel en bas d'écran (60% de hauteur)

## Interactions JavaScript

### Sidebar
- **Toggle mobile** : Bouton hamburger pour ouvrir/fermer
- **Collapse desktop** : Bouton pour réduire/étendre
- **Fermeture automatique** : Clic à l'extérieur sur mobile

### Stories
- **Clic sur ligne** : Ouvre le panneau de détails
- **Sélection visuelle** : Ligne mise en évidence
- **Données dynamiques** : Chargement du contenu du panneau

### Right Panel
- **Ouverture** : Animation slide depuis la droite
- **Fermeture** : Bouton X ou touche Escape
- **Contenu dynamique** : Mise à jour selon la story sélectionnée

## Accessibilité

### Bonnes pratiques implémentées
- **Titres sémantiques** : h1, h2 pour la structure
- **Alt sur images** : Texte alternatif pour le logo
- **Aria-labels** : Labels sur les boutons d'action
- **Focus visible** : Contours sur les éléments focusables
- **Contraste** : Couleurs respectant les standards WCAG

### Navigation clavier
- **Tab** : Navigation entre les éléments
- **Escape** : Fermeture du panneau de détails
- **Enter/Space** : Activation des boutons

## Installation et test

### Prérequis
- Symfony 6.x
- PHP 8.1+
- Composer

### Démarrage
1. Démarrer les conteneurs Docker :
   ```bash
   docker-compose up -d
   ```

2. Accéder à l'application :
   ```
   http://localhost:8082
   ```

### Routes disponibles
- `/` - Dashboard principal
- `/api/story/{id}` - API pour récupérer les détails d'une story

## Personnalisation

### Modifier les couleurs
Éditer les variables CSS dans `public/css/app.css` :
```css
:root {
    --primary-dark: #2c3e50;
    --accent-gold: #f39c12;
    /* ... autres variables */
}
```

### Ajouter des données
Modifier le fichier `assets/_sample_data.json` ou créer un service Symfony pour charger depuis la base de données.

### Étendre les interactions
Ajouter des méthodes à la classe `SPagetApp` dans `public/js/app.js`.

## Notes techniques

### Bootstrap 5
- Utilisation du CDN pour Bootstrap CSS et JS
- Icons Bootstrap pour les icônes
- Classes utilitaires pour le responsive

### Twig
- Héritage de templates avec `extends`
- Includes pour les composants réutilisables
- Variables avec fallbacks : `{{ variable ?? 'default' }}`

### CSS moderne
- Variables CSS (custom properties)
- Flexbox et Grid pour les layouts
- Transitions et animations CSS
- Media queries pour le responsive

## Prochaines étapes

1. **Intégration backend** : Connecter à une vraie API
2. **Authentification** : Ajouter la gestion des utilisateurs
3. **Temps réel** : WebSockets pour les mises à jour live
4. **Tests** : Tests unitaires et d'intégration
5. **Performance** : Optimisation et lazy loading
