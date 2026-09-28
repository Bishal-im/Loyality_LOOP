"use client";

import React, { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminChromeContext } from "@/components/admin/admin-chrome-context";

export { useAdminChrome } from "@/components/admin/admin-chrome-context";

export function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);
  const openMobile = useCallback(() => setMobileOpen(true), []);
  const toggleMobile = useCallback(() => setMobileOpen((open) => !open), []);
  const toggleCollapsed = useCallback(() => setCollapsed((value) => !value), []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  return (
    <AdminChromeContext.Provider
      value={{
        mobileOpen,
        collapsed,
        openMobile,
        closeMobile,
        toggleMobile,
        toggleCollapsed,
      }}
    >
      <div
        className="min-h-[100dvh] bg-bg text-text-primary"
        style={{
          ["--admin-sidebar" as string]: collapsed ? "4.5rem" : "16.25rem",
        }}
      >
        <AdminSidebar />
        <AdminHeader />
        <main
          id="main"
          className="pt-16 min-h-[100dvh] bg-bg w-full px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8 lg:pl-[calc(var(--admin-sidebar)+2rem)]"
        >
          <div className="flex flex-col w-full max-w-[1440px] mx-auto min-w-0 gap-6">
            {children}
          </div>
        </main>
      </div>
    </AdminChromeContext.Provider>
  );
}
