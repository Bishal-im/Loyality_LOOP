"use client";

import React, { useState } from "react";
import { BottomTabBar } from "@/components/customer/BottomTabBar";
import { StampProgressModal } from "@/components/customer/StampProgressModal";
import { RewardUnlockedModal } from "@/components/customer/RewardUnlockedModal";
import { Bell, ChevronRight, Lock, PartyPopper, Star } from "lucide-react";
import Link from "next/link";

// ─── Mock data ────────────────────────────────────────────────────────────────
const CUSTOMER = {
  name: "Binod",
  patronId: "#AG-8829",
  tier: "Gold Patron",
  currentStamps: 7,
  maxStamps: 10,
  venueName: "ABC Café",
  venueLocation: "Downtown Roastery",
  isActive: true,
};

const MILESTONES = [
  {
    id: "m1",
    title: "Free Cold Brew or Espr...",
    description: "Single-origin roast of your choice",
    status: "ready" as const,
    vouchersAvailable: 1,
    image: null,
  },
  {
    id: "m2",
    title: "Artisan Lunch Combo",
    description: "Any tartine with fresh seasonal juice",
    status: "locked" as const,
    stampsRequired: 15,
    image: null,
  },
];

const ANNOUNCEMENT = "Double stamp weekend starting this Friday!";

// ─── Stamp dot ────────────────────────────────────────────────────────────────
function StampDot({
  filled,
  isFree,
  label,
}: {
  filled: boolean;
  isFree?: boolean;
  label?: number;
}) {
  if (isFree) {
    return (
      <div
        className="w-[52px] h-[52px] rounded-full flex items-center justify-center border-2"
        style={{
          backgroundColor: "var(--c-card-mid)",
          borderColor: "var(--c-gold)",
        }}
      >
        <span
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: "var(--c-gold)" }}
        >
          FREE
        </span>
      </div>
    );
  }

  if (filled) {
    return (
      <div
        className="w-[52px] h-[52px] rounded-full flex items-center justify-center"
        style={{
          backgroundColor: "var(--c-gold)",
          boxShadow: "0 2px 10px rgba(217,164,65,0.45)",
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 7h12l-1.5 9H7.5L6 7Z"
            fill="rgba(255,255,255,0.25)"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M18 9h1.5a1.5 1.5 0 0 1 0 3H18"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path d="M5 17h14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className="w-[52px] h-[52px] rounded-full flex items-center justify-center"
      style={{
        backgroundColor: "rgba(43,29,18,0.35)",
        border: "1px solid rgba(217,164,65,0.2)",
      }}
    >
      {label !== undefined && (
        <span className="text-[13px] font-medium" style={{ color: "var(--c-card-light)" }}>
          {label}
        </span>
      )}
    </div>
  );
}

// ─── Milestone card ────────────────────────────────────────────────────────────
function MilestoneCard({ milestone }: { milestone: (typeof MILESTONES)[number] }) {
  const isReady = milestone.status === "ready";

  return (
    <div className="flex items-center gap-3 py-3.5">
      <div
        className="w-[60px] h-[60px] rounded-xl overflow-hidden flex-shrink-0"
        style={{ backgroundColor: "var(--c-peach)" }}
      >
        <div
          className="w-full h-full flex items-center justify-center text-2xl"
          style={{
            background: `linear-gradient(135deg, var(--c-peach) 0%, var(--c-gold) 100%)`,
          }}
        >
          ☕
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span
            className="text-[13px] font-semibold truncate"
            style={{ color: "var(--c-text-primary)" }}
          >
            {milestone.title}
          </span>
          {isReady ? (
            <span
              className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "var(--c-sage-light)",
                color: "var(--c-sage)",
              }}
            >
              Ready
            </span>
          ) : (
            <span
              className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: "var(--c-bg)",
                color: "var(--c-text-muted)",
              }}
            >
              Tier II
            </span>
          )}
        </div>
        <p className="text-[11px] mb-1.5 truncate" style={{ color: "var(--c-text-secondary)" }}>
          {milestone.description}
        </p>
        {isReady && "vouchersAvailable" in milestone ? (
          <div className="flex items-center justify-between">
            <span className="text-[11px]" style={{ color: "var(--c-text-muted)" }}>
              {milestone.vouchersAvailable} Voucher Available
            </span>
            <button
              className="text-[11px] font-semibold text-white px-3 py-1 rounded-lg"
              style={{ backgroundColor: "var(--c-terracotta)" }}
            >
              Redeem
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <Lock className="w-3 h-3" style={{ color: "var(--c-text-muted)" }} />
            <span className="text-[11px]" style={{ color: "var(--c-text-muted)" }}>
              {"stampsRequired" in milestone ? `Unlocked at ${milestone.stampsRequired} stamps` : ""}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const [showStampModal, setShowStampModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);

  const { currentStamps, maxStamps } = CUSTOMER;
  const stampsLeft = maxStamps - currentStamps;
  const totalSlots = maxStamps;

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
                style={{
                  backgroundColor: "var(--c-gold)",
                  borderColor: "var(--c-bg)",
                }}
              />
            </button>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--c-peach)" }}
            >
              <span className="text-sm font-semibold" style={{ color: "var(--c-espresso)" }}>
                {CUSTOMER.name[0]}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto pt-[72px] px-4 flex flex-col gap-4">
        {/* ── Greeting ── */}
        <div>
          <div className="flex items-center gap-2.5">
            <h1
              className="text-[22px] font-bold tracking-tight"
              style={{ color: "var(--c-text-primary)" }}
            >
              Good afternoon, {CUSTOMER.name}
            </h1>
            {CUSTOMER.isActive && (
              <span
                className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full border"
                style={{
                  backgroundColor: "var(--c-sage-light)",
                  color: "var(--c-sage)",
                  borderColor: "var(--c-sage)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full inline-block"
                  style={{ backgroundColor: "var(--c-sage)" }}
                />
                Active Patron
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-base">🏪</span>
            <p className="text-[12px]" style={{ color: "var(--c-text-secondary)" }}>
              Welcome to {CUSTOMER.venueName} •{" "}
              <span className="font-medium" style={{ color: "var(--c-text-primary)" }}>
                {CUSTOMER.venueLocation}
              </span>
            </p>
          </div>
        </div>

        {/* ── Announcement Banner ── */}
        <div
          className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 border"
          style={{
            backgroundColor: "var(--c-banner-bg)",
            borderColor: "var(--c-banner-border)",
          }}
        >
          <Bell className="w-4 h-4 flex-shrink-0" style={{ color: "var(--c-gold)" }} />
          <p className="text-[12px] font-medium flex-1" style={{ color: "var(--c-banner-text)" }}>
            {ANNOUNCEMENT}
          </p>
          <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "var(--c-gold)" }} />
        </div>

        {/* ── Loyalty Passport Card ── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: `linear-gradient(145deg, var(--c-card-mid) 0%, var(--c-card-dark) 100%)`,
          }}
        >
          <div className="px-5 pt-5 pb-4">
            {/* Card header */}
            <div className="flex items-start justify-between mb-1">
              <div>
                <p
                  className="text-[9px] font-semibold tracking-[0.18em] uppercase mb-0.5"
                  style={{ color: "var(--c-card-accent)" }}
                >
                  Loyalty Passport
                </p>
                <p className="text-[18px] font-bold tracking-tight leading-tight text-white">
                  {CUSTOMER.venueName.toUpperCase()}
                </p>
              </div>
              <div className="text-right">
                <span
                  className="inline-block text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider"
                  style={{ backgroundColor: "var(--c-gold)" }}
                >
                  {CUSTOMER.tier}
                </span>
                <p className="text-[11px] mt-1" style={{ color: "var(--c-card-accent)" }}>
                  {CUSTOMER.patronId}
                </p>
              </div>
            </div>

            {/* Stamp progression header */}
            <div className="flex items-center justify-between mt-4 mb-3">
              <p
                className="text-[9px] font-semibold tracking-[0.15em] uppercase"
                style={{ color: "var(--c-card-accent)" }}
              >
                Stamp Progression
              </p>
              <p className="text-[15px] font-bold text-white">
                <span style={{ color: "var(--c-gold)" }}>{currentStamps}</span>
                <span className="text-[12px]" style={{ color: "var(--c-card-accent)" }}>
                  {" "}/ {maxStamps} Stamps
                </span>
              </p>
            </div>

            {/* Stamp grid */}
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-2 justify-between">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StampDot key={i} filled={i < currentStamps} />
                ))}
              </div>
              <div className="flex gap-2 justify-between">
                {Array.from({ length: 5 }).map((_, i) => {
                  const gi = 5 + i;
                  const isLastSlot = gi === totalSlots - 1;
                  if (isLastSlot) return <StampDot key={gi} filled={gi < currentStamps} isFree />;
                  const filled = gi < currentStamps;
                  return <StampDot key={gi} filled={filled} label={filled ? undefined : gi + 1} />;
                })}
              </div>
            </div>

            {/* Progress note */}
            <div
              className="flex items-center justify-between mt-4 pt-3.5"
              style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-center gap-1.5">
                <PartyPopper className="w-3.5 h-3.5" style={{ color: "var(--c-gold)" }} />
                <p className="text-[11px]" style={{ color: "var(--c-card-light)" }}>
                  {stampsLeft} more visit{stampsLeft !== 1 ? "s" : ""} to unlock: Artisanal Coffee &amp; Pastry
                </p>
              </div>
            </div>
            <button
              className="mt-1 flex items-center gap-1 text-[11px] font-semibold"
              style={{ color: "var(--c-gold)" }}
            >
              View Reward Details
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* ── Request Stamp Button ── */}
        <button
          onClick={() => setShowStampModal(true)}
          className="w-full flex items-center justify-center gap-2.5 text-white font-semibold text-[15px] py-4 rounded-2xl transition-all active:scale-[0.98]"
          style={{ backgroundColor: "var(--c-terracotta)" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--c-terracotta-deep)")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--c-terracotta)")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="14" width="18" height="3" rx="1.5" fill="white" opacity="0.9" />
            <path d="M6 14V9a6 6 0 0 1 12 0v5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="9" r="2.5" fill="white" opacity="0.7" />
          </svg>
          Request Stamp
        </button>

        {/* ── Next Milestones ── */}
        <div
          className="rounded-2xl px-4 pt-4 pb-1"
          style={{ backgroundColor: "var(--c-surface)" }}
        >
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[15px] font-bold" style={{ color: "var(--c-text-primary)" }}>
              Next Milestones
            </h2>
            <Link
              href="/rewards"
              className="flex items-center gap-0.5 text-[12px] font-semibold"
              style={{ color: "var(--c-terracotta)" }}
            >
              View all (4)
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div style={{ borderColor: "var(--c-border)" }}>
            {MILESTONES.map((m, i) => (
              <div
                key={m.id}
                style={i < MILESTONES.length - 1 ? { borderBottom: "1px solid var(--c-border)" } : {}}
              >
                <MilestoneCard milestone={m} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Recent Visit Activity ── */}
        <Link
          href="/activity"
          className="flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-colors"
          style={{ backgroundColor: "var(--c-surface)" }}
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: "var(--c-bg)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="var(--c-text-secondary)" strokeWidth="1.6" />
              <path d="M3 9h18" stroke="var(--c-text-secondary)" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M8 3v4M16 3v4" stroke="var(--c-text-secondary)" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M7 14h4M7 18h6" stroke="var(--c-text-secondary)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-semibold" style={{ color: "var(--c-text-primary)" }}>
              Recent Visit Activity
            </p>
            <p className="text-[11px]" style={{ color: "var(--c-text-secondary)" }}>
              Yesterday at 09:42 AM • +1 Stamp
            </p>
          </div>
          <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "var(--c-text-muted)" }} />
        </Link>

        <div className="h-2" />
      </main>

      <StampProgressModal
        isOpen={showStampModal}
        onClose={() => setShowStampModal(false)}
        currentStamps={CUSTOMER.currentStamps}
        totalStamps={CUSTOMER.maxStamps}
      />
      <RewardUnlockedModal
        isOpen={showRewardModal}
        onClose={() => setShowRewardModal(false)}
      />

      <BottomTabBar />
    </div>
  );
}
