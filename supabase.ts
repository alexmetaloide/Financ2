import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface DbService {
  id: string;
  user_id: string;
  description: string;
  value: number;
  date: string;
  created_at?: string;
}

export interface DbWithdrawal {
  id: string;
  user_id: string;
  description: string;
  value: number;
  date: string;
  created_at?: string;
}
