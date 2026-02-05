# Expert Site Builder

Site web professionnel construit avec les technologies modernes pour offrir une expérience utilisateur optimale.

## A propos

Expert Site Builder est une application web complète offrant une présence en ligne professionnelle avec un design moderne et une interface utilisateur intuitive. Le site combine performance, accessibilité et réactivité pour garantir une excellente expérience sur tous les appareils.

## Technologies

Le projet est construit avec :

- **Vite** - Outil de build ultra-rapide et serveur de développement
- **React** - Bibliothèque JavaScript pour la construction d'interfaces utilisateur
- **TypeScript** - Superset typé de JavaScript pour une meilleure qualité de code
- **Tailwind CSS** - Framework CSS utilitaire pour des styles rapides et cohérents
- **shadcn-ui** - Composants UI réutilisables et accessibles

## Installation

### Prérequis

- Node.js (v16 ou supérieur)
- npm ou yarn

### Configuration locale

```sh
# Cloner le dépôt
git clone <YOUR_GIT_URL>

# Naviguer vers le dossier du projet
cd expert-site-builder

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible à `http://localhost:5173`

## Développement

### Commandes disponibles

```sh
# Démarrer le serveur de développement
npm run dev

# Construire pour la production
npm run build

# Prévisualiser la version construite
npm run preview

# Exécuter les tests
npm run test
```

## Structure du projet

```
src/
  components/    # Composants React réutilisables
  pages/         # Pages principales de l'application
  styles/        # Fichiers de style global
  App.tsx        # Composant racine
  main.tsx       # Point d'entrée de l'application
public/          # Ressources statiques
package.json     # Dépendances et scripts
tsconfig.json    # Configuration TypeScript
vite.config.ts   # Configuration Vite
```

## Déploiement

Le site peut être déployé sur n'importe quelle plateforme supportant les applications Node.js/React :

1. Construire pour la production : `npm run build`
2. Le dossier `dist/` contient les fichiers prêts pour le déploiement
3. Configurer votre hébergeur pour servir le fichier `dist/index.html` pour toutes les routes

## Contribution

Les contributions sont bienvenues. Pour les changements majeurs, veuillez d'abord ouvrir une issue pour discuter des modifications proposées.

## Licence

Ce projet est propriétaire. Tous droits réservés.
