-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : lun. 07 juil. 2025 à 12:53
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `cameroonian_meals`
--

-- --------------------------------------------------------

--
-- Structure de la table `Chat`
--

CREATE TABLE `Chat` (
  `id_chat` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `type_entree` varchar(50) NOT NULL,
  `contenu_entree` text NOT NULL,
  `type_sortie` varchar(50) NOT NULL,
  `contenu_sortie` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Etape`
--

CREATE TABLE `Etape` (
  `id_etape` int(11) NOT NULL,
  `id_recipe` int(11) NOT NULL,
  `ordre` int(11) NOT NULL,
  `texte` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Etape`
--

INSERT INTO `Etape` (`id_etape`, `id_recipe`, `ordre`, `texte`) VALUES
(1, 1, 1, 'Laver les feuilles de ndolé.'),
(2, 1, 2, 'Faire bouillir les feuilles avec du sel.'),
(3, 2, 1, 'Tremper les haricots pendant 6 heures.'),
(4, 2, 2, 'Moudre les haricots en pâte lisse.'),
(5, 3, 1, 'Écraser le maïs.'),
(6, 3, 2, 'Cuire avec les feuilles.'),
(7, 4, 1, 'Laver les feuilles d’eru.'),
(8, 4, 2, 'Mélanger avec de l’huile de palme.');

-- --------------------------------------------------------

--
-- Structure de la table `Ingredient`
--

CREATE TABLE `Ingredient` (
  `id_ingredient` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Ingredient`
--

INSERT INTO `Ingredient` (`id_ingredient`, `name`) VALUES
(1, 'Feuilles de ndolé'),
(2, 'Huile de palme'),
(3, 'Maïs'),
(4, 'Feuilles d’eru');

-- --------------------------------------------------------

--
-- Structure de la table `Meal`
--

CREATE TABLE `Meal` (
  `id_meal` int(11) NOT NULL,
  `official_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `origin_region` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Meal`
--

INSERT INTO `Meal` (`id_meal`, `official_name`, `description`, `origin_region`) VALUES
(1, 'Ndolé', 'Plat traditionnel camerounais avec des feuilles de ndolé et des arachides.', 'Littoral'),
(2, 'Koki', 'Plat camerounais à base de haricots et d’huile de palme.', 'Sud-Ouest'),
(3, 'Sanga', 'Plat à base de maïs et de feuilles.', 'Centre'),
(4, 'Eru', 'Plat à base de feuilles d’eru et d’huile de palme.', 'Sud-Ouest'),
(5, 'Jollof ', 'Riz cuit dans une sauce tomate épicée, souvent servi avec poulet ou poisson grillé.\n\n', NULL),
(6, 'Palmnut Soup', 'Soupe rouge à base de pulpe de noix de palme, avec viande, poisson ou escargots, servie avec fufu ou riz.\n\n', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `MealAlias`
--

CREATE TABLE `MealAlias` (
  `id_alias` int(11) NOT NULL,
  `id_meal` int(11) NOT NULL,
  `alias_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `MealAlias`
--

INSERT INTO `MealAlias` (`id_alias`, `id_meal`, `alias_name`) VALUES
(2, 2, 'Koki aux poissons'),
(3, 3, 'Sanga traditionnel'),
(4, 4, 'Eru aux épinards'),
(5, 1, 'Ndolé aux crevettes');

-- --------------------------------------------------------

--
-- Structure de la table `MealImage`
--

CREATE TABLE `MealImage` (
  `id_image` int(11) NOT NULL,
  `id_meal` int(11) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `MealImage`
--

INSERT INTO `MealImage` (`id_image`, `id_meal`, `url`) VALUES
(1, 1, '/images/meals/ndole.jpeg'),
(2, 2, '/images/meals/koki.jpeg'),
(3, 3, '/images/meals/sanga.jpeg'),
(4, 4, '/images/meals/eru.jpeg'),
(5, 5, '/images/meals/jollof.jpg'),
(6, 6, '/images/meals/palmnut.png');

-- --------------------------------------------------------

--
-- Structure de la table `MealRestaurant`
--

CREATE TABLE `MealRestaurant` (
  `id_meal` int(11) NOT NULL,
  `id_restaurant` int(11) NOT NULL,
  `prix` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `MealRestaurant`
--

INSERT INTO `MealRestaurant` (`id_meal`, `id_restaurant`, `prix`) VALUES
(1, 1, 5000),
(2, 2, 4500),
(3, 1, 4000),
(4, 3, 5500);

-- --------------------------------------------------------

--
-- Structure de la table `Recipe`
--

CREATE TABLE `Recipe` (
  `id_recipe` int(11) NOT NULL,
  `id_meal` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `url_video` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Recipe`
--

INSERT INTO `Recipe` (`id_recipe`, `id_meal`, `title`, `url_video`) VALUES
(1, 1, 'Recette de Ndolé', 'https://example.com/ndole-video'),
(2, 2, 'Recette de Koki', 'https://example.com/koki-video'),
(3, 3, 'Recette de Sanga', 'https://example.com/sanga-video'),
(4, 4, 'Recette d’Eru', 'https://example.com/eru-video');

-- --------------------------------------------------------

--
-- Structure de la table `RecipeIngredient`
--

CREATE TABLE `RecipeIngredient` (
  `id_recipe` int(11) NOT NULL,
  `id_ingredient` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `RecipeIngredient`
--

INSERT INTO `RecipeIngredient` (`id_recipe`, `id_ingredient`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

-- --------------------------------------------------------

--
-- Structure de la table `Restaurant`
--

CREATE TABLE `Restaurant` (
  `id_restaurant` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `region` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `contact` varchar(100) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Restaurant`
--

INSERT INTO `Restaurant` (`id_restaurant`, `name`, `region`, `city`, `contact`, `latitude`, `longitude`) VALUES
(1, 'Chez Maman Njang', 'Littoral', 'Douala', '+237 123 456 789', 4.0511, 9.7679),
(2, 'La Bonne Cuisine', 'Centre', 'Yaoundé', '+237 987 654 321', 3.848, 11.5021),
(3, 'Saveurs d’Afrique', 'Sud-Ouest', 'Buea', '+237 111 222 333', 4.155, 9.242);

-- --------------------------------------------------------

--
-- Structure de la table `User`
--

CREATE TABLE `User` (
  `id_user` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `birthdate` datetime DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `role` enum('admin','standard') NOT NULL DEFAULT 'standard'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `User`
--

INSERT INTO `User` (`id_user`, `username`, `email`, `password`, `birthdate`, `country`, `role`) VALUES
(1, 'admin1', 'admin1@example.com', '$2b$10$k1MqIrgy62n/LJfmT9BOV.SAHWCXnUjqB7wCQn7q7dTt64XkWkPOy', '1980-01-01 00:00:00', 'Cameroon', 'admin'),
(2, 'user1', 'user1@example.com', '$2b$10$GacKVuzVYAy0d9oxKOqRie/A9N9/0OKO.g/.ZJdDlhd0PfJrp.eN.', '1990-01-01 00:00:00', 'Cameroon', 'standard'),
(4, 'user3', 'user3@example.com', '$2b$10$ZQ.4Jmy5Xxha.Wj0N7mDj.GIg1lBOBrmDqsh1CWhnQoZfa5.E1AGy', '2000-01-01 00:00:00', 'Cameroon', 'standard'),
(5, 'brandonsicoding', 'brandonsicoding4@gmail.com', '$2b$10$B7s7gcNlLD125tntHPQnd.dSqNKttp90CX6ConP98a3DorqwH.duu', '2005-07-06 00:00:00', 'Cameroon', 'admin'),
(6, 'brandonsicoding3', 'brandonsicoding2@gmail.com', '$2b$10$xPINff966n8CvBD0TtBChOPKy/cHggh/PmjVOXG3fGQFJ3GtaQlpO', '2025-07-20 00:00:00', 'Switzerland', 'standard'),
(7, 'standard', 'standard@gmail.com', '$2b$10$ZywgdWkfzdsj8lsmAQeeH.9zlxpOYRYoZnYiDfLQHAzLaTnK5W3ZO', '2025-08-10 00:00:00', 'Cameroon', 'standard');

-- --------------------------------------------------------

--
-- Structure de la table `UserMeal`
--

CREATE TABLE `UserMeal` (
  `id_user` int(11) NOT NULL,
  `id_meal` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `UserMeal`
--

INSERT INTO `UserMeal` (`id_user`, `id_meal`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 2),
(4, 4);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Chat`
--
ALTER TABLE `Chat`
  ADD PRIMARY KEY (`id_chat`),
  ADD KEY `id_user` (`id_user`);

--
-- Index pour la table `Etape`
--
ALTER TABLE `Etape`
  ADD PRIMARY KEY (`id_etape`),
  ADD KEY `id_recipe` (`id_recipe`);

--
-- Index pour la table `Ingredient`
--
ALTER TABLE `Ingredient`
  ADD PRIMARY KEY (`id_ingredient`);

--
-- Index pour la table `Meal`
--
ALTER TABLE `Meal`
  ADD PRIMARY KEY (`id_meal`);

--
-- Index pour la table `MealAlias`
--
ALTER TABLE `MealAlias`
  ADD PRIMARY KEY (`id_alias`),
  ADD KEY `id_meal` (`id_meal`);

--
-- Index pour la table `MealImage`
--
ALTER TABLE `MealImage`
  ADD PRIMARY KEY (`id_image`),
  ADD KEY `id_meal` (`id_meal`);

--
-- Index pour la table `MealRestaurant`
--
ALTER TABLE `MealRestaurant`
  ADD PRIMARY KEY (`id_meal`,`id_restaurant`),
  ADD UNIQUE KEY `MealRestaurant_id_restaurant_id_meal_unique` (`id_meal`,`id_restaurant`),
  ADD KEY `id_restaurant` (`id_restaurant`);

--
-- Index pour la table `Recipe`
--
ALTER TABLE `Recipe`
  ADD PRIMARY KEY (`id_recipe`),
  ADD KEY `id_meal` (`id_meal`);

--
-- Index pour la table `RecipeIngredient`
--
ALTER TABLE `RecipeIngredient`
  ADD PRIMARY KEY (`id_recipe`,`id_ingredient`),
  ADD UNIQUE KEY `RecipeIngredient_id_ingredient_id_recipe_unique` (`id_recipe`,`id_ingredient`),
  ADD KEY `id_ingredient` (`id_ingredient`);

--
-- Index pour la table `Restaurant`
--
ALTER TABLE `Restaurant`
  ADD PRIMARY KEY (`id_restaurant`);

--
-- Index pour la table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `UserMeal`
--
ALTER TABLE `UserMeal`
  ADD PRIMARY KEY (`id_user`,`id_meal`),
  ADD UNIQUE KEY `UserMeal_id_meal_id_user_unique` (`id_user`,`id_meal`),
  ADD KEY `id_meal` (`id_meal`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Chat`
--
ALTER TABLE `Chat`
  MODIFY `id_chat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `Etape`
--
ALTER TABLE `Etape`
  MODIFY `id_etape` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `Ingredient`
--
ALTER TABLE `Ingredient`
  MODIFY `id_ingredient` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `Meal`
--
ALTER TABLE `Meal`
  MODIFY `id_meal` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `MealAlias`
--
ALTER TABLE `MealAlias`
  MODIFY `id_alias` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `MealImage`
--
ALTER TABLE `MealImage`
  MODIFY `id_image` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `Recipe`
--
ALTER TABLE `Recipe`
  MODIFY `id_recipe` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `Restaurant`
--
ALTER TABLE `Restaurant`
  MODIFY `id_restaurant` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `User`
--
ALTER TABLE `User`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Chat`
--
ALTER TABLE `Chat`
  ADD CONSTRAINT `Chat_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `User` (`id_user`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `Etape`
--
ALTER TABLE `Etape`
  ADD CONSTRAINT `Etape_ibfk_1` FOREIGN KEY (`id_recipe`) REFERENCES `Recipe` (`id_recipe`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `MealAlias`
--
ALTER TABLE `MealAlias`
  ADD CONSTRAINT `MealAlias_ibfk_1` FOREIGN KEY (`id_meal`) REFERENCES `Meal` (`id_meal`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `MealImage`
--
ALTER TABLE `MealImage`
  ADD CONSTRAINT `MealImage_ibfk_1` FOREIGN KEY (`id_meal`) REFERENCES `Meal` (`id_meal`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `MealRestaurant`
--
ALTER TABLE `MealRestaurant`
  ADD CONSTRAINT `MealRestaurant_ibfk_1` FOREIGN KEY (`id_meal`) REFERENCES `Meal` (`id_meal`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `MealRestaurant_ibfk_2` FOREIGN KEY (`id_restaurant`) REFERENCES `Restaurant` (`id_restaurant`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Recipe`
--
ALTER TABLE `Recipe`
  ADD CONSTRAINT `Recipe_ibfk_1` FOREIGN KEY (`id_meal`) REFERENCES `Meal` (`id_meal`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `RecipeIngredient`
--
ALTER TABLE `RecipeIngredient`
  ADD CONSTRAINT `RecipeIngredient_ibfk_1` FOREIGN KEY (`id_recipe`) REFERENCES `Recipe` (`id_recipe`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `RecipeIngredient_ibfk_2` FOREIGN KEY (`id_ingredient`) REFERENCES `Ingredient` (`id_ingredient`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `UserMeal`
--
ALTER TABLE `UserMeal`
  ADD CONSTRAINT `UserMeal_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `User` (`id_user`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserMeal_ibfk_2` FOREIGN KEY (`id_meal`) REFERENCES `Meal` (`id_meal`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
