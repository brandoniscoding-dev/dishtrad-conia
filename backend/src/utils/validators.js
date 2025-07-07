// src/utils/validators.js
const Joi = require('joi');

// User validation schemas
const userSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  birthdate: Joi.date().optional(),
  country: Joi.string().max(100).optional(),
  role: Joi.string().valid('admin', 'standard').default('standard'),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Meal validation schema
const mealSchema = Joi.object({
  official_name: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(1000).optional(),
  origin_region: Joi.string().max(100).optional(),
});

// MealImage validation schema
const mealImageSchema = Joi.object({
  id_meal: Joi.number().integer().required(),
  url: Joi.string().uri().required(),
});

// MealAlias validation schema
const mealAliasSchema = Joi.object({
  id_meal: Joi.number().integer().required(),
  alias_name: Joi.string().min(3).max(100).required(),
});

// Recipe validation schema
const recipeSchema = Joi.object({
  id_meal: Joi.number().integer().required(),
  title: Joi.string().min(3).max(100).required(),
  url_video: Joi.string().uri().optional(),
});

// Etape validation schema
const etapeSchema = Joi.object({
  id_recipe: Joi.number().integer().required(),
  ordre: Joi.number().integer().min(1).required(),
  texte: Joi.string().max(1000).required(),
});

// Ingredient validation schema
const ingredientSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
});

// RecipeIngredient validation schema
const recipeIngredientSchema = Joi.object({
  id_recipe: Joi.number().integer().required(),
  id_ingredient: Joi.number().integer().required(),
});

// UserMeal validation schema
const userMealSchema = Joi.object({
  id_user: Joi.number().integer().required(),
  id_meal: Joi.number().integer().required(),
});

// Restaurant validation schema
const restaurantSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  region: Joi.string().max(100).optional(),
  city: Joi.string().max(100).optional(),
  contact: Joi.string().max(100).optional(),
  latitude: Joi.number().optional(),
  longitude: Joi.number().optional(),
});

// MealRestaurant validation schema
const mealRestaurantSchema = Joi.object({
  id_meal: Joi.number().integer().required(),
  id_restaurant: Joi.number().integer().required(),
  prix: Joi.number().positive().required(),
});

module.exports = {
  userSchema,
  loginSchema,
  mealSchema,
  mealImageSchema,
  mealAliasSchema,
  recipeSchema,
  etapeSchema,
  ingredientSchema,
  recipeIngredientSchema,
  userMealSchema,
  restaurantSchema,
  mealRestaurantSchema,
};