// src/services/auth.service.js
const bcrypt = require('bcrypt');
const { User } = require('../utils/db');
const logger = require('../utils/logger');

const login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    return user;
  } catch (error) {
    logger.error(`Auth service error: ${error.message}`);
    throw error;
  }
};

const register = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    logger.error(`Register service error: ${error.message}`);
    throw error;
  }
};

module.exports = {
  login,
  register,
};