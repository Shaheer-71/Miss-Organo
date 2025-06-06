import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';


console.log('host:', import.meta.env.host);
console.log('key:', import.meta.env.key);
console.log('cloud:', import.meta.env.cloud);
console.log('preset:', import.meta.env.preset);


const supabaseUrl = import.meta.env.host || 'https://kubrirjahikgpwfzsepo.supabase.co';
const supabaseAnonKey = import.meta.env.key || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1YnJpcmphaGlrZ3B3ZnpzZXBvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1OTg0ODQsImV4cCI6MjA2NDE3NDQ4NH0.KlEmBfT1_-M8lxp2GQer5v6e3iGQZTmyEU0E4U04A-0';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);