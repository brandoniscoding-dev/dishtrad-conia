// src/controllers/restaurant.controller.js
const restaurantService = require('../services/restaurant.service');

const createRestaurant = async (req, res, next) => {
  try {
    const restaurant = await restaurantService.createRestaurant(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    next(error);
  }
};

const getAllRestaurants = async (req, res, next) => {
  try {
    const restaurants = await restaurantService.getAllRestaurants();
    res.json(restaurants);
  } catch (error) {
    next(error);
  }
};

const getRestaurantById = async (req, res, next) => {
  try {
    const restaurant = await restaurantService.getRestaurantById(req.params.id);
    res.json(restaurant);
  } catch (error) {
    next(error);
  }
};

const updateRestaurant = async (req, res, next) => {
  try {
    const restaurant = await restaurantService.updateRestaurant(req.params.id, req.body);
    res.json(restaurant);
  } catch (error) {
    next(error);
  }
};

const deleteRestaurant = async (req, res, next) => {
  try {
    const result = await restaurantService.deleteRestaurant(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addMealRestaurant = async (req, res, next) => {
  try {
    const mealRestaurant = await restaurantService.addMealRestaurant(req.body);
    res.status(201).json(mealRestaurant);
  } catch (error) {
    next(error);
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