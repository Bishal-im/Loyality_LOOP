"use client";

import React, { createContext, useContext } from "react";

export interface AdminChromeValue {
  mobileOpen: boolean;
  collapsed: boolean;
  openMobile: () => void;
  closeMobile: () => void;
  toggleMobile: () => void;
  toggleCollapsed: () => void;
}

export const AdminChromeContext = createContext<AdminChromeValue | null>(null);

export function useAdminChrome() {
  const value = useContext(AdminChromeContext);
  if (!value) {
    throw new Error("useAdminChrome must be used inside AdminChrome");
  }
  return value;
}
