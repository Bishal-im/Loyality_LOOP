"use client";

import React from "react";
import Link from "next/link";
import { LayoutDashboard, Smartphone, ShieldCheck, Gift } from "lucide-react";

export default function RootHomePage() {
  return (
    <div className="min-h-screen bg-[#F2F2F5] text-[#1C1C1E] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white rounded-3xl p-8 shadow-md border border-[#E4E4E7] text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#1C7C54] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
          <Gift className="w-8 h-8" />
        </div>

        <h1 className="text-3xl font-bold text-[#1C1C1E] tracking-tight mb-2">
          LoyalLoop
        </h1>
        <p className="text-xs text-[#6E6E73] max-w-md mx-auto mb-8">
          Pixel-accurate frontend implementation based on Stitch design specifications. Select an entry point below:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Admin App Card */}
          <Link
            href="/admin/dashboard"
            className="p-6 rounded-2xl bg-[#F2F2F5] hover:bg-[#1C7C54]/10 border border-[#E4E4E7] hover:border-[#1C7C54] transition-all group flex flex-col items-center text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-[#1C7C54] flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-[#1C1C1E] group-hover:text-[#1C7C54] transition-colors">
              Admin Portal
            </h2>
            <p className="text-[11px] text-[#6E6E73] mt-1">
              Dashboard, Customers, Campaigns, Rewards, Staff & Settings
            </p>
          </Link>

          {/* Customer PWA Card */}
          <Link
            href="/register"
            className="p-6 rounded-2xl bg-[#F2F2F5] hover:bg-[#1C7C54]/10 border border-[#E4E4E7] hover:border-[#1C7C54] transition-all group flex flex-col items-center text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-white text-[#1C7C54] flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform">
              <Smartphone className="w-5 h-5" />
            </div>
            <h2 className="text-sm font-bold text-[#1C1C1E] group-hover:text-[#1C7C54] transition-colors">
              Customer Mobile App
            </h2>
            <p className="text-[11px] text-[#6E6E73] mt-1">
              Registration, Profile, Home, Rewards & Stamp Overlays
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
