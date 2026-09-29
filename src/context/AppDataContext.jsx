import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabaseClient";
import { useAuth } from "./AuthContext";
import {
  makeDemoProfile,
  demoRewards,
  demoVouchers,
  demoActivity,
  demoNotifications,
  demoPaymentMethods,
  makeDemoNotificationPrefs,
} from "../data/demoData";

const AppDataContext = createContext(undefined);

export function AppDataProvider({ children }) {
  if (!isSupabaseConfigured) {
    return <DemoAppDataProvider>{children}</DemoAppDataProvider>;
  }
  return <LiveAppDataProvider>{children}</LiveAppDataProvider>;
}

/* ============================================================
   PREVIEW MODE — everything lives in local React state only.
   Nothing is saved anywhere; refreshing the page resets it.
   Lets you click through every screen before Supabase is connected.
   ============================================================ */
function DemoAppDataProvider({ children }) {
  const [profile, setProfile] = useState(makeDemoProfile);
  const [rewards] = useState(demoRewards);
  const [activity, setActivity] = useState(demoActivity);
  const [vouchers, setVouchers] = useState(demoVouchers);
  const [redemptions, setRedemptions] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState(demoPaymentMethods);
  const [notificationPrefs, setNotificationPrefs] = useState(makeDemoNotificationPrefs);
  const [notifications, setNotifications] = useState(demoNotifications);

  const redeemReward = useCallback(
    async (rewardId) => {
      const reward = rewards.find((r) => r.id === rewardId);
      if (!reward) return { error: new Error("Reward not found") };
      if (profile.points_balance < reward.points_cost) {
        return { error: new Error("Not enough points to redeem this reward") };
      }
      setProfile((p) => ({ ...p, points_balance: p.points_balance - reward.points_cost }));
      setRedemptions((r) => [{ id: `demo-${Date.now()}`, reward_id: reward.id, reward_title: reward.title, points_spent: reward.points_cost, redeemed_at: new Date().toISOString() }, ...r]);
      setActivity((a) => [{ id: `demo-${Date.now()}`, title: `Redeemed ${reward.title}`, points_delta: -reward.points_cost, kind: "redeem", created_at: new Date().toISOString() }, ...a]);
      return { error: null };
    },
    [rewards, profile]
  );

  const useVoucher = useCallback(async (voucherId) => {
    const voucher = vouchers.find((v) => v.id === voucherId && v.is_active);
    if (!voucher) return { error: new Error("Voucher not found or already used") };
    setVouchers((vs) => vs.map((v) => (v.id === voucherId ? { ...v, is_active: false } : v)));
    setActivity((a) => [{ id: `demo-${Date.now()}`, title: `Used voucher: ${voucher.title}`, points_delta: 0, kind: "redeem", created_at: new Date().toISOString() }, ...a]);
    return { error: null };
  }, [vouchers]);

  const updateProfile = useCallback(async (fields) => {
    setProfile((p) => ({ ...p, ...fields }));
    return { error: null };
  }, []);

  const updateNotificationPrefs = useCallback(async (fields) => {
    setNotificationPrefs((p) => ({ ...p, ...fields }));
    return { error: null };
  }, []);

  const addPaymentMethod = useCallback(async (method) => {
    setPaymentMethods((pm) => [...pm, { id: `demo-${Date.now()}`, ...method }]);
    return { error: null };
  }, []);

  const removePaymentMethod = useCallback(async (id) => {
    setPaymentMethods((pm) => pm.filter((m) => m.id !== id));
    return { error: null };
  }, []);

  const setDefaultPaymentMethod = useCallback(async (id) => {
    setPaymentMethods((pm) => pm.map((m) => ({ ...m, is_default: m.id === id })));
    return { error: null };
  }, []);

  const submitSupportTicket = useCallback(async () => {
    // Preview mode — nothing is actually sent anywhere.
    return { error: null };
  }, []);

  const markNotificationRead = useCallback(async (id) => {
    setNotifications((ns) => ns.map((n) => (n.id === id ? { ...n, is_read: true } : n)));
    return { error: null };
  }, []);

  const markAllNotificationsRead = useCallback(async () => {
    setNotifications((ns) => ns.map((n) => ({ ...n, is_read: true })));
  }, []);

  const value = {
    profile,
    rewards,
    activity,
    vouchers,
    redemptions,
    paymentMethods,
    notificationPrefs,
    notifications,
    loading: false,
    isPreviewMode: true,
    refreshProfile: async () => {},
    redeemReward,
    useVoucher,
    updateProfile,
    updateNotificationPrefs,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
    submitSupportTicket,
    markNotificationRead,
    markAllNotificationsRead,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

/* ============================================================
   LIVE MODE — real Supabase-backed data (used once .env is set).
   ============================================================ */
function LiveAppDataProvider({ children }) {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [rewards, setRewards] = useState([]);
  const [activity, setActivity] = useState([]);
  const [vouchers, setVouchers] = useState([]);
  const [redemptions, setRedemptions] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [notificationPrefs, setNotificationPrefs] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
    setProfile(data);
  }, [user]);

  const refreshActivity = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("activity")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);
    setActivity(data ?? []);
  }, [user]);

  const refreshVouchers = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("vouchers")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setVouchers(data ?? []);
  }, [user]);

  const refreshRedemptions = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("redemptions")
      .select("*")
      .eq("user_id", user.id)
      .order("redeemed_at", { ascending: false });
    setRedemptions(data ?? []);
  }, [user]);

  const refreshPaymentMethods = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("payment_methods")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });
    setPaymentMethods(data ?? []);
  }, [user]);

  const refreshNotificationPrefs = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("notification_preferences")
      .select("*")
      .eq("user_id", user.id)
      .single();
    setNotificationPrefs(data);
  }, [user]);

  const refreshNotifications = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(30);
    setNotifications(data ?? []);
  }, [user]);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setRewards([]);
      setActivity([]);
      setVouchers([]);
      setRedemptions([]);
      setPaymentMethods([]);
      setNotificationPrefs(null);
      setNotifications([]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      setLoading(true);
      const [{ data: rewardsData }] = await Promise.all([
        supabase.from("rewards").select("*").order("points_cost", { ascending: true }),
      ]);
      if (cancelled) return;
      setRewards(rewardsData ?? []);
      await Promise.all([
        refreshProfile(),
        refreshActivity(),
        refreshVouchers(),
        refreshRedemptions(),
        refreshPaymentMethods(),
        refreshNotificationPrefs(),
        refreshNotifications(),
      ]);
      if (!cancelled) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const redeemReward = useCallback(
    async (rewardId) => {
      const { error } = await supabase.rpc("redeem_reward", { p_reward_id: rewardId });
      if (!error) {
        await Promise.all([refreshProfile(), refreshActivity(), refreshRedemptions()]);
      }
      return { error };
    },
    [refreshProfile, refreshActivity, refreshRedemptions]
  );

  const useVoucher = useCallback(
    async (voucherId) => {
      const { error } = await supabase.rpc("use_voucher", { p_voucher_id: voucherId });
      if (!error) {
        await Promise.all([refreshVouchers(), refreshActivity()]);
      }
      return { error };
    },
    [refreshVouchers, refreshActivity]
  );

  const updateProfile = useCallback(
    async (fields) => {
      if (!user) return { error: new Error("Not signed in") };
      const { error } = await supabase.from("profiles").update(fields).eq("id", user.id);
      if (!error) await refreshProfile();
      return { error };
    },
    [user, refreshProfile]
  );

  const updateNotificationPrefs = useCallback(
    async (fields) => {
      if (!user) return { error: new Error("Not signed in") };
      const { error } = await supabase
        .from("notification_preferences")
        .update(fields)
        .eq("user_id", user.id);
      if (!error) await refreshNotificationPrefs();
      return { error };
    },
    [user, refreshNotificationPrefs]
  );

  const addPaymentMethod = useCallback(
    async (method) => {
      if (!user) return { error: new Error("Not signed in") };
      const { error } = await supabase
        .from("payment_methods")
        .insert({ ...method, user_id: user.id });
      if (!error) await refreshPaymentMethods();
      return { error };
    },
    [user, refreshPaymentMethods]
  );

  const removePaymentMethod = useCallback(
    async (id) => {
      const { error } = await supabase.from("payment_methods").delete().eq("id", id);
      if (!error) await refreshPaymentMethods();
      return { error };
    },
    [refreshPaymentMethods]
  );

  const setDefaultPaymentMethod = useCallback(
    async (id) => {
      if (!user) return { error: new Error("Not signed in") };
      await supabase.from("payment_methods").update({ is_default: false }).eq("user_id", user.id);
      const { error } = await supabase
        .from("payment_methods")
        .update({ is_default: true })
        .eq("id", id);
      if (!error) await refreshPaymentMethods();
      return { error };
    },
    [user, refreshPaymentMethods]
  );

  const submitSupportTicket = useCallback(
    async ({ subject, message }) => {
      if (!user) return { error: new Error("Not signed in") };
      const { error } = await supabase
        .from("support_tickets")
        .insert({ subject, message, user_id: user.id });
      return { error };
    },
    [user]
  );

  const markNotificationRead = useCallback(
    async (id) => {
      const { error } = await supabase.from("notifications").update({ is_read: true }).eq("id", id);
      if (!error) await refreshNotifications();
      return { error };
    },
    [refreshNotifications]
  );

  const markAllNotificationsRead = useCallback(async () => {
    if (!user) return;
    await supabase.from("notifications").update({ is_read: true }).eq("user_id", user.id).eq("is_read", false);
    await refreshNotifications();
  }, [user, refreshNotifications]);

  const value = {
    profile,
    rewards,
    activity,
    vouchers,
    redemptions,
    paymentMethods,
    notificationPrefs,
    notifications,
    loading,
    isPreviewMode: false,
    refreshProfile,
    redeemReward,
    useVoucher,
    updateProfile,
    updateNotificationPrefs,
    addPaymentMethod,
    removePaymentMethod,
    setDefaultPaymentMethod,
    submitSupportTicket,
    markNotificationRead,
    markAllNotificationsRead,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const ctx = useContext(AppDataContext);
  if (ctx === undefined) throw new Error("useAppData must be used inside <AppDataProvider>");
  return ctx;
}
