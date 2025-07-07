# DishTrad – Frontend

Ce frontend constitue l’interface utilisateur de la plateforme **DishTrad**, dédiée à la valorisation des plats traditionnels africains. Développée avec **React**, **TypeScript** et **Vite**, cette application permet aux utilisateurs de découvrir des mets, consulter des recettes, localiser des restaurants, interagir avec un chatbot culinaire intelligent, et bien plus.

---

## Objectif

* Présenter une interface moderne, réactive et élégante pour DishTrad.
* Consommer l'API backend (auth, recettes, restaurants, utilisateurs).
* Offrir une expérience utilisateur riche : navigation, recherche, favoris, chatbot.
* Assurer une compatibilité mobile et desktop avec des composants UI optimisés.

---

## Structure du projet

```bash
dishtrad/frontend
├── public/                     # Images, favicon, robots.txt
├── src/
│   ├── components/             # Composants réutilisables (UI + spécifiques)
│   ├── context/                # AuthContext global
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilitaires globaux
│   ├── pages/                  # Pages principales de l'app
│   ├── services/               # Appels API
│   └── main.tsx                # Point d'entrée React
├── tailwind.config.ts         # Configuration TailwindCSS
├── vite.config.ts             # Configuration Vite
├── tsconfig*.json             # TypeScript configs
```

---

## Prérequis

* Node.js v18+
* NPM v9+
* Navigateur moderne
* Backend lancé sur `http://localhost:3000`

---

## Installation

```bash
cd dishtrad/frontend
npm install --force
```

---

## Lancement du serveur de développement

```bash
npm run dev
```

Le frontend sera accessible à l'adresse affichée dans la console (souvent `http://localhost:8080`).

---

## Fonctionnalités intégrées

* Authentification : connexion, inscription, session utilisateur.
* Chatbot intelligent connecté au backend (texte + image).
* Navigation fluide entre plats, recettes, restaurants.
* UI professionnelle avec composants Tailwind + ShadCN.
* Responsive design pour usage mobile et desktop.
* Modal Login/Register, gestion des favoris, toasts de notifications.

---

## Dépendances principales

* `react`, `react-dom`, `typescript`, `vite`
* `react-router-dom` – Routing SPA
* `axios` – Appels HTTP vers le backend
* `tailwindcss`, `shadcn/ui` – UI et styles
* `lucide-react` – Icônes SVG
* `classnames` – Gestion conditionnelle de classes CSS
* `sonner`, `toast`, `dialog`, `popover`, etc. – Composants interactifs

---

## Équipe

Développé par **CUSTOM AI TEAM**, dans le cadre du **Hackathon CONIA – Édition 2025**.
Ce frontend accompagne l’API backend de DishTrad et constitue l’interface utilisateur officielle du projet.

