"use client";

import React, { useState } from "react";
import {
  Calendar,
  RefreshCw,
  Users,
  UserPlus,
  RotateCcw,
  Gift,
  TrendingUp,
  CheckCircle2,
  Mail,
  Send,
  AlertCircle
} from "lucide-react";

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState("Today");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sentReminders, setSentReminders] = useState<{ [key: number]: boolean }>({});
  const [allSent, setAllSent] = useState(false);

  const periods = ["Today", "Yesterday", "Last 7 Days", "This Month"];

  const overdueCustomers = [
    {
      id: 1,
      name: "Rahul Thapa",
      initials: "RT",
      avatarBg: "bg-[#173F35] text-white",
      cadence: "Normally visits every 8 days",
      visits: "8 total visits",
      favorite: "Favorite: Cold Brew & Veg Momo",
      daysOverdue: "19 days since last visit",
    },
    {
      id: 2,
      name: "Sita Maya",
      initials: "SM",
      avatarBg: "bg-[#E4E2DD] text-[#1D2925]",
      cadence: "Normally visits every 5 days",
      visits: "14 total visits",
      favorite: "Favorite: Masala Chai & Croissant",
      daysOverdue: "14 days since last visit",
    },
    {
      id: 3,
      name: "Aarav Khan",
      initials: "AK",
      avatarBg: "bg-[#002920] text-white",
      cadence: "Normally visits every 7 days",
      visits: "6 total visits",
      favorite: "Favorite: Flat White",
      daysOverdue: "16 days since last visit",
    },
    {
      id: 4,
      name: "Pooja Sharma",
      initials: "PS",
      avatarBg: "bg-[#E4E2DD] text-[#1D2925]",
      cadence: "Normally visits every 10 days",
      visits: "11 total visits",
      favorite: "Favorite: Americano & Lemon Cake",
      daysOverdue: "23 days since last visit",
    },
  ];

  const handleSendReminder = (id: number) => {
    setSentReminders((prev) => ({ ...prev, [id]: true }));
  };

  const handleSendAll = () => {
    setAllSent(true);
    const updated: { [key: number]: boolean } = {};
    overdueCustomers.forEach((c) => (updated[c.id] = true));
    setSentReminders(updated);
  };

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-6">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-display font-medium text-[#1D2925] tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs font-normal text-[#718078] mt-1">Today's overview</p>
        </div>

        {/* Date/Period Selector Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="relative inline-block text-left">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white text-[#1D2925] shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:bg-[#F8F6F1] transition-colors text-xs font-medium border border-[#E4E2DD]"
              type="button"
            >
              <Calendar className="w-4 h-4 text-[#718078]" />
              <span>{period}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white shadow-md z-40 py-1 text-xs border border-[#E4E2DD]">
                {periods.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPeriod(p);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 hover:bg-[#F8F6F1] flex items-center justify-between ${
                      period === p
                        ? "text-[#173F35] font-semibold"
                        : "text-[#1D2925] font-normal"
                    }`}
                  >
                    <span>{p}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => alert("Refreshed live data")}
            className="p-2 w-9 h-9 rounded-full bg-white text-[#718078] hover:text-[#1D2925] shadow-[0_1px_3px_rgba(0,0,0,0.04)] flex items-center justify-center border border-[#E4E2DD] transition-colors"
            title="Refresh Live Data"
            type="button"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Metric Row (4 Uniform KPI Cards with 28px bold figures) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {/* Metric 1: Total Customers */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E4E2DD] flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-[#718078] uppercase tracking-wider">
              Total Customers
            </span>
            <Users className="w-4 h-4 text-[#718078]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-bold text-[#1D2925] leading-tight">
              1,248
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[#173F35]">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#173F35]/10">
              <TrendingUp className="w-3 h-3 mr-1" />
              +32 this month
            </span>
          </div>
        </div>

        {/* Metric 2: New Customers */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E4E2DD] flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-[#718078] uppercase tracking-wider">
              New Customers
            </span>
            <UserPlus className="w-4 h-4 text-[#718078]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-bold text-[#1D2925] leading-tight">
              17
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs font-medium text-[#173F35]">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#173F35]/10">
              <TrendingUp className="w-3 h-3 mr-1" />
              +4 vs yesterday
            </span>
          </div>
        </div>

        {/* Metric 3: Returning Customers */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E4E2DD] flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-[#718078] uppercase tracking-wider">
              Returning Customers
            </span>
            <RotateCcw className="w-4 h-4 text-[#718078]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-bold text-[#1D2925] leading-tight">
              84
            </span>
          </div>
          <div className="mt-3 text-xs text-[#718078] font-normal">
            68% of today's visits
          </div>
        </div>

        {/* Metric 4: Rewards Redeemed */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E4E2DD] flex flex-col justify-between min-h-[110px]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-[#718078] uppercase tracking-wider">
              Rewards Redeemed
            </span>
            <Gift className="w-4 h-4 text-[#718078]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-bold text-[#1D2925] leading-tight">
              12
            </span>
          </div>
          <div className="mt-3 text-xs text-[#718078] font-normal truncate">
            Free Veg Momo (8), NPR 500 (4)
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Repeat Rate Card */}
      <div className="w-full">
        <div className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E4E2DD] flex flex-col justify-between w-full">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-base font-semibold text-[#1D2925]">
                Repeat Rate
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#173F35]/10 text-[#173F35] text-xs font-semibold">
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                +4.2%
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-[28px] font-bold text-[#1D2925] leading-none">
                68%
              </span>
              <span className="text-xs text-[#718078] font-medium">cohort retention</span>
            </div>

            {/* Progress Bar & Benchmark Scale */}
            <div className="mt-5">
              <div className="w-full bg-[#F8F6F1] rounded-full h-3 overflow-hidden flex">
                <div
                  className="bg-[#173F35] h-full rounded-full transition-all duration-700"
                  style={{ width: "68%" }}
                />
              </div>
              <div className="relative w-full mt-2 h-4 text-[#718078] text-[10px] font-medium">
                <div className="absolute left-0">0%</div>
                <div className="absolute left-[55%] -translate-x-1/2 flex flex-col items-center">
                  <span className="w-0.5 h-1.5 bg-[#E4E2DD] mb-0.5" />
                  <span>55% Target</span>
                </div>
                <div className="absolute right-0">100%</div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 bg-[#F5F3EE] rounded-xl p-4 flex items-start gap-3 border border-[#E4E2DD]">
            <CheckCircle2 className="w-5 h-5 text-[#173F35] mt-0.5 flex-shrink-0" />
            <div className="flex flex-col text-xs">
              <span className="font-semibold text-[#1D2925]">
                Healthy café benchmark exceeded
              </span>
              <span className="text-[#718078] mt-0.5 font-normal leading-relaxed">
                Target threshold is &gt;55%. Your retention engine is outperforming
                regional specialty cafés by 13 percentage points.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Centerpiece Section: Customers to Bring Back */}
      <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E4E2DD] flex flex-col overflow-hidden w-full">
        {/* Header of Table Card */}
        <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E4E2DD]">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-[#1D2925]">
                Customers to Bring Back
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#C25953]/10 text-[#C25953] text-xs font-semibold">
                4 overdue
              </span>
            </div>
            <p className="text-xs text-[#718078] mt-1 font-normal">
              Customers overdue for their usual visit cadence based on lifetime purchase patterns
            </p>
          </div>

          {/* Batch Action Button */}
          <button
            onClick={handleSendAll}
            disabled={allSent}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#173F35] hover:bg-[#002920] disabled:opacity-60 text-white transition-colors text-xs font-semibold shadow-xs whitespace-nowrap"
            type="button"
          >
            <Mail className="w-4 h-4" />
            <span>{allSent ? "All Reminders Sent" : "Send All Reminders (4)"}</span>
          </button>
        </div>

        {/* Customer Rows List (min 56px height per row, 16px cell padding) */}
        <div className="divide-y divide-[#E4E2DD]">
          {overdueCustomers.map((cust) => (
            <div
              key={cust.id}
              className="px-6 py-4 min-h-[56px] hover:bg-[#F5F3EE] transition-colors flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`w-10 h-10 rounded-full ${cust.avatarBg} flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-xs`}
                >
                  {cust.initials}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-[#1D2925] truncate">
                    {cust.name}
                  </span>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#718078] mt-0.5 font-normal">
                    <span>{cust.cadence}</span>
                    <span>•</span>
                    <span>{cust.visits}</span>
                    <span>•</span>
                    <span className="font-medium text-[#1D2925]">
                      {cust.favorite}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-4 flex-shrink-0">
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C25953]/10 text-[#C25953] text-xs font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{cust.daysOverdue}</span>
                </div>

                <button
                  onClick={() => handleSendReminder(cust.id)}
                  disabled={sentReminders[cust.id]}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#E4E2DD] text-[#1D2925] hover:bg-[#F8F6F1] hover:text-[#173F35] disabled:opacity-60 transition-colors text-xs font-medium shadow-xs whitespace-nowrap"
                  type="button"
                >
                  <Send className="w-3.5 h-3.5 text-[#718078] group-hover:text-[#173F35]" />
                  <span>{sentReminders[cust.id] ? "Sent" : "Send Reminder"}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Card Footer */}
        <div className="px-6 py-4 bg-[#F5F3EE] border-t border-[#E4E2DD] flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-[#718078] gap-2 font-normal">
          <span>
            Reminders are personalized automatically via SMS with guest preferred beverage notes.
          </span>
        </div>
      </div>
    </div>
  );
}

