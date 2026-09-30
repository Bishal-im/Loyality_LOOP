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

  const sidebarWidth = collapsed ? "4.5rem" : "16.25rem";

  return (
    <AdminChromeContext.Provider value={value}>
      <div
        className="min-h-[100dvh] bg-bg text-text-primary"
        style={{ "--admin-sidebar": sidebarWidth } as React.CSSProperties}
      >
        <AdminSidebar />
        <AdminHeader />
        <main
          id="main"
          className="pt-16 min-h-[100dvh] bg-bg w-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8 lg:pl-[calc(var(--admin-sidebar)+2rem)] transition-[padding] duration-200"
        >
          <div className="flex flex-col w-full max-w-[1440px] mx-auto min-w-0 gap-6">
            {children}
          </div>
        </main>
      </div>
    </AdminChromeContext.Provider>
  );
}

