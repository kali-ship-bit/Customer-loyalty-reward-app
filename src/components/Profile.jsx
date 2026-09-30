import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { MobileNav } from "./Sidebar";

export function Profile({ onTabChange }) {
  // ── Profile state ──
  const [profile, setProfile] = useState({
    name: "Maya Chen",
    email: "maya.chen@example.com",
    phone: "+1 (555) 123-4567",
  });

  const [draftProfile, setDraftProfile] = useState(profile);

  // ── Modal state ──
  const [activeModal, setActiveModal] = useState(null);

  // ── Notification message ──
  const [message, setMessage] = useState("");

  // ── Notification preferences ──
  const [notifications, setNotifications] = useState({
    rewards: true,
    promotions: true,
    activity: true,
  });

  // ── Payment methods ──
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "Visa",
      lastFour: "4242",
      expiry: "08/28",
      primary: true,
    },
    {
      id: 2,
      type: "Mastercard",
      lastFour: "8899",
      expiry: "11/27",
      primary: false,
    },
  ]);

  // ── Auto-dismiss notification ──
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  // ── Open profile editor ──
  const handleEditProfile = () => {
    setDraftProfile(profile);
    setActiveModal("personal");
  };

  // ── Save profile ──
  const handleSaveProfile = () => {
    setProfile(draftProfile);
    setActiveModal(null);
    setMessage("Profile information updated successfully.");
  };

  // ── Handle profile input ──
  const handleProfileChange = (field, value) => {
    setDraftProfile((current) => ({
      ...current,
      [field]: value,
    }));
  };

  // ── Notification toggle ──
  const toggleNotification = (type) => {
    setNotifications((current) => ({
      ...current,
      [type]: !current[type],
    }));
  };

  // ── Set primary payment method ──
  const handleSetPrimary = (id) => {
    setPaymentMethods((currentMethods) =>
      currentMethods.map((method) => ({
        ...method,
        primary: method.id === id,
      }))
    );

    setMessage("Primary payment method updated.");
  };

  // ── Remove payment method ──
  const handleRemovePayment = (id) => {
    setPaymentMethods((currentMethods) =>
      currentMethods.filter((method) => method.id !== id)
    );

    setMessage("Payment method removed.");
  };

  // ── Add payment method ──
  const handleAddPayment = () => {
    setMessage(
      "Payment method setup will be connected when backend integration is added."
    );
  };

  // ── Logout ──
  const handleLogout = () => {
    setActiveModal("logout");
  };

  const confirmLogout = () => {
    setActiveModal(null);
    setMessage("Logout action completed for this frontend demo.");
  };

  return (
    <main className="w-full text-foreground pb-24 md:pb-8 min-h-screen">
      {/* ── Success / Info notification ── */}
      {message && (
        <div className="fixed top-20 right-5 z-[70] max-w-sm">
          <div className="alert bg-white text-gray-900 border border-gray-200 shadow-xl">
  <Icon
    icon="solar:check-circle-bold"
    className="size-5 text-green-600 shrink-0"
  />

  <span className="text-sm font-medium">
    {message}
  </span>
</div>
        </div>
      )}

      {/* ── Header ── */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl px-5 md:px-8 pt-6 pb-4 border-b border-border/40">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Profile
          </h1>

          <button
            onClick={() => setActiveModal("settings")}
            className="btn btn-circle btn-ghost btn-md bg-card border border-border shadow-sm text-muted-foreground hover:text-foreground"
            aria-label="Settings"
          >
            <Icon
              icon="solar:settings-outline"
              className="size-6"
            />
          </button>
        </div>
      </header>

      <div className="px-5 md:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* ── Left: Avatar + Stats ── */}
          <div className="lg:col-span-4 space-y-8 lg:space-y-12">

            {/* Profile card */}
            <section className="card bg-card border border-border shadow-md">
              <div className="card-body p-8 flex flex-col items-center text-center">

                <div className="relative mb-6">
                  <div className="avatar">
                    <div className="w-32 rounded-full ring-4 ring-primary/20 ring-offset-4 shadow-md">
                      <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt={profile.name}
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleEditProfile}
                    className="btn btn-circle btn-primary btn-sm absolute bottom-0 right-0 shadow-md"
                    aria-label="Edit profile"
                  >
                    <Icon
                      icon="solar:pen-outline"
                      className="size-4"
                    />
                  </button>
                </div>

                <h2 className="text-2xl font-bold">
                  {profile.name}
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  {profile.email}
                </p>

                <p className="text-sm text-muted-foreground mt-1">
                  {profile.phone}
                </p>

                <div className="badge badge-lg bg-accent/10 text-accent-foreground border-none font-bold mt-4 p-4 gap-2">
                  <Icon
                    icon="solar:crown-star-outline"
                    className="size-5 text-accent"
                  />

                  Gold Member Since 2023
                </div>
              </div>
            </section>

            {/* Stats */}
            <section className="grid grid-cols-2 gap-4">
              <div className="card bg-card border border-border shadow-sm hover:border-accent/30 transition-colors">
                <div className="card-body p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Lifetime Points
                  </p>

                  <p className="mt-2 text-3xl font-bold text-accent">
                    12,450
                  </p>
                </div>
              </div>

              <div className="card bg-card border border-border shadow-sm hover:border-primary/20 transition-colors">
                <div className="card-body p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Rewards Claimed
                  </p>

                  <p className="mt-2 text-3xl font-bold text-primary">
                    48
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* ── Right: Settings menus ── */}
          <div className="lg:col-span-8 space-y-12 lg:space-y-16">

            {/* Account settings */}
            <section>
              <h3 className="font-bold text-lg mb-4">
                Account Settings
              </h3>

              <div className="card bg-card border border-border shadow-sm overflow-hidden">
                <div className="divide-y divide-border">

                  {/* Personal Information */}
                  <button
                    onClick={handleEditProfile}
                    className="w-full flex items-center justify-between p-5 hover:bg-muted/20 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-xl bg-input flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Icon
                          icon="solar:user-id-outline"
                          className="size-6"
                        />
                      </div>

                      <div className="text-left">
                        <span className="block text-base font-bold">
                          Personal Information
                        </span>

                        <span className="block text-sm text-muted-foreground mt-0.5">
                          Update your name, email, and phone number
                        </span>
                      </div>
                    </div>

                    <Icon
                      icon="solar:alt-arrow-right-outline"
                      className="size-5 text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  </button>

                  {/* Payment Methods */}
                  <button
                    onClick={() =>
                      setActiveModal("payments")
                    }
                    className="w-full flex items-center justify-between p-5 hover:bg-muted/20 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-xl bg-input flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Icon
                          icon="solar:card-outline"
                          className="size-6"
                        />
                      </div>

                      <div className="text-left">
                        <span className="block text-base font-bold">
                          Payment Methods
                        </span>

                        <span className="block text-sm text-muted-foreground mt-0.5">
                          Manage your saved cards and billing
                        </span>
                      </div>
                    </div>

                    <Icon
                      icon="solar:alt-arrow-right-outline"
                      className="size-5 text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  </button>

                  {/* Notifications */}
                  <button
                    onClick={() =>
                      setActiveModal("notifications")
                    }
                    className="w-full flex items-center justify-between p-5 hover:bg-muted/20 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-xl bg-input flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Icon
                          icon="solar:bell-bing-outline"
                          className="size-6"
                        />
                      </div>

                      <div className="text-left">
                        <span className="block text-base font-bold">
                          Notifications
                        </span>

                        <span className="block text-sm text-muted-foreground mt-0.5">
                          Choose what updates you want to receive
                        </span>
                      </div>
                    </div>

                    <Icon
                      icon="solar:alt-arrow-right-outline"
                      className="size-5 text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* Support & Privacy */}
            <section>
              <h3 className="font-bold text-lg mb-4">
                Support & Privacy
              </h3>

              <div className="card bg-card border border-border shadow-sm overflow-hidden">
                <div className="divide-y divide-border">

                  {/* Help */}
                  <button
                    onClick={() =>
                      setActiveModal("help")
                    }
                    className="w-full flex items-center justify-between p-5 hover:bg-muted/20 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-xl bg-input flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Icon
                          icon="solar:question-circle-outline"
                          className="size-6"
                        />
                      </div>

                      <div className="text-left">
                        <span className="block text-base font-bold">
                          Help & Support
                        </span>

                        <span className="block text-sm text-muted-foreground mt-0.5">
                          Get help with your account or orders
                        </span>
                      </div>
                    </div>

                    <Icon
                      icon="solar:alt-arrow-right-outline"
                      className="size-5 text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  </button>

                  {/* Privacy */}
                  <button
                    onClick={() =>
                      setActiveModal("privacy")
                    }
                    className="w-full flex items-center justify-between p-5 hover:bg-muted/20 transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="size-12 rounded-xl bg-input flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        <Icon
                          icon="solar:shield-warning-outline"
                          className="size-6"
                        />
                      </div>

                      <div className="text-left">
                        <span className="block text-base font-bold">
                          Privacy & Security
                        </span>

                        <span className="block text-sm text-muted-foreground mt-0.5">
                          Manage your data and security settings
                        </span>
                      </div>
                    </div>

                    <Icon
                      icon="solar:alt-arrow-right-outline"
                      className="size-5 text-muted-foreground group-hover:text-primary transition-colors"
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* Logout */}
            <section className="pt-2 pb-8">
              <button
                onClick={handleLogout}
                className="btn btn-error btn-outline w-full md:w-auto px-10 rounded-xl font-bold"
              >
                <Icon
                  icon="solar:logout-2-outline"
                  className="size-5"
                />

                Log Out
              </button>
            </section>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          PERSONAL INFORMATION MODAL
      ═══════════════════════════════════════════ */}
      {activeModal === "personal" && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-lg rounded-3xl bg-card border border-border shadow-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  Personal Information
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Update your profile details.
                </p>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="btn btn-ghost btn-circle"
              >
                <Icon
                  icon="solar:close-circle-outline"
                  className="size-6"
                />
              </button>
            </div>

            <div className="space-y-5">
              <label className="form-control">
                <span className="label-text font-semibold mb-2">
                  Full name
                </span>

                <input
                  type="text"
                  value={draftProfile.name}
                  onChange={(event) =>
                    handleProfileChange(
                      "name",
                      event.target.value
                    )
                  }
                  className="input input-bordered w-full bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                />
              </label>

              <label className="form-control">
                <span className="label-text font-semibold mb-2">
                  Email address
                </span>

                <input
                  type="email"
                  value={draftProfile.email}
                  onChange={(event) =>
                    handleProfileChange(
                      "email",
                      event.target.value
                    )
                  }
                  className="input input-bordered w-full bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                />
              </label>

              <label className="form-control">
                <span className="label-text font-semibold mb-2">
                  Phone number
                </span>

                <input
                  type="tel"
                  value={draftProfile.phone}
                  onChange={(event) =>
                    handleProfileChange(
                      "phone",
                      event.target.value
                    )
                  }
                  className="input input-bordered w-full bg-white text-gray-900 border-gray-300 placeholder:text-gray-400"
                />
              </label>
            </div>

            <div className="flex justify-end gap-3 mt-6">
  <button
    type="button"
    className="btn bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
    onClick={() => setActiveModal(null)}
  >
    Cancel
  </button>

  <button
    type="button"
    className="btn btn-primary"
    onClick={handleSaveProfile}
  >
    Save Changes
  </button>
</div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          PAYMENT METHODS MODAL
      ═══════════════════════════════════════════ */}
      {activeModal === "payments" && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-lg rounded-3xl bg-card border border-border shadow-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  Payment Methods
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Manage your saved payment methods.
                </p>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="btn btn-ghost btn-circle"
              >
                <Icon
                  icon="solar:close-circle-outline"
                  className="size-6"
                />
              </button>
            </div>

            <div className="space-y-3">
              {paymentMethods.length === 0 ? (
                <div className="text-center py-8">
                  <Icon
                    icon="solar:card-outline"
                    className="size-12 mx-auto text-muted-foreground"
                  />

                  <p className="font-semibold mt-3">
                    No payment methods
                  </p>

                  <p className="text-sm text-muted-foreground mt-1">
                    Add a payment method to get started.
                  </p>
                </div>
              ) : (
                paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="rounded-2xl border border-border p-4"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon
                            icon="solar:card-bold"
                            className="size-6 text-primary"
                          />
                        </div>

                        <div>
                          <p className="font-bold">
                            {method.type} ••••{" "}
                            {method.lastFour}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            Expires {method.expiry}
                          </p>
                        </div>
                      </div>

                      {method.primary && (
                        <span className="badge badge-sm bg-accent/10 text-accent border-none font-bold">
                          Primary
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2 mt-4">
                      {!method.primary && (
                        <button
                          onClick={() =>
                            handleSetPrimary(method.id)
                          }
                          className="btn btn-sm btn-outline flex-1"
                        >
                          Set primary
                        </button>
                      )}

                      <button
                        onClick={() =>
                          handleRemovePayment(method.id)
                        }
                        className="btn btn-sm btn-ghost text-error"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={handleAddPayment}
              className="btn btn-primary w-full mt-5"
            >
              <Icon
                icon="solar:add-circle-outline"
                className="size-5"
              />
              Add payment method
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          NOTIFICATIONS MODAL
      ═══════════════════════════════════════════ */}
      {activeModal === "notifications" && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-lg rounded-3xl bg-card border border-border shadow-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  Notifications
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Choose what updates you receive.
                </p>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="btn btn-ghost btn-circle"
              >
                <Icon
                  icon="solar:close-circle-outline"
                  className="size-6"
                />
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: "rewards",
                  title: "Reward updates",
                  description:
                    "Get notified about new rewards and redemptions.",
                },
                {
                  id: "promotions",
                  title: "Promotions",
                  description:
                    "Receive special offers and exclusive deals.",
                },
                {
                  id: "activity",
                  title: "Account activity",
                  description:
                    "Receive updates about your points and account.",
                },
              ].map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 rounded-2xl border border-border p-4"
                >
                  <div>
                    <p className="font-bold">
                      {item.title}
                    </p>

                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    className="toggle toggle-primary"
                    checked={notifications[item.id]}
                    onChange={() =>
                      toggleNotification(item.id)
                    }
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setActiveModal(null);
                setMessage(
                  "Notification preferences saved."
                );
              }}
              className="btn btn-primary w-full mt-6"
            >
              Save preferences
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          HELP MODAL
      ═══════════════════════════════════════════ */}
      {activeModal === "help" && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-lg rounded-3xl bg-card border border-border shadow-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  Help & Support
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  How can we help?
                </p>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="btn btn-ghost btn-circle"
              >
                <Icon
                  icon="solar:close-circle-outline"
                  className="size-6"
                />
              </button>
            </div>

            <div className="space-y-3">
              {[
                {
                  icon: "solar:question-circle-outline",
                  title: "Frequently Asked Questions",
                  text: "Find answers to common questions.",
                },
                {
                  icon: "solar:chat-round-outline",
                  title: "Contact Support",
                  text: "Talk to our customer support team.",
                },
                {
                  icon: "solar:document-text-outline",
                  title: "Rewards Guide",
                  text: "Learn how the rewards program works.",
                },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() =>
                    setMessage(
                      `${item.title} will be connected in a future version.`
                    )
                  }
                  className="w-full flex items-center gap-4 rounded-2xl border border-border p-4 text-left hover:bg-muted/20 transition-colors"
                >
                  <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon
                      icon={item.icon}
                      className="size-6 text-primary"
                    />
                  </div>

                  <div>
                    <p className="font-bold">
                      {item.title}
                    </p>

                    <p className="text-sm text-muted-foreground mt-1">
                      {item.text}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          PRIVACY MODAL
      ═══════════════════════════════════════════ */}
      {activeModal === "privacy" && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-lg rounded-3xl bg-card border border-border shadow-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  Privacy & Security
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Manage your security preferences.
                </p>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="btn btn-ghost btn-circle"
              >
                <Icon
                  icon="solar:close-circle-outline"
                  className="size-6"
                />
              </button>
            </div>

            <div className="space-y-3">
              <div className="rounded-2xl border border-border p-4">
                <div className="flex gap-3">
                  <Icon
                    icon="solar:lock-keyhole-outline"
                    className="size-6 text-primary shrink-0"
                  />

                  <div>
                    <p className="font-bold">
                      Account security
                    </p>

                    <p className="text-sm text-muted-foreground mt-1">
                      Your account security controls will be
                      connected to authentication later.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border p-4">
                <div className="flex gap-3">
                  <Icon
                    icon="solar:shield-check-outline"
                    className="size-6 text-accent shrink-0"
                  />

                  <div>
                    <p className="font-bold">
                      Data protection
                    </p>

                    <p className="text-sm text-muted-foreground mt-1">
                      Privacy and data-management controls
                      will be handled through the backend
                      integration.
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border p-4">
                <div className="flex gap-3">
                  <Icon
                    icon="solar:password-outline"
                    className="size-6 text-primary shrink-0"
                  />

                  <div>
                    <p className="font-bold">
                      Change password
                    </p>

                    <p className="text-sm text-muted-foreground mt-1">
                      Password management will be connected
                      when authentication is implemented.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="btn btn-primary w-full mt-6"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          SETTINGS MODAL
      ═══════════════════════════════════════════ */}
      {activeModal === "settings" && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-md rounded-3xl bg-card border border-border shadow-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  Settings
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Quick account settings.
                </p>
              </div>

              <button
                onClick={() => setActiveModal(null)}
                className="btn btn-ghost btn-circle"
              >
                <Icon
                  icon="solar:close-circle-outline"
                  className="size-6"
                />
              </button>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleEditProfile}
                className="w-full flex items-center gap-4 rounded-2xl border border-border p-4 text-left hover:bg-muted/20"
              >
                <Icon
                  icon="solar:user-outline"
                  className="size-6 text-primary"
                />

                <span className="font-semibold">
                  Edit profile
                </span>
              </button>

              <button
                onClick={() =>
                  setActiveModal("notifications")
                }
                className="w-full flex items-center gap-4 rounded-2xl border border-border p-4 text-left hover:bg-muted/20"
              >
                <Icon
                  icon="solar:bell-outline"
                  className="size-6 text-primary"
                />

                <span className="font-semibold">
                  Notification preferences
                </span>
              </button>

              <button
                onClick={() =>
                  setActiveModal("privacy")
                }
                className="w-full flex items-center gap-4 rounded-2xl border border-border p-4 text-left hover:bg-muted/20"
              >
                <Icon
                  icon="solar:shield-outline"
                  className="size-6 text-primary"
                />

                <span className="font-semibold">
                  Privacy & security
                </span>
              </button>
            </div>

            <button
              onClick={() => setActiveModal(null)}
              className="btn btn-ghost w-full mt-6"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          LOGOUT CONFIRMATION
      ═══════════════════════════════════════════ */}
      {activeModal === "logout" && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-md rounded-3xl bg-card border border-border shadow-2xl p-6 md:p-8 text-center">
            <div className="size-14 rounded-full bg-error/10 text-error mx-auto flex items-center justify-center">
              <Icon
                icon="solar:logout-2-outline"
                className="size-7"
              />
            </div>

            <h2 className="text-xl font-bold mt-5">
              Log out?
            </h2>

            <p className="text-sm text-muted-foreground mt-2">
              Are you sure you want to log out of your account?
            </p>

            <div className="flex gap-3 mt-7">
              <button
                onClick={() => setActiveModal(null)}
                className="btn bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={confirmLogout}
                className="btn btn-error flex-1"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile navigation ── */}
      <MobileNav
        currentTab="profile"
        onTabChange={onTabChange}
      />
    </main>
  );
}