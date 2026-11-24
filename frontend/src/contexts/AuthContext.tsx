import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<User>;
  logout: () => void;
  updateProfile: (data: { name?: string; phone?: string; newPassword?: string; currentPassword?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('royal_feast_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and verify session on load
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('royal_feast_token');
      if (savedToken) {
        try {
          const res = await api.get('/auth/profile');
          if (res.data.success && res.data.data) {
            setUser(res.data.data);
          }
        } catch {
          // Token expired or invalid
          localStorage.removeItem('royal_feast_token');
          setToken(null);
          setUser(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const res = await api.post('/auth/login', { email, password });
    if (res.data.success && res.data.data) {
      const { user: loggedInUser, token: authToken } = res.data.data;
      setUser(loggedInUser);
      setToken(authToken);
      localStorage.setItem('royal_feast_token', authToken);
      return loggedInUser;
    }
    throw new Error(res.data.message || 'Login failed');
  };

  const register = async (name: string, email: string, password: string, phone?: string): Promise<User> => {
    const res = await api.post('/auth/register', { name, email, password, phone });
    if (res.data.success && res.data.data) {
      const { user: registeredUser, token: authToken } = res.data.data;
      setUser(registeredUser);
      setToken(authToken);
      localStorage.setItem('royal_feast_token', authToken);
      return registeredUser;
    }
    throw new Error(res.data.message || 'Registration failed');
  };

  const logout = () => {
    localStorage.removeItem('royal_feast_token');
    setToken(null);
    setUser(null);
  };

  const updateProfile = async (data: { name?: string; phone?: string; newPassword?: string; currentPassword?: string }) => {
    const res = await api.put('/auth/profile', data);
    if (res.data.success && res.data.data) {
      setUser((prev) => (prev ? { ...prev, ...res.data.data } : null));
    } else {
      throw new Error(res.data.message || 'Failed to update profile');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
