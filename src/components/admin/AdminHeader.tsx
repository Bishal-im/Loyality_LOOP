"use client";

import React from "react";
import { Search, Bell, HelpCircle, Menu } from "lucide-react";
import { UserProfileRow } from "./UserProfileRow";
import { Breadcrumbs } from "./Breadcrumbs";
import { useAdminChrome } from "./admin-chrome-context";

export const AdminHeader: React.FC = () => {
  const { toggleMobile } = useAdminChrome();

  return (
    <header className="fixed top-0 right-0 left-0 lg:left-60 h-16 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] z-[40] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <button
          type="button"
          onClick={toggleMobile}
          className="lg:hidden p-2 rounded-xl text-[#71717A] hover:bg-[#F4F4F5] hover:text-[#18181B] btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" strokeWidth={1.5} />
        </button>

        <div className="hidden lg:block">
          <Breadcrumbs />
        </div>

        <div className="relative w-full max-w-[400px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" strokeWidth={1.5} />
          <input
            type="search"
            placeholder="Search customers, rewards, or staff..."
            className="w-full pl-9 pr-3 py-2 bg-[#F4F4F5] border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] placeholder:text-[#71717A] focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        <button
          type="button"
          aria-label="Notifications"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[#71717A] hover:bg-[#F4F4F5] hover:text-[#18181B] relative btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <Bell className="w-4 h-4" strokeWidth={1.5} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-white" />
        </button>

        <button
          type="button"
          aria-label="Quick actions"
          className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center text-[#71717A] hover:bg-[#F4F4F5] hover:text-[#18181B] btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <HelpCircle className="w-4 h-4" strokeWidth={1.5} />
        </button>

        <div className="hidden md:block h-5 w-px bg-[#E5E5E5]" />

        <UserProfileRow compact />
      </div>
    </header>
  );
};
