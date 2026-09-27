"use client";

import React, { useState } from "react";
import { Building, Award, Bell, ShieldCheck, Save } from "lucide-react";
import { MOCK_BUSINESS_SETTINGS } from "@/lib/mock-data";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "business" | "loyalty" | "notifications" | "security"
  >("business");

  const [form, setForm] = useState(MOCK_BUSINESS_SETTINGS);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Business settings saved successfully!");
  };

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Header Row */}
      <div>
        <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight">
          Settings
        </h1>
        <p className="text-xs text-[#6E6E73] mt-0.5">
          Manage business profile, loyalty rules, and administrative preferences
        </p>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-2 border-b border-[#E4E4E7]">
        <button
          onClick={() => setActiveTab("business")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === "business"
              ? "border-[#1C7C54] text-[#1C7C54]"
              : "border-transparent text-[#6E6E73] hover:text-[#1C1C1E]"
          }`}
        >
          <Building className="w-4 h-4" />
          <span>Business Profile</span>
        </button>

        <button
          onClick={() => setActiveTab("loyalty")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === "loyalty"
              ? "border-[#1C7C54] text-[#1C7C54]"
              : "border-transparent text-[#6E6E73] hover:text-[#1C1C1E]"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Loyalty Rules</span>
        </button>

        <button
          onClick={() => setActiveTab("notifications")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === "notifications"
              ? "border-[#1C7C54] text-[#1C7C54]"
              : "border-transparent text-[#6E6E73] hover:text-[#1C1C1E]"
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>Notifications</span>
        </button>

        <button
          onClick={() => setActiveTab("security")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === "security"
              ? "border-[#1C7C54] text-[#1C7C54]"
              : "border-transparent text-[#6E6E73] hover:text-[#1C1C1E]"
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Security & Access</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === "business" && (
        <form
          onSubmit={handleSave}
          className="bg-white rounded-2xl p-6 shadow-sm border border-[#E4E4E7] flex flex-col gap-6 max-w-3xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#1C1C1E]">
                Business Name
              </label>
              <input
                type="text"
                value={form.businessName}
                onChange={(e) => handleChange("businessName", e.target.value)}
                className="px-3.5 py-2 bg-[#F2F2F5] border border-[#E4E4E7] rounded-xl text-xs text-[#1C1C1E] focus:outline-none focus:border-[#1C7C54]"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#1C1C1E]">
                Tagline / Slogan
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={(e) => handleChange("tagline", e.target.value)}
                className="px-3.5 py-2 bg-[#F2F2F5] border border-[#E4E4E7] rounded-xl text-xs text-[#1C1C1E] focus:outline-none focus:border-[#1C7C54]"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#1C1C1E]">
                Contact Phone
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="px-3.5 py-2 bg-[#F2F2F5] border border-[#E4E4E7] rounded-xl text-xs text-[#1C1C1E] focus:outline-none focus:border-[#1C7C54]"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#1C1C1E]">
                Support Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="px-3.5 py-2 bg-[#F2F2F5] border border-[#E4E4E7] rounded-xl text-xs text-[#1C1C1E] focus:outline-none focus:border-[#1C7C54]"
              />
            </div>

            <div className="flex flex-col space-y-1.5 md:col-span-2">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#1C1C1E]">
                Store Address
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className="px-3.5 py-2 bg-[#F2F2F5] border border-[#E4E4E7] rounded-xl text-xs text-[#1C1C1E] focus:outline-none focus:border-[#1C7C54]"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#1C1C1E]">
                City / Region
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="px-3.5 py-2 bg-[#F2F2F5] border border-[#E4E4E7] rounded-xl text-xs text-[#1C1C1E] focus:outline-none focus:border-[#1C7C54]"
              />
            </div>

            <div className="flex flex-col space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#1C1C1E]">
                Currency
              </label>
              <input
                type="text"
                value={form.currency}
                onChange={(e) => handleChange("currency", e.target.value)}
                className="px-3.5 py-2 bg-[#F2F2F5] border border-[#E4E4E7] rounded-xl text-xs text-[#1C1C1E] focus:outline-none focus:border-[#1C7C54]"
              />
            </div>

            <div className="flex flex-col space-y-1.5 md:col-span-2">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-[#1C1C1E]">
                Operating Hours
              </label>
              <input
                type="text"
                value={form.businessHours}
                onChange={(e) => handleChange("businessHours", e.target.value)}
                className="px-3.5 py-2 bg-[#F2F2F5] border border-[#E4E4E7] rounded-xl text-xs text-[#1C1C1E] focus:outline-none focus:border-[#1C7C54]"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#E4E4E7] flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1C7C54] hover:bg-[#16603F] text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save Business Settings</span>
            </button>
          </div>
        </form>
      )}

      {activeTab === "loyalty" && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-[#E4E4E7] text-center max-w-3xl">
          <Award className="w-10 h-10 text-[#6E6E73] mx-auto mb-3" />
          <h2 className="text-base font-semibold text-[#1C1C1E] mb-1">
            Loyalty Program Rules
          </h2>
          <p className="text-xs text-[#6E6E73]">
            Settings pending — tab available for future configuration options.
          </p>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-[#E4E4E7] text-center max-w-3xl">
          <Bell className="w-10 h-10 text-[#6E6E73] mx-auto mb-3" />
          <h2 className="text-base font-semibold text-[#1C1C1E] mb-1">
            Notification Settings
          </h2>
          <p className="text-xs text-[#6E6E73]">
            Settings pending — tab available for future configuration options.
          </p>
        </div>
      )}

      {activeTab === "security" && (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-[#E4E4E7] text-center max-w-3xl">
          <ShieldCheck className="w-10 h-10 text-[#6E6E73] mx-auto mb-3" />
          <h2 className="text-base font-semibold text-[#1C1C1E] mb-1">
            Security & Access Controls
          </h2>
          <p className="text-xs text-[#6E6E73]">
            Settings pending — tab available for future configuration options.
          </p>
        </div>
      )}
    </div>
  );
}
