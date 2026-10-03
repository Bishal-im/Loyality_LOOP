"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const breadcrumbMap: Record<string, string> = {
  "/admin/rewards": "Rewards",
  "/admin/customers": "Customers",
  "/admin/staff": "Staff",
  "/admin/campaigns": "Campaigns",
  "/admin/settings": "Settings",
};

export const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();

  // Remove "Home > Dashboard" breadcrumb from header
  if (pathname === "/admin/dashboard" || pathname === "/admin") {
    return null;
  }

  const currentSection = breadcrumbMap[pathname] || "Admin";

  return (
    <nav className="flex items-center gap-2 text-xs text-[#71717A]">
      <Link
        href="/admin/dashboard"
        className="hover:text-[#18181B] transition-colors"
      >
        Home
      </Link>
      <ChevronRight className="w-3.5 h-3.5" strokeWidth={1.5} />
      <span className="text-[#18181B] font-medium">{currentSection}</span>
    </nav>
  );
};
