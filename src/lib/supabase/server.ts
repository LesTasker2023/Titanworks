import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createClient() {
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
        getUser: () => Promise.resolve({ data: { user: null }, error: null }),
        exchangeCodeForSession: () =>
          Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
      },
    } as any;
  }

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  });
}
