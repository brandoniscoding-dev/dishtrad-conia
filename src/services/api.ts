import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const user = localStorage.getItem('dishtrad_user');
  const token = localStorage.getItem('token');
  if (user) {
    const userData = JSON.parse(user);
    config.headers['X-User-Id'] = userData.id_user;
    config.headers['X-User-Role'] = userData.role;
  }
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export interface User {
  id_user: number;
  username: string;
  email: string;
  role: 'standard' | 'admin';
  country?: string;
  birthdate?: string;
}

export interface Meal {
  id_meal: number;
  official_name: string;
  description?: string;
  origin_region?: string;
  MealImages?: { url: string }[];
  MealAliases?: { alias_name: string }[];
  Recipes?: { id_recipe: number; title: string; url_video?: string }[];
  Restaurants?: {
    id_restaurant: number;
    name: string;
    region: string;
    city: string;
    contact?: string;
    latitude?: number;
    longitude?: number;
    MealRestaurant: { prix: number };
  }[];
}

export interface Recipe {
  id_recipe: number;
  title: string;
  url_video?: string;
  id_meal: number;
  Etapes?: { id_etape: number; ordre: number; texte: string }[];
  Ingredients?: { id_ingredient: number; name: string }[];
}

export interface Restaurant {
  id_restaurant: number;
  name: string;
  region?: string;
  city?: string;
  contact?: string;
  latitude?: number;
  longitude?: number;
  Meals?: {
    id_meal: number;
    official_name: string;
    MealRestaurant: { prix: number };
  }[];
}

export const authService = {
  login: (email: string, password: string) =>
    api.post<{ data: { token: string; user: User } }>('/auth/login', { email, password }),
  register: (userData: {
    username: string;
    email: string;
    password: string;
    birthdate?: string;
    country?: string;
  }) => api.post<{ data: User }>('/auth/register', userData),
};

export const mealService = {
  getAll: () => api.get<{ data: Meal[] }>('/meals'),
  getById: (id: number) => api.get<{ data: Meal }>(`/meals/${id}`),
  create: (mealData: { official_name: string; description?: string; origin_region?: string }) =>
    api.post<{ data: Meal }>('/meals', mealData),
  update: (id: number, mealData: { official_name: string; description?: string; origin_region?: string }) =>
    api.put<{ data: Meal }>(`/meals/${id}`, mealData),
  delete: (id: number) => api.delete(`/meals/${id}`),
  addAlias: (aliasData: { id_meal: number; alias_name: string }) => api.post('/meals/alias', aliasData),
  addToFavorites: (id_user: number, id_meal: number) => api.post('/meals/user-meal', { id_user, id_meal }),
  clearAliases: (id_meal: number) => api.delete(`/meals/${id_meal}/aliases`),
  addImage: (imageData: { id_meal: number; url: string }) => api.post('/meals/image', imageData),
};

export const recipeService = {
  getAll: () => api.get<{ data: Recipe[] }>('/recipes'),
  getById: (id: number) => api.get<{ data: Recipe }>(`/recipes/${id}`),
  create: (recipeData: { title: string; id_meal: number; url_video?: string }) =>
    api.post<{ data: Recipe }>('/recipes', recipeData),
  update: (id: number, recipeData: { title: string; id_meal: number; url_video?: string }) =>
    api.put<{ data: Recipe }>(`/recipes/${id}`, recipeData),
  delete: (id: number) => api.delete(`/recipes/${id}`),
  addStep: (stepData: { id_recipe: number; ordre: number; texte: string }) =>
    api.post('/recipes/etape', stepData),
  addIngredient: (ingredientData: { id_recipe: number; name: string }) =>
    api.post('/recipes/ingredient', ingredientData),
  clearSteps: (id_recipe: number) => api.delete(`/recipes/${id_recipe}/etapes`),
  clearIngredients: (id_recipe: number) => api.delete(`/recipes/${id_recipe}/ingredients`),
};

export const restaurantService = {
  getAll: () => api.get<{ data: Restaurant[] }>('/restaurants'),
  getById: (id: number) => api.get<{ data: Restaurant }>(`/restaurants/${id}`),
  create: (restaurantData: {
    name: string;
    region?: string;
    city?: string;
    contact?: string;
    latitude?: number;
    longitude?: number;
  }) => api.post<{ data: Restaurant }>('/restaurants', restaurantData),
  update: (
    id: number,
    restaurantData: {
      name: string;
      region?: string;
      city?: string;
      contact?: string;
      latitude?: number;
      longitude?: number;
    }
  ) => api.put<{ data: Restaurant }>(`/restaurants/${id}`, restaurantData),
  delete: (id: number) => api.delete(`/restaurants/${id}`),
  addMeal: (relationData: { id_restaurant: number; id_meal: number; prix: number }) =>
    api.post('/restaurants/meal-restaurant', relationData),
  clearMeals: (id_restaurant: number) => api.delete(`/restaurants/${id_restaurant}/meals`),
};

export const userService = {
  getAll: () => api.get<{ data: User[] }>('/users'),
  getById: (id: number) => api.get<{ data: User }>(`/users/${id}`),
  update: (id: number, userData: Partial<User>) => api.put<{ data: User }>(`/users/${id}`, userData),
  delete: (id: number) => api.delete(`/users/${id}`),
};

export const searchMeals = (query: string) =>
  api.get<{ data: Meal[] }>('/search/meals', { params: { query } });

export const searchRestaurants = (query: string) =>
  api.get<{ data: Restaurant[] }>('/search/restaurants', { params: { query } });

export default api;