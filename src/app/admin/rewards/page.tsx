"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  TrendingUp,
  X,
  Check,
  ChevronDown,
  Trash2,
  UtensilsCrossed,
  Ticket,
  Coffee,
  Sparkles,
  Users,
  Clock,
  UploadCloud,
  Pencil,
} from "lucide-react";
import { DemoIndicator } from "@/components/admin/DemoIndicator";

export interface RewardItem {
  id: string;
  title: string;
  reqVisits: number;
  desc: string;
  category: "food" | "voucher" | "beverage" | "special";
  redemptionRate: number;
  redeemedMonth: number;
  status: "Active" | "Inactive";
  customerPool: string;
  avgDaysToClaim: string;
  imgUrl: string;
  availability: string;
}

const INITIAL_REWARDS: RewardItem[] = [
  {
    id: "RWD-712",
    title: "Free Artisanal Coffee",
    reqVisits: 4,
    desc: "Choice of Cappuccino, Flat White, Latte, or Americano",
    category: "beverage",
    redemptionRate: 54,
    redeemedMonth: 16,
    status: "Active",
    customerPool: "210 eligible",
    avgDaysToClaim: "8.1 d",
    imgUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80",
    availability: "14 days after unlock",
  },
  {
    id: "RWD-709",
    title: "Free Veg Momo",
    reqVisits: 7,
    desc: "Signature steamed vegetable momos (8 pcs) with spicy sesame dip",
    category: "food",
    redemptionRate: 42,
    redeemedMonth: 8,
    status: "Active",
    customerPool: "128 eligible",
    avgDaysToClaim: "14.2 d",
    imgUrl: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=300&q=80",
    availability: "30 days after unlock",
  },
  {
    id: "RWD-710",
    title: "Free Chicken Momo",
    reqVisits: 10,
    desc: "Spicy chicken dumplings with house tomato-coriander chutney",
    category: "food",
    redemptionRate: 28,
    redeemedMonth: 4,
    status: "Active",
    customerPool: "64 eligible",
    avgDaysToClaim: "22.8 d",
    imgUrl: "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=300&q=80",
    availability: "30 days after unlock",
  },
  {
    id: "RWD-711",
    title: "NPR 500 Voucher",
    reqVisits: 15,
    desc: "Direct billing credit on any bill over NPR 1,000 for regulars",
    category: "voucher",
    redemptionRate: 15,
    redeemedMonth: 2,
    status: "Active",
    customerPool: "31 eligible",
    avgDaysToClaim: "38.5 d",
    imgUrl: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?auto=format&fit=crop&w=300&q=80",
    availability: "60 days after unlock",
  },
];

const CATEGORY_META: Record<
  RewardItem["category"],
  { label: string; icon: React.ElementType }
> = {
  food:     { label: "Food",    icon: UtensilsCrossed },
  voucher:  { label: "Voucher", icon: Ticket },
  beverage: { label: "Drink",   icon: Coffee },
  special:  { label: "Special", icon: Sparkles },
};

/** Returns ring style based on performance tier relative to others. */
function getRingStyle(
  rate: number,
  maxRate: number,
  minRate: number,
  isExpanded: boolean,
  isActive: boolean
): string {
  if (!isActive) {
    // Inactive: thin dashed grey
    return "ring-[1.5px] ring-dashed ring-[#D4D4D8] ring-offset-[3px] ring-offset-white opacity-60";
  }
  if (isExpanded) {
    return "ring-[3px] ring-[#18181B] ring-offset-[4px] ring-offset-white";
  }
  const range = maxRate - minRate || 1;
  const normalized = (rate - minRate) / range; // 0 → 1

  if (normalized >= 0.8) {
    // Top performer: solid accent ring
    return "ring-[3px] ring-primary ring-offset-[3px] ring-offset-white";
  } else if (normalized >= 0.4) {
    // Mid: solid neutral dark ring
    return "ring-[2.5px] ring-[#27272A] ring-offset-[3px] ring-offset-white";
  } else {
    // Low: lighter, thinner grey
    return "ring-[1.5px] ring-[#A1A1AA] ring-offset-[3px] ring-offset-white";
  }
}

/** Circular photo thumbnail with branded gradient fallback */
function NodeImage({
  src,
  category,
  size = 72,
}: {
  src: string;
  category: RewardItem["category"];
  size?: number;
}) {
  const [err, setErr] = useState(false);
  const { icon: Icon } = CATEGORY_META[category];
  
  // Category-specific gradient backgrounds for fallback
  const gradientMap: Record<RewardItem["category"], string> = {
    food: "linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)",
    voucher: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)",
    beverage: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
    special: "linear-gradient(135deg, #FDF4FF 0%, #FAE8FF 100%)",
  };
  
  const iconColorMap: Record<RewardItem["category"], string> = {
    food: "#EA580C",
    voucher: "#4F46E5",
    beverage: "#16A34A",
    special: "#A855F7",
  };
  
  return (
    <div
      className="rounded-full overflow-hidden flex items-center justify-center shrink-0"
      style={{ 
        width: size, 
        height: size,
        background: (!err && src) ? "#F4F4F5" : gradientMap[category],
      }}
    >
      {!err && src ? (
        <img
          src={src}
          alt=""
          onError={() => setErr(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <Icon 
          className="w-6 h-6" 
          strokeWidth={1.5}
          style={{ color: iconColorMap[category] }}
        />
      )}
    </div>
  );
}

export default function AdminRewardsPage() {
  const [rewards, setRewards] = useState<RewardItem[]>(INITIAL_REWARDS);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<RewardItem["category"]>("food");
  const [formDesc, setFormDesc] = useState("");
  const [formVisits, setFormVisits] = useState(5);
  const [formAvailability, setFormAvailability] = useState("30 days after unlock");
  const [formImgUrl, setFormImgUrl] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);

  const sortedRewards = useMemo(
    () => [...rewards].sort((a, b) => a.reqVisits - b.reqVisits),
    [rewards]
  );

  const maxRate = useMemo(() => Math.max(...rewards.map((r) => r.redemptionRate)), [rewards]);
  const minRate = useMemo(() => Math.min(...rewards.map((r) => r.redemptionRate)), [rewards]);
  const activeCount = rewards.filter((r) => r.status === "Active").length;

  const openEdit = (reward: RewardItem) => {
    if (expandedId === reward.id && !isCreating) { setExpandedId(null); return; }
    setExpandedId(reward.id); setIsCreating(false);
    setFormName(reward.title); setFormCategory(reward.category);
    setFormDesc(reward.desc); setFormVisits(reward.reqVisits);
    setFormAvailability(reward.availability); setFormImgUrl(reward.imgUrl);
    setFormIsActive(reward.status === "Active");
  };

  const openCreate = () => {
    setExpandedId("NEW"); setIsCreating(true);
    setFormName(""); setFormCategory("food"); setFormDesc("");
    setFormVisits(sortedRewards.length > 0 ? Math.max(...sortedRewards.map((r) => r.reqVisits)) + 5 : 5);
    setFormAvailability("30 days after unlock"); setFormImgUrl(""); setFormIsActive(true);
  };

  const closeEditor = () => { setExpandedId(null); setIsCreating(false); };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;
    if (isCreating) {
      const newId = `RWD-${800 + rewards.length}`;
      setRewards((prev) => [...prev, {
        id: newId, title: formName, category: formCategory, reqVisits: formVisits,
        desc: formDesc || "Customer milestone unlock", redemptionRate: 0, redeemedMonth: 0,
        status: formIsActive ? "Active" : "Inactive", customerPool: "New threshold",
        avgDaysToClaim: "0 d", imgUrl: formImgUrl, availability: formAvailability,
      }]);
      setExpandedId(newId); setIsCreating(false);
    } else if (expandedId) {
      setRewards((prev) => prev.map((r) => r.id === expandedId
        ? { ...r, title: formName, category: formCategory, desc: formDesc, reqVisits: formVisits, availability: formAvailability, imgUrl: formImgUrl || r.imgUrl, status: formIsActive ? "Active" : "Inactive" }
        : r
      ));
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Remove "${name}" from the milestone path?`)) {
      setRewards((prev) => prev.filter((r) => r.id !== id));
      closeEditor();
    }
  };

  const currentReward = rewards.find((r) => r.id === expandedId);

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-6 pb-16">

      {/* ── 1. Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5">
            <h1 className="text-[24px] font-semibold text-[#18181B] tracking-tight leading-tight">
              Reward Path
            </h1>
            <DemoIndicator />
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#137333] animate-pulse" />
              Ladder Active
            </span>
          </div>
          <p className="text-[14px] font-normal text-[#71717A] mt-0.5">
            Customer loyalty progression journey · {sortedRewards.length} milestones · ring weight indicates redemption performance
          </p>
        </div>
        <button
          onClick={openCreate}
          className="btn-press inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          type="button"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          Add Milestone
        </button>
      </div>

      {/* ── 2. Reward Path Card ── */}
      <div className="bg-white rounded-[20px] border border-[#E5E5E5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow overflow-hidden">
        <div className="px-8 pt-8 pb-2">

          {/* Label row */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.07em]">
              Customer Loyalty Progression
            </span>
            <span className="text-[11px] text-[#71717A] font-normal tabular-nums">
              {activeCount} of {sortedRewards.length} active
            </span>
          </div>

          {/* ── Path nodes with connecting line ── */}
          <div className="relative overflow-x-auto pb-4 -mx-2 px-2 sm:mx-0 sm:px-0">
            {/*
              Connecting track: gradient grey line with tick-mark dots at
              each inter-node midpoint. SVG drawn absolutely behind nodes.
            */}
            {/*
              Track line: positioned at exact center of the 72px node circles.
              Math: badge (~20px) + mb-3 gap (12px) + half-circle (36px) = 68px from container top.
              z-0 keeps it behind z-10 nodes so circles sit "on top of" the line.
            */}
            <div
              className="absolute z-0 overflow-visible hidden sm:block"
              style={{
                top: "68px",
                left: "44px",
                right: "44px",
                height: "2.5px",
                background: "linear-gradient(to right, #D4D4D8 0%, #A1A1AA 30%, #A1A1AA 70%, #D4D4D8 100%)",
                borderRadius: "9999px",
              }}
            >
              {/* Tick mark dots — centered on the line, one per inter-node gap */}
              {sortedRewards.length > 0 && Array.from({ length: sortedRewards.length }).map((_, i) => {
                const totalSegs = sortedRewards.length;
                const pct = ((i + 0.5) / totalSegs) * 100;
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[5px] h-[5px] rounded-full bg-[#E5E5E5] border border-[#A1A1AA]"
                    style={{ left: `${pct}%` }}
                  />
                );
              })}
            </div>

            {/* Nodes */}
            <div className="relative z-10 flex items-start gap-2 min-w-min">{sortedRewards.map((reward) => {
                const isExpanded = expandedId === reward.id && !isCreating;
                const isActive = reward.status === "Active";
                const isOtherExpanded = expandedId !== null && expandedId !== reward.id;
                const ringClass = getRingStyle(reward.redemptionRate, maxRate, minRate, isExpanded, isActive);
                const isTopPerformer = reward.redemptionRate === maxRate && isActive;

                return (
                  <button
                    key={reward.id}
                    type="button"
                    onClick={() => openEdit(reward)}
                    className={`flex flex-col items-center flex-1 min-w-0 cursor-pointer transition-all duration-200 group focus-visible:outline-none ${
                      isOtherExpanded ? "opacity-40 scale-95" : "opacity-100 scale-100"
                    }`}
                  >
                    {/* Visit badge — neutral dark, not accent */}
                    <span
                      className={`mb-3 px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap tabular-nums transition-colors ${
                        isExpanded
                          ? "bg-[#18181B] text-white"
                          : "bg-[#F4F4F5] text-[#52525B] border border-[#E5E5E5] group-hover:bg-[#18181B] group-hover:text-white group-hover:border-[#18181B]"
                      }`}
                    >
                      {reward.reqVisits} visits
                    </span>

                    {/* Node circle */}
                    <div
                      className={`relative rounded-full p-[2px] transition-all duration-200 ${ringClass} ${
                        !isOtherExpanded ? "group-hover:scale-105 group-hover:shadow-md" : ""
                      } ${isExpanded ? "scale-110 shadow-lg" : ""}`}
                    >
                      <NodeImage src={reward.imgUrl} category={reward.category} size={72} />

                      {/* Category badge — white circle, 1.5px stroke lucide icon */}
                      <div className="absolute -bottom-0.5 -right-0.5 w-[22px] h-[22px] rounded-full bg-white border border-[#E5E5E5] shadow-[0_1px_3px_rgba(0,0,0,0.10)] flex items-center justify-center">
                        {React.createElement(CATEGORY_META[reward.category].icon, {
                          className: "w-3 h-3 text-[#52525B]",
                          strokeWidth: 1.5,
                        })}
                      </div>

                      {/* Inactive badge */}
                      {!isActive && (
                        <div className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] rounded-full bg-[#71717A] border-2 border-white flex items-center justify-center text-[7px] text-white leading-none">
                          ⏸
                        </div>
                      )}

                      {/* Top performer star indicator */}
                      {isTopPerformer && !isExpanded && (
                        <div className="absolute -top-0.5 -left-0.5 w-[18px] h-[18px] rounded-full bg-primary border-2 border-white flex items-center justify-center text-[8px] text-white leading-none shadow-sm">
                          ★
                        </div>
                      )}
                    </div>

                    {/* Label + stat */}
                    <div className="flex flex-col items-center text-center mt-3 px-1 min-w-0 w-full">
                      <span
                        className={`text-[13px] font-semibold leading-snug line-clamp-1 w-full transition-colors ${
                          isExpanded ? "text-[#18181B]" : "text-[#18181B] group-hover:text-[#18181B]"
                        }`}
                      >
                        {reward.title}
                      </span>
                      <span
                        className={`text-[11px] font-normal mt-0.5 tabular-nums ${
                          isTopPerformer ? "text-primary font-medium" : "text-[#71717A]"
                        }`}
                      >
                        {reward.redemptionRate}% redeemed
                      </span>
                    </div>

                    {/* Expand chevron */}
                    {isExpanded && (
                      <div className="mt-2.5 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[#18181B]" />
                    )}
                  </button>
                );
              })}

              {/* ── "+" Add node — muted, secondary ── */}
              <button
                type="button"
                onClick={openCreate}
                className={`flex flex-col items-center flex-1 min-w-0 cursor-pointer transition-all duration-200 group focus-visible:outline-none ${
                  expandedId !== null && expandedId !== "NEW" ? "opacity-40 scale-95" : "opacity-100 scale-100"
                }`}
              >
                {/* Spacer badge */}
                <span
                  className={`mb-3 px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap border transition-colors ${
                    expandedId === "NEW" && isCreating
                      ? "bg-[#18181B] text-white border-[#18181B]"
                      : "bg-[#F4F4F5] text-[#71717A] border-[#E5E5E5] group-hover:bg-[#F4F4F5] group-hover:border-[#D4D4D8]"
                  }`}
                >
                  + New
                </span>

                {/* Dashed circle — neutral, not accent */}
                <div
                  className={`w-[78px] h-[78px] rounded-full border-[1.5px] border-dashed flex items-center justify-center transition-all duration-200 ${
                    expandedId === "NEW" && isCreating
                      ? "border-[#18181B] bg-[#F4F4F5] ring-[2px] ring-[#18181B] ring-offset-[3px] ring-offset-white scale-110"
                      : "border-[#D4D4D8] bg-[#FAFAFA] group-hover:border-[#A1A1AA] group-hover:bg-[#F4F4F5] group-hover:scale-105"
                  }`}
                >
                  <Plus
                    className={`w-6 h-6 transition-colors ${
                      expandedId === "NEW" && isCreating ? "text-[#18181B]" : "text-[#A1A1AA] group-hover:text-[#71717A]"
                    }`}
                    strokeWidth={1.5}
                  />
                </div>

                <div className="flex flex-col items-center text-center mt-3 px-1">
                  <span className="text-[13px] font-semibold text-[#71717A] group-hover:text-[#52525B] leading-snug transition-colors">
                    Add Milestone
                  </span>
                  <span className="text-[11px] text-[#A1A1AA] font-normal mt-0.5">Create new</span>
                </div>

                {expandedId === "NEW" && isCreating && (
                  <div className="mt-2.5 w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-[#18181B]" />
                )}
              </button>
            </div>
          </div>

          {/* ── Redemption unified comparison row ── */}
          {!expandedId && (
            <div className="mt-8 border-t border-[#E5E5E5]">
              <div className="flex items-center gap-2 px-0 py-4">
                <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.07em]">
                  Redemption Rate Comparison
                </span>
                <span className="ml-auto text-[11px] text-[#71717A] font-normal">
                  Ring weight = performance
                </span>
              </div>

              {/* Single unified row — vertical dividers between columns */}
              <div
                className="flex divide-x divide-[#E5E5E5] bg-[#FAFAFA] rounded-[12px] border border-[#E5E5E5] overflow-hidden mb-6"
              >
                {sortedRewards.map((reward, idx) => {
                  const isTop = reward.redemptionRate === maxRate;
                  return (
                    <div key={reward.id} className="flex-1 px-5 py-4 flex flex-col gap-3 min-w-0">
                      {/* Name + rate */}
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[12px] font-semibold text-[#18181B] truncate">{reward.title}</span>
                        <span className={`text-[13px] font-bold tabular-nums shrink-0 ${isTop ? "text-primary" : "text-[#52525B]"}`}>
                          {reward.redemptionRate}%
                        </span>
                      </div>

                      {/* Gradient bar */}
                      <div className="w-full h-2 bg-[#EBEBEB] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${reward.redemptionRate}%`,
                            background: isTop
                              ? "linear-gradient(to right, var(--primary, #C96F4A), #D4845D)"
                              : "linear-gradient(to right, #A1A1AA, #71717A)",
                          }}
                        />
                      </div>

                      {/* Sub stats */}
                      <div className="flex items-center justify-between text-[10px] text-[#A1A1AA] tabular-nums">
                        <span>{reward.reqVisits} stamps</span>
                        <span>{reward.redeemedMonth}/mo</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* ── 3. Inline Editor (unfolds below path) ── */}
        {expandedId && (
          <div className="border-t border-[#E5E5E5] bg-[#FAFAFA]">
            <form onSubmit={handleSave} className="px-8 py-7 flex flex-col gap-6">

              {/* Editor header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] flex items-center justify-center text-[#52525B] shrink-0">
                    {isCreating
                      ? <Plus className="w-4 h-4" strokeWidth={1.5} />
                      : <Pencil className="w-4 h-4" strokeWidth={1.5} />}
                  </div>
                  <div>
                    <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.07em]">
                      {isCreating ? "Creating new milestone" : `Editing · ${currentReward?.id}`}
                    </span>
                    <h3 className="text-[16px] font-semibold text-[#18181B] leading-tight">
                      {isCreating ? "Configure New Milestone" : `Editing: ${currentReward?.title}`}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!isCreating && currentReward && (
                    <button
                      type="button"
                      onClick={() => handleDelete(currentReward.id, currentReward.title)}
                      className="px-3 py-2 rounded-xl text-xs font-medium text-[#C5221F] hover:bg-[#FCE8E6] transition-colors flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" strokeWidth={1.5} /> Delete
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={closeEditor}
                    className="px-3.5 py-2 rounded-xl bg-white border border-[#E5E5E5] text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] text-xs font-medium transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <X className="w-3.5 h-3.5" strokeWidth={1.5} /> Close
                  </button>
                </div>
              </div>

              {/* Form body */}
              <div className="grid grid-cols-12 gap-6 sm:gap-8">
                {/* LEFT: Primary fields */}
                <div className="col-span-12 lg:col-span-5 flex flex-col gap-5">

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.07em]">MILESTONE NAME *</label>
                    <input
                      required type="text" placeholder="e.g. Free Veg Momo"
                      value={formName} onChange={(e) => setFormName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white text-[#18181B] text-sm font-medium rounded-xl border border-[#E5E5E5] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.07em]">DESCRIPTION</label>
                    <input
                      type="text" placeholder="Describe what the customer receives"
                      value={formDesc} onChange={(e) => setFormDesc(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-white text-[#18181B] text-xs rounded-xl border border-[#E5E5E5] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.07em]">VISITS REQUIRED</label>
                      <div className="relative">
                        <input
                          type="number" min={1} max={100} value={formVisits}
                          onChange={(e) => setFormVisits(Number(e.target.value))}
                          className="w-full pl-3.5 pr-14 py-2.5 bg-white text-[#18181B] text-sm font-bold rounded-xl border border-[#E5E5E5] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all tabular-nums"
                        />
                        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-[#71717A] pointer-events-none">stamps</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.07em]">AVAILABILITY</label>
                      <div className="relative">
                        <select
                          value={formAvailability} onChange={(e) => setFormAvailability(e.target.value)}
                          className="w-full appearance-none pl-3.5 pr-8 py-2.5 bg-white text-[#18181B] text-xs font-medium rounded-xl border border-[#E5E5E5] focus:outline-none focus:border-primary cursor-pointer"
                        >
                          <option>14 days after unlock</option>
                          <option>30 days after unlock</option>
                          <option>60 days after unlock</option>
                          <option>Never expires</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#71717A] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.07em]">THUMBNAIL IMAGE</label>
                    <div className="flex items-center gap-3 p-3 border border-dashed border-[#E5E5E5] rounded-xl bg-white hover:bg-[#F4F4F5] transition-colors group">
                      <NodeImage src={formImgUrl} category={formCategory} size={40} />
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-xs font-medium text-[#18181B] truncate">
                          {formName ? `${formName.toLowerCase().replace(/\s+/g, "_")}.jpg` : "reward_image.jpg"}
                        </span>
                        <button
                          type="button"
                          onClick={() => { const u = prompt("Enter image URL:", formImgUrl); if (u !== null) setFormImgUrl(u); }}
                          className="text-[11px] text-primary font-medium hover:underline text-left w-fit"
                        >
                          Change URL
                        </button>
                      </div>
                      <UploadCloud className="w-4 h-4 text-[#71717A] group-hover:text-[#52525B] transition-colors shrink-0" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* MIDDLE: Category + toggle + save */}
                <div className="col-span-12 lg:col-span-3 flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.07em]">CATEGORY</label>
                    <div className="flex flex-col gap-2">
                      {(["food", "voucher", "beverage", "special"] as const).map((cat) => {
                        const { label, icon: Icon } = CATEGORY_META[cat];
                        const selected = formCategory === cat;
                        return (
                          <button
                            key={cat} type="button" onClick={() => setFormCategory(cat)}
                            className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs font-medium transition-all ${
                              selected
                                ? "border-[#18181B] bg-[#18181B] text-white"
                                : "border-[#E5E5E5] bg-white text-[#71717A] hover:text-[#18181B] hover:border-[#D4D4D8]"
                            }`}
                          >
                            <Icon className="w-4 h-4" strokeWidth={1.5} />
                            {label}
                            {selected && <Check className="w-3.5 h-3.5 ml-auto" strokeWidth={2} />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-[#E5E5E5] flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-[#18181B]">Active on path</span>
                        <span className="text-[11px] text-[#71717A] font-normal">Visible to customers</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFormIsActive(!formIsActive)}
                        className={`relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${
                          formIsActive ? "bg-primary" : "bg-[#E5E5E5]"
                        }`}
                      >
                        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ${formIsActive ? "translate-x-4" : "translate-x-0"}`} />
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="btn-press w-full py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      <Check className="w-4 h-4" strokeWidth={2} />
                      {isCreating ? "Create Milestone" : "Save Changes"}
                    </button>
                  </div>
                </div>

                {/* RIGHT: Performance (edit mode only) */}
                {!isCreating && currentReward && (
                  <div className="col-span-12 lg:col-span-4 flex flex-col gap-3 border-t lg:border-t-0 lg:border-l border-[#E5E5E5] pt-5 lg:pt-0 lg:pl-8">
                    <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.07em] flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" strokeWidth={1.5} />
                      Milestone Performance
                    </span>

                    {[
                      { label: "Redemption rate", value: `${currentReward.redemptionRate}%`, sub: "of eligible customers", icon: TrendingUp },
                      { label: "Claimed this month", value: `${currentReward.redeemedMonth}`, sub: "redemptions", icon: Check },
                      { label: "Avg days to claim", value: currentReward.avgDaysToClaim, sub: "after unlocking", icon: Clock },
                      { label: "Eligible pool", value: currentReward.customerPool, sub: "", icon: Users },
                    ].map(({ label, value, sub, icon: Icon }) => (
                      <div key={label} className="flex items-center gap-3 p-3.5 bg-white rounded-xl border border-[#E5E5E5] hover:border-[#D4D4D8] transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-[#F4F4F5] border border-[#E5E5E5]/60 flex items-center justify-center text-[#71717A] shrink-0">
                          <Icon className="w-4 h-4" strokeWidth={1.5} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] text-[#71717A] font-normal">{label}</p>
                          <p className="text-sm font-bold text-[#18181B] tabular-nums leading-tight">
                            {value}
                            {sub && <span className="font-normal text-[#71717A] text-[11px] ml-1">{sub}</span>}
                          </p>
                        </div>
                      </div>
                    ))}

                    <div className="px-3.5 py-3 bg-white rounded-xl border border-[#E5E5E5]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] text-[#71717A] font-normal">vs. path average</span>
                        <span className={`text-[11px] font-bold tabular-nums ${currentReward.redemptionRate >= maxRate * 0.7 ? "text-primary" : "text-[#71717A]"}`}>
                          {currentReward.redemptionRate}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[#F4F4F5] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${currentReward.redemptionRate}%`,
                            background: currentReward.redemptionRate === maxRate
                              ? "linear-gradient(to right, var(--primary, #C96F4A), #D4845D)"
                              : "linear-gradient(to right, #A1A1AA, #71717A)",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
