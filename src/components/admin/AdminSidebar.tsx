"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Gift,
  Users,
  UserCheck,
  Megaphone,
  Settings,
  Infinity as InfinityIcon,
  ChevronsUpDown,
} from "lucide-react";
import { UserProfileRow } from "./UserProfileRow";

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Rewards", href: "/admin/rewards", icon: Gift },
    { label: "Customers", href: "/admin/customers", icon: Users },
    { label: "Staff", href: "/admin/staff", icon: UserCheck },
    { label: "Campaigns", href: "/admin/campaigns", icon: Megaphone },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <aside className="fixed top-0 left-0 bottom-0 w-[260px] bg-white border-r border-[#E4E4E7] flex flex-col z-30 select-none">
      <div className="p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1C7C54] flex items-center justify-center text-white shadow-xs">
            <InfinityIcon className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base text-[#1C1C1E] tracking-tight leading-none">
              LoyalLoop
            </span>
            <span className="text-[10px] text-[#6E6E73] tracking-wider uppercase mt-1 font-medium">
              Admin Engine
            </span>
          </div>
        </div>

        <div>
          <button
            type="button"
            className="w-full flex items-center justify-between px-3 py-2 bg-[#F2F2F5] hover:bg-[#E4E4E7] rounded-xl border border-[#E4E4E7] transition-colors text-left group"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#1C7C54] flex-shrink-0" />
              <span className="text-xs font-semibold text-[#1C1C1E] truncate">
                ABC Café
              </span>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-[#6E6E73] group-hover:text-[#1C1C1E] transition-colors" />
          </button>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-colors text-xs ${
                isActive
                  ? "bg-[#1C7C54]/10 text-[#1C7C54] font-semibold"
                  : "text-[#6E6E73] hover:bg-[#F2F2F5] hover:text-[#1C1C1E] font-medium"
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-[#1C7C54]" : "text-[#6E6E73]"}`} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#E4E4E7] bg-white">
        <UserProfileRow />
      </div>
    </aside>
  );
};

