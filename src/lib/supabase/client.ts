import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (
    !supabaseUrl ||
    !supabaseAnonKey ||
    supabaseUrl.includes('your-project') ||
    supabaseAnonKey.includes('your_supabase')
  ) {
    console.warn('Supabase environment variables not configured. Authentication will not work.');
    // Return a mock client that won't break the app
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithOAuth: () =>
          Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        signInWithOtp: () =>
          Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        signOut: () => Promise.resolve({ error: null }),
        exchangeCodeForSession: () =>
          Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      },
    } as any;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
