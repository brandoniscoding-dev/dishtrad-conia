const { Restaurant, MealRestaurant, Meal } = require('../utils/db');
const logger = require('../utils/logger');

const createRestaurant = async (restaurantData) => {
  try {
    return await Restaurant.create(restaurantData);
  } catch (error) {
    logger.error(`Create restaurant error: ${error.message}`);
    throw error;
  }
};

const getAllRestaurants = async () => {
  try {
    return await Restaurant.findAll({
      include: [{ model: Meal, as: 'Meals', through: { attributes: ['prix'] }, required: false }],
    });
  } catch (error) {
    logger.error(`Get all restaurants error: ${error.message}`);
    throw error;
  }
};

const getRestaurantById = async (id) => {
  try {
    const restaurant = await Restaurant.findByPk(id, {
      include: [{ model: Meal, as: 'Meals', through: { attributes: ['prix'] }, required: false }],
    });
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    return restaurant;
  } catch (error) {
    logger.error(`Get restaurant by ID error: ${error.message}`);
    throw error;
  }
};

const updateRestaurant = async (id, restaurantData) => {
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    await restaurant.update(restaurantData);
    return restaurant;
  } catch (error) {
    logger.error(`Update restaurant error: ${error.message}`);
    throw error;
  }
};

const deleteRestaurant = async (id) => {
  try {
    const restaurant = await Restaurant.findByPk(id);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    await restaurant.destroy();
    return { message: 'Restaurant deleted successfully' };
  } catch (error) {
    logger.error(`Delete restaurant error: ${error.message}`);
    throw error;
  }
};

const addMealRestaurant = async (mealRestaurantData) => {
  try {
    return await MealRestaurant.create(mealRestaurantData);
  } catch (error) {
    logger.error(`Add meal restaurant error: ${error.message}`);
    throw error;
  }
};

module.exports = {
  createRestaurant,
  getAllRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  addMealRestaurant,
};