import { Icon } from "@iconify/react";
import { MobileNav } from "./Sidebar";

export function Rewards({ onTabChange }) {
  return (
    <main className="w-full text-foreground pb-24 md:pb-8 min-h-screen">
      {/* ── Header ── */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl px-5 md:px-8 pt-6 pb-4 border-b border-border/40">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Rewards</h1>
            <span className="badge badge-lg bg-primary/10 text-primary border-none font-bold px-4">
              2,480 pts
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
              className="input input-bordered w-full pl-12 bg-input border-transparent focus:border-primary rounded-full"
            />
          </div>
        </div>

        {/* Filter tabs — 4 categories, equal-width responsive grid */}
        <div className="mt-5 grid grid-cols-4 gap-2 md:gap-3">
          {[
            { label: "All",       icon: "solar:cup-star-outline" },
            { label: "Drinks",    icon: "solar:cup-paper-outline" },
            { label: "Food",      icon: "solar:donut-outline" },
            { label: "Discounts", icon: "solar:ticket-sale-outline" },
          ].map(({ label, icon }, i) => (
            <button
              key={label}
              className={`btn btn-sm md:btn-md w-full flex-col md:flex-row gap-1.5 rounded-2xl py-3 md:py-2 font-semibold transition-all ${
                i === 0
                  ? "bg-dark text-white hover:bg-dark/90 border-none shadow-sm"
                  : "bg-card text-foreground border border-border hover:border-primary/30 hover:text-primary shadow-sm"
              }`}
            >
              <Icon icon={icon} className="size-4 md:size-[18px] shrink-0" />
              <span className="text-[10px] md:text-sm leading-tight">{label}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="px-5 md:px-8 mt-6 space-y-16 lg:space-y-24">

        {/* ── Featured + Goal side-by-side ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured — spans 2 columns */}
          <section className="lg:col-span-2 rounded-[1.5rem] bg-gradient-to-br from-primary to-[#D64545] p-6 md:p-8 text-white shadow-lg flex flex-col justify-between">
            <div>
              <span className="badge border-white/30 bg-white/20 text-white font-bold uppercase tracking-wider mb-4 px-4 py-3">
                Featured this week
              </span>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                Complimentary Artisanal Bakery Box
              </h2>
              <p className="mt-2 text-sm md:text-base text-white/85 max-w-md">
                Unlock 4 freshly baked treats of your choice. A perfect match for your morning coffee.
              </p>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-2xl md:text-3xl font-bold">1,800 pts</span>
              <button className="btn bg-white text-primary hover:bg-white/90 border-none rounded-xl px-6 font-bold shadow-md">
                Unlock now
              </button>
            </div>
          </section>

          {/* Goal + Expiring stacked */}
          <div className="flex flex-col gap-6">
            <section className="card bg-card border border-border shadow-sm">
              <div className="card-body p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Next milestone
                  </span>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
                    520 pts to go
                  </span>
                </div>
                <h3 className="font-bold text-lg leading-snug mt-1">Free Premium Beverage</h3>
                <progress className="progress progress-primary w-full mt-4 bg-input" value="82" max="100"></progress>
                <div className="mt-2 flex justify-between text-xs font-semibold text-muted-foreground">
                  <span>2,480 pts</span>
                  <span>Goal: 3,000 pts</span>
                </div>
              </div>
            </section>

            <section className="card bg-accent/10 border border-accent/30 shadow-sm">
              <div className="card-body p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Icon icon="solar:clock-circle-bold" className="size-4 text-accent" />
                  <span className="text-sm font-bold text-accent-foreground">Expiring in 3 days</span>
                </div>
                <p className="text-base font-bold text-foreground">25% Off Weekend Brunch</p>
                <p className="text-sm text-muted-foreground mt-1">Auto-applied voucher in wallet</p>
                <button className="btn btn-accent btn-sm mt-4 font-bold rounded-lg">
                  Use today
                </button>
              </div>
            </section>
          </div>
        </div>

        {/* ── Saved favorites + Browse ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-20">

          {/* Saved favorites */}
          <section className="lg:col-span-1">
            <h2 className="text-xl font-bold mb-5">Saved favorites</h2>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {[
                { label: "Double Shot Espresso", pts: "500 pts" },
                { label: "Reusable Eco Cup", pts: "1,200 pts" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="card bg-card border border-border shadow-sm hover:border-primary/30 cursor-pointer group"
                >
                  <div className="card-body p-5">
                    <div className="flex justify-between items-start mb-3">
                      <span className="badge bg-primary/10 text-primary border-none font-bold">
                        {item.pts}
                      </span>
                      <Icon
                        icon="solar:heart-bold"
                        className="size-5 text-primary group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <p className="text-sm font-bold">{item.label}</p>
                    <button className="btn btn-sm mt-5 w-full bg-muted text-foreground hover:bg-primary hover:text-white border-none font-semibold transition-all duration-200">
                      Redeem
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Browse by points */}
          <section className="lg:col-span-3 space-y-12 lg:space-y-16">
            <h2 className="text-xl font-bold">Browse by points</h2>

            {/* Quick sips */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Quick sips — Under 500 pts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: "solar:cup-outline", label: "Extra Flavor Shot", sub: "Vanilla, Caramel, Hazelnut", pts: "150 pts" },
                  { icon: "solar:cup-paper-outline", label: "Upsize to Large", sub: "Any hot or iced beverage", pts: "250 pts" },
                ].map((item) => (
                  <div key={item.label} className="card bg-card border border-border shadow-sm hover:shadow-md cursor-pointer">
                    <div className="card-body p-5 flex-row items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-xl bg-muted flex items-center justify-center">
                          <Icon icon={item.icon} className="size-6 text-foreground" />
                        </div>
                        <div>
                          <p className="text-base font-bold">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.sub}</p>
                        </div>
                      </div>
                      <button className="btn btn-primary rounded-xl px-4 shrink-0">{item.pts}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Signature treats */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Signature treats — 500 to 1,500 pts
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: "solar:donut-outline", label: "Fresh Butter Croissant", sub: "Baked daily in-house", pts: "600 pts", tint: "primary" },
                  { icon: "solar:bag-heart-outline", label: "250g Whole Bean Coffee", sub: "Single-origin Ethiopia", pts: "1,200 pts", tint: "accent" },
                ].map((item) => (
                  <div key={item.label} className="card bg-card border border-border shadow-sm hover:shadow-md cursor-pointer">
                    <div className="card-body p-5 flex-row items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`size-12 rounded-xl bg-${item.tint}/10 flex items-center justify-center`}>
                          <Icon icon={item.icon} className={`size-6 text-${item.tint}`} />
                        </div>
                        <div>
                          <p className="text-base font-bold">{item.label}</p>
                          <p className="text-sm text-muted-foreground">{item.sub}</p>
                        </div>
                      </div>
                      <button className="btn btn-primary rounded-xl px-4 shrink-0">{item.pts}</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <MobileNav currentTab="rewards" onTabChange={onTabChange} />
    </main>
  );
}
