const express = require('express');
const router = express.Router();
const mealController = require('../controllers/meal.controller');
const authorize = require('../middlewares/authorize.middleware');

router.post('/', authorize('admin'), mealController.createMeal);
router.get('/', mealController.getAllMeals);
router.get('/:id', mealController.getMealById);
router.put('/:id', authorize('admin'), mealController.updateMeal);
router.delete('/:id', authorize('admin'), mealController.deleteMeal);
router.post('/image', authorize('admin'), mealController.addMealImage);
router.post('/alias', authorize('admin'), mealController.addMealAlias);
router.post('/user-meal', authorize('standard'), mealController.addUserMeal);
router.delete('/:id/aliases', authorize('admin'), mealController.clearMealAliases);

module.exports = router;