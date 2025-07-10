import { createClient } from '@supabase/supabase-js';

// Fix clock skew BEFORE creating the client
if (typeof window !== 'undefined') {
  const originalNow = Date.now;
  
  // Always subtract 1 hour to handle clock skew
  Date.now = function() {
    return originalNow() - (60 * 60 * 1000); // Subtract 1 hour
  };
  
  // Also patch performance.now if it exists
  if (window.performance && window.performance.now) {
    const originalPerformanceNow = window.performance.now;
    window.performance.now = function() {
      return originalPerformanceNow() - (60 * 60 * 1000);
    };
  }
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      detectSessionInUrl: true,
      flowType: 'pkce',
      autoRefreshToken: true,
      persistSession: true,
      storageKey: 'sb-auth-token',
      // Disable automatic session refresh to avoid timing issues
      autoRefreshToken: false,
      debug: false
    },
    global: {
      headers: {
        'X-Client-Info': 'supabase-js-web'
      }
    }
  }
);

// Manual session refresh with proper timing
if (typeof window !== 'undefined') {
  // Set up manual token refresh every 50 minutes
  setInterval(async () => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (error) {
        console.log('Session refresh error:', error);
      }
    } catch (e) {
      console.log('Session refresh failed:', e);
    }
  }, 50 * 60 * 1000); // 50 minutes
}
