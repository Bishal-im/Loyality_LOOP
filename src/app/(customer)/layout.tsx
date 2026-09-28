import { CustomerProvider } from "@/lib/customer-store";
import { ReactNode } from "react";

/**
 * Customer-panel route group layout.
 * All routes under /(customer)/... share this provider.
 * The route group (customer) is transparent to the URL —
 * routes are still /home, /rewards, /activity, /profile etc.
 */
export default function CustomerLayout({ children }: { children: ReactNode }) {
  return <CustomerProvider>{children}</CustomerProvider>;
}
