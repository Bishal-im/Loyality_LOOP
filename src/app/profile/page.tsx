"use client";

import React from "react";
import { Bell, ChevronRight, LogOut, User, Award, BellRing, Clock, Gift } from "lucide-react";
import { BottomTabBar } from "@/components/customer/BottomTabBar";

export default function ProfilePage() {
  const menuItems = [
    {
      id: "profile",
      icon: User,
      label: "Profile",
      subtitle: "Edit name, email, phone number",
    },
    {
      id: "tier",
      icon: Award,
      label: "Your Tier",
      subtitle: "Guild Gold Patron • Level II",
    },
    {
      id: "notifications",
      icon: BellRing,
      label: "Notifications",
      subtitle: "Push alerts & preferences",
    },
    {
      id: "points",
      icon: Clock,
      label: "Point History",
      subtitle: "38 Points • 7 Active Stamps",
    },
    {
      id: "rewards",
      icon: Gift,
      label: "Reward History",
      subtitle: "4 Claimed • 1 Available",
    },
  ];

  return (
    <div
      className="min-h-screen flex flex-col pb-24"
      style={{ backgroundColor: "var(--c-bg)", color: "var(--c-text-primary)" }}
    >
      {/* ── Header ── */}
      <header
        className="w-full max-w-md mx-auto px-4 pt-4 pb-2 flex items-center justify-between"
      >
        <div>
          <p
            className="text-[15px] font-bold tracking-tight leading-none"
            style={{ color: "var(--c-text-primary)" }}
          >
            Atelier Guild
          </p>
          <p
            className="text-[10px] font-semibold tracking-widest uppercase mt-0.5"
            style={{ color: "var(--c-terracotta)" }}
          >
            Patron Account
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Bell with gold dot */}
          <button className="relative w-9 h-9 flex items-center justify-center">
            <Bell className="w-5 h-5" style={{ color: "var(--c-text-primary)" }} />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2"
              style={{ backgroundColor: "var(--c-gold)", borderColor: "var(--c-bg)" }}
            />
          </button>
          {/* Avatar photo circle */}
          <div
            className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #8FA58F 0%, #4A7A5A 100%)",
              border: "2px solid var(--c-border)",
            }}
          >
            <span className="text-sm font-bold text-white">B</span>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto px-4 flex flex-col items-center">
        {/* ── Avatar + name block ── */}
        <div className="flex flex-col items-center mt-6 mb-8">
          {/* Avatar with warm border ring */}
          <div
            className="w-[90px] h-[90px] rounded-full overflow-hidden mb-4"
            style={{
              border: "3px solid var(--c-peach)",
              boxShadow: "0 4px 20px rgba(43,33,24,0.15)",
              background: "linear-gradient(135deg, #C4B0A0 0%, #8FA58F 100%)",
            }}
          >
            {/* Person silhouette */}
            <div className="w-full h-full flex items-center justify-center"
              style={{ background: "linear-gradient(160deg, #B8A898 0%, #7A9A82 100%)" }}
            >
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="18" r="9" fill="rgba(255,255,255,0.7)" />
                <path d="M6 44c0-9.941 8.059-18 18-18s18 8.059 18 18" fill="rgba(255,255,255,0.55)" />
              </svg>
            </div>
          </div>

          {/* Name */}
          <h1
            className="text-[22px] font-bold tracking-tight mb-1"
            style={{ color: "var(--c-text-primary)" }}
          >
            Binod Shrestha
          </h1>

          {/* Tier + ID */}
          <p
            className="text-[11px] font-semibold tracking-widest uppercase"
            style={{ color: "var(--c-text-secondary)" }}
          >
            Gold Patron&nbsp;•&nbsp;#AG-8829
          </p>
        </div>

        {/* ── Menu card ── */}
        <div
          className="w-full rounded-2xl overflow-hidden border"
          style={{
            backgroundColor: "var(--c-surface)",
            borderColor: "var(--c-border)",
            boxShadow: "0 2px 16px rgba(43,33,24,0.07)",
          }}
        >
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                className="w-full flex items-center gap-4 px-4 py-4 text-left transition-colors"
                style={
                  idx < menuItems.length - 1
                    ? { borderBottom: "1px solid var(--c-border)" }
                    : {}
                }
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--c-bg)")}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = "")}
              >
                {/* Icon container */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--c-sage-light)" }}
                >
                  <Icon className="w-4.5 h-4.5" style={{ color: "var(--c-espresso)" }} strokeWidth={1.8} />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[15px] font-semibold leading-tight"
                    style={{ color: "var(--c-text-primary)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="text-[12px] mt-0.5"
                    style={{ color: "var(--c-text-secondary)" }}
                  >
                    {item.subtitle}
                  </p>
                </div>

                {/* Chevron */}
                <ChevronRight
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: "var(--c-text-muted)" }}
                />
              </button>
            );
          })}
        </div>

        {/* ── Log Out button ── */}
        <div className="w-full mt-4">
          <button
            type="button"
            onClick={() => alert("Log out")}
            className="w-full h-14 rounded-2xl flex items-center justify-center gap-2.5 font-semibold text-[15px] border transition-all active:scale-[0.98]"
            style={{
              backgroundColor: "var(--c-surface)",
              borderColor: "var(--c-border)",
              color: "var(--c-alert)",
              boxShadow: "0 2px 16px rgba(43,33,24,0.07)",
            }}
          >
            <LogOut className="w-4.5 h-4.5" />
            Log Out
          </button>
        </div>

        {/* ── Security footer note ── */}
        <p
          className="text-center text-[10px] mt-4 mb-2 tracking-widest uppercase"
          style={{ color: "var(--c-text-muted)" }}
        >
          Atelier Guild Patron Build V3.4.2 • Secure Session
        </p>
      </main>

      <BottomTabBar />
    </div>
  );
}
