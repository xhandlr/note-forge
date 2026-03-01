import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginUser, logoutUser, checkAuth } from '../services/LoginService';
import { registerUser } from '../services/RegistrationService';

interface User {
  id: number;
  email: string;
  username: string;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  login: (email: string, password: string, keepLoggedIn?: boolean) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Cargar usuario desde localStorage al montar
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error al parsear usuario desde localStorage:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  // Validar token contra backend después de cargar (solo al montar)
  useEffect(() => {
    const validateTokenWithBackend = async () => {
      const token = localStorage.getItem('token');
      const keepLoggedIn = localStorage.getItem('keepLoggedIn') === 'true';

      if (token && isAuthenticated) {
        try {
          const isValid = await checkAuth();
          if (!isValid) {
            // Token inválido
            if (keepLoggedIn) {
              // Si keepLoggedIn está activo, mantener sesión (backend la mantendrá)
              console.warn('Token validación falló pero keepLoggedIn está activo');
            } else {
              // Limpiar sesión si no está marcado keepLoggedIn
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              setUser(null);
              setIsAuthenticated(false);
            }
          }
        } catch (error) {
          console.error('Error validando token:', error);
          if (!keepLoggedIn) {
            // Solo limpiar si NO está keepLoggedIn
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      }
    };

    if (!loading && isAuthenticated) {
      validateTokenWithBackend();
    }
  }, [loading]);

  const login = async (email: string, password: string, keepLoggedIn: boolean = false) => {
    try {
      const formData = { email, password, keepLoggedIn };
      const data = await loginUser(formData);

      // Guardar token
      localStorage.setItem('token', data.token);

      // Guardar flag keepLoggedIn
      localStorage.setItem('keepLoggedIn', keepLoggedIn ? 'true' : 'false');

      // Guardar usuario básico (el backend retorna user parcial)
      const userData: User = {
        id: data.user.id,
        email: data.user.email,
        username: data.user.username || email.split('@')[0],
        role: data.user.role || 'student'
      };

      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      // Limpiar estado y localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('keepLoggedIn');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const register = async (userData: any) => {
    try {
      await registerUser(userData);
      // No hacer login automático, el usuario debe iniciar sesión manualmente
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    }
  };

  const value = {
    isAuthenticated,
    loading,
    user,
    login,
    logout,
    register,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
