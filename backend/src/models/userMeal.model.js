// src/models/userMeal.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

const UserMeal = sequelize.define('UserMeal', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  id_meal: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
}, {
  tableName: 'UserMeal',
  timestamps: false,
});

module.exports = UserMeal;