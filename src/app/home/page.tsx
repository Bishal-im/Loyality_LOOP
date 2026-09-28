"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Coffee, Lock, QrCode } from "lucide-react";
import { CustomerShell } from "@/components/customer/CustomerShell";
import { StampWells } from "@/components/customer/StampWells";
import { StampProgressModal } from "@/components/customer/StampProgressModal";
import { RewardUnlockedModal } from "@/components/customer/RewardUnlockedModal";

export default function HomePage() {
  const [showStampModal, setShowStampModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);

  return (
    <CustomerShell title="Home">
      <section className="pt-5 pb-2">
        <p className="label-over">Active patron</p>
        <h2 className="font-display text-[28px] font-medium tracking-tight text-balance mt-1">
          Good afternoon, Rahul
        </h2>
        <p className="text-sm text-text-secondary mt-1">
          Welcome to ABC Café · Downtown Roastery
        </p>
      </section>

      <div className="mt-4 foil-trim rounded-full px-4 py-2.5 bg-gold/10 text-sm text-gold-ink">
        Double stamp weekend starting this Friday
      </div>

      <article className="pass-card mt-5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="label-over">Loyalty passport</p>
            <h3 className="font-display text-xl font-medium mt-1">ABC Café</h3>
            <p className="text-xs text-text-secondary mt-0.5">Gold Patron · #AG-8829</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-gold/15 text-gold-ink text-[11px] font-semibold border border-gold/30">
            Gold
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between">
          <p className="text-xs font-semibold text-text-secondary">Stamp progression</p>
          <p className="tabular font-display text-lg font-medium">7 / 10</p>
        </div>

        <div className="mt-4">
          <StampWells filled={7} total={10} milestoneIndex={9} />
        </div>

        <button
          type="button"
          onClick={() => setShowStampModal(true)}
          className="mt-6 w-full h-12 rounded-full bg-primary text-bg text-sm font-semibold flex items-center justify-center gap-2 btn-press shadow-[0_4px_12px_rgba(23,63,53,0.2)]"
        >
          <QrCode className="w-4 h-4" />
          Check in at the counter
        </button>
      </article>

      <article className="paper-card mt-4 p-4 flex gap-3">
        <div className="w-10 h-10 rounded-xl bg-surface-inset text-sage flex items-center justify-center shrink-0">
          <Coffee className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs font-semibold text-text-primary">Verification in progress</p>
          <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
            Waiting for ABC Café downtown counter staff to approve this visit.
          </p>
        </div>
      </article>

      <article className="paper-card mt-4 p-4 opacity-80">
        <div className="flex items-center justify-between">
          <p className="label-over">Next milestone</p>
          <Lock className="w-3.5 h-3.5 text-sage" />
        </div>
        <p className="font-display text-lg font-medium mt-2">
          Any tartine with fresh seasonal juice
        </p>
        <p className="text-xs text-text-secondary mt-1">Unlocked at 15 stamps</p>
      </article>

      <section className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-display text-lg font-medium">Recent visit</h3>
          <Link href="/activity" className="text-xs font-semibold text-primary">
            Ledger
          </Link>
        </div>
        <div className="paper-card px-4 py-3.5 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold">Downtown Roastery</p>
            <p className="text-xs text-text-secondary mt-0.5">Yesterday, 9:42 AM</p>
          </div>
          <span className="tabular text-sm font-semibold text-success">+1 stamp</span>
        </div>
      </section>

      <details className="mt-8 paper-card p-4">
        <summary className="text-xs font-semibold text-text-secondary cursor-pointer select-none">
          Preview overlay components
        </summary>
        <div className="flex flex-col gap-2 mt-3">
          <button
            onClick={() => setShowStampModal(true)}
            className="w-full py-2.5 px-4 rounded-full bg-primary text-bg text-xs font-semibold btn-press"
            type="button"
          >
            Test +1 Visit Stamp Overlay
          </button>
          <button
            onClick={() => setShowRewardModal(true)}
            className="w-full py-2.5 px-4 rounded-full bg-gold text-primary text-xs font-semibold btn-press"
            type="button"
          >
            Test Reward Unlocked Overlay
          </button>
        </div>
      </details>

      <StampProgressModal
        isOpen={showStampModal}
        onClose={() => setShowStampModal(false)}
      />

      <RewardUnlockedModal
        isOpen={showRewardModal}
        onClose={() => setShowRewardModal(false)}
      />
    </CustomerShell>
  );
}
