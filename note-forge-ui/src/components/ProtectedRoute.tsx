import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useDemoMode } from '../contexts/DemoContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const { isDemoMode } = useDemoMode();

  // Esperar a que se restaure la sesión desde localStorage antes de redirigir
  if (loading) return null;

  // Permitir acceso si está autenticado O si está en modo demo
  if (isAuthenticated || isDemoMode) {
    return <>{children}</>;
  }

  // Redirigir a login si no está autenticado ni en modo demo
  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
