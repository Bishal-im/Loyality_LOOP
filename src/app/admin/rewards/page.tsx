"use client";

import React, { useState } from "react";
import {
  SlidersHorizontal,
  Plus,
  TrendingUp,
  MoreVertical,
  ArrowRight,
  UploadCloud,
  Check,
  ChevronDown
} from "lucide-react";

export default function AdminRewardsPage() {
  const [selectedRewardId, setSelectedRewardId] = useState("rew_1");
  const [rewardName, setRewardName] = useState("Free Veg Momo");
  const [description, setDescription] = useState(
    "Signature steamed vegetable momos (8 pcs) with spicy sesame dip"
  );
  const [visitsRequired, setVisitsRequired] = useState(7);
  const [availability, setAvailability] = useState("30 days after unlock");
  const [isActiveStatus, setIsActiveStatus] = useState(true);

  const rewardsList = [
    {
      id: "rew_1",
      title: "Free Veg Momo",
      reqVisits: 7,
      desc: "Signature steamed vegetable momos (8 pcs)",
      redemptionRate: "42%",
      redeemedMonth: 8,
      status: "Active",
      customerPool: "128 eligible",
      avgDaysToClaim: "14.2 d",
      imgUrl:
        "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "rew_2",
      title: "Free Chicken Momo",
      reqVisits: 10,
      desc: "Spicy chicken dumplings with house chutney",
      redemptionRate: "28%",
      redeemedMonth: 4,
      status: "Active",
      customerPool: "64 eligible",
      avgDaysToClaim: "22.8 d",
      imgUrl:
        "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=120&q=80",
    },
    {
      id: "rew_3",
      title: "NPR 500 Voucher",
      reqVisits: 15,
      desc: "Direct billing credit for high frequency regulars",
      redemptionRate: "15%",
      redeemedMonth: 2,
      status: "Active",
      customerPool: "31 eligible",
      avgDaysToClaim: "38.5 d",
      imgUrl:
        "https://images.unsplash.com/photo-1556742049-0a67568d0d9f?auto=format&fit=crop&w=120&q=80",
    },
  ];

  const handleSelectReward = (rew: (typeof rewardsList)[0]) => {
    setSelectedRewardId(rew.id);
    setRewardName(rew.title);
    setDescription(rew.desc);
    setVisitsRequired(rew.reqVisits);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Reward changes saved successfully!");
  };

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-6 pb-12">
      {/* 1. Top Operational Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E4E2DD]">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-[#1D2925] tracking-tight whitespace-nowrap">
              Rewards
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#173F35]/10 text-[#173F35] border border-[#173F35]/30">
              Program Active
            </span>
          </div>
          <p className="text-xs text-[#718078] font-normal">
            Manage loyalty milestones, visit thresholds, and live customer unlock criteria
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Filter rules modal")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#E4E2DD] hover:bg-[#F8F6F1] text-[#1D2925] text-xs font-semibold transition-colors shadow-xs"
            type="button"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#718078]" />
            <span>Filter Rules</span>
          </button>
          <button
            onClick={() => alert("New reward creation modal")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#173F35] hover:bg-[#002920] text-white text-xs font-semibold transition-colors shadow-xs whitespace-nowrap"
            type="button"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>New Reward</span>
          </button>
        </div>
      </div>

      {/* 2. Operational Grid (60% / 40%) */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Active Rewards Inventory (7 cols) */}
        <div className="col-span-12 xl:col-span-7 flex flex-col gap-4">
          {/* List Controls */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-[#1D2925]">
                Active Rewards
              </span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#E4E2DD] text-xs font-bold text-[#1D2925]">
                3
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#718078] uppercase tracking-wider font-medium text-[10px]">
                SORT BY
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-1 font-semibold text-[#1D2925] hover:text-[#173F35]"
              >
                <span>Visits Required</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#718078]" />
              </button>
            </div>
          </div>

          {/* Active Rewards Cards */}
          {rewardsList.map((rew) => {
            const isSelected = selectedRewardId === rew.id;
            return (
              <div
                key={rew.id}
                onClick={() => handleSelectReward(rew)}
                className={`group relative bg-white rounded-2xl border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all cursor-pointer ${
                  isSelected
                    ? "border-[#173F35] ring-2 ring-[#173F35]/20"
                    : "border-[#E4E2DD] hover:border-[#173F35]/50"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  {/* Separate fixed 64x64px image container from text content to prevent overlap */}
                  <div className="flex items-center gap-4 min-w-0 flex-1">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F5F3EE] border border-[#E4E2DD] flex-shrink-0">
                      <img
                        src={rew.imgUrl}
                        alt={rew.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex flex-col min-w-0 flex-1">
                      <h3 className="text-base font-bold text-[#1D2925] truncate">
                        {rew.title}
                      </h3>
                      <p className="text-xs text-[#718078] mt-0.5 font-normal truncate">
                        {rew.reqVisits} visits required • {rew.desc}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs">
                        <span className="inline-flex items-center gap-1 text-[#1D2925]">
                          <TrendingUp className="w-3.5 h-3.5 text-[#173F35]" />
                          <span className="font-bold">{rew.redemptionRate}</span>{" "}
                          redemption rate
                        </span>
                        <span className="text-[#718078]">•</span>
                        <span className="text-[#718078] font-normal">
                          {rew.redeemedMonth} redeemed this month
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#173F35]/10 text-[#173F35] border border-[#173F35]/30">
                      {rew.status}
                    </span>
                    <button
                      type="button"
                      aria-label="Reward options"
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Options for ${rew.title}`);
                      }}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-[#718078] hover:text-[#1D2925] hover:bg-[#F8F6F1] transition-colors"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Metric micro-strip */}
                <div className="mt-4 pt-3 border-t border-[#E4E2DD] flex items-center justify-between text-xs text-[#718078]">
                  <div className="flex items-center gap-4 font-normal">
                    <span>
                      Customer pool:{" "}
                      <strong className="font-semibold text-[#1D2925]">
                        {rew.customerPool}
                      </strong>
                    </span>
                    <span>
                      Avg days to claim:{" "}
                      <strong className="font-semibold text-[#1D2925]">
                        {rew.avgDaysToClaim}
                      </strong>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Viewing history for ${rew.title}`);
                    }}
                    className="text-[#173F35] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>View history</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Reward Details & Builder Form (5 cols) */}
        <div className="col-span-12 xl:col-span-5 sticky top-20 flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-[#E4E2DD] p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex flex-col gap-5">
            {/* Form Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E4E2DD]">
              <div className="flex flex-col">
                <h2 className="text-base font-semibold text-[#1D2925]">
                  Reward Details
                </h2>
                <span className="text-xs text-[#718078] font-normal">
                  Editing active reward template
                </span>
              </div>
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-[#F5F3EE] text-[#1D2925] border border-[#E4E2DD]">
                ID: RWD-709
              </span>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSave} className="flex flex-col gap-4">
              {/* Reward Name */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="reward-name"
                  className="text-[11px] font-medium uppercase tracking-wider text-[#718078]"
                >
                  REWARD NAME
                </label>
                <input
                  id="reward-name"
                  type="text"
                  value={rewardName}
                  onChange={(e) => setRewardName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F3EE] border border-[#E4E2DD] rounded-xl text-xs text-[#1D2925] font-semibold focus:outline-none focus:border-[#173F35] transition-colors"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="reward-desc"
                  className="text-[11px] font-medium uppercase tracking-wider text-[#718078]"
                >
                  DESCRIPTION
                </label>
                <input
                  id="reward-desc"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F5F3EE] border border-[#E4E2DD] rounded-xl text-xs text-[#1D2925] font-medium focus:outline-none focus:border-[#173F35] transition-colors"
                />
              </div>

              {/* Visits Required & Availability Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="visits-req"
                    className="text-[11px] font-medium uppercase tracking-wider text-[#718078]"
                  >
                    VISITS REQUIRED
                  </label>
                  <div className="relative">
                    <input
                      id="visits-req"
                      type="number"
                      value={visitsRequired}
                      onChange={(e) => setVisitsRequired(Number(e.target.value))}
                      className="w-full pl-3.5 pr-14 py-2.5 bg-[#F5F3EE] border border-[#E4E2DD] rounded-xl text-xs text-[#1D2925] font-bold focus:outline-none focus:border-[#173F35]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#718078] pointer-events-none font-medium">
                      stamps
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="availability"
                    className="text-[11px] font-medium uppercase tracking-wider text-[#718078]"
                  >
                    AVAILABILITY
                  </label>
                  <div className="relative">
                    <select
                      id="availability"
                      value={availability}
                      onChange={(e) => setAvailability(e.target.value)}
                      className="w-full appearance-none pl-3.5 pr-8 py-2.5 bg-[#F5F3EE] border border-[#E4E2DD] rounded-xl text-xs text-[#1D2925] font-medium focus:outline-none focus:border-[#173F35] cursor-pointer"
                    >
                      <option>30 days after unlock</option>
                      <option>14 days after unlock</option>
                      <option>60 days after unlock</option>
                      <option>Never expires</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#718078] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Reward Image Upload Box */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium uppercase tracking-wider text-[#718078]">
                  REWARD IMAGE
                </label>
                <div
                  onClick={() => alert("Upload image prompt")}
                  className="border border-dashed border-[#E4E2DD] rounded-2xl p-3 flex items-center justify-between bg-[#F5F3EE] hover:bg-[#E4E2DD]/60 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=120&q=80"
                      alt="Thumbnail"
                      className="w-10 h-10 rounded-xl object-cover border border-[#E4E2DD]"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#1D2925]">
                        veg_momo_plate.jpg
                      </span>
                      <span className="text-[11px] text-[#718078] font-normal">
                        420 KB •{" "}
                        <span className="text-[#173F35] font-semibold group-hover:underline">
                          Change image
                        </span>
                      </span>
                    </div>
                  </div>
                  <UploadCloud className="w-5 h-5 text-[#718078] group-hover:text-[#173F35] transition-colors" />
                </div>
              </div>

              {/* Active Status Toggle */}
              <div className="flex items-center justify-between py-2 px-1">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-[#1D2925]">
                    Active Status
                  </span>
                  <span className="text-[11px] text-[#718078] font-normal">
                    Available for customers to earn immediately
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsActiveStatus(!isActiveStatus)}
                  className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${
                    isActiveStatus ? "bg-[#173F35]" : "bg-[#E4E2DD]"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ${
                      isActiveStatus ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Live Preview Section */}
              <div className="flex flex-col gap-2 pt-2 border-t border-[#E4E2DD]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#718078] uppercase tracking-wider">
                    LIVE PREVIEW
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#173F35]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#173F35]" />
                    Customer App Card
                  </span>
                </div>

                {/* Customer App Live Card Preview */}
                <div className="p-3.5 bg-white rounded-2xl border border-[#E4E2DD] shadow-xs flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=120&q=80"
                    alt="Preview"
                    className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1D2925] truncate">
                        {rewardName}
                      </span>
                      <span className="text-[11px] font-bold text-[#173F35]">
                        5 / {visitsRequired} visits
                      </span>
                    </div>

                    {/* Live Progress Bar */}
                    <div className="w-full bg-[#F8F6F1] rounded-full h-2 my-1.5 overflow-hidden">
                      <div
                        className="bg-[#173F35] h-full rounded-full transition-all duration-300"
                        style={{ width: `${(5 / visitsRequired) * 100}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-[#718078] font-medium">
                      <span>
                        {visitsRequired - 5 > 0
                          ? `${visitsRequired - 5} more visits to unlock`
                          : "Unlocked!"}
                      </span>
                      <span>Valid ABC Café</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3 px-5 rounded-xl text-xs text-white font-bold flex items-center justify-center gap-2 bg-[#173F35] hover:bg-[#002920] active:scale-[0.99] transition-all shadow-xs"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Save Reward</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

