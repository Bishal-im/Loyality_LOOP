"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface RewardUnlockedModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardTitle?: string;
  rewardId?: string;
  currentStamps?: number;
  totalStamps?: number;
}

export const RewardUnlockedModal: React.FC<RewardUnlockedModalProps> = ({
  isOpen,
  onClose,
  rewardTitle = "Free Veg Momo",
  rewardId,
  currentStamps = 10,
  totalStamps = 10,
}) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleViewReward = () => {
    onClose();
    if (rewardId) router.push(`/redeem/${rewardId}`);
    else router.push("/rewards");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6 transition-opacity duration-300 backdrop-blur-[4px]"
      style={{ backgroundColor: "rgba(43,33,24,0.55)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[330px] rounded-[20px] p-7 flex flex-col items-center text-center relative select-none border"
        style={{
          backgroundColor: "var(--c-surface)",
          color: "var(--c-text-primary)",
          borderColor: "var(--c-border)",
          boxShadow: "0 12px 48px rgba(43,33,24,0.25)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
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

        {/* Gold badge */}
        <div className="relative flex items-center justify-center my-1">
          <div
            className="w-[70px] h-[70px] rounded-full flex items-center justify-center text-white"
            style={{
              backgroundColor: "var(--c-gold)",
              boxShadow: "0 0 0 8px rgba(217,164,65,0.15), 0 10px 22px rgba(217,164,65,0.35)",
            }}
          >
            <Check className="w-8 h-8 stroke-[3.5]" />
          </div>
        </div>

        <span
          className="text-[11px] font-semibold uppercase tracking-widest mt-4"
          style={{ color: "var(--c-text-secondary)" }}
        >
          {currentStamps} of {totalStamps} stamps
        </span>

        <h3 className="text-xl font-semibold mt-1.5" style={{ color: "var(--c-text-primary)" }}>
          🎉 Reward Unlocked!
        </h3>

        <p className="text-base font-medium mt-1" style={{ color: "var(--c-text-primary)" }}>
          {rewardTitle}
        </p>

        <p className="text-xs mt-1" style={{ color: "var(--c-text-secondary)" }}>
          Show this to staff to redeem
        </p>

        <button
          onClick={handleViewReward}
          className="w-full mt-6 py-3.5 px-5 rounded-xl text-sm text-white font-semibold flex items-center justify-center transition-all active:scale-[0.98]"
          style={{ backgroundColor: "var(--c-terracotta)" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--c-terracotta-deep)")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--c-terracotta)")}
          type="button"
        >
          View Reward
        </button>

        <button
          onClick={onClose}
          className="mt-3.5 py-1 text-center text-xs transition-colors"
          style={{ color: "var(--c-text-muted)" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--c-text-primary)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--c-text-muted)")}
          type="button"
        >
          Continue browsing
        </button>
      </div>
    </div>
  );
};
