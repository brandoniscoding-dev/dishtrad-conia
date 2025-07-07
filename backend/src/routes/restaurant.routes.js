// src/routes/restaurant.routes.js
const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurant.controller');
const authorize = require('../middlewares/authorize.middleware');
const validate = require('../middlewares/validate.middleware');
const { restaurantSchema, mealRestaurantSchema } = require('../utils/validators');

router.post('/', [authorize('admin'), validate(restaurantSchema)], restaurantController.createRestaurant);
router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getRestaurantById);
router.put('/:id', [authorize('admin'), validate(restaurantSchema)], restaurantController.updateRestaurant);
router.delete('/:id', authorize('admin'), restaurantController.deleteRestaurant);
router.post('/meal-restaurant', [authorize('admin'), validate(mealRestaurantSchema)], restaurantController.addMealRestaurant);

module.exports = router;