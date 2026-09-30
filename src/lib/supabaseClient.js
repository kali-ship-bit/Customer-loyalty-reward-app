import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// True once real Supabase keys are added to .env. Until then, the app runs
// in PREVIEW MODE: no login required, no real saving — just the UI with
// sample data, so the team can click through every screen before the
// backend is connected.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn(
    "No Supabase env vars found — running in PREVIEW MODE (sample data, no login, nothing is saved). " +
      "Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env to connect the real backend."
  );
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
