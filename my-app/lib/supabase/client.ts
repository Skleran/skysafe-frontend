import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Browser-safe Supabase client (uses anon key).
 * Use for future read-only / auth use cases on the client side.
 */
export const supabaseBrowserClient = createClient(supabaseUrl, supabaseAnonKey);
