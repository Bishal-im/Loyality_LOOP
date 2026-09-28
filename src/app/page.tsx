"use client";

import React from "react";
import Link from "next/link";
import { LayoutDashboard, Smartphone, Gift } from "lucide-react";

export default function RootHomePage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6"
      style={{ backgroundColor: "var(--c-bg)", color: "var(--c-text-primary)" }}
    >
      <div
        className="w-full max-w-xl rounded-3xl p-8 text-center border"
        style={{
          backgroundColor: "var(--c-surface)",
          borderColor: "var(--c-border)",
          boxShadow: "0 4px 24px rgba(43,33,24,0.08)",
        }}
      >
        <div
          className="w-16 h-16 rounded-2xl text-white flex items-center justify-center mx-auto mb-4"
          style={{
            backgroundColor: "var(--c-terracotta)",
            boxShadow: "0 4px 16px rgba(201,111,74,0.3)",
          }}
        >
          <Gift className="w-8 h-8" />
        </div>

        <h1
          className="text-3xl font-bold tracking-tight mb-2"
          style={{ color: "var(--c-text-primary)" }}
        >
          LoyalLoop
        </h1>
        <p
          className="text-xs max-w-md mx-auto mb-8"
          style={{ color: "var(--c-text-secondary)" }}
        >
          Pixel-accurate frontend implementation based on Stitch design specifications. Select an entry point below:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Admin App Card */}
          <Link
            href="/admin/dashboard"
            className="p-6 rounded-2xl border transition-all group flex flex-col items-center text-center"
            style={{
              backgroundColor: "var(--c-bg)",
              borderColor: "var(--c-border)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "rgba(201,111,74,0.05)";
              e.currentTarget.style.borderColor = "var(--c-terracotta)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "var(--c-bg)";
              e.currentTarget.style.borderColor = "var(--c-border)";
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform"
              style={{
                backgroundColor: "var(--c-surface)",
                color: "var(--c-terracotta)",
                boxShadow: "0 1px 6px rgba(43,33,24,0.06)",
              }}
            >
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <h2
              className="text-sm font-bold transition-colors"
              style={{ color: "var(--c-text-primary)" }}
            >
              Admin Portal
            </h2>
            <p className="text-[11px] mt-1" style={{ color: "var(--c-text-secondary)" }}>
              Dashboard, Customers, Campaigns, Rewards, Staff &amp; Settings
            </p>
          </Link>

          {/* Customer PWA Card */}
          <Link
            href="/register"
            className="p-6 rounded-2xl border transition-all group flex flex-col items-center text-center"
            style={{
              backgroundColor: "var(--c-bg)",
              borderColor: "var(--c-border)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = "rgba(201,111,74,0.05)";
              e.currentTarget.style.borderColor = "var(--c-terracotta)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = "var(--c-bg)";
              e.currentTarget.style.borderColor = "var(--c-border)";
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform"
              style={{
                backgroundColor: "var(--c-surface)",
                color: "var(--c-terracotta)",
                boxShadow: "0 1px 6px rgba(43,33,24,0.06)",
              }}
            >
              <Smartphone className="w-5 h-5" />
            </div>
            <h2
              className="text-sm font-bold transition-colors"
              style={{ color: "var(--c-text-primary)" }}
            >
              Customer Mobile App
            </h2>
            <p className="text-[11px] mt-1" style={{ color: "var(--c-text-secondary)" }}>
              Registration, Profile, Home, Rewards &amp; Stamp Overlays
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
