import React, { useState } from 'react';
import { X, User, Heart, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Logo from '../Logo';
import { userService } from '../../services/api';
import { toast } from '@/hooks/use-toast';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, logout, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'favorites' | 'profile' | 'logout'>('favorites');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    country: user?.country || '',
    birthdate: user?.birthdate || ''
  });

  const handleLogout = () => {
    logout();
    onClose();
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt sur DishTrad !",
    });
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    try {
      await userService.update(user.id_user, formData);
      updateUser(formData);
      toast({
        title: "Profil mis à jour",
        description: "Vos modifications ont été enregistrées",
      });
    } catch (error) {
      console.error('Erreur de mise à jour:', error);
      toast({
        title: "Erreur de mise à jour",
        description: "Impossible de sauvegarder les modifications",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal container centré */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 min-h-screen"
            onClick={e => e.stopPropagation()}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <Logo size="small" />
                <button
                  onClick={onClose}
                  aria-label="Fermer modal profil"
                  className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex bg-primary text-primary-foreground font-semibold">
                {['favorites', 'profile', 'logout'].map(tab => {
                  const labels = {
                    favorites: 'Mes favoris',
                    profile: 'Mon profil',
                    logout: 'Déconnexion'
                  };
                  const icons = {
                    favorites: <Heart className="h-4 w-4 inline mr-2" />,
                    profile: <User className="h-4 w-4 inline mr-2" />,
                    logout: <LogOut className="h-4 w-4 inline mr-2" />,
                  };
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`flex-1 py-3 px-6 text-center transition-colors duration-200 ${
                        isActive ? 'bg-destructive text-white' : 'hover:bg-primary/80 text-primary-foreground'
                      }`}
                      type="button"
                    >
                      {icons[tab]} {labels[tab]}
                    </button>
                  );
                })}
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-primary scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
                <AnimatePresence mode="wait">
                  {activeTab === 'favorites' && (
                    <motion.div
                      key="favorites"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-noto-serif font-bold text-lg mb-4 text-primary">
                        Mes plats favoris
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="text-center py-8 col-span-full">
                          <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <p className="text-muted-foreground font-kameron">
                            Aucun favori pour le moment
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Explorez nos plats et ajoutez-les à vos favoris !
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'profile' && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-noto-serif font-bold text-lg mb-4 text-primary">
                        Modifier mon profil
                      </h3>
                      <form onSubmit={handleUpdateProfile} className="space-y-4">
                        {[
                          { label: "Nom d'utilisateur", name: 'username', type: 'text', required: true },
                          { label: "Email", name: 'email', type: 'email', required: true },
                        ].map(({ label, name, type, required }) => (
                          <div key={name}>
                            <label
                              htmlFor={name}
                              className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200"
                            >
                              {label}
                            </label>
                            <input
                              type={type}
                              id={name}
                              name={name}
                              value={(formData as any)[name]}
                              onChange={handleInputChange}
                              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm
                                         focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
                                         dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
                              required={required}
                              autoComplete="off"
                            />
                          </div>
                        ))}

                        <div>
                          <label
                            htmlFor="country"
                            className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200"
                          >
                            Pays
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm
                                       focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
                                       dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
                          >
                            <option value="">Sélectionner un pays</option>
                            <option value="Cameroon">Cameroun</option>
                            <option value="France">France</option>
                            <option value="Canada">Canada</option>
                            <option value="USA">États-Unis</option>
                            <option value="Other">Autre</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="birthdate"
                            className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-200"
                          >
                            Date de naissance
                          </label>
                          <input
                            type="date"
                            id="birthdate"
                            name="birthdate"
                            value={formData.birthdate}
                            onChange={handleInputChange}
                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm
                                       focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary
                                       dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isLoading}
                          className="btn-primary w-full flex justify-center items-center gap-2"
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full" />
                              Mise à jour...
                            </>
                          ) : (
                            'Sauvegarder les modifications'
                          )}
                        </button>
                      </form>
                    </motion.div>
                  )}

                  {activeTab === 'logout' && (
                    <motion.div
                      key="logout"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-noto-serif font-bold text-lg mb-4 text-primary">
                        Déconnexion
                      </h3>
                      <div className="text-center py-4">
                        <LogOut className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                        <p className="font-kameron mb-6">
                          Êtes-vous sûr de vouloir vous déconnecter ?
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={onClose}
                            className="btn-secondary flex-1"
                          >
                            Annuler
                          </button>
                          <button
                            onClick={handleLogout}
                            className="bg-destructive text-destructive-foreground flex-1 btn-cameroon hover:bg-destructive/90"
                          >
                            Se déconnecter
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
