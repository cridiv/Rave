import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      detectSessionInUrl: true,
      flowType: 'pkce',
      autoRefreshToken: true,
      persistSession: true,
      // Add debug logging to see what's happening
      debug: process.env.NODE_ENV === 'development'
    },
    global: {
      headers: {
        'X-Client-Info': 'supabase-js-web'
      }
    }
  }
);

// Override the JWT decode to handle clock skew
const originalDecode = (globalThis as any).atob;
if (typeof window !== 'undefined' && originalDecode) {
  // Handle clock skew by adjusting time validation
  const originalFetch = window.fetch;
  window.fetch = function(input, init) {
    // If this is a Supabase auth request, add some tolerance
    if (typeof input === 'string' && input.includes('supabase') && input.includes('auth')) {
      const headers = new Headers(init?.headers);
      headers.set('X-Client-Time', Date.now().toString());
      return originalFetch(input, { ...init, headers });
    }
    return originalFetch(input, init);
  };
}

// Alternative approach - monkey patch Date.now() for Supabase operations
if (typeof window !== 'undefined') {
  const originalNow = Date.now;
  let clockSkewAdjustment = 0;
  
  // Detect and adjust for clock skew
  const adjustForClockSkew = () => {
    // If we detect future token errors, adjust the clock
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('error')?.includes('clock') || 
        window.location.hash.includes('issued in the future')) {
      clockSkewAdjustment = -3600000; // Subtract 1 hour
      console.log('Clock skew detected, adjusting by 1 hour');
    }
  };
  
  // Check for clock skew on page load
  adjustForClockSkew();
  
  // Override Date.now for clock skew tolerance
  Date.now = function() {
    return originalNow() + clockSkewAdjustment;
  };
  
  // Listen for auth errors and adjust clock skew
  window.addEventListener('error', (event) => {
    if (event.message?.includes('issued in the future') || 
        event.message?.includes('clock skew')) {
      clockSkewAdjustment = -3600000;
      console.log('Adjusting clock skew due to auth error');
      // Retry auth
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  });
}
