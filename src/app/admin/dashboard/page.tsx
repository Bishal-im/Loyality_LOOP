"use client";

import React, { useState } from "react";
import {
  Calendar,
  RefreshCw,
  Users,
  UserPlus,
  RotateCcw,
  Gift,
  ArrowUpRight,
  TrendingUp,
  Clock
} from "lucide-react";
import { MOCK_CUSTOMERS } from "@/lib/mock-data";

export default function AdminDashboardPage() {
  const [period, setPeriod] = useState("Today");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const periods = ["Today", "Yesterday", "Last 7 Days", "This Month"];

  return (
    <div className="flex flex-col w-full gap-6">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs text-[#6E6E73] mt-0.5">
            Today's overview
          </p>
        </div>

        {/* Date/Period Selector Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="relative inline-block text-left">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[#1C1C1E] shadow-sm hover:bg-[#F2F2F5] transition-colors text-xs font-semibold border border-[#E4E4E7]"
              type="button"
            >
              <Calendar className="w-3.5 h-3.5 text-[#6E6E73]" />
              <span>{period}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-44 rounded-xl bg-white shadow-md z-40 py-1 text-xs border border-[#E4E4E7]">
                {periods.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPeriod(p);
                      setDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#F2F2F5] flex items-center justify-between ${
                      period === p ? "text-[#1C7C54] font-semibold" : "text-[#1C1C1E]"
                    }`}
                  >
                    <span>{p}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => alert("Refreshed data")}
            className="p-1.5 w-8 h-8 rounded-full bg-white text-[#6E6E73] hover:text-[#1C1C1E] shadow-sm flex items-center justify-center border border-[#E4E4E7] transition-colors"
            title="Refresh Live Data"
            type="button"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Metric Row (4 Compact KPI Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4E4E7] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
              Total Customers
            </span>
            <Users className="w-4 h-4 text-[#6E6E73]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1C1C1E]">1,248</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-[#1C7C54] font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+32 this month</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4E4E7] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
              New Customers
            </span>
            <UserPlus className="w-4 h-4 text-[#6E6E73]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1C1C1E]">17</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-[#1C7C54] font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+4 vs yesterday</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4E4E7] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
              Returning Customers
            </span>
            <RotateCcw className="w-4 h-4 text-[#6E6E73]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1C1C1E]">84</span>
          </div>
          <div className="mt-3 text-xs text-[#6E6E73]">
            68% of today's visits
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4E4E7] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
              Rewards Redeemed
            </span>
            <Gift className="w-4 h-4 text-[#6E6E73]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#1C1C1E]">12</span>
          </div>
          <div className="mt-3 text-xs text-[#6E6E73] truncate">
            Free Veg Momo (8), NPR 500 (4)
          </div>
        </div>
      </div>

      {/* 3. Main Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
        {/* Recent Visits / Customer Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-[#E4E4E7]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-semibold text-[#1C1C1E]">
              Recent Customer Visits
            </h2>
            <span className="text-xs text-[#1C7C54] font-medium cursor-pointer">
              View All
            </span>
          </div>
          <div className="divide-y divide-[#E4E4E7]">
            {MOCK_CUSTOMERS.map((cust) => (
              <div
                key={cust.id}
                className="py-3 flex items-center justify-between hover:bg-[#F2F2F5] px-2 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#1C7C54]/10 text-[#1C7C54] flex items-center justify-center font-bold text-sm">
                    {cust.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#1C1C1E]">
                      {cust.name}
                    </h3>
                    <p className="text-[11px] text-[#6E6E73]">{cust.phone}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#1C7C54]/10 text-[#1C7C54] text-[10px] font-semibold">
                    {cust.currentStamps}/{cust.maxStamps} Stamps
                  </span>
                  <p className="text-[11px] text-[#6E6E73] mt-0.5">
                    {cust.lastVisit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Insights Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E4E4E7] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-[#1C7C54]" />
              <h2 className="text-base font-semibold text-[#1C1C1E]">
                Peak Hours Today
              </h2>
            </div>
            <p className="text-xs text-[#6E6E73] leading-relaxed mb-4">
              Highest visit volume recorded between 12:00 PM - 2:30 PM.
            </p>
            <div className="space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-[#6E6E73]">12:00 PM - 1:00 PM</span>
                <span className="font-semibold text-[#1C1C1E]">34 visits</span>
              </div>
              <div className="w-full bg-[#F2F2F5] rounded-full h-2">
                <div className="bg-[#1C7C54] h-2 rounded-full w-[80%]" />
              </div>

              <div className="flex justify-between text-xs pt-1">
                <span className="text-[#6E6E73]">1:00 PM - 2:00 PM</span>
                <span className="font-semibold text-[#1C1C1E]">42 visits</span>
              </div>
              <div className="w-full bg-[#F2F2F5] rounded-full h-2">
                <div className="bg-[#1C7C54] h-2 rounded-full w-[95%]" />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E4E4E7] mt-6">
            <button
              onClick={() => alert("Redirecting to Campaigns")}
              className="w-full py-2.5 px-4 rounded-xl bg-[#1C7C54] hover:bg-[#16603F] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Launch Quick Campaign</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
