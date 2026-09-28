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

/**
 * Calculate next birthday from date of birth
 */
export function getNextBirthday(dob: string | Date): Date {
  const birthDate = new Date(dob);
  const today = new Date();
  const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  
  // If birthday has passed this year, add one year
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  
  return nextBirthday;
}

/**
 * Check if it's a customer's birthday today
 */
export function isBirthdayToday(dob: string | Date): boolean {
  const birthDate = new Date(dob);
  const today = new Date();
  
  return (
    birthDate.getMonth() === today.getMonth() &&
    birthDate.getDate() === today.getDate()
  );
}

/**
 * Get days until next birthday
 */
export function getDaysUntilBirthday(dob: string | Date): number {
  const nextBirthday = getNextBirthday(dob);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  nextBirthday.setHours(0, 0, 0, 0);
  
  const diffTime = nextBirthday.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays;
}

/**
 * Generate birthday event for a customer
 */
export function generateBirthdayEvent(customer: {
  id: string;
  name: string;
  phone: string;
  dob?: string;
}): BirthdayEvent | null {
  if (!customer.dob) return null;

  const nextBirthday = getNextBirthday(customer.dob);
  const daysUntil = getDaysUntilBirthday(customer.dob);

  // Only create event if birthday is coming up within 7 days or today
  if (daysUntil > 7) return null;

  const celebrationType: BirthdayEvent["celebrationType"] = 
    daysUntil === 0 ? "free_treat" : "special_offer";

  return {
    id: `bday_${customer.id}_${nextBirthday.getFullYear()}`,
    customerId: customer.id,
    customerName: customer.name,
    customerPhone: customer.phone,
    customerDob: customer.dob,
    nextBirthday,
    notificationSent: false,
    createdAt: new Date(),
    status: "pending",
    celebrationType,
    customMessage: daysUntil === 0 
      ? `Happy Birthday, ${customer.name}! Here's a free treat on us.` 
      : `Don't forget, ${customer.name}'s birthday is approaching!`
  };
}

/**
 * Get upcoming birthdays from customer list
 */
export function getUpcomingBirthdays(customers: Array<{ id: string; name: string; phone: string; dob?: string }>): BirthdayEvent[] {
  const events: BirthdayEvent[] = [];

  for (const customer of customers) {
    const event = generateBirthdayEvent(customer);
    if (event) {
      events.push(event);
    }
  }

  // Sort by next birthday date
  return events.sort((a, b) => a.nextBirthday.getTime() - b.nextBirthday.getTime());
}

/**
 * Get today's birthday customers
 */
export function getTodayBirthdays(customers: Array<{ id: string; name: string; phone: string; dob?: string }>): BirthdayEvent[] {
  return customers
    .filter(customer => customer.dob && isBirthdayToday(customer.dob))
    .map(customer => ({
      id: `bday_${customer.id}_${new Date().getFullYear()}`,
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerDob: customer.dob,
      nextBirthday: new Date(),
      notificationSent: false,
      createdAt: new Date(),
      status: "celebrated",
      celebrationType: "free_treat",
      customMessage: `Happy Birthday, ${customer.name}!`
    }));
}
