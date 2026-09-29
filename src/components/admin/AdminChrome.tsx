"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-[100dvh] bg-bg text-text-primary">
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
  );
}
