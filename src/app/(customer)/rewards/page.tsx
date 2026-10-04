"use client";

import React, { useState } from "react";
import { Bell, Calendar, Lock, Star, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BottomTabBar } from "@/components/customer/BottomTabBar";
import { useCustomer, CustomerReward } from "@/lib/customer-store";

type TabKey = "all" | "ready" | "inProgress";

function RewardImage({ variant }: { variant: string }) {
  const gradients: Record<string, string> = {
    unlocked: "linear-gradient(160deg, #3D2410 0%, #7A4A20 40%, var(--c-gold) 100%)",
    progress: "linear-gradient(160deg, #2C1A0E 0%, #6B3D1E 40%, #A06030 100%)",
    locked:   "linear-gradient(160deg, var(--c-card-dark) 0%, var(--c-card-mid) 50%, #5A4030 100%)",
  };
  const emoji: Record<string, string> = { unlocked: "☕", progress: "🥐", locked: "🫙" };
  return (
    <div className="w-full h-[160px] relative overflow-hidden"
      style={{ background: gradients[variant] ?? gradients.unlocked }}>
      <div className="absolute inset-0 flex items-center justify-center text-5xl opacity-25">{emoji[variant]}</div>
    </div>
  );
}

function StampRow({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {Array.from({ length: total }).map((_, i) => {
        const filled = i < current;
        const isNext = i === current;
        return (
          <div key={i} className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: filled ? "var(--c-gold)" : "var(--c-gold-light)",
              border: isNext ? "2px dashed var(--c-gold)" : filled ? "none" : "1px solid var(--c-border)",
            }}>
            {filled && (
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shadow-sm">
                <Image src="/stamp-icon.svg" alt="Stamp" width={16} height={16} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function UnlockedCard({ reward }: { reward: CustomerReward }) {
  const router = useRouter();
  return (
    <div className="rounded-2xl overflow-hidden border"
      style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)", boxShadow: "0 2px 12px rgba(43,33,24,0.07)" }}>
      <div className="relative">
        <RewardImage variant={reward.image} />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{ backgroundColor: "rgba(217,164,65,0.9)" }}>
          <Star className="w-3 h-3 fill-white text-white" />
          <span className="text-[10px] font-bold text-white uppercase tracking-wider">{reward.perkLabel}</span>
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 rounded-full backdrop-blur-sm" style={{ backgroundColor: "rgba(255,255,255,0.92)" }}>
          <span className="text-[10px] font-bold" style={{ color: "var(--c-text-primary)" }}>{reward.stampsRequired} Stamps</span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-[9px] font-bold text-white/80 tracking-widest uppercase">{reward.venueLabel}</span>
        </div>
      </div>
      <div className="px-4 pt-4 pb-4">
        <h3 className="text-[15px] font-bold leading-snug mb-1.5" style={{ color: "var(--c-text-primary)" }}>{reward.title}</h3>
        <p className="text-[12px] leading-relaxed mb-3" style={{ color: "var(--c-text-secondary)" }}>{reward.description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" style={{ color: "var(--c-text-muted)" }} />
            <span className="text-[11px]" style={{ color: "var(--c-text-secondary)" }}>Valid until {reward.validUntil}</span>
          </div>
          {reward.usageType && <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "var(--c-text-muted)" }}>{reward.usageType}</span>}
        </div>
        <button
          onClick={() => router.push(`/redeem/${reward.id}`)}
          className="w-full flex items-center justify-center gap-2 text-white font-semibold text-[14px] py-3.5 rounded-xl transition-all active:scale-[0.98]"
          style={{ backgroundColor: "var(--c-terracotta)" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--c-terracotta-deep)")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--c-terracotta)")}
        >
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
            <Image src="/stamp-icon.svg" alt="Stamp" width={18} height={18} />
          </div>
          Redeem Reward Now
        </button>
      </div>
    </div>
  );
}

function InProgressCard({ reward }: { reward: CustomerReward }) {
  const current = reward.currentStamps ?? 0;
  const remaining = reward.stampsRequired - current;
  return (
    <div className="rounded-2xl overflow-hidden border"
      style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)", boxShadow: "0 2px 12px rgba(43,33,24,0.07)" }}>
      <div className="relative">
        <RewardImage variant={reward.image} />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{ backgroundColor: "rgba(255,255,255,0.92)" }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--c-gold)" }} />
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--c-text-primary)" }}>In Progress</span>
        </div>
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full backdrop-blur-sm" style={{ backgroundColor: "rgba(43,29,18,0.75)" }}>
          <span className="text-[11px] font-bold text-white">{current} / {reward.stampsRequired} Stamps</span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-[9px] font-bold text-white/80 tracking-widest uppercase">{reward.venueLabel}</span>
        </div>
      </div>
      <div className="px-4 pt-4 pb-4">
        <h3 className="text-[15px] font-bold leading-snug mb-1.5" style={{ color: "var(--c-text-primary)" }}>{reward.title}</h3>
        <p className="text-[12px] leading-relaxed mb-4" style={{ color: "var(--c-text-secondary)" }}>{reward.description}</p>
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold" style={{ color: "var(--c-text-secondary)" }}>Card Requirement: {reward.stampsRequired} Stamps</span>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full border"
              style={{ backgroundColor: "var(--c-banner-bg)", borderColor: "var(--c-banner-border)" }}>
              <Zap className="w-3 h-3" style={{ color: "var(--c-gold)", fill: "var(--c-gold)" }} />
              <span className="text-[10px] font-semibold" style={{ color: "var(--c-banner-text)" }}>
                Only {remaining} more stamp{remaining !== 1 ? "s" : ""} needed!
              </span>
            </div>
          </div>
          <StampRow current={current} total={reward.stampsRequired} />
        </div>
        <div className="flex items-center justify-center gap-2 rounded-xl py-2.5 mt-1" style={{ backgroundColor: "var(--c-bg)" }}>
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

function LockedCard({ reward }: { reward: CustomerReward }) {
  const stampsToGo = reward.stampsRequired - (reward.currentStamps ?? 0);
  return (
    <div className="rounded-2xl overflow-hidden border"
      style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)", boxShadow: "0 2px 12px rgba(43,33,24,0.07)" }}>
      <div className="relative">
        <RewardImage variant={reward.image} />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm"
          style={{ backgroundColor: "rgba(43,29,18,0.6)" }}>
          <Lock className="w-3 h-3 text-white/80" />
          <span className="text-[10px] font-bold text-white/90 uppercase tracking-wider">Locked</span>
        </div>
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full backdrop-blur-sm" style={{ backgroundColor: "rgba(43,29,18,0.5)" }}>
          <span className="text-[11px] font-bold text-white/90">{reward.stampsRequired} Stamps</span>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="text-[9px] font-bold text-white/70 tracking-widest uppercase">{reward.venueLabel}</span>
        </div>
      </div>
      <div className="px-4 pt-4 pb-4">
        <h3 className="text-[15px] font-bold leading-snug mb-1.5" style={{ color: "var(--c-text-primary)" }}>{reward.title}</h3>
        <p className="text-[12px] leading-relaxed mb-4" style={{ color: "var(--c-text-secondary)" }}>{reward.description}</p>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5" style={{ color: "var(--c-text-muted)" }} />
            <span className="text-[11px]" style={{ color: "var(--c-text-muted)" }}>{stampsToGo} stamps to go</span>
          </div>
          {reward.tier && <span className="text-[11px] font-semibold" style={{ color: "var(--c-text-secondary)" }}>{reward.tier}</span>}
        </div>
        <button disabled className="w-full flex items-center justify-center gap-2 font-semibold text-[13px] py-3.5 rounded-xl cursor-not-allowed"
          style={{ backgroundColor: "var(--c-bg)", color: "var(--c-text-muted)" }}>
          <Lock className="w-4 h-4" /> Unlock at {reward.stampsRequired} Stamps
        </button>
      </div>
    </div>
  );
}

export default function RewardsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const { state, unreadCount } = useCustomer();
  const { rewards } = state;

  const readyCount = rewards.filter(r => r.status === "unlocked").length;
  const progressCount = rewards.filter(r => r.status === "in_progress").length;

  const TABS: { key: TabKey; label: string; count?: number }[] = [
    { key: "all",        label: "All Rewards",    count: rewards.length },
    { key: "ready",      label: "Ready to Redeem", count: readyCount },
    { key: "inProgress", label: "In Progress",    count: progressCount },
  ];

  const filtered = rewards.filter(r => {
    if (activeTab === "ready")      return r.status === "unlocked";
    if (activeTab === "inProgress") return r.status === "in_progress";
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col pb-24" style={{ backgroundColor: "var(--c-bg)" }}>
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 px-4 pt-3 pb-2" style={{ backgroundColor: "var(--c-bg)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-bold tracking-tight leading-none" style={{ color: "var(--c-text-primary)" }}>Atelier Guild</p>
            <p className="text-[10px] font-semibold tracking-widest uppercase mt-0.5" style={{ color: "var(--c-terracotta)" }}>Patron Salon</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/notifications" className="relative w-9 h-9 flex items-center justify-center">
              <Bell className="w-5 h-5" style={{ color: "var(--c-text-primary)" }} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
                  style={{ backgroundColor: "var(--c-terracotta)" }}>
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
            <Link href="/profile">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--c-peach)" }}>
                <span className="text-sm font-semibold" style={{ color: "var(--c-espresso)" }}>{state.profile.avatarInitial}</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto pt-[72px] px-4 flex flex-col gap-4">
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase mb-0.5" style={{ color: "var(--c-text-muted)" }}>Patron Privilege</p>
          <h1 className="text-[24px] font-bold tracking-tight" style={{ color: "var(--c-text-primary)" }}>Your Rewards</h1>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--c-text-secondary)" }}>Exchange earned loyalty stamps for curated artisan treats.</p>
        </div>

        {/* Summary strip */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl px-3 py-2 flex-1 border"
            style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-white">
              <Image src="/stamp-icon.svg" alt="Stamp" width={20} height={20} />
            </div>
            <div>
              <p className="text-[12px] font-bold" style={{ color: "var(--c-text-primary)" }}>{state.currentStamps} Stamps Active</p>
              <p className="text-[10px] font-medium" style={{ color: "var(--c-sage)" }}>
                {readyCount > 0 ? `${readyCount} Reward${readyCount > 1 ? "s" : ""} Ready to Redeem` : "Keep collecting stamps!"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 rounded-xl px-3 py-2 border"
            style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="var(--c-text-muted)" strokeWidth="1.6" />
              <path d="M9 12l2 2 4-4" stroke="var(--c-text-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-[12px] font-semibold" style={{ color: "var(--c-text-secondary)" }}>
              {state.profile.tier}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
          {TABS.map(tab => {
            const isActive = activeTab === tab.key;
            return (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-semibold transition-all border"
                style={{
                  backgroundColor: isActive ? "var(--c-espresso)" : "var(--c-surface)",
                  color: isActive ? "white" : "var(--c-text-secondary)",
                  borderColor: isActive ? "var(--c-espresso)" : "var(--c-border)",
                }}>
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: isActive ? "rgba(255,255,255,0.2)" : "var(--c-bg)",
                      color: isActive ? "white" : "var(--c-text-muted)",
                    }}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4 pb-2">
          {filtered.length === 0 && (
            <div className="rounded-2xl p-8 text-center border" style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}>
              <p className="text-[13px]" style={{ color: "var(--c-text-secondary)" }}>No rewards in this category.</p>
            </div>
          )}
          {filtered.map(r => {
            if (r.status === "unlocked")    return <UnlockedCard key={r.id} reward={r} />;
            if (r.status === "in_progress") return <InProgressCard key={r.id} reward={r} />;
            return <LockedCard key={r.id} reward={r} />;
          })}
        </div>
      </main>
      <BottomTabBar />
    </div>
  );
}
