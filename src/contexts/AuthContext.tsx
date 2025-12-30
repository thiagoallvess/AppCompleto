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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(() => {
    const savedProfile = localStorage.getItem('supabase_profile');
    return savedProfile ? JSON.parse(savedProfile) : null;
  });
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) throw error;

      if (data) {
        const profileData = data as Profile;
        setProfile(profileData);
        localStorage.setItem('supabase_profile', JSON.stringify(profileData));
      } else {
        // Se o usuário existe mas o perfil não foi criado no banco ainda (ex: delay no trigger)
        // Criamos um perfil temporário para não travar a UI
        const tempProfile: Profile = {
          id: userId,
          first_name: user?.user_metadata?.first_name || 'Usuário',
          last_name: user?.user_metadata?.last_name || '',
          role: (user?.user_metadata?.role as UserRole) || 'cliente',
          avatar_url: null
        };
        setProfile(tempProfile);
      }
    } catch (err) {
      console.error('Erro ao buscar perfil:', err);
      // Fallback em caso de erro de rede ou banco
      if (user) {
        setProfile({
          id: userId,
          first_name: 'Usuário',
          last_name: '',
          role: 'cliente',
          avatar_url: null
        });
      }
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        if (currentUser) {
          await fetchProfile(currentUser.id);
        } else {
          setProfile(null);
          localStorage.removeItem('supabase_profile');
        }
      } catch (error) {
        console.error("Erro na inicialização do Auth:", error);
      } finally {
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
            await fetchProfile(currentUser.id);
          }
        }
        
        if (event === 'SIGNED_OUT') {
          setProfile(null);
          localStorage.removeItem('supabase_profile');
        }
        
        setLoading(false);
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
      options: { 
        data: metadata,
        emailRedirectTo: window.location.origin 
      },
    });
    if (error) throw error;
  };

  const signOut = async () => {
    localStorage.removeItem('supabase_profile');
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};