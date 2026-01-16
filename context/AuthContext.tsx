import React, { createContext, useState, useContext, PropsWithChildren } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user for demonstration
const mockUser: User = {
  id: 'user_123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: UserRole.WHOLESALE_BUYER,
  loyaltyTier: 'Gold'
};

// FIX: Used PropsWithChildren to correctly type the component and resolve the error in App.tsx.
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    // In a real app, you'd fetch this or validate credentials
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
