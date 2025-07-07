import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const IconWhatsApp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#a7f3d0" // vert clair doux
    viewBox="0 0 24 24"
    width="20"
    height="20"
  >
    <path d="M20.52 3.48A11.917 11.917 0 0012 0C5.37 0 0 5.37 0 12a11.947 11.947 0 002.02 6.4L0 24l5.82-2.03A11.919 11.919 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.27-6.2-3.48-8.52zm-8.5 17.2a9.88 9.88 0 01-5.04-1.4l-.36-.22-3.47 1.21 1.17-3.37-.24-.35a9.84 9.84 0 01-1.49-5.3 9.88 9.88 0 0117.6-6.98 9.78 9.78 0 01-6.4 16.11z" />
    <path d="M16.8 14.87c-.26-.13-1.53-.75-1.77-.83-.24-.08-.42-.12-.6.13-.18.25-.7.83-.86 1-.16.16-.32.18-.58.06a7.48 7.48 0 01-2.21-1.36 8.29 8.29 0 01-1.53-1.9c-.16-.25-.02-.38.12-.5.12-.12.25-.32.37-.5.12-.16.16-.26.25-.42.08-.16.04-.31-.02-.43-.06-.13-.6-1.44-.82-1.96-.22-.52-.44-.45-.6-.46-.16 0-.34-.02-.52-.02a.73.73 0 00-.53.26c-.18.25-.69.67-.69 1.63 0 .96.71 1.9.8 2.03.1.12 1.37 2.08 3.32 2.9.46.2.82.32 1.1.41.46.15.88.13 1.21.08.37-.06 1.53-.62 1.74-1.22.21-.58.21-1.07.15-1.22-.06-.13-.22-.2-.48-.33z" />
  </svg>
);

const IconTwitter = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#a7f3d0"
    viewBox="0 0 24 24"
    width="20"
    height="20"
  >
    <path d="M23.954 4.569a10.026 10.026 0 01-2.825.775 4.936 4.936 0 002.163-2.723 9.867 9.867 0 01-3.127 1.195 4.917 4.917 0 00-8.373 4.482A13.938 13.938 0 011.671 3.15a4.917 4.917 0 001.523 6.574 4.897 4.897 0 01-2.228-.616c-.054 2.28 1.581 4.415 3.949 4.89a4.936 4.936 0 01-2.224.084 4.92 4.92 0 004.6 3.416 9.868 9.868 0 01-6.102 2.105c-.396 0-.788-.023-1.175-.067a13.945 13.945 0 007.557 2.212c9.054 0 14-7.496 14-13.986 0-.21 0-.423-.015-.633a9.936 9.936 0 002.459-2.548l.002-.003z" />
  </svg>
);

const IconInstagram = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#a7f3d0"
    viewBox="0 0 24 24"
    width="20"
    height="20"
  >
    <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 2A3.75 3.75 0 004 7.75v8.5A3.75 3.75 0 007.75 20h8.5a3.75 3.75 0 003.75-3.75v-8.5A3.75 3.75 0 0016.25 4h-8.5zm8.25 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-800 text-green-100 py-16 font-kameron">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* Logo + description */}
          <div className="md:w-1/3 text-center md:text-left">
            <Logo size="medium" showText />
            <p className="mt-5 max-w-md leading-relaxed text-green-200 font-semibold">
              Découvrez la richesse culinaire du Cameroun avec des recettes authentiques, des restaurants locaux et une expérience immersive unique.
            </p>
          </div>

          {/* Sections liens */}
          <div className="flex flex-col sm:flex-row gap-12 md:w-2/3 justify-between text-green-200">
            <section>
              <h3 className="font-noto-serif font-bold text-xl mb-5">À propos</h3>
              <ul className="space-y-3 text-lg">
                <li><button className="hover:underline hover:text-green-400">Notre mission</button></li>
                <li><button className="hover:underline hover:text-green-400">Équipe</button></li>
                <li><button className="hover:underline hover:text-green-400">Partenaires</button></li>
              </ul>
            </section>

            <section>
              <h3 className="font-noto-serif font-bold text-xl mb-5">Contact</h3>
              <ul className="space-y-3 text-lg">
                <li>
                  <a href="mailto:contact@dishtrad.com" className="hover:underline hover:text-green-400">
                    contact@dishtrad.com
                  </a>
                </li>
                <li>
                  <a href="tel:+237699123456" className="hover:underline hover:text-green-400">
                    +237 699 123 456
                  </a>
                </li>
                <li><button className="hover:underline hover:text-green-400">Support</button></li>
              </ul>
            </section>

            <section>
              <h3 className="font-noto-serif font-bold text-xl mb-5">Légal</h3>
              <ul className="space-y-3 text-lg">
                <li><button className="hover:underline hover:text-green-400">Conditions d'utilisation</button></li>
                <li><button className="hover:underline hover:text-green-400">Politique de confidentialité</button></li>
                <li><button className="hover:underline hover:text-green-400">Cookies</button></li>
              </ul>
            </section>
          </div>
        </div>

        {/* Bas du footer */}
        <div className="mt-16 pt-8 border-t border-green-600 flex flex-col md:flex-row justify-between items-center gap-6 text-green-200 font-semibold">
          <p className="text-center md:text-left text-sm select-none">
            © 2025 DishTrad. Tous droits réservés. Fait avec ❤️ au Cameroun.
          </p>

          <div className="flex items-center gap-3">
            <span className="font-noto-serif font-semibold text-lg">Suivez-nous :</span>

            <div className="flex gap-6">
              <a
                href="https://wa.me/237699123456"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp DishTrad"
                className="hover:opacity-80 transition"
              >
                <IconWhatsApp />
              </a>

              <a
                href="https://twitter.com/dishtrad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter DishTrad"
                className="hover:opacity-80 transition"
              >
                <IconTwitter />
              </a>

              <a
                href="https://instagram.com/dishtrad"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram DishTrad"
                className="hover:opacity-80 transition"
              >
                <IconInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
