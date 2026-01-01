import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext'; // Assuming this is where you have your context for supabase

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  signIn: (email: string, password: string, role: 'admin' | 'motoboy' | 'cliente') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userRole, setUserRole] = useState<'admin' | 'motoboy' | 'cliente'>('cliente');
  const router = useRouter();
  const { signIn } = useAuth();

  const handleSignIn = (email: string, password: string, role: 'admin' | 'motoboy' | 'cliente') => {
    // Sign in function that updates the userRole state
    signIn(email, password)
      .then(() => {
        setUserRole(role);
        router.push(`/${role.toLowerCase()}/perfil`);
      })
      .catch(error => {
        console.error("Failed to sign in:", error);
      });
  };

  return (
    <AuthContext.Provider value={{ signIn: handleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext) || ({} as AuthContextType);
};