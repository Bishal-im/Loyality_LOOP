"use client";

import React, { use, useState } from "react";
import { Check, Lock, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/customer/PageShell";
import { useCustomer } from "@/lib/customer-store";

export default function RedeemPage({ params }: { params: Promise<{ rewardId: string }> }) {
  const { rewardId } = use(params);
  const router = useRouter();
  const { state, redeemReward } = useCustomer();
  const [confirmed, setConfirmed] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const reward = state.rewards.find(r => r.id === rewardId);
  const alreadyRedeemed = reward?.status === "locked" && reward?.redeemedAt;

  if (!reward) {
    return (
      <PageShell back backHref="/rewards" title="Redeem">
        <div className="flex flex-col items-center justify-center flex-1 py-16 gap-3">
          <Lock className="w-10 h-10" style={{ color: "var(--c-text-muted)" }} />
          <p className="text-[15px] font-semibold" style={{ color: "var(--c-text-primary)" }}>Reward not found</p>
          <button onClick={() => router.push("/rewards")}
            className="mt-2 px-6 py-2.5 rounded-xl text-white font-semibold text-[14px]"
            style={{ backgroundColor: "var(--c-terracotta)" }}>
            Back to Rewards
          </button>
        </div>
      </PageShell>
    );
  }

  if (reward.status === "locked" && !reward.redeemedAt) {
    return (
      <PageShell back backHref="/rewards" title="Redeem">
        <div className="flex flex-col items-center justify-center flex-1 py-16 gap-3">
          <Lock className="w-10 h-10" style={{ color: "var(--c-text-muted)" }} />
          <p className="text-[15px] font-semibold" style={{ color: "var(--c-text-primary)" }}>Reward Locked</p>
          <p className="text-[12px] text-center" style={{ color: "var(--c-text-secondary)" }}>
            You need {reward.stampsRequired} stamps to unlock this reward. Keep collecting!
          </p>
          <button onClick={() => router.push("/home")}
            className="mt-2 px-6 py-2.5 rounded-xl text-white font-semibold text-[14px]"
            style={{ backgroundColor: "var(--c-terracotta)" }}>
            Earn More Stamps
          </button>
        </div>
      </PageShell>
    );
  }

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      redeemReward(rewardId);
      setLoading(false);
      setConfirmed(true);
    }, 1200);
  };

  if (confirmed) {
    return (
      <PageShell back={false} title="Redeemed!">
        <div className="flex flex-col items-center justify-center flex-1 py-10 gap-4 px-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{ backgroundColor: "var(--c-sage-light)", boxShadow: "0 0 0 8px rgba(143,165,143,0.15)" }}>
            <Check className="w-10 h-10 stroke-[2.5]" style={{ color: "var(--c-sage)" }} />
          </div>
          <h2 className="text-[22px] font-bold text-center" style={{ color: "var(--c-text-primary)" }}>
            Reward Redeemed! 🎉
          </h2>
          <p className="text-[13px] text-center" style={{ color: "var(--c-text-secondary)" }}>
            {reward.title} has been successfully redeemed. Show this screen to staff.
          </p>
          <div className="w-full rounded-2xl border p-4 flex flex-col gap-2"
            style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}>
            <div className="flex justify-between">
              <span className="text-[12px]" style={{ color: "var(--c-text-secondary)" }}>Reward</span>
              <span className="text-[12px] font-semibold" style={{ color: "var(--c-text-primary)" }}>{reward.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[12px]" style={{ color: "var(--c-text-secondary)" }}>Status</span>
              <div className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5" style={{ color: "var(--c-sage)" }} />
                <span className="text-[12px] font-semibold" style={{ color: "var(--c-sage)" }}>Confirmed</span>
              </div>
            </div>
          </div>
          <button onClick={() => router.push("/rewards")}
            className="w-full py-3.5 rounded-xl text-white font-semibold text-[15px] mt-2"
            style={{ backgroundColor: "var(--c-terracotta)" }}>
            Back to Rewards
          </button>
          <button onClick={() => router.push("/activity")}
            className="text-[13px] font-semibold" style={{ color: "var(--c-text-secondary)" }}>
            View Activity →
          </button>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell back backHref="/rewards" title="Redeem Reward">
      <div className="flex flex-col gap-4 px-0">
        {/* Reward header */}
        <div className="rounded-2xl overflow-hidden border"
          style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}>
          <div className="w-full h-[140px] flex items-center justify-center text-5xl"
            style={{ background: "linear-gradient(160deg, #3D2410 0%, var(--c-gold) 100%)" }}>
            ☕
          </div>
          <div className="px-4 py-4">
            <span className="text-[9px] font-bold tracking-widest uppercase" style={{ color: "var(--c-text-muted)" }}>{reward.venueLabel}</span>
            <h2 className="text-[16px] font-bold mt-1" style={{ color: "var(--c-text-primary)" }}>{reward.title}</h2>
            <p className="text-[12px] mt-1" style={{ color: "var(--c-text-secondary)" }}>{reward.description}</p>
          </div>
        </div>

        {/* QR placeholder */}
        <div className="rounded-2xl border flex flex-col items-center py-8 gap-3"
          style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}>
          <QrCode className="w-16 h-16" style={{ color: "var(--c-espresso)" }} />
          <p className="text-[13px] font-semibold" style={{ color: "var(--c-text-primary)" }}>Show to Staff</p>
          <p className="text-[11px] text-center px-6" style={{ color: "var(--c-text-secondary)" }}>
            Present this QR code to your barista or tap "Confirm Redemption" for staff to verify manually.
          </p>
          {reward.validUntil && (
            <p className="text-[11px]" style={{ color: "var(--c-text-muted)" }}>Valid until {reward.validUntil}</p>
          )}
        </div>

        {/* Confirm button */}
        <button onClick={handleConfirm} disabled={loading}
          className="w-full py-4 rounded-2xl text-white font-semibold text-[15px] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ backgroundColor: loading ? "var(--c-text-muted)" : "var(--c-terracotta)" }}>
          {loading ? (
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
              <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <Check className="w-5 h-5" />
          )}
          {loading ? "Confirming…" : "Confirm Redemption"}
        </button>

        <p className="text-[11px] text-center" style={{ color: "var(--c-text-muted)" }}>
          This action cannot be undone. Reward will be marked as redeemed.
        </p>
      </div>
    </PageShell>
  );
}
