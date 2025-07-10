import { createClient } from '@supabase/supabase-js'


export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      detectSessionInUrl: true,
      flowType: 'pkce',
      autoRefreshToken: true,
      persistSession: true,
      // Add this to help with OAuth callbacks
      redirectTo: `${window.location.origin}/chat` // or your desired redirect
    }
  }
);
