import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, BookOpen, Heart, Key, Star, Rocket } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import LoginModal from '../components/modals/LoginModal';
import RegisterModal from '../components/modals/RegisterModal';
import { useAuth } from '../context/AuthContext';

const testimonials = [
  {
    name: 'Marie Kamga',
    location: 'Douala',
    photo: '/api/placeholder/80/80',
    text: "DishTrad m'a reconnectée au Ndolé de mon enfance ! Les recettes sont authentiques et les restaurants recommandés excellents."
  },
  {
    name: 'Paul Biya Jr.',
    location: 'Yaoundé',
    photo: '/api/placeholder/80/80',
    text: "Grâce à DishTrad, j'ai découvert des variantes de l'Eru que je ne connaissais pas. Une vraie richesse culinaire !"
  },
  {
    name: 'Aminata Sow',
    location: 'Paris',
    photo: '/api/placeholder/80/80',
    text: "Expatriée, DishTrad me permet de retrouver les saveurs du Cameroun et de transmettre notre culture à mes enfants."
  }
];

const features = [
  {
    icon: Search,
    title: 'Recherche intuitive',
    description: 'Trouvez plats par nom, région, ou ingrédient grâce à notre moteur de recherche intelligent.'
  },
  {
    icon: MapPin,
    title: 'Restaurants vivants',
    description: 'Menus authentiques, localisations précises et évaluations de la communauté.'
  },
  {
    icon: BookOpen,
    title: 'Recettes immersives',
    description: 'Étapes claires, vidéos détaillées et secrets des chefs camerounais.'
  },
  {
    icon: Heart,
    title: 'Favoris personnalisés',
    description: 'Créez votre collection culinaire et partagez vos découvertes avec la communauté.'
  }
];

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleExploreClick = () => {
    if (!isAuthenticated) {
      setIsLoginOpen(true);
    } else {
      window.location.href = '/home';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Logo fixe */}
      <div className="fixed top-3 left-6 z-50">
        <Logo size="medium" />
      </div>

      {/* Bannière Hero avec Gradient */}
      <section className="relative h-112 md:h-144 overflow-hidden">
        {/* Gradient Background with Cameroonian Colors */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-green-600 via-red-600 to-yellow-400"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #008000 33.33%, #FF0000 33.33%, #FF0000 66.66%, #FFC107 66.66%),
              url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cpath d='M50 15 L59.8 35.2 L80 35.2 L63.6 47.8 L73.2 68 L50 55.2 L26.8 68 L36.4 47.8 L20 35.2 L40.2 35.2 Z' fill='%23FFD700'/%3E%3C/svg%3E")`,
            backgroundSize: 'cover, 50px 50px',
            backgroundPosition: 'center, center',
            backgroundRepeat: 'no-repeat, repeat',
            opacity: 0.9,
          }}
        />

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        {/* Contenu Hero */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="max-w-2xl transform rotate-organic-3 origin-left"
            >
              <h1 className="font-noto-serif font-bold text-3xl md:text-5xl text-white text-shadow-cameroon mb-4">
                DishTrad : Un voyage culinaire vibrant
              </h1>
              <p className="font-kameron text-lg md:text-xl text-white/90 mb-8 text-shadow-warm">
                Découvrez des plats authentiques, des recettes vivantes, et des restaurants locaux
                dans une expérience immersive unique de la cuisine camerounaise.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="btn-primary btn-pulse flex items-center gap-2"
                  aria-label="Ouvrir modal connexion"
                >
                  <Key className="h-5 w-5" />
                  Connexion
                </button>
                <button
                  onClick={handleExploreClick}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Star className="h-5 w-5" />
                  Explorer maintenant
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section className="py-16 bg-warm-gradient">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-noto-serif font-bold text-3xl md:text-4xl text-primary mb-4 rotate-organic-2">
              Pourquoi DishTrad ?
            </h2>
            <p className="font-kameron text-lg text-muted-foreground max-w-2xl mx-auto">
              Une plateforme complète pour explorer, apprendre et savourer la richesse culinaire camerounaise
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="card-cameroon text-center group space-y-6"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-200">
                  <feature.icon className="h-12 w-12 text-accent mx-auto" />
                </div>
                <h3 className="font-noto-serif font-bold text-xl text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="font-kameron text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-16 md:py-20 lg:py-24 bg-accent/5 bg-pattern-wax">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-noto-serif font-bold text-responsive-title text-primary mb-6">
              Ils vibrent avec DishTrad
            </h2>
            <p className="font-kameron text-responsive-subtitle text-muted-foreground">
              Découvrez ce que notre communauté dit de DishTrad
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="card-cameroon text-center space-y-4"
              >
                <img
                  src={testimonial.photo}
                  alt={`Photo de ${testimonial.name}`}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-accent hover:scale-110 transition-transform duration-200"
                  loading="lazy"
                />
                <blockquote className="font-kameron italic text-muted-foreground mb-4">
                  "{testimonial.text}"
                </blockquote>
                <div>
                  <p className="font-noto-serif font-bold text-primary">
                    {testimonial.name}
                  </p>
                  <p className="font-kameron text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Appel à l'action */}
      <section className="py-16 md:py-20 lg:py-24 bg-vibrant-gradient text-white text-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-noto-serif font-bold text-responsive-title text-shadow-cameroon">
              Plongez dans la cuisine camerounaise !
            </h2>
            <p className="font-kameron text-responsive-subtitle text-white/90 max-w-3xl mx-auto">
              Rejoignez des milliers de passionnés et découvrez les secrets de notre gastronomie authentique
            </p>
            <button
              onClick={() => setIsRegisterOpen(true)}
              className="btn-secondary btn-pulse text-lg px-12 py-4 flex items-center gap-3 mx-auto"
              aria-label="Ouvrir modal inscription"
            >
              <Rocket className="h-6 w-6" />
              Rejoignez-nous maintenant
            </button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false);
          setIsRegisterOpen(true);
        }}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </div>
  );
};

export default LandingPage;
