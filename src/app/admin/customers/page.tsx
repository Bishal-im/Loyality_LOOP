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
  statusBg: string;
  statusText: string;
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
      statusBg: "bg-[#E15554]/10",
      statusText: "text-[#E15554]",
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
      statusBg: "bg-[#1C7C54]/10",
      statusText: "text-[#1C7C54]",
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
      statusBg: "bg-[#E15554]/10",
      statusText: "text-[#E15554]",
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
      statusBg: "bg-[#E15554]/10",
      statusText: "text-[#E15554]",
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
      statusBg: "bg-[#F2F2F5] border border-[#C99700]",
      statusText: "text-[#1C1C1E]",
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
      statusBg: "bg-[#F2F2F5]",
      statusText: "text-[#6E6E73]",
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
    <div className="flex flex-col w-full max-w-7xl mx-auto gap-6">
      {/* Main View Container */}
      <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-[#E4E4E7] overflow-hidden">
        {/* Header Block: Title, Search, and Segmented Filter Bar */}
        <div className="p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border-b border-[#E4E4E7]">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight whitespace-nowrap">
                Customers
              </h1>
              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#F2F2F5] text-xs font-medium text-[#6E6E73]">
                Live
              </span>
            </div>
            <p className="text-xs text-[#6E6E73] mt-1">1,248 total customers</p>
          </div>

          {/* Controls Right */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Field */}
            <div className="relative flex items-center min-w-[240px] flex-grow sm:flex-grow-0">
              <Search className="w-4 h-4 absolute left-3 text-[#6E6E73] pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name or phone"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-[#F2F2F5] text-[#1C1C1E] placeholder:text-[#6E6E73] text-xs rounded-xl border border-[#E4E4E7] focus:outline-none focus:border-[#1C7C54] focus:bg-white transition-colors"
              />
            </div>

            {/* Segmented Filter Control Pills */}
            <div className="inline-flex items-center p-1 bg-[#F2F2F5] rounded-xl gap-1 border border-[#E4E4E7]">
              {(["all", "new", "regular", "at-risk", "vip"] as const).map((segment) => (
                <button
                  key={segment}
                  onClick={() => setActiveSegment(segment)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all ${
                    activeSegment === segment
                      ? "bg-[#1C7C54] text-white shadow-sm"
                      : "text-[#6E6E73] hover:text-[#1C1C1E] hover:bg-white"
                  }`}
                  type="button"
                >
                  {segment === "at-risk" ? "At Risk" : segment}
                </button>
              ))}
            </div>

            {/* Filter Tune Icon Button */}
            <button
              onClick={() => alert("Filter options")}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#F2F2F5] hover:bg-[#E4E4E7] text-[#1C1C1E] transition-colors border border-[#E4E4E7]"
              type="button"
              title="Filters"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#6E6E73]" />
            </button>
          </div>
        </div>

        {/* Customers Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F2F2F5] text-[#6E6E73] text-[11px] font-semibold uppercase tracking-wider border-b border-[#E4E4E7]">
                <th className="px-6 py-3">NAME</th>
                <th className="px-4 py-3">STATUS</th>
                <th className="px-4 py-3">FIRST VISIT</th>
                <th className="px-4 py-3">LAST VISIT</th>
                <th className="px-4 py-3 text-right">TOTAL VISITS</th>
                <th className="px-4 py-3 text-right">REWARDS EARNED</th>
                <th className="px-6 py-3 text-right w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              {filteredCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  className="hover:bg-[#F2F2F5] transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <Link href={`/admin/customers/${cust.id}`} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1C7C54]/10 text-[#1C7C54] flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {cust.initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[#1C1C1E] group-hover:text-[#1C7C54] transition-colors">
                            {cust.name}
                          </span>
                          {cust.isVipStar && (
                            <Star className="w-3.5 h-3.5 text-[#C99700] fill-[#C99700]" />
                          )}
                        </div>
                        <span className="text-[11px] text-[#6E6E73] mt-0.5">
                          {cust.phone}
                        </span>
                      </div>
                    </Link>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${cust.statusBg} ${cust.statusText}`}
                    >
                      {cust.statusLabel}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap text-[#6E6E73]">
                    {cust.firstVisit}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap text-[#6E6E73]">
                    {cust.lastVisit}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap text-right font-semibold text-[#1C1C1E]">
                    {cust.totalVisits}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap text-right font-semibold text-[#1C1C1E]">
                    {cust.rewardsEarned}
                  </td>

                  <td className="px-6 py-3.5 whitespace-nowrap text-right">
                    <Link href={`/admin/customers/${cust.id}`}>
                      <ChevronRight className="w-4 h-4 text-[#6E6E73] group-hover:text-[#1C7C54] transition-colors" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card Footer / Pagination Area */}
        <div className="px-6 py-4 bg-white border-t border-[#E4E4E7] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#6E6E73]">
            <span>
              Showing{" "}
              <span className="font-semibold text-[#1C1C1E]">
                {filteredCustomers.length}
              </span>{" "}
              of <span className="font-semibold text-[#1C1C1E]">1,248</span> customers
            </span>
          </div>

          {/* Action Pagination Buttons */}
          <div className="flex items-center gap-2">
            <button
              disabled
              className="px-3 py-1.5 rounded-xl bg-[#F2F2F5] text-[#6E6E73] text-xs font-medium cursor-not-allowed opacity-50 flex items-center gap-1 border border-[#E4E4E7]"
              type="button"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <div className="hidden sm:flex items-center gap-1">
              <button
                className="w-8 h-8 rounded-xl bg-[#1C7C54] text-white text-xs font-bold flex items-center justify-center shadow-sm"
                type="button"
              >
                1
              </button>
              <button
                className="w-8 h-8 rounded-xl bg-[#F2F2F5] hover:bg-[#E4E4E7] text-[#1C1C1E] text-xs font-medium flex items-center justify-center transition-colors"
                type="button"
              >
                2
              </button>
              <button
                className="w-8 h-8 rounded-xl bg-[#F2F2F5] hover:bg-[#E4E4E7] text-[#1C1C1E] text-xs font-medium flex items-center justify-center transition-colors"
                type="button"
              >
                3
              </button>
              <span className="px-1 text-[#6E6E73] text-xs">…</span>
              <button
                className="w-8 h-8 rounded-xl bg-[#F2F2F5] hover:bg-[#E4E4E7] text-[#1C1C1E] text-xs font-medium flex items-center justify-center transition-colors"
                type="button"
              >
                208
              </button>
            </div>

            <button
              className="px-3 py-1.5 rounded-xl bg-[#F2F2F5] hover:bg-[#E4E4E7] text-[#1C1C1E] text-xs font-medium transition-colors flex items-center gap-1 border border-[#E4E4E7]"
              type="button"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
