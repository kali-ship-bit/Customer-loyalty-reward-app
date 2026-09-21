import { Icon } from "@iconify/react";
import { MobileNav } from "./Sidebar";

export function Profile({ onTabChange }) {
  return (
    <main className="w-full text-foreground pb-24 md:pb-8 min-h-screen">
      {/* ── Header ── */}
      <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-xl px-5 md:px-8 pt-6 pb-4 border-b border-border/40">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Profile</h1>
          <button className="btn btn-circle btn-ghost btn-md bg-card border border-border shadow-sm text-muted-foreground hover:text-foreground">
            <Icon icon="solar:settings-outline" className="size-6" />
          </button>
        </div>
      </header>

      <div className="px-5 md:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* ── Left: Avatar + Stats ── */}
          <div className="lg:col-span-4 space-y-8 lg:space-y-12">
            <section className="card bg-card border border-border shadow-md">
              <div className="card-body p-8 flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="avatar">
                    <div className="w-32 rounded-full ring-4 ring-primary/20 ring-offset-4 shadow-md">
                      <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Maya Chen" />
                    </div>
                  </div>
                  <button className="btn btn-circle btn-primary btn-sm absolute bottom-0 right-0 shadow-md">
                    <Icon icon="solar:pen-outline" className="size-4" />
                  </button>
                </div>
                <h2 className="text-2xl font-bold">Maya Chen</h2>
                <p className="text-sm text-muted-foreground mt-1">maya.chen@example.com</p>
                <div className="badge badge-lg bg-accent/10 text-accent-foreground border-none font-bold mt-4 p-4 gap-2">
                  <Icon icon="solar:crown-star-outline" className="size-5 text-accent" />
                  Gold Member Since 2023
                </div>
              </div>
            </section>

            <section className="grid grid-cols-2 gap-4">
              <div className="card bg-card border border-border shadow-sm hover:border-accent/30 cursor-pointer">
                <div className="card-body p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Lifetime Points</p>
                  <p className="mt-2 text-3xl font-bold text-accent">12,450</p>
                </div>
              </div>
              <div className="card bg-card border border-border shadow-sm hover:border-primary/20 cursor-pointer">
                <div className="card-body p-5 text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Rewards Claimed</p>
                  <p className="mt-2 text-3xl font-bold text-primary">48</p>
                </div>
              </div>
            </section>
          </div>

          {/* ── Right: Settings menus ── */}
          <div className="lg:col-span-8 space-y-12 lg:space-y-16">

            {/* Account settings */}
            <section>
              <h3 className="font-bold text-lg mb-4">Account Settings</h3>
              <div className="card bg-card border border-border shadow-sm overflow-hidden">
                <div className="divide-y divide-border">
                  {[
                    { icon: "solar:user-id-outline", label: "Personal Information", sub: "Update your name, email, and phone number" },
                    { icon: "solar:card-outline", label: "Payment Methods", sub: "Manage your saved cards and billing" },
                    { icon: "solar:bell-bing-outline", label: "Notifications", sub: "Choose what updates you want to receive" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="w-full flex items-center justify-between p-5 hover:bg-muted/20 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-xl bg-input flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <Icon icon={item.icon} className="size-6" />
                        </div>
                        <div className="text-left">
                          <span className="block text-base font-bold">{item.label}</span>
                          <span className="block text-sm text-muted-foreground mt-0.5">{item.sub}</span>
                        </div>
                      </div>
                      <Icon icon="solar:alt-arrow-right-outline" className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Support & Privacy */}
            <section>
              <h3 className="font-bold text-lg mb-4">Support & Privacy</h3>
              <div className="card bg-card border border-border shadow-sm overflow-hidden">
                <div className="divide-y divide-border">
                  {[
                    { icon: "solar:question-circle-outline", label: "Help & Support", sub: "Get help with your account or orders" },
                    { icon: "solar:shield-warning-outline", label: "Privacy & Security", sub: "Manage your data and security settings" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="w-full flex items-center justify-between p-5 hover:bg-muted/20 transition-colors group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-xl bg-input flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                          <Icon icon={item.icon} className="size-6" />
                        </div>
                        <div className="text-left">
                          <span className="block text-base font-bold">{item.label}</span>
                          <span className="block text-sm text-muted-foreground mt-0.5">{item.sub}</span>
                        </div>
                      </div>
                      <Icon icon="solar:alt-arrow-right-outline" className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Logout */}
            <section className="pt-2 pb-8">
              <button className="btn btn-error btn-outline w-full md:w-auto px-10 rounded-xl font-bold">
                <Icon icon="solar:logout-2-outline" className="size-5" />
                Log Out
              </button>
            </section>
          </div>

        </div>
      </div>

      <MobileNav currentTab="profile" onTabChange={onTabChange} />
    </main>
  );
}
