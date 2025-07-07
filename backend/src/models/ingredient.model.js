// src/models/ingredient.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

const Ingredient = sequelize.define('Ingredient', {
  id_ingredient: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'Ingredient',
  timestamps: false,
});

module.exports = Ingredient;