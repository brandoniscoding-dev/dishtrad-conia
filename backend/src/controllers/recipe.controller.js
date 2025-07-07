// src/controllers/recipe.controller.js
const recipeService = require('../services/recipe.service');

const createRecipe = async (req, res, next) => {
  try {
    const recipe = await recipeService.createRecipe(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    next(error);
  }
};

const getAllRecipes = async (req, res, next) => {
  try {
    const recipes = await recipeService.getAllRecipes();
    res.json(recipes);
  } catch (error) {
    next(error);
  }
};

const getRecipeById = async (req, res, next) => {
  try {
    const recipe = await recipeService.getRecipeById(req.params.id);
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

const updateRecipe = async (req, res, next) => {
  try {
    const recipe = await recipeService.updateRecipe(req.params.id, req.body);
    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const result = await recipeService.deleteRecipe(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addEtape = async (req, res, next) => {
  try {
    const etape = await recipeService.addEtape(req.body);
    res.status(201).json(etape);
  } catch (error) {
    next(error);
  }
};

const addRecipeIngredient = async (req, res, next) => {
  try {
    const recipeIngredient = await recipeService.addRecipeIngredient(req.body);
    res.status(201).json(recipeIngredient);
  } catch (error) {
    next(error);
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