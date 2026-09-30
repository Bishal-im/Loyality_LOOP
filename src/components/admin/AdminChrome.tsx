"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminChromeContext } from "./admin-chrome-context";

/**
 * AdminChrome — shell wrapper for every admin page.
 *
 * Layout contract:
 * ───────────────
 * Sidebar:  fixed, left-0, collapsed = w-16 (64px), expanded = w-60 (240px)
 *           The <aside> has class `peer` so next siblings can react via peer-hover:
 *
 * Header:   fixed, top-0. Its left offset is managed inside AdminHeader.tsx
 *           using `left-0 lg:left-16 lg:peer-hover:left-60` — reacts to the peer <aside> hover.
 *
 * Main:     padding-left mirrors sidebar width so content is never obscured.
 *           collapsed → pl-16, expanded → peer-hover:lg:pl-60
 *           Same ease-drawer transition for perfect sync with sidebar.
 */
export default function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const value = {
    mobileOpen,
    collapsed,
    openMobile: () => setMobileOpen(true),
    closeMobile: () => setMobileOpen(false),
    toggleMobile: () => setMobileOpen((prev) => !prev),
    toggleCollapsed: () => setCollapsed((prev) => !prev),
  };

  return (
    <AdminChromeContext.Provider value={value}>
      <div className="min-h-[100dvh] bg-bg text-text-primary">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        {/* Sidebar — has `peer` class, must come before the elements that react to it */}
        <AdminSidebar />

        {/* Header */}
        <AdminHeader />

        {/*
         * Main content — shift left padding when sidebar expands on hover.
         * pl-16              = collapsed sidebar offset (64px)
         * lg:peer-hover:pl-60 = expanded sidebar offset (240px) on desktop
         * pt-16              = clear fixed header height (64px)
         */}
        <main
          id="main"
          className="transition-[padding-left] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] pt-16 pl-0 lg:pl-16 lg:peer-hover:pl-60 min-h-[100dvh] bg-bg"
        >
          <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
            <div className="flex flex-col w-full max-w-[1440px] mx-auto min-w-0 gap-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </AdminChromeContext.Provider>
  );
}
