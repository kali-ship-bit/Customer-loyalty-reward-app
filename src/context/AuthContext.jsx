import { createContext, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";

const AuthContext = createContext(undefined);

// A fake "always logged in" user used only in PREVIEW MODE (no Supabase
// keys configured yet). This is what lets you skip the login page and land
// straight on the app to click through the screens.
const DEMO_USER = { id: "demo-user", email: "preview@loyaltyapp.demo" };

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Preview mode: skip real auth entirely, pretend we're already signed in.
      setSession({ user: DEMO_USER });
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signUp = async ({ email, password, fullName }) => {
    if (!isSupabaseConfigured) return { data: null, error: { message: "Preview mode — connect Supabase to enable real sign-up." } };
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    return { data, error };
  };

  const signIn = async ({ email, password }) => {
    if (!isSupabaseConfigured) return { data: null, error: { message: "Preview mode — connect Supabase to enable real login." } };
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  };

  const signOut = async () => {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
  };

  const updatePassword = async (newPassword) => {
    if (!isSupabaseConfigured) throw new Error("Preview mode — connect Supabase to enable this.");
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  };

  const resetPasswordForEmail = async (email) => {
    if (!isSupabaseConfigured) throw new Error("Preview mode — connect Supabase to enable this.");
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + "/login",
    });
    if (error) throw error;
  };

  const value = {
    session,
    user: session?.user ?? null,
    loading,
    isPreviewMode: !isSupabaseConfigured,
    signUp,
    signIn,
    signOut,
    updatePassword,
    resetPasswordForEmail,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
