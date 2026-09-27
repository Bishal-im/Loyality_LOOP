"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RedeemRewardPage({
  params,
}: {
  params: Promise<{ rewardId: string }>;
}) {
  const resolvedParams = React.use(params);

  return (
    <div className="min-h-screen bg-[#F2F2F5] text-[#1C1C1E] flex flex-col justify-between">
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white/80 backdrop-blur-xl border-b border-[#E4E4E7] px-4 h-14 flex items-center justify-between">
        <Link href="/home" className="text-[#6E6E73] hover:text-[#1C1C1E]">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-semibold text-base text-[#1C1C1E]">Redeem Reward</h1>
        <div className="w-5 h-5" />
      </header>

      <main className="flex-1 w-full max-w-md mx-auto pt-20 px-4 flex flex-col items-center justify-center text-center">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-[#E4E4E7] w-full max-w-sm">
          <span className="text-xs text-[#6E6E73] font-mono mb-2 block">
            ID: {resolvedParams.rewardId}
          </span>
          <h2 className="text-base font-semibold text-[#1C1C1E] mb-2">
            Design pending — screen ID not yet available
          </h2>
          <p className="text-xs text-[#6E6E73]">
            The reward redemption screen will be rendered here once confirmed in Stitch.
          </p>
        </div>
      </main>
    </div>
  );
}
