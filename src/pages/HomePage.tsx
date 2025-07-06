import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatbotPanel from '../components/ChatbotPanel';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

interface Meal {
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

const HomePage: React.FC = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('http://localhost:3000/meals');
        setMeals(response.data.data.slice(0, 9)); // Limite d'affichage
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des repas');
        setLoading(false);
        toast({ title: 'Erreur', description: 'Impossible de charger les plats', variant: 'destructive' });
      }
    };
    fetchMeals();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
      <Navbar />
      <main className="container mx-auto mt-16 px-6 py-8 space-y-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-amber-800 hover:text-orange-600 transition-colors duration-200 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à l'accueil
        </Link>
        <h1 className="font-noto-serif font-bold text-4xl text-amber-900 mb-8 text-center">
          Découvrez les Saveurs Authentiques du Cameroun
        </h1>
        {loading && <div className="text-center text-amber-800">Chargement...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}
        {!loading && meals.length === 0 && (
          <div className="text-center text-amber-800">Aucun plat disponible</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div
              key={meal.id_meal}
              onClick={() => setSelectedMeal(meal)}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              <img
                src={meal.MealImages?.[0]?.url ? `http://localhost:8080${meal.MealImages[0].url}` : '/api/placeholder/100/100'}
                alt={meal.official_name}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="p-6 space-y-3">
                <h3 className="font-noto-serif font-bold text-xl text-amber-900">
                  {meal.official_name}
                </h3>
                <p className="font-kameron text-gray-600 text-sm line-clamp-2">
                  {meal.description || 'Aucune description'}
                </p>
                <p className="font-kameron text-amber-700 text-sm">
                  Région: {meal.origin_region || 'Inconnue'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Dialog open={!!selectedMeal} onOpenChange={() => setSelectedMeal(null)}>
        <DialogContent className="sm:max-w-[600px] bg-white rounded-xl">
          <DialogHeader>
            <DialogTitle className="font-noto-serif text-2xl text-amber-900">
              {selectedMeal?.official_name}
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Détails du plat traditionnel camerounais
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <img
              src={selectedMeal?.MealImages?.[0]?.url ? `http://localhost:8080${selectedMeal.MealImages[0].url}` : '/api/placeholder/100/100'}
              alt={selectedMeal?.official_name}
              className="w-full h-64 object-cover rounded-lg"
              loading="lazy"
            />
            <p className="font-kameron text-gray-700">
              <strong>Description :</strong>{' '}
              {selectedMeal?.description || 'Aucune description'}
            </p>
            <p className="font-kameron text-amber-700">
              <strong>Région :</strong> {selectedMeal?.origin_region || 'Inconnue'}
            </p>
            {selectedMeal?.Recipes?.[0] && (
              <p className="font-kameron text-gray-700">
                <strong>Recette :</strong>{' '}
                <Link
                  to={`/recipe/${selectedMeal.Recipes[0].id_recipe}`}
                  className="text-amber-600 hover:text-amber-800 underline"
                >
                  Voir la recette ({selectedMeal.Recipes[0].title})
                </Link>
              </p>
            )}
            {selectedMeal?.Recipes?.[0]?.url_video && (
              <p className="font-kameron text-gray-700">
                <strong>Vidéo :</strong>{' '}
                <a
                  href={selectedMeal.Recipes[0].url_video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-800 underline flex items-center gap-1"
                >
                  Regarder la vidéo <ExternalLink className="h-4 w-4" />
                </a>
              </p>
            )}
            {selectedMeal?.Restaurants?.length > 0 && (
              <div className="space-y-2">
                <p className="font-kameron text-gray-700">
                  <strong>Disponible dans les restaurants :</strong>
                </p>
                <ul className="list-disc pl-5">
                  {selectedMeal.Restaurants.map((restaurant) => (
                    <li key={restaurant.id_restaurant}>
                      <Link
                        to={`/restaurant/${restaurant.id_restaurant}`}
                        className="text-amber-600 hover:text-amber-800 underline"
                      >
                        {restaurant.name} ({restaurant.city}, {restaurant.region}) - {restaurant.MealRestaurant.prix} XAF
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Footer />
      <ChatbotPanel
        isOpen={isChatbotOpen}
        onToggle={() => setIsChatbotOpen(!isChatbotOpen)}
      />
    </div>
  );
};

export default HomePage;