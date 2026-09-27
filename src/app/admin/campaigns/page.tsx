"use client";

import React, { useState } from "react";
import { Megaphone, Plus, Calendar, Users, Award, Play, CheckCircle } from "lucide-react";
import { MOCK_CAMPAIGNS } from "@/lib/mock-data";

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight">
            Campaigns
          </h1>
          <p className="text-xs text-[#6E6E73] mt-0.5">
            Boost customer visits with targeted promotions & stamp multipliers
          </p>
        </div>

        <button
          onClick={() => alert("Create Campaign modal stubbed")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C7C54] hover:bg-[#16603F] text-white text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create Campaign</span>
        </button>
      </div>

      {/* Campaign Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((camp) => (
          <div
            key={camp.id}
            className="bg-white rounded-2xl p-6 shadow-sm border border-[#E4E4E7] flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#1C7C54]/10 text-[#1C7C54] text-[11px] font-semibold">
                  {camp.type}
                </span>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                    camp.status === "Active"
                      ? "bg-emerald-100 text-emerald-800"
                      : camp.status === "Draft"
                      ? "bg-zinc-100 text-zinc-600"
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  {camp.status}
                </span>
              </div>

              <h2 className="text-base font-semibold text-[#1C1C1E] mb-1">
                {camp.title}
              </h2>
              <p className="text-xs text-[#6E6E73] mb-4 leading-relaxed">
                {camp.description}
              </p>

              <div className="space-y-2 pt-3 border-t border-[#E4E4E7] text-xs">
                <div className="flex items-center justify-between text-[#6E6E73]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Duration</span>
                  </span>
                  <span className="font-medium text-[#1C1C1E]">
                    {camp.startDate} - {camp.endDate}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#6E6E73]">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    <span>Target Audience</span>
                  </span>
                  <span className="font-medium text-[#1C1C1E]">
                    {camp.targetAudience}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[#6E6E73]">
                  <span className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    <span>Redemptions</span>
                  </span>
                  <span className="font-bold text-[#1C7C54]">
                    {camp.redemptionCount} / {camp.reachCount}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-4 border-t border-[#E4E4E7] flex items-center justify-between">
              <button
                onClick={() => alert(`Edit ${camp.title}`)}
                className="text-xs font-semibold text-[#1C7C54] hover:underline"
              >
                Edit Details
              </button>
              <button
                onClick={() => alert(`Toggle status for ${camp.title}`)}
                className="text-xs font-medium text-[#6E6E73] hover:text-[#1C1C1E]"
              >
                {camp.status === "Active" ? "Pause" : "Activate"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
