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

const defaultValue: AdminChromeValue = {
  mobileOpen: false,
  collapsed: false,
  openMobile: () => {},
  closeMobile: () => {},
  toggleMobile: () => {},
  toggleCollapsed: () => {},
};

export const AdminChromeContext = createContext<AdminChromeValue>(defaultValue);

export function useAdminChrome() {
  const value = useContext(AdminChromeContext);
  return value || defaultValue;
}

