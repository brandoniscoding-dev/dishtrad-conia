const { Meal, MealImage, MealAlias, UserMeal } = require('../utils/db');
const mealService = require('../services/meal.service');
const logger = require('../utils/logger');

const createMeal = async (req, res, next) => {
  try {
    const { official_name, description, origin_region, imageUrl } = req.body;
    const mealData = { official_name, description, origin_region };
    const transaction = await Meal.sequelize.transaction();
    try {
      const meal = await mealService.createMeal(mealData, { transaction });
      if (imageUrl) {
        await mealService.addMealImage({ id_meal: meal.id_meal, url: imageUrl }, { transaction });
      }
      await transaction.commit();
      res.status(201).json({ data: meal });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    logger.error(`Create meal controller error: ${error.message}`);
    next(error);
  }
};

const getAllMeals = async (req, res, next) => {
  try {
    const meals = await mealService.getAllMeals();
    res.status(200).json({ data: meals });
  } catch (error) {
    logger.error(`Get all meals controller error: ${error.message}`);
    next(error);
  }
};

const getMealById = async (req, res, next) => {
  try {
    const meal = await mealService.getMealById(req.params.id);
    res.status(200).json({ data: meal });
  } catch (error) {
    logger.error(`Get meal by ID controller error: ${error.message}`);
    next(error);
  }
};

const updateMeal = async (req, res, next) => {
  try {
    const { official_name, description, origin_region, imageUrl } = req.body;
    const mealData = { official_name, description, origin_region };
    const transaction = await Meal.sequelize.transaction();
    try {
      const meal = await mealService.updateMeal(req.params.id, mealData, { transaction });
      if (imageUrl) {
        await MealImage.destroy({ where: { id_meal: req.params.id }, transaction });
        await mealService.addMealImage({ id_meal: req.params.id, url: imageUrl }, { transaction });
      }
      await transaction.commit();
      res.status(200).json({ data: meal });
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  } catch (error) {
    logger.error(`Update meal controller error: ${error.message}`);
    next(error);
  }
};

const deleteMeal = async (req, res, next) => {
  try {
    await mealService.deleteMeal(req.params.id);
    res.status(200).json({ message: 'Meal deleted successfully' });
  } catch (error) {
    logger.error(`Delete meal controller error: ${error.message}`);
    next(error);
  }
};

const addMealImage = async (req, res, next) => {
  try {
    const { id_meal, url } = req.body;
    const mealImage = await mealService.addMealImage({ id_meal, url });
    res.status(201).json({ data: mealImage });
  } catch (error) {
    logger.error(`Add meal image controller error: ${error.message}`);
    next(error);
  }
};

const addMealAlias = async (req, res, next) => {
  try {
    const aliasData = req.body;
    const mealAlias = await mealService.addMealAlias(aliasData);
    res.status(201).json({ data: mealAlias });
  } catch (error) {
    logger.error(`Add meal alias controller error: ${error.message}`);
    next(error);
  }
};

const addUserMeal = async (req, res, next) => {
  try {
    const userMealData = req.body;
    const userMeal = await mealService.addUserMeal(userMealData);
    res.status(201).json({ data: userMeal });
  } catch (error) {
    logger.error(`Add user meal controller error: ${error.message}`);
    next(error);
  }
};

const clearMealAliases = async (req, res, next) => {
  try {
    await mealService.clearMealAliases(req.params.id);
    res.status(200).json({ message: 'Aliases cleared successfully' });
  } catch (error) {
    logger.error(`Clear meal aliases controller error: ${error.message}`);
    next(error);
  }
};

module.exports = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
  addMealImage,
  addMealAlias,
  addUserMeal,
  clearMealAliases,
};