import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
  onClick?: () => void;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ 
  size = 'medium', 
  showText = true, 
  onClick, 
  className = '' 
}) => {
  const sizes = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12 md:h-16 md:w-16',
    large: 'h-16 w-16 md:h-20 md:w-20'
  };

  const textSizes = {
    small: 'text-lg',
    medium: 'text-xl md:text-2xl',
    large: 'text-2xl md:text-3xl'
  };

  // SVG de la feuille de Ndolé stylisée
  const LeafIcon = (
    <svg 
      viewBox="0 0 44 44" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizes[size]} text-primary`}
    >
      <path
        d="M22 4C16 4 12 8 12 14C12 20 16 24 22 24C28 24 32 20 32 14C32 8 28 4 22 4Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path
        d="M22 24C16 30 10 36 10 40C10 42 12 44 14 44C18 44 24 38 22 24Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M22 24C28 30 34 36 34 40C34 42 32 44 30 44C26 44 20 38 22 24Z"
        fill="currentColor"
        opacity="0.7"
      />
      <path
        d="M22 8C20 8 18 10 18 12C18 14 20 16 22 16C24 16 26 14 26 12C26 10 24 8 22 8Z"
        fill="hsl(var(--cameroon-yellow))"
        opacity="0.8"
      />
    </svg>
  );

  const LogoContent = (
    <div className={`logo-cameroon ${className}`} onClick={onClick}>
      {LeafIcon}
      {showText && (
        <span className={`font-noto-serif font-bold text-accent text-shadow-cameroon ${textSizes[size]}`}>
          DishTrad
        </span>
      )}
    </div>
  );

  return onClick ? (
    <button 
      onClick={onClick}
      className="focus-cameroon"
      aria-label="Logo DishTrad"
    >
      {LogoContent}
    </button>
  ) : (
    <Link 
      to="/" 
      className="focus-cameroon"
      aria-label="Retour à l'accueil DishTrad"
    >
      {LogoContent}
    </Link>
  );
};

export default Logo;