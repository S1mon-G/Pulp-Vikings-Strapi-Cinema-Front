# 🎬 Pulp Vikings - Strapi Cinema Front

Application web moderne de catalogue de films et d'acteurs, construite avec React, TypeScript et Vite. Cette application permet aux utilisateurs de découvrir, explorer et gérer leur collection de films et d'acteurs favoris.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Démarrage](#-démarrage)
- [Structure du projet](#-structure-du-projet)
- [Routes](#-routes)
- [Authentification](#-authentification)
- [Services](#-services)
- [Scripts disponibles](#-scripts-disponibles)
- [Personas utilisateurs](#-personas-utilisateurs)

## ✨ Fonctionnalités

- 🔐 **Authentification complète** : Inscription, connexion et gestion de session
- 🎬 **Catalogue de films** : Navigation et recherche dans une large collection de films
- 👤 **Base de données d'acteurs** : Exploration des acteurs et de leurs filmographies
- 📄 **Pages de détails** : Informations détaillées sur chaque film et acteur
- 🎨 **Interface moderne** : Design responsive avec CSS Modules
- 🔄 **Chargement infini** : Pagination automatique pour une expérience fluide
- 📱 **Design responsive** : Compatible mobile, tablette et desktop
- ⚡ **Performance optimisée** : Mise en cache et lazy loading
- 🎭 **Modales interactives** : Affichage dynamique des informations supplémentaires
- 🛡️ **Routes protégées** : Accès sécurisé aux pages authentifiées

## 🛠 Technologies

### Core

- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **React Router DOM v7** - Routing

### Styling

- **CSS Modules** - Styles scopés par composant
- **CSS Variables** - Thème personnalisable

### Utilitaires

- **Axios** - Client HTTP
- **Lucide React** - Icônes modernes
- **ESLint** - Linting et qualité du code

## 📦 Prérequis

- **Node.js** >= 18.x
- **npm** ou **yarn**
- Un backend Strapi configuré et accessible

## 🚀 Installation

1. Clonez le repository :

```bash
git clone <url-du-repo>
cd Pulp-Vikings-Strapi-Cinema-Front
```

2. Installez les dépendances :

```bash
npm install
```

## ⚙️ Configuration

Créez un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:1337/api
```

Ajustez l'URL selon votre configuration backend Strapi.

## 🎯 Démarrage

### Mode développement

```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

### Build de production

```bash
npm run build
```

### Prévisualisation du build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 📁 Structure du projet

```
src/
├── assets/              # Variables CSS globales
├── components/          # Composants réutilisables
│   ├── Auth/           # Composants d'authentification
│   ├── ActorCard       # Carte d'acteur
│   ├── MovieCard       # Carte de film
│   ├── Header          # En-tête de navigation
│   ├── Footer          # Pied de page
│   ├── Hero            # Bannière hero
│   ├── Layout          # Layout principal
│   └── ...
├── context/            # Contextes React
│   └── AuthContext     # Gestion de l'authentification
├── hooks/              # Hooks personnalisés
│   ├── useHorizontalScroll  # Scroll horizontal
│   └── useInfiniteScroll    # Pagination infinie
├── pages/              # Pages de l'application
│   ├── Dashboard       # Tableau de bord
│   ├── Movies          # Liste des films
│   ├── MovieDetails    # Détails d'un film
│   ├── Actors          # Liste des acteurs
│   └── ActorDetails    # Détails d'un acteur
├── services/           # Services API
│   ├── api             # Client API générique
│   ├── authService     # Service d'authentification
│   ├── movieService    # Service films
│   └── actorService    # Service acteurs
├── types/              # Définitions TypeScript
│   ├── actor           # Types acteur
│   ├── movie           # Types film
│   └── strapi          # Types Strapi
├── utils/              # Utilitaires
│   └── cache           # Gestion du cache
├── App.tsx             # Composant racine
├── main.tsx            # Point d'entrée
└── router.tsx          # Configuration du routeur
```

## 🗺️ Routes

### Routes publiques

- `/auth` - Page d'authentification (connexion/inscription)

### Routes protégées

- `/` - Page d'accueil
- `/movies` - Catalogue de films
- `/movies/:id` - Détails d'un film
- `/actors` - Liste des acteurs
- `/actors/:id` - Détails d'un acteur
- `/dashboard` - Tableau de bord utilisateur

Toutes les routes protégées nécessitent une authentification. Les utilisateurs non connectés sont redirigés vers `/auth`.

## 🔐 Authentification

L'application utilise un système d'authentification JWT :

1. **Inscription/Connexion** : Via la page `/auth`
2. **Stockage du token** : Dans le localStorage
3. **Auto-connexion** : Vérification du token au chargement
4. **Protection des routes** : Composant `ProtectedRoute`
5. **Déconnexion** : Suppression du token et redirection

## 🔌 Services

### API Service

Client HTTP générique avec :

- Gestion automatique du token JWT
- Méthodes GET, POST, PUT, DELETE
- Gestion des paramètres de requête
- Gestion des erreurs

### Movie Service

- `getMovies()` - Liste des films avec pagination
- `getMovieById(id)` - Détails d'un film
- Paramètres de filtrage et tri

### Actor Service

- `getActors()` - Liste des acteurs avec pagination
- `getActorById(id)` - Détails d'un acteur
- Informations sur la filmographie

### Auth Service

- `register()` - Inscription
- `login()` - Connexion
- `logout()` - Déconnexion
- `getCurrentUser()` - Récupération de l'utilisateur actuel
- Gestion du token JWT

## 📜 Scripts disponibles

| Commande          | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Lance le serveur de développement    |
| `npm run build`   | Compile le projet pour la production |
| `npm run preview` | Prévisualise le build de production  |
| `npm run lint`    | Vérifie le code avec ESLint          |

## 👥 Personas utilisateurs

L'application est conçue pour trois types d'utilisateurs principaux :

### 🎬 Christopher, le Cinéphile (35 ans)

- Recherche avancée par acteurs/réalisateurs
- Création de listes personnalisées
- Suivi des nouveautés

### 🍿 Marc, le Parent (45 ans)

- Filtrage par âge et genre
- Interface simple et rapide
- Contenu familial

### 🎭 Anna, la Consommatrice Avide (22 ans)

- Découverte des tendances
- Interface mobile fluide
- Notifications des sorties

Pour plus de détails, consultez [PERSONAS.md](./ux/PERSONAS.md)

## 🤝 Contribution

Ce projet est développé dans le cadre d'une formation. Pour toute suggestion ou amélioration, n'hésitez pas à ouvrir une issue.

## 📄 Licence

Ce projet est sous licence privée.

---

Développé avec ❤️ par l'équipe Pulp Vikings
