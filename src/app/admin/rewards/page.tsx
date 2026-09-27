"use client";

import React, { useState } from "react";
import { Gift, Plus, Stamp, Tag, Clock, Award } from "lucide-react";
import { MOCK_REWARDS } from "@/lib/mock-data";

export default function AdminRewardsPage() {
  const [rewards, setRewards] = useState(MOCK_REWARDS);

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight">
            Rewards (Reward Builder)
          </h1>
          <p className="text-xs text-[#6E6E73] mt-0.5">
            Configure unlockable rewards and stamp thresholds for your customers
          </p>
        </div>

        <button
          onClick={() => alert("Reward Builder modal stubbed")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C7C54] hover:bg-[#16603F] text-white text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Reward</span>
        </button>
      </div>

      {/* Rewards Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rewards.map((reward) => (
          <div
            key={reward.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#E4E4E7] flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#C99700]/10 text-[#C99700] text-[11px] font-semibold">
                  <Stamp className="w-3 h-3" />
                  <span>{reward.stampsRequired} Stamps Required</span>
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                  {reward.status}
                </span>
              </div>

              <h2 className="text-base font-semibold text-[#1C1C1E] mb-1">
                {reward.title}
              </h2>
              <p className="text-xs text-[#6E6E73] mb-4 leading-relaxed">
                {reward.description}
              </p>

              <div className="space-y-2 pt-3 border-t border-[#E4E4E7] text-xs">
                <div className="flex items-center justify-between text-[#6E6E73]">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Category</span>
                  </span>
                  <span className="font-medium text-[#1C1C1E]">
                    {reward.category}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#6E6E73]">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Expiry after unlock</span>
                  </span>
                  <span className="font-medium text-[#1C1C1E]">
                    {reward.expiryDays} days
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#6E6E73]">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>Total Redeemed</span>
                  </span>
                  <span className="font-bold text-[#1C7C54]">
                    {reward.totalRedeemed} times
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-[#E4E4E7] flex items-center justify-between">
              <button
                onClick={() => alert(`Edit ${reward.title}`)}
                className="text-xs font-semibold text-[#1C7C54] hover:underline"
              >
                Edit Reward
              </button>
              <button
                onClick={() => alert(`Pause ${reward.title}`)}
                className="text-xs font-medium text-[#6E6E73] hover:text-[#1C1C1E]"
              >
                Pause
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
