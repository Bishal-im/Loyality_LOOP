"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Bell, ChevronRight } from "lucide-react";
import { useCustomer } from "@/lib/customer-store";

interface PageShellProps {
  /** Show a back-arrow instead of the brand name */
  back?: boolean;
  /** Where the back arrow navigates to (defaults to browser back) */
  backHref?: string;
  /** Override the page title shown in the centre (back-mode only) */
  title?: string;
  children: React.ReactNode;
  /** Hide the bottom padding (for pages that manage their own scroll) */
  noPadding?: boolean;
}

/**
 * Shared header shell for all secondary customer pages.
 * Primary pages (Home / Rewards / Activity / Profile) render their own
 * full Atelier-Guild header with the BottomTabBar — this shell is for
 * sub-pages (Notifications, Edit Profile, Tier, etc.)
 */
export function PageShell({ back, backHref, title, children, noPadding }: PageShellProps) {
  const router = useRouter();
  const { unreadCount } = useCustomer();

  const handleBack = () => {
    if (backHref) router.push(backHref);
    else router.back();
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--c-bg)", color: "var(--c-text-primary)" }}
    >
      {/* ── Header ── */}
      <header
        className="sticky top-0 z-40 w-full max-w-md mx-auto px-4 h-14 flex items-center justify-between"
        style={{ backgroundColor: "var(--c-bg)", borderBottom: "1px solid var(--c-border)" }}
      >
        {back ? (
          <button
            onClick={handleBack}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
            style={{ color: "var(--c-text-primary)" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--c-border)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "")}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-9" />
        )}

        {title && (
          <h1 className="text-[15px] font-bold" style={{ color: "var(--c-text-primary)" }}>
            {title}
          </h1>
        )}

        {/* Right: Bell */}
        <Link href="/notifications" className="relative w-9 h-9 flex items-center justify-center">
          <Bell className="w-5 h-5" style={{ color: "var(--c-text-primary)" }} />
          {unreadCount > 0 && (
            <span
              className="absolute top-1 right-1 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
              style={{ backgroundColor: "var(--c-terracotta)" }}
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Link>
      </header>

      {/* ── Content ── */}
      <main className={`flex-1 w-full max-w-md mx-auto ${noPadding ? "" : "px-4 py-4"} flex flex-col`}>
        {children}
      </main>
    </div>
  );
}

/** Reusable menu-style row with icon, label, subtitle, chevron */
export function MenuRow({
  icon,
  label,
  subtitle,
  onClick,
  href,
  danger,
  rightContent,
}: {
  icon: React.ReactNode;
  label: string;
  subtitle?: string;
  onClick?: () => void;
  href?: string;
  danger?: boolean;
  rightContent?: React.ReactNode;
}) {
  const inner = (
    <div className="flex items-center gap-4 px-4 py-4 w-full">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: danger ? "rgba(217,79,79,0.1)" : "var(--c-sage-light)" }}
      >
        {React.cloneElement(icon as React.ReactElement<{ style?: React.CSSProperties }>, {
          style: { color: danger ? "var(--c-alert)" : "var(--c-espresso)", width: 18, height: 18 },
        })}
      </div>
      <div className="flex-1 min-w-0 text-left">
        <p
          className="text-[15px] font-semibold"
          style={{ color: danger ? "var(--c-alert)" : "var(--c-text-primary)" }}
        >
          {label}
        </p>
        {subtitle && (
          <p className="text-[12px] mt-0.5" style={{ color: "var(--c-text-secondary)" }}>
            {subtitle}
          </p>
        )}
      </div>
      {rightContent ?? (
        <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "var(--c-text-muted)" }} />
      )}
    </div>
  );

  const cls = "w-full transition-colors";
  const hoverHandlers = {
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.backgroundColor = "var(--c-bg)"),
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) => (e.currentTarget.style.backgroundColor = ""),
  };

  if (href) {
    return (
      <Link href={href} className={cls} {...hoverHandlers}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick} {...hoverHandlers}>
      {inner}
    </button>
  );
}
