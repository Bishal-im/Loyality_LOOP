export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  dob?: string;
  joinedDate: string;
  totalVisits: number;
  currentStamps: number;
  maxStamps: number;
  rewardsEarned: number;
  lastVisit: string;
  status: "Active" | "Inactive";
  rank?: "Bronze" | "Silver" | "Gold" | "Platinum";
  avatar?: string;
  notes?: string;
}

export interface Campaign {
  id: string;
  title: string;
  type: string;
  status: "Active" | "Scheduled" | "Ended" | "Draft";
  startDate: string;
  endDate: string;
  targetAudience: string;
  reachCount: number;
  redemptionCount: number;
  description: string;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  stampsRequired: number;
  category: "Beverage" | "Food" | "Discount" | "Special";
  status: "Active" | "Paused" | "Draft";
  totalRedeemed: number;
  expiryDays: number;
}

export interface StaffMember {
  id: string;
  name: string;
  role: "Store Manager" | "Shift Supervisor" | "Barista / Cashier" | "Staff";
  email: string;
  phone: string;
  pin: string;
  status: "Active" | "Inactive";
  totalScans: number;
  lastActive: string;
}

export interface BusinessSettings {
  businessName: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  country: string;
  currency: string;
  stampsPerCard: number;
  businessHours: string;
  logoUrl?: string;
}

export interface Rank {
  id: string;
  name: string;
  minStamps: number;
  color: string;
  icon?: string;
  description?: string;
  benefits?: string[];
}

export interface BirthdayEvent {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerDob: string;
  nextBirthday: Date;
  notificationSent: boolean;
  createdAt: Date;
  status: "pending" | "celebrated" | "missed";
  celebrationType?: "free_treat" | "discount" | "special_offer" | "custom";
  customMessage?: string;
}
