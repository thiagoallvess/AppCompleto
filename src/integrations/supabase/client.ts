import { createClient } from '@supabase/supabase-js'

// Credenciais do projeto injetadas diretamente para garantir funcionamento imediato
const supabaseUrl = "https://arjktxxzuihsneovqjaq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyamt0eHh6dWloc25lb3ZxamFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcxMDQ2NjUsImV4cCI6MjA4MjY4MDY2NX0.s3kPScnjaMoKjDMLqHm6GxZGnzecImHSDVzW6ZTYgaw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);