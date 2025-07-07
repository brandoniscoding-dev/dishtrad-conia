// src/models/etape.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

const Etape = sequelize.define('Etape', {
  id_etape: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_recipe: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ordre: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  texte: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'Etape',
  timestamps: false,
});

module.exports = Etape;