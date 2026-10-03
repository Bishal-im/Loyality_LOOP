"use client";

import React, { useState } from "react";
import {
  Store,
  Monitor,
  Shield,
  Bell,
  MapPin,
  Upload,
  Check,
  Globe,
  AtSign,
  Share2,
  MessageSquareQuote,
  ChevronRight,
  ToggleLeft,
  ToggleRight,
  Zap,
  Hash,
  Clock,
} from "lucide-react";

type TabId = "business" | "loyalty" | "verification" | "notifications";

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "business", label: "Business", icon: Store },
  { id: "loyalty", label: "Loyalty Program", icon: Monitor },
  { id: "verification", label: "Verification", icon: Shield },
  { id: "notifications", label: "Notifications", icon: Bell },
];

function FieldGroup({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.06em]">{label}</label>
      {children}
      {hint && <span className="text-[11px] text-[#71717A] font-normal">{hint}</span>}
    </div>
  );
}

function SectionRow({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row gap-6 py-6 border-b border-[#E5E5E5] last:border-b-0">
      <div className="w-full md:w-72 shrink-0 flex flex-col gap-1">
        <h3 className="text-[14px] font-semibold text-[#18181B]">{title}</h3>
        <p className="text-xs text-[#71717A] font-normal leading-relaxed">{description}</p>
      </div>
      <div className="flex-1 flex flex-col gap-5">{children}</div>
    </div>
  );
}

function ToggleRow({ label, description, on, onToggle }: { label: string; description: string; on: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-[#E5E5E5] last:border-b-0">
      <div className="flex flex-col min-w-0">
        <span className="text-[13px] font-medium text-[#18181B]">{label}</span>
        <span className="text-[11px] text-[#71717A] font-normal mt-0.5">{description}</span>
      </div>
      <button
        type="button" onClick={onToggle}
        className={`relative inline-flex h-6 w-10 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${on ? "bg-primary" : "bg-[#E5E5E5]"}`}
      >
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition duration-200 ${on ? "translate-x-4" : "translate-x-0"}`} />
      </button>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("business");

  // Business
  const [businessName, setBusinessName] = useState("ABC Café");
  const [address, setAddress] = useState("Jhamsikhel, Lalitpur, Nepal");
  const [phone, setPhone] = useState("9801234567");
  const [instagram, setInstagram] = useState("@abccafe");
  const [facebook, setFacebook] = useState("facebook.com/abccafe");
  const [website, setWebsite] = useState("https://abccafe.com");
  const [googleReview, setGoogleReview] = useState("https://g.page/r/Cdf81Qk2LpABEAI/review");
  const [saved, setSaved] = useState(false);

  // Loyalty
  const [stampsPerVisit, setStampsPerVisit] = useState(1);
  const [expiryDays, setExpiryDays] = useState(365);
  const [allowMultiplePerDay, setAllowMultiplePerDay] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(true);
  const [birthdayBonus, setBirthdayBonus] = useState(true);

  // Verification
  const [requirePhoneVerify, setRequirePhoneVerify] = useState(true);
  const [fraudThreshold, setFraudThreshold] = useState(3);
  const [lockAfterFraud, setLockAfterFraud] = useState(true);
  const [auditLog, setAuditLog] = useState(true);

  // Notifications
  const [stampNotif, setStampNotif] = useState(true);
  const [rewardUnlockNotif, setRewardUnlockNotif] = useState(true);
  const [expiryWarningNotif, setExpiryWarningNotif] = useState(true);
  const [campaignNotif, setCampaignNotif] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputClass = "w-full px-3.5 py-2.5 bg-[#F4F4F5] text-[#18181B] text-xs rounded-xl border border-[#E5E5E5] focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all";

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-6">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-[24px] font-semibold text-[#18181B] tracking-tight leading-tight">Settings</h1>
          <p className="text-[14px] font-normal text-[#71717A] mt-0.5">Configure your business profile, loyalty rules, and notification preferences</p>
        </div>
      </div>

      {/* 2. Tab Navigation */}
      <div className="bg-white rounded-[16px] border border-[#E5E5E5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] p-1 flex gap-1 w-full sm:w-auto sm:self-start overflow-x-auto">
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id} type="button" onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${isActive ? "bg-[#18181B] text-white shadow-xs" : "text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5]"}`}
            >
              <Icon className="w-4 h-4" strokeWidth={1.5} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. TAB: Business */}
      {activeTab === "business" && (
        <form onSubmit={handleSave} className="bg-white rounded-[16px] border border-[#E5E5E5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all px-6 flex flex-col">
          <SectionRow title="Store Identity" description="Business name and logo displayed across receipts, digital passes, and customer apps.">
            <FieldGroup label="BUSINESS NAME" hint="Shown to customers across the app and on their loyalty pass.">
              <input type="text" value={businessName} onChange={e => setBusinessName(e.target.value)} className={inputClass} />
            </FieldGroup>
            <FieldGroup label="STORE LOGO" hint="PNG or JPG up to 2 MB. Square 1:1 ratio recommended.">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#18181B] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">ABC</div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => alert("Upload logo")} className="px-3 py-2 bg-[#F4F4F5] hover:bg-[#E8EAED] text-[#18181B] text-xs font-medium rounded-xl border border-[#E5E5E5] transition-colors inline-flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5" strokeWidth={1.5} /><span>Change logo</span>
                  </button>
                  <button type="button" onClick={() => alert("Remove logo")} className="text-xs font-medium text-[#71717A] hover:text-[#18181B] transition-colors">Remove</button>
                </div>
              </div>
            </FieldGroup>
          </SectionRow>

          <SectionRow title="Physical & Contact" description="Geographic address and phone channels for visit verification and staff escalation.">
            <FieldGroup label="PHYSICAL ADDRESS">
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" strokeWidth={1.5} />
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} className={`${inputClass} pl-10`} />
              </div>
            </FieldGroup>
            <FieldGroup label="CONTACT PHONE" hint="Used for customer support and account verification.">
              <div className="flex items-center rounded-xl border border-[#E5E5E5] bg-[#F4F4F5] overflow-hidden focus-within:border-primary focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <div className="px-3.5 py-2.5 bg-white border-r border-[#E5E5E5] text-xs font-semibold text-[#18181B] select-none">+977</div>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full px-3.5 py-2.5 bg-transparent text-[#18181B] text-xs focus:outline-none" />
              </div>
            </FieldGroup>
          </SectionRow>

          <SectionRow title="Social Links" description="Profile endpoints linked inside loyalty summaries and member portals.">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FieldGroup label="INSTAGRAM">
                <div className="relative">
                  <AtSign className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" strokeWidth={1.5} />
                  <input type="text" value={instagram} onChange={e => setInstagram(e.target.value)} className={`${inputClass} pl-10`} />
                </div>
              </FieldGroup>
              <FieldGroup label="FACEBOOK">
                <div className="relative">
                  <Share2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" strokeWidth={1.5} />
                  <input type="text" value={facebook} onChange={e => setFacebook(e.target.value)} className={`${inputClass} pl-10`} />
                </div>
              </FieldGroup>
              <FieldGroup label="WEBSITE">
                <div className="relative">
                  <Globe className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" strokeWidth={1.5} />
                  <input type="text" value={website} onChange={e => setWebsite(e.target.value)} className={`${inputClass} pl-10`} />
                </div>
              </FieldGroup>
            </div>
          </SectionRow>

          <SectionRow title="Reputation & Feedback" description="Review link sent to VIP and repeat guests after reaching reward milestones.">
            <FieldGroup label="GOOGLE REVIEW LINK" hint="Guests are invited to leave a review after a positive visit.">
              <div className="relative">
                <MessageSquareQuote className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" strokeWidth={1.5} />
                <input type="text" value={googleReview} onChange={e => setGoogleReview(e.target.value)} className={`${inputClass} pl-10`} />
              </div>
            </FieldGroup>
          </SectionRow>

          {/* Footer */}
          <div className="flex items-center justify-between py-5 border-t border-[#E5E5E5]">
            <button type="button" onClick={() => alert("Changes discarded")} className="px-4 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#71717A] text-xs font-medium hover:bg-[#E8EAED] hover:text-[#18181B] transition-colors">Discard</button>
            <button
              type="submit"
              className={`btn-press px-5 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${saved ? "bg-[#137333] text-white" : "bg-primary hover:bg-primary-hover text-white"}`}
            >
              {saved ? <><Check className="w-4 h-4" strokeWidth={2} /><span>Saved!</span></> : <><Check className="w-4 h-4" strokeWidth={2} /><span>Save Changes</span></>}
            </button>
          </div>
        </form>
      )}

      {/* 4. TAB: Loyalty Program */}
      {activeTab === "loyalty" && (
        <div className="bg-white rounded-[16px] border border-[#E5E5E5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all px-6 flex flex-col">
          <SectionRow title="Stamp Rules" description="How visits are counted and stamps are earned.">
            <FieldGroup label="STAMPS PER VISIT" hint="Number of stamps a customer earns per qualifying visit.">
              <div className="relative w-40">
                <Hash className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" strokeWidth={1.5} />
                <input type="number" min={1} max={10} value={stampsPerVisit} onChange={e => setStampsPerVisit(Number(e.target.value))} className={`${inputClass} pl-10 w-40`} />
              </div>
            </FieldGroup>
            <div className="bg-[#F4F4F5] rounded-xl border border-[#E5E5E5] overflow-hidden divide-y divide-[#E5E5E5]">
              <ToggleRow label="Allow multiple stamps per day" description="Customers can earn stamps on more than one visit per calendar day" on={allowMultiplePerDay} onToggle={() => setAllowMultiplePerDay(!allowMultiplePerDay)} />
              <ToggleRow label="Show progress bar on customer pass" description="Display a visual progress indicator toward the next reward" on={showProgressBar} onToggle={() => setShowProgressBar(!showProgressBar)} />
              <ToggleRow label="Birthday bonus stamp" description="Automatically award a bonus stamp on the customer's birthday" on={birthdayBonus} onToggle={() => setBirthdayBonus(!birthdayBonus)} />
            </div>
          </SectionRow>

          <SectionRow title="Stamp Expiry" description="When unused stamps expire and reset.">
            <FieldGroup label="STAMP VALIDITY (days)" hint="Stamps older than this will expire and be removed from the customer's balance.">
              <div className="relative w-40">
                <Clock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" strokeWidth={1.5} />
                <input type="number" min={30} max={730} value={expiryDays} onChange={e => setExpiryDays(Number(e.target.value))} className={`${inputClass} pl-10 w-40`} />
              </div>
            </FieldGroup>
          </SectionRow>

          <div className="flex items-center justify-end py-5 border-t border-[#E5E5E5]">
            <button type="button" onClick={() => alert("Loyalty settings saved!")} className="btn-press px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              <Check className="w-4 h-4" strokeWidth={2} /><span>Save Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. TAB: Verification */}
      {activeTab === "verification" && (
        <div className="bg-white rounded-[16px] border border-[#E5E5E5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all px-6 flex flex-col">
          <SectionRow title="Customer Verification" description="How customers prove identity during enrollment and stamp collection.">
            <div className="bg-[#F4F4F5] rounded-xl border border-[#E5E5E5] overflow-hidden divide-y divide-[#E5E5E5]">
              <ToggleRow label="Require phone verification on signup" description="New customers must verify their phone number with a one-time code before earning stamps" on={requirePhoneVerify} onToggle={() => setRequirePhoneVerify(!requirePhoneVerify)} />
              <ToggleRow label="Lock account after suspected fraud" description="Auto-freeze accounts that exceed the suspicious activity threshold" on={lockAfterFraud} onToggle={() => setLockAfterFraud(!lockAfterFraud)} />
              <ToggleRow label="Maintain owner audit log" description="Record all redemption events and system access in an exportable owner-only log" on={auditLog} onToggle={() => setAuditLog(!auditLog)} />
            </div>
          </SectionRow>

          <SectionRow title="Fraud Thresholds" description="Limits before the system flags or locks suspicious accounts.">
            <FieldGroup label="MAX REDEMPTIONS PER DAY (per account)" hint="Accounts exceeding this limit will be flagged for review.">
              <div className="relative w-40">
                <Zap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" strokeWidth={1.5} />
                <input type="number" min={1} max={20} value={fraudThreshold} onChange={e => setFraudThreshold(Number(e.target.value))} className={`${inputClass} pl-10 w-40`} />
              </div>
            </FieldGroup>
          </SectionRow>

          <div className="flex items-center justify-end py-5 border-t border-[#E5E5E5]">
            <button type="button" onClick={() => alert("Verification settings saved!")} className="btn-press px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              <Check className="w-4 h-4" strokeWidth={2} /><span>Save Changes</span>
            </button>
          </div>
        </div>
      )}

      {/* 6. TAB: Notifications */}
      {activeTab === "notifications" && (
        <div className="bg-white rounded-[16px] border border-[#E5E5E5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all px-6 flex flex-col">
          <SectionRow title="Customer Notifications" description="Control which push/SMS notifications customers receive from your loyalty program.">
            <div className="bg-[#F4F4F5] rounded-xl border border-[#E5E5E5] overflow-hidden divide-y divide-[#E5E5E5]">
              <ToggleRow label="Stamp earned confirmation" description="Notify customer each time a stamp is added to their card" on={stampNotif} onToggle={() => setStampNotif(!stampNotif)} />
              <ToggleRow label="Reward unlocked" description="Notify customer when they hit a milestone and unlock a new reward" on={rewardUnlockNotif} onToggle={() => setRewardUnlockNotif(!rewardUnlockNotif)} />
              <ToggleRow label="Stamp expiry warning" description="Send a reminder 7 days before stamps are set to expire" on={expiryWarningNotif} onToggle={() => setExpiryWarningNotif(!expiryWarningNotif)} />
              <ToggleRow label="Campaign & promotional messages" description="Allow campaign messages to be sent to targeted customer segments" on={campaignNotif} onToggle={() => setCampaignNotif(!campaignNotif)} />
            </div>
          </SectionRow>

          <SectionRow title="Owner Reports" description="Scheduled digests sent directly to the owner account.">
            <div className="bg-[#F4F4F5] rounded-xl border border-[#E5E5E5] overflow-hidden">
              <ToggleRow label="Weekly performance digest" description="Receive a Sunday summary of visits, redemptions, and at-risk segments" on={weeklyDigest} onToggle={() => setWeeklyDigest(!weeklyDigest)} />
            </div>
          </SectionRow>

          <div className="flex items-center justify-end py-5 border-t border-[#E5E5E5]">
            <button type="button" onClick={() => alert("Notification settings saved!")} className="btn-press px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold transition-colors flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2">
              <Check className="w-4 h-4" strokeWidth={2} /><span>Save Changes</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
