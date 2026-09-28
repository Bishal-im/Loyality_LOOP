"use client";

import React from "react";
import { Award, Check, ChevronRight, Star } from "lucide-react";
import { PageShell } from "@/components/customer/PageShell";
import { useCustomer } from "@/lib/customer-store";

const TIERS = [
  { level: 1, name: "Bronze Patron",  stamps: 0,   color: "#CD7F32", benefits: ["1 stamp per visit", "Access to basic rewards"] },
  { level: 2, name: "Gold Patron",    stamps: 30,  color: "#D9A441", benefits: ["1.5× stamps on weekends", "Priority cupping reservations", "Exclusive pre-access to new drops"] },
  { level: 3, name: "Platinum Patron",stamps: 80,  color: "#8FA58F", benefits: ["2× stamps every visit", "VIP event invitations", "Free upgrade on every 5th visit", "Personal barista consultations"] },
  { level: 4, name: "Guild Master",   stamps: 150, color: "#C96F4A", benefits: ["Unlimited upgrades", "Private reserve access", "Annual artisan gift box", "Dedicated account manager"] },
];

export default function TierPage() {
  const { state } = useCustomer();
  const { profile, currentStamps, totalStamps } = state;

  const currentTier = TIERS.find(t => t.level === profile.tierLevel) ?? TIERS[1];
  const nextTier    = TIERS.find(t => t.level === profile.tierLevel + 1);
  const progress    = nextTier ? Math.min(((totalStamps - currentTier.stamps) / (nextTier.stamps - currentTier.stamps)) * 100, 100) : 100;

  return (
    <PageShell back backHref="/profile" title="Your Tier">
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--c-text-muted)" }}>Patron Status</p>
          <h2 className="text-[22px] font-bold" style={{ color: "var(--c-text-primary)" }}>Loyalty Tiers</h2>
        </div>

        {/* Current tier card */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(145deg, var(--c-card-mid) 0%, var(--c-card-dark) 100%)" }}>
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-[9px] font-semibold tracking-[0.14em] uppercase mb-1" style={{ color: "var(--c-card-accent)" }}>Current Tier</p>
                <p className="text-[20px] font-bold text-white">{currentTier.name}</p>
                <p className="text-[12px] mt-0.5" style={{ color: "var(--c-card-light)" }}>Level {currentTier.level} • {profile.patronId}</p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "rgba(217,164,65,0.2)" }}>
                <Star className="w-5 h-5" style={{ color: "var(--c-gold)", fill: "var(--c-gold)" }} />
              </div>
            </div>
            {nextTier && (
              <>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--c-card-accent)" }}>
                  Progress to {nextTier.name} — {totalStamps}/{nextTier.stamps} stamps
                </p>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                  <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, backgroundColor: "var(--c-gold)" }} />
                </div>
                <p className="text-[11px] mt-1.5" style={{ color: "var(--c-card-light)" }}>
                  {nextTier.stamps - totalStamps} more stamps to reach {nextTier.name}
                </p>
              </>
            )}
          </div>
        </div>

        {/* All tiers */}
        <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--c-text-muted)" }}>All Tiers</p>
        <div className="flex flex-col gap-3">
          {TIERS.map(tier => {
            const isCurrent = tier.level === profile.tierLevel;
            const isUnlocked = tier.level <= profile.tierLevel;
            return (
              <div key={tier.level} className="rounded-2xl border overflow-hidden"
                style={{
                  backgroundColor: isCurrent ? "var(--c-surface)" : "var(--c-surface)",
                  borderColor: isCurrent ? tier.color : "var(--c-border)",
                  boxShadow: isCurrent ? `0 0 0 2px ${tier.color}30` : undefined,
                }}>
                <div className="px-4 py-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: isUnlocked ? `${tier.color}20` : "var(--c-bg)" }}>
                        <Award className="w-4 h-4" style={{ color: isUnlocked ? tier.color : "var(--c-text-muted)" }} />
                      </div>
                      <div>
                        <p className="text-[13px] font-bold" style={{ color: "var(--c-text-primary)" }}>{tier.name}</p>
                        <p className="text-[11px]" style={{ color: "var(--c-text-muted)" }}>
                          {tier.stamps === 0 ? "Starting tier" : `Unlocks at ${tier.stamps} stamps`}
                        </p>
                      </div>
                    </div>
                    {isCurrent && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "var(--c-sage-light)", color: "var(--c-sage)" }}>Current</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1.5 mt-2">
                    {tier.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 flex-shrink-0 mt-0.5"
                          style={{ color: isUnlocked ? "var(--c-sage)" : "var(--c-text-muted)" }} />
                        <p className="text-[11px]"
                          style={{ color: isUnlocked ? "var(--c-text-secondary)" : "var(--c-text-muted)" }}>{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
