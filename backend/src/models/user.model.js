// src/models/user.model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.config');
const bcrypt = require('bcrypt');
const config = require('../config/env.config');

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM('admin', 'standard'),
    allowNull: false,
    defaultValue: 'standard',
  },
}, {
  tableName: 'User',
  timestamps: false,
  hooks: {
    beforeCreate: async (user) => {
      user.password = await bcrypt.hash(user.password, config.bcryptSaltRounds);
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        user.password = await bcrypt.hash(user.password, config.bcryptSaltRounds);
      }
    },
  },
});

module.exports = User;