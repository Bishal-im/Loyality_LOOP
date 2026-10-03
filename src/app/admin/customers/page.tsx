"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, ChevronRight, SlidersHorizontal, Star, ArrowLeft, ArrowRight } from "lucide-react";

interface CustomerRecord {
  id: string;
  name: string;
  initials: string;
  phone: string;
  category: "all" | "new" | "regular" | "at-risk" | "vip";
  statusLabel: string;
  statusClass: string;
  firstVisit: string;
  lastVisit: string;
  totalVisits: number;
  rewardsEarned: number;
  isVipStar?: boolean;
}

export default function AdminCustomersPage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [activeSegment, setActiveSegment] = useState<"all" | "new" | "regular" | "at-risk" | "vip">("all");

  const customers: CustomerRecord[] = [
    {
      id: "cust_1",
      name: "Rahul Thapa",
      initials: "RT",
      phone: "+977 984-129384",
      category: "at-risk",
      statusLabel: "At Risk",
      statusClass: "bg-[#FCE8E6] text-[#C5221F]",
      firstVisit: "Aug 1",
      lastVisit: "Sep 17",
      totalVisits: 8,
      rewardsEarned: 1,
    },
    {
      id: "cust_2",
      name: "Sita Maya",
      initials: "SM",
      phone: "+977 981-840291",
      category: "regular",
      statusLabel: "Regular",
      statusClass: "bg-[#E6F4EA] text-[#137333]",
      firstVisit: "Aug 5",
      lastVisit: "Sep 20",
      totalVisits: 14,
      rewardsEarned: 2,
    },
    {
      id: "cust_3",
      name: "Aarav Khan",
      initials: "AK",
      phone: "+977 980-332145",
      category: "at-risk",
      statusLabel: "At Risk",
      statusClass: "bg-[#FCE8E6] text-[#C5221F]",
      firstVisit: "Aug 10",
      lastVisit: "Sep 16",
      totalVisits: 6,
      rewardsEarned: 0,
    },
    {
      id: "cust_4",
      name: "Pooja Sharma",
      initials: "PS",
      phone: "+977 985-110928",
      category: "at-risk",
      statusLabel: "At Risk",
      statusClass: "bg-[#FCE8E6] text-[#C5221F]",
      firstVisit: "Jul 28",
      lastVisit: "Sep 10",
      totalVisits: 11,
      rewardsEarned: 1,
    },
    {
      id: "cust_5",
      name: "Priya Gurung",
      initials: "PG",
      phone: "+977 982-990142",
      category: "vip",
      statusLabel: "VIP",
      statusClass: "bg-[#FEF7E0] text-[#B06000] border border-[#FEEFC3]",
      firstVisit: "Jun 15",
      lastVisit: "Sep 22",
      totalVisits: 26,
      rewardsEarned: 4,
      isVipStar: true,
    },
    {
      id: "cust_6",
      name: "Ram Bahadur",
      initials: "RB",
      phone: "+977 984-771239",
      category: "new",
      statusLabel: "New",
      statusClass: "bg-[#E8F0FE] text-[#1A73E8]",
      firstVisit: "Sep 18",
      lastVisit: "Sep 18",
      totalVisits: 1,
      rewardsEarned: 0,
    },
  ];

  const filteredCustomers = customers.filter((c) => {
    const matchesSegment = activeSegment === "all" || c.category === activeSegment;
    const matchesSearch =
      !searchKeyword ||
      c.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      c.phone.includes(searchKeyword);
    return matchesSegment && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-6">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5">
            <h1 className="text-[24px] font-semibold text-[#18181B] tracking-tight leading-tight">
              Customers
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] text-[11px] font-medium gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#137333] animate-pulse" />
              Live
            </span>
          </div>
          <p className="text-[14px] font-normal text-[#71717A] mt-0.5">1,248 total customers</p>
        </div>
      </div>

      {/* 2. Main Customers Table Card */}
      <div className="flex flex-col bg-white rounded-[16px] shadow-[0_1px_2px_rgba(0,0,0,0.04)] border border-[#E5E5E5] overflow-hidden hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-150 ease-out">
        {/* Header Control Toolbar */}
        <div className="p-6 flex flex-col gap-4 border-b border-[#E5E5E5] bg-white">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex items-center w-full lg:max-w-[320px]">
              <Search className="w-4 h-4 absolute left-3 text-[#71717A] pointer-events-none" strokeWidth={1.5} />
              <input
                type="text"
                placeholder="Search by name or phone..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-[#F4F4F5] text-[#18181B] placeholder:text-[#71717A] text-xs rounded-xl border border-[#E5E5E5] focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </div>

            {/* Segmented Filter Control Pills */}
            <div className="inline-flex items-center p-1 bg-[#F4F4F5] rounded-xl border border-[#E5E5E5] gap-1 overflow-x-auto max-w-full">
              {(["all", "new", "regular", "at-risk", "vip"] as const).map((segment) => (
                <button
                  key={segment}
                  onClick={() => setActiveSegment(segment)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                    activeSegment === segment
                      ? "bg-[#18181B] text-white font-semibold shadow-xs"
                      : "text-[#71717A] hover:text-[#18181B] hover:bg-[#E8EAED]"
                  }`}
                  type="button"
                >
                  {segment === "at-risk" ? "At Risk" : segment === "vip" ? "VIP" : segment === "all" ? "All" : segment === "new" ? "New" : "Regular"}
                </button>
              ))}
            </div>
          </div>

          {/* Filter options button */}
          <div className="flex items-center justify-start">
            <button
              onClick={() => alert("Filter options")}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#F4F4F5] hover:bg-[#E8EAED] active:bg-[#E5E5E5] text-[#18181B] border border-[#E5E5E5] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              type="button"
              title="Filter settings"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#71717A]" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Customers Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F4F4F5] text-[#71717A] text-[11px] font-medium uppercase tracking-[0.06em] border-b border-[#E5E5E5]">
                <th className="px-6 py-3.5">NAME</th>
                <th className="px-4 py-3.5">STATUS</th>
                <th className="px-4 py-3.5">FIRST VISIT</th>
                <th className="px-4 py-3.5">LAST VISIT</th>
                <th className="px-4 py-3.5 text-right">TOTAL VISITS</th>
                <th className="px-4 py-3.5 text-right">REWARDS EARNED</th>
                <th className="px-6 py-3.5 text-right w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E5E5]">
              {filteredCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  className="hover:bg-[#F4F4F5]/70 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <Link href={`/admin/customers/${cust.id}`} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#27272A] text-white flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                        {cust.initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[#18181B] text-[14px] group-hover:text-primary transition-colors">
                            {cust.name}
                          </span>
                          {cust.isVipStar && (
                            <Star className="w-3.5 h-3.5 text-[#B06000] fill-[#B06000]" strokeWidth={1.5} />
                          )}
                        </div>
                        <span className="text-xs text-[#71717A] mt-0.5 font-normal">
                          {cust.phone}
                        </span>
                      </div>
                    </Link>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cust.statusClass}`}
                    >
                      {cust.statusLabel}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap text-[#71717A] text-xs font-normal">
                    {cust.firstVisit}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap text-[#71717A] text-xs font-normal">
                    {cust.lastVisit}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap text-right font-bold text-[#18181B] text-[14px] tabular-nums">
                    {cust.totalVisits}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap text-right font-bold text-[#18181B] text-[14px] tabular-nums">
                    {cust.rewardsEarned}
                  </td>

                  <td className="px-6 py-3.5 whitespace-nowrap text-right">
                    <Link href={`/admin/customers/${cust.id}`}>
                      <ChevronRight className="w-4 h-4 text-[#71717A] group-hover:text-[#18181B] transition-colors" strokeWidth={1.5} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card Footer / Pagination Area */}
        <div className="px-6 py-4 bg-[#F4F4F5] border-t border-[#E5E5E5] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <div className="flex items-center gap-1.5">
            <span>
              Showing <span className="font-semibold text-[#18181B]">{filteredCustomers.length}</span> of{" "}
              <span className="font-semibold text-[#18181B]">1,248</span> customers
            </span>
          </div>

          {/* Action Pagination Buttons */}
          <div className="flex items-center gap-2">
            <button
              disabled
              className="btn-press px-3.5 py-2 rounded-xl bg-white border border-[#E5E5E5] text-[#18181B] disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium shadow-xs flex items-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              type="button"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#71717A]" strokeWidth={1.5} />
              <span>Previous</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5">
              <button
                className="w-9 h-9 rounded-xl bg-[#18181B] text-white text-xs font-bold flex items-center justify-center shadow-xs"
                type="button"
              >
                1
              </button>
              <button
                className="w-9 h-9 rounded-xl bg-white border border-[#E5E5E5] hover:bg-[#E8EAED] active:bg-[#E5E5E5] text-[#18181B] text-xs font-medium flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                type="button"
              >
                2
              </button>
              <button
                className="w-9 h-9 rounded-xl bg-white border border-[#E5E5E5] hover:bg-[#E8EAED] active:bg-[#E5E5E5] text-[#18181B] text-xs font-medium flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                type="button"
              >
                3
              </button>
              <span className="px-1 text-[#71717A] text-xs font-medium">...</span>
              <button
                className="w-9 h-9 rounded-xl bg-white border border-[#E5E5E5] hover:bg-[#E8EAED] active:bg-[#E5E5E5] text-[#18181B] text-xs font-medium flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                type="button"
              >
                208
              </button>
            </div>

            <button
              className="btn-press px-3.5 py-2 rounded-xl bg-white border border-[#E5E5E5] hover:bg-[#E8EAED] active:bg-[#E5E5E5] text-[#18181B] text-xs font-medium transition-all shadow-xs flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              type="button"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#71717A]" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
