import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

export type UserRole = 'admin' | 'motoboy' | 'cliente';

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  role: UserRole;
  avatar_url: string | null;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, metadata: { first_name: string; last_name: string; role?: UserRole }) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(() => {
    try {
      const savedProfile = localStorage.getItem('supabase_profile');
      return savedProfile ? JSON.parse(savedProfile) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string, currentUser: User) => {
    const fallbackProfile: Profile = {
      id: userId,
      first_name: currentUser.user_metadata?.first_name || 'Usuário',
      last_name: currentUser.user_metadata?.last_name || '',
      role: (currentUser.user_metadata?.role as UserRole) || 'cliente',
      avatar_url: null
    };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error("[Auth] Erro ao buscar perfil:", error.message);
        setProfile(fallbackProfile);
      } else if (data) {
        setProfile(data as Profile);
        localStorage.setItem('supabase_profile', JSON.stringify(data));
      } else {
        // Se não existe na tabela profiles, usa o metadata do Auth
        setProfile(fallbackProfile);
      }
    } catch (err) {
      setProfile(fallbackProfile);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          localStorage.removeItem('supabase_profile');
          setLoading(false);
          return;
        }

        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        if (currentUser) {
          await fetchProfile(currentUser.id, currentUser);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED') {
          if (currentUser) {
            setLoading(true);
            await fetchProfile(currentUser.id, currentUser);
          }
        } else if (event === 'SIGNED_OUT') {
          setProfile(null);
          setUser(null);
          localStorage.removeItem('supabase_profile');
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signUp = async (email: string, password: string, metadata: any) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    localStorage.removeItem('supabase_profile');
    await supabase.auth.signOut();
    setProfile(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};