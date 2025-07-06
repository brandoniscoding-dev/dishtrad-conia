import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id_user: number;
  username: string;
  email: string;
  role: 'standard' | 'admin';
  country?: string;
  birthdate?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('dishtrad_user');
    console.log('AuthContext: Chargement initial de localStorage - dishtrad_user:', storedUser);
    if (storedUser) {
      try {
        const userData: User = JSON.parse(storedUser);
        console.log('AuthContext: Données utilisateur parsées:', userData);
        if (userData.id_user && userData.username && userData.email && userData.role) {
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          console.error('AuthContext: Données utilisateur incomplètes dans localStorage');
          localStorage.removeItem('dishtrad_user');
        }
      } catch (error) {
        console.error('AuthContext: Erreur lors du parsing de dishtrad_user:', error);
        localStorage.removeItem('dishtrad_user');
      }
    }
  }, []);

  const login = (userData: User) => {
    console.log('AuthContext: Appel de login avec userData:', userData);
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('dishtrad_user', JSON.stringify(userData));
    console.log('AuthContext: localStorage mis à jour avec dishtrad_user:', JSON.stringify(userData));
  };

  const logout = () => {
    console.log('AuthContext: Déconnexion');
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('dishtrad_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      console.log('AuthContext: Mise à jour utilisateur:', updatedUser);
      setUser(updatedUser);
      localStorage.setItem('dishtrad_user', JSON.stringify(updatedUser));
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};