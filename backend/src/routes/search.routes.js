const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Meal, MealAlias, MealImage, Recipe, Restaurant, MealRestaurant } = require('../utils/db');

router.get('/search/meals', async (req, res, next) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    const meals = await Meal.findAll({
      where: {
        [Op.or]: [
          { official_name: { [Op.like]: `%${query}%` } },
          { description: { [Op.like]: `%${query}%` } },
          { '$MealAliases.alias_name$': { [Op.like]: `%${query}%` } },
        ],
      },
      include: [
        { model: MealAlias, as: 'MealAliases' },
        { model: MealImage, as: 'MealImages' },
        { model: Recipe, as: 'Recipes' },
        {
          model: Restaurant,
          as: 'Restaurants',
          through: { attributes: ['prix'] },
          attributes: ['id_restaurant', 'name', 'region', 'city'],
        },
      ],
      limit: 5,
    });
    res.json(meals);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;