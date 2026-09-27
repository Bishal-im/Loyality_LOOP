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
        <div className="w-8 h-8 rounded-full bg-[#1C7C54] text-white flex items-center justify-center text-xs font-bold shadow-xs">
          SK
        </div>
        <div className="hidden sm:flex flex-col min-w-0">
          <span className="text-xs font-semibold text-[#1C1C1E] truncate leading-none">
            Sarah K.
          </span>
          <span className="text-[10px] text-[#6E6E73] truncate mt-0.5">
            Store Manager
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-[#6E6E73] group-hover:text-[#1C1C1E] transition-colors" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#F2F2F5] transition-colors cursor-pointer group select-none">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-full bg-[#1C7C54] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-xs">
          SK
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold text-[#1C1C1E] truncate leading-tight">
            Sarah K.
          </span>
          <span className="text-[11px] text-[#6E6E73] truncate">
            Store Manager
          </span>
        </div>
      </div>
      <MoreVertical className="w-4 h-4 text-[#6E6E73] group-hover:text-[#1C1C1E]" />
    </div>
  );
};
