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
  AlertCircle,
  X,
} from "lucide-react";
import { DemoIndicator } from "@/components/admin/DemoIndicator";

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState("Today");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sentReminders, setSentReminders] = useState<{ [key: number]: boolean }>({});
  const [allSent, setAllSent] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState<number | "all" | null>(null);

  const periods = ["Today", "Yesterday", "Last 7 Days", "This Month"];

  const overdueCustomers = [
    {
      id: 1,
      name: "Rahul Thapa",
      initials: "RT",
      cadence: "Normally visits every 8 days",
      visits: "8 total visits",
      favorite: "Favorite: Cold Brew & Veg Momo",
      daysOverdue: "19 days since last visit",
    },
    {
      id: 2,
      name: "Sita Maya",
      initials: "SM",
      cadence: "Normally visits every 5 days",
      visits: "14 total visits",
      favorite: "Favorite: Masala Chai & Croissant",
      daysOverdue: "14 days since last visit",
    },
    {
      id: 3,
      name: "Aarav Khan",
      initials: "AK",
      cadence: "Normally visits every 7 days",
      visits: "6 total visits",
      favorite: "Favorite: Flat White",
      daysOverdue: "16 days since last visit",
    },
    {
      id: 4,
      name: "Pooja Sharma",
      initials: "PS",
      cadence: "Normally visits every 10 days",
      visits: "11 total visits",
      favorite: "Favorite: Americano & Lemon Cake",
      daysOverdue: "23 days since last visit",
    },
  ];

  const confirmSendReminder = (id: number | "all") => {
    if (id === "all") {
      setAllSent(true);
      const updated: { [key: number]: boolean } = {};
      overdueCustomers.forEach((c) => (updated[c.id] = true));
      setSentReminders(updated);
    } else {
      setSentReminders((prev) => ({ ...prev, [id]: true }));
    }
    setShowReminderModal(null);
  };

  const handleResetDemo = () => {
    setPeriod("Today");
    setSentReminders({});
    setAllSent(false);
    // Show brief feedback
    const button = document.activeElement as HTMLButtonElement;
    if (button) {
      const originalText = button.textContent;
      button.textContent = "✓ Reset";
      setTimeout(() => {
        button.textContent = originalText;
      }, 1000);
    }
  };

  const currentCustomer = showReminderModal && showReminderModal !== "all"
    ? overdueCustomers.find(c => c.id === showReminderModal)
    : null;

  return (
    <>
      <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-6">
        {/* 1. Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1 className="text-[24px] font-semibold text-[#18181B] tracking-tight leading-tight">
                Dashboard
              </h1>
              <DemoIndicator />
            </div>
            <p className="text-[14px] font-normal text-[#71717A] mt-0.5">Sample data overview</p>
          </div>

          {/* Date/Period Selector & Reset Demo Data */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="relative inline-block text-left">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#F4F4F5] text-[#18181B] hover:bg-[#E8EAED] active:bg-[#E5E5E5] transition-all text-xs font-medium border border-[#E5E5E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                type="button"
                aria-expanded={dropdownOpen}
              >
                <Calendar className="w-4 h-4 text-[#71717A]" strokeWidth={1.5} />
                <span>{period}</span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white shadow-lg z-40 py-1 text-xs border border-[#E5E5E5] [@starting-style]:opacity-0 [@starting-style]:scale-95 opacity-100 scale-100 transition-[opacity,transform] duration-150 ease-out origin-top-right">
                  {periods.map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setPeriod(p);
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 hover:bg-[#F4F4F5] transition-colors flex items-center justify-between ${
                        period === p
                          ? "text-[#18181B] font-semibold bg-[#F4F4F5]/60"
                          : "text-[#71717A] font-normal"
                      }`}
                    >
                      <span>{p}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={handleResetDemo}
              className="btn-press p-2 w-9 h-9 rounded-full bg-[#F4F4F5] text-[#71717A] hover:text-[#18181B] hover:bg-[#E8EAED] active:bg-[#E5E5E5] flex items-center justify-center border border-[#E5E5E5] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              title="Reset demo data to initial state"
              type="button"
              aria-label="Reset demo data"
            >
              <RefreshCw className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* 2. Metric Row (4 Uniform KPI Cards) */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {/* Metric 1: Total Customers */}
          <div className="bg-white rounded-[16px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#E5E5E5] flex flex-col justify-between min-h-[120px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-[1px] transition-all duration-150 ease-out">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.06em]">
                Total Customers
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#F4F4F5] border border-[#E5E5E5]/60 flex items-center justify-center text-[#71717A] shrink-0">
                <Users className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[28px] font-bold text-[#18181B] leading-tight tabular-nums">
                1,248
              </span>
            </div>
            <div className="mt-3 flex items-center gap-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] text-xs font-medium">
                <TrendingUp className="w-3 h-3 mr-1" strokeWidth={1.5} />
                +32 this month
              </span>
            </div>
          </div>

          {/* Metric 2: New Customers */}
          <div className="bg-white rounded-[16px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#E5E5E5] flex flex-col justify-between min-h-[120px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-[1px] transition-all duration-150 ease-out">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.06em]">
                New Customers
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#F4F4F5] border border-[#E5E5E5]/60 flex items-center justify-center text-[#71717A] shrink-0">
                <UserPlus className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[28px] font-bold text-[#18181B] leading-tight tabular-nums">
                17
              </span>
            </div>
            <div className="mt-3 flex items-center gap-1">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] text-xs font-medium">
                <TrendingUp className="w-3 h-3 mr-1" strokeWidth={1.5} />
                +4 vs yesterday
              </span>
            </div>
          </div>

          {/* Metric 3: Returning Customers */}
          <div className="bg-white rounded-[16px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#E5E5E5] flex flex-col justify-between min-h-[120px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-[1px] transition-all duration-150 ease-out">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.06em]">
                Returning Customers
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#F4F4F5] border border-[#E5E5E5]/60 flex items-center justify-center text-[#71717A] shrink-0">
                <RotateCcw className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[28px] font-bold text-[#18181B] leading-tight tabular-nums">
                84
              </span>
            </div>
            <div className="mt-3 text-xs text-[#71717A] font-normal">
              68% of today's visits
            </div>
          </div>

          {/* Metric 4: Rewards Redeemed */}
          <div className="bg-white rounded-[16px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#E5E5E5] flex flex-col justify-between min-h-[120px] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-[1px] transition-all duration-150 ease-out">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.06em]">
                Rewards Redeemed
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#F4F4F5] border border-[#E5E5E5]/60 flex items-center justify-center text-[#71717A] shrink-0">
                <Gift className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-[28px] font-bold text-[#18181B] leading-tight tabular-nums">
                12
              </span>
            </div>
            <div className="mt-3 text-xs text-[#71717A] font-normal truncate">
              Free Veg Momo (8), NPR 500 (4)
            </div>
          </div>
        </div>

        {/* 3. Middle Section: Repeat Rate Card */}
        <div className="w-full">
          <div className="bg-white rounded-[16px] p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#E5E5E5] flex flex-col justify-between w-full hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-[1px] transition-all duration-150 ease-out">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[15px] font-semibold text-[#18181B]">
                  Repeat Rate
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#E6F4EA] text-[#137333] text-xs font-semibold">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" strokeWidth={1.5} />
                  +4.2%
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-[28px] font-bold text-[#18181B] leading-none tabular-nums">
                  68%
                </span>
                <span className="text-xs text-[#71717A] font-normal">cohort retention</span>
              </div>

              {/* Progress Bar & Benchmark Scale */}
              <div className="mt-5">
                <div className="w-full bg-[#F4F4F5] border border-[#E5E5E5] rounded-full h-3 overflow-hidden flex p-0.5">
                  <div
                    className="bg-gradient-to-r from-[#1b8a4b] to-[#107C41] h-full rounded-full transition-all duration-700 shadow-xs"
                    style={{ width: "68%" }}
                  />
                </div>
                <div className="relative w-full mt-2 h-4 text-[#71717A] text-[10px] font-medium">
                  <div className="absolute left-0">0%</div>
                  <div className="absolute left-[55%] -translate-x-1/2 flex flex-col items-center">
                    <span className="w-0.5 h-1.5 bg-[#E5E5E5] mb-0.5" />
                    <span>55% Target</span>
                  </div>
                  <div className="absolute right-0">100%</div>
                </div>
              </div>
            </div>

            <div className="mt-5 bg-[#F4F4F5] rounded-[12px] p-4 flex items-start gap-3 border border-[#E5E5E5]">
              <CheckCircle2 className="w-5 h-5 text-[#137333] mt-0.5 shrink-0" strokeWidth={1.5} />
              <div className="flex flex-col text-[14px]">
                <span className="font-semibold text-[#18181B]">
                  Healthy café benchmark exceeded
                </span>
                <span className="text-[#71717A] mt-0.5 font-normal leading-relaxed">
                  Target threshold is &gt;55%. Your retention engine is outperforming
                  regional specialty cafés by 13 percentage points.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Centerpiece Section: Customers to Bring Back */}
        <div className="bg-white rounded-[16px] shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#E5E5E5] flex flex-col overflow-hidden w-full hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-[1px] transition-all duration-150 ease-out">
          {/* Header of Table Card */}
          <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#E5E5E5]">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[15px] font-semibold text-[#18181B]">
                  Customers to Bring Back
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FCE8E6] text-[#C5221F] text-xs font-semibold">
                  4 overdue
                </span>
              </div>
              <p className="text-[14px] text-[#71717A] mt-1 font-normal">
                Customers overdue for their usual visit cadence based on lifetime purchase patterns
              </p>
            </div>

            {/* Batch Action Button */}
            <button
              onClick={() => setShowReminderModal("all")}
              disabled={allSent}
              className="btn-press inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover active:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 text-white transition-all text-xs font-semibold shadow-xs whitespace-nowrap"
              type="button"
            >
              <Mail className={`w-4 h-4 transition-transform duration-200 ${allSent ? 'translate-x-8 opacity-0' : 'translate-x-0 opacity-100'}`} strokeWidth={1.5} />
              <CheckCircle2 className={`w-4 h-4 absolute transition-transform duration-200 ${allSent ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`} strokeWidth={1.5} />
              <span>{allSent ? "All SMS Sent" : "Send All SMS (4)"}</span>
            </button>
          </div>

          {/* Customer Rows List */}
          <div className="divide-y divide-[#E5E5E5]">
            {overdueCustomers.map((cust) => (
              <div
                key={cust.id}
                className="px-6 py-4 min-h-[56px] hover:bg-[#F4F4F5] transition-colors flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 group"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#27272A] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                    {cust.initials}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[14px] font-semibold text-[#18181B] truncate">
                      {cust.name}
                    </span>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#71717A] mt-0.5 font-normal">
                      <span>{cust.cadence}</span>
                      <span>•</span>
                      <span>{cust.visits}</span>
                      <span>•</span>
                      <span className="font-medium text-[#18181B]">
                        {cust.favorite}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-4 shrink-0">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FCE8E6] text-[#C5221F] text-xs font-semibold">
                    <AlertCircle className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{cust.daysOverdue}</span>
                  </div>

                  <button
                    onClick={() => setShowReminderModal(cust.id)}
                    disabled={sentReminders[cust.id]}
                    className="btn-press inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#18181B] hover:bg-[#E8EAED] active:bg-[#E5E5E5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 transition-all text-xs font-medium shadow-xs whitespace-nowrap"
                    type="button"
                  >
                    <Send className="w-3.5 h-3.5 text-[#71717A]" strokeWidth={1.5} />
                    <span>{sentReminders[cust.id] ? "SMS Sent" : "Send SMS"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Card Footer */}
          <div className="px-6 py-3.5 bg-[#F4F4F5] border-t border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs text-[#71717A] gap-2 font-normal">
            <span>
              In production, reminders would be personalized automatically via SMS with customer preferred items.
            </span>
          </div>
        </div>
      </div>

      {/* Send Reminder Confirmation Modal */}
      {showReminderModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-[70] backdrop-blur-sm"
            onClick={() => setShowReminderModal(null)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[440px] mx-4 bg-white rounded-2xl shadow-2xl border border-[#E5E5E5] z-[80] overflow-hidden">
            <div className="p-6 border-b border-[#E5E5E5] flex items-center justify-between">
              <h3 className="text-[16px] font-semibold text-[#18181B]">
                Send SMS Reminder — Demo Preview
              </h3>
              <button
                onClick={() => setShowReminderModal(null)}
                className="p-1.5 rounded-lg hover:bg-[#F4F4F5] btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 text-[#71717A]" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl bg-[#FFF4E8] border border-[#F2D9B0]">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-[#7A4F1E] mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#7A4F1E]">
                      Frontend Prototype Only
                    </p>
                    <p className="text-xs text-[#7A4F1E] mt-1 leading-relaxed">
                      This is a disconnected demo. No actual SMS will be sent.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-[#18181B]">
                  In production, this would send a personalized SMS to:
                </p>
                <div className="p-4 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5]">
                  <p className="text-sm font-semibold text-[#18181B] mb-2">
                    {showReminderModal === "all" ? "All 4 customers" : currentCustomer?.name}
                  </p>
                  <div className="text-xs text-[#71717A] leading-relaxed p-3 bg-white rounded-lg border border-[#E5E5E5] font-mono">
                    {showReminderModal === "all" ? (
                      <>Hi [Name], we miss you at ABC Café! Come visit soon. Your favorite {"{item}"} is waiting! 😊</>
                    ) : currentCustomer ? (
                      <>Hi {currentCustomer.name.split(' ')[0]}, we miss you at ABC Café! Come visit soon. Your favorite {currentCustomer.favorite.replace('Favorite: ', '')} is waiting! 😊</>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#F4F4F5] border-t border-[#E5E5E5] flex gap-3">
              <button
                onClick={() => setShowReminderModal(null)}
                className="btn-press flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#E5E5E5] text-[#18181B] hover:bg-[#E8EAED] font-medium text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmSendReminder(showReminderModal)}
                className="btn-press flex-1 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Mark as Sent (Demo)
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
