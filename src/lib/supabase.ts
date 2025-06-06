import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';


console.log('VITE_HOST:', import.meta.env.VITE_HOST);
console.log('key:', import.meta.env.VITE_KEY);
console.log('cloud:', import.meta.env.VITE_CLOUD);
console.log('preset:', import.meta.env.VITE_PRESET);


const supabaseUrl = import.meta.env.VITE_HOST || 'https://kubrirjahikgpwfzsepo.supabase.co';
const supabaseAnonKey = import.meta.env.key || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1YnJpcmphaGlrZ3B3ZnpzZXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1OTg0ODQsImV4cCI6MjA2NDE3NDQ4NH0.KlEmBfT1_-M8lxp2GQer5v6e3iGQZTmyEU0E4U04A-0';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);