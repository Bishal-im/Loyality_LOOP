"use client";

import React from "react";
import { Bell, Check, Star, Gift, Zap, Info } from "lucide-react";
import { PageShell } from "@/components/customer/PageShell";
import { useCustomer, NotificationItem } from "@/lib/customer-store";

function NotifIcon({ type }: { type: NotificationItem["type"] }) {
  const styles: Record<NotificationItem["type"], { bg: string; color: string; icon: React.ReactNode }> = {
    stamp:  { bg: "var(--c-gold-light)",  color: "var(--c-gold)",      icon: <Star className="w-4 h-4 fill-current" /> },
    reward: { bg: "var(--c-sage-light)",  color: "var(--c-sage)",      icon: <Gift className="w-4 h-4" /> },
    promo:  { bg: "var(--c-banner-bg)",   color: "var(--c-gold)",      icon: <Zap  className="w-4 h-4 fill-current" /> },
    system: { bg: "var(--c-bg)",          color: "var(--c-text-muted)",icon: <Info className="w-4 h-4" /> },
  };
  const s = styles[type];
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ backgroundColor: s.bg, color: s.color }}>
      {s.icon}
    </div>
  );
}

export default function NotificationsPage() {
  const { state, markNotificationRead, markAllRead } = useCustomer();
  const { notifications } = state;
  const unread = notifications.filter(n => !n.read).length;

  return (
    <PageShell back title="Notifications">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-[10px] font-semibold tracking-widest uppercase" style={{ color: "var(--c-text-muted)" }}>
            Your Alerts
          </p>
          <h2 className="text-[20px] font-bold" style={{ color: "var(--c-text-primary)" }}>Notifications</h2>
        </div>
        {unread > 0 && (
          <button onClick={markAllRead}
            className="flex items-center gap-1.5 text-[12px] font-semibold px-3 py-1.5 rounded-full"
            style={{ backgroundColor: "var(--c-sage-light)", color: "var(--c-sage)" }}>
            <Check className="w-3.5 h-3.5" /> Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-3 py-16">
          <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--c-bg)" }}>
            <Bell className="w-6 h-6" style={{ color: "var(--c-text-muted)" }} />
          </div>
          <p className="text-[14px] font-semibold" style={{ color: "var(--c-text-secondary)" }}>All caught up!</p>
          <p className="text-[12px] text-center" style={{ color: "var(--c-text-muted)" }}>No notifications yet. Earn stamps to get started.</p>
        </div>
      ) : (
        <div className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}>
          {notifications.map((notif, idx) => (
            <button key={notif.id} onClick={() => markNotificationRead(notif.id)}
              className="w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors"
              style={{
                backgroundColor: notif.read ? "" : "rgba(217,164,65,0.04)",
                borderBottom: idx < notifications.length - 1 ? "1px solid var(--c-border)" : "none",
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--c-bg)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = notif.read ? "" : "rgba(217,164,65,0.04)")}>
              <NotifIcon type={notif.type} />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[13px] font-semibold leading-tight" style={{ color: "var(--c-text-primary)" }}>{notif.title}</p>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full flex-shrink-0 mt-1" style={{ backgroundColor: "var(--c-terracotta)" }} />
                  )}
                </div>
                <p className="text-[11px] mt-0.5 leading-relaxed" style={{ color: "var(--c-text-secondary)" }}>{notif.body}</p>
                <p className="text-[10px] mt-1" style={{ color: "var(--c-text-muted)" }}>{notif.time}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </PageShell>
  );
}
