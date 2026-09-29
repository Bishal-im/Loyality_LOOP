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
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { UserProfileRow } from "./UserProfileRow";
import { useAdminChrome } from "./admin-chrome-context";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Rewards", href: "/admin/rewards", icon: Gift },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Staff", href: "/admin/staff", icon: UserCheck },
  { label: "Campaigns", href: "/admin/campaigns", icon: Megaphone },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { mobileOpen, collapsed, closeMobile, toggleCollapsed } = useAdminChrome();
  const compact = collapsed;

  return (
    <>
      <button
        type="button"
        aria-hidden={!mobileOpen}
        tabIndex={mobileOpen ? 0 : -1}
        className={`admin-scrim fixed inset-0 z-[45] bg-primary-deep/40 lg:hidden ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMobile}
      />

      <aside
        id="admin-sidebar"
        aria-label="Admin navigation"
        className={`admin-drawer admin-rail fixed top-0 bottom-0 left-0 z-[50] bg-surface border-r border-border flex flex-col select-none ${
          compact ? "lg:w-[4.5rem]" : "lg:w-[16.25rem]"
        } w-[min(16.25rem,88vw)] ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className={`p-4 flex flex-col gap-4 ${compact ? "lg:px-2 lg:items-center" : ""}`}>
          <div className={`flex items-center gap-2.5 ${compact ? "lg:justify-center" : ""}`}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-bg shrink-0">
              <InfinityIcon className="w-5 h-5" />
            </div>
            <div className={`flex flex-col min-w-0 ${compact ? "lg:hidden" : ""}`}>
              <span className="font-display text-base font-semibold text-text-primary tracking-tight leading-none">
                ABC Café
              </span>
            </div>
            <button
              type="button"
              className="ml-auto lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-text-secondary hover:bg-surface-low btn-press"
              onClick={closeMobile}
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            className={`w-full flex items-center justify-between px-3 py-2 bg-surface-low hover:bg-surface-inset rounded-xl border border-border transition-colors text-left group ${
              compact ? "lg:px-0 lg:justify-center" : ""
            }`}
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span className={`text-xs font-semibold text-text-primary truncate ${compact ? "lg:hidden" : ""}`}>
                ABC Café
              </span>
            </div>
            <ChevronsUpDown className={`w-4 h-4 text-text-secondary group-hover:text-text-primary ${compact ? "lg:hidden" : ""}`} />
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
                className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-colors text-xs btn-press ${
                  compact ? "lg:justify-center lg:px-0" : ""
                } ${
                  isActive
                    ? "bg-primary/10 text-primary font-bold shadow-xs"
                    : "text-text-secondary hover:bg-surface-low hover:text-text-primary font-medium"
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-primary" : "text-text-secondary"}`} strokeWidth={2} />
                <span className={`truncate ${compact ? "lg:hidden" : ""}`}>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={`p-3 border-t border-border bg-surface ${compact ? "lg:px-2" : ""}`}>
          <button
            type="button"
            onClick={toggleCollapsed}
            className="hidden lg:flex w-full items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-text-secondary hover:bg-surface-low hover:text-text-primary btn-press mb-2"
            aria-pressed={collapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-4 h-4 mx-auto" />
            ) : (
              <>
                <PanelLeftClose className="w-4 h-4" />
                <span>Collapse</span>
              </>
            )}
          </button>
          <div className={compact ? "lg:hidden" : ""}>
            <UserProfileRow />
          </div>
          {compact ? (
            <div className="hidden lg:flex justify-center">
              <UserProfileRow compact />
            </div>
          ) : null}
        </div>
      </aside>
    </>
  );
};
