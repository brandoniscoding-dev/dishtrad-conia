import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { authService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { toast } from '@/hooks/use-toast';
import Logo from '../Logo';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    birthdate: '',
    country: 'Cameroon',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username) newErrors.username = "Nom d'utilisateur requis";
    else if (formData.username.length < 3) newErrors.username = 'Minimum 3 caractères';

    if (!formData.email) newErrors.email = 'Email requis';
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email))
      newErrors.email = 'Format email invalide';

    if (!formData.password) newErrors.password = 'Mot de passe requis';
    else if (formData.password.length < 6) newErrors.password = 'Minimum 6 caractères';

    if (!formData.country) newErrors.country = 'Pays requis';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await authService.register(formData);
      const response = await authService.login(formData.email, formData.password);
      console.log('RegisterModal: Réponse de /auth/login après inscription:', response.data);
      const userData = response.data; // Changement : utiliser response.data directement

      // Validation minimale : id_user requis
      if (!userData.id_user) {
        throw new Error('ID utilisateur manquant dans la réponse');
      }

      // Normaliser les données avec des valeurs par défaut
      const normalizedUserData = {
        id_user: userData.id_user,
        username: userData.username || formData.username || 'Utilisateur',
        email: userData.email || formData.email,
        role: userData.role || 'standard',
        country: userData.country || formData.country || null,
        birthdate: userData.birthdate || formData.birthdate || null,
      };

      login(normalizedUserData);

      toast({
        title: "Inscription réussie 🎉",
        description: `Bienvenue ${normalizedUserData.username} sur DishTrad`,
      });

      console.log('RegisterModal: Redirection vers:', normalizedUserData.role === 'admin' ? '/admin' : '/home');
      navigate(normalizedUserData.role === 'admin' ? '/admin' : '/home');
      onClose();
    } catch (error: any) {
      console.error('RegisterModal: Erreur inscription/connexion:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Une erreur est survenue';
      setErrors({ general: errorMessage });

      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ username: '', email: '', password: '', birthdate: '', country: 'Cameroon' });
    setErrors({});
    setShowPassword(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={handleClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-cameroon w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-cameroon">
              <div className="p-6 text-center border-b border-border/30">
                <Logo size="small" />
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 focus-cameroon"
                  aria-label="Fermer modal inscription"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                <h2 className="font-noto-serif font-bold text-2xl text-primary text-center mb-6">
                  Rejoindre DishTrad
                </h2>

                {errors.general && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 mb-4"
                  >
                    <p className="text-destructive text-sm text-center">{errors.general}</p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="register-username" className="block text-sm font-medium mb-2">
                      Nom d'utilisateur
                    </label>
                    <input
                      type="text"
                      id="register-username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Votre nom d'utilisateur"
                      className={`input-cameroon ${errors.username ? 'border-destructive' : ''}`}
                      disabled={isLoading}
                      required
                    />
                    {errors.username && (
                      <p className="text-destructive text-sm mt-1">{errors.username}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="register-email" className="block text-sm font-medium mb-2">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      id="register-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="votre@email.com"
                      className={`input-cameroon ${errors.email ? 'border-destructive' : ''}`}
                      disabled={isLoading}
                      required
                    />
                    {errors.email && (
                      <p className="text-destructive text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="register-password" className="block text-sm font-medium mb-2">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="register-password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Minimum 6 caractères"
                        className={`input-cameroon pr-12 ${errors.password ? 'border-destructive' : ''}`}
                        disabled={isLoading}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-muted/50 transition-colors duration-200"
                        aria-label={showPassword ? 'Masquer mot de passe' : 'Afficher mot de passe'}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-destructive text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="register-country" className="block text-sm font-medium mb-2">
                      Pays
                    </label>
                    <select
                      id="register-country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className={`input-cameroon ${errors.country ? 'border-destructive' : ''}`}
                      disabled={isLoading}
                      required
                    >
                      <option value="Cameroon">🇨🇲 Cameroun</option>
                      <option value="France">🇫🇷 France</option>
                      <option value="Canada">🇨🇦 Canada</option>
                      <option value="USA">🇺🇸 États-Unis</option>
                      <option value="Belgium">🇧🇪 Belgique</option>
                      <option value="Switzerland">🇨🇭 Suisse</option>
                      <option value="Other">🌍 Autre</option>
                    </select>
                    {errors.country && (
                      <p className="text-destructive text-sm mt-1">{errors.country}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="register-birthdate" className="block text-sm font-medium mb-2">
                      Date de naissance (optionnel)
                    </label>
                    <input
                      type="date"
                      id="register-birthdate"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleInputChange}
                      className="input-cameroon"
                      disabled={isLoading}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2" />
                        Inscription en cours...
                      </>
                    ) : (
                      'Créer un compte'
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="font-kameron text-muted-foreground">
                    Déjà un compte ?{' '}
                    <button
                      onClick={onSwitchToLogin}
                      className="text-accent hover:underline font-medium transition-colors duration-200 focus-cameroon"
                    >
                      Connectez-vous
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RegisterModal;