// src/models/recipeIngredient.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

const RecipeIngredient = sequelize.define('RecipeIngredient', {
  id_recipe: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_ingredient: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  tableName: 'RecipeIngredient',
  timestamps: false,
});

module.exports = RecipeIngredient;