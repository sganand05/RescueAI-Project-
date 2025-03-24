import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  name: string;
  role: string;
  organization?: string;
  phone: string;
  address: string;
  created_at?: string;
  updated_at?: string;
};

export type EmergencyReport = {
  id: string;
  user_id: string;
  type: string;
  location: string;
  description: string;
  image_url?: string;
  status: string;
  created_at?: string;
  updated_at?: string;
};

export type Donation = {
  id: string;
  donor_name: string;
  donation_type: string;
  amount_or_items: string;
  contact_info?: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
};

export type ResourceRequest = {
  id: string;
  user_id: string;
  resource_type: string;
  quantity: number;
  priority: string;
  description?: string;
  status: string;
  created_at?: string;
  updated_at?: string;
};