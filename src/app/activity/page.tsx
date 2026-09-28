"use client";

import React from "react";
import { CheckCircle2, Store, Gift, Coffee } from "lucide-react";
import { CustomerShell } from "@/components/customer/CustomerShell";

const entries = [
  {
    id: "a1",
    icon: Store,
    title: "Downtown Roastery",
    meta: "Today, 12:32 PM · Approved by staff (Order #4912)",
    amount: "+1 stamp",
    tone: "credit" as const,
    note: "Pass status: 7/10 stamped · 3 to reward",
  },
  {
    id: "a2",
    icon: Gift,
    title: "Artisan croissant & batch brew",
    meta: "22 Sep, 4:15 PM",
    amount: "−10 stamps",
    tone: "debit" as const,
    note: "Successfully redeemed",
  },
  {
    id: "a3",
    icon: Coffee,
    title: "Weekend artisan special",
    meta: "20 Sep, 1:08 PM · Approved by barista Sarah",
    amount: "+2 stamps",
    tone: "credit" as const,
    note: "Pass status: 6/10 stamped · Order #4790",
  },
  {
    id: "a4",
    icon: CheckCircle2,
    title: "Stamp approved",
    meta: "14 Sep, 9:45 AM · Self-check verification",
    amount: "+1 stamp",
    tone: "credit" as const,
    note: "Downtown Roastery",
  },
];

export default function ActivityPage() {
  return (
    <CustomerShell title="Activity">
      <section className="pt-5 pb-2">
        <h2 className="font-display text-[28px] font-medium tracking-tight">
          Activity ledger
        </h2>
        <p className="text-sm text-text-secondary mt-1 max-w-[38ch]">
          Record of your stamps, visits, and redeemed treats.
        </p>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="paper-card p-4">
          <p className="label-over">Visits</p>
          <p className="tabular font-display text-[28px] font-medium mt-1">24</p>
        </div>
        <div className="paper-card p-4">
          <p className="label-over">Stamps</p>
          <p className="tabular font-display text-[28px] font-medium mt-1">38</p>
        </div>
      </div>

      <ol className="mt-6 paper-card divide-y divide-border overflow-hidden">
        {entries.map((entry) => {
          const Icon = entry.icon;
          return (
            <li key={entry.id} className="px-4 py-4 flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-surface-inset text-sage flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold">{entry.title}</p>
                  <span
                    className={`tabular text-sm font-semibold shrink-0 ${
                      entry.tone === "credit" ? "text-success" : "text-text-primary"
                    }`}
                  >
                    {entry.amount}
                  </span>
                </div>
                <p className="text-xs text-text-secondary mt-0.5">{entry.meta}</p>
                <p className="text-xs text-text-secondary mt-1">{entry.note}</p>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="mt-5 mb-2 text-center text-[11px] text-text-secondary">
        Showing the past 6 months of activity
      </p>
    </CustomerShell>
  );
}
