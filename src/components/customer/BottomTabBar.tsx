"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Gift, Clock, User } from "lucide-react";

export const BottomTabBar: React.FC = () => {
  const pathname = usePathname();

  const tabs = [
    { label: "Home", href: "/home", icon: Home },
    { label: "Rewards", href: "/rewards", icon: Gift },
    { label: "Activity", href: "/activity", icon: Clock },
    { label: "Profile", href: "/profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#E4E4E7] z-40 px-6 py-2 flex items-center justify-around shadow-lg">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        const Icon = tab.icon;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center gap-1 transition-colors py-1 ${
              isActive ? "text-[#1C7C54]" : "text-[#6E6E73] hover:text-[#1C1C1E]"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span className="text-[11px] font-medium">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
