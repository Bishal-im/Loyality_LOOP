"use client";

import React, { useState } from "react";
import { Star, Zap, ShoppingBag } from "lucide-react";
import { PageShell } from "@/components/customer/PageShell";
import { useCustomer, ActivityItem } from "@/lib/customer-store";

function PointIcon({ type }: { type: string }) {
  if (type === "stamp") return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--c-gold-light)" }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="14" width="18" height="3" rx="1.5" fill="var(--c-gold)" opacity="0.8" />
        <path d="M6 14V9a6 6 0 0 1 12 0v5" stroke="var(--c-gold)" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="12" cy="9" r="2.5" fill="var(--c-gold)" opacity="0.6" />
      </svg>
    </div>
  );
  if (type === "double_stamp") return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 border-2"
      style={{ backgroundColor: "var(--c-banner-bg)", borderColor: "var(--c-gold)" }}>
      <Zap className="w-4 h-4" style={{ color: "var(--c-gold)" }} />
    </div>
  );
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--c-bg)" }}>
      <ShoppingBag className="w-4 h-4" style={{ color: "var(--c-text-secondary)" }} />
    </div>
  );
}

export default function PointHistoryPage() {
  const { state } = useCustomer();
  const stampActivity = state.activity.filter(a => a.type !== "redeem");
  const total  = state.currentStamps;
  const visits = state.totalVisits;

  return (
    <PageShell back backHref="/profile" title="Point History">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--c-text-muted)" }}>Your Stamps</p>
          <h2 className="text-[22px] font-bold" style={{ color: "var(--c-text-primary)" }}>Point History</h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[{ label: "Active Stamps", value: total }, { label: "Total Visits", value: visits }].map(s => (
            <div key={s.label} className="rounded-xl px-4 py-3 border"
              style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}>
              <p className="text-[26px] font-bold leading-none" style={{ color: "var(--c-text-primary)" }}>{s.value}</p>
              <p className="text-[10px] font-semibold tracking-widest uppercase mt-1" style={{ color: "var(--c-text-muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* History list */}
        <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--c-text-muted)" }}>All Stamp Events</p>
        <div className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}>
          {stampActivity.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-[13px]" style={{ color: "var(--c-text-secondary)" }}>No stamp history yet.</p>
            </div>
          )}
          {stampActivity.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-3 px-4 py-3"
              style={idx < stampActivity.length - 1 ? { borderBottom: "1px solid var(--c-border)" } : {}}>
              <PointIcon type={item.type} />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold truncate" style={{ color: "var(--c-text-primary)" }}>{item.title}</p>
                <p className="text-[10px] mt-0.5 truncate" style={{ color: "var(--c-text-muted)" }}>
                  {item.datetime}{item.venue && ` • ${item.venue}`}
                </p>
              </div>
              <span className="text-[11px] font-bold flex-shrink-0 px-2 py-0.5 rounded-full"
                style={{ backgroundColor: "var(--c-sage-light)", color: "var(--c-sage)" }}>
                +{item.stampDelta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
