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
  X,
} from "lucide-react";
import { UserProfileRow } from "./UserProfileRow";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Rewards", href: "/admin/rewards", icon: Gift },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Staff", href: "/admin/staff", icon: UserCheck },
  { label: "Campaigns", href: "/admin/campaigns", icon: Megaphone },
  { label: "Ranks", href: "/admin/ranks", icon: InfinityIcon },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  return (
    <>
      <aside
        id="admin-sidebar"
        aria-label="Admin navigation"
        className="fixed top-0 bottom-0 left-0 z-[50] bg-surface border-r border-border flex flex-col select-none w-[16.25rem] lg:w-[4.5rem] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group"
      >
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-bg shrink-0">
              <InfinityIcon className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0 group-hover:hidden">
              <span className="font-display text-base font-medium text-text-primary tracking-tight leading-none">
                ABC Café
              </span>
              <span className="label-over mt-1.5">Floor desk</span>
            </div>
            <div className="hidden group-hover:flex items-center justify-center w-full">
              <InfinityIcon className="w-5 h-5 text-text-primary" />
            </div>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-between px-3 py-2 bg-surface-low hover:bg-surface-inset rounded-xl border border-border transition-colors text-left group lg:hidden"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span className="text-xs font-semibold text-text-primary truncate">ABC Café</span>
            </div>
            <div className="w-4 h-4 text-text-secondary" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-colors text-xs btn-press lg:justify-center lg:px-0 ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-text-secondary hover:bg-surface-low hover:text-text-primary font-medium"
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-primary" : "text-sage"}`} />
                <span className="truncate group-hover:hidden">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-border bg-surface">
          <div className="hidden group-hover:block">
            <UserProfileRow compact />
          </div>
        </div>
      </aside>
    </>
  );
};
