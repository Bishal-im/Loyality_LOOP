"use client";

import React from "react";
import { Search, Bell, HelpCircle } from "lucide-react";
import { UserProfileRow } from "./UserProfileRow";

export const AdminHeader: React.FC = () => {
  return (
    <header className="fixed top-0 left-[260px] right-0 h-16 bg-white border-b border-[#E4E4E7] z-20 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4 w-full max-w-[400px]">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6E73]" />
          <input
            type="text"
            placeholder="Search customers, rewards, or staff..."
            className="w-full pl-9 pr-3 py-2 bg-[#F2F2F5] border border-transparent rounded-xl text-xs text-[#1C1C1E] placeholder:text-[#6E6E73] focus:outline-none focus:border-[#1C7C54] focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Notifications"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[#6E6E73] hover:bg-[#F2F2F5] hover:text-[#1C1C1E] relative transition-colors"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#E15554] ring-2 ring-white" />
        </button>

        <button
          type="button"
          aria-label="Quick Actions"
          className="w-9 h-9 rounded-xl flex items-center justify-center text-[#6E6E73] hover:bg-[#F2F2F5] hover:text-[#1C1C1E] transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-[#E4E4E7]" />

        <UserProfileRow compact />
      </div>
    </header>
  );
};

