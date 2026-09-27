"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Send,
  Edit,
  Repeat,
  Calendar,
  Clock,
  Award,
  Check,
  Lock,
  Utensils,
  Store,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { MOCK_CUSTOMERS } from "@/lib/mock-data";

export default function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const customer =
    MOCK_CUSTOMERS.find((c) => c.id === resolvedParams.id) || {
      id: "UID-94821",
      name: "Rahul Thapa",
      phone: "+977 984-129384",
      email: "rahul.thapa@gmail.com",
      joinedDate: "Aug 1, 2024",
      totalVisits: 8,
      currentStamps: 6,
      maxStamps: 7,
      rewardsEarned: 1,
      lastVisit: "Sep 17, 2024",
      status: "At Risk" as const,
    };

  const [reminderSent, setReminderSent] = useState(false);

  const handleSendReminder = () => {
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 3000);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto gap-6">
      {/* 1. Top Navigation / Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/customers"
          className="inline-flex items-center gap-1.5 text-xs text-[#6E6E73] hover:text-[#1C1C1E] font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Customers</span>
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-[#6E6E73]">
          <span>CLIENT IDENTIFIER:</span>
          <span className="font-mono text-[#1C1C1E] px-2 py-0.5 bg-white border border-[#E4E4E7] rounded-lg">
            {customer.id.toUpperCase()}
          </span>
        </div>
      </div>

      {/* 2. Profile Header Card */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#E4E4E7] p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 min-w-0">
          {/* Initials Avatar */}
          <div className="w-16 h-16 rounded-full bg-[#1C7C54]/10 text-[#1C7C54] flex items-center justify-center text-xl font-bold flex-shrink-0">
            {customer.name.split(" ").map((n) => n[0]).join("")}
          </div>

          {/* Customer Information */}
          <div className="flex flex-col min-w-0 gap-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight">
                {customer.name}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E15554]/10 text-[#E15554] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E15554]" />
                {customer.status}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E6E73]">
              <span>{customer.phone}</span>
              <span>•</span>
              <span>{customer.email}</span>
              <span>•</span>
              <span>Customer since {customer.joinedDate}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto self-end md:self-center">
          <button
            onClick={handleSendReminder}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#F2F2F5] hover:bg-[#E4E4E7] text-[#1C1C1E] rounded-xl text-xs font-semibold transition-colors border border-[#E4E4E7]"
            type="button"
          >
            <Send className="w-4 h-4 text-[#1C7C54]" />
            <span>{reminderSent ? "Notification Queued" : "Send Reminder"}</span>
          </button>
          <button
            onClick={() => alert("Edit details modal")}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#F2F2F5] hover:bg-[#E4E4E7] text-[#1C1C1E] rounded-xl text-xs font-semibold transition-colors border border-[#E4E4E7]"
            type="button"
          >
            <Edit className="w-4 h-4 text-[#6E6E73]" />
            <span>Edit Details</span>
          </button>
        </div>
      </section>

      {/* 3. Metric Stats Row */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1: Total Visits */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4E4E7] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
              TOTAL VISITS
            </span>
            <Repeat className="w-4 h-4 text-[#6E6E73]" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-[#1C1C1E]">
              {customer.totalVisits}
            </span>
            <p className="text-xs text-[#6E6E73] mt-0.5">Lifetime check-ins</p>
          </div>
        </div>

        {/* Stat 2: First Visit */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4E4E7] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
              FIRST VISIT
            </span>
            <Calendar className="w-4 h-4 text-[#6E6E73]" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-[#1C1C1E]">Aug 1</span>
            <p className="text-xs text-[#6E6E73] mt-0.5">2024 (47 days ago)</p>
          </div>
        </div>

        {/* Stat 3: Last Visit */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4E4E7] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
              LAST VISIT
            </span>
            <Clock className="w-4 h-4 text-[#E15554]" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-[#1C1C1E]">Sep 17</span>
            <p className="text-xs font-semibold text-[#E15554] mt-0.5">
              2024 (12 days idle)
            </p>
          </div>
        </div>

        {/* Stat 4: Rewards Earned */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4E4E7] flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
              REWARDS EARNED
            </span>
            <Award className="w-4 h-4 text-[#1C7C54]" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-bold text-[#1C1C1E]">
              {customer.rewardsEarned}
            </span>
            <p className="text-xs text-[#6E6E73] mt-0.5">Free Veg Momo claimed</p>
          </div>
        </div>
      </section>

      {/* 4. Two-Column Operational Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: Loyalty Progress */}
        <section className="lg:col-span-6 bg-white rounded-2xl shadow-sm border border-[#E4E4E7] p-6 flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-[#1C1C1E]">
                Loyalty Progress
              </h2>
              <p className="text-xs text-[#6E6E73] mt-0.5">
                Customer-facing stamp card mirror in ABC Café App
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#1C7C54]/10 text-[#1C7C54] text-[10px] uppercase font-bold tracking-wider">
              LIVE STAMP MIRROR
            </span>
          </div>

          {/* Stamp Card Preview Canvas */}
          <div className="rounded-2xl bg-[#F2F2F5] p-5 flex flex-col gap-5 border border-[#E4E4E7]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold text-[#6E6E73] uppercase tracking-wider">
                  TARGET REWARD
                </span>
                <h3 className="text-lg font-bold text-[#1C1C1E] mt-0.5">
                  Free Veg Momo
                </h3>
                <p className="text-xs text-[#6E6E73]">
                  7 customer check-ins required for unlock
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#1C7C54]">
                <Utensils className="w-5 h-5" />
              </div>
            </div>

            {/* Visual Stamp Grid */}
            <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E4E7]">
              <div className="flex items-center justify-between gap-1 py-2 px-1">
                {/* Stamps 1 through 5 (Completed) */}
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="flex flex-col items-center gap-1.5">
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#1C7C54] text-white flex items-center justify-center shadow-sm">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span className="text-[11px] text-[#6E6E73]">#{num}</span>
                  </div>
                ))}

                {/* Stamp 6: Active Halo Ring */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#1C7C54] text-white flex items-center justify-center shadow-md ring-4 ring-[#1C7C54]/30">
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                  <span className="text-[11px] text-[#1C7C54] font-bold">#6</span>
                </div>

                {/* Stamp 7: Locked */}
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#F2F2F5] text-[#6E6E73] flex items-center justify-center border border-[#E4E4E7]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] text-[#6E6E73]">#7</span>
                </div>
              </div>

              {/* Progress Bar Info */}
              <div className="mt-4 pt-3 bg-[#F2F2F5] rounded-xl px-4 py-2.5 flex items-center justify-between border border-[#E4E4E7]">
                <div className="flex items-center gap-1.5 text-[#1C7C54] font-semibold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>1 more visit to unlock reward</span>
                </div>
                <span className="text-xs text-[#6E6E73] font-medium">
                  85.7% Complete
                </span>
              </div>
            </div>

            {/* History Micro-Card */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white shadow-sm border border-[#E4E4E7]">
              <div className="w-8 h-8 rounded-full bg-[#1C7C54]/10 text-[#1C7C54] flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[#1C1C1E]">
                  Reward History Claimed
                </span>
                <span className="text-[11px] text-[#6E6E73] truncate">
                  1x Free Veg Momo successfully redeemed on Aug 27, 2024
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Activity History */}
        <section className="lg:col-span-6 bg-white rounded-2xl shadow-sm border border-[#E4E4E7] p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#1C1C1E]">
                Activity History
              </h2>
              <p className="text-xs text-[#6E6E73] mt-0.5">
                Chronological POS check-in logs
              </p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#F2F2F5] text-[#1C1C1E] text-xs font-medium">
              5 Logged Visits
            </span>
          </div>

          {/* Activity Items List */}
          <div className="flex flex-col gap-2">
            {[
              { date: "Sep 17, 2024 · 2:45 PM", type: "+1 visit", isRedeemed: false },
              { date: "Sep 10, 2024 · 1:15 PM", type: "+1 visit", isRedeemed: false },
              { date: "Sep 03, 2024 · 6:30 PM", type: "+1 visit", isRedeemed: false },
              { date: "Aug 27, 2024 · 7:10 PM", type: "+1 visit", isRedeemed: true, label: "Redeemed" },
              { date: "Aug 20, 2024 · 12:40 PM", type: "+1 visit", isRedeemed: false },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3.5 rounded-xl bg-[#F2F2F5] hover:bg-[#E4E4E7] transition-colors border border-[#E4E4E7]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-lg ${
                      item.isRedeemed
                        ? "bg-[#1C7C54] text-white"
                        : "bg-white text-[#6E6E73]"
                    } flex items-center justify-center flex-shrink-0 shadow-sm`}
                  >
                    {item.isRedeemed ? (
                      <Award className="w-4 h-4" />
                    ) : (
                      <Store className="w-4 h-4" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-semibold text-[#1C1C1E] whitespace-nowrap">
                      {item.date}
                    </span>
                    {item.isRedeemed && (
                      <span className="px-2 py-0.5 rounded-full bg-[#1C7C54]/10 text-[#1C7C54] text-[10px] font-semibold">
                        Redeemed
                      </span>
                    )}
                  </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#1C7C54]/10 text-[#1C7C54] text-xs font-semibold">
                  {item.type}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#E4E4E7]">
            <span className="text-xs text-[#6E6E73]">
              Showing last 5 of 8 recorded visits
            </span>
            <button
              onClick={() => alert("Viewing all check-ins")}
              className="text-xs font-semibold text-[#1C7C54] hover:underline flex items-center gap-1"
              type="button"
            >
              <span>View All Check-ins</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
