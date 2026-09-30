"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Gift,
  Users,
  UserCheck,
  Megaphone,
  Settings,
  Infinity as InfinityIcon,
  Keyboard,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, shortcut: "Alt+1" },
  { label: "Rewards",   href: "/admin/rewards",   icon: Gift,             shortcut: "Alt+2" },
  { label: "Customers", href: "/admin/customers",  icon: Users,            shortcut: "Alt+3" },
  { label: "Staff",     href: "/admin/staff",      icon: UserCheck,        shortcut: "Alt+4" },
  { label: "Campaigns", href: "/admin/campaigns",  icon: Megaphone,        shortcut: "Alt+5" },
  { label: "Ranks",     href: "/admin/ranks",      icon: InfinityIcon,     shortcut: "Alt+6" },
  { label: "Settings",  href: "/admin/settings",   icon: Settings,         shortcut: "Alt+7" },
];

/**
 * AdminSidebar — CSS-only hover-expand sidebar.
 *
 * Collapsed = w-16 (4rem / 64px)  — icons only
 * Expanded  = w-60 (15rem / 240px) — icons + labels + shortcut badges
 *
 * `group/sidebar` named group on <aside> drives internal label/badge fade-in.
 * `peer` lets sibling header and main react via `peer-hover:` selectors.
 *
 * Keyboard navigation: Alt+1–7 navigates between sections.
 * Per Emil's framework — these are pressed tens of times/day, so the
 * navigation itself has NO animation (instant route change is correct).
 */
export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  // ── Keyboard shortcuts (Alt+1–7) ──────────────────────────────────────────
  // Emil's rule: "Never animate keyboard-initiated actions." Navigation is
  // instant on shortcut press — no transition, no delay.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only fire when Alt is held and a digit 1–7 is pressed
      if (!e.altKey || e.metaKey || e.ctrlKey) return;

      const index = parseInt(e.key, 10) - 1; // "1" → 0, "7" → 6
      if (index < 0 || index >= navItems.length) return;

      // Don't hijack Alt+key when focus is inside an input/textarea
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      e.preventDefault();
      router.push(navItems[index].href);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <aside
      id="admin-sidebar"
      aria-label="Admin navigation"
      // group/sidebar — named group so labels/badges inside react to this hover
      // peer          — lets sibling <header> and <main> react via peer-hover:
      className="group/sidebar peer fixed top-0 bottom-0 left-0 z-[50] flex flex-col select-none overflow-hidden bg-surface border-r border-border w-16 lg:hover:w-60 transition-[width] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
    >
      {/* ── Brand ──────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-3 h-16 shrink-0 border-b border-border">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shrink-0">
          <InfinityIcon className="w-5 h-5" />
        </div>

        {/* Brand label — fades in when sidebar is hovered */}
        <div className="flex flex-col min-w-0 whitespace-nowrap overflow-hidden opacity-0 lg:group-hover/sidebar:opacity-100 transition-opacity duration-200 delay-75">
          <span className="font-semibold text-sm text-text-primary leading-none">
            ABC Café
          </span>
          <span className="text-[10px] text-text-secondary mt-0.5 leading-none">
            Floor desk
          </span>
        </div>
      </div>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              title={`${item.label} (${item.shortcut})`}
              className={[
                "flex items-center gap-3 px-3 py-2.5 rounded-xl btn-press",
                "transition-colors duration-150",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-text-secondary hover:bg-surface-low hover:text-text-primary",
              ].join(" ")}
            >
              {/* Icon — always visible, centered when collapsed */}
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-primary" : ""}`} />

              {/* Label + shortcut badge row — fades in on sidebar hover */}
              <span
                className={[
                  "flex-1 flex items-center justify-between gap-2 min-w-0",
                  "opacity-0 lg:group-hover/sidebar:opacity-100",
                  "transition-opacity duration-150 delay-75",
                ].join(" ")}
              >
                <span
                  className={[
                    "text-sm whitespace-nowrap leading-none",
                    isActive ? "font-semibold" : "font-medium",
                  ].join(" ")}
                >
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
      <div className="border-t border-border px-3 py-3 shrink-0">
        {/* Keyboard hint — only visible when expanded */}
        <div className="flex items-center gap-2 px-1 mb-2.5 opacity-0 lg:group-hover/sidebar:opacity-100 transition-opacity duration-150 delay-75">
          <Keyboard className="w-3.5 h-3.5 text-text-secondary shrink-0" />
          <span className="text-[10px] text-text-secondary font-medium whitespace-nowrap">
            Alt+1–7 to navigate
          </span>
        </div>

        {/* User row */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold shrink-0 ring-2 ring-primary/20">
            A
          </div>
          <div className="min-w-0 whitespace-nowrap overflow-hidden opacity-0 lg:group-hover/sidebar:opacity-100 transition-opacity duration-150 delay-75">
            <p className="text-xs font-semibold text-text-primary leading-none">Admin User</p>
            <p className="text-[10px] text-text-secondary mt-0.5 leading-none">admin@abccafe.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
