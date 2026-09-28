"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gift, Clock, User } from "lucide-react";

// Sparkle / asterisk icon used for the active Home tab (matches design)
function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M10 2v16M2 10h16M4.93 4.93l10.14 10.14M15.07 4.93 4.93 15.07"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Plain house icon for the inactive Home tab
function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M3 10.5L12 3l9 7.5V21a1 1 0 0 1-1 1H15v-5h-6v5H4a1 1 0 0 1-1-1V10.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const BottomTabBar: React.FC = () => {
  const pathname = usePathname();

  const tabs = [
    { label: "Home", href: "/home", icon: "home" as const },
    { label: "Rewards", href: "/rewards", icon: "gift" as const },
    { label: "Activity", href: "/activity", icon: "clock" as const },
    { label: "Profile", href: "/profile", icon: "user" as const },
  ];

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 px-6 pb-safe flex items-center justify-around border-t"
      style={{
        backgroundColor: "var(--c-surface)",
        borderColor: "var(--c-border)",
        boxShadow: "0 -1px 8px rgba(43,33,24,0.04)",
      }}
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;

        let Icon: React.ReactNode;
        if (tab.icon === "home") {
          Icon = isActive ? (
            <SparkleIcon className="w-5 h-5" />
          ) : (
            <HomeIcon className="w-5 h-5" />
          );
        } else if (tab.icon === "gift") {
          Icon = <Gift className="w-5 h-5" />;
        } else if (tab.icon === "clock") {
          Icon = <Clock className="w-5 h-5" />;
        } else {
          Icon = <User className="w-5 h-5" />;
        }

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className="flex flex-col items-center gap-0.5 py-3 px-4 transition-colors"
            style={{
              color: isActive ? "var(--c-terracotta)" : "var(--c-text-muted)",
            }}
            onMouseEnter={e => {
              if (!isActive) e.currentTarget.style.color = "var(--c-text-secondary)";
            }}
            onMouseLeave={e => {
              if (!isActive) e.currentTarget.style.color = "var(--c-text-muted)";
            }}
          >
            {Icon}
            <span
              className="text-[10px] font-semibold mt-0.5"
              style={{
                color: isActive ? "var(--c-terracotta)" : "var(--c-text-muted)",
              }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
};
