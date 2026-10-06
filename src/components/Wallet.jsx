import { Icon } from "@iconify/react";
import { MobileNav } from "./Sidebar";
import { useAppData } from "../context/AppDataContext";

function formatDate(dateString) {
  if (!dateString) return "—";

  return new Date(dateString).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function Wallet() {
  const {
    profile,
    pointsHistory,
    redemptions,
    loading,
  } = useAppData();

  const points = profile?.pointsBalance ?? 0;

  return (
    <main className="w-full text-foreground pb-24 md:pb-8 min-h-screen">
      {/* Header */}
      <header className="px-5 md:px-8 pt-6 pb-6 border-b border-border/40">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Wallet
        </h1>

        <p className="text-muted-foreground mt-2">
          View your points balance and loyalty history.
        </p>
      </header>

      <div className="px-5 md:px-8 py-8 space-y-10">

        {/* Points Balance */}
        <section className="card bg-dark text-white shadow-xl">
          <div className="card-body p-8">
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-2xl bg-white/10 flex items-center justify-center">
                <Icon
                  icon="solar:wallet-money-outline"
                  className="size-7"
                />
              </div>

              <div>
                <p className="text-sm text-white/60">
                  Current points balance
                </p>

                <p className="text-4xl font-bold mt-1">
                  {points.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Points History */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold">
              Points history
            </h2>

            <p className="text-sm text-muted-foreground mt-1">
              Your points earned and spent.
            </p>
          </div>

          <div className="card bg-card border border-border shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-lg" />
              </div>
            ) : pointsHistory.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">
                No points history yet.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {pointsHistory.map((entry) => {
                  const rawPoints = Math.abs(entry.points ?? 0);

                  const isRedeemed =
                    entry.type?.toLowerCase() === "redeemed";

                  const pointsChange = isRedeemed
                    ? -rawPoints
                    : rawPoints;

                  return (
                    <div
                      key={entry._id}
                      className="flex items-center justify-between gap-4 p-5"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className={`size-10 rounded-full flex items-center justify-center shrink-0 ${
                            isRedeemed
                              ? "bg-red-100 text-red-600"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          <Icon
                            icon={
                              isRedeemed
                                ? "solar:arrow-down-outline"
                                : "solar:star-outline"
                            }
                            className="size-5"
                          />
                        </div>

                        <div className="min-w-0">
                          <p className="font-semibold">
                            {entry.description ||
                              (isRedeemed
                                ? "Points redeemed"
                                : "Points earned")}
                          </p>

                          <p className="text-sm text-muted-foreground mt-1">
                            {formatDate(entry.createdAt)}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`font-bold shrink-0 ${
                          pointsChange >= 0
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {pointsChange >= 0 ? "+" : ""}
                        {pointsChange.toLocaleString()} pts
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Redemption History */}
        <section>
          <div className="mb-4">
            <h2 className="text-xl font-bold">
              Redemption history
            </h2>

            <p className="text-sm text-muted-foreground mt-1">
              Rewards you have redeemed.
            </p>
          </div>

          <div className="card bg-card border border-border shadow-sm overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-10">
                <span className="loading loading-spinner loading-lg" />
              </div>
            ) : redemptions.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">
                No rewards redeemed yet.
              </div>
            ) : (
              <div className="divide-y divide-border">
                {redemptions.map((redemption) => (
                  <div
                    key={redemption._id}
                    className="flex items-center justify-between gap-4 p-5"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Icon
                          icon="solar:gift-outline"
                          className="size-5"
                        />
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold">
                          {redemption.reward?.name ||
                            redemption.rewardName ||
                            "Reward redeemed"}
                        </p>

                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDate(
                            redemption.createdAt ||
                              redemption.created_at
                          )}
                        </p>
                      </div>
                    </div>

                    <span className="font-bold text-red-500 shrink-0">
                      -
                      {(
                        redemption.pointsUsed ??
                        redemption.pointsRequired ??
                        0
                      ).toLocaleString()}{" "}
                      pts
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      <MobileNav />
    </main>
  );
}