"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Hourglass } from "lucide-react";
import { MOCK_REWARDS } from "@/lib/mock-data";

export default function RedeemRewardPage({
  params,
}: {
  params: Promise<{ rewardId: string }>;
}) {
  const resolvedParams = React.use(params);
  const reward =
    MOCK_REWARDS.find((item) => item.id === resolvedParams.rewardId) ??
    MOCK_REWARDS[0];

  return (
    <div className="min-h-[100dvh] bg-bg text-text-primary flex flex-col">
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md md:max-w-lg lg:max-w-xl z-[40] bg-surface/80 backdrop-blur-xl border-b border-border px-5 h-14 flex items-center justify-between">
        <Link
          href="/rewards"
          className="text-text-secondary hover:text-text-primary btn-press"
          aria-label="Back to rewards"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="font-sans text-sm font-semibold">Redeem reward</h1>
        <div className="w-5 h-5" />
      </header>

      <main id="main" className="flex-1 w-full max-w-md md:max-w-lg lg:max-w-xl mx-auto pt-20 px-5 pb-10">
        <article className="pass-card p-6 foil-trim text-center">
          <p className="label-over">ABC Café atelier pass</p>
          <h2 className="font-display text-[26px] font-medium mt-3 text-balance">
            {reward.title}
          </h2>
          <p className="text-sm text-text-secondary mt-2 leading-relaxed">
            Present this token to your barista when placing your order.
          </p>

          <div className="mt-6 mx-auto w-40 h-40 rounded-[1.25rem] bg-surface-inset border border-border flex items-center justify-center">
            <div className="grid grid-cols-5 gap-1.5">
              {Array.from({ length: 25 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-3 h-3 ${
                    [0, 4, 20, 24, 6, 8, 12, 16, 18].includes(i)
                      ? "bg-primary"
                      : "bg-sage/25"
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="mt-5 tabular font-display text-lg tracking-[0.18em]">
            #ABC-7749-X
          </p>
          <p className="mt-1 text-[11px] text-text-secondary font-mono">
            ID: {resolvedParams.rewardId}
          </p>

          <p className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-gold-ink">
            <Hourglass className="w-3.5 h-3.5" />
            Pass expires in 14:59
          </p>
        </article>

        <p className="mt-6 text-center text-xs text-text-secondary leading-relaxed">
          {reward.description} · {reward.stampsRequired} stamps · expires{" "}
          {reward.expiryDays} days after unlock
        </p>
      </main>
    </div>
  );
}
