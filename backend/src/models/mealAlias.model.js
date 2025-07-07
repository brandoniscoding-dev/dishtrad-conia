// src/models/mealAlias.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

const MealAlias = sequelize.define('MealAlias', {
  id_alias: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_meal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  alias_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'MealAlias',
  timestamps: false,
});

module.exports = MealAlias;