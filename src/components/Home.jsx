import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { MobileNav } from "./Sidebar";

export function Home({ onTabChange }) {
  const [points, setPoints] = useState(2480);
  const [message, setMessage] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // ── Rewards ──
  const rewards = [
    {
      id: 1,
      title: "Free birthday treat",
      description: "Choose any pastry on your special day.",
      points: 0,
      icon: "solar:crown-star-outline",
      badge: "Exclusive",
      badgeClass: "bg-accent/10 text-accent-foreground",
      iconClass: "bg-accent/10 text-accent",
      buttonText: "View reward",
      type: "birthday",
    },
    {
      id: 2,
      title: "$10 off your next visit",
      description: "A little thank-you for being with us.",
      points: 800,
      icon: "solar:cup-star-outline",
      badge: "800 points",
      badgeClass: "bg-primary/10 text-primary",
      iconClass: "bg-primary/10 text-primary",
      buttonText: "Redeem now",
      type: "points",
    },
  ];

  // ── Recent activity ──
  const recentActivity = [
    {
      id: 1,
      title: "Harbor Coffee",
      date: "Today, 9:42 AM",
      points: "+120",
      type: "earned",
      icon: "solar:cup-star-bold",
    },
    {
      id: 2,
      title: "Free coffee reward",
      date: "Yesterday",
      points: "-300",
      type: "spent",
      icon: "solar:gift-bold",
    },
  ];

  // ── Platinum progress ──
  const platinumGoal = 3000;
  const pointsToPlatinum = Math.max(platinumGoal - points, 0);
  const platinumProgress = Math.min(
    (points / platinumGoal) * 100,
    100
  );

  // ── Notification auto-dismiss ──
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  // ── Reward redemption ──
  const handleRedeem = (reward) => {
    if (reward.type === "birthday") {
      setSelectedReward(reward);
      return;
    }

    if (points < reward.points) {
      setMessage(
        `You need ${
          reward.points - points
        } more points to redeem ${reward.title}.`
      );
      return;
    }

    setPoints((currentPoints) => currentPoints - reward.points);
    setMessage(`${reward.title} redeemed successfully!`);
  };

  // ── Reward details ──
  const handleViewReward = (reward) => {
    setSelectedReward(reward);
  };

  // ── Invite friend ──
  const handleInviteFriend = async () => {
    const referralLink =
      "https://example.com/ref/MAYA-REWARD-2024";

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Join Maya Rewards",
          text:
            "Join me on the rewards program and get a free drink on your first order!",
          url: referralLink,
        });

        setMessage("Referral link shared successfully.");
      } else {
        await navigator.clipboard.writeText(referralLink);
        setMessage("Referral link copied.");
      }
    } catch {
      setMessage("Sharing was cancelled.");
    }
  };

  // ── Navigation ──
  const goToRewards = () => {
    onTabChange("rewards");
  };

  const goToWallet = () => {
    onTabChange("wallet");
  };

  return (
    <main className="w-full text-foreground pb-24 md:pb-8 min-h-screen">
      {/* ── Notification message ── */}
      {message && (
        <div className="fixed top-20 right-5 z-[60] max-w-sm">
          <div className="alert bg-card border border-border shadow-xl">
            <Icon
              icon="solar:check-circle-bold"
              className="size-5 text-accent"
            />
            <span className="text-sm font-medium">{message}</span>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl px-5 md:px-8 pt-6 pb-4 border-b border-border/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Maya Chen"
              className="size-12 md:size-14 rounded-full object-cover ring-2 ring-primary/20 shadow-sm"
            />

            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Good morning,
              </p>

              <p className="text-xl md:text-2xl font-semibold tracking-tight">
                Maya Chen{" "}
                <span className="ml-1 text-accent">✦</span>
              </p>
            </div>
          </div>

          <div className="relative">
            <button
              aria-label="Notifications"
              onClick={() =>
                setShowNotifications((current) => !current)
              }
              className="btn btn-circle btn-ghost btn-md relative border border-border bg-card shadow-sm hover:shadow-md"
            >
              <Icon
                icon="solar:bell-outline"
                className="size-6 text-foreground"
              />

              <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-primary ring-2 ring-card" />
            </button>

            {/* Notification panel */}
            {showNotifications && (
              <div className="absolute right-0 top-14 z-50 w-80 rounded-2xl border border-border bg-card p-4 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold">Notifications</h3>

                  <button
                    onClick={() =>
                      setShowNotifications(false)
                    }
                    className="btn btn-ghost btn-xs btn-circle"
                  >
                    <Icon
                      icon="solar:close-circle-outline"
                      className="size-5"
                    />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex gap-3 rounded-xl bg-muted/40 p-3">
                    <Icon
                      icon="solar:gift-bold"
                      className="size-5 text-accent shrink-0"
                    />

                    <div>
                      <p className="text-sm font-semibold">
                        Birthday reward available
                      </p>

                      <p className="text-xs text-muted-foreground mt-1">
                        Your birthday treat will be available
                        on October 21.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3 rounded-xl bg-muted/40 p-3">
                    <Icon
                      icon="solar:star-bold"
                      className="size-5 text-primary shrink-0"
                    />

                    <div>
                      <p className="text-sm font-semibold">
                        You're close to Platinum
                      </p>

                      <p className="text-xs text-muted-foreground mt-1">
                        Only {pointsToPlatinum} points to go.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="px-5 md:px-8 mt-6 space-y-16 lg:space-y-24">
        {/* ── Points banner ── */}
        <section className="rounded-3xl bg-gradient-to-br from-primary to-[#D64545] p-6 md:p-10 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
            <Icon
              icon="solar:crown-star-bold"
              className="size-64 -mr-16 -mt-16"
            />
          </div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80 mb-2">
                Available points
              </p>

              <div className="flex items-baseline gap-2">
                <p className="text-5xl md:text-6xl font-bold leading-none tracking-tight">
                  {points.toLocaleString()}
                </p>

                <span className="text-lg font-medium text-white/80">
                  pts
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/90">
                <span className="badge badge-outline border-white/40 bg-white/10 text-white py-3 px-4 font-bold">
                  Gold Member
                </span>

                <span className="font-medium">
                  {pointsToPlatinum} pts to Platinum
                </span>
              </div>
            </div>

            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <button
                onClick={() => setShowQrModal(true)}
                className="btn bg-white hover:bg-white/90 text-primary border-none shadow-md hover:shadow-lg rounded-2xl h-14"
                aria-label="Show QR code"
              >
                <Icon
                  icon="solar:qr-code-outline"
                  className="size-6"
                />
                Scan to earn
              </button>

              <div className="bg-black/10 rounded-2xl p-4 border border-white/10">
                <div className="mb-2 flex justify-between text-xs font-semibold text-white/90">
                  <span>Progress to Platinum</span>

                  <span>
                    {Math.round(platinumProgress)}%
                  </span>
                </div>

                <progress
                  className="progress bg-black/20 w-full"
                  value={platinumProgress}
                  max="100"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── Your Rewards ── */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">
              Your Rewards
            </h2>

            <button
              onClick={goToRewards}
              className="btn btn-ghost btn-sm text-primary font-bold hover:bg-primary/10"
            >
              See all
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="card bg-card border border-border shadow-sm hover:border-accent/30 transition-colors"
              >
                <div className="card-body p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`size-14 rounded-2xl ${reward.iconClass} flex items-center justify-center`}
                    >
                      <Icon
                        icon={reward.icon}
                        className="size-8"
                      />
                    </div>

                    <span
                      className={`badge border-none ${reward.badgeClass} font-bold py-3 px-3`}
                    >
                      {reward.badge}
                    </span>
                  </div>

                  <h3 className="card-title text-lg">
                    {reward.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mt-1 mb-4 flex-grow">
                    {reward.description}
                    {reward.type === "birthday" &&
                      " Available on October 21."}
                  </p>

                  <div className="card-actions mt-auto">
                    <button
                      onClick={() =>
                        reward.type === "birthday"
                          ? handleViewReward(reward)
                          : handleRedeem(reward)
                      }
                      className={`btn ${
                        reward.type === "birthday"
                          ? "btn-primary"
                          : "btn-dark"
                      } w-full`}
                    >
                      {reward.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Two-column: Earn more / Recent activity ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Earn more */}
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                Earn more points
              </h2>

              <button
                onClick={goToWallet}
                className="btn btn-ghost btn-sm text-primary font-bold hover:bg-primary/10"
              >
                Explore
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Shop */}
              <button
                onClick={goToWallet}
                className="card bg-card border border-border shadow-sm hover:border-primary/30 cursor-pointer group text-left"
              >
                <div className="card-body p-5">
                  <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon
                      icon="solar:cart-large-2-outline"
                      className="size-6 text-primary"
                    />
                  </div>

                  <h4 className="mt-4 text-base font-bold">
                    Shop this week
                  </h4>

                  <p className="mt-1 text-sm text-muted-foreground leading-snug">
                    Earn 2× points on essentials
                  </p>

                  <span className="mt-4 block text-sm font-bold text-primary">
                    +200 pts
                  </span>
                </div>
              </button>

              {/* Invite */}
              <button
                onClick={handleInviteFriend}
                className="card bg-card border border-border shadow-sm hover:border-accent/40 cursor-pointer group text-left"
              >
                <div className="card-body p-5">
                  <div className="size-12 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon
                      icon="solar:users-group-rounded-outline"
                      className="size-6 text-accent"
                    />
                  </div>

                  <h4 className="mt-4 text-base font-bold">
                    Invite a friend
                  </h4>

                  <p className="mt-1 text-sm text-muted-foreground leading-snug">
                    You both get a bonus
                  </p>

                  <span className="mt-4 block text-sm font-bold text-accent">
                    +500 pts
                  </span>
                </div>
              </button>
            </div>
          </section>

          {/* Recent activity */}
          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                Recent activity
              </h2>

              <button
                onClick={goToWallet}
                className="btn btn-ghost btn-sm text-primary font-bold hover:bg-primary/10"
              >
                View all
              </button>
            </div>

            <div className="card bg-card border border-border shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                {recentActivity.map((activity) => (
                  <button
                    key={activity.id}
                    onClick={() =>
                      setSelectedActivity(activity)
                    }
                    className="w-full flex items-center gap-4 p-5 hover:bg-muted/20 transition-colors text-left"
                  >
                    <div
                      className={`size-12 rounded-full flex items-center justify-center shrink-0 ${
                        activity.type === "earned"
                          ? "bg-accent/10"
                          : "bg-muted"
                      }`}
                    >
                      <Icon
                        icon={activity.icon}
                        className={`size-6 ${
                          activity.type === "earned"
                            ? "text-accent"
                            : "text-muted-foreground"
                        }`}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-base font-bold truncate">
                        {activity.title}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {activity.date}
                      </p>
                    </div>

                    <span
                      className={`text-sm font-bold px-3 py-1 rounded-full ${
                        activity.type === "earned"
                          ? "text-accent bg-accent/10"
                          : "text-muted-foreground bg-muted"
                      }`}
                    >
                      {activity.points}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* ── QR Modal ── */}
      {showQrModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-md rounded-3xl bg-card border border-border shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold">
                  Scan to earn
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Show this code at checkout.
                </p>
              </div>

              <button
                onClick={() => setShowQrModal(false)}
                className="btn btn-ghost btn-circle"
              >
                <Icon
                  icon="solar:close-circle-outline"
                  className="size-6"
                />
              </button>
            </div>

            <div className="flex justify-center">
              <div className="rounded-3xl bg-white p-6 shadow-inner">
                <Icon
                  icon="solar:qr-code-bold"
                  className="size-52 text-black"
                />
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="font-bold">MAYA-REWARD-2024</p>

              <p className="text-sm text-muted-foreground mt-1">
                Your loyalty account
              </p>
            </div>

            <button
              onClick={() => setShowQrModal(false)}
              className="btn btn-primary w-full mt-6 rounded-2xl"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* ── Reward details modal ── */}
      {selectedReward && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-md rounded-3xl bg-card border border-border shadow-2xl p-6">
            <div className="flex items-start justify-between">
              <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                <Icon
                  icon={selectedReward.icon}
                  className="size-8 text-accent"
                />
              </div>

              <button
                onClick={() => setSelectedReward(null)}
                className="btn btn-ghost btn-circle"
              >
                <Icon
                  icon="solar:close-circle-outline"
                  className="size-6"
                />
              </button>
            </div>

            <h2 className="text-2xl font-bold mt-6">
              {selectedReward.title}
            </h2>

            <p className="text-muted-foreground mt-2">
              {selectedReward.description}
            </p>

            <div className="rounded-2xl bg-accent/10 p-4 mt-6">
              <div className="flex items-center gap-3">
                <Icon
                  icon="solar:calendar-outline"
                  className="size-6 text-accent"
                />

                <div>
                  <p className="font-semibold">
                    Birthday reward
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Available on October 21, 2026.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedReward(null)}
              className="btn btn-primary w-full mt-6 rounded-2xl"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* ── Activity details modal ── */}
      {selectedActivity && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 px-5">
          <div className="w-full max-w-md rounded-3xl bg-card border border-border shadow-2xl p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Activity details
              </h2>

              <button
                onClick={() => setSelectedActivity(null)}
                className="btn btn-ghost btn-circle"
              >
                <Icon
                  icon="solar:close-circle-outline"
                  className="size-6"
                />
              </button>
            </div>

            <div className="mt-6 flex items-center gap-4">
              <div className="size-14 rounded-full bg-accent/10 flex items-center justify-center">
                <Icon
                  icon={selectedActivity.icon}
                  className="size-7 text-accent"
                />
              </div>

              <div>
                <p className="font-bold">
                  {selectedActivity.title}
                </p>

                <p className="text-sm text-muted-foreground">
                  {selectedActivity.date}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-muted/40 p-5">
              <p className="text-sm text-muted-foreground">
                Points
              </p>

              <p
                className={`text-3xl font-bold mt-1 ${
                  selectedActivity.type === "earned"
                    ? "text-accent"
                    : "text-foreground"
                }`}
              >
                {selectedActivity.points} pts
              </p>
            </div>

            <button
              onClick={() => setSelectedActivity(null)}
              className="btn btn-primary w-full mt-6 rounded-2xl"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ── Mobile navigation ── */}
      <MobileNav
        currentTab="home"
        onTabChange={onTabChange}
      />
    </main>
  );
}