import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, ChefHat, Book, MapPin, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotPanel from '../components/ChatbotPanel';
import { authService, userService, mealService, recipeService, restaurantService } from '../services/api';
import { toast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface User {
  id_user: number;
  username: string;
  email: string;
  role: 'admin' | 'standard';
  country?: string;
  birthdate?: string;
  Meals?: { id_meal: number; official_name: string }[];
}

interface Meal {
  id_meal: number;
  official_name: string;
  description?: string;
  origin_region?: string;
  MealImages?: { url: string }[];
  MealAliases?: { alias_name: string }[];
}

interface Recipe {
  id_recipe: number;
  title: string;
  url_video?: string;
  id_meal: number;
  Etapes?: { id_etape: number; ordre: number; texte: string }[];
  Ingredients?: { id_ingredient: number; name: string }[];
}

interface Restaurant {
  id_restaurant: number;
  name: string;
  region?: string;
  city?: string;
  contact?: string;
  latitude?: number;
  longitude?: number;
  Meals?: { id_meal: number; official_name: string; MealRestaurant: { prix: number } }[];
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'users' | 'meals' | 'recipes' | 'restaurants'>('users');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [items, setItems] = useState<User[] | Meal[] | Recipe[] | Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [editItemId, setEditItemId] = useState<number | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [aliases, setAliases] = useState<string[]>([]);
  const [etapes, setEtapes] = useState<{ ordre: number; texte: string }[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [mealRestaurants, setMealRestaurants] = useState<{ id_meal: number; prix: number }[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [userMeals, setUserMeals] = useState<number[]>([]);

  useEffect(() => {
    fetchItems();
    if (activeTab === 'recipes' || activeTab === 'restaurants' || activeTab === 'users') {
      fetchMeals();
    }
  }, [activeTab]);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      let response;
      switch (activeTab) {
        case 'users':
          response = await userService.getAll();
          setItems(response.data.data);
          break;
        case 'meals':
          response = await mealService.getAll();
          setItems(response.data.data);
          break;
        case 'recipes':
          response = await recipeService.getAll();
          setItems(response.data.data);
          break;
        case 'restaurants':
          response = await restaurantService.getAll();
          setItems(response.data.data);
          break;
      }
    } catch (error: any) {
      toast({ title: 'Erreur', description: 'Impossible de charger les données', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMeals = async () => {
    try {
      const response = await mealService.getAll();
      setMeals(response.data.data);
    } catch (error: any) {
      toast({ title: 'Erreur', description: 'Impossible de charger les plats', variant: 'destructive' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const relativePath = `/images/meals/${file.name}`;
      setImagePreview(URL.createObjectURL(file));
      setFormData((prev: any) => ({ ...prev, imageUrl: relativePath }));
      toast({
        title: 'Info',
        description: `Veuillez placer manuellement l'image "${file.name}" dans le dossier "public/images/meals/" pour qu'elle soit accessible.`,
      });
    }
  };

  const handleAliasChange = (index: number, value: string) => {
    const newAliases = [...aliases];
    newAliases[index] = value;
    setAliases(newAliases);
  };

  const addAlias = () => setAliases([...aliases, '']);
  const removeAlias = (index: number) => setAliases(aliases.filter((_, i) => i !== index));

  const handleEtapeChange = (index: number, field: 'ordre' | 'texte', value: string) => {
    const newEtapes = [...etapes];
    newEtapes[index] = { ...newEtapes[index], [field]: field === 'ordre' ? parseInt(value) || 0 : value };
    setEtapes(newEtapes);
  };

  const addEtape = () => setEtapes([...etapes, { ordre: etapes.length + 1, texte: '' }]);
  const removeEtape = (index: number) => setEtapes(etapes.filter((_, i) => i !== index));

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => setIngredients([...ingredients, '']);
  const removeIngredient = (index: number) => setIngredients(ingredients.filter((_, i) => i !== index));

  const handleMealRestaurantChange = (index: number, field: 'id_meal' | 'prix', value: string) => {
    const newMealRestaurants = [...mealRestaurants];
    newMealRestaurants[index] = { ...newMealRestaurants[index], [field]: field === 'id_meal' ? parseInt(value) : parseFloat(value) };
    setMealRestaurants(newMealRestaurants);
  };

  const addMealRestaurant = () => setMealRestaurants([...mealRestaurants, { id_meal: 0, prix: 0 }]);
  const removeMealRestaurant = (index: number) => setMealRestaurants(mealRestaurants.filter((_, i) => i !== index));

  const handleUserMealChange = (id_meal: number) => {
    setUserMeals((prev) =>
      prev.includes(id_meal) ? prev.filter((id) => id !== id_meal) : [...prev, id_meal]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let response;
      if (editItemId) {
        switch (activeTab) {
          case 'users':
            response = await userService.update(editItemId, formData);
            for (const id_meal of userMeals) {
              await mealService.addToFavorites(editItemId, id_meal);
            }
            break;
          case 'meals':
            response = await mealService.update(editItemId, {
              official_name: formData.official_name,
              description: formData.description,
              origin_region: formData.origin_region,
              imageUrl: formData.imageUrl,
            });
            if (formData.imageUrl) {
              await mealService.addImage({ id_meal: editItemId, url: formData.imageUrl });
            }
            await mealService.clearAliases(editItemId);
            for (const alias of aliases) {
              if (alias) await mealService.addAlias({ id_meal: editItemId, alias_name: alias });
            }
            break;
          case 'recipes':
            response = await recipeService.update(editItemId, {
              title: formData.title,
              id_meal: formData.id_meal,
              url_video: formData.url_video,
            });
            await recipeService.clearSteps(editItemId);
            for (const etape of etapes) {
              if (etape.texte && etape.ordre) await recipeService.addStep({ id_recipe: editItemId, ...etape });
            }
            await recipeService.clearIngredients(editItemId);
            for (const ingredient of ingredients) {
              if (ingredient) await recipeService.addIngredient({ id_recipe: editItemId, name: ingredient });
            }
            break;
          case 'restaurants':
            response = await restaurantService.update(editItemId, {
              name: formData.name,
              region: formData.region,
              city: formData.city,
              contact: formData.contact,
              latitude: formData.latitude ? parseFloat(formData.latitude) : null,
              longitude: formData.longitude ? parseFloat(formData.longitude) : null,
            });
            await restaurantService.clearMeals(editItemId);
            for (const mr of mealRestaurants) {
              if (mr.id_meal && mr.prix) await restaurantService.addMeal({ id_restaurant: editItemId, ...mr });
            }
            break;
        }
        toast({ title: 'Succès', description: 'Élément modifié avec succès' });
      } else {
        switch (activeTab) {
          case 'users':
            response = await authService.register(formData);
            for (const id_meal of userMeals) {
              await mealService.addToFavorites(response.data.data.id_user, id_meal);
            }
            break;
          case 'meals':
            response = await mealService.create({
              official_name: formData.official_name,
              description: formData.description,
              origin_region: formData.origin_region,
            });
            if (formData.imageUrl) {
              await mealService.addImage({ id_meal: response.data.data.id_meal, url: formData.imageUrl });
            }
            for (const alias of aliases) {
              if (alias) await mealService.addAlias({ id_meal: response.data.data.id_meal, alias_name: alias });
            }
            break;
          case 'recipes':
            response = await recipeService.create({
              title: formData.title,
              id_meal: formData.id_meal,
              url_video: formData.url_video,
            });
            for (const etape of etapes) {
              if (etape.texte && etape.ordre) await recipeService.addStep({ id_recipe: response.data.data.id_recipe, ...etape });
            }
            for (const ingredient of ingredients) {
              if (ingredient) await recipeService.addIngredient({ id_recipe: response.data.data.id_recipe, name: ingredient });
            }
            break;
          case 'restaurants':
            response = await restaurantService.create({
              name: formData.name,
              region: formData.region,
              city: formData.city,
              contact: formData.contact,
              latitude: formData.latitude ? parseFloat(formData.latitude) : null,
              longitude: formData.longitude ? parseFloat(formData.longitude) : null,
            });
            for (const mr of mealRestaurants) {
              if (mr.id_meal && mr.prix) await restaurantService.addMeal({ id_restaurant: response.data.data.id_restaurant, ...mr });
            }
            break;
        }
        toast({ title: 'Succès', description: 'Nouvel élément ajouté avec succès' });
      }
      setFormData({});
      setEditItemId(null);
      setImagePreview(null);
      setAliases([]);
      setEtapes([]);
      setIngredients([]);
      setMealRestaurants([]);
      setUserMeals([]);
      fetchItems();
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.response?.data?.error || 'Une erreur est survenue',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditItemId(item.id_user || item.id_meal || item.id_recipe || item.id_restaurant);
    setFormData({ ...item, imageUrl: item.MealImages?.[0]?.url || '' });
    if (activeTab === 'users') {
      setUserMeals(item.Meals?.map((m: any) => m.id_meal) || []);
    } else if (activeTab === 'meals') {
      setAliases(item.MealAliases?.map((a: any) => a.alias_name) || []);
      setImagePreview(item.MealImages?.[0]?.url ? `http://localhost:8080${item.MealImages[0].url}` : null);
    } else if (activeTab === 'recipes') {
      setEtapes(item.Etapes || []);
      setIngredients(item.Ingredients?.map((i: any) => i.name) || []);
    } else if (activeTab === 'restaurants') {
      setMealRestaurants(item.Meals?.map((m: any) => ({
        id_meal: m.id_meal,
        prix: m.MealRestaurant.prix,
      })) || []);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cet élément ? Cela supprimera également les données associées.')) return;

    setIsLoading(true);
    try {
      switch (activeTab) {
        case 'users':
          await userService.delete(id);
          break;
        case 'meals':
          await mealService.delete(id);
          break;
        case 'recipes':
          await recipeService.delete(id);
          break;
        case 'restaurants':
          await restaurantService.delete(id);
          break;
      }
      toast({ title: 'Succès', description: 'Élément supprimé avec succès' });
      fetchItems();
    } catch (error: any) {
      toast({
        title: 'Erreur',
        description: error.response?.data?.error || 'Impossible de supprimer l\'élément',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    switch (activeTab) {
      case 'users':
        return (
          <>
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">Nom d'utilisateur</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username || ''}
                onChange={handleInputChange}
                placeholder="Nom d'utilisateur"
                className="input-cameroon"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ''}
                onChange={handleInputChange}
                placeholder="votre@email.com"
                className="input-cameroon"
                disabled={isLoading}
              />
            </div>
            {!editItemId && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password || ''}
                  onChange={handleInputChange}
                  placeholder="Minimum 6 caractères"
                  className="input-cameroon"
                  disabled={isLoading}
                />
              </div>
            )}
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-2">Rôle</label>
              <select
                id="role"
                name="role"
                value={formData.role || ''}
                onChange={handleInputChange}
                className="input-cameroon"
                disabled={isLoading}
              >
                <option value="">Sélectionner un rôle</option>
                <option value="admin">Administrateur</option>
                <option value="standard">Standard</option>
              </select>
            </div>
            <div>
              <label htmlFor="country" className="block text-sm font-medium mb-2">Pays (optionnel)</label>
              <select
                id="country"
                name="country"
                value={formData.country || ''}
                onChange={handleInputChange}
                className="input-cameroon"
                disabled={isLoading}
              >
                <option value="">Sélectionner un pays</option>
                <option value="Cameroon">🇨🇲 Cameroun</option>
                <option value="France">🇫🇷 France</option>
                <option value="Canada">🇨🇦 Canada</option>
                <option value="USA">🇺🇸 États-Unis</option>
                <option value="Belgium">🇧🇪 Belgique</option>
                <option value="Switzerland">🇨🇭 Suisse</option>
                <option value="Other">🌍 Autre</option>
              </select>
            </div>
            <div>
              <label htmlFor="birthdate" className="block text-sm font-medium mb-2">Date de naissance (optionnel)</label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                value={formData.birthdate || ''}
                onChange={handleInputChange}
                className="input-cameroon"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Plats favoris (optionnel)</label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {meals.map((meal) => (
                  <div key={meal.id_meal} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`meal_${meal.id_meal}`}
                      checked={userMeals.includes(meal.id_meal)}
                      onChange={() => handleUserMealChange(meal.id_meal)}
                      disabled={isLoading}
                    />
                    <label htmlFor={`meal_${meal.id_meal}`} className="text-sm">{meal.official_name}</label>
                  </div>
                ))}
              </div>
            </div>
          </>
        );
      case 'meals':
        return (
          <>
            <div>
              <label htmlFor="official_name" className="block text-sm font-medium mb-2">Nom officiel</label>
              <input
                type="text"
                id="official_name"
                name="official_name"
                value={formData.official_name || ''}
                onChange={handleInputChange}
                placeholder="Nom du plat"
                className="input-cameroon"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleInputChange}
                placeholder="Description du plat"
                className="input-cameroon min-h-[100px] resize-vertical"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="origin_region" className="block text-sm font-medium mb-2">Région d'origine</label>
              <input
                type="text"
                id="origin_region"
                name="origin_region"
                value={formData.origin_region || ''}
                onChange={handleInputChange}
                placeholder="Région d'origine"
                className="input-cameroon"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="image" className="block text-sm font-medium mb-2">Image du plat</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="input-cameroon"
                disabled={isLoading}
              />
              <p className="text-sm text-muted-foreground mt-1">
                Après avoir sélectionné une image, placez-la manuellement dans le dossier <code>public/images/meals/</code>.
              </p>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded"
                  onError={() => toast({
                    title: 'Erreur',
                    description: 'L\'image sélectionnée n\'est pas disponible. Vérifiez le dossier public/images/meals/.',
                    variant: 'destructive',
                  })}
                />
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Alias</label>
              {aliases.map((alias, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={alias}
                    onChange={(e) => handleAliasChange(index, e.target.value)}
                    placeholder="Alias du plat"
                    className="input-cameroon"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => removeAlias(index)}
                    className="btn-destructive p-2"
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addAlias} className="btn-secondary mt-2" disabled={isLoading}>
                Ajouter un alias
              </button>
            </div>
          </>
        );
      case 'recipes':
        return (
          <>
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">Titre</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ''}
                onChange={handleInputChange}
                placeholder="Titre de la recette"
                className="input-cameroon"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="id_meal" className="block text-sm font-medium mb-2">Plat associé</label>
              <select
                id="id_meal"
                name="id_meal"
                value={formData.id_meal || ''}
                onChange={handleInputChange}
                className="input-cameroon"
                disabled={isLoading}
              >
                <option value="">Sélectionner un plat</option>
                {meals.map((meal) => (
                  <option key={meal.id_meal} value={meal.id_meal}>{meal.official_name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="url_video" className="block text-sm font-medium mb-2">URL de la vidéo (optionnel)</label>
              <input
                type="url"
                id="url_video"
                name="url_video"
                value={formData.url_video || ''}
                onChange={handleInputChange}
                placeholder="https://example.com/video"
                className="input-cameroon"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Étapes</label>
              {etapes.map((etape, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="number"
                    value={etape.ordre}
                    onChange={(e) => handleEtapeChange(index, 'ordre', e.target.value)}
                    placeholder="Ordre"
                    className="input-cameroon w-20"
                    disabled={isLoading}
                  />
                  <input
                    type="text"
                    value={etape.texte}
                    onChange={(e) => handleEtapeChange(index, 'texte', e.target.value)}
                    placeholder="Description de l'étape"
                    className="input-cameroon flex-1"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => removeEtape(index)}
                    className="btn-destructive p-2"
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addEtape} className="btn-secondary mt-2" disabled={isLoading}>
                Ajouter une étape
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Ingrédients</label>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    placeholder="Nom de l'ingrédient"
                    className="input-cameroon"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="btn-destructive p-2"
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addIngredient} className="btn-secondary mt-2" disabled={isLoading}>
                Ajouter un ingrédient
              </button>
            </div>
          </>
        );
      case 'restaurants':
        return (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Nom</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleInputChange}
                placeholder="Nom du restaurant"
                className="input-cameroon"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="region" className="block text-sm font-medium mb-2">Région</label>
              <input
                type="text"
                id="region"
                name="region"
                value={formData.region || ''}
                onChange={handleInputChange}
                placeholder="Région"
                className="input-cameroon"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium mb-2">Ville</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city || ''}
                onChange={handleInputChange}
                placeholder="Ville"
                className="input-cameroon"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="contact" className="block text-sm font-medium mb-2">Contact (optionnel)</label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact || ''}
                onChange={handleInputChange}
                placeholder="Téléphone ou email"
                className="input-cameroon"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="latitude" className="block text-sm font-medium mb-2">Latitude (optionnel)</label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                value={formData.latitude || ''}
                onChange={handleInputChange}
                placeholder="Entre -90 et 90"
                className="input-cameroon"
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="longitude" className="block text-sm font-medium mb-2">Longitude (optionnel)</label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                value={formData.longitude || ''}
                onChange={handleInputChange}
                placeholder="Entre -180 et 180"
                className="input-cameroon"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Plats servis</label>
              {mealRestaurants.map((mr, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <select
                    value={mr.id_meal}
                    onChange={(e) => handleMealRestaurantChange(index, 'id_meal', e.target.value)}
                    className="input-cameroon"
                    disabled={isLoading}
                  >
                    <option value="">Sélectionner un plat</option>
                    {meals.map((meal) => (
                      <option key={meal.id_meal} value={meal.id_meal}>{meal.official_name}</option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={mr.prix}
                    onChange={(e) => handleMealRestaurantChange(index, 'prix', e.target.value)}
                    placeholder="Prix (XAF)"
                    className="input-cameroon w-24"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => removeMealRestaurant(index)}
                    className="btn-destructive p-2"
                    disabled={isLoading}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button type="button" onClick={addMealRestaurant} className="btn-secondary mt-2" disabled={isLoading}>
                Ajouter un plat
              </button>
            </div>
          </>
        );
    }
  };

  const renderList = () => {
    if (items.length === 0) {
      return <p className="text-muted-foreground">Aucun élément trouvé.</p>;
    }

    return (
      <div className="space-y-3">
        {items.map((item: any) => (
          <motion.div
            key={item.id_user || item.id_meal || item.id_recipe || item.id_restaurant}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center justify-between p-4 bg-muted/20 rounded-lg shadow-sm hover:bg-muted/30 transition-colors"
          >
            <div>
              <span className="font-kameron font-medium">
                {item.username || item.official_name || item.title || item.name}
              </span>
              {activeTab === 'users' && (
                <>
                  <p className="text-sm text-muted-foreground">{item.email} ({item.role})</p>
                  <p className="text-sm text-muted-foreground">Favoris : {item.Meals?.length || 0}</p>
                </>
              )}
              {activeTab === 'meals' && (
                <>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  <p className="text-sm text-muted-foreground">Région : {item.origin_region || 'Inconnue'}</p>
                  {item.MealImages?.[0]?.url && (
                    <img
                      src={`http://localhost:8080${item.MealImages[0].url}`}
                      alt={item.official_name}
                      className="mt-2 w-16 h-16 object-cover rounded"
                      onError={() => toast({
                        title: 'Erreur',
                        description: `L'image pour ${item.official_name} n'est pas disponible. Assurez-vous qu'elle est dans public/images/meals/.`,
                        variant: 'destructive',
                      })}
                    />
                  )}
                </>
              )}
              {activeTab === 'recipes' && (
                <>
                  <p className="text-sm text-muted-foreground">Plat : {meals.find(m => m.id_meal === item.id_meal)?.official_name || 'Inconnu'}</p>
                  <p className="text-sm text-muted-foreground">Étapes : {item.Etapes?.length || 0}</p>
                  <p className="text-sm text-muted-foreground">Ingrédients : {item.Ingredients?.length || 0}</p>
                </>
              )}
              {activeTab === 'restaurants' && (
                <>
                  <p className="text-sm text-muted-foreground">{item.city}, {item.region}</p>
                  <p className="text-sm text-muted-foreground">Plats servis : {item.Meals?.length || 0}</p>
                </>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="btn-secondary text-xs px-3 py-1"
                disabled={isLoading}
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(item.id_user || item.id_meal || item.id_recipe || item.id_restaurant)}
                className="btn-destructive text-xs px-3 py-1"
                disabled={isLoading}
              >
                Supprimer
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto mt-24 px-4 sm:px-6 lg:px-8 py-12">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-primary hover:text-destructive transition-colors duration-200 mb-6 focus-cameroon"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l'accueil
        </Link>
        <h1 className="font-noto-serif font-bold text-3xl md:text-4xl text-primary mb-8">
          Tableau de bord - Administration
        </h1>
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-8 border-b border-border/20">
          {[
            { key: 'users', label: 'Utilisateurs', icon: Users },
            { key: 'meals', label: 'Plats', icon: ChefHat },
            { key: 'recipes', label: 'Recettes', icon: Book },
            { key: 'restaurants', label: 'Restaurants', icon: MapPin },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTab(tab.key as any);
                  setFormData({});
                  setEditItemId(null);
                  setImagePreview(null);
                  setAliases([]);
                  setEtapes([]);
                  setIngredients([]);
                  setMealRestaurants([]);
                  setUserMeals([]);
                }}
                className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-t-lg transition-colors duration-200 ${
                  activeTab === tab.key
                    ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                    : 'bg-card hover:bg-accent/10 text-muted-foreground'
                }`}
              >
                <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm sm:text-base">{tab.label}</span>
              </button>
            );
          })}
        </div>
        <div className="card-cameroon p-6 sm:p-8 rounded-lg shadow-md">
          <h2 className="font-noto-serif font-bold text-xl sm:text-2xl text-primary mb-6">
            Gestion des {activeTab === 'users' ? 'utilisateurs' : activeTab === 'meals' ? 'plats' : activeTab === 'recipes' ? 'recettes' : 'restaurants'}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="card-cameroon p-4 sm:p-6 rounded-lg shadow-sm">
              <h3 className="font-noto-serif font-bold text-lg sm:text-xl mb-4">
                {editItemId ? 'Modifier un élément' : 'Ajouter un nouvel élément'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {renderForm()}
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2" />
                        {editItemId ? 'Modification...' : 'Ajout...'}
                      </>
                    ) : (
                      editItemId ? 'Modifier' : 'Ajouter'
                    )}
                  </button>
                  {editItemId && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({});
                        setEditItemId(null);
                        setImagePreview(null);
                        setAliases([]);
                        setEtapes([]);
                        setIngredients([]);
                        setMealRestaurants([]);
                        setUserMeals([]);
                      }}
                      className="btn-secondary w-full"
                      disabled={isLoading}
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>
            <div className="card-cameroon p-4 sm:p-6 rounded-lg shadow-sm">
              <h3 className="font-noto-serif font-bold text-lg sm:text-xl mb-4">Éléments existants</h3>
              {isLoading ? (
                <div className="flex justify-center">
                  <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
                </div>
              ) : (
                renderList()
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatbotPanel isOpen={isChatbotOpen} onToggle={() => setIsChatbotOpen(!isChatbotOpen)} />
    </div>
  );
};

export default AdminDashboard;
