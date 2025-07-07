const { Recipe, Etape, RecipeIngredient, Ingredient } = require('../utils/db');
const logger = require('../utils/logger');

const createRecipe = async (recipeData) => {
  try {
    return await Recipe.create(recipeData);
  } catch (error) {
    logger.error(`Create recipe error: ${error.message}`);
    throw error;
  }
};

const getAllRecipes = async () => {
  try {
    return await Recipe.findAll({
      include: [
        { model: Etape, as: 'Etapes', required: false },
        { model: Ingredient, as: 'Ingredients', through: { attributes: [] }, required: false },
      ],
    });
  } catch (error) {
    logger.error(`Get all recipes error: ${error.message}`);
    throw error;
  }
};

const getRecipeById = async (id) => {
  try {
    const recipe = await Recipe.findByPk(id, {
      include: [
        { model: Etape, as: 'Etapes', required: false },
        { model: Ingredient, as: 'Ingredients', through: { attributes: [] }, required: false },
      ],
    });
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    return recipe;
  } catch (error) {
    logger.error(`Get recipe by ID error: ${error.message}`);
    throw error;
  }
};

const updateRecipe = async (id, recipeData) => {
  try {
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    await recipe.update(recipeData);
    return recipe;
  } catch (error) {
    logger.error(`Update recipe error: ${error.message}`);
    throw error;
  }
};

const deleteRecipe = async (id) => {
  try {
    const recipe = await Recipe.findByPk(id);
    if (!recipe) {
      throw new Error('Recipe not found');
    }
    await recipe.destroy();
    return { message: 'Recipe deleted successfully' };
  } catch (error) {
    logger.error(`Delete recipe error: ${error.message}`);
    throw error;
  }
};

const addEtape = async (etapeData) => {
  try {
    return await Etape.create(etapeData);
  } catch (error) {
    logger.error(`Add etape error: ${error.message}`);
    throw error;
  }
};

const addRecipeIngredient = async (recipeIngredientData) => {
  try {
    return await RecipeIngredient.create(recipeIngredientData);
  } catch (error) {
    logger.error(`Add recipe ingredient error: ${error.message}`);
    throw error;
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  addEtape,
  addRecipeIngredient,
};