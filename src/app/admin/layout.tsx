import React from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F2F2F5] text-[#1C1C1E]">
      <AdminSidebar />
      <AdminHeader />
      <main className="pl-[260px] pt-16 min-h-screen bg-[#F2F2F5] px-8 py-8 w-full">
        <div className="flex flex-col w-full max-w-[1440px] mx-auto min-w-0 gap-6">
          {children}
        </div>
      </main>
    </div>
  );
}

