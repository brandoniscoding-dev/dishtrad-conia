import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, MapPin, BookOpen, Heart, Key, Star, Rocket } from 'lucide-react';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import LoginModal from '../components/modals/LoginModal';
import RegisterModal from '../components/modals/RegisterModal';
import { useAuth } from '../context/AuthContext';

// Images statiques pour le carrousel (en attendant les données API)
const carouselImages = [
  {
    url: '/api/placeholder/1400/700',
    alt: 'Ndolé traditionnel camerounais',
    title: 'Ndolé authentique'
  },
  {
    url: '/api/placeholder/1400/700', 
    alt: 'Poulet DG festif',
    title: 'Poulet DG royal'
  },
  {
    url: '/api/placeholder/1400/700',
    alt: 'Eru du Sud-Ouest',
    title: 'Eru traditionnel'
  },
  {
    url: '/api/placeholder/1400/700',
    alt: 'Koki vapeur',
    title: 'Koki authentique'
  },
  {
    url: '/api/placeholder/1400/700',
    alt: 'Achu sauce jaune',
    title: 'Achu délicieux'
  }
];

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  // Carrousel automatique
  useEffect(() => {
    if (isCarouselPaused) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isCarouselPaused]);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

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

      {/* Bannière Hero avec Carrousel */}
      <section 
        className="relative h-112 md:h-144 overflow-hidden bg-hero-gradient"
        onMouseEnter={() => setIsCarouselPaused(true)}
        onMouseLeave={() => setIsCarouselPaused(false)}
      >
        {/* Carrousel d'images */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={carouselImages[currentImageIndex].url}
              alt={carouselImages[currentImageIndex].alt}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </AnimatePresence>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

        {/* Flèches de navigation */}
        <button
          onClick={handlePrevious}
          className="carousel-arrow left-6"
          aria-label="Image précédente"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={handleNext}
          className="carousel-arrow right-6"
          aria-label="Image suivante"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

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

        {/* Indicateurs de carrousel */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentImageIndex 
                  ? 'bg-accent scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
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