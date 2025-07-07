
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import LandingPage from './pages/LandingPage';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import RestaurantPage from './pages/RestaurantPage';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';

import { AuthProvider, useAuth } from './context/AuthContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const ProtectedRoute: React.FC<{ children: React.ReactNode; adminOnly?: boolean }> = ({
  children,
  adminOnly = false,
}) => {
  const { user, isAuthenticated } = useAuth();

  console.log('ProtectedRoute: user:', user, 'isAuthenticated:', isAuthenticated);

  if (!isAuthenticated) {
    console.log('ProtectedRoute: Redirection vers / car non authentifié');
    return <Navigate to="/" replace />;
  }

  if (adminOnly && (!user || user.role.toLowerCase() !== 'admin')) {
    console.log('ProtectedRoute: Redirection vers /home car pas admin ou user null');
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  console.log('AppRoutes: isAuthenticated:', isAuthenticated);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <Navigate to="/home" replace /> : <LandingPage />}
      />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recipe/:id"
        element={
          <ProtectedRoute>
            <RecipePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/restaurant/:id"
        element={
          <ProtectedRoute>
            <RestaurantPage />
          </ProtectedRoute>
        }
      />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-background">
              <AppRoutes />
              <Toaster />
              <Sonner position="top-right" />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
