"use client";

import React from "react";
import { Check, X } from "lucide-react";

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
  rewardTitle = "Artisan Coffee & Pastry",
  currentStamps = 5,
  totalStamps = 10,
}) => {
  if (!isOpen) return null;

  const remaining = Math.max(totalStamps - currentStamps, 0);
  const isComplete = remaining === 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6 transition-opacity duration-300 backdrop-blur-[2px]"
      style={{ backgroundColor: "rgba(43,33,24,0.55)" }}
      onClick={onClose}
    >
      <div
        className="w-[88%] max-w-[340px] rounded-2xl p-6 pt-7 pb-8 flex flex-col items-center text-center select-none border relative"
        style={{
          backgroundColor: "var(--c-surface)",
          borderColor: "rgba(255,255,255,0.6)",
          boxShadow: "0 12px 40px -10px rgba(43,33,24,0.22)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full transition-colors"
          style={{ color: "var(--c-text-muted)" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--c-bg)")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "")}
          type="button"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <p
          className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-5"
          style={{ color: "var(--c-text-secondary)" }}
        >
          {rewardTitle}
        </p>

        {/* Stamp dots */}
        <div className="flex items-center gap-2 flex-wrap justify-center w-full max-w-[280px] mb-6">
          {Array.from({ length: totalStamps }).map((_, index) => {
            const isCompleted  = index < currentStamps - 1;
            const isJustLanded = index === currentStamps - 1;
            if (isCompleted) {
              return (
                <div
                  key={index}
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--c-gold)", boxShadow: "0 1px 6px rgba(217,164,65,0.35)" }}
                >
                  <Check className="w-4 h-4 stroke-[3] text-white" />
                </div>
              );
            }
            if (isJustLanded) {
              return (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white animate-bounce"
                  style={{
                    backgroundColor: "var(--c-gold)",
                    boxShadow: "0 0 14px rgba(217,164,65,0.55), 0 0 0 2px rgba(217,164,65,0.3)",
                  }}
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              );
            }
            return (
              <div
                key={index}
                className="w-7 h-7 rounded-full border-2"
                style={{ borderColor: "var(--c-border)", backgroundColor: "transparent" }}
              />
            );
          })}
        </div>

        <h3 className="text-[22px] font-semibold tracking-tight leading-tight mb-1.5" style={{ color: "var(--c-text-primary)" }}>
          +1 Stamp
        </h3>

        <p className="text-[13px] leading-relaxed" style={{ color: "var(--c-text-secondary)" }}>
          {isComplete
            ? "🎉 You've unlocked your reward!"
            : `${remaining} more ${remaining === 1 ? "visit" : "visits"} to unlock your reward`}
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full py-3 rounded-xl font-semibold text-[14px] text-white transition-all active:scale-[0.98]"
          style={{ backgroundColor: "var(--c-terracotta)" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--c-terracotta-deep)")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--c-terracotta)")}
          type="button"
        >
          {isComplete ? "View Reward →" : "Got it"}
        </button>
      </div>
    </div>
  );
};
