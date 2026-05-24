import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * Server-only Supabase client (uses service_role key).
 * NEVER import this in client components — it bypasses RLS.
 * Only use inside Server Actions or Route Handlers.
 */
export function createServerClient() {
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      // Disable auto-refresh and session persistence — not needed server-side
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
