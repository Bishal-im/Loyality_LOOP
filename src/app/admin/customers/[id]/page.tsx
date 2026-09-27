"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, Calendar, Stamp, Award, Plus, Check } from "lucide-react";
import { MOCK_CUSTOMERS } from "@/lib/mock-data";

export default function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = React.use(params);
  const customer =
    MOCK_CUSTOMERS.find((c) => c.id === resolvedParams.id) || MOCK_CUSTOMERS[0];

  const [stampsCount, setStampsCount] = useState(customer.currentStamps);

  const handleAddStamp = () => {
    if (stampsCount < customer.maxStamps) {
      setStampsCount(stampsCount + 1);
    } else {
      alert("Stamp card is already full! Reward unlocked.");
    }
  };

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Back Link & Header */}
      <div>
        <Link
          href="/admin/customers"
          className="inline-flex items-center gap-1 text-xs text-[#6E6E73] hover:text-[#1C1C1E] transition-colors mb-3"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Customers</span>
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#1C7C54] text-white flex items-center justify-center font-bold text-2xl shadow-sm">
              {customer.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight">
                {customer.name}
              </h1>
              <p className="text-xs text-[#6E6E73] mt-0.5">
                Member since {customer.joinedDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAddStamp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C7C54] hover:bg-[#16603F] text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add Manual Stamp</span>
            </button>
          </div>
        </div>
      </div>

      {/* Info Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Contact Info Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E4E4E7] flex flex-col justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] mb-4">
            Customer Information
          </h2>
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2.5 text-[#1C1C1E]">
              <Phone className="w-4 h-4 text-[#6E6E73]" />
              <span className="font-mono">{customer.phone}</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#1C1C1E]">
              <Mail className="w-4 h-4 text-[#6E6E73]" />
              <span>{customer.email}</span>
            </div>
            <div className="flex items-center gap-2.5 text-[#1C1C1E]">
              <Calendar className="w-4 h-4 text-[#6E6E73]" />
              <span>Joined: {customer.joinedDate}</span>
            </div>
          </div>
        </div>

        {/* Loyalty Overview */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E4E4E7] flex flex-col justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73] mb-4">
            Loyalty Metrics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-2xl font-bold text-[#1C1C1E]">
                {customer.totalVisits}
              </span>
              <p className="text-[11px] text-[#6E6E73] mt-0.5">Total Visits</p>
            </div>
            <div>
              <span className="text-2xl font-bold text-[#1C7C54]">
                {customer.rewardsEarned}
              </span>
              <p className="text-[11px] text-[#6E6E73] mt-0.5">Rewards Claimed</p>
            </div>
          </div>
        </div>

        {/* Current Card Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E4E4E7] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6E6E73]">
              Active Stamp Card
            </h2>
            <span className="text-xs font-bold text-[#1C7C54]">
              {stampsCount} / {customer.maxStamps} Stamps
            </span>
          </div>

          <div className="grid grid-cols-5 gap-2 my-2">
            {Array.from({ length: customer.maxStamps }).map((_, index) => {
              const isStamped = index < stampsCount;
              return (
                <div
                  key={index}
                  className={`w-full aspect-square rounded-xl border flex items-center justify-center transition-all ${
                    isStamped
                      ? "bg-[#C99700] border-[#C99700] text-white shadow-sm"
                      : "bg-[#F2F2F5] border-[#E4E4E7] text-[#6E6E73]"
                  }`}
                >
                  {isStamped ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <span className="text-[11px] font-semibold">{index + 1}</span>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-[11px] text-[#6E6E73] text-center mt-2">
            {customer.maxStamps - stampsCount > 0
              ? `${customer.maxStamps - stampsCount} stamps until Free Veg Momo`
              : "Reward unlocked! Ready to redeem."}
          </p>
        </div>
      </div>

      {/* Activity Logs */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E4E4E7]">
        <h2 className="text-base font-semibold text-[#1C1C1E] mb-4">
          Visit & Scan History
        </h2>
        <div className="divide-y divide-[#E4E4E7]">
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Stamp className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-[#1C1C1E]">
                  Stamp Earned (+1)
                </h3>
                <p className="text-[11px] text-[#6E6E73]">
                  Jhamsikhel Branch • Scanned by Sarah K.
                </p>
              </div>
            </div>
            <span className="text-xs text-[#6E6E73]">Today, 11:30 AM</span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-[#1C1C1E]">
                  Reward Redeemed: Free Veg Momo
                </h3>
                <p className="text-[11px] text-[#6E6E73]">
                  Jhamsikhel Branch • Verified by Kiran A.
                </p>
              </div>
            </div>
            <span className="text-xs text-[#6E6E73]">20 Sep 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}
