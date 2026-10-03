"use client";

import React from "react";
import { MoreVertical, ChevronDown } from "lucide-react";

interface UserProfileRowProps {
  compact?: boolean;
}

export const UserProfileRow: React.FC<UserProfileRowProps> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 cursor-pointer group select-none">
        <div className="w-8 h-8 rounded-full bg-[#27272A] text-white flex items-center justify-center text-xs font-bold shrink-0">
          SK
        </div>
        <div className="hidden sm:flex flex-col min-w-0">
          <span className="text-xs font-semibold text-[#18181B] truncate leading-none">
            Sarah K.
          </span>
          <span className="text-[10px] text-[#71717A] truncate mt-0.5">
            Store Manager
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-[#71717A] group-hover:text-[#18181B] transition-colors" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F4F4F5] transition-colors cursor-pointer group select-none w-full min-w-0">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="w-8 h-8 rounded-full bg-[#27272A] text-white flex items-center justify-center text-xs font-bold shrink-0">
          SK
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold text-[#18181B] truncate leading-tight">
            Sarah K.
          </span>
          <span className="text-[11px] text-[#71717A] truncate">
            Store Manager
          </span>
        </div>
      </div>
      <MoreVertical className="w-4 h-4 text-[#71717A] group-hover:text-[#18181B] shrink-0" strokeWidth={1.5} />
    </div>
  );
};
