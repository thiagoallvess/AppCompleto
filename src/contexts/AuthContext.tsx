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
    const savedProfile = localStorage.getItem('supabase_profile');
    return savedProfile ? JSON.parse(savedProfile) : null;
  });
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string, currentUser: User) => {
    console.log("[Auth] Buscando perfil para o ID:", userId);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error("[Auth] Erro na query de perfil:", error);
        throw error;
      }

      if (data) {
        console.log("[Auth] Perfil encontrado no banco:", data);
        const profileData = data as Profile;
        setProfile(profileData);
        localStorage.setItem('supabase_profile', JSON.stringify(profileData));
      } else {
        console.warn("[Auth] Perfil não encontrado no banco, usando metadados do usuário.");
        const tempProfile: Profile = {
          id: userId,
          first_name: currentUser.user_metadata?.first_name || 'Usuário',
          last_name: currentUser.user_metadata?.last_name || '',
          role: (currentUser.user_metadata?.role as UserRole) || 'cliente',
          avatar_url: null
        };
        setProfile(tempProfile);
        localStorage.setItem('supabase_profile', JSON.stringify(tempProfile));
      }
    } catch (err) {
      console.error('[Auth] Erro crítico ao buscar perfil:', err);
      setProfile({
        id: userId,
        first_name: currentUser.user_metadata?.first_name || 'Usuário',
        last_name: currentUser.user_metadata?.last_name || '',
        role: (currentUser.user_metadata?.role as UserRole) || 'cliente',
        avatar_url: null
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      console.log("[Auth] Inicializando sessão...");
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error("[Auth] Erro ao obter sessão inicial:", error);
        }
        
        const currentUser = session?.user ?? null;
        console.log("[Auth] Usuário atual:", currentUser?.email || "Nenhum");
        setUser(currentUser);
        
        if (currentUser) {
          await fetchProfile(currentUser.id, currentUser);
        } else {
          setProfile(null);
          localStorage.removeItem('supabase_profile');
          setLoading(false);
        }
      } catch (error) {
        console.error("[Auth] Erro na inicialização do Auth:", error);
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("[Auth] Evento de estado alterado:", event);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED') {
          if (currentUser) {
            await fetchProfile(currentUser.id, currentUser);
          } else {
            setLoading(false);
          }
        } else if (event === 'SIGNED_OUT') {
          console.log("[Auth] Usuário deslogado.");
          setProfile(null);
          localStorage.removeItem('supabase_profile');
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log("[Auth] Tentando login para:", email);
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error("[Auth] Erro no login:", error.message);
      setLoading(false);
      throw error;
    }
    console.log("[Auth] Login bem-sucedido para:", data.user?.email);
  };

  const signUp = async (email: string, password: string, metadata: any) => {
    console.log("[Auth] Tentando registro para:", email);
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { 
        data: metadata,
        emailRedirectTo: window.location.origin 
      },
    });
    if (error) {
      console.error("[Auth] Erro no registro:", error.message);
      setLoading(false);
      throw error;
    }
    console.log("[Auth] Registro concluído para:", data.user?.email);
  };

  const signOut = async () => {
    console.log("[Auth] Iniciando logout...");
    setLoading(true);
    localStorage.removeItem('supabase_profile');
    const { error } = await supabase.auth.signOut();
    setLoading(false);
    if (error) {
      console.error("[Auth] Erro no logout:", error.message);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};