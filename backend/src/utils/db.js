const sequelize = require('../config/database.config');
const User = require('../models/user.model');
const Meal = require('../models/meal.model');
const MealImage = require('../models/mealImage.model');
const MealAlias = require('../models/mealAlias.model');
const Recipe = require('../models/recipe.model');
const Etape = require('../models/etape.model');
const Ingredient = require('../models/ingredient.model');
const RecipeIngredient = require('../models/recipeIngredient.model');
const UserMeal = require('../models/userMeal.model');
const Restaurant = require('../models/restaurant.model');
const MealRestaurant = require('../models/mealRestaurant.model');
const Chat = require('../models/chat.model');

// Define associations
User.belongsToMany(Meal, { through: UserMeal, foreignKey: 'id_user', as: 'Meals' });
Meal.belongsToMany(User, { through: UserMeal, foreignKey: 'id_meal', as: 'Users' });

Meal.hasMany(MealImage, { foreignKey: 'id_meal', as: 'MealImages' });
MealImage.belongsTo(Meal, { foreignKey: 'id_meal', as: 'Meal' });

Meal.hasMany(MealAlias, { foreignKey: 'id_meal', as: 'MealAliases' });
MealAlias.belongsTo(Meal, { foreignKey: 'id_meal', as: 'Meal' });

Meal.hasMany(Recipe, { foreignKey: 'id_meal', as: 'Recipes' });
Recipe.belongsTo(Meal, { foreignKey: 'id_meal', as: 'Meal' });

Recipe.hasMany(Etape, { foreignKey: 'id_recipe', as: 'Etapes' });
Etape.belongsTo(Recipe, { foreignKey: 'id_recipe', as: 'Recipe' });

Recipe.belongsToMany(Ingredient, { through: RecipeIngredient, foreignKey: 'id_recipe', as: 'Ingredients' });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient, foreignKey: 'id_ingredient', as: 'Recipes' });

Meal.belongsToMany(Restaurant, { through: MealRestaurant, foreignKey: 'id_meal', as: 'Restaurants' });
Restaurant.belongsToMany(Meal, { through: MealRestaurant, foreignKey: 'id_restaurant', as: 'Meals' });

Chat.belongsTo(User, { foreignKey: 'id_user', as: 'User' });

module.exports = {
  sequelize,
  User,
  Meal,
  MealImage,
  MealAlias,
  Recipe,
  Etape,
  Ingredient,
  RecipeIngredient,
  UserMeal,
  Restaurant,
  MealRestaurant,
  Chat,
};