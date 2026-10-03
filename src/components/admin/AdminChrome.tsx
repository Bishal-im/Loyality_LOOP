"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminChromeContext } from "./admin-chrome-context";

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
      <div className="min-h-[100dvh] bg-[#E2E2E6] text-[#18181B]">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>

        {/* Sidebar */}
        <AdminSidebar />

        {/* Header */}
        <AdminHeader />

        {/* Main content */}
        <main
          id="main"
          className="pt-16 pl-0 lg:pl-60 min-h-[100dvh] bg-[#E2E2E6]"
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
