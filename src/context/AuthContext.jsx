import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '../services/api';

const AuthContext = createContext(null);

const TOKEN_KEY = 'roy_token';
const USER_KEY = 'roy_user';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem(TOKEN_KEY) || null;
    } catch {
      return null;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(USER_KEY);
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sync token and user in localStorage
  useEffect(() => {
    try {
      if (token && user) {
        localStorage.setItem(TOKEN_KEY, token);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    } catch (e) {
      console.error('Failed writing auth session to localStorage', e);
    }
  }, [token, user]);

  /**
   * Log in user using credentials
   */
  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const res = await loginUser(username, password);

      const cleanName = username.trim();
      const displayName = cleanName.includes('@')
        ? cleanName.split('@')[0]
        : cleanName.charAt(0).toUpperCase() + cleanName.slice(1);

      const userProfile = {
        username: cleanName,
        displayName: displayName,
        email: cleanName.includes('@') ? cleanName : `${cleanName.toLowerCase()}@example.com`,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanName)}&backgroundColor=0f172a&textColor=ffffff`,
      };

      setToken(res.token);
      setUser(userProfile);

      return { success: true, user: userProfile, token: res.token };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user and immediately clear session
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      console.error('Error clearing auth storage', e);
    }
  };

  const value = {
    user,
    token,
    isAuthenticated: Boolean(token && user),
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
