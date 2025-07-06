import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, User, Utensils, ExternalLink, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { useAuth } from '../context/AuthContext';
import ProfileModal from './modals/ProfileModal';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';

interface SearchResult {
  id: number;
  name: string;
  type: 'meal';
  image?: string;
  region?: string;
  description?: string;
  recipes?: { id_recipe: number; title: string; url_video?: string }[];
  restaurants?: {
    id_restaurant: number;
    name: string;
    region: string;
    city: string;
    prix: number;
  }[];
}

const Navbar: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<SearchResult | null>(null);

  const searchRef = useRef<HTMLDivElement>(null);

  const toggleProfileModal = () => setIsProfileOpen(prev => !prev);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearchQuery(''); // Vide le champ lorsque l'utilisateur appuie sur Entrée
      setShowSuggestions(false);
      toast({
        title: 'Recherche désactivée',
        description: 'La fonctionnalité de recherche est temporairement désactivée.',
        variant: 'default',
      });
    }
  };

  if (!isAuthenticated) return null;

  return (
    <>
      <nav className="nav-cameroon fixed top-0 left-0 right-0 h-20 z-50 bg-white dark:bg-gray-900 shadow-md">
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          <Logo size="medium" />
          <div className="hidden md:flex relative" ref={searchRef}>
            <div className="relative w-[32rem]">
              <motion.input
                type="text"
                value={searchQuery}
                onChange={handleSearchInput}
                onKeyDown={handleKeyDown}
                placeholder="Rechercher un met ou une saveur…"
                aria-label="Rechercher"
                className="w-full pl-12 pr-10 py-3 rounded-xl bg-white/90 border border-border focus:ring-2 focus:ring-accent focus:outline-none placeholder:text-muted-foreground shadow-sm transition-all text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-4">
            {user && (
              <button
                onClick={toggleProfileModal}
                className="flex items-center gap-2 p-2 rounded-full border-2 border-accent hover:scale-110 transition-transform"
                aria-label="Profil"
              >
                <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-accent-foreground" />
                </div>
              </button>
            )}
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            {isMenuOpen ? (
              <X className="h-7 w-7 text-primary-foreground" />
            ) : (
              <Menu className="h-7 w-7 text-primary-foreground" />
            )}
          </button>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed top-20 right-0 h-[calc(100vh-5rem)] w-80 bg-card shadow-xl border-l-4 border-accent z-40 dark:bg-gray-900"
            >
              <div className="p-6 space-y-6">
                <div className="relative" ref={searchRef}>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInput}
                    onKeyDown={handleKeyDown}
                    placeholder="Rechercher..."
                    className="input-cameroon w-full pl-10 text-black dark:text-white dark:bg-gray-800"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                {user && (
                  <button
                    onClick={() => {
                      toggleProfileModal();
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-organic hover:bg-accent/10 transition dark:hover:bg-accent/20"
                  >
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-accent-foreground" />
                    </div>
                    <div>
                      <p className="font-medium dark:text-white">{user.username}</p>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">{user.email}</p>
                    </div>
                  </button>
                )}
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="block p-3 rounded-organic hover:bg-accent/10 transition font-medium flex items-center gap-2 dark:hover:bg-accent/20"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    Administration
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <Dialog open={!!selectedMeal} onOpenChange={() => setSelectedMeal(null)}>
        <DialogContent className="sm:max-w-[600px] bg-white rounded-xl">
          <DialogHeader>
            <DialogTitle className="font-noto-serif text-2xl text-amber-900">
              {selectedMeal?.name}
            </DialogTitle>
            <DialogDescription className="text-gray-600 font-kameron">
              Détails du plat traditionnel camerounais
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {selectedMeal?.image && (
              <img
                src={selectedMeal.image}
                alt={selectedMeal.name}
                className="w-full h-64 object-cover rounded-lg"
                loading="lazy"
              />
            )}
            <p className="font-kameron text-gray-700">
              <strong>Description :</strong>{' '}
              {selectedMeal?.description || 'Aucune description disponible'}
            </p>
            <p className="font-kameron text-gray-700">
              <strong>Région :</strong> {selectedMeal?.region || 'Inconnue'}
            </p>
            {selectedMeal?.recipes?.[0] && (
              <p className="font-kameron text-gray-700">
                <strong>Recette :</strong>{' '}
                <Link
                  to={`/recipes/${selectedMeal.recipes[0].id_recipe}`}
                  className="text-amber-600 hover:text-amber-800 underline"
                >
                  Voir la recette ({selectedMeal.recipes[0].title})
                </Link>
              </p>
            )}
            {selectedMeal?.recipes?.[0]?.url_video && (
              <p className="font-kameron text-gray-700">
                <strong>Vidéo :</strong>{' '}
                <a
                  href={selectedMeal.recipes[0].url_video}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:text-amber-800 underline flex items-center gap-1"
                >
                  Regarder la vidéo <ExternalLink className="h-4 w-4" />
                </a>
              </p>
            )}
            {selectedMeal?.restaurants?.length > 0 && (
              <div className="space-y-2">
                <p className="font-kameron text-gray-700">
                  <strong>Disponible dans les restaurants :</strong>
                </p>
                <ul className="list-disc pl-5">
                  {selectedMeal.restaurants.map((restaurant) => (
                    <li key={restaurant.id_restaurant} className="font-kameron text-gray-700">
                      <Link
                        to={`/restaurants/${restaurant.id_restaurant}`}
                        className="text-amber-600 hover:text-amber-800 underline"
                      >
                        {restaurant.name} ({restaurant.city}, {restaurant.region}) - {restaurant.prix} XAF
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
};

export default Navbar;