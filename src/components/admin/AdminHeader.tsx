"use client";

import React from "react";
import { Search, Bell, HelpCircle, Menu } from "lucide-react";
import { UserProfileRow } from "./UserProfileRow";
import { useAdminChrome } from "./admin-chrome-context";

export const AdminHeader: React.FC = () => {
  const { mobileOpen, toggleMobile } = useAdminChrome();

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-[var(--admin-sidebar)] h-16 bg-surface/90 backdrop-blur-xl border-b border-border z-[40] px-3 sm:px-5 lg:px-8 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <button
          type="button"
          className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-text-primary hover:bg-surface-low btn-press shrink-0"
          onClick={toggleMobile}
          aria-expanded={mobileOpen}
          aria-controls="admin-sidebar"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full max-w-[400px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="search"
            placeholder="Search customers, rewards, or staff..."
            className="w-full pl-9 pr-3 py-2 bg-surface-low border border-transparent rounded-xl text-xs text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-primary focus:bg-surface transition-[border-color,background-color] duration-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button
          type="button"
          aria-label="Notifications"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-text-secondary hover:bg-surface-low hover:text-text-primary relative btn-press"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-alert ring-2 ring-surface" />
        </button>

        <button
          type="button"
          aria-label="Quick actions"
          className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center text-text-secondary hover:bg-surface-low hover:text-text-primary btn-press"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <div className="hidden md:block h-5 w-px bg-border" />

        <UserProfileRow compact />
      </div>
    </header>
  );
};


