"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Filter, ChevronRight, UserPlus } from "lucide-react";
import { MOCK_CUSTOMERS } from "@/lib/mock-data";

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = MOCK_CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight">
            Customers
          </h1>
          <p className="text-xs text-[#6E6E73] mt-0.5">
            Customer directory and loyalty history
          </p>
        </div>

        <button
          onClick={() => alert("Add Customer modal stubbed")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C7C54] hover:bg-[#16603F] text-white text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Customer</span>
        </button>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#E4E4E7] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6E73]" />
          <input
            type="text"
            placeholder="Search by name, phone, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F2F2F5] border border-[#E4E4E7] rounded-xl text-xs text-[#1C1C1E] placeholder:text-[#6E6E73] focus:outline-none focus:border-[#1C7C54] focus:bg-white transition-colors"
          />
        </div>

        <button
          onClick={() => alert("Filters clicked")}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F2F2F5] hover:bg-[#E4E4E7] border border-[#E4E4E7] text-xs font-medium text-[#1C1C1E] transition-colors w-full sm:w-auto justify-center"
        >
          <Filter className="w-3.5 h-3.5 text-[#6E6E73]" />
          <span>Filter</span>
        </button>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E4E4E7] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F2F2F5] border-b border-[#E4E4E7] text-[#6E6E73] uppercase tracking-wider text-[11px] font-semibold">
                <th className="px-6 py-3.5">Customer</th>
                <th className="px-6 py-3.5">Phone Number</th>
                <th className="px-6 py-3.5">Total Visits</th>
                <th className="px-6 py-3.5">Stamps Progress</th>
                <th className="px-6 py-3.5">Last Visit</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-[#F2F2F5] transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/customers/${customer.id}`}
                      className="flex items-center gap-3"
                    >
                      <div className="w-9 h-9 rounded-full bg-[#1C7C54]/10 text-[#1C7C54] font-bold flex items-center justify-center text-sm">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-[#1C1C1E] group-hover:text-[#1C7C54] transition-colors">
                          {customer.name}
                        </span>
                        <p className="text-[11px] text-[#6E6E73]">
                          {customer.email}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-6 py-4 font-mono text-[#1C1C1E]">
                    {customer.phone}
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#1C1C1E]">
                    {customer.totalVisits} visits
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#1C7C54]/10 text-[#1C7C54] font-semibold text-[11px]">
                      {customer.currentStamps} / {customer.maxStamps} Stamps
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#6E6E73]">
                    {customer.lastVisit}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        customer.status === "Active"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/customers/${customer.id}`}
                      className="inline-flex items-center justify-center p-1.5 rounded-lg text-[#6E6E73] hover:text-[#1C1C1E] hover:bg-white transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
