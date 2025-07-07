// src/models/recipe.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

const Recipe = sequelize.define('Recipe', {
  id_recipe: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_meal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  url_video: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  tableName: 'Recipe',
  timestamps: false,
});

module.exports = Recipe;