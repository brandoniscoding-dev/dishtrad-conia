// src/app.js
const express = require('express');
const cors = require('cors'); // <= AJOUTÉ
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const errorMiddleware = require('./middlewares/error.middleware');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const mealRoutes = require('./routes/meal.routes');
const recipeRoutes = require('./routes/recipe.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const searchRoutes = require('./routes/search.routes');
const { sequelize } = require('./utils/db');

const app = express();

// ACTIVER CORS POUR LE FRONTEND
app.use(cors({
  origin: 'http://localhost:8080', // accepte uniquement depuis ce frontend
  credentials: true // utile si tu fais des requêtes avec cookies ou headers d'auth
}));

// Configurer body-parser pour JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurer dossier statique pour les images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/meals', mealRoutes);
app.use('/recipes', recipeRoutes);
app.use('/restaurants', restaurantRoutes);
app.use('/search', searchRoutes);

// Middleware d'erreurs
app.use(errorMiddleware);

// Démarrage serveur
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(3000, () => console.log('Server running on port 3000'));
}).catch(err => console.error('Database sync error:', err));

module.exports = app;
