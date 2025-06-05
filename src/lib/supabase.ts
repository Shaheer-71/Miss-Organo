import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';


console.log('host:', import.meta.env.host);
console.log('key:', import.meta.env.key);
console.log('cloud:', import.meta.env.cloud);
console.log('preset:', import.meta.env.preset);


const supabaseUrl = import.meta.env.host;
const supabaseAnonKey = import.meta.env.key;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);