"use client";

import React, { useState } from "react";
import { BottomTabBar } from "@/components/customer/BottomTabBar";
import { Bell, Calendar, Lock, Star, Zap } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type RewardStatus = "unlocked" | "in_progress" | "locked";

interface Reward {
  id: string;
  status: RewardStatus;
  perkLabel?: string;
  venueLabel: string;
  title: string;
  description: string;
  stampsRequired: number;
  currentStamps?: number;
  validUntil?: string;
  usageType?: string;
  tier?: string;
  stampsToGo?: number;
  image: string;
}

// ─── Mock rewards ─────────────────────────────────────────────────────────────
const REWARDS: Reward[] = [
  {
    id: "r1",
    status: "unlocked",
    perkLabel: "UNLOCKED PERK",
    venueLabel: "ARTISAN COFFEE MASTER",
    title: "Signature Pour-Over or Single Origin Flat White",
    description: "Savor any bespoke brew crafted by our resident barista with rare Gesha and Ethiopian heirloom beans.",
    stampsRequired: 10,
    validUntil: "Nov 30, 2025",
    usageType: "SINGLE-USE",
    image: "unlocked",
  },
  {
    id: "r2",
    status: "in_progress",
    venueLabel: "MORNING PARLOUR",
    title: "Artisan Bakery Basket & House Jam",
    description: "Freshly baked morning viennoiserie served with small-batch lavender fig preserve.",
    stampsRequired: 8,
    currentStamps: 7,
    image: "progress",
  },
  {
    id: "r3",
    status: "locked",
    venueLabel: "CUPPING ROOM",
    title: "Exclusive Cupping Tasting Session for Two",
    description: "A private 45-minute sensory exploration guided by Head Roaster Julian, exploring seasonal micro-lots.",
    stampsRequired: 20,
    stampsToGo: 13,
    tier: "Tier Master",
    image: "locked",
  },
];

const SUMMARY = {
  activeStamps: 7,
  tier: "Tier Gold",
  rewardCounts: { all: 5, readyToRedeem: 1, inProgress: 2 },
};

type TabKey = "all" | "ready" | "inProgress";

const TABS: { key: TabKey; label: string; count?: number }[] = [
  { key: "all", label: "All Rewards", count: SUMMARY.rewardCounts.all },
  { key: "ready", label: "Ready to Redeem", count: SUMMARY.rewardCounts.readyToRedeem },
  { key: "inProgress", label: "In Progress" },
];

// ─── Image placeholder ────────────────────────────────────────────────────────
function RewardImage({ variant }: { variant: string }) {
  const gradients: Record<string, string> = {
    unlocked: "linear-gradient(160deg, #3D2410 0%, #7A4A20 40%, var(--c-gold) 100%)",
    progress: "linear-gradient(160deg, #2C1A0E 0%, #6B3D1E 40%, #A06030 100%)",
    locked:   "linear-gradient(160deg, var(--c-card-dark) 0%, var(--c-card-mid) 50%, #5A4030 100%)",
  };
  const overlayText: Record<string, string> = { unlocked: "☕", progress: "🥐", locked: "🫙" };

  return (
    <div
      className="w-full h-[160px] relative overflow-hidden"
      style={{ background: gradients[variant] ?? gradients.unlocked }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-25">
        {overlayText[variant]}
      </div>
    </div>
  );
}

// ─── Stamp dot row ────────────────────────────────────────────────────────────
function StampRow({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < current;
        const isNext = i === current;
        return (
          <div
            key={i}
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: filled
                ? "var(--c-gold)"
                : "var(--c-gold-light)",
              border: isNext
                ? "2px dashed var(--c-gold)"
                : filled
                ? "none"
                : `1px solid var(--c-border)`,
            }}
          >
            {filled && (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 7h12l-1.5 9H7.5L6 7Z"
                  fill="rgba(255,255,255,0.35)"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M18 9h1.5a1.5 1.5 0 0 1 0 3H18"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Unlocked card ────────────────────────────────────────────────────────────
function UnlockedCard({ reward }: { reward: Reward }) {
  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{
        backgroundColor: "var(--c-surface)",
        borderColor: "var(--c-border)",
        boxShadow: "0 2px 12px rgba(43,33,24,0.07)",
      }}
    >
      <div className="relative">
        <RewardImage variant={reward.image} />
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{ backgroundColor: "rgba(217,164,65,0.9)" }}
        >
          <Star className="w-3 h-3 fill-white text-white" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">
            {reward.perkLabel}
          </span>
        </div>
        <div
          className="absolute top-3 right-3 px-2 py-1 rounded-full backdrop-blur-sm"
          style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
        >
          <span className="text-[10px] font-bold" style={{ color: "var(--c-text-primary)" }}>
            {reward.stampsRequired} Stamps
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-[9px] font-bold text-white/80 tracking-widest uppercase">
            {reward.venueLabel}
          </span>
        </div>
      </div>

      <div className="px-4 pt-4 pb-4">
        <h3
          className="text-[15px] font-bold leading-snug mb-1.5"
          style={{ color: "var(--c-text-primary)" }}
        >
          {reward.title}
        </h3>
        <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--c-text-secondary)" }}>
          {reward.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" style={{ color: "var(--c-text-muted)" }} />
            <span className="text-[11px]" style={{ color: "var(--c-text-secondary)" }}>
              Valid until {reward.validUntil}
            </span>
          </div>
          {reward.usageType && (
            <span
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--c-text-muted)" }}
            >
              {reward.usageType}
            </span>
          )}
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 text-white font-semibold text-[14px] py-3.5 rounded-xl transition-all active:scale-[0.98]"
          style={{ backgroundColor: "var(--c-terracotta)" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--c-terracotta-deep)")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--c-terracotta)")}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="14" width="18" height="3" rx="1.5" fill="white" opacity="0.8" />
            <path d="M6 14V9a6 6 0 0 1 12 0v5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="9" r="2.5" fill="white" opacity="0.6" />
          </svg>
          Redeem Reward Now
        </button>
      </div>
    </div>
  );
}

// ─── In-Progress card ─────────────────────────────────────────────────────────
function InProgressCard({ reward }: { reward: Reward }) {
  const current = reward.currentStamps ?? 0;
  const total = reward.stampsRequired;
  const remaining = total - current;

  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{
        backgroundColor: "var(--c-surface)",
        borderColor: "var(--c-border)",
        boxShadow: "0 2px 12px rgba(43,33,24,0.07)",
      }}
    >
      <div className="relative">
        <RewardImage variant={reward.image} />
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
        >
          <div
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: "var(--c-gold)" }}
          />
          <span
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: "var(--c-text-primary)" }}
          >
            In Progress
          </span>
        </div>
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{ backgroundColor: "rgba(43,29,18,0.75)" }}
        >
          <span className="text-[11px] font-bold text-white">
            {current} / {total} Stamps
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-[9px] font-bold text-white/80 tracking-widest uppercase">
            {reward.venueLabel}
          </span>
        </div>
      </div>

      <div className="px-4 pt-4 pb-4">
        <h3
          className="text-[15px] font-bold leading-snug mb-1.5"
          style={{ color: "var(--c-text-primary)" }}
        >
          {reward.title}
        </h3>
        <p className="text-[12px] leading-relaxed mb-4" style={{ color: "var(--c-text-secondary)" }}>
          {reward.description}
        </p>

        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold" style={{ color: "var(--c-text-secondary)" }}>
              Card Requirement: {total} Stamps
            </span>
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full border"
              style={{
                backgroundColor: "var(--c-banner-bg)",
                borderColor: "var(--c-banner-border)",
              }}
            >
              <Zap className="w-3 h-3" style={{ color: "var(--c-gold)", fill: "var(--c-gold)" }} />
              <span className="text-[10px] font-semibold" style={{ color: "var(--c-banner-text)" }}>
                Only {remaining} more stamp{remaining !== 1 ? "s" : ""} needed!
              </span>
            </div>
          </div>
          <StampRow current={current} total={total} />
        </div>

        <div
          className="flex items-center justify-center gap-2 rounded-xl py-2.5 mt-1"
          style={{ backgroundColor: "var(--c-bg)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="var(--c-text-muted)" strokeWidth="1.8" />
            <path d="M12 7v5l3 3" stroke="var(--c-text-muted)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className="text-[12px] font-medium" style={{ color: "var(--c-text-secondary)" }}>
            {remaining} Stamp{remaining !== 1 ? "s" : ""} Remaining
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Locked card ──────────────────────────────────────────────────────────────
function LockedCard({ reward }: { reward: Reward }) {
  return (
    <div
      className="rounded-2xl overflow-hidden border"
      style={{
        backgroundColor: "var(--c-surface)",
        borderColor: "var(--c-border)",
        boxShadow: "0 2px 12px rgba(43,33,24,0.07)",
      }}
    >
      <div className="relative">
        <RewardImage variant={reward.image} />
        <div className="absolute inset-0 bg-black/25" />
        <div
          className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{ backgroundColor: "rgba(43,29,18,0.6)" }}
        >
          <Lock className="w-3 h-3 text-white/80" />
          <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">
            Locked
          </span>
        </div>
        <div
          className="absolute top-3 right-3 px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{ backgroundColor: "rgba(43,29,18,0.5)" }}
        >
          <span className="text-[11px] font-bold text-white/90">
            {reward.stampsRequired} Stamps
          </span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-[9px] font-bold text-white/70 tracking-widest uppercase">
            {reward.venueLabel}
          </span>
        </div>
      </div>

      <div className="px-4 pt-4 pb-4">
        <h3
          className="text-[15px] font-bold leading-snug mb-1.5"
          style={{ color: "var(--c-text-primary)" }}
        >
          {reward.title}
        </h3>
        <p className="text-[12px] leading-relaxed mb-4" style={{ color: "var(--c-text-secondary)" }}>
          {reward.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" style={{ color: "var(--c-text-muted)" }} />
            <span className="text-[11px]" style={{ color: "var(--c-text-muted)" }}>
              {reward.stampsToGo} stamps to go
            </span>
          </div>
          {reward.tier && (
            <span className="text-[11px] font-semibold" style={{ color: "var(--c-text-secondary)" }}>
              {reward.tier}
            </span>
          )}
        </div>

        <button
          disabled
          className="w-full flex items-center justify-center gap-2 font-semibold text-[13px] py-3.5 rounded-xl cursor-not-allowed"
          style={{
            backgroundColor: "var(--c-bg)",
            color: "var(--c-text-muted)",
          }}
        >
          <Lock className="w-4 h-4" />
          Unlock at {reward.stampsRequired} Stamps
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const filteredRewards = REWARDS.filter((r) => {
    if (activeTab === "all") return true;
    if (activeTab === "ready") return r.status === "unlocked";
    if (activeTab === "inProgress") return r.status === "in_progress";
    return true;
  });

  return (
    <div
      className="min-h-screen flex flex-col pb-24"
      style={{ backgroundColor: "var(--c-bg)", color: "var(--c-text-primary)" }}
    >
      {/* ── Header ── */}
      <header
        className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 px-4 pt-3 pb-2"
        style={{ backgroundColor: "var(--c-bg)" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-bold tracking-tight leading-none" style={{ color: "var(--c-text-primary)" }}>
              Atelier Guild
            </p>
            <p
              className="text-[10px] font-semibold tracking-widest uppercase mt-0.5"
              style={{ color: "var(--c-terracotta)" }}
            >
              Patron Salon
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative w-9 h-9 flex items-center justify-center">
              <Bell className="w-5 h-5" style={{ color: "var(--c-text-primary)" }} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2"
                style={{ backgroundColor: "var(--c-gold)", borderColor: "var(--c-bg)" }}
              />
            </button>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--c-peach)" }}
            >
              <span className="text-sm font-semibold" style={{ color: "var(--c-espresso)" }}>B</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto pt-[72px] px-4 flex flex-col gap-4">
        {/* ── Heading ── */}
        <div>
          <p
            className="text-[10px] font-semibold tracking-widest uppercase mb-0.5"
            style={{ color: "var(--c-text-muted)" }}
          >
            Patron Privilege
          </p>
          <h1
            className="text-[24px] font-bold tracking-tight leading-tight"
            style={{ color: "var(--c-text-primary)" }}
          >
            Your Rewards
          </h1>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--c-text-secondary)" }}>
            Exchange earned loyalty stamps for curated artisan treats.
          </p>
        </div>

        {/* ── Summary strip ── */}
        <div className="flex items-center gap-3">
          <div
            className="flex items-center gap-2 rounded-xl px-3 py-2 flex-1 border"
            style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: "var(--c-gold)" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 7h12l-1.5 9H7.5L6 7Z"
                  fill="rgba(255,255,255,0.3)"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-[12px] font-bold" style={{ color: "var(--c-text-primary)" }}>
                {SUMMARY.activeStamps} Stamps Active
              </p>
              <p className="text-[10px] font-medium" style={{ color: "var(--c-sage)" }}>
                1 Reward Ready to Redeem
              </p>
            </div>
          </div>

          <div
            className="flex items-center gap-1.5 rounded-xl px-3 py-2 border"
            style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="var(--c-text-muted)" strokeWidth="1.6" />
              <path d="M9 12l2 2 4-4" stroke="var(--c-text-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[12px] font-semibold" style={{ color: "var(--c-text-secondary)" }}>
              {SUMMARY.tier}
            </span>
          </div>
        </div>

        {/* ── Tab bar ── */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-semibold transition-all border"
                style={{
                  backgroundColor: isActive ? "var(--c-espresso)" : "var(--c-surface)",
                  color: isActive ? "white" : "var(--c-text-secondary)",
                  borderColor: isActive ? "var(--c-espresso)" : "var(--c-border)",
                }}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "var(--c-bg)",
                      color: isActive ? "white" : "var(--c-text-muted)",
                    }}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ── Reward cards ── */}
        <div className="flex flex-col gap-4 pb-2">
          {filteredRewards.length === 0 && (
            <div
              className="rounded-2xl p-8 text-center border"
              style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}
            >
              <p className="text-[13px]" style={{ color: "var(--c-text-secondary)" }}>
                No rewards in this category.
              </p>
            </div>
          )}
          {filteredRewards.map((reward) => {
            if (reward.status === "unlocked") return <UnlockedCard key={reward.id} reward={reward} />;
            if (reward.status === "in_progress") return <InProgressCard key={reward.id} reward={reward} />;
            return <LockedCard key={reward.id} reward={reward} />;
          })}
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}
