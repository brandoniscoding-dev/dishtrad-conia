const { Meal, MealImage, MealAlias, Recipe, Etape, MealRestaurant, Restaurant, UserMeal } = require('../utils/db');
const logger = require('../utils/logger');

const createMeal = async (mealData, options = {}) => {
  try {
    const meal = await Meal.create(mealData, options);
    return meal;
  } catch (error) {
    logger.error(`Create meal error: ${error.message}`);
    throw new Error(`Failed to create meal: ${error.message}`);
  }
};

const getAllMeals = async () => {
  try {
    const meals = await Meal.findAll({
      include: [
        { model: MealImage, as: 'MealImages', attributes: ['url'], required: false },
        { model: MealAlias, as: 'MealAliases', attributes: ['alias_name'], required: false },
        {
          model: Recipe,
          as: 'Recipes',
          attributes: ['id_recipe', 'title', 'url_video'],
          include: [
            { model: Etape, as: 'Etapes', attributes: ['id_etape', 'ordre', 'texte'], required: false },
          ],
          required: false,
        },
        {
          model: Restaurant,
          as: 'Restaurants',
          through: { attributes: ['prix'] },
          attributes: ['id_restaurant', 'name', 'region', 'city', 'contact', 'latitude', 'longitude'],
          required: false,
        },
      ],
    });

    return meals.map((meal) => {
      const json = meal.toJSON();
      return {
        id_meal: json.id_meal,
        official_name: json.official_name,
        description: json.description,
        origin_region: json.origin_region,
        MealImages: json.MealImages || [],
        MealAliases: json.MealAliases || [],
        Recipes: json.Recipes || [],
        Restaurants: (json.Restaurants || []).map((r) => ({
          id_restaurant: r.id_restaurant,
          name: r.name,
          region: r.region,
          city: r.city,
          contact: r.contact,
          latitude: r.latitude,
          longitude: r.longitude,
          MealRestaurant: { prix: r.MealRestaurant?.prix || null },
        })),
      };
    });
  } catch (error) {
    logger.error(`Get all meals error: ${error.message}`);
    throw new Error(`Failed to fetch meals: ${error.message}`);
  }
};

const getMealById = async (id) => {
  try {
    const meal = await Meal.findByPk(id, {
      include: [
        { model: MealImage, as: 'MealImages', attributes: ['url'], required: false },
        { model: MealAlias, as: 'MealAliases', attributes: ['alias_name'], required: false },
        {
          model: Recipe,
          as: 'Recipes',
          attributes: ['id_recipe', 'title', 'url_video'],
          include: [
            { model: Etape, as: 'Etapes', attributes: ['id_etape', 'ordre', 'texte'], required: false },
          ],
          required: false,
        },
        {
          model: Restaurant,
          as: 'Restaurants',
          through: { attributes: ['prix'] },
          attributes: ['id_restaurant', 'name', 'region', 'city', 'contact', 'latitude', 'longitude'],
          required: false,
        },
      ],
    });

    if (!meal) {
      throw new Error('Meal not found');
    }

    const json = meal.toJSON();
    return {
      id_meal: json.id_meal,
      official_name: json.official_name,
      description: json.description,
      origin_region: json.origin_region,
      MealImages: json.MealImages || [],
      MealAliases: json.MealAliases || [],
      Recipes: json.Recipes || [],
      Restaurants: (json.Restaurants || []).map((r) => ({
        id_restaurant: r.id_restaurant,
        name: r.name,
        region: r.region,
        city: r.city,
        contact: r.contact,
        latitude: r.latitude,
        longitude: r.longitude,
        MealRestaurant: { prix: r.MealRestaurant?.prix || null },
      })),
    };
  } catch (error) {
    logger.error(`Get meal by ID error: ${error.message}`);
    throw new Error(`Failed to fetch meal: ${error.message}`);
  }
};

const updateMeal = async (id, mealData, options = {}) => {
  try {
    const meal = await Meal.findByPk(id, options);
    if (!meal) throw new Error('Meal not found');
    await meal.update(mealData, options);
    return meal;
  } catch (error) {
    logger.error(`Update meal error: ${error.message}`);
    throw new Error(`Failed to update meal: ${error.message}`);
  }
};

const deleteMeal = async (id) => {
  try {
    const meal = await Meal.findByPk(id);
    if (!meal) throw new Error('Meal not found');
    await meal.destroy();
    return { message: 'Meal deleted successfully' };
  } catch (error) {
    logger.error(`Delete meal error: ${error.message}`);
    throw new Error(`Failed to delete meal: ${error.message}`);
  }
};

const addMealImage = async (imageData, options = {}) => {
  try {
    const meal = await Meal.findByPk(imageData.id_meal);
    if (!meal) throw new Error('Meal not found');
    return await MealImage.create(imageData, options);
  } catch (error) {
    logger.error(`Add meal image error: ${error.message}`);
    throw new Error(`Failed to add meal image: ${error.message}`);
  }
};

const addMealAlias = async (aliasData) => {
  try {
    const meal = await Meal.findByPk(aliasData.id_meal);
    if (!meal) throw new Error('Meal not found');
    return await MealAlias.create(aliasData);
  } catch (error) {
    logger.error(`Add meal alias error: ${error.message}`);
    throw new Error(`Failed to add meal alias: ${error.message}`);
  }
};

const addUserMeal = async (userMealData) => {
  try {
    const meal = await Meal.findByPk(userMealData.id_meal);
    if (!meal) throw new Error('Meal not found');
    const user = await UserMeal.findOne({
      where: {
        id_user: userMealData.id_user,
        id_meal: userMealData.id_meal,
      },
    });
    if (user) throw new Error('User-Meal association already exists');
    return await UserMeal.create(userMealData);
  } catch (error) {
    logger.error(`Add user meal error: ${error.message}`);
    throw new Error(`Failed to add user meal: ${error.message}`);
  }
};

const clearMealAliases = async (id_meal) => {
  try {
    const meal = await Meal.findByPk(id_meal);
    if (!meal) throw new Error('Meal not found');
    await MealAlias.destroy({ where: { id_meal } });
    return { message: 'Aliases cleared successfully' };
  } catch (error) {
    logger.error(`Clear meal aliases error: ${error.message}`);
    throw new Error(`Failed to clear meal aliases: ${error.message}`);
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