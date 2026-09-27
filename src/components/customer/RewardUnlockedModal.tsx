"use client";

import React from "react";
import { Check } from "lucide-react";

interface RewardUnlockedModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardTitle?: string;
  onViewReward?: () => void;
}

export const RewardUnlockedModal: React.FC<RewardUnlockedModalProps> = ({
  isOpen,
  onClose,
  rewardTitle = "Free Veg Momo",
  onViewReward,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[4px] flex items-center justify-center px-6 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[330px] bg-white text-[#1C1C1E] rounded-[20px] p-7 flex flex-col items-center text-center shadow-2xl relative select-none border border-[#E4E4E7]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold Stamp Badge with Pop Halo */}
        <div className="relative flex items-center justify-center my-1">
          <div
            className="w-[70px] h-[70px] rounded-full flex items-center justify-center text-white transition-all shadow-lg"
            style={{
              backgroundColor: "#C99700",
              boxShadow:
                "0 0 0 8px rgba(201, 151, 0, 0.15), 0 10px 22px rgba(201, 151, 0, 0.35)",
            }}
          >
            <Check className="w-8 h-8 stroke-[3.5]" />
          </div>
        </div>

        <span className="text-[11px] font-semibold uppercase tracking-widest text-[#6E6E73] mt-4">
          7 of 7 stamps
        </span>

        <h3 className="text-xl font-semibold text-[#1C1C1E] mt-1.5">
          🎉 Reward Unlocked!
        </h3>

        <p className="text-base font-medium text-[#1C1C1E] mt-1">
          {rewardTitle}
        </p>

        <p className="text-xs text-[#6E6E73] mt-1">
          Show this to staff to redeem
        </p>

        <button
          onClick={onViewReward || onClose}
          className="w-full mt-6 py-3.5 px-5 rounded-xl text-sm text-white font-semibold flex items-center justify-center bg-[#1C7C54] hover:bg-[#16603F] active:scale-[0.98] transition-all shadow-sm"
          type="button"
        >
          View Reward
        </button>

        <button
          onClick={onClose}
          className="mt-3.5 py-1 text-center text-xs text-[#6E6E73] hover:text-[#1C1C1E] active:opacity-70 transition-colors"
          type="button"
        >
          Continue browsing
        </button>
      </div>
    </div>
  );
};
