import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ohykzesozqxzqeklpcht.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oeWt6ZXNvenF4enFla2xwY2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxMjE5ODMsImV4cCI6MjA1NDY5Nzk4M30.QeHiilXCePBWbUa95Bvz4c9mt6syKWEoLl1Cpm04OZQ';

export const supabase = createClient(supabaseUrl as string, supabaseAnonKey as string);