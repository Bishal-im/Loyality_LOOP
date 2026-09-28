"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { House, Gift, Clock, User } from "lucide-react";
import { LimelightNav } from "@/components/ui/limelight-nav";

// Tab definitions — icons and hrefs
const TABS = [
  { label: "Home",     href: "/home",     icon: <House strokeWidth={1.8} /> },
  { label: "Rewards",  href: "/rewards",  icon: <Gift  strokeWidth={1.8} /> },
  { label: "Activity", href: "/activity", icon: <Clock strokeWidth={1.8} /> },
  { label: "Profile",  href: "/profile",  icon: <User  strokeWidth={1.8} /> },
] as const;

export const BottomTabBar: React.FC = () => {
  const pathname = usePathname();
  const router   = useRouter();

  // Derive which tab index is active from current route
  const activeIndex = useMemo(
    () => Math.max(TABS.findIndex((t) => pathname === t.href), 0),
    [pathname]
  );

  // Build NavItem array for LimelightNav — navigate on click
  const navItems = useMemo(
    () =>
      TABS.map((tab) => ({
        id:      tab.href,
        label:   tab.label,
        icon:    React.cloneElement(tab.icon, {
          // colour is driven by opacity via LimelightNav; set a fixed colour
          style: { color: "var(--c-text-primary)" },
        }),
        onClick: () => router.push(tab.href),
      })),
    [router]
  );

  return (
    <div
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 border-t flex flex-col items-stretch"
      style={{
        backgroundColor: "var(--c-surface)",
        borderColor:     "var(--c-border)",
        boxShadow:       "0 -1px 8px rgba(43,33,24,0.04)",
      }}
    >
      {/* LimelightNav fills full width by stretching to the container */}
      <div className="flex items-stretch w-full">
        <LimelightNav
          items={navItems}
          activeIndex={activeIndex}
          className="w-full justify-around bg-transparent border-0 rounded-none h-auto py-1"
          limelightClassName=""   /* colour set inline in component */
          iconContainerClassName="flex-1 flex-col gap-0.5 py-2"
          iconClassName=""
        />
      </div>

      {/* Labels row — rendered separately so they sit below the icons */}
      <div className="flex items-center justify-around pb-2 -mt-1">
        {TABS.map((tab, i) => {
          const isActive = i === activeIndex;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex-1 flex justify-center"
            >
              <span
                className="text-[10px] font-semibold"
                style={{
                  color: isActive ? "var(--c-terracotta)" : "var(--c-text-muted)",
                }}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
