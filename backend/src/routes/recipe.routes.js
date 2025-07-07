// src/routes/recipe.routes.js
const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipe.controller');
const authorize = require('../middlewares/authorize.middleware');
const validate = require('../middlewares/validate.middleware');
const { recipeSchema, etapeSchema, recipeIngredientSchema } = require('../utils/validators');

router.post('/', [authorize('admin'), validate(recipeSchema)], recipeController.createRecipe);
router.get('/', recipeController.getAllRecipes);
router.get('/:id', recipeController.getRecipeById);
router.put('/:id', [authorize('admin'), validate(recipeSchema)], recipeController.updateRecipe);
router.delete('/:id', authorize('admin'), recipeController.deleteRecipe);
router.post('/etape', [authorize('admin'), validate(etapeSchema)], recipeController.addEtape);
router.post('/ingredient', [authorize('admin'), validate(recipeIngredientSchema)], recipeController.addRecipeIngredient);

module.exports = router;