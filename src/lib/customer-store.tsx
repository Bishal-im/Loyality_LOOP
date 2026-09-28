"use client";

/**
 * CustomerStore — single shared React context for the entire customer panel.
 * All pages read and mutate state through useCustomer().
 * No external state libraries needed — React context + useReducer is sufficient
 * for a PWA-style loyalty app with mock data.
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
} from "react";

// ─── Domain types ──────────────────────────────────────────────────────────────

export type RewardStatus = "unlocked" | "in_progress" | "locked";

export interface CustomerReward {
  id: string;
  perkLabel?: string;
  venueLabel: string;
  title: string;
  description: string;
  stampsRequired: number;
  currentStamps?: number;
  validUntil?: string;
  usageType?: string;
  tier?: string;
  image: string;
  status: RewardStatus;
  redeemedAt?: string; // ISO string when redeemed
}

export type ActivityType = "stamp" | "redeem" | "double_stamp";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  venue?: string;
  venueLocation?: string;
  datetime: string;
  approvedBy?: string;
  orderRef?: string;
  promoLabel?: string;
  passStatus?: string;
  passMax?: number;
  passStamped?: number;
  stampsToReward?: number;
  stampDelta: number;
  redeemCode?: string;
  redeemStatus?: string;
  hasReceipt?: boolean;
  receiptNote?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  type: "stamp" | "reward" | "promo" | "system";
}

export interface CustomerProfile {
  name: string;
  patronId: string;
  memberSince: string;
  email: string;
  phone: string;
  tier: string;
  tierLevel: number;
  avatarInitial: string;
}

export interface NotificationPrefs {
  stampUpdates: boolean;
  rewardAlerts: boolean;
  specialOffers: boolean;
}

// ─── State shape ───────────────────────────────────────────────────────────────

export interface CustomerState {
  profile: CustomerProfile;
  currentStamps: number;
  maxStamps: number;
  totalVisits: number;
  totalStamps: number;
  totalRewardsEarned: number;
  rewards: CustomerReward[];
  activity: ActivityItem[];
  notifications: NotificationItem[];
  notificationPrefs: NotificationPrefs;
  announcementText: string;
  announcementDismissed: boolean;
  isLoggedIn: boolean;
  /**
   * Google Review URL configured by the business admin.
   * Sourced from MOCK_BUSINESS_SETTINGS.google_review_url in production
   * this would come from the business config API.
   */
  googleReviewUrl: string;
  /**
   * Counts stamps since the last review prompt was shown.
   * We show the prompt every REVIEW_PROMPT_EVERY stamps (default: 3).
   * Starts at 0 so the first prompt fires after the 3rd stamp earned.
   */
  stampsSinceLastReviewPrompt: number;
}

// ─── Initial data ──────────────────────────────────────────────────────────────

const INITIAL_REWARDS: CustomerReward[] = [
  {
    id: "r1",
    status: "unlocked",
    perkLabel: "UNLOCKED PERK",
    venueLabel: "ARTISAN COFFEE MASTER",
    title: "Signature Pour-Over or Single Origin Flat White",
    description:
      "Savor any bespoke brew crafted by our resident barista with rare Gesha and Ethiopian heirloom beans.",
    stampsRequired: 10,
    validUntil: "Nov 30, 2025",
    usageType: "SINGLE-USE",
    image: "unlocked",
  },
  {
    id: "r2",
    status: "in_progress",
    venueLabel: "MORNING PARLOUR",
    title: "Artisan Bakery Basket & House Jam",
    description:
      "Freshly baked morning viennoiserie served with small-batch lavender fig preserve.",
    stampsRequired: 8,
    currentStamps: 7,
    image: "progress",
  },
  {
    id: "r3",
    status: "locked",
    venueLabel: "CUPPING ROOM",
    title: "Exclusive Cupping Tasting Session for Two",
    description:
      "A private 45-minute sensory exploration guided by Head Roaster Julian, exploring seasonal micro-lots.",
    stampsRequired: 20,
    tier: "Tier Master",
    image: "locked",
  },
];

const INITIAL_ACTIVITY: ActivityItem[] = [
  {
    id: "a1",
    type: "stamp",
    title: "Stamp Approved",
    venue: "ABC Café",
    venueLocation: "Downtown Roastery",
    datetime: "Today, 12:32 PM",
    approvedBy: "Approved by Staff",
    orderRef: "Order #4912",
    passStatus: "7/10 STAMPED",
    passStamped: 7,
    passMax: 10,
    stampsToReward: 3,
    stampDelta: 1,
  },
  {
    id: "a2",
    type: "redeem",
    title: "Artisan Croissant & Bat...",
    datetime: "Sep 22, 4:15 PM",
    redeemCode: "LOYAL-8X29K",
    redeemStatus: "Successfully Redeemed",
    hasReceipt: true,
    receiptNote: "Single-origin roast • Table 4 • Staff: Kiran A.",
    stampDelta: -10,
  },
  {
    id: "a3",
    type: "double_stamp",
    title: "Double Stamp Visit",
    venue: "Weekend Artisan Special",
    datetime: "Sep 20, 1:08 PM",
    approvedBy: "Approved by Barista Sarah",
    orderRef: "Order #4790",
    promoLabel: "Promo",
    passStatus: "6/10 STAMPED",
    passStamped: 6,
    passMax: 10,
    stampDelta: 2,
  },
  {
    id: "a4",
    type: "stamp",
    title: "Stamp Approved",
    venue: "Downtown Roastery",
    datetime: "Sep 14, 9:45 AM",
    approvedBy: "Self-check verification",
    stampDelta: 1,
  },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    type: "stamp",
    title: "Stamp Approved ✓",
    body: "You earned +1 stamp at ABC Café — Downtown Roastery.",
    time: "Today, 12:32 PM",
    read: false,
  },
  {
    id: "n2",
    type: "reward",
    title: "Reward Ready to Redeem 🎉",
    body: "Your Signature Pour-Over reward is ready. Show it to staff to redeem.",
    time: "Today, 10:00 AM",
    read: false,
  },
  {
    id: "n3",
    type: "promo",
    title: "Double Stamp Weekend",
    body: "Earn 2× stamps on every visit this weekend starting Friday. Don't miss it!",
    time: "Yesterday, 9:00 AM",
    read: true,
  },
  {
    id: "n4",
    type: "stamp",
    title: "+2 Stamps — Weekend Promo",
    body: "Double stamps applied on your Saturday visit. Keep it up!",
    time: "Sep 28, 1:08 PM",
    read: true,
  },
  {
    id: "n5",
    type: "system",
    title: "Welcome to Atelier Guild",
    body: "Your patron account is now active. Start collecting stamps today.",
    time: "Jan 15, 2024",
    read: true,
  },
];

const INITIAL_STATE: CustomerState = {
  profile: {
    name: "Binod Shrestha",
    patronId: "#AG-8829",
    memberSince: "Member Since: Jan 2024",
    email: "binod@example.com",
    phone: "+1 (555) 382-9362",
    tier: "Gold Patron",
    tierLevel: 2,
    avatarInitial: "B",
  },
  currentStamps: 7,
  maxStamps: 10,
  totalVisits: 38,
  totalStamps: 38,
  totalRewardsEarned: 4,
  rewards: INITIAL_REWARDS,
  activity: INITIAL_ACTIVITY,
  notifications: INITIAL_NOTIFICATIONS,
  notificationPrefs: {
    stampUpdates: true,
    rewardAlerts: true,
    specialOffers: false,
  },
  announcementText: "Double stamp weekend starting this Friday!",
  announcementDismissed: false,
  isLoggedIn: true,
  googleReviewUrl: "https://g.page/r/Cdf81Qk2LpABEAI/review",
  stampsSinceLastReviewPrompt: 2,
};

// ─── Review prompt frequency ──────────────────────────────────────────────────
/** Show the Google Review prompt after every Nth stamp earned. */
const REVIEW_PROMPT_EVERY = 3;

// ─── Actions ───────────────────────────────────────────────────────────────────

type Action =
  | { type: "ADD_STAMP" }
  | { type: "REDEEM_REWARD"; rewardId: string }
  | { type: "DISMISS_ANNOUNCEMENT" }
  | { type: "MARK_NOTIFICATION_READ"; id: string }
  | { type: "MARK_ALL_READ" }
  | { type: "SET_NOTIF_PREF"; key: keyof NotificationPrefs; value: boolean }
  | { type: "UPDATE_PROFILE"; patch: Partial<CustomerProfile> }
  | { type: "SET_LOGGED_IN"; value: boolean }
  | { type: "DISMISS_REVIEW_PROMPT" };

// ─── Reducer ───────────────────────────────────────────────────────────────────

function reducer(state: CustomerState, action: Action): CustomerState {
  switch (action.type) {
    case "ADD_STAMP": {
      const newStamps = Math.min(state.currentStamps + 1, state.maxStamps);
      const newTotal = state.totalStamps + 1;
      const newVisits = state.totalVisits + 1;

      // If hitting the max stamps, unlock the in-progress reward
      let newRewards = state.rewards.map((r) => {
        if (r.status === "in_progress" && newStamps >= r.stampsRequired) {
          return { ...r, status: "unlocked" as RewardStatus };
        }
        return r;
      });

      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const newActivity: ActivityItem = {
        id: `a${Date.now()}`,
        type: "stamp",
        title: "Stamp Approved",
        venue: "ABC Café",
        venueLocation: "Downtown Roastery",
        datetime: `Today, ${timeStr}`,
        approvedBy: "Approved by Staff",
        passStatus: `${newStamps}/10 STAMPED`,
        passStamped: newStamps,
        passMax: state.maxStamps,
        stampsToReward: state.maxStamps - newStamps,
        stampDelta: 1,
      };

      const newNotif: NotificationItem = {
        id: `n${Date.now()}`,
        type: "stamp",
        title: "Stamp Approved ✓",
        body: `You earned +1 stamp at ABC Café — Downtown Roastery.`,
        time: `Today, ${timeStr}`,
        read: false,
      };

      // Increment the review-prompt counter; reset to 0 when threshold is hit
      const nextCounter = state.stampsSinceLastReviewPrompt + 1;
      const counterAfterPrompt =
        nextCounter >= REVIEW_PROMPT_EVERY ? 0 : nextCounter;

      return {
        ...state,
        currentStamps: newStamps,
        totalStamps: newTotal,
        totalVisits: newVisits,
        rewards: newRewards,
        activity: [newActivity, ...state.activity],
        notifications: [newNotif, ...state.notifications],
        stampsSinceLastReviewPrompt: counterAfterPrompt,
      };
    }

    case "REDEEM_REWARD": {
      const now = new Date();
      const dateStr = now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      const timeStr = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const rewardToRedeem = state.rewards.find((r) => r.id === action.rewardId);

      const newActivity: ActivityItem = {
        id: `a${Date.now()}`,
        type: "redeem",
        title: rewardToRedeem?.title ?? "Reward Redeemed",
        datetime: `${dateStr}, ${timeStr}`,
        redeemCode: `LOYAL-${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        redeemStatus: "Successfully Redeemed",
        hasReceipt: true,
        receiptNote: `${rewardToRedeem?.title} • Staff verified`,
        stampDelta: -(rewardToRedeem?.stampsRequired ?? 10),
      };

      const newNotif: NotificationItem = {
        id: `n${Date.now()}`,
        type: "reward",
        title: "Reward Redeemed 🎊",
        body: `${rewardToRedeem?.title} was successfully redeemed.`,
        time: `Today, ${timeStr}`,
        read: false,
      };

      return {
        ...state,
        currentStamps: Math.max(
          state.currentStamps - (rewardToRedeem?.stampsRequired ?? 10),
          0
        ),
        totalRewardsEarned: state.totalRewardsEarned + 1,
        rewards: state.rewards.map((r) =>
          r.id === action.rewardId
            ? { ...r, status: "locked" as RewardStatus, redeemedAt: new Date().toISOString() }
            : r
        ),
        activity: [newActivity, ...state.activity],
        notifications: [newNotif, ...state.notifications],
      };
    }

    case "DISMISS_ANNOUNCEMENT":
      return { ...state, announcementDismissed: true };

    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.id ? { ...n, read: true } : n
        ),
      };

    case "MARK_ALL_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      };

    case "SET_NOTIF_PREF":
      return {
        ...state,
        notificationPrefs: {
          ...state.notificationPrefs,
          [action.key]: action.value,
        },
      };

    case "UPDATE_PROFILE":
      return {
        ...state,
        profile: { ...state.profile, ...action.patch },
      };

    case "DISMISS_REVIEW_PROMPT":
      // Reset counter so next cycle starts fresh
      return { ...state, stampsSinceLastReviewPrompt: 0 };

    case "SET_LOGGED_IN":
      return { ...state, isLoggedIn: action.value };

    default:
      return state;
  }
}

// ─── Context ───────────────────────────────────────────────────────────────────

interface CustomerContextValue {
  state: CustomerState;
  addStamp: () => void;
  redeemReward: (rewardId: string) => void;
  dismissAnnouncement: () => void;
  markNotificationRead: (id: string) => void;
  markAllRead: () => void;
  setNotifPref: (key: keyof NotificationPrefs, value: boolean) => void;
  updateProfile: (patch: Partial<CustomerProfile>) => void;
  logout: () => void;
  dismissReviewPrompt: () => void;
  unreadCount: number;
  /** True when the ADD_STAMP counter just hit the threshold — home page reads this */
  shouldShowReviewPrompt: boolean;
}

const CustomerContext = createContext<CustomerContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const addStamp           = useCallback(() => dispatch({ type: "ADD_STAMP" }), []);
  const redeemReward       = useCallback((id: string) => dispatch({ type: "REDEEM_REWARD", rewardId: id }), []);
  const dismissAnnouncement= useCallback(() => dispatch({ type: "DISMISS_ANNOUNCEMENT" }), []);
  const markNotificationRead = useCallback((id: string) => dispatch({ type: "MARK_NOTIFICATION_READ", id }), []);
  const markAllRead        = useCallback(() => dispatch({ type: "MARK_ALL_READ" }), []);
  const setNotifPref       = useCallback((key: keyof NotificationPrefs, value: boolean) => dispatch({ type: "SET_NOTIF_PREF", key, value }), []);
  const updateProfile      = useCallback((patch: Partial<CustomerProfile>) => dispatch({ type: "UPDATE_PROFILE", patch }), []);
  const logout             = useCallback(() => dispatch({ type: "SET_LOGGED_IN", value: false }), []);
  const dismissReviewPrompt= useCallback(() => dispatch({ type: "DISMISS_REVIEW_PROMPT" }), []);

  const unreadCount = state.notifications.filter((n) => !n.read).length;

  // The counter resets to 0 the moment it hits REVIEW_PROMPT_EVERY.
  // So shouldShowReviewPrompt is true only when the counter is exactly 0
  // AND at least one stamp has ever been earned (totalStamps > 0).
  // We use totalStamps % 3 === 0 as a reliable derived signal so it
  // doesn't depend on render timing.
  const REVIEW_PROMPT_EVERY = 3;
  const shouldShowReviewPrompt =
    state.totalStamps > 0 && state.stampsSinceLastReviewPrompt === 0;

  return (
    <CustomerContext.Provider
      value={{
        state,
        addStamp,
        redeemReward,
        dismissAnnouncement,
        markNotificationRead,
        markAllRead,
        setNotifPref,
        updateProfile,
        logout,
        dismissReviewPrompt,
        unreadCount,
        shouldShowReviewPrompt,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCustomer(): CustomerContextValue {
  const ctx = useContext(CustomerContext);
  if (!ctx) throw new Error("useCustomer must be used inside <CustomerProvider>");
  return ctx;
}
