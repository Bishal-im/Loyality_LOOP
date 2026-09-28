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
        <div className="w-8 h-8 rounded-[0.65rem] bg-primary text-bg flex items-center justify-center text-xs font-bold">
          SK
        </div>
        <div className="hidden sm:flex flex-col min-w-0">
          <span className="text-xs font-semibold text-text-primary truncate leading-none">
            Sarah K.
          </span>
          <span className="text-[10px] text-text-secondary truncate mt-0.5">
            Store Manager
          </span>
        </div>
        <ChevronDown className="w-4 h-4 text-text-secondary group-hover:text-text-primary transition-colors" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between p-2.5 rounded-xl hover:bg-surface-low transition-colors cursor-pointer group select-none">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-[0.65rem] bg-primary text-bg flex items-center justify-center text-xs font-bold flex-shrink-0">
          SK
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold text-text-primary truncate leading-tight">
            Sarah K.
          </span>
          <span className="text-[11px] text-text-secondary truncate">
            Store Manager
          </span>
        </div>
      </div>
      <MoreVertical className="w-4 h-4 text-text-secondary group-hover:text-text-primary" />
    </div>
  );
};
