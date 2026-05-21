import { createClient } from '@supabase/supabase-js';

// Use environment variables or fallback to empty strings to avoid crashes during development
// before the user adds their actual credentials.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
