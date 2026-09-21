import { useState } from "react";
import { Home } from "./components/Home";
import { Rewards } from "./components/Rewards";
import { Wallet } from "./components/Wallet";
import { Profile } from "./components/Profile";
import { Sidebar } from "./components/Sidebar";

export default function App() {
  const [currentTab, setCurrentTab] = useState("home");

  const currentView = {
    home: <Home onTabChange={setCurrentTab} />,
    rewards: <Rewards onTabChange={setCurrentTab} />,
    wallet: <Wallet onTabChange={setCurrentTab} />,
    profile: <Profile onTabChange={setCurrentTab} />,
  }[currentTab];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar currentTab={currentTab} onTabChange={setCurrentTab} />

      <div className="relative mx-auto w-full max-w-[1200px] flex-1">
        {currentView}
      </div>
    </div>
  );
}
