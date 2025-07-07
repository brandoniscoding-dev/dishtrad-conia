import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';
import { toast } from '@/hooks/use-toast';
import Logo from '../Logo';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = 'Email requis';
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Format email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Minimum 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await authService.login(formData.email, formData.password);
      console.log('LoginModal: Réponse de /auth/login:', response.data);
      const userData = response.data; // Changement : utiliser response.data directement

      // Validation minimale : id_user requis
      if (!userData.id_user) {
        throw new Error('ID utilisateur manquant dans la réponse');
      }

      // Normaliser les données avec des valeurs par défaut
      const normalizedUserData = {
        id_user: userData.id_user,
        username: userData.username || 'Utilisateur',
        email: userData.email || formData.email,
        role: userData.role || 'standard',
        country: userData.country || null,
        birthdate: userData.birthdate || null,
      };

      login(normalizedUserData);

      toast({
        title: "Connexion réussie !",
        description: `Bienvenue ${normalizedUserData.username} sur DishTrad`,
      });

      console.log('LoginModal: Redirection vers:', normalizedUserData.role === 'admin' ? '/admin' : '/home');
      navigate(normalizedUserData.role === 'admin' ? '/admin' : '/home');
      onClose();
    } catch (error: any) {
      console.error('LoginModal: Erreur de connexion:', error);
      const errorMessage = error.response?.data?.error || error.message || 'Identifiants invalides';
      setErrors({ general: errorMessage });

      toast({
        title: "Erreur de connexion",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ email: '', password: '' });
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
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-cameroon w-full max-w-md">
              <div className="p-6 text-center border-b border-border/30">
                <Logo size="small" />
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200 focus-cameroon"
                  aria-label="Fermer modal connexion"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-6">
                <h2 className="font-noto-serif font-bold text-2xl text-primary text-center mb-6">
                  Connexion à DishTrad
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
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Adresse email
                    </label>
                    <input
                      type="email"
                      id="email"
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
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Votre mot de passe"
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

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full mr-2" />
                        Connexion en cours...
                      </>
                    ) : (
                      '🔑 Se connecter'
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <p className="font-kameron text-muted-foreground">
                    Pas encore de compte ?{' '}
                    <button
                      onClick={onSwitchToRegister}
                      className="text-accent hover:underline font-medium transition-colors duration-200 focus-cameroon"
                    >
                      Inscrivez-vous
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

export default LoginModal;