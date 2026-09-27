"use client";

import React from "react";
import { Check } from "lucide-react";

interface StampProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardTitle?: string;
  currentStamps?: number;
  totalStamps?: number;
}

export const StampProgressModal: React.FC<StampProgressModalProps> = ({
  isOpen,
  onClose,
  rewardTitle = "Free Veg Momo",
  currentStamps = 5,
  totalStamps = 7,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#141414]/55 backdrop-blur-[2px] flex items-center justify-center p-6 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="w-[88%] max-w-[340px] bg-white rounded-2xl p-6 pt-7 pb-8 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.22)] border border-white/60 flex flex-col items-center text-center select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[#6E6E73] text-[11px] font-semibold tracking-[0.14em] uppercase mb-6">
          {rewardTitle}
        </p>

        <div className="flex items-center justify-between w-full max-w-[264px] mb-7 px-1">
          {Array.from({ length: totalStamps }).map((_, index) => {
            const isCompleted = index < currentStamps - 1;
            const isJustLanded = index === currentStamps - 1;

            if (isCompleted) {
              return (
                <div
                  key={index}
                  className="w-7 h-7 rounded-full bg-[#C99700] text-white flex items-center justify-center shadow-sm"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              );
            }

            if (isJustLanded) {
              return (
                <div key={index} className="relative flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-[#C99700] text-white flex items-center justify-center ring-2 ring-[#C99700]/30 shadow-[0_0_14px_rgba(201,151,0,0.55)] animate-bounce">
                    <Check className="w-4.5 h-4.5 stroke-[3]" />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={index}
                className="w-7 h-7 rounded-full border-2 border-[#E4E4E7] bg-transparent"
              />
            );
          })}
        </div>

        <h3 className="text-[#1C1C1E] text-[22px] font-semibold tracking-tight leading-tight mb-1.5">
          +1 Visit
        </h3>

        <p className="text-[#6E6E73] text-[13px] leading-relaxed">
          {totalStamps - currentStamps > 0
            ? `${totalStamps - currentStamps} more ${
                totalStamps - currentStamps === 1 ? "visit" : "visits"
              } to unlock your reward`
            : "You unlocked your reward!"}
        </p>
      </div>
    </div>
  );
};
