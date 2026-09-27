"use client";

import React, { useState } from "react";
import { BottomTabBar } from "@/components/customer/BottomTabBar";
import { StampProgressModal } from "@/components/customer/StampProgressModal";
import { RewardUnlockedModal } from "@/components/customer/RewardUnlockedModal";

export default function HomePage() {
  const [showStampModal, setShowStampModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);

  return (
    <div className="min-h-screen bg-[#F2F2F5] text-[#1C1C1E] flex flex-col justify-between pb-24">
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white/80 backdrop-blur-xl border-b border-[#E4E4E7] px-4 h-14 flex items-center justify-between">
        <span className="text-[#1C7C54] font-semibold text-sm">LoyalLoop</span>
        <h1 className="font-semibold text-base text-[#1C1C1E]">Home</h1>
        <div className="w-4 h-4" />
      </header>

      <main className="flex-1 w-full max-w-md mx-auto pt-20 px-4 flex flex-col items-center justify-center text-center">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E4E4E7] w-full max-w-sm">
          <div className="w-12 h-12 rounded-full bg-[#1C7C54]/10 text-[#1C7C54] flex items-center justify-center mx-auto mb-4 font-bold text-lg">
            !
          </div>
          <h2 className="text-base font-semibold text-[#1C1C1E] mb-2">
            Design pending — screen ID not yet available
          </h2>
          <p className="text-xs text-[#6E6E73] mb-6">
            The customer Home & Reward Journey layout will be rendered here once confirmed.
          </p>

          <div className="flex flex-col gap-2 pt-2 border-t border-[#E4E4E7]">
            <span className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider mb-1">
              Preview Modal Components:
            </span>
            <button
              onClick={() => setShowStampModal(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#1C7C54] text-white text-xs font-semibold hover:bg-[#16603F] transition-colors"
            >
              Test +1 Visit Stamp Overlay
            </button>
            <button
              onClick={() => setShowRewardModal(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#C99700] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              Test Reward Unlocked Overlay
            </button>
          </div>
        </div>
      </main>

      <StampProgressModal
        isOpen={showStampModal}
        onClose={() => setShowStampModal(false)}
      />

      <RewardUnlockedModal
        isOpen={showRewardModal}
        onClose={() => setShowRewardModal(false)}
      />

      <BottomTabBar />
    </div>
  );
}
