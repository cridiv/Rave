import { createClient } from '@supabase/supabase-js';

// Aggressive clock skew fix - patch Date constructor itself
if (typeof window !== 'undefined') {
  const OriginalDate = Date;
  const CLOCK_SKEW_OFFSET = 60 * 60 * 1000; // 1 hour in milliseconds
  
  // Override Date constructor
  window.Date = function(this: any, ...args: any[]) {
    if (args.length === 0) {
      // new Date() - current time
      return new OriginalDate(OriginalDate.now() - CLOCK_SKEW_OFFSET);
    } else {
      // new Date(timestamp) or new Date(string) - keep original
      return new OriginalDate(...args);
    }
  } as any;
  
  // Copy static methods
  Object.setPrototypeOf(window.Date, OriginalDate);
  Object.defineProperty(window.Date, 'prototype', {
    value: OriginalDate.prototype,
    writable: false
  });
  
  // Override static methods
  window.Date.now = function() {
    return OriginalDate.now() - CLOCK_SKEW_OFFSET;
  };
  
  window.Date.parse = OriginalDate.parse;
  window.Date.UTC = OriginalDate.UTC;
  
  console.log('Clock skew fix applied - adjusted by 1 hour');
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      detectSessionInUrl: true,
      flowType: 'pkce',
      autoRefreshToken: true,
      persistSession: true
    }
  }
);
