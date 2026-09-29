"use client";

import React, { useState, useMemo } from "react";
import {
  Plus,
  TrendingUp,
  SlidersHorizontal,
  X,
  Check,
  ChevronDown,
  UploadCloud,
  Eye,
  Trash2,
  UtensilsCrossed,
  Ticket,
  Coffee,
  Sparkles,
  Users,
  Clock,
  BarChart3,
  Sparkle
} from "lucide-react";

export interface RewardItem {
  id: string;
  title: string;
  reqVisits: number;
  desc: string;
  category: "food" | "voucher" | "beverage" | "special";
  redemptionRate: number; // percentage numeric e.g. 42 for 42%
  redeemedMonth: number;
  status: "Active" | "Inactive";
  customerPool: string;
  avgDaysToClaim: string;
  imgUrl: string;
  availability: string;
}

const INITIAL_REWARDS: RewardItem[] = [
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
    imgUrl:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=300&q=80",
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
    imgUrl:
      "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=300&q=80",
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
    imgUrl:
      "https://images.unsplash.com/photo-1556742049-0a67568d0d9f?auto=format&fit=crop&w=300&q=80",
    availability: "60 days after unlock",
  },
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
    imgUrl:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80",
    availability: "14 days after unlock",
  },
];

/**
 * Category Helper Icon Component
 */
function CategoryBadgeIcon({
  category,
  className = "w-4 h-4",
}: {
  category: RewardItem["category"];
  className?: string;
}) {
  switch (category) {
    case "voucher":
      return <Ticket className={className} strokeWidth={2} />;
    case "beverage":
      return <Coffee className={className} strokeWidth={2} />;
    case "special":
      return <Sparkles className={className} strokeWidth={2} />;
    case "food":
    default:
      return <UtensilsCrossed className={className} strokeWidth={2} />;
  }
}

/**
 * Circular Thumbnail Image with onError Fallback
 */
function CircularNodeImage({
  src,
  title,
  category,
  sizeClassName = "w-16 h-16",
}: {
  src?: string;
  title: string;
  category: RewardItem["category"];
  sizeClassName?: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`relative ${sizeClassName} rounded-full overflow-hidden bg-primary/10 flex items-center justify-center flex-shrink-0`}
    >
      {!imgError && src ? (
        <img
          src={src}
          alt="" // Empty alt to prevent broken alt text overlap
          onError={() => setImgError(true)}
          className="w-full h-full object-cover shrink-0"
        />
      ) : (
        <div className="flex items-center justify-center text-primary">
          <CategoryBadgeIcon category={category} className="w-6 h-6 text-primary" />
        </div>
      )}
    </div>
  );
}

export default function AdminRewardsPage() {
  const [rewards, setRewards] = useState<RewardItem[]>(INITIAL_REWARDS);
  
  // Expanded Node State: null when path is fully collapsed
  const [expandedRewardId, setExpandedRewardId] = useState<string | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  // Form state for expanded card editor
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<RewardItem["category"]>("food");
  const [formDesc, setFormDesc] = useState("");
  const [formVisits, setFormVisits] = useState(5);
  const [formAvailability, setFormAvailability] = useState("30 days after unlock");
  const [formImgUrl, setFormImgUrl] = useState("");
  const [formIsActive, setFormIsActive] = useState(true);

  // Sort rewards by visits required (ascending) for path progression order
  const sortedRewards = useMemo(() => {
    return [...rewards].sort((a, b) => a.reqVisits - b.reqVisits);
  }, [rewards]);

  // Handle clicking on an existing reward node
  const handleNodeClick = (reward: RewardItem) => {
    if (expandedRewardId === reward.id && !isCreatingNew) {
      // Toggle collapse if clicking the currently open node
      setExpandedRewardId(null);
      return;
    }

    setExpandedRewardId(reward.id);
    setIsCreatingNew(false);

    // Populate editor fields
    setFormName(reward.title);
    setFormCategory(reward.category);
    setFormDesc(reward.desc);
    setFormVisits(reward.reqVisits);
    setFormAvailability(reward.availability);
    setFormImgUrl(reward.imgUrl);
    setFormIsActive(reward.status === "Active");
  };

  // Handle clicking on the "+" node at the end of the path
  const handlePlusNodeClick = () => {
    setExpandedRewardId("NEW_NODE");
    setIsCreatingNew(true);

    // Default blank form values
    setFormName("");
    setFormCategory("food");
    setFormDesc("");
    setFormVisits(
      sortedRewards.length > 0
        ? Math.max(...sortedRewards.map((r) => r.reqVisits)) + 5
        : 5
    );
    setFormAvailability("30 days after unlock");
    setFormImgUrl(
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80"
    );
    setFormIsActive(true);
  };

  // Close / Collapse expanded card
  const handleCloseExpanded = () => {
    setExpandedRewardId(null);
    setIsCreatingNew(false);
  };

  // Save changes or create new reward
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert("Please enter a reward name");
      return;
    }

    if (isCreatingNew) {
      const newId = `RWD-${710 + rewards.length}`;
      const newReward: RewardItem = {
        id: newId,
        title: formName,
        category: formCategory,
        reqVisits: formVisits,
        desc: formDesc || "Special customer milestone reward",
        redemptionRate: 0,
        redeemedMonth: 0,
        status: formIsActive ? "Active" : "Inactive",
        customerPool: "New threshold",
        avgDaysToClaim: "0 d",
        imgUrl:
          formImgUrl ||
          "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80",
        availability: formAvailability,
      };

      setRewards((prev) => [...prev, newReward]);
      setExpandedRewardId(newId);
      setIsCreatingNew(false);
      alert(`New reward milestone "${formName}" created on the path!`);
    } else if (expandedRewardId) {
      setRewards((prev) =>
        prev.map((r) =>
          r.id === expandedRewardId
            ? {
                ...r,
                title: formName,
                category: formCategory,
                desc: formDesc,
                reqVisits: formVisits,
                availability: formAvailability,
                imgUrl: formImgUrl || r.imgUrl,
                status: formIsActive ? "Active" : "Inactive",
              }
            : r
        )
      );
      alert(`Reward milestone "${formName}" updated!`);
    }
  };

  // Delete reward
  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove "${name}" from the path?`)) {
      setRewards((prev) => prev.filter((r) => r.id !== id));
      handleCloseExpanded();
    }
  };

  const currentEditingReward = rewards.find((r) => r.id === expandedRewardId);

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-8 pb-16">
      
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-text-primary tracking-tight">
              Reward Path
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/30">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Ladder Active
            </span>
          </div>
          <p className="text-xs text-text-secondary font-medium">
            Visual customer progression journey • Rewards order dynamically by visits required
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert("Filter rules configuration")}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface border border-border hover:bg-surface-low text-text-primary text-xs font-semibold transition-colors shadow-xs"
            type="button"
          >
            <SlidersHorizontal className="w-4 h-4 text-text-secondary" strokeWidth={2} />
            <span>Filter Rules</span>
          </button>

          <button
            onClick={handlePlusNodeClick}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-deep text-white text-xs font-bold transition-all shadow-xs btn-press ${
              isCreatingNew ? "ring-2 ring-primary/40" : ""
            }`}
            type="button"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>+ Add Milestone</span>
          </button>
        </div>
      </div>

      {/* 2. REWARD PATH VISUALIZATION SECTION */}
      <div className="bg-surface rounded-3xl border border-border p-8 shadow-xs flex flex-col gap-6 relative overflow-hidden">
        
        {/* Section Title & Description */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkle className="w-4 h-4 text-primary" strokeWidth={2} />
            <h2 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
              Customer Loyalty Progression Line
            </h2>
          </div>
          <span className="text-[11px] font-semibold text-text-secondary">
            {sortedRewards.length} Milestones Configured
          </span>
        </div>

        {/* HORIZONTAL PATH CONTAINER */}
        <div className="relative w-full overflow-x-auto pb-4 pt-2 select-none">
          
          {/* Main Horizontal Connecting Track Line running behind nodes */}
          <div className="absolute top-[68px] left-12 right-12 h-1 bg-border rounded-full z-0" />
          
          {/* Active Highlighted Line Segment */}
          <div
            className="absolute top-[68px] left-12 h-1 bg-primary/40 rounded-full z-0 transition-all duration-500"
            style={{
              width: `${Math.min(
                100,
                (sortedRewards.filter((r) => r.status === "Active").length /
                  (sortedRewards.length + 1)) *
                  100
              )}%`,
            }}
          />

          {/* Nodes Flex Track */}
          <div className="relative z-10 flex items-start justify-between min-w-[700px] px-6 gap-6">
            
            {sortedRewards.map((reward, index) => {
              const isExpanded = expandedRewardId === reward.id;
              const isActive = reward.status === "Active";
              const hasOtherExpanded =
                expandedRewardId !== null && expandedRewardId !== reward.id;

              return (
                <div
                  key={reward.id}
                  onClick={() => handleNodeClick(reward)}
                  className={`flex flex-col items-center cursor-pointer transition-all duration-300 group ${
                    hasOtherExpanded ? "opacity-60 hover:opacity-100 scale-95" : ""
                  }`}
                  style={{ flex: 1 }}
                >
                  {/* Stamp Requirement Badge Sitting Above Node */}
                  <div
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shadow-xs mb-3 whitespace-nowrap flex items-center gap-1 ${
                      isExpanded
                        ? "bg-primary text-white scale-110 shadow-md"
                        : isActive
                        ? "bg-primary/10 text-primary border border-primary/30 group-hover:bg-primary group-hover:text-white"
                        : "bg-surface-low text-text-secondary border border-border"
                    }`}
                  >
                    <span>{reward.reqVisits} Visits</span>
                  </div>

                  {/* Circular Node Circle */}
                  <div
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center p-1 bg-surface transition-all duration-300 ${
                      isExpanded
                        ? "ring-4 ring-primary ring-offset-4 ring-offset-surface scale-110 shadow-lg"
                        : isActive
                        ? "ring-4 ring-primary ring-offset-2 ring-offset-surface hover:ring-primary-deep shadow-md group-hover:scale-105"
                        : "ring-4 ring-dashed ring-text-secondary/40 ring-offset-2 ring-offset-surface opacity-75 group-hover:ring-primary/60"
                    }`}
                  >
                    {/* Inner Image Thumbnail */}
                    <CircularNodeImage
                      src={reward.imgUrl}
                      title={reward.title}
                      category={reward.category}
                      sizeClassName="w-full h-full"
                    />

                    {/* Small Category Badge Overlay */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-surface border border-border shadow-xs flex items-center justify-center text-primary">
                      <CategoryBadgeIcon category={reward.category} className="w-3.5 h-3.5" />
                    </div>

                    {/* Active/Inactive Status Dot */}
                    {!isActive && (
                      <div className="absolute top-0 right-0 w-4 h-4 rounded-full bg-text-secondary border-2 border-surface flex items-center justify-center text-[8px] text-white font-bold" title="Inactive">
                        ⏸
                      </div>
                    )}
                  </div>

                  {/* Node Label & Stat Below Circle */}
                  <div className="flex flex-col items-center text-center mt-3 max-w-[120px]">
                    <span
                      className={`text-xs font-bold leading-snug line-clamp-1 transition-colors ${
                        isExpanded
                          ? "text-primary scale-105"
                          : "text-text-primary group-hover:text-primary"
                      }`}
                    >
                      {reward.title}
                    </span>
                    <span className="text-[11px] text-text-secondary font-medium mt-0.5">
                      {reward.redemptionRate}% redeemed
                    </span>
                  </div>

                  {/* Pointer Arrow down when expanded */}
                  {isExpanded && (
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-primary mt-2 animate-bounce" />
                  )}
                </div>
              );
            })}

            {/* "+ NEW REWARD" NODE AT END OF PATH */}
            <div
              onClick={handlePlusNodeClick}
              className={`flex flex-col items-center cursor-pointer transition-all duration-300 group ${
                expandedRewardId !== null && expandedRewardId !== "NEW_NODE"
                  ? "opacity-60 hover:opacity-100 scale-95"
                  : ""
              }`}
              style={{ flex: 1 }}
            >
              {/* Badge Above */}
              <div
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all shadow-xs mb-3 whitespace-nowrap ${
                  isCreatingNew
                    ? "bg-primary text-white scale-110 shadow-md"
                    : "bg-surface-low text-primary border border-primary/30 group-hover:bg-primary group-hover:text-white"
                }`}
              >
                + New Milestone
              </div>

              {/* Dashed Circular Plus Node */}
              <div
                className={`w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center bg-primary/5 transition-all duration-300 ${
                  isCreatingNew
                    ? "border-primary ring-4 ring-primary ring-offset-4 ring-offset-surface scale-110 bg-primary/10 shadow-lg text-primary"
                    : "border-primary/60 hover:border-primary text-primary hover:bg-primary/10 hover:scale-105"
                }`}
              >
                <Plus className="w-8 h-8 stroke-[2.5]" />
              </div>

              {/* Label Below */}
              <div className="flex flex-col items-center text-center mt-3 max-w-[120px]">
                <span className="text-xs font-bold text-primary leading-snug">
                  Add Reward
                </span>
                <span className="text-[11px] text-text-secondary font-medium mt-0.5">
                  Create threshold
                </span>
              </div>

              {/* Pointer Arrow down when expanded for creation */}
              {isCreatingNew && (
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-primary mt-2 animate-bounce" />
              )}
            </div>
          </div>
        </div>

        {/* 3. SECONDARY ROW — REWARD ECONOMICS AT A GLANCE (When nothing expanded) */}
        {!expandedRewardId && (
          <div className="mt-2 pt-4 border-t border-border flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
                Reward Economics & Performance Ladder
              </span>
              <span className="text-[11px] text-text-secondary font-medium">
                Comparative redemption rates across milestones
              </span>
            </div>

            {/* Sparkline / Bar Strip aligned under the rewards ladder */}
            <div className="grid grid-cols-4 gap-4 bg-surface-low p-4 rounded-2xl border border-border">
              {sortedRewards.map((reward) => (
                <div key={reward.id} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-text-primary truncate">
                      {reward.title}
                    </span>
                    <span className="font-bold text-primary">
                      {reward.redemptionRate}%
                    </span>
                  </div>

                  {/* Relative Sparkbar */}
                  <div className="w-full bg-surface rounded-full h-2 overflow-hidden border border-border">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${reward.redemptionRate}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-text-secondary">
                    <span>{reward.reqVisits} stamps required</span>
                    <span>{reward.redeemedMonth} claimed/mo</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. EXPANDED CARD (UNFOLDS DIRECTLY BELOW THE PATH) */}
      {expandedRewardId && (
        <div className="bg-surface rounded-3xl border-2 border-primary p-8 shadow-xl flex flex-col gap-6 animate-in fade-in slide-in-from-top-4 duration-300 relative">
          
          {/* Header of Expanded Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0">
                {isCreatingNew ? (
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                ) : (
                  <CategoryBadgeIcon
                    category={currentEditingReward?.category || "food"}
                    className="w-5 h-5"
                  />
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                  {isCreatingNew
                    ? "CREATING NEW MILESTONE"
                    : `EDITING MILESTONE #${currentEditingReward?.id}`}
                </span>
                <h3 className="text-xl font-bold text-text-primary">
                  {isCreatingNew
                    ? "Configure New Reward Milestone"
                    : `Editing: ${currentEditingReward?.title}`}
                </h3>
              </div>
            </div>

            {/* Top Right Header Controls: Close (✕) Action */}
            <div className="flex items-center gap-3 self-end sm:self-auto">
              {!isCreatingNew && currentEditingReward && (
                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      currentEditingReward.id,
                      currentEditingReward.title
                    )
                  }
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-alert hover:bg-alert/10 transition-colors inline-flex items-center gap-1.5"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              )}

              {/* Explicit "✕ Close" Action */}
              <button
                type="button"
                onClick={handleCloseExpanded}
                className="px-3.5 py-2 rounded-xl bg-surface-low hover:bg-surface-inset text-text-primary text-xs font-bold border border-border transition-colors inline-flex items-center gap-1.5 shadow-xs"
              >
                <X className="w-4 h-4" strokeWidth={2.5} />
                <span>Close</span>
              </button>
            </div>
          </div>

          {/* Form Body - Responsive 2-Column Grid Layout for Expanded Space */}
          <form onSubmit={handleSave} className="grid grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Main Inputs (7 Cols) */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-5">
              
              {/* Reward Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                  REWARD NAME *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Free Veg Momo, NPR 500 Voucher"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-low border border-border rounded-xl text-sm text-text-primary font-semibold focus:outline-none focus:border-primary focus:bg-surface transition-colors"
                />
              </div>

              {/* Category Selector Pills */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                  REWARD CATEGORY
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { id: "food", label: "Food", icon: UtensilsCrossed },
                    { id: "voucher", label: "Voucher", icon: Ticket },
                    { id: "beverage", label: "Drink", icon: Coffee },
                    { id: "special", label: "Special", icon: Sparkles },
                  ].map((cat) => {
                    const CatIcon = cat.icon;
                    const isCatSelected = formCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() =>
                          setFormCategory(cat.id as RewardItem["category"])
                        }
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                          isCatSelected
                            ? "border-primary bg-primary/10 text-primary shadow-xs"
                            : "border-border bg-surface-low hover:bg-surface text-text-secondary hover:text-text-primary"
                        }`}
                      >
                        <CatIcon className="w-4 h-4" strokeWidth={2} />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                  DESCRIPTION
                </label>
                <input
                  type="text"
                  placeholder="Describe what the customer receives when unlocking this reward"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  className="w-full px-4 py-2.5 bg-surface-low border border-border rounded-xl text-xs text-text-primary font-medium focus:outline-none focus:border-primary focus:bg-surface transition-colors"
                />
              </div>

              {/* Visits Required & Availability Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                    VISITS REQUIRED (STAMPS)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={formVisits}
                      onChange={(e) => setFormVisits(Number(e.target.value))}
                      className="w-full pl-4 pr-16 py-2.5 bg-surface-low border border-border rounded-xl text-sm text-text-primary font-bold focus:outline-none focus:border-primary focus:bg-surface"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-text-secondary pointer-events-none font-semibold">
                      stamps
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                    AVAILABILITY EXPIRATION
                  </label>
                  <div className="relative">
                    <select
                      value={formAvailability}
                      onChange={(e) => setFormAvailability(e.target.value)}
                      className="w-full appearance-none pl-4 pr-8 py-2.5 bg-surface-low border border-border rounded-xl text-xs text-text-primary font-semibold focus:outline-none focus:border-primary focus:bg-surface cursor-pointer"
                    >
                      <option>30 days after unlock</option>
                      <option>14 days after unlock</option>
                      <option>60 days after unlock</option>
                      <option>Never expires</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-text-secondary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={2} />
                  </div>
                </div>
              </div>

              {/* Reward Image Box */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
                  REWARD THUMBNAIL IMAGE
                </label>
                <div className="border border-dashed border-border rounded-2xl p-3 flex items-center justify-between bg-surface-low hover:bg-surface-inset transition-colors group">
                  <div className="flex items-center gap-3 min-w-0">
                    <CircularNodeImage
                      src={formImgUrl}
                      title={formName || "Preview"}
                      category={formCategory}
                      sizeClassName="w-10 h-10"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-text-primary truncate">
                        {formName
                          ? `${formName.toLowerCase().replace(/\s+/g, "_")}.jpg`
                          : "reward_image.jpg"}
                      </span>
                      <span className="text-[11px] text-text-secondary font-normal">
                        Fixed circular cover •{" "}
                        <button
                          type="button"
                          onClick={() => {
                            const url = prompt("Enter Image URL:", formImgUrl);
                            if (url !== null) setFormImgUrl(url);
                          }}
                          className="text-primary font-semibold hover:underline"
                        >
                          Change URL
                        </button>
                      </span>
                    </div>
                  </div>
                  <UploadCloud className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors shrink-0" strokeWidth={2} />
                </div>
              </div>

              {/* Active Status Toggle Switch */}
              <div className="flex items-center justify-between py-2 px-1 border-t border-border/60">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-text-primary">
                    Active Status on Progression Path
                  </span>
                  <span className="text-[11px] text-text-secondary font-normal">
                    Available for customers to earn immediately along their journey
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setFormIsActive(!formIsActive)}
                  className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${
                    formIsActive ? "bg-primary" : "bg-border"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ${
                      formIsActive ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: Live Customer Preview & Analytics (5 Cols) */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-5 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8">
              
              {/* Analytics Summary Header */}
              {!isCreatingNew && currentEditingReward && (
                <div className="flex flex-col gap-3 p-4 bg-surface-low rounded-2xl border border-border">
                  <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
                    MILESTONE PERFORMANCE METRICS
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-text-primary">
                        {currentEditingReward.redemptionRate}%
                      </span>
                      <span className="text-[11px] text-text-secondary">
                        Redemption rate
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-lg font-bold text-text-primary">
                        {currentEditingReward.redeemedMonth} claimed
                      </span>
                      <span className="text-[11px] text-text-secondary">
                        This month
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-text-primary flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-text-secondary" />
                        {currentEditingReward.customerPool}
                      </span>
                      <span className="text-[11px] text-text-secondary">
                        Customer pool
                      </span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-text-primary flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-text-secondary" />
                        {currentEditingReward.avgDaysToClaim}
                      </span>
                      <span className="text-[11px] text-text-secondary">
                        Avg days to claim
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Live Preview Box */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-text-secondary uppercase tracking-wider flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-primary" strokeWidth={2} />
                    LIVE CUSTOMER APP PREVIEW
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Real-time
                  </span>
                </div>

                {/* Customer App Card Preview */}
                <div className="p-4 bg-surface rounded-2xl border border-border shadow-xs flex items-center gap-3.5">
                  <CircularNodeImage
                    src={formImgUrl}
                    title={formName || "Reward"}
                    category={formCategory}
                    sizeClassName="w-12 h-12"
                  />

                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-text-primary truncate">
                        {formName || "Reward Name"}
                      </span>
                      <span className="text-[11px] font-bold text-primary">
                        3 / {formVisits || 5} visits
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-surface-low rounded-full h-2 my-1.5 overflow-hidden border border-border/50">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(0, (3 / (formVisits || 5)) * 100)
                          )}%`,
                        }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-text-secondary font-medium">
                      <span>
                        {formVisits - 3 > 0
                          ? `${formVisits - 3} more visits to unlock`
                          : "Unlocked!"}
                      </span>
                      <span>Valid ABC Café</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div className="mt-auto flex items-center gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={handleCloseExpanded}
                  className="w-1/3 py-3 px-4 rounded-xl text-xs text-text-primary font-semibold bg-surface-low hover:bg-surface-inset border border-border transition-colors text-center"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-2/3 py-3 px-5 rounded-xl text-xs text-white font-bold flex items-center justify-center gap-2 bg-primary hover:bg-primary-deep active:scale-[0.99] transition-all shadow-xs"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>
                    {isCreatingNew ? "Create Milestone" : "Save Milestone"}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
