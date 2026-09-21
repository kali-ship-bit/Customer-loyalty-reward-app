import { Icon } from "@iconify/react";
import { MobileNav } from "./Sidebar";

export function Home({ onTabChange }) {
  return (
    <main className="w-full text-foreground pb-24 md:pb-8 min-h-screen">
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
              <p className="text-sm font-medium text-muted-foreground">Good morning,</p>
              <p className="text-xl md:text-2xl font-semibold tracking-tight">
                Maya Chen <span className="ml-1 text-accent">✦</span>
              </p>
            </div>
          </div>
          <button
            aria-label="Notifications"
            className="btn btn-circle btn-ghost btn-md relative border border-border bg-card shadow-sm hover:shadow-md"
          >
            <Icon icon="solar:bell-outline" className="size-6 text-foreground" />
            <span className="absolute right-2.5 top-2.5 size-2 rounded-full bg-primary ring-2 ring-card" />
          </button>
        </div>
      </header>

      <div className="px-5 md:px-8 mt-6 space-y-16 lg:space-y-24">
        {/* ── Points banner ── */}
        <section className="rounded-3xl bg-gradient-to-br from-primary to-[#D64545] p-6 md:p-10 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
            <Icon icon="solar:crown-star-bold" className="size-64 -mr-16 -mt-16" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white/80 mb-2">
                Available points
              </p>
              <div className="flex items-baseline gap-2">
                <p className="text-5xl md:text-6xl font-bold leading-none tracking-tight">2,480</p>
                <span className="text-lg font-medium text-white/80">pts</span>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/90">
                <span className="badge badge-outline border-white/40 bg-white/10 text-white py-3 px-4 font-bold">
                  Gold Member
                </span>
                <span className="font-medium">520 pts to Platinum</span>
              </div>
            </div>

            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <button
                className="btn bg-white hover:bg-white/90 text-primary border-none shadow-md hover:shadow-lg rounded-2xl h-14"
                aria-label="Show QR code"
              >
                <Icon icon="solar:qr-code-outline" className="size-6" />
                Scan to earn
              </button>
              <div className="bg-black/10 rounded-2xl p-4 border border-white/10">
                <div className="mb-2 flex justify-between text-xs font-semibold text-white/90">
                  <span>Progress to Platinum</span>
                  <span>83%</span>
                </div>
                <progress className="progress bg-black/20 w-full" value="83" max="100" style={{ '--progress-color': 'white' }}></progress>
              </div>
            </div>
          </div>
        </section>

        {/* ── Your Rewards ── */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight">Your Rewards</h2>
            <button className="btn btn-ghost btn-sm text-primary font-bold hover:bg-primary/10">See all</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Reward card 1 */}
            <div className="card bg-card border border-border shadow-sm hover:border-accent/30 cursor-pointer">
              <div className="card-body p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="size-14 rounded-2xl bg-accent/10 flex items-center justify-center">
                    <Icon icon="solar:crown-star-outline" className="size-8 text-accent" />
                  </div>
                  <span className="badge border-none bg-accent/10 text-accent-foreground font-bold py-3 px-3">
                    Exclusive
                  </span>
                </div>
                <h3 className="card-title text-lg">Free birthday treat</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4 flex-grow">
                  Choose any pastry on your special day. Valid until Jun 30.
                </p>
                <div className="card-actions mt-auto">
                  <button className="btn btn-primary w-full">View reward</button>
                </div>
              </div>
            </div>

            {/* Reward card 2 */}
            <div className="card bg-card border border-border shadow-sm hover:border-primary/20 cursor-pointer">
              <div className="card-body p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon icon="solar:cup-star-outline" className="size-8 text-primary" />
                  </div>
                  <span className="badge border-none bg-primary/10 text-primary font-bold py-3 px-3">
                    800 points
                  </span>
                </div>
                <h3 className="card-title text-lg">$10 off your next visit</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4 flex-grow">
                  A little thank-you for being with us.
                </p>
                <div className="card-actions mt-auto">
                  <button className="btn btn-dark w-full">Redeem now</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Two-column: Earn more / Recent activity ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Earn more points</h2>
              <button className="btn btn-ghost btn-sm text-primary font-bold hover:bg-primary/10">Explore</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="card bg-card border border-border shadow-sm hover:border-primary/30 cursor-pointer group">
                <div className="card-body p-5">
                  <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon icon="solar:cart-large-2-outline" className="size-6 text-primary" />
                  </div>
                  <h4 className="mt-4 text-base font-bold">Shop this week</h4>
                  <p className="mt-1 text-sm text-muted-foreground leading-snug">Earn 2× points on essentials</p>
                  <span className="mt-4 block text-sm font-bold text-primary">+200 pts</span>
                </div>
              </div>

              <div className="card bg-card border border-border shadow-sm hover:border-accent/40 cursor-pointer group">
                <div className="card-body p-5">
                  <div className="size-12 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon icon="solar:users-group-rounded-outline" className="size-6 text-accent" />
                  </div>
                  <h4 className="mt-4 text-base font-bold">Invite a friend</h4>
                  <p className="mt-1 text-sm text-muted-foreground leading-snug">You both get a bonus</p>
                  <span className="mt-4 block text-sm font-bold text-accent">+500 pts</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-bold tracking-tight">Recent activity</h2>
              <button className="btn btn-ghost btn-sm text-primary font-bold hover:bg-primary/10">View all</button>
            </div>
            <div className="card bg-card border border-border shadow-sm overflow-hidden">
              <div className="divide-y divide-border">
                <div className="flex items-center gap-4 p-5 hover:bg-muted/20 transition-colors">
                  <div className="size-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Icon icon="solar:cup-star-bold" className="size-6 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-bold truncate">Harbor Coffee</p>
                    <p className="text-sm text-muted-foreground">Today, 9:42 AM</p>
                  </div>
                  <span className="text-sm font-bold text-accent bg-accent/10 px-3 py-1 rounded-full">+120</span>
                </div>
                <div className="flex items-center gap-4 p-5 hover:bg-muted/20 transition-colors">
                  <div className="size-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <Icon icon="solar:gift-bold" className="size-6 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-base font-bold truncate">Free coffee reward</p>
                    <p className="text-sm text-muted-foreground">Yesterday</p>
                  </div>
                  <span className="text-sm font-bold text-muted-foreground bg-muted px-3 py-1 rounded-full">-300</span>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      <MobileNav currentTab="home" onTabChange={onTabChange} />
    </main>
  );
}
