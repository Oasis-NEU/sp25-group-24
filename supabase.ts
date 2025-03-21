import { createClient } from '@supabase/supabase-js';
import AsyncStorage from "@react-native-async-storage/async-storage";


const supabaseUrl = 'https://xpepiqseeozrqekdhgnp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhwZXBpcXNlZW96cnFla2RoZ25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0MjQ0OTUsImV4cCI6MjA1ODAwMDQ5NX0._oEm47pqWVKs4dxEMK4GKPw3cMAiQZpnm_66CSgm6Sc';

export const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },} ); 