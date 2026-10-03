"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Gift,
  Megaphone,
  UserCheck,
  Settings,
  Infinity as InfinityIcon,
  ChevronsUpDown,
  X,
} from "lucide-react";
import { UserProfileRow } from "./UserProfileRow";
import { useAdminChrome } from "./admin-chrome-context";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Customers",  href: "/admin/customers",  icon: Users },
  { label: "Rewards",    href: "/admin/rewards",    icon: Gift },
  { label: "Campaigns",  href: "/admin/campaigns",  icon: Megaphone },
  { label: "Staff",      href: "/admin/staff",      icon: UserCheck },
  { label: "Settings",   href: "/admin/settings",   icon: Settings },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { mobileOpen, closeMobile } = useAdminChrome();

  return (
    <>
      {/* Mobile backdrop */}
      <button
        type="button"
        aria-hidden={!mobileOpen}
        tabIndex={mobileOpen ? 0 : -1}
        className={`fixed inset-0 z-[45] bg-black/40 transition-[opacity,backdrop-filter] duration-200 lg:hidden ${
          mobileOpen
            ? "opacity-100 backdrop-blur-sm"
            : "opacity-0 backdrop-blur-none pointer-events-none"
        }`}
        onClick={closeMobile}
      />

      {/*
        Desktop: always-visible, fixed 240px wide.
        Mobile: slides in from left when mobileOpen=true.
      */}
      <aside
        id="admin-sidebar"
        aria-label="Admin navigation"
        className={`fixed top-0 bottom-0 left-0 z-[50] flex flex-col select-none overflow-hidden
          bg-white border-r border-[#E5E5E5] w-60
          transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* ── Brand Header ─────────────────────────── */}
        <div className="p-3.5 flex flex-col gap-3 shrink-0 border-b border-[#E5E5E5]">
          <div className="flex items-center gap-3">
            {/* Logo mark */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#18181B] to-[#27272A] flex items-center justify-center text-white shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.12)] border border-white/10">
              <InfinityIcon className="w-5 h-5 text-white" strokeWidth={1.5} />
            </div>
            <span className="font-semibold text-[15px] text-[#18181B] tracking-tight leading-none whitespace-nowrap">
              ABC Café
            </span>
            {/* Mobile close */}
            <button
              type="button"
              className="ml-auto lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-[#71717A] hover:bg-[#F4F4F5] btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
              onClick={closeMobile}
              aria-label="Close menu"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>

          {/* Business switcher */}
          <button
            type="button"
            className="w-full flex items-center justify-between px-3 py-2 bg-[#F4F4F5] hover:bg-[#E8EAED] rounded-[10px] border border-[#E5E5E5] transition-colors duration-150 text-left group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
            onClick={() => alert("Business switcher")}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-[#18181B] shrink-0" />
              <span className="text-xs font-semibold text-[#18181B] truncate">ABC Café</span>
            </div>
            <ChevronsUpDown
              className="w-3.5 h-3.5 text-[#71717A] group-hover:text-[#18181B] shrink-0"
              strokeWidth={1.5}
            />
          </button>
        </div>

        {/* ── Navigation ───────────────────────────── */}
        <nav className="flex-1 py-3 pr-2.5 space-y-0.5 overflow-y-auto overflow-x-hidden">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={item.label}
                onClick={closeMobile}
                className={[
                  "flex items-center gap-3 px-3.5 py-2.5 text-[13px] font-medium border-l-[3px] rounded-r-[8px] rounded-l-none transition-all duration-150 group/item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1",
                  isActive
                    ? "border-primary text-primary font-semibold bg-primary/[0.07]"
                    : "border-transparent text-[#71717A] hover:bg-[#F4F4F5]/80 hover:text-[#18181B]",
                ].join(" ")}
              >
                <Icon
                  className={`w-[18px] h-[18px] shrink-0 transition-colors duration-150 ${
                    isActive ? "text-primary" : "text-[#71717A] group-hover/item:text-[#18181B]"
                  }`}
                  strokeWidth={1.5}
                />
                <span className="whitespace-nowrap">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* ── Footer / User ─────────────────────────── */}
        <div className="border-t border-[#E5E5E5] p-3 shrink-0 bg-white">
          <UserProfileRow compact />
        </div>
      </aside>
    </>
  );
};
