import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Map, Marker } from 'pigeon-maps';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Restaurant {
  id_restaurant: number;
  name: string;
  region: string;
  city: string;
  contact?: string;
  latitude?: number;
  longitude?: number;
}

const RestaurantPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/restaurants/${id}`);
        setRestaurant(response.data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement du restaurant');
        setRestaurant(null);
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  const pinIcon = (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"
        fill="#B45309"
      />
    </svg>
  );

  return (
    <>
      <style>
        {`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes scale-up {
            from { transform: scale(0.95); }
            to { transform: scale(1); }
          }
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100">
        <Navbar />
        {loading ? (
          <div className="text-center mt-16 text-amber-800 text-xl font-kameron animate-[pulse_1.5s_infinite]">
            Chargement...
          </div>
        ) : !restaurant || error ? (
          <div className="text-center mt-16 text-red-600 text-xl font-kameron">
            {error || 'Restaurant introuvable.'}
          </div>
        ) : (
          <main className="container mx-auto px-6 pt-24 pb-12 space-y-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-amber-800 hover:text-orange-600 transition-colors duration-200 font-kameron text-base"
              aria-label="Retour à l'accueil"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Link>
            <div className="bg-white rounded-xl shadow-lg p-8 animate-[fade-in_0.6s_ease-out] transition-all duration-300 hover:shadow-xl">
              <h1 className="text-4xl font-noto-serif font-bold text-amber-900 mb-6">
                {restaurant.name}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4 text-gray-700 font-kameron text-lg">
                  <p className="flex items-center gap-2">
                    <span className="text-amber-800 font-semibold">Région :</span>
                    {restaurant.region || 'Inconnue'}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-amber-800 font-semibold">Ville :</span>
                    {restaurant.city || 'Inconnue'}
                  </p>
                  {restaurant.contact && (
                    <p className="flex items-center gap-2">
                      <span className="text-amber-800 font-semibold">Contact :</span>
                      {restaurant.contact}
                    </p>
                  )}
                </div>
                {restaurant.latitude != null && restaurant.longitude != null ? (
                  <div className="h-96 rounded-xl overflow-hidden shadow-md border border-amber-200 animate-[scale-up_0.4s_ease-out]">
                    <Map
                      height={384}
                      center={[restaurant.latitude, restaurant.longitude]}
                      zoom={13}
                      provider={(x, y, z) => `https://tiles.stadiamaps.com/tiles/alidade_smooth/${z}/${x}/${y}.png`}
                      attribution={
                        <span className="text-xs text-gray-600">
                          © <a href="https://stadiamaps.com/">Stadia Maps</a>,{' '}
                          © <a href="https://openmaptiles.org/">OpenMapTiles</a>,{' '}
                          © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors
                        </span>
                      }
                    >
                      <Marker width={40} anchor={[restaurant.latitude, restaurant.longitude]}>
                        <div className="relative">
                          {pinIcon}
                          <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-white p-3 rounded-lg shadow-md border border-amber-200">
                            <span className="text-amber-900 font-kameron font-semibold">{restaurant.name}</span>
                          </div>
                        </div>
                      </Marker>
                    </Map>
                  </div>
                ) : (
                  <div className="h-96 flex items-center justify-center bg-gray-100 rounded-xl text-gray-600 font-kameron text-lg">
                    Aucune information de localisation disponible.
                  </div>
                )}
              </div>
            </div>
          </main>
        )}
        <Footer />
      </div>
    </>
  );
};

export default RestaurantPage;