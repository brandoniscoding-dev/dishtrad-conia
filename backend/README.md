# DishTrad – Backend

**DishTrad** est une plateforme qui valorise les plats traditionnels africains, avec un focus initial sur la cuisine camerounaise.
Ce backend constitue l'API centrale de l'application : gestion des utilisateurs, des recettes, des restaurants, et intégration d’un chatbot IA culinaire.

---

## Objectif

Le backend a pour mission de :

* Centraliser les données des mets (plats, recettes, ingrédients, images, restaurants).
* Fournir une API REST fiable et sécurisée.
* Alimenter un système intelligent de recherche et recommandation.

* Gérer l’authentification et les rôles des utilisateurs.

---

## Structure du projet

```bash
dishtrad/backend
├── combined.log
├── error.log
├── logs/
├── package.json
├── package-lock.json
└── src/
    ├── app.js
    ├── config/
    ├── controllers/
    ├── middlewares/
    ├── models/
    ├── routes/
    ├── services/
    └── utils/
```

---

## Prérequis

* Node.js v18+
* NPM v9+
* MySQL (via **XAMPP recommandé**)
* Éditeur de code (VS Code recommandé)

---

## Fichier `.env`

Créer un fichier `.env` dans `src/` :

```env
DB_NAME=cameroonian_meals
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
PORT=3000
JWT_SECRET=jwtsecret
```

Adapter `DB_PASSWORD` selon votre configuration MySQL.

---

## Base de données

Un fichier `cameroonian_meals.sql` est fourni à la racine du projet.
Il doit être importé manuellement via **phpMyAdmin (XAMPP)**.

> Le backend s’appuie sur cette base et synchronise automatiquement les modèles Sequelize.

---

## Installation et lancement

```bash
cd dishtrad/backend
npm install
npm run dev
```

Le serveur démarre sur : `http://localhost:3000`

---

## Authentification

* Connexion via email + mot de passe (hashé).
* Protection des routes via middleware (`authorize.middleware.js`).
* JWT signé avec `JWT_SECRET`.

---

## Principales routes API

* `POST /api/auth/login` – Connexion
* `POST /api/auth/register` – Inscription
* `GET /api/meals` – Liste des plats
* `GET /api/recipes/:id` – Détail d'une recette
* `GET /api/restaurants` – Liste des restaurants
* Et d'autres endpoints pour recherche, utilisateur, etc.

---

## Intégration Chatbot IA

Le backend est configuré pour interagir avec une API IA via :

* `/api/chatbot` – Requête textuelle
* `/api/classify-image` – Requête image

Ces endpoints communiquent avec un script Python (`chatbot_api.py`) exploitant **LangChain** et **Gemini** pour fournir des réponses contextualisées.

---

## Logs

Les journaux sont stockés dans `logs/` :

* `combined.log` – Toutes les requêtes
* `error.log` – Erreurs serveur

---

## Dépendances principales

* `express` – Serveur HTTP
* `sequelize` – ORM MySQL
* `jsonwebtoken` – Authentification
* `bcrypt` – Sécurisation des mots de passe
* `cors`, `morgan`, `dotenv`, `winston`

---

## Équipe

Projet développé par **CUSTOM AI TEAM**
Dans le cadre du **Hackathon CONIA – Édition 2025**

---

Souhaites-tu une version `README.md` prête à coller ou à convertir en PDF ?
