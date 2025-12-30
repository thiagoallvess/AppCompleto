import { createClient } from '@supabase/supabase-js'

// No Dyad, as variáveis de ambiente são injetadas via import.meta.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Aviso: Variáveis de ambiente do Supabase não encontradas. Verifique sua configuração.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)