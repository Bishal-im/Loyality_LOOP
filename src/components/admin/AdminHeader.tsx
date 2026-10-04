"use client";

import React, { useState } from "react";
import { Search, Bell, HelpCircle, Menu, X } from "lucide-react";
import { UserProfileRow } from "./UserProfileRow";
import { Breadcrumbs } from "./Breadcrumbs";
import { useAdminChrome } from "./admin-chrome-context";
import { DemoIndicator } from "./DemoIndicator";

export const AdminHeader: React.FC = () => {
  const { toggleMobile } = useAdminChrome();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  return (
    <>
      <header className="fixed top-0 right-0 left-0 lg:left-60 h-16 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] z-[40] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <button
            type="button"
            onClick={toggleMobile}
            className="lg:hidden p-2 rounded-xl text-[#71717A] hover:bg-[#F4F4F5] hover:text-[#18181B] btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" strokeWidth={1.5} />
          </button>

          <div className="hidden lg:flex items-center gap-3">
            <Breadcrumbs />
            <DemoIndicator />
          </div>

          <div className="relative w-full max-w-[400px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" strokeWidth={1.5} />
            <input
              type="search"
              placeholder="Search customers, rewards, or staff..."
              className="w-full pl-9 pr-3 py-2 bg-[#F4F4F5] border border-[#E5E5E5] rounded-xl text-xs text-[#18181B] placeholder:text-[#71717A] focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              disabled
              title="Search not connected in this prototype"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Open notifications"
            aria-expanded={showNotifications}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[#71717A] hover:bg-[#F4F4F5] hover:text-[#18181B] relative btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Bell className="w-4 h-4" strokeWidth={1.5} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-white" />
          </button>

          <button
            type="button"
            onClick={() => setShowQuickActions(!showQuickActions)}
            aria-label="Quick actions menu"
            aria-expanded={showQuickActions}
            className="hidden sm:flex w-9 h-9 rounded-xl items-center justify-center text-[#71717A] hover:bg-[#F4F4F5] hover:text-[#18181B] btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <HelpCircle className="w-4 h-4" strokeWidth={1.5} />
          </button>

          <div className="hidden md:block h-5 w-px bg-[#E5E5E5]" />

          <UserProfileRow compact />
        </div>
      </header>

      {/* Notifications Modal */}
      {showNotifications && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-[60]"
            onClick={() => setShowNotifications(false)}
          />
          <div className="fixed top-20 right-4 sm:right-6 lg:right-8 w-[340px] bg-white rounded-2xl shadow-lg border border-[#E5E5E5] z-[70] overflow-hidden">
            <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#18181B]">Notifications — Demo Only</h3>
              <button
                onClick={() => setShowNotifications(false)}
                className="p-1 rounded-lg hover:bg-[#F4F4F5] btn-press"
                aria-label="Close notifications"
              >
                <X className="w-4 h-4 text-[#71717A]" />
              </button>
            </div>
            <div className="p-4 max-h-[400px] overflow-y-auto">
              <div className="flex flex-col gap-3">
                <div className="p-3 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5]">
                  <div className="flex items-start gap-2">
                    <Bell className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-[#18181B] mb-1">
                        Sample Notification
                      </p>
                      <p className="text-[11px] text-[#71717A] leading-relaxed">
                        This feature would show alerts about customer activity, milestone unlocks, and system updates.
                      </p>
                      <p className="text-[10px] text-[#A1A1AA] mt-2">Just now</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 text-center text-xs text-[#71717A]">
                  <p>In production, you'd see:</p>
                  <ul className="mt-2 text-[11px] space-y-1 text-left list-disc list-inside">
                    <li>Customer milestone unlocks</li>
                    <li>Reward redemptions</li>
                    <li>Campaign performance alerts</li>
                    <li>System updates</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Quick Actions Modal */}
      {showQuickActions && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-[60]"
            onClick={() => setShowQuickActions(false)}
          />
          <div className="fixed top-20 right-4 sm:right-6 lg:right-8 w-[280px] bg-white rounded-2xl shadow-lg border border-[#E5E5E5] z-[70] overflow-hidden">
            <div className="p-4 border-b border-[#E5E5E5] flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[#18181B]">Quick Actions — Demo</h3>
              <button
                onClick={() => setShowQuickActions(false)}
                className="p-1 rounded-lg hover:bg-[#F4F4F5] btn-press"
                aria-label="Close quick actions"
              >
                <X className="w-4 h-4 text-[#71717A]" />
              </button>
            </div>
            <div className="p-2">
              <button
                disabled
                className="w-full p-3 rounded-xl hover:bg-[#F4F4F5] text-left transition-colors opacity-60 cursor-not-allowed"
              >
                <p className="text-xs font-medium text-[#18181B]">Export Data</p>
                <p className="text-[10px] text-[#71717A] mt-0.5">Not available in prototype</p>
              </button>
              <button
                disabled
                className="w-full p-3 rounded-xl hover:bg-[#F4F4F5] text-left transition-colors opacity-60 cursor-not-allowed"
              >
                <p className="text-xs font-medium text-[#18181B]">Generate Report</p>
                <p className="text-[10px] text-[#71717A] mt-0.5">Not available in prototype</p>
              </button>
              <button
                disabled
                className="w-full p-3 rounded-xl hover:bg-[#F4F4F5] text-left transition-colors opacity-60 cursor-not-allowed"
              >
                <p className="text-xs font-medium text-[#18181B]">System Settings</p>
                <p className="text-[10px] text-[#71717A] mt-0.5">Not available in prototype</p>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};
