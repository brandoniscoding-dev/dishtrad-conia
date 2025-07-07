// src/models/mealImage.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

const MealImage = sequelize.define('MealImage', {
  id_image: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_meal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
}, {
  tableName: 'MealImage',
  timestamps: false,
});

module.exports = MealImage;