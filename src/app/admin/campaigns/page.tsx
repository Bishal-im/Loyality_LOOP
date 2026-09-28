"use client";

import React, { useState } from "react";
import {
  Plus,
  Mail,
  ChevronDown,
  Clock,
  ArrowRight,
  Send
} from "lucide-react";

export default function AdminCampaignsPage() {
  const [campaignName, setCampaignName] = useState("October Win-Back Offer");
  const [targetSegment, setTargetSegment] = useState("at-risk");
  const [emailTemplate, setEmailTemplate] = useState("we-miss-you");
  const [subjectLine, setSubjectLine] = useState("We miss you at ABC Café!");
  const [messageBody, setMessageBody] = useState(
    "Hi {{customer_name}},\n\nIt's been a while since your last visit to {{business_name}}! We'd love to see you again soon. Come by this week and enjoy your favorite coffee and treats."
  );

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto gap-6">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-[#1D2925] tracking-tight">
            Campaigns
          </h1>
          <p className="text-xs text-[#718078] mt-1 font-medium">
            Send targeted emails to your customers
          </p>
        </div>

        <button
          onClick={() => alert("Create new campaign modal")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#173F35] hover:bg-[#002920] text-white text-xs font-bold shadow-sm transition-colors self-start sm:self-auto"
          type="button"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Campaign</span>
        </button>
      </div>

      {/* 2. Two-Column Operational Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN (~60% / col-span-7) — Past Campaigns List */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[#718078] uppercase tracking-wider">
              PAST CAMPAIGNS
            </span>
            <span className="text-xs text-[#718078] font-medium">
              3 total entries
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {/* Card 1: We Miss You - September */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4E2DD] flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-[#1D2925]">
                    We Miss You - September
                  </h3>
                  <p className="text-xs text-[#718078] mt-1 font-medium">
                    Sent to At Risk customers (31) • Sep 15, 2024
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173F35] text-white text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Sent
                </span>
              </div>

              {/* Stats Bar */}
              <div className="bg-[#F5F3EE] rounded-xl px-4 py-3 border border-[#E4E2DD] flex items-center justify-between text-xs font-medium text-[#1D2925]">
                <div>
                  <span>Sent: </span>
                  <span className="font-bold">31</span>
                </div>
                <span className="text-[#D1D5DB]">•</span>
                <div>
                  <span>Opened: </span>
                  <span className="font-bold text-[#173F35]">18</span>
                  <span className="text-[#173F35] ml-1">(58%)</span>
                </div>
                <span className="text-[#D1D5DB]">•</span>
                <div>
                  <span>Returned: </span>
                  <span className="font-bold text-[#173F35]">6</span>
                  <span className="text-[#173F35] ml-1">(19%)</span>
                </div>
              </div>
            </div>

            {/* Card 2: New Autumn Menu & Double Stamp Day */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4E2DD] flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-[#1D2925]">
                    New Autumn Menu & Double Stamp Day
                  </h3>
                  <p className="text-xs text-[#718078] mt-1 font-medium">
                    Sent to All Customers (1,248) • Sep 1, 2024
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#173F35] text-white text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Sent
                </span>
              </div>

              {/* Stats Bar */}
              <div className="bg-[#F5F3EE] rounded-xl px-4 py-3 border border-[#E4E2DD] flex items-center justify-between text-xs font-medium text-[#1D2925]">
                <div>
                  <span>Sent: </span>
                  <span className="font-bold">1,248</span>
                </div>
                <span className="text-[#D1D5DB]">•</span>
                <div>
                  <span>Opened: </span>
                  <span className="font-bold text-[#173F35]">686</span>
                  <span className="text-[#173F35] ml-1">(55%)</span>
                </div>
                <span className="text-[#D1D5DB]">•</span>
                <div>
                  <span>Returned: </span>
                  <span className="font-bold text-[#173F35]">142</span>
                  <span className="text-[#173F35] ml-1">(11%)</span>
                </div>
              </div>
            </div>

            {/* Card 3: VIP Weekend Appreciation */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4E2DD] flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-[#1D2925]">
                    VIP Weekend Appreciation
                  </h3>
                  <p className="text-xs text-[#718078] mt-1 font-medium">
                    Targeting VIP Customers (24) • Created Sep 18, 2024
                  </p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#F8F6F1] text-[#718078] text-[11px] font-semibold border border-[#E4E2DD]">
                  Draft
                </span>
              </div>

              {/* Draft Status Row */}
              <div className="bg-[#F5F3EE] rounded-xl px-4 py-3 border border-[#E4E2DD] flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-2 text-[#718078]">
                  <Clock className="w-4 h-4 text-[#718078]" />
                  <span>Not yet sent. Ready to review and schedule.</span>
                </div>
                <button
                  type="button"
                  onClick={() => alert("Resume editing draft")}
                  className="font-bold text-[#173F35] hover:underline inline-flex items-center gap-1"
                >
                  <span>Resume Edit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (~40% / col-span-5) — Create Email Campaign Form Panel */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-[#E4E2DD] flex flex-col gap-5">
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-[#E4E2DD] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#C5E7D9]/50 text-[#173F35] flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <h2 className="text-base font-bold text-[#1D2925]">
                Create Email Campaign
              </h2>
            </div>
            <span className="text-xs text-[#718078] font-medium">
              Direct Dispatch
            </span>
          </div>

          {/* Form Fields Stack */}
          <div className="flex flex-col gap-4">
            {/* 1. CAMPAIGN NAME */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider">
                CAMPAIGN NAME
              </label>
              <input
                type="text"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                className="w-full px-3 py-2 bg-[#F5F3EE] text-[#1D2925] text-xs font-medium rounded-xl border border-[#E4E2DD] focus:outline-none focus:border-[#173F35] focus:bg-white transition-colors"
              />
            </div>

            {/* 2. TARGET SEGMENT */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider">
                TARGET SEGMENT
              </label>
              <div className="relative">
                <select
                  value={targetSegment}
                  onChange={(e) => setTargetSegment(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F5F3EE] text-[#1D2925] text-xs font-medium rounded-xl border border-[#E4E2DD] appearance-none focus:outline-none focus:border-[#173F35] focus:bg-white transition-colors pr-9"
                >
                  <option value="at-risk">At Risk Customers (31)</option>
                  <option value="all">All Customers (1,248)</option>
                  <option value="vip">VIP Customers (24)</option>
                  <option value="new">New Customers (120)</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#718078] pointer-events-none" />
              </div>
            </div>

            {/* 3. EMAIL TEMPLATE */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider">
                EMAIL TEMPLATE
              </label>
              <div className="relative">
                <select
                  value={emailTemplate}
                  onChange={(e) => setEmailTemplate(e.target.value)}
                  className="w-full px-3 py-2 bg-[#F5F3EE] text-[#1D2925] text-xs font-medium rounded-xl border border-[#E4E2DD] appearance-none focus:outline-none focus:border-[#173F35] focus:bg-white transition-colors pr-9"
                >
                  <option value="we-miss-you">We Miss You</option>
                  <option value="autumn-special">Autumn Menu Special</option>
                  <option value="vip-reward">VIP Rewards Claim</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#718078] pointer-events-none" />
              </div>
            </div>

            {/* 4. SUBJECT LINE */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider">
                SUBJECT LINE
              </label>
              <input
                type="text"
                value={subjectLine}
                onChange={(e) => setSubjectLine(e.target.value)}
                className="w-full px-3 py-2 bg-[#F5F3EE] text-[#1D2925] text-xs font-medium rounded-xl border border-[#E4E2DD] focus:outline-none focus:border-[#173F35] focus:bg-white transition-colors"
              />
            </div>

            {/* 5. MESSAGE */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider">
                  MESSAGE
                </label>
                <span className="text-[10px] text-[#718078] font-medium">
                  Tags: {"{{customer_name}}"}, {"{{business_name}}"}
                </span>
              </div>
              <textarea
                rows={4}
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#F5F3EE] text-[#1D2925] text-xs font-medium rounded-xl border border-[#E4E2DD] focus:outline-none focus:border-[#173F35] focus:bg-white transition-colors leading-relaxed resize-none"
              />
            </div>
          </div>

          {/* Live Preview Header */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-[11px] font-bold text-[#718078] uppercase tracking-wider">
              LIVE PREVIEW
            </span>
            <span className="px-2 py-0.5 rounded-md bg-[#F8F6F1] text-[#718078] text-[10px] font-semibold border border-[#E4E2DD]">
              Recipient View
            </span>
          </div>

          {/* Email Preview Card */}
          <div className="bg-white rounded-xl border border-[#E4E2DD] p-4 flex flex-col gap-3 shadow-xs">
            <div className="flex items-center justify-between text-xs font-medium border-b border-[#E4E2DD] pb-2">
              <span className="text-[#1D2925]">ABC Café &lt;hello@abccafe.com&gt;</span>
              <span className="text-[#718078]">Mock Recipient: Rahul</span>
            </div>

            <div className="text-xs font-bold text-[#1D2925]">
              {subjectLine}
            </div>

            {/* Rendered Email Body */}
            <div className="bg-[#F5F3EE] p-4 rounded-xl border border-[#E4E2DD] text-xs text-[#1D2925] font-medium leading-relaxed whitespace-pre-line">
              Hi Rahul,

              It's been a while since your last visit to ABC Café! We'd love to see you again soon. Come by this week and enjoy your favorite coffee and treats.

              <div className="mt-4 pt-2 border-t border-[#E4E2DD] text-[#718078] font-normal">
                Warm regards,<br />
                <span className="font-semibold text-[#1D2925]">The ABC Café Team</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => alert("Campaign dispatched to recipient list")}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#173F35] hover:bg-[#002920] text-white text-xs font-bold shadow-sm transition-colors"
              type="button"
            >
              <Send className="w-4 h-4 fill-white" />
              <span>Send Campaign</span>
            </button>

            <button
              onClick={() => alert("Saved as draft")}
              className="text-xs text-[#718078] hover:text-[#1D2925] font-medium text-center py-1 transition-colors"
              type="button"
            >
              Save as draft instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

