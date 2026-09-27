"use client";

import React from "react";
import { BottomTabBar } from "@/components/customer/BottomTabBar";

export default function RewardsPage() {
  return (
    <div className="min-h-screen bg-[#F2F2F5] text-[#1C1C1E] flex flex-col justify-between pb-24">
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white/80 backdrop-blur-xl border-b border-[#E4E4E7] px-4 h-14 flex items-center justify-between">
        <span className="text-[#1C7C54] font-semibold text-sm">LoyalLoop</span>
        <h1 className="font-semibold text-base text-[#1C1C1E]">Rewards</h1>
        <div className="w-4 h-4" />
      </header>

      <main className="flex-1 w-full max-w-md mx-auto pt-20 px-4 flex flex-col items-center justify-center text-center">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E4E4E7] w-full max-w-sm">
          <h2 className="text-base font-semibold text-[#1C1C1E] mb-2">
            Design pending — screen ID not yet available
          </h2>
          <p className="text-xs text-[#6E6E73]">
            The customer Rewards page layout will be rendered here once confirmed in Stitch.
          </p>
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}
