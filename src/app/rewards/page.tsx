"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Lock, Sparkles } from "lucide-react";
import { CustomerShell } from "@/components/customer/CustomerShell";
import { StampWells } from "@/components/customer/StampWells";
import { MOCK_REWARDS } from "@/lib/mock-data";

export default function RewardsPage() {
  const unlocked = MOCK_REWARDS.find((r) => r.id === "rew_03") ?? MOCK_REWARDS[2];
  const inProgress = MOCK_REWARDS.find((r) => r.id === "rew_01") ?? MOCK_REWARDS[0];
  const voucher = MOCK_REWARDS.find((r) => r.id === "rew_02") ?? MOCK_REWARDS[1];

  return (
    <CustomerShell title="Rewards">
      <section className="pt-5 pb-2">
        <h2 className="font-display text-[28px] font-medium tracking-tight text-balance">
          Your rewards
        </h2>
        <p className="text-sm text-text-secondary mt-1 max-w-[36ch]">
          Exchange earned loyalty stamps for curated artisan treats.
        </p>
      </section>

      <article className="pass-card mt-5 p-5 foil-trim">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold/15 text-gold-ink text-[11px] font-semibold">
            <Sparkles className="w-3 h-3" />
            Unlocked perk
          </span>
          <span className="label-over">{unlocked.stampsRequired} stamps</span>
        </div>
        <h3 className="font-display text-xl font-medium mt-4">{unlocked.title}</h3>
        <p className="text-sm text-text-secondary mt-1 leading-relaxed">
          {unlocked.description}
        </p>
        <p className="mt-3 flex items-center gap-1.5 text-xs text-text-secondary">
          <Calendar className="w-3.5 h-3.5" />
          Valid for {unlocked.expiryDays} days after unlock · Single-use
        </p>
        <Link
          href={`/redeem/${unlocked.id}`}
          className="mt-5 w-full h-12 rounded-full bg-gold text-primary text-sm font-semibold flex items-center justify-center btn-press"
        >
          Present pass
        </Link>
      </article>

      <article className="paper-card mt-4 p-5">
        <div className="flex items-center justify-between">
          <p className="label-over">In progress</p>
          <p className="tabular text-sm font-semibold">7 / {inProgress.stampsRequired}</p>
        </div>
        <h3 className="font-display text-lg font-medium mt-2">{inProgress.title}</h3>
        <p className="text-sm text-text-secondary mt-1">{inProgress.description}</p>
        <div className="mt-4">
          <StampWells
            filled={7}
            total={inProgress.stampsRequired}
            milestoneIndex={inProgress.stampsRequired - 1}
            size="sm"
          />
        </div>
        <p className="mt-3 text-xs font-semibold text-gold-ink">
          3 more stamps needed
        </p>
      </article>

      <article className="paper-card mt-4 p-5">
        <div className="flex items-center justify-between">
          <p className="label-over">Locked</p>
          <Lock className="w-3.5 h-3.5 text-sage" />
        </div>
        <h3 className="font-display text-lg font-medium mt-2">{voucher.title}</h3>
        <p className="text-sm text-text-secondary mt-1">{voucher.description}</p>
        <p className="mt-3 text-xs text-text-secondary">
          Card requirement: {voucher.stampsRequired} stamps
        </p>
      </article>
    </CustomerShell>
  );
}
