import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { MobileNav } from "./Sidebar";

const rewards = [
  {
    id: 1,
    category: "Drinks",
    icon: "solar:cup-outline",
    label: "Extra Flavor Shot",
    description: "Vanilla, Caramel, Hazelnut",
    points: 150,
  },
  {
    id: 2,
    category: "Drinks",
    icon: "solar:cup-paper-outline",
    label: "Upsize to Large",
    description: "Any hot or iced beverage",
    points: 250,
  },
  {
    id: 3,
    category: "Food",
    icon: "solar:donut-outline",
    label: "Fresh Butter Croissant",
    description: "Baked daily in-house",
    points: 600,
  },
  {
    id: 4,
    category: "Drinks",
    icon: "solar:bag-heart-outline",
    label: "250g Whole Bean Coffee",
    description: "Single-origin Ethiopia",
    points: 1200,
  },
  {
    id: 5,
    category: "Drinks",
    icon: "solar:cup-outline",
    label: "Double Shot Espresso",
    description: "Rich espresso with an extra shot",
    points: 500,
  },
  {
    id: 6,
    category: "Accessories",
    icon: "solar:cup-outline",
    label: "Reusable Eco Cup",
    description: "Reusable coffee cup",
    points: 1200,
  },
];

export function Rewards({ onTabChange }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [points, setPoints] = useState(2480);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!message) return;
  
    const timer = setTimeout(() => {
      setMessage("");
    }, 3000);
  
    return () => clearTimeout(timer);
  }, [message]);

  const filteredRewards = rewards.filter((reward) => {

    const matchesCategory =
      selectedCategory === "All" ||
      reward.category === selectedCategory;

    const matchesSearch =
      reward.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reward.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const hasNoResults = filteredRewards.length === 0;

  const handleRedeem = (reward) => {
    if (points < reward.points) {
      setMessage("You don't have enough points to redeem this reward.");
      return;
    }
  
    setPoints(points - reward.points);
    setMessage(`${reward.label} redeemed successfully!`);
  };
  
  const milestoneGoal = 3000;
  const pointsToGo = Math.max(milestoneGoal - points, 0);
  const milestoneProgress = Math.min(
    (points / milestoneGoal) * 100,
    100
  );

  return (
    <main className="w-full text-foreground pb-24 md:pb-8 min-h-screen">
      {message && (
        <div className="fixed top-5 right-5 z-50 alert alert-success shadow-lg w-auto">
          <span>{message}</span>
          <button
            onClick={() => setMessage("")}
            className="btn btn-sm btn-ghost"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl px-5 md:px-8 pt-6 pb-4 border-b border-border/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

          <div className="flex items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
              Rewards
            </h1>

            <span className="badge badge-lg bg-primary/10 text-primary border-none font-bold px-4">
              {points.toLocaleString()} pts
            </span>
          </div>

          <div className="relative w-full md:w-[400px]">
            <Icon
              icon="streamline-sharp:magnifying-glass"
              className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground"
            />

            <input
              type="search"
              placeholder="Search treats, discounts & perks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input input-bordered w-full pl-12 bg-input border-transparent focus:border-primary rounded-full"
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="mt-5 grid grid-cols-4 gap-2 md:gap-3">
          {[
            { label: "All", icon: "solar:cup-star-outline" },
            { label: "Drinks", icon: "solar:cup-paper-outline" },
            { label: "Food", icon: "solar:donut-outline" },
            { label: "Discounts", icon: "solar:ticket-sale-outline" },
          ].map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setSelectedCategory(label)}
              className={`btn btn-sm md:btn-md w-full flex-col md:flex-row gap-1.5 rounded-2xl py-3 md:py-2 font-semibold transition-all ${
                selectedCategory === label
                  ? "bg-dark text-white hover:bg-dark/90 border-none shadow-sm"
                  : "bg-card text-foreground border border-border hover:border-primary/30 hover:text-primary shadow-sm"
              }`}
            >
              <Icon
                icon={icon}
                className="size-4 md:size-[18px] shrink-0"
              />

              <span className="text-[10px] md:text-sm leading-tight">
                {label}
              </span>
            </button>
          ))}
        </div>
      </header>

      <div className="px-5 md:px-8 mt-6 space-y-16 lg:space-y-24">

        {/* Featured + Goal */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Featured */}
          <section className="lg:col-span-2 rounded-[1.5rem] bg-gradient-to-br from-primary to-[#D64545] p-6 md:p-8 text-white shadow-lg flex flex-col justify-between">

            <div>
              <span className="badge border-white/30 bg-white/20 text-white font-bold uppercase tracking-wider mb-4 px-4 py-3">
                Featured this week
              </span>

              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                Complimentary Artisanal Bakery Box
              </h2>

              <p className="mt-2 text-sm md:text-base text-white/85 max-w-md">
                Unlock 4 freshly baked treats of your choice. A perfect match
                for your morning coffee.
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <span className="text-2xl md:text-3xl font-bold">
                1,800 pts
              </span>

              <button
                onClick={() =>
                  handleRedeem({
                    id: 7,
                    category: "Featured",
                    icon: "solar:gift-outline",
                    label: "Complimentary Artisanal Bakery Box",
                    description: "4 freshly baked treats of your choice",
                    points: 1800,
                  })
                }
                className="btn bg-white text-primary hover:bg-white/90 border-none rounded-xl px-6 font-bold shadow-md"
              >
                Unlock now
              </button>
            </div>
          </section>

          {/* Goal + Expiring */}
          <div className="flex flex-col gap-6">

            {/* Goal */}
            <section className="card bg-card border border-border shadow-sm">
              <div className="card-body p-6">

                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Next milestone
                  </span>

                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                  {pointsToGo.toLocaleString()} pts to go
                  </span>
                </div>

                <h3 className="font-bold text-lg leading-snug mt-1">
                  Free Premium Beverage
                </h3>

                <progress
                  className="progress progress-primary w-full mt-4 bg-input"
                  value={milestoneProgress}
                  max="100"
                ></progress>

                <div className="mt-2 flex justify-between text-xs font-semibold text-muted-foreground">
                  <span>{points.toLocaleString()} pts</span>
                  <span>Goal: 3,000 pts</span>
                </div>

              </div>
            </section>

            {/* Expiring */}
            <section className="card bg-accent/10 border border-accent/30 shadow-sm">
              <div className="card-body p-6">

                <div className="flex items-center gap-2 mb-2">
                  <Icon
                    icon="solar:clock-circle-bold"
                    className="size-4 text-accent"
                  />

                  <span className="text-sm font-bold text-accent-foreground">
                    Expiring in 3 days
                  </span>
                </div>

                <p className="text-base font-bold text-foreground">
                  25% Off Weekend Brunch
                </p>

                <p className="text-sm text-muted-foreground mt-1">
                  Auto-applied voucher in wallet
                </p>

                <button className="btn btn-accent btn-sm mt-4 font-bold rounded-lg">
                  Use today
                </button>

              </div>
            </section>

          </div>
        </div>

        {/* Saved favorites + Browse */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-20">

          {/* Saved favorites */}
          <section className="lg:col-span-1">

            <h2 className="text-xl font-bold mb-5">
              Saved favorites
            </h2>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">

            {rewards
              .filter(
                (reward) =>
                  reward.label === "Double Shot Espresso" ||
                  reward.label === "Reusable Eco Cup"
              )
              .map((reward) => (
                <div
                  key={reward.id}
                  className="card bg-card border border-border shadow-sm hover:border-primary/30 cursor-pointer group"
                >
                  <div className="card-body p-5">

                    <div className="flex justify-between items-start mb-3">
                      <span className="badge bg-primary/10 text-primary border-none font-bold">
                        {reward.points.toLocaleString()} pts
                      </span>

                      <Icon
                        icon="solar:heart-bold"
                        className="size-5 text-primary group-hover:scale-110 transition-transform"
                      />
                    </div>

                    <p className="text-sm font-bold">
                      {reward.label}
                    </p>

                    <p className="text-xs text-muted-foreground mt-1">
                      {reward.description}
                    </p>

                    <button
                      onClick={() => handleRedeem(reward)}
                      className="btn btn-sm mt-5 w-full bg-muted text-foreground hover:bg-primary hover:text-white border-none font-semibold transition-all duration-200"
                    >
                      Redeem
                    </button>

                  </div>
                </div>
              ))}

            </div>
          </section>

          {/* Browse by points */}
          <section className="lg:col-span-3 space-y-12 lg:space-y-16">

            <h2 className="text-xl font-bold">
              Browse by points
            </h2>

            {hasNoResults && (
            <div className="card bg-card border border-border shadow-sm">
              <div className="card-body items-center text-center py-12">
                <Icon
                  icon="solar:cup-broken"
                  className="size-12 text-muted-foreground mb-3"
                />

                <h3 className="text-lg font-bold">
                  No rewards found
                </h3>

                <p className="text-sm text-muted-foreground max-w-sm">
                  We couldn't find any rewards matching "{searchTerm}".
                  Try a different search or category.
                </p>

                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="btn btn-primary btn-sm mt-4 rounded-xl"
                >
                  Clear filters
                </button>
              </div>
            </div>
            )}

            {/* Quick Sips */}
            <div>

              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Quick sips — Under 500 pts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {filteredRewards
                  .filter((reward) => reward.points < 500)
                  .map((reward) => (

                    <div
                      key={reward.id}
                      className="card bg-card border border-border shadow-sm hover:shadow-md cursor-pointer"
                    >

                      <div className="card-body p-5 flex-row items-center justify-between">

                        <div className="flex items-center gap-4">

                          <div className="size-12 rounded-xl bg-muted flex items-center justify-center">
                            <Icon
                              icon={reward.icon}
                              className="size-6 text-foreground"
                            />
                          </div>

                          <div>
                            <p className="text-base font-bold">
                              {reward.label}
                            </p>

                            <p className="text-sm text-muted-foreground">
                              {reward.description}
                            </p>
                          </div>

                        </div>

                        <button
                          onClick={() => handleRedeem(reward)}
                          className="btn btn-primary rounded-xl px-4 shrink-0"
                        >
                          Redeem
                        </button>

                      </div>

                    </div>

                  ))}

              </div>
            </div>

            {/* Signature Treats */}
            <div>

              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Signature treats — 500 to 1,500 pts
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {filteredRewards
                  .filter(
                    (reward) =>
                      reward.points >= 500 &&
                      reward.points <= 1500
                  )
                  .map((reward) => (

                    <div
                      key={reward.id}
                      className="card bg-card border border-border shadow-sm hover:shadow-md cursor-pointer"
                    >

                      <div className="card-body p-5 flex-row items-center justify-between">

                        <div className="flex items-center gap-4">

                          <div className="size-12 rounded-xl bg-muted flex items-center justify-center">
                            <Icon
                              icon={reward.icon}
                              className="size-6 text-foreground"
                            />
                          </div>

                          <div>
                            <p className="text-base font-bold">
                              {reward.label}
                            </p>

                            <p className="text-sm text-muted-foreground">
                              {reward.description}
                            </p>
                          </div>

                        </div>

                        <button
                          onClick={() => handleRedeem(reward)}
                          className="btn btn-primary rounded-xl px-4 shrink-0"
                        >
                          Redeem
                        </button>

                      </div>

                    </div>

                  ))}

              </div>
            </div>

          </section>
        </div>
      </div>

      <MobileNav
        currentTab="rewards"
        onTabChange={onTabChange}
      />

    </main>
  );
}