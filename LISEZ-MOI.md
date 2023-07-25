## Concept

Ce dépôt est le troisième et dernier projet en équipe réalisé pendant une formation à la [Wild Code School](https://github.com/WildCodeSchool). Ce projet en équipe a été réalisé par [AnthonyLASTERNAS](https://github.com/AnthonyLASTERNAS), [AnneL51100](https://github.com/AnneL51100), [MarineDeveza](https://github.com/MarineDeveza), [nguyen-tt](https://github.com/nguyen-tt) et [webdevbynight](https://github.com/webdevbynight).

Ce projet est basé sur React, Express et MySQL.

## Installation & Utilisation

### Utilisateurs de Windows

Assurez-vous d’exécuter ces commandes dans un terminal git pour éviter des [problèmes avec les formats de fin de ligne](https://en.wikipedia.org/wiki/Newline#Issues_with_different_newline_formats):

```
git config --global core.eol lf
git config --global core.autocrlf false
```

### Pour commencer un projet

- Sur VSCode, installer les plugins **Prettier - Code formatter** et **ESLint** et les configurer
- Cloner ce dépôt, se rendre à l’intérieur
- Si vous utilisez `yarn` ou `pnpm`, adapter `config/cli` dans le fichier `package.json`
- Lancer la commande `npm install`
- _NB: Pour exécuter le backend, un fichier d’environnement avec les données de connexion d’une BdD valide est nécesaire. Un modèle se trouve dans `backend/.env.sample`_

### Liste des commandes et signification

- `migrate` : Exécute le script de création de la base de données
- `dev` : Démarrage des deux serveurs (frontend + backend) dans un même terminal
- `dev-front` : Démarrage d’un serveur React pour le frontend
- `dev-back` : Démarrage d’un serveur Express pour le backend
- `lint` : Exécute des outils de validation de code (sera exécutée automatiquement à chaque _commit_)
- `fix` : Fixe les erreurs de formatage (à lancer si `lint` ne passe pas)

## Pour plus d’informations

### Listing des outils utilisés

- _Concurrently_ : Permet d’exécuter plusieurs commandes dans un même terminal
- _Husky_ : Permet d’exécuter des actions en déclenchement de commandes _git_
- _Vite_ : Alternative à _Create-React-App_, embarquant moins de packages pour une expérience plus fluide
- _ESLint_ : Outil de « qualité de code », permet de s’assurer que des règles pré-configurées sont bien respectées
- _Prettier_ : Outil de « qualité de code » également, se concentre plus particulièrement sur le style du code
- _Standard Airbnb_ : L’un des « standards » les plus connus, même s’il n’est pas officiellement lié à ES/JS
- _Nodemon_ : Outil permettant de relancer un serveur à chaque fois qu’un des fichiers est modifié
