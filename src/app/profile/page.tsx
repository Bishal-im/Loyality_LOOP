"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, User } from "lucide-react";
import { BottomTabBar } from "@/components/customer/BottomTabBar";

export default function ProfilePage() {
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-[#F2F2F5] text-[#1C1C1E] flex flex-col justify-between pb-24">
      {/* Header */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-white/80 backdrop-blur-xl border-b border-[#E4E4E7] px-4 h-14 flex items-center justify-between">
        <span className="text-[#1C7C54] font-semibold text-sm">LoyalLoop</span>
        <h1 className="font-semibold text-base text-[#1C1C1E]">Profile</h1>
        <div className="w-8 h-8 rounded-full bg-[#1C7C54] flex items-center justify-center text-white">
          <User className="w-4 h-4" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-md mx-auto pt-16 px-4">
        {/* Profile Info */}
        <div className="flex flex-col items-center justify-center pt-4 pb-6">
          <div className="relative flex items-center justify-center w-[72px] h-[72px] rounded-full bg-[#1C7C54] text-white shadow-sm select-none">
            <span className="text-2xl font-bold">R</span>
          </div>
          <h2 className="mt-3 text-lg font-semibold text-[#1C1C1E] tracking-tight text-center">
            Rahul Thapa
          </h2>
          <p className="mt-0.5 text-xs text-[#6E6E73] text-center">
            +977 9841234567
          </p>
        </div>

        {/* Card 1: Account Settings */}
        <div className="w-full bg-white rounded-2xl shadow-sm overflow-hidden border border-[#E4E4E7]">
          {/* Email Row */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#E4E4E7]">
            <span className="text-sm text-[#1C1C1E]">Email</span>
            <span className="text-sm text-[#6E6E73] select-all">
              rahul@example.com
            </span>
          </div>

          {/* Marketing Toggle Row */}
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-[#E4E4E7]">
            <span className="text-sm text-[#1C1C1E]">Marketing preferences</span>
            <button
              type="button"
              onClick={() => setMarketingEnabled(!marketingEnabled)}
              className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${
                marketingEnabled ? "bg-[#1C7C54]" : "bg-[#E4E4E7]"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ${
                  marketingEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Privacy Policy Row */}
          <Link
            href="#"
            className="flex items-center justify-between px-4 py-3.5 border-b border-[#E4E4E7] hover:bg-[#F2F2F5] transition-colors group"
          >
            <span className="text-sm text-[#1C1C1E]">Privacy Policy</span>
            <ChevronRight className="w-5 h-5 text-[#6E6E73] group-hover:text-[#1C1C1E] transition-colors" />
          </Link>

          {/* Terms of Service Row */}
          <Link
            href="#"
            className="flex items-center justify-between px-4 py-3.5 hover:bg-[#F2F2F5] transition-colors group"
          >
            <span className="text-sm text-[#1C1C1E]">Terms of Service</span>
            <ChevronRight className="w-5 h-5 text-[#6E6E73] group-hover:text-[#1C1C1E] transition-colors" />
          </Link>
        </div>

        {/* Card 2: Delete Account */}
        <div className="w-full mt-4 bg-white rounded-2xl shadow-sm overflow-hidden border border-[#E4E4E7]">
          <button
            type="button"
            onClick={() => alert("Delete account functionality stubbed")}
            className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-[#F2F2F5] transition-colors group text-left"
          >
            <span className="text-sm font-medium text-[#E15554]">
              Delete Account
            </span>
            <ChevronRight className="w-5 h-5 text-[#E15554] transition-colors" />
          </button>
        </div>

        {/* Log Out */}
        <div className="flex justify-center items-center mt-7">
          <Link
            href="/register"
            className="text-sm text-[#6E6E73] hover:text-[#1C1C1E] transition-colors py-2 px-4"
          >
            Log Out
          </Link>
        </div>
      </main>

      <BottomTabBar />
    </div>
  );
}
