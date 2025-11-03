import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://mdlyfulpiccxseusterb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kbHlmdWxwaWNjeHNldXN0ZXJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxOTgyNjIsImV4cCI6MjA3Nzc3NDI2Mn0.tGfPGwWns9qZGkOgd8jFb2WQhTLJ8t18wpJ6-A2W7qA';
export const supabase = createClient(supabaseUrl, supabaseKey);