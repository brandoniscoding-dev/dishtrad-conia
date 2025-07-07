// src/models/chat.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');

const Chat = sequelize.define('Chat', {
  id_chat: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type_entree: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  contenu_entree: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  type_sortie: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  contenu_sortie: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  tableName: 'Chat',
  timestamps: false,
});

module.exports = Chat;