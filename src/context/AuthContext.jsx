import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '../services/api';

const AuthContext = createContext(null);

const TOKEN_KEY = 'aura_auth_token';
const USER_KEY = 'aura_auth_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(USER_KEY);
      const savedToken = localStorage.getItem(TOKEN_KEY);
      if (savedUser && savedToken) {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error('Failed reading auth from localStorage', e);
    }
    return null;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Sync token in localStorage
  useEffect(() => {
    if (user && user.token) {
      localStorage.setItem(TOKEN_KEY, user.token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }, [user]);

  /**
   * Log in user using credentials
   */
  const login = async (username, password) => {
    setIsLoading(true);
    try {
      const res = await loginUser(username.trim(), password.trim());
      
      // Construct user profile
      const userProfile = {
        username: username.trim(),
        name: username.trim() === 'mor_2314' ? 'Morrison David' : username.trim(),
        email: username.trim() === 'mor_2314' ? 'morrison@example.com' : `${username.trim()}@example.com`,
        token: res.token,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(username.trim())}&backgroundColor=4f46e5&textColor=ffffff`,
      };

      setUser(userProfile);
      return { success: true, user: userProfile };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout user and clear tokens
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user && user.token),
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
