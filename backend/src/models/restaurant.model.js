// src/models/restaurant.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

const Restaurant = sequelize.define('Restaurant', {
  id_restaurant: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  contact: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  tableName: 'Restaurant',
  timestamps: false,
});

module.exports = Restaurant;