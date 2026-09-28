import React, { createContext, useContext, useState, useCallback } from 'react';
import { AuthRole, CurrentUser } from '../types';

type AuthScreen = 'role-select' | 'student-login' | 'manager-login' | null;

interface AuthContextType {
  currentUser: CurrentUser | null;
  authScreen: AuthScreen;
  login: (user: CurrentUser) => void;
  logout: () => void;
  goToStudentLogin: () => void;
  goToManagerLogin: () => void;
  goToRoleSelect: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [authScreen, setAuthScreen] = useState<AuthScreen>('role-select');

  const login = useCallback((user: CurrentUser) => {
    setCurrentUser(user);
    setAuthScreen(null); // null = authenticated, show the app
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setAuthScreen('role-select');
  }, []);

  const goToStudentLogin = useCallback(() => {
    setAuthScreen('student-login');
  }, []);

  const goToManagerLogin = useCallback(() => {
    setAuthScreen('manager-login');
  }, []);

  const goToRoleSelect = useCallback(() => {
    setAuthScreen('role-select');
  }, []);

  const isAuthenticated = currentUser !== null && authScreen === null;

  return (
    <AuthContext.Provider value={{
      currentUser,
      authScreen,
      login,
      logout,
      goToStudentLogin,
      goToManagerLogin,
      goToRoleSelect,
      isAuthenticated,
      isLoading: false,
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
