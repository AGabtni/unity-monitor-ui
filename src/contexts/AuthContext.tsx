import { createContext, useContext, useState } from 'react';
import { authService } from '../services/authService';
import type { User, UserLogin } from '../types/auth';


type AuthContextType = {
  user: User | null;
  login: (credentials: UserLogin) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (credentials: UserLogin) => {
    const userData = await authService.login(credentials);
    setUser(userData);
    console.log(userData)
  };

  const logout = () => {
    authService.logout();
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
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};