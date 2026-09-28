"use client";

import React from "react";
import { Gift, CheckCircle } from "lucide-react";
import { PageShell } from "@/components/customer/PageShell";
import { useCustomer } from "@/lib/customer-store";

export default function RewardHistoryPage() {
  const { state } = useCustomer();
  const redeemActivity = state.activity.filter(a => a.type === "redeem");
  const { rewards } = state;
  const available = rewards.filter(r => r.status === "unlocked");

  return (
    <PageShell back backHref="/profile" title="Reward History">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--c-text-muted)" }}>Your Redemptions</p>
          <h2 className="text-[22px] font-bold" style={{ color: "var(--c-text-primary)" }}>Reward History</h2>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Claimed Total", value: redeemActivity.length + state.totalRewardsEarned },
            { label: "Available Now",  value: available.length },
          ].map(s => (
            <div key={s.label} className="rounded-xl px-4 py-3 border"
              style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}>
              <p className="text-[26px] font-bold leading-none" style={{ color: "var(--c-text-primary)" }}>{s.value}</p>
              <p className="text-[10px] font-semibold tracking-widest uppercase mt-1" style={{ color: "var(--c-text-muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Available to redeem */}
        {available.length > 0 && (
          <>
            <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--c-text-muted)" }}>Ready to Redeem</p>
            <div className="rounded-2xl border overflow-hidden"
              style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}>
              {available.map((r, idx) => (
                <div key={r.id} className="flex items-center gap-3 px-4 py-3"
                  style={idx < available.length - 1 ? { borderBottom: "1px solid var(--c-border)" } : {}}>
                  <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, var(--c-peach) 0%, var(--c-gold) 100%)" }}>☕</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold truncate" style={{ color: "var(--c-text-primary)" }}>{r.title}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--c-text-muted)" }}>Valid until {r.validUntil ?? "—"}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border"
                    style={{ backgroundColor: "var(--c-sage-light)", color: "var(--c-sage)", borderColor: "var(--c-sage)" }}>
                    AVAILABLE
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Redeemed history */}
        <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--c-text-muted)" }}>Redeemed</p>
        <div className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}>
          {redeemActivity.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-[13px]" style={{ color: "var(--c-text-secondary)" }}>No rewards redeemed yet.</p>
            </div>
          )}
          {redeemActivity.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-3 px-4 py-3"
              style={idx < redeemActivity.length - 1 ? { borderBottom: "1px solid var(--c-border)" } : {}}>
              <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, var(--c-card-dark) 0%, #5A4030 100%)" }}>🥐</div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold truncate" style={{ color: "var(--c-text-primary)" }}>{item.title}</p>
                <p className="text-[11px] mt-0.5 truncate" style={{ color: "var(--c-text-muted)" }}>{item.datetime}</p>
                {item.redeemCode && (
                  <p className="text-[10px] font-mono mt-0.5" style={{ color: "var(--c-text-muted)" }}>{item.redeemCode}</p>
                )}
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <CheckCircle className="w-3.5 h-3.5" style={{ color: "var(--c-sage)" }} />
                <span className="text-[10px] font-bold" style={{ color: "var(--c-text-muted)" }}>REDEEMED</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
