"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const breadcrumbMap: Record<string, string> = {
  "/admin/dashboard": "Dashboard",
  "/admin/rewards": "Rewards",
  "/admin/customers": "Customers",
  "/admin/staff": "Staff",
  "/admin/campaigns": "Campaigns",
  "/admin/ranks": "Ranks",
  "/admin/settings": "Settings",
};

export const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();

  const currentSection = breadcrumbMap[pathname] || "Admin";

  return (
    <nav className="flex items-center gap-2 text-xs text-text-secondary">
      <Link
        href="/admin/dashboard"
        className="hover:text-primary transition-colors"
      >
        Home
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="text-text-primary font-medium">{currentSection}</span>
    </nav>
  );
};
