"use client";

import React, { useState } from "react";
import { Bell, CheckCircle, Shield, Star, X } from "lucide-react";
import Link from "next/link";
import { BottomTabBar } from "@/components/customer/BottomTabBar";
import { useCustomer, ActivityItem } from "@/lib/customer-store";

type TabKey = "all" | "stamps" | "redemptions";

function TimelineIcon({ type }: { type: string }) {
  if (type === "stamp") return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2"
      style={{ backgroundColor: "var(--c-gold-light)", borderColor: "var(--c-gold)" }}>
      <Star className="w-4 h-4" style={{ color: "var(--c-gold)", fill: "var(--c-gold)" }} />
    </div>
  );
  if (type === "redeem") return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--c-espresso)" }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="10" width="18" height="11" rx="1.5" stroke="white" strokeWidth="1.7" />
        <path d="M12 10V21" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M3 14h18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 10c0-2 1.5-4 4-4s4 2 4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  );
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2"
      style={{ backgroundColor: "var(--c-banner-bg)", borderColor: "var(--c-gold)" }}>
      <span className="text-[13px] font-bold" style={{ color: "var(--c-gold)" }}>×2</span>
    </div>
  );
}

function StampBadge({ delta }: { delta: number }) {
  const pos = delta > 0;
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
      style={{
        backgroundColor: pos ? "var(--c-sage-light)" : "rgba(217,79,79,0.1)",
        color: pos ? "var(--c-sage)" : "var(--c-alert)",
      }}>
      {pos ? `+${delta}` : delta} Stamp{Math.abs(delta) !== 1 ? "s" : ""}
    </span>
  );
}

function PassProgressBar({ stamped, max }: { stamped: number; max: number }) {
  return (
    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "var(--c-border)" }}>
      <div className="h-full rounded-full transition-all" style={{ width: `${Math.min((stamped / max) * 100, 100)}%`, backgroundColor: "var(--c-terracotta)" }} />
    </div>
  );
}

// Receipt Modal
function ReceiptModal({ item, onClose }: { item: ActivityItem; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center backdrop-blur-[3px]"
      style={{ backgroundColor: "rgba(43,33,24,0.5)" }} onClick={onClose}>
      <div className="w-full max-w-md rounded-t-3xl p-6 border-t"
        style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}
        onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[16px] font-bold" style={{ color: "var(--c-text-primary)" }}>Receipt</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--c-bg)", color: "var(--c-text-muted)" }}>
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="rounded-2xl p-4 border flex flex-col gap-3" style={{ backgroundColor: "var(--c-bg)", borderColor: "var(--c-border)" }}>
          <div className="flex justify-between">
            <span className="text-[12px]" style={{ color: "var(--c-text-secondary)" }}>Item</span>
            <span className="text-[12px] font-semibold" style={{ color: "var(--c-text-primary)" }}>{item.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[12px]" style={{ color: "var(--c-text-secondary)" }}>Date & Time</span>
            <span className="text-[12px] font-semibold" style={{ color: "var(--c-text-primary)" }}>{item.datetime}</span>
          </div>
          {item.redeemCode && (
            <div className="flex justify-between">
              <span className="text-[12px]" style={{ color: "var(--c-text-secondary)" }}>Code</span>
              <span className="text-[12px] font-mono font-semibold" style={{ color: "var(--c-text-primary)" }}>{item.redeemCode}</span>
            </div>
          )}
          {item.receiptNote && (
            <div className="flex justify-between">
              <span className="text-[12px]" style={{ color: "var(--c-text-secondary)" }}>Note</span>
              <span className="text-[12px] font-semibold" style={{ color: "var(--c-text-primary)" }}>{item.receiptNote}</span>
            </div>
          )}
          <div className="flex justify-between pt-2" style={{ borderTop: "1px solid var(--c-border)" }}>
            <span className="text-[12px]" style={{ color: "var(--c-text-secondary)" }}>Stamps used</span>
            <span className="text-[12px] font-bold" style={{ color: "var(--c-alert)" }}>{item.stampDelta} Stamps</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <CheckCircle className="w-4 h-4" style={{ color: "var(--c-sage)" }} />
          <span className="text-[12px] font-medium" style={{ color: "var(--c-sage)" }}>Successfully Redeemed</span>
        </div>
        <button onClick={onClose} className="w-full mt-4 py-3.5 rounded-xl font-semibold text-white text-[14px]"
          style={{ backgroundColor: "var(--c-espresso)" }}>
          Done
        </button>
      </div>
    </div>
  );
}

function ActivityCard({ item, onReceipt }: { item: ActivityItem; onReceipt?: (item: ActivityItem) => void }) {
  if (item.type === "redeem") return (
    <div className="rounded-2xl overflow-hidden border"
      style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)", boxShadow: "0 1px 8px rgba(43,33,24,0.06)" }}>
      <div className="px-4 pt-3 pb-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <p className="text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ color: "var(--c-gold)" }}>Reward Redeemed</p>
            <h3 className="text-[14px] font-bold" style={{ color: "var(--c-text-primary)" }}>{item.title}</h3>
          </div>
          <StampBadge delta={item.stampDelta} />
        </div>
      </div>
      <div className="mx-4 rounded-xl mb-3 flex gap-3 items-center px-3 py-2.5" style={{ backgroundColor: "var(--c-bg)" }}>
        <div className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center text-xl"
          style={{ background: "linear-gradient(135deg, var(--c-peach) 0%, var(--c-gold) 100%)" }}>🥐</div>
        <div>
          <p className="text-[11px]" style={{ color: "var(--c-text-secondary)" }}>{item.datetime}</p>
          {item.redeemCode && (
            <p className="text-[11px] font-medium mt-0.5" style={{ color: "var(--c-text-primary)" }}>
              Code: <span className="font-mono tracking-wider">{item.redeemCode}</span>
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between px-4 pb-3">
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-3.5 h-3.5" style={{ color: "var(--c-sage)" }} />
          <span className="text-[11px] font-medium" style={{ color: "var(--c-sage)" }}>{item.redeemStatus}</span>
        </div>
        {item.hasReceipt && (
          <button onClick={() => onReceipt?.(item)}
            className="text-[11px] font-semibold underline underline-offset-2" style={{ color: "var(--c-terracotta)" }}>
            Receipt →
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="rounded-2xl border px-4 py-3.5"
      style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)", boxShadow: "0 1px 8px rgba(43,33,24,0.06)" }}>
      <div className="flex items-start justify-between gap-2 mb-0.5">
        <h3 className="text-[14px] font-bold" style={{ color: "var(--c-text-primary)" }}>{item.title}</h3>
        <StampBadge delta={item.stampDelta} />
      </div>
      {item.venue && (
        <p className="text-[12px] mb-0.5" style={{ color: "var(--c-text-secondary)" }}>
          {item.venue}{item.venueLocation && <span style={{ color: "var(--c-text-muted)" }}> • {item.venueLocation}</span>}
        </p>
      )}
      {item.promoLabel && (
        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full mb-1 border"
          style={{ color: "var(--c-gold)", backgroundColor: "var(--c-banner-bg)", borderColor: "var(--c-banner-border)" }}>
          {item.promoLabel}
        </span>
      )}
      <p className="text-[11px] mt-1" style={{ color: "var(--c-text-secondary)" }}>
        {item.datetime}
        {item.approvedBy && <span style={{ color: "var(--c-text-muted)" }}> • {item.approvedBy}</span>}
        {item.orderRef && <span style={{ color: "var(--c-text-muted)" }}> ({item.orderRef})</span>}
      </p>
      {item.passStatus && item.passStamped !== undefined && item.passMax && (
        <div className="mt-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold tracking-wider uppercase" style={{ color: "var(--c-text-muted)" }}>
              Pass Status: {item.passStatus}
            </span>
            {item.stampsToReward !== undefined && (
              <span className="text-[10px]" style={{ color: "var(--c-text-muted)" }}>{item.stampsToReward} to reward</span>
            )}
          </div>
          <PassProgressBar stamped={item.passStamped} max={item.passMax} />
        </div>
      )}
    </div>
  );
}

export default function ActivityPage() {
  const { state, unreadCount } = useCustomer();
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [receiptItem, setReceiptItem] = useState<ActivityItem | null>(null);

  const { activity, totalVisits, currentStamps, totalRewardsEarned } = state;
  const redemptionCount = activity.filter(a => a.type === "redeem").length;

  const TABS: { key: TabKey; label: string; badge?: React.ReactNode }[] = [
    { key: "all", label: "All Activity" },
    { key: "stamps", label: "Stamps (+)" },
    {
      key: "redemptions", label: "Redemptions",
      badge: redemptionCount > 0 ? (
        <span className="w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
          style={{ backgroundColor: "var(--c-gold)" }}>{redemptionCount}</span>
      ) : undefined,
    },
  ];

  const filtered = activity.filter(a => {
    if (activeTab === "stamps")      return a.type === "stamp" || a.type === "double_stamp";
    if (activeTab === "redemptions") return a.type === "redeem";
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
          <div className="flex items-center gap-1.5 mb-0.5">
            <Shield className="w-3.5 h-3.5" style={{ color: "var(--c-gold)" }} />
            <p className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--c-text-muted)" }}>Ledger &amp; Provenance</p>
          </div>
          <h1 className="text-[26px] font-bold tracking-tight" style={{ color: "var(--c-text-primary)" }}>Activity Ledger</h1>
          <p className="text-[13px] mt-0.5" style={{ color: "var(--c-text-secondary)" }}>Verifiable record of your stamps, visits, and redeemed treats.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Visits", value: totalVisits, icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="5" width="18" height="16" rx="2" stroke="var(--c-text-secondary)" strokeWidth="1.6" />
                <path d="M3 9h18M8 3v4M16 3v4" stroke="var(--c-text-secondary)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>) },
            { label: "Stamps", value: currentStamps, icon: (
              <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--c-gold)" }}>
                <Star className="w-3 h-3 text-white fill-white" />
              </div>) },
            { label: "Rewards", value: totalRewardsEarned, icon: (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="10" width="18" height="11" rx="1.5" stroke="var(--c-sage)" strokeWidth="1.6" />
                <path d="M12 10V21M3 14h18M8 10c0-2 1.5-4 4-4s4 2 4 4" stroke="var(--c-sage)" strokeWidth="1.4" strokeLinecap="round" />
              </svg>) },
          ].map(s => (
            <div key={s.label} className="rounded-xl flex flex-col items-center justify-center py-3 gap-1 border"
              style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}>
              {s.icon}
              <p className="text-[20px] font-bold leading-none" style={{ color: "var(--c-text-primary)" }}>{s.value}</p>
              <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--c-text-muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5">
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
                {tab.badge}
              </button>
            );
          })}
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col gap-0 pb-2">
          <div className="absolute left-[17px] top-5 bottom-5 w-[2px] rounded-full" style={{ backgroundColor: "var(--c-border)" }} />
          {filtered.map(item => (
            <div key={item.id} className="relative flex gap-4 pb-4">
              <div className="relative z-10 flex-shrink-0"><TimelineIcon type={item.type} /></div>
              <div className="flex-1 min-w-0">
                <ActivityCard item={item} onReceipt={setReceiptItem} />
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="ml-12 rounded-2xl p-6 text-center border"
              style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}>
              <p className="text-[13px]" style={{ color: "var(--c-text-secondary)" }}>No activity in this category.</p>
            </div>
          )}
        </div>
      </main>

      {receiptItem && <ReceiptModal item={receiptItem} onClose={() => setReceiptItem(null)} />}
      <BottomTabBar />
    </div>
  );
}
