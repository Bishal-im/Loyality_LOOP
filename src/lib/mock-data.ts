export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  joinedDate: string;
  totalVisits: number;
  currentStamps: number;
  maxStamps: number;
  rewardsEarned: number;
  lastVisit: string;
  status: 'Active' | 'Inactive';
  avatar?: string;
  notes?: string;
}

export interface Campaign {
  id: string;
  title: string;
  type: string;
  status: 'Active' | 'Scheduled' | 'Ended' | 'Draft';
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
  category: 'Beverage' | 'Food' | 'Discount' | 'Special';
  status: 'Active' | 'Paused' | 'Draft';
  totalRedeemed: number;
  expiryDays: number;
}

export interface StaffMember {
  id: string;
  name: string;
  role: 'Store Manager' | 'Shift Supervisor' | 'Barista / Cashier' | 'Staff';
  email: string;
  phone: string;
  pin: string;
  status: 'Active' | 'Inactive';
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

export const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "cust_101",
    name: "Aarav Sharma",
    phone: "+977 9841234567",
    email: "aarav.sharma@example.com",
    joinedDate: "15 Jan 2024",
    totalVisits: 18,
    currentStamps: 8,
    maxStamps: 10,
    rewardsEarned: 3,
    lastVisit: "Today, 11:30 AM",
    status: "Active",
    notes: "Prefers oat milk latte."
  },
  {
    id: "cust_102",
    name: "Sriya Shrestha",
    phone: "+977 9801987654",
    email: "sriya.s@example.com",
    joinedDate: "20 Feb 2024",
    totalVisits: 12,
    currentStamps: 4,
    maxStamps: 10,
    rewardsEarned: 1,
    lastVisit: "Yesterday, 4:15 PM",
    status: "Active"
  },
  {
    id: "cust_103",
    name: "Rohan Gurung",
    phone: "+977 9811122334",
    email: "rohan.g@example.com",
    joinedDate: "02 Mar 2024",
    totalVisits: 25,
    currentStamps: 10,
    maxStamps: 10,
    rewardsEarned: 4,
    lastVisit: "24 Sep 2024",
    status: "Active"
  },
  {
    id: "cust_104",
    name: "Ananya Thapa",
    phone: "+977 9855566778",
    email: "ananya.t@example.com",
    joinedDate: "10 Apr 2024",
    totalVisits: 6,
    currentStamps: 2,
    maxStamps: 10,
    rewardsEarned: 0,
    lastVisit: "20 Sep 2024",
    status: "Active"
  },
  {
    id: "cust_105",
    name: "Bikash Tamang",
    phone: "+977 9866677889",
    email: "bikash.t@example.com",
    joinedDate: "01 May 2024",
    totalVisits: 2,
    currentStamps: 1,
    maxStamps: 10,
    rewardsEarned: 0,
    lastVisit: "10 Aug 2024",
    status: "Inactive"
  }
];

export const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "camp_01",
    title: "Double Stamp Tuesday",
    type: "Multiplier",
    status: "Active",
    startDate: "01 Sep 2024",
    endDate: "30 Nov 2024",
    targetAudience: "All Customers",
    reachCount: 450,
    redemptionCount: 128,
    description: "Earn 2 stamps on every visit every Tuesday!"
  },
  {
    id: "camp_02",
    title: "Dashain Special Offer",
    type: "Bonus Reward",
    status: "Active",
    startDate: "15 Sep 2024",
    endDate: "15 Oct 2024",
    targetAudience: "VIP Customers (10+ Visits)",
    reachCount: 120,
    redemptionCount: 42,
    description: "Free specialty appetizer on 5th visit."
  },
  {
    id: "camp_03",
    title: "Welcome Back Bonus",
    type: "Re-engagement",
    status: "Draft",
    startDate: "01 Oct 2024",
    endDate: "31 Oct 2024",
    targetAudience: "Inactive (>30 days)",
    reachCount: 85,
    redemptionCount: 0,
    description: "Get 1 bonus stamp when you visit after 30 days."
  }
];

export const MOCK_REWARDS: Reward[] = [
  {
    id: "rew_01",
    title: "Free Veg Momo",
    description: "Complimentary plate of steamed veg momos.",
    stampsRequired: 10,
    category: "Food",
    status: "Active",
    totalRedeemed: 142,
    expiryDays: 30
  },
  {
    id: "rew_02",
    title: "NPR 500 Discount Voucher",
    description: "Flat NPR 500 off on total bill of NPR 1500+.",
    stampsRequired: 10,
    category: "Discount",
    status: "Active",
    totalRedeemed: 89,
    expiryDays: 14
  },
  {
    id: "rew_03",
    title: "Free Specialty Coffee / Tea",
    description: "Any hot or iced specialty coffee beverage.",
    stampsRequired: 5,
    category: "Beverage",
    status: "Active",
    totalRedeemed: 215,
    expiryDays: 30
  }
];

export const MOCK_STAFF: StaffMember[] = [
  {
    id: "staff_01",
    name: "Sarah K.",
    role: "Store Manager",
    email: "sarah.k@abccafe.com",
    phone: "+977 9801122334",
    pin: "4821",
    status: "Active",
    totalScans: 412,
    lastActive: "Today, 12:45 PM"
  },
  {
    id: "staff_02",
    name: "Kiran Adhikari",
    role: "Barista / Cashier",
    email: "kiran.a@abccafe.com",
    phone: "+977 9802233445",
    pin: "1192",
    status: "Active",
    totalScans: 289,
    lastActive: "Today, 11:15 AM"
  },
  {
    id: "staff_03",
    name: "Pooja Roy",
    role: "Shift Supervisor",
    email: "pooja.r@abccafe.com",
    phone: "+977 9803344556",
    pin: "3309",
    status: "Active",
    totalScans: 178,
    lastActive: "Yesterday"
  }
];

export const MOCK_BUSINESS_SETTINGS: BusinessSettings = {
  businessName: "ABC Café",
  tagline: "Artisanal Coffee & Fresh Eats",
  phone: "+977 1 4412345",
  email: "contact@abccafe.com",
  address: "Jhamsikhel Road, Ward 3",
  city: "Lalitpur",
  country: "Nepal",
  currency: "NPR",
  stampsPerCard: 10,
  businessHours: "Mon - Sun: 7:30 AM - 9:30 PM",
  logoUrl: "/logo-placeholder.svg"
};
