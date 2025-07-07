// src/models/mealRestaurant.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

const MealRestaurant = sequelize.define('MealRestaurant', {
  id_meal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_restaurant: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'MealRestaurant',
  timestamps: false,
});

module.exports = MealRestaurant;