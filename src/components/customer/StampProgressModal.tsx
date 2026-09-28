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
      className="fixed inset-0 z-50 flex items-center justify-center p-6 transition-opacity duration-300 backdrop-blur-[2px]"
      style={{ backgroundColor: "rgba(43,33,24,0.55)" }}
      onClick={onClose}
    >
      <div
        className="w-[88%] max-w-[340px] rounded-2xl p-6 pt-7 pb-8 flex flex-col items-center text-center select-none border"
        style={{
          backgroundColor: "var(--c-surface)",
          borderColor: "rgba(255,255,255,0.6)",
          boxShadow: "0 12px 40px -10px rgba(43,33,24,0.22)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p
          className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-6"
          style={{ color: "var(--c-text-secondary)" }}
        >
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
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--c-gold)",
                    boxShadow: "0 1px 6px rgba(217,164,65,0.35)",
                  }}
                >
                  <Check className="w-4 h-4 stroke-[3] text-white" />
                </div>
              );
            }

            if (isJustLanded) {
              return (
                <div key={index} className="relative flex items-center justify-center">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white animate-bounce"
                    style={{
                      backgroundColor: "var(--c-gold)",
                      boxShadow: "0 0 14px rgba(217,164,65,0.55), 0 0 0 2px rgba(217,164,65,0.3)",
                    }}
                  >
                    <Check className="w-4.5 h-4.5 stroke-[3]" />
                  </div>
                </div>
              );
            }

            return (
              <div
                key={index}
                className="w-7 h-7 rounded-full border-2"
                style={{
                  borderColor: "var(--c-border)",
                  backgroundColor: "transparent",
                }}
              />
            );
          })}
        </div>

        <h3
          className="text-[22px] font-semibold tracking-tight leading-tight mb-1.5"
          style={{ color: "var(--c-text-primary)" }}
        >
          +1 Visit
        </h3>

        <p className="text-[13px] leading-relaxed" style={{ color: "var(--c-text-secondary)" }}>
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
