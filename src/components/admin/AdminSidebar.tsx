"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Gift,
  Megaphone,
  Award,
  UserCheck,
  Settings,
  Infinity as InfinityIcon,
  ChevronsUpDown,
  Keyboard,
  X,
} from "lucide-react";
import { UserProfileRow } from "./UserProfileRow";
import { useAdminChrome } from "./admin-chrome-context";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, shortcut: "Alt+1" },
  { label: "Customers", href: "/admin/customers", icon: Users, shortcut: "Alt+2" },
  { label: "Rewards", href: "/admin/rewards", icon: Gift, shortcut: "Alt+3" },
  { label: "Campaigns", href: "/admin/campaigns", icon: Megaphone, shortcut: "Alt+4" },
  { label: "Ranks", href: "/admin/ranks", icon: Award, shortcut: "Alt+5" },
  { label: "Staff", href: "/admin/staff", icon: UserCheck, shortcut: "Alt+6" },
  { label: "Settings", href: "/admin/settings", icon: Settings, shortcut: "Alt+7" },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { mobileOpen, closeMobile } = useAdminChrome();

  // Keyboard shortcut listener (Alt+1 through Alt+7)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        const activeEl = document.activeElement;
        const isInput =
          activeEl instanceof HTMLInputElement ||
          activeEl instanceof HTMLTextAreaElement ||
          (activeEl as HTMLElement)?.isContentEditable;

        if (isInput) return;

        const num = parseInt(e.key, 10);
        if (num >= 1 && num <= navItems.length) {
          e.preventDefault();
          const target = navItems[num - 1];
          if (target) {
            router.push(target.href);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <>
      {/* Mobile backdrop scrim */}
      <button
        type="button"
        aria-hidden={!mobileOpen}
        tabIndex={mobileOpen ? 0 : -1}
        className={`fixed inset-0 z-[45] bg-c-espresso/40 transition-[opacity,backdrop-filter] duration-200 lg:hidden ${
          mobileOpen ? "opacity-100 backdrop-blur-sm" : "opacity-0 backdrop-blur-none pointer-events-none"
        }`}
        onClick={closeMobile}
      />

      <aside
        id="admin-sidebar"
        aria-label="Admin navigation"
        className={`peer group/sidebar fixed top-0 bottom-0 left-0 z-[50] flex flex-col select-none overflow-hidden bg-surface border-r border-border transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          mobileOpen
            ? "translate-x-0 w-60"
            : "-translate-x-full lg:translate-x-0 lg:w-16 lg:hover:w-60"
        }`}
      >
        {/* ── Brand & Location Header ────────────────────────────────────────────── */}
        <div className="p-3.5 flex flex-col gap-3 shrink-0 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-bg shrink-0 shadow-sm">
              <InfinityIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col min-w-0 whitespace-nowrap opacity-0 lg:group-hover/sidebar:opacity-100 transition-opacity duration-150 delay-75">
              <span className="font-display text-base font-semibold text-text-primary tracking-tight leading-none">
                ABC Café
              </span>
              <span className="text-[11px] text-text-secondary mt-1 font-medium leading-none">
                Floor desk
              </span>
            </div>
            <button
              type="button"
              className="ml-auto lg:hidden w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:bg-surface-low btn-press"
              onClick={closeMobile}
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-between px-2.5 py-1.5 bg-surface-low hover:bg-surface-mid rounded-xl border border-border/80 transition-colors text-left group shrink-0"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              <span className="text-xs font-semibold text-text-primary truncate whitespace-nowrap opacity-0 lg:group-hover/sidebar:opacity-100 transition-opacity duration-150 delay-75">
                ABC Café
              </span>
            </div>
            <ChevronsUpDown className="w-3.5 h-3.5 text-text-secondary group-hover:text-text-primary shrink-0 opacity-0 lg:group-hover/sidebar:opacity-100 transition-opacity duration-150 delay-75" />
          </button>
        </div>

        {/* ── Navigation Items ─────────────────────────────────────────────────── */}
        <nav className="flex-1 px-2.5 py-3 space-y-1 overflow-y-auto overflow-x-hidden">
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
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs btn-press",
                  "transition-colors duration-150",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-text-secondary hover:bg-surface-low hover:text-text-primary font-medium",
                ].join(" ")}
              >
                {/* Icon — always visible */}
                <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-primary" : ""}`} />

                {/* Label + shortcut badge row — fades in when expanded */}
                <span
                  className={[
                    "flex-1 flex items-center justify-between gap-2 min-w-0",
                    "opacity-0 lg:group-hover/sidebar:opacity-100",
                    "transition-opacity duration-150 delay-75",
                  ].join(" ")}
                >
                  <span className="text-xs whitespace-nowrap leading-none">
                    {item.label}
                  </span>

                  {/* Shortcut badge */}
                  <kbd className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-surface-low border border-border text-[10px] text-text-secondary font-mono tracking-tight shrink-0">
                    {item.shortcut}
                  </kbd>
                </span>
              </Link>
            );
          })}
        </nav>

        {/* ── Footer ─────────────────────────────────────────────────────────── */}
        <div className="border-t border-border px-3 py-3 shrink-0 bg-surface">
          {/* Keyboard hint — visible when expanded */}
          <div className="flex items-center gap-2 px-1 mb-2.5 opacity-0 lg:group-hover/sidebar:opacity-100 transition-opacity duration-150 delay-75">
            <Keyboard className="w-3.5 h-3.5 text-text-secondary shrink-0" />
            <span className="text-[10px] text-text-secondary font-medium whitespace-nowrap">
              Alt+1–7 to navigate
            </span>
          </div>

          {/* User profile row */}
          <div className="flex items-center justify-between min-w-0">
            <UserProfileRow compact />
          </div>
        </div>
      </aside>
    </>
  );
};
