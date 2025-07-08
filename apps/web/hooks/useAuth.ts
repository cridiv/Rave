import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    setError(error?.message || null);
    return { data, error };
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    setError(error?.message || null);
    return { data, error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return { signUp, signIn, signOut, loading, error };
}
