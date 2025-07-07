// src/models/meal.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

const Meal = sequelize.define('Meal', {
  id_meal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  official_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  origin_region: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'Meal',
  timestamps: false,
});

module.exports = Meal;