// src/config/database.config.js
const { Sequelize } = require('sequelize');
const config = require('./env.config');

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;