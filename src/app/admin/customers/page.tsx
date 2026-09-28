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
      statusBg: "bg-[#C25953]/10",
      statusText: "text-[#C25953]",
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
      statusBg: "bg-[#173F35]/10",
      statusText: "text-[#173F35]",
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
      statusBg: "bg-[#C25953]/10",
      statusText: "text-[#C25953]",
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
      statusBg: "bg-[#C25953]/10",
      statusText: "text-[#C25953]",
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
      statusBg: "bg-[#F8F6F1] border border-[#D6A85F]",
      statusText: "text-[#1D2925]",
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
      statusBg: "bg-[#F8F6F1]",
      statusText: "text-[#718078]",
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
      <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-[#E4E2DD] overflow-hidden">
        {/* Header Block: Title, Search, and Segmented Filter Bar */}
        <div className="p-6 flex flex-col gap-4 bg-white border-b border-[#E4E2DD]">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#1D2925] tracking-tight">
                  Customers
                </h1>
                <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#F8F6F1] text-xs font-semibold text-[#718078]">
                  Live
                </span>
              </div>
              <p className="text-xs text-[#718078] mt-1 font-medium">1,248 total customers</p>
            </div>

            {/* Controls Right Header Row */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Field */}
              <div className="relative flex items-center w-full sm:min-w-[220px] sm:w-auto">
                <Search className="w-4 h-4 absolute left-3 text-[#718078] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by name or phone"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#F8F6F1] text-[#1D2925] placeholder:text-[#718078] text-xs rounded-xl border border-transparent focus:outline-none focus:border-[#173F35] focus:bg-white transition-colors"
                />
              </div>

              {/* Segmented Filter Control Pills */}
              <div className="inline-flex items-center p-1 bg-[#F8F6F1] rounded-xl gap-1 overflow-x-auto max-w-full">
                {(["all", "new", "regular", "at-risk", "vip"] as const).map((segment) => (
                  <button
                    key={segment}
                    onClick={() => setActiveSegment(segment)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                      activeSegment === segment
                        ? "bg-[#173F35] text-white shadow-sm"
                        : "text-[#718078] hover:text-[#1D2925]"
                    }`}
                    type="button"
                  >
                    {segment === "at-risk" ? "At Risk" : segment === "vip" ? "VIP" : segment === "all" ? "All" : segment === "new" ? "New" : "Regular"}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Filter Button below Search Input */}
          <div className="flex items-center justify-start">
            <button
              onClick={() => alert("Filter options")}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F8F6F1] hover:bg-[#E4E2DD] text-[#1D2925] transition-colors border border-[#E4E2DD]"
              type="button"
              title="Filter settings"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#718078]" />
            </button>
          </div>
        </div>

        {/* Customers Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F5F3EE] text-[#718078] text-[11px] font-semibold uppercase tracking-wider border-b border-[#E4E2DD]">
                <th className="px-6 py-3.5">NAME</th>
                <th className="px-4 py-3.5">STATUS</th>
                <th className="px-4 py-3.5">FIRST VISIT</th>
                <th className="px-4 py-3.5">LAST VISIT</th>
                <th className="px-4 py-3.5 text-right">TOTAL VISITS</th>
                <th className="px-4 py-3.5 text-right">REWARDS EARNED</th>
                <th className="px-6 py-3.5 text-right w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E2DD]">
              {filteredCustomers.map((cust) => (
                <tr
                  key={cust.id}
                  className="hover:bg-[#F5F3EE] transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-3.5 whitespace-nowrap">
                    <Link href={`/admin/customers/${cust.id}`} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#E4E2DD] text-[#1D2925] flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {cust.initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-[#1D2925] text-sm group-hover:text-[#173F35] transition-colors">
                            {cust.name}
                          </span>
                          {cust.isVipStar && (
                            <Star className="w-3.5 h-3.5 text-[#D6A85F] fill-[#D6A85F]" />
                          )}
                        </div>
                        <span className="text-[11px] text-[#718078] mt-0.5 font-normal">
                          {cust.phone}
                        </span>
                      </div>
                    </Link>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${cust.statusBg} ${cust.statusText}`}
                    >
                      {cust.statusLabel}
                    </span>
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap text-[#718078] font-medium">
                    {cust.firstVisit}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap text-[#718078] font-medium">
                    {cust.lastVisit}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap text-right font-bold text-[#1D2925] text-sm">
                    {cust.totalVisits}
                  </td>

                  <td className="px-4 py-3.5 whitespace-nowrap text-right font-bold text-[#1D2925] text-sm">
                    {cust.rewardsEarned}
                  </td>

                  <td className="px-6 py-3.5 whitespace-nowrap text-right">
                    <Link href={`/admin/customers/${cust.id}`}>
                      <ChevronRight className="w-4 h-4 text-[#718078] group-hover:text-[#173F35] transition-colors" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card Footer / Pagination Area */}
        <div className="px-6 py-4 bg-white border-t border-[#E4E2DD] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 text-xs text-[#718078]">
            <span>
              Showing <span className="font-bold text-[#1D2925]">{filteredCustomers.length}</span> of{" "}
              <span className="font-bold text-[#1D2925]">1,248</span> customers
            </span>
          </div>

          {/* Action Pagination Buttons */}
          <div className="flex items-center gap-2">
            <button
              disabled
              className="px-3 py-1.5 rounded-xl bg-[#F8F6F1] text-[#9AA8A3] text-xs font-semibold cursor-not-allowed opacity-70 flex items-center gap-1"
              type="button"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <div className="hidden sm:flex items-center gap-1">
              <button
                className="w-8 h-8 rounded-xl bg-[#173F35] text-white text-xs font-bold flex items-center justify-center shadow-sm"
                type="button"
              >
                1
              </button>
              <button
                className="w-8 h-8 rounded-xl bg-[#F8F6F1] hover:bg-[#E4E2DD] text-[#1D2925] text-xs font-semibold flex items-center justify-center transition-colors"
                type="button"
              >
                2
              </button>
              <button
                className="w-8 h-8 rounded-xl bg-[#F8F6F1] hover:bg-[#E4E2DD] text-[#1D2925] text-xs font-semibold flex items-center justify-center transition-colors"
                type="button"
              >
                3
              </button>
              <span className="px-1 text-[#718078] text-xs font-bold">...</span>
              <button
                className="w-8 h-8 rounded-xl bg-[#F8F6F1] hover:bg-[#E4E2DD] text-[#1D2925] text-xs font-semibold flex items-center justify-center transition-colors"
                type="button"
              >
                208
              </button>
            </div>

            <button
              className="px-3 py-1.5 rounded-xl bg-[#F8F6F1] hover:bg-[#E4E2DD] text-[#1D2925] text-xs font-semibold transition-colors flex items-center gap-1"
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

