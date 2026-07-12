import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '@/api/authClient';

const AuthContext = createContext();

const normalizeRole = (role) => {
  if (!role) return 'employee';
  const normalized = String(role).toLowerCase();
  if (['admin', 'administrator'].includes(normalized)) return 'admin';
  if (['manager', 'lead', 'teamlead'].includes(normalized)) return 'manager';
  return 'employee';
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  useEffect(() => {
    checkAppState();
  }, []);

  const checkAppState = async () => {
    setIsLoadingPublicSettings(true);
    setAuthError(null);

    try {
      await checkUserAuth();
      setAppPublicSettings({ id: 'ecosphere-demo', public_settings: { authRequired: true } });
    } catch (error) {
      console.error('App state check failed:', error);
      setAuthError({ type: 'unknown', message: error.message || 'Failed to load app' });
    } finally {
      setIsLoadingPublicSettings(false);
    }
  };

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);
      const currentUser = await db.auth.me();
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('User auth check failed:', error);
      setUser(null);
      setIsAuthenticated(false);
      if (error.status === 401 || error.status === 403) {
        setAuthError({ type: 'auth_required', message: 'Authentication required' });
      }
    } finally {
      setIsLoadingAuth(false);
      setAuthChecked(true);
    }
  };

  const logout = async (shouldRedirect = true) => {
    setUser(null);
    setIsAuthenticated(false);
    await db.auth.logout();

    if (shouldRedirect && typeof window !== 'undefined') {
      window.location.assign('/login');
    }
  };

  const navigateToLogin = () => {
    db.auth.redirectToLogin(window.location.href);
  };

  const hasRole = (requiredRoles = []) => {
    if (!requiredRoles.length) return true;
    const role = normalizeRole(user?.role);
    return requiredRoles.some((requiredRole) => normalizeRole(requiredRole) === role);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoadingAuth,
      isLoadingPublicSettings,
      authError,
      appPublicSettings,
      authChecked,
      logout,
      navigateToLogin,
      checkUserAuth,
      checkAppState,
      hasRole,
    }}>
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
