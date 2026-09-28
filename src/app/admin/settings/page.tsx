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
  MessageSquareQuote
} from "lucide-react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "business" | "loyalty" | "ranks" | "verification" | "notifications"
  >("business");

  // Form State
  const [businessName, setBusinessName] = useState("ABC Café");
  const [address, setAddress] = useState("Jhamsikhel, Lalitpur, Nepal");
  const [phone, setPhone] = useState("9801234567");
  const [instagram, setInstagram] = useState("@abccafe");
  const [facebook, setFacebook] = useState("facebook.com/abccafe");
  const [website, setWebsite] = useState("https://abccafe.com");
  const [googleReview, setGoogleReview] = useState(
    "https://g.page/r/Cdf81Qk2LpABEAI/review"
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Business settings saved successfully!");
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto gap-6">
      {/* 1. Page Header */}
      <div className="flex flex-col">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1D2925] tracking-tight">
          Settings
        </h1>
        <p className="text-xs text-[#718078] mt-1 font-medium">
          Manage your business profile, location anchors, and public communication touchpoints
        </p>
      </div>

      {/* 2. Tab Navigation Bar */}
      <div className="flex items-center gap-6 border-b border-[#E4E2DD] overflow-x-auto select-none -mx-4 px-4 sm:mx-0 sm:px-0">
        <button
          onClick={() => setActiveTab("business")}
          type="button"
          className={`flex items-center gap-2 pb-3 text-xs transition-colors border-b-2 whitespace-nowrap ${
            activeTab === "business"
              ? "border-[#173F35] text-[#173F35] font-bold"
              : "border-transparent text-[#718078] hover:text-[#1D2925] font-medium"
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Business</span>
        </button>

        <button
          onClick={() => setActiveTab("loyalty")}
          type="button"
          className={`flex items-center gap-2 pb-3 text-xs transition-colors border-b-2 whitespace-nowrap ${
            activeTab === "loyalty"
              ? "border-[#173F35] text-[#173F35] font-bold"
              : "border-transparent text-[#718078] hover:text-[#1D2925] font-medium"
          }`}
        >
          <Monitor className="w-4 h-4 text-[#718078]" />
          <span>Loyalty Program</span>
        </button>

        <button
          onClick={() => setActiveTab("verification")}
          type="button"
          className={`flex items-center gap-2 pb-3 text-xs transition-colors border-b-2 whitespace-nowrap ${
            activeTab === "verification"
              ? "border-[#173F35] text-[#173F35] font-bold"
              : "border-transparent text-[#718078] hover:text-[#1D2925] font-medium"
          }`}
        >
          <Shield className="w-4 h-4 text-[#718078]" />
          <span>Verification & Fraud</span>
        </button>

        <button
          onClick={() => setActiveTab("notifications")}
          type="button"
          className={`flex items-center gap-2 pb-3 text-xs transition-colors border-b-2 whitespace-nowrap ${
            activeTab === "notifications"
              ? "border-[#173F35] text-[#173F35] font-bold"
              : "border-transparent text-[#718078] hover:text-[#1D2925] font-medium"
          }`}
        >
          <Bell className="w-4 h-4 text-[#718078]" />
          <span>Notifications</span>
        </button>
      </div>

      {/* 3. Business Tab Content Container */}
      {activeTab === "business" && (
        <form
          onSubmit={handleSave}
          className="bg-white rounded-2xl shadow-sm border border-[#E4E2DD] p-6 flex flex-col gap-6"
        >
          {/* SECTION 1: Store Identity */}
          <div className="flex flex-col md:flex-row gap-6 pb-6 border-b border-[#E4E2DD]">
            <div className="w-full md:w-1/3 flex flex-col">
              <h2 className="text-base font-bold text-[#1D2925]">
                Store Identity
              </h2>
              <p className="text-xs text-[#718078] mt-1 font-medium leading-relaxed">
                Essential commercial name and emblem displayed across receipts, digital passes, and customer mobile apps.
              </p>
            </div>

            <div className="w-full md:w-2/3 flex flex-col gap-5">
              {/* Business Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider">
                  BUSINESS NAME
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F5F3EE] text-[#1D2925] text-xs font-semibold rounded-xl border border-[#E4E2DD] focus:outline-none focus:border-[#173F35] focus:bg-white transition-colors"
                />
                <span className="text-[11px] text-[#718078] font-medium">
                  Shown to customers across the app.
                </span>
              </div>

              {/* Store Logo */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider">
                  STORE LOGO
                </label>
                <div className="flex items-center gap-4">
                  {/* Logo Preview Circle */}
                  <div className="w-12 h-12 rounded-full bg-[#F8F6F1] border border-[#E4E2DD] flex items-center justify-center text-xs font-bold text-[#173F35] shadow-xs flex-shrink-0">
                    ABC
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => alert("Upload logo")}
                      className="px-3 py-1.5 bg-[#F8F6F1] hover:bg-[#E4E2DD] text-[#173F35] text-xs font-bold rounded-lg transition-colors inline-flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Change logo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => alert("Remove logo")}
                      className="text-xs font-semibold text-[#718078] hover:text-[#1D2925] transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <span className="text-[11px] text-[#718078] font-medium mt-1">
                  PNG or JPG up to 2MB. Square 1:1 ratio recommended.
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 2: Physical & Direct Contact */}
          <div className="flex flex-col md:flex-row gap-6 pb-6 border-b border-[#E4E2DD]">
            <div className="w-full md:w-1/3 flex flex-col">
              <h2 className="text-base font-bold text-[#1D2925]">
                Physical & Direct Contact
              </h2>
              <p className="text-xs text-[#718078] mt-1 font-medium leading-relaxed">
                Geographic coordinates and phone channels for customer visit verification and staff escalation.
              </p>
            </div>

            <div className="w-full md:w-2/3 flex flex-col gap-5">
              {/* Physical Location */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider">
                  PHYSICAL LOCATION / ADDRESS
                </label>
                <div className="relative flex items-center">
                  <MapPin className="w-4 h-4 absolute left-3 text-[#718078] pointer-events-none" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-[#F5F3EE] text-[#1D2925] text-xs font-semibold rounded-xl border border-[#E4E2DD] focus:outline-none focus:border-[#173F35] focus:bg-white transition-colors"
                  />
                </div>
              </div>

              {/* Contact Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider">
                  CONTACT PHONE
                </label>
                <div className="flex items-center rounded-xl border border-[#E4E2DD] bg-[#F5F3EE] overflow-hidden focus-within:border-[#173F35] focus-within:bg-white transition-colors">
                  <div className="px-3.5 py-2.5 bg-[#F8F6F1] border-r border-[#E4E2DD] text-xs font-bold text-[#1D2925] select-none flex items-center">
                    +977
                  </div>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2.5 bg-transparent text-[#1D2925] text-xs font-semibold focus:outline-none"
                  />
                </div>
                <span className="text-[11px] text-[#718078] font-medium">
                  Used for customer support and account verification.
                </span>
              </div>
            </div>
          </div>

          {/* SECTION 3: Social Links */}
          <div className="flex flex-col md:flex-row gap-6 pb-6 border-b border-[#E4E2DD]">
            <div className="w-full md:w-1/3 flex flex-col">
              <h2 className="text-base font-bold text-[#1D2925]">
                Social Links
              </h2>
              <p className="text-xs text-[#718078] mt-1 font-medium leading-relaxed">
                Target profile endpoints linked inside loyalty confirmation summaries and member portals.
              </p>
            </div>

            <div className="w-full md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Instagram */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider flex items-center gap-1">
                  <AtSign className="w-3 h-3 text-[#718078]" />
                  INSTAGRAM
                </label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F5F3EE] text-[#1D2925] text-xs font-semibold rounded-xl border border-[#E4E2DD] focus:outline-none focus:border-[#173F35] focus:bg-white transition-colors"
                />
              </div>

              {/* Facebook */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider flex items-center gap-1">
                  <Share2 className="w-3 h-3 text-[#718078]" />
                  FACEBOOK
                </label>
                <input
                  type="text"
                  value={facebook}
                  onChange={(e) => setFacebook(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F5F3EE] text-[#1D2925] text-xs font-semibold rounded-xl border border-[#E4E2DD] focus:outline-none focus:border-[#173F35] focus:bg-white transition-colors"
                />
              </div>

              {/* Website */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider flex items-center gap-1">
                  <Globe className="w-3 h-3 text-[#718078]" />
                  WEBSITE
                </label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F5F3EE] text-[#1D2925] text-xs font-semibold rounded-xl border border-[#E4E2DD] focus:outline-none focus:border-[#173F35] focus:bg-white transition-colors"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: Reputation & Feedback */}
          <div className="flex flex-col md:flex-row gap-6 pb-2">
            <div className="w-full md:w-1/3 flex flex-col">
              <h2 className="text-base font-bold text-[#1D2925]">
                Reputation & Feedback
              </h2>
              <p className="text-xs text-[#718078] mt-1 font-medium leading-relaxed">
                Routing link dispatched to VIP and repeated guests after reward claim milestones.
              </p>
            </div>

            <div className="w-full md:w-2/3 flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider">
                GOOGLE REVIEW LINK
              </label>
              <div className="relative flex items-center">
                <MessageSquareQuote className="w-4 h-4 absolute left-3 text-[#718078] pointer-events-none" />
                <input
                  type="text"
                  value={googleReview}
                  onChange={(e) => setGoogleReview(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F5F3EE] text-[#1D2925] text-xs font-semibold rounded-xl border border-[#E4E2DD] focus:outline-none focus:border-[#173F35] focus:bg-white transition-colors"
                />
              </div>
              <span className="text-[11px] text-[#718078] font-medium">
                Guests are invited to leave a review after a positive visit.
              </span>
            </div>
          </div>

          {/* FOOTER ACTIONS ROW */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E4E2DD]">
            <button
              type="button"
              onClick={() => alert("Changes discarded")}
              className="px-4 py-2 bg-[#F8F6F1] hover:bg-[#E4E2DD] text-[#1D2925] rounded-xl text-xs font-semibold transition-colors border border-transparent"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 bg-[#173F35] hover:bg-[#002920] text-white rounded-xl text-xs font-bold transition-colors shadow-sm inline-flex items-center gap-1.5"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      )}

      {/* 4. Stub Tabs */}
      {activeTab === "loyalty" && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-[#E4E2DD] text-center">
          <Monitor className="w-10 h-10 text-[#718078] mx-auto mb-3" />
          <h2 className="text-base font-bold text-[#1D2925] mb-1">
            Loyalty Program Configuration
          </h2>
          <p className="text-xs text-[#718078] font-medium">
            Settings pending — tab stub active for future configuration options.
          </p>
        </div>
      )}

      {activeTab === "verification" && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-[#E4E2DD] text-center">
          <Shield className="w-10 h-10 text-[#718078] mx-auto mb-3" />
          <h2 className="text-base font-bold text-[#1D2925] mb-1">
            Verification & Fraud Prevention
          </h2>
          <p className="text-xs text-[#718078] font-medium">
            Settings pending — tab stub active for future configuration options.
          </p>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-[#E4E2DD] text-center">
          <Bell className="w-10 h-10 text-[#718078] mx-auto mb-3" />
          <h2 className="text-base font-bold text-[#1D2925] mb-1">
            Notification Rules
          </h2>
          <p className="text-xs text-[#718078] font-medium">
            Settings pending — tab stub active for future configuration options.
          </p>
        </div>
      )}
    </div>
  );
}

