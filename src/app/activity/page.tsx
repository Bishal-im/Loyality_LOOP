"use client";

import React, { useState } from "react";
import { BottomTabBar } from "@/components/customer/BottomTabBar";
import { Bell, CheckCircle, Shield, Star } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type ActivityType = "stamp" | "redeem" | "double_stamp";
type TabKey = "all" | "stamps" | "redemptions";

interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  venue?: string;
  venueLocation?: string;
  datetime: string;
  approvedBy?: string;
  orderRef?: string;
  promoLabel?: string;
  passStatus?: string;
  passMax?: number;
  passStamped?: number;
  stampsToReward?: number;
  stampDelta: number;
  redeemCode?: string;
  redeemStatus?: string;
  hasReceipt?: boolean;
}

// ─── Mock data ────────────────────────────────────────────────────────────────
const STATS = { visits: 24, stamps: 38, rewards: 4 };

const ACTIVITY: ActivityItem[] = [
  {
    id: "a1",
    type: "stamp",
    title: "Stamp Approved",
    venue: "ABC Café",
    venueLocation: "Downtown Roastery",
    datetime: "Today, 12:32 PM",
    approvedBy: "Approved by Staff",
    orderRef: "Order #4912",
    passStatus: "7/10 STAMPED",
    passStamped: 7,
    passMax: 10,
    stampsToReward: 3,
    stampDelta: 1,
  },
  {
    id: "a2",
    type: "redeem",
    title: "Artisan Croissant & Bat...",
    datetime: "Sep 22, 4:15 PM",
    redeemCode: "LOYAL-8X29K",
    redeemStatus: "Successfully Redeemed",
    hasReceipt: true,
    stampDelta: -10,
  },
  {
    id: "a3",
    type: "double_stamp",
    title: "Double Stamp Visit",
    venue: "Weekend Artisan Special",
    datetime: "Sep 20, 1:08 PM",
    approvedBy: "Approved by Barista Sarah",
    orderRef: "Order #4790",
    promoLabel: "Promo",
    passStatus: "6/10 STAMPED",
    passStamped: 6,
    passMax: 10,
    stampDelta: 2,
  },
  {
    id: "a4",
    type: "stamp",
    title: "Stamp Approved",
    venue: "Downtown Roastery",
    datetime: "Sep 14, 9:45 AM",
    approvedBy: "Self-check verification",
    stampDelta: 1,
  },
];

// ─── Timeline icon ────────────────────────────────────────────────────────────
function TimelineIcon({ type }: { type: ActivityType }) {
  if (type === "stamp") {
    return (
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2"
        style={{
          backgroundColor: "var(--c-gold-light)",
          borderColor: "var(--c-gold)",
        }}
      >
        <Star className="w-4 h-4" style={{ color: "var(--c-gold)", fill: "var(--c-gold)" }} />
      </div>
    );
  }
  if (type === "redeem") {
    return (
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "var(--c-espresso)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="10" width="18" height="11" rx="1.5" stroke="white" strokeWidth="1.7" />
          <path d="M12 10V21" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3 14h18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8 10c0-2 1.5-4 4-4s4 2 4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  // double_stamp
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2"
      style={{
        backgroundColor: "var(--c-banner-bg)",
        borderColor: "var(--c-gold)",
      }}
    >
      <span className="text-[13px] font-bold" style={{ color: "var(--c-gold)" }}>×2</span>
    </div>
  );
}

// ─── Stamp delta badge ────────────────────────────────────────────────────────
function StampBadge({ delta }: { delta: number }) {
  const positive = delta > 0;
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
      style={{
        backgroundColor: positive ? "var(--c-sage-light)" : "rgba(217,79,79,0.1)",
        color: positive ? "var(--c-sage)" : "var(--c-alert)",
      }}
    >
      {positive ? `+${delta}` : delta} Stamp{Math.abs(delta) !== 1 ? "s" : ""}
    </span>
  );
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function PassProgressBar({ stamped, max }: { stamped: number; max: number }) {
  const pct = Math.min((stamped / max) * 100, 100);
  return (
    <div
      className="w-full h-1.5 rounded-full overflow-hidden"
      style={{ backgroundColor: "var(--c-border)" }}
    >
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, backgroundColor: "var(--c-terracotta)" }}
      />
    </div>
  );
}

// ─── Activity card ────────────────────────────────────────────────────────────
function ActivityCard({ item }: { item: ActivityItem }) {
  if (item.type === "redeem") {
    return (
      <div
        className="rounded-2xl overflow-hidden border"
        style={{
          backgroundColor: "var(--c-surface)",
          borderColor: "var(--c-border)",
          boxShadow: "0 1px 8px rgba(43,33,24,0.06)",
        }}
      >
        <div className="px-4 pt-3 pb-1">
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <p
                className="text-[10px] font-bold tracking-widest uppercase mb-0.5"
                style={{ color: "var(--c-gold)" }}
              >
                Reward Redeemed
              </p>
              <h3 className="text-[14px] font-bold" style={{ color: "var(--c-text-primary)" }}>
                {item.title}
              </h3>
            </div>
            <StampBadge delta={item.stampDelta} />
          </div>
        </div>

        <div
          className="mx-4 rounded-xl mb-3 flex gap-3 items-center px-3 py-2.5"
          style={{ backgroundColor: "var(--c-bg)" }}
        >
          <div
            className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center text-xl"
            style={{
              background: `linear-gradient(135deg, var(--c-peach) 0%, var(--c-gold) 100%)`,
            }}
          >
            🥐
          </div>
          <div>
            <p className="text-[11px]" style={{ color: "var(--c-text-secondary)" }}>{item.datetime}</p>
            <p className="text-[11px] font-medium mt-0.5" style={{ color: "var(--c-text-primary)" }}>
              Code:{" "}
              <span className="font-mono tracking-wider">{item.redeemCode}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 pb-3">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" style={{ color: "var(--c-sage)" }} />
            <span className="text-[11px] font-medium" style={{ color: "var(--c-sage)" }}>
              {item.redeemStatus}
            </span>
          </div>
          {item.hasReceipt && (
            <button
              className="text-[11px] font-semibold underline underline-offset-2"
              style={{ color: "var(--c-terracotta)" }}
            >
              Receipt →
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border px-4 py-3.5"
      style={{
        backgroundColor: "var(--c-surface)",
        borderColor: "var(--c-border)",
        boxShadow: "0 1px 8px rgba(43,33,24,0.06)",
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-0.5">
        <h3 className="text-[14px] font-bold" style={{ color: "var(--c-text-primary)" }}>
          {item.title}
        </h3>
        <StampBadge delta={item.stampDelta} />
      </div>

      {item.venue && (
        <p className="text-[12px] mb-0.5" style={{ color: "var(--c-text-secondary)" }}>
          {item.venue}
          {item.venueLocation && (
            <span style={{ color: "var(--c-text-muted)" }}> • {item.venueLocation}</span>
          )}
        </p>
      )}

      {item.promoLabel && (
        <span
          className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 border"
          style={{
            color: "var(--c-gold)",
            backgroundColor: "var(--c-banner-bg)",
            borderColor: "var(--c-banner-border)",
          }}
        >
          {item.promoLabel}
        </span>
      )}

      <p className="text-[11px] mt-1" style={{ color: "var(--c-text-secondary)" }}>
        {item.datetime}
        {item.approvedBy && (
          <span style={{ color: "var(--c-text-muted)" }}> • {item.approvedBy}</span>
        )}
        {item.orderRef && (
          <span style={{ color: "var(--c-text-muted)" }}> ({item.orderRef})</span>
        )}
      </p>

      {item.passStatus && item.passStamped !== undefined && item.passMax && (
        <div className="mt-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span
              className="text-[10px] font-bold tracking-wider uppercase"
              style={{ color: "var(--c-text-muted)" }}
            >
              Pass Status: {item.passStatus}
            </span>
            {item.stampsToReward !== undefined && (
              <span className="text-[10px]" style={{ color: "var(--c-text-muted)" }}>
                {item.stampsToReward} to reward
              </span>
            )}
            {item.orderRef && !item.stampsToReward && (
              <span className="text-[10px]" style={{ color: "var(--c-text-muted)" }}>
                {item.orderRef}
              </span>
            )}
          </div>
          <PassProgressBar stamped={item.passStamped} max={item.passMax} />
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ActivityPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");

  const redemptionCount = ACTIVITY.filter((a) => a.type === "redeem").length;

  const TABS: { key: TabKey; label: string; badge?: React.ReactNode }[] = [
    { key: "all", label: "All Activity" },
    { key: "stamps", label: "Stamps (+)" },
    {
      key: "redemptions",
      label: "Redemptions",
      badge: (
        <span
          className="w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
          style={{ backgroundColor: "var(--c-gold)" }}
        >
          {redemptionCount}
        </span>
      ),
    },
  ];

  const filtered = ACTIVITY.filter((a) => {
    if (activeTab === "all") return true;
    if (activeTab === "stamps") return a.type === "stamp" || a.type === "double_stamp";
    if (activeTab === "redemptions") return a.type === "redeem";
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
          <div className="flex items-center gap-1.5 mb-0.5">
            <Shield className="w-3.5 h-3.5" style={{ color: "var(--c-gold)" }} />
            <p
              className="text-[10px] font-bold tracking-widest uppercase"
              style={{ color: "var(--c-text-muted)" }}
            >
              Ledger &amp; Provenance
            </p>
          </div>
          <h1
            className="text-[26px] font-bold tracking-tight leading-tight"
            style={{ color: "var(--c-text-primary)" }}
          >
            Activity Ledger
          </h1>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--c-text-secondary)" }}>
            Verifiable record of your stamps, visits, and redeemed treats.
          </p>
        </div>

        {/* ── Stats strip ── */}
        <div className="grid grid-cols-3 gap-2">
          {/* Visits */}
          <div
            className="rounded-xl flex flex-col items-center justify-center py-3 gap-1 border"
            style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="var(--c-text-secondary)" strokeWidth="1.6" />
              <path d="M3 9h18" stroke="var(--c-text-secondary)" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M8 3v4M16 3v4" stroke="var(--c-text-secondary)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="text-[20px] font-bold leading-none" style={{ color: "var(--c-text-primary)" }}>
              {STATS.visits}
            </p>
            <p
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: "var(--c-text-muted)" }}
            >
              Visits
            </p>
          </div>

          {/* Stamps */}
          <div
            className="rounded-xl flex flex-col items-center justify-center py-3 gap-1 border"
            style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}
          >
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--c-gold)" }}
            >
              <Star className="w-3 h-3 text-white fill-white" />
            </div>
            <p className="text-[20px] font-bold leading-none" style={{ color: "var(--c-text-primary)" }}>
              {STATS.stamps}
            </p>
            <p
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: "var(--c-text-muted)" }}
            >
              Stamps
            </p>
          </div>

          {/* Rewards */}
          <div
            className="rounded-xl flex flex-col items-center justify-center py-3 gap-1 border"
            style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="10" width="18" height="11" rx="1.5" stroke="var(--c-sage)" strokeWidth="1.6" />
              <path d="M12 10V21" stroke="var(--c-sage)" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M3 14h18" stroke="var(--c-sage)" strokeWidth="1.4" strokeLinecap="round" />
              <path d="M8 10c0-2 1.5-4 4-4s4 2 4 4" stroke="var(--c-sage)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="text-[20px] font-bold leading-none" style={{ color: "var(--c-text-primary)" }}>
              {STATS.rewards}
            </p>
            <p
              className="text-[10px] font-semibold tracking-widest uppercase"
              style={{ color: "var(--c-text-muted)" }}
            >
              Rewards
            </p>
          </div>
        </div>

        {/* ── Tab bar ── */}
        <div className="flex items-center gap-1.5">
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
                {tab.badge}
              </button>
            );
          })}
        </div>

        {/* ── Timeline ── */}
        <div className="relative flex flex-col gap-0 pb-2">
          <div
            className="absolute left-[17px] top-5 bottom-5 w-[2px] rounded-full"
            style={{ backgroundColor: "var(--c-border)" }}
          />

          {filtered.map((item) => (
            <div key={item.id} className="relative flex gap-4 pb-4">
              <div className="relative z-10 flex-shrink-0">
                <TimelineIcon type={item.type} />
              </div>
              <div className="flex-1 min-w-0">
                <ActivityCard item={item} />
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div
              className="ml-12 rounded-2xl p-6 text-center border"
              style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}
            >
              <p className="text-[13px]" style={{ color: "var(--c-text-secondary)" }}>
                No activity in this category.
              </p>
            </div>
          )}
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}
