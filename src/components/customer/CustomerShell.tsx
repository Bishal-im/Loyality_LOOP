"use client";

import React from "react";
import { BottomTabBar } from "@/components/customer/BottomTabBar";

interface CustomerShellProps {
  title: string;
  trailing?: React.ReactNode;
  children: React.ReactNode;
  showTabs?: boolean;
}

export const CustomerShell: React.FC<CustomerShellProps> = ({
  title,
  trailing,
  children,
  showTabs = true,
}) => {
  return (
    <div className="min-h-[100dvh] bg-bg text-text-primary flex flex-col">
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md md:max-w-lg lg:max-w-xl z-[40] bg-surface/80 backdrop-blur-xl border-b border-border px-5 h-14 flex items-center justify-between">
        <span className="font-display text-[15px] font-medium tracking-tight text-primary">
          ABC Café
        </span>
        <h1 className="font-sans text-sm font-semibold text-text-primary">
          {title}
        </h1>
        <div className="w-8 h-8 flex items-center justify-end">{trailing}</div>
      </header>

      <main
        id="main"
        className={`flex-1 w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto pt-16 px-5 ${
          showTabs ? "pb-28" : "pb-8"
        }`}
      >
        {children}
      </main>

      {showTabs ? <BottomTabBar /> : null}
    </div>
  );
};
