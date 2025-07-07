// src/services/user.service.js
const { User } = require('../utils/db');
const logger = require('../utils/logger');

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    if (!users || users.length === 0) {
      logger.info('No users found in the database');
      return [];
    }
    return users.map(user => ({
      id_user: user.id_user,
      username: user.username,
      email: user.email,
      role: user.role,
    }));
  } catch (error) {
    logger.error(`Get all users error: ${error.message}`);
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};

const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      logger.info(`User with ID ${id} not found`);
      throw new Error('User not found');
    }
    return {
      id_user: user.id_user,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    logger.error(`Get user by ID error: ${error.message}`);
    throw error;
  }
};

const updateUser = async (id, userData) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      logger.info(`User with ID ${id} not found`);
      throw new Error('User not found');
    }
    await user.update(userData);
    return {
      id_user: user.id_user,
      username: user.username,
      email: user.email,
      role: user.role,
    };
  } catch (error) {
    logger.error(`Update user error: ${error.message}`);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      logger.info(`User with ID ${id} not found`);
      throw new Error('User not found');
    }
    await user.destroy();
    return { message: 'User deleted successfully' };
  } catch (error) {
    logger.error(`Delete user error: ${error.message}`);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};