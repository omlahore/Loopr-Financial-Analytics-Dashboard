import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as loginApi, getCurrentUser } from '../api/auth';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Validate token on mount and when token changes
  useEffect(() => {
    const validateToken = async () => {
      const storedToken = localStorage.getItem('token');
      
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        console.log('Validating token...');
        const response = await getCurrentUser();
        setUser(response.data);
        setToken(storedToken);
        console.log('Token validated successfully');
      } catch (error: any) {
        console.error('Token validation failed:', error);
        
        // Only clear token for 401 errors
        if (error.response?.status === 401) {
          console.log('Token expired or invalid, clearing...');
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginApi(email, password);
      const data = response.data;
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      console.log('Login successful, token stored');
    } catch (error: any) {
      console.error('Login failed:', error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    console.log('Logging out...');
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 