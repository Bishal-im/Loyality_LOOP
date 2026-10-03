"use client";

import React, { useState } from "react";
import {
  Plus,
  Mail,
  ChevronDown,
  Send,
  X,
  Sparkles,
  ArrowDown,
} from "lucide-react";

type SegmentId = "new" | "regular" | "at-risk" | "inactive";

interface AttachedCampaign {
  id: string;
  name: string;
  status: "Sent" | "Draft";
  statusBg: string;
  stats: string;
  date: string;
  isDraft?: boolean;
}

interface FunnelStage {
  id: SegmentId;
  name: string;
  count: number;
  label: string;
  dotColor: string;
  dotBg: string;
  description: string;
  campaigns: AttachedCampaign[];
}

export default function AdminCampaignsPage() {
  const [composerOpen, setComposerOpen] = useState<boolean>(true);
  const [activeSegmentId, setActiveSegmentId] = useState<SegmentId>("at-risk");
  const [campaignName, setCampaignName] = useState("October Win-Back Offer");
  const [emailTemplate, setEmailTemplate] = useState("we-miss-you");
  const [subjectLine, setSubjectLine] = useState("We miss you at ABC Café!");
  const [messageBody, setMessageBody] = useState(
    "Hi {{customer_name}},\n\nIt's been a while since your last visit to {{business_name}}! We'd love to see you again soon. Come by this week and enjoy your favorite coffee and treats."
  );

  const funnelStages: FunnelStage[] = [
    {
      id: "new",
      name: "New",
      count: 120,
      label: "120 New",
      dotColor: "bg-[#1A73E8]",
      dotBg: "bg-[#E8F0FE]",
      description: "Joined in last 30 days",
      campaigns: [
        {
          id: "camp_new_1",
          name: "Welcome & First Visit Bonus",
          status: "Sent",
          statusBg: "bg-[#E6F4EA] text-[#137333]",
          stats: "120 sent · 64% opened · 38% returned",
          date: "Sep 10, 2024",
        },
      ],
    },
    {
      id: "regular",
      name: "Regular",
      count: 892,
      label: "892 Regular",
      dotColor: "bg-[#137333]",
      dotBg: "bg-[#E6F4EA]",
      description: "Active recurring visits",
      campaigns: [
        {
          id: "camp_reg_1",
          name: "Autumn Menu & Double Stamp Day",
          status: "Sent",
          statusBg: "bg-[#E6F4EA] text-[#137333]",
          stats: "892 sent · 55% opened · 11% returned",
          date: "Sep 1, 2024",
        },
      ],
    },
    {
      id: "at-risk",
      name: "At Risk",
      count: 312,
      label: "312 At Risk",
      dotColor: "bg-[#C5221F]",
      dotBg: "bg-[#FCE8E6]",
      description: "Overdue vs visit cadence",
      campaigns: [
        {
          id: "camp_risk_1",
          name: "We Miss You - September",
          status: "Sent",
          statusBg: "bg-[#E6F4EA] text-[#137333]",
          stats: "31 sent · 58% opened · 19% returned",
          date: "Sep 15, 2024",
        },
        {
          id: "camp_risk_2",
          name: "October Win-Back Special",
          status: "Draft",
          statusBg: "bg-[#F4F4F5] text-[#71717A] border border-[#E5E5E5]",
          stats: "Not sent · Ready to schedule",
          date: "Created Sep 18",
          isDraft: true,
        },
      ],
    },
    {
      id: "inactive",
      name: "Inactive",
      count: 27,
      label: "27 Inactive",
      dotColor: "bg-[#71717A]",
      dotBg: "bg-[#F4F4F5]",
      description: "No visit in 60+ days",
      campaigns: [
        {
          id: "camp_inac_1",
          name: "Re-engagement Voucher (NPR 500 Off)",
          status: "Sent",
          statusBg: "bg-[#E6F4EA] text-[#137333]",
          stats: "27 sent · 41% opened · 15% returned",
          date: "Aug 20, 2024",
        },
      ],
    },
  ];

  const handleOpenComposer = (segmentId: SegmentId) => {
    setActiveSegmentId(segmentId);
    setComposerOpen(true);
    if (segmentId === "at-risk") {
      setCampaignName("October Win-Back Offer");
      setSubjectLine("We miss you at ABC Café!");
      setMessageBody(
        "Hi {{customer_name}},\n\nIt's been a while since your last visit to {{business_name}}! We'd love to see you again soon. Come by this week and enjoy your favorite coffee and treats."
      );
    } else if (segmentId === "new") {
      setCampaignName("Welcome Discount Offer");
      setSubjectLine("Welcome to ABC Café! Enjoy 15% off your next visit.");
      setMessageBody(
        "Hi {{customer_name}},\n\nThank you for joining {{business_name}}! Show this email on your next visit to claim your welcome gift."
      );
    } else if (segmentId === "regular") {
      setCampaignName("Double Stamp Weekend");
      setSubjectLine("Double stamps this weekend for our regular guests!");
      setMessageBody(
        "Hi {{customer_name}},\n\nAs a valued regular at {{business_name}}, earn 2x stamps on every order this Saturday & Sunday!"
      );
    } else {
      setCampaignName("Re-activation Treat");
      setSubjectLine("We saved your favorite table at ABC Café!");
      setMessageBody(
        "Hi {{customer_name}},\n\nWe haven't seen you in a while at {{business_name}}! Here is a NPR 500 voucher on us for your next visit."
      );
    }
  };

  const getSegmentName = (id: SegmentId) => {
    const found = funnelStages.find((s) => s.id === id);
    return found ? `${found.name} Customers (${found.count})` : id;
  };

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-6">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5">
            <h1 className="text-[24px] font-semibold text-[#18181B] tracking-tight leading-tight">
              Retention Funnel
            </h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#E6F4EA] text-[#137333] text-[11px] font-medium gap-1.5">
              <Sparkles className="w-3 h-3 text-[#137333]" strokeWidth={1.5} />
              Segmented Automation
            </span>
          </div>
          <p className="text-[14px] font-normal text-[#71717A] mt-0.5">
            Targeted customer campaigns mapped directly to customer retention funnel stages
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setComposerOpen(!composerOpen)}
            className="btn-press inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#18181B] hover:bg-[#E8EAED] active:bg-[#E5E5E5] text-xs font-medium transition-all shadow-xs"
            type="button"
          >
            <span>{composerOpen ? "Hide Composer" : "Show Composer"}</span>
          </button>

          <button
            onClick={() => handleOpenComposer("at-risk")}
            className="btn-press inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors"
            type="button"
          >
            <Plus className="w-4 h-4" strokeWidth={2} />
            <span>New Campaign</span>
          </button>
        </div>
      </div>

      {/* 2. Connected Funnel Stage Columns */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.06em]">
            CUSTOMER RETENTION FUNNEL STAGES
          </span>
          <span className="text-xs text-[#71717A] font-normal">
            1,251 total tracked guests
          </span>
        </div>

        {/* Funnel Pipeline Grid & Connecting Line */}
        <div className="relative">
          {/* Thin solid connecting line running behind stage cards (matching Reward Path line style) */}
          <div className="absolute top-[46px] left-[12%] right-[12%] h-[2px] bg-[#E5E5E5] z-0 hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 relative z-10 items-start">
            {funnelStages.map((stage) => {
              const isTargeted = composerOpen && activeSegmentId === stage.id;
              return (
                <div key={stage.id} className="flex flex-col items-center w-full">
                  {/* Stage Header Card */}
                  <div
                    className={`w-full bg-white rounded-[16px] border p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] relative z-10 transition-all flex flex-col gap-3 ${
                      isTargeted
                        ? "border-primary/60 ring-2 ring-primary/10"
                        : "border-[#E5E5E5] hover:border-[#D4D4D8]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2.5 h-2.5 rounded-full ${stage.dotColor} shrink-0`}
                        />
                        <span className="text-[15px] font-semibold text-[#18181B]">
                          {stage.name}
                        </span>
                      </div>

                      {/* Flat borderless "+" icon button (1px thin border, no permanent colored background block) */}
                      <button
                        onClick={() => handleOpenComposer(stage.id)}
                        title={`Create campaign for ${stage.name} customers`}
                        className="w-7 h-7 rounded-lg border border-[#E5E5E5] hover:border-primary/50 text-[#71717A] hover:text-primary transition-colors flex items-center justify-center btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                        type="button"
                      >
                        <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </button>
                    </div>

                    <div className="flex items-baseline gap-2">
                      <span className="text-[26px] font-bold text-[#18181B] leading-none tabular-nums">
                        {stage.count}
                      </span>
                      <span className="text-xs text-[#71717A] font-normal">
                        guests
                      </span>
                    </div>

                    <p className="text-xs text-[#71717A] font-normal">
                      {stage.description}
                    </p>

                    <div className="pt-2.5 border-t border-[#E5E5E5]/60 flex items-center justify-between text-[11px] text-[#71717A]">
                      <span>{stage.campaigns.length} active</span>
                      {isTargeted && (
                        <span className="font-semibold text-primary flex items-center gap-1">
                          Active Target <ArrowDown className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Vertical line connecting stage header card to campaigns directly below */}
                  <div className="w-[2px] h-4 bg-[#E5E5E5] my-1 shrink-0" />

                  {/* Campaign Vertical Stack directly under this stage card */}
                  <div className="flex flex-col gap-3 w-full">
                    {stage.campaigns.length > 0 ? (
                      stage.campaigns.map((camp) => (
                        <div
                          key={camp.id}
                          className="bg-white rounded-[14px] border border-[#E5E5E5] p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all flex flex-col gap-2.5 w-full"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-xs font-semibold text-[#18181B] leading-snug">
                              {camp.name}
                            </h3>
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${camp.statusBg}`}
                            >
                              {camp.status}
                            </span>
                          </div>

                          <div className="text-[11px] text-[#71717A] font-normal leading-relaxed bg-[#F4F4F5] p-2.5 rounded-lg border border-[#E5E5E5]/60">
                            {camp.stats}
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-[#71717A] pt-1">
                            <span>{camp.date}</span>
                            {camp.isDraft && (
                              <button
                                onClick={() => handleOpenComposer(stage.id)}
                                className="font-semibold text-primary hover:underline"
                                type="button"
                              >
                                Resume Edit &rarr;
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      /* Muted dashed placeholder card if zero campaigns */
                      <div className="bg-[#FAFAFA] rounded-[14px] border border-dashed border-[#E5E5E5] p-5 flex flex-col items-center justify-center text-center gap-1.5 min-h-[110px] w-full">
                        <span className="text-xs font-medium text-[#A1A1AA]">
                          No active campaigns
                        </span>
                        <span className="text-[11px] text-[#A1A1AA]">
                          Click + on stage card to create
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Inline Campaign Composer Panel (Appears below funnel when open) */}
      {composerOpen && (
        <div className="bg-white rounded-[16px] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-[#E5E5E5] flex flex-col gap-6 mt-2 transition-all">
          {/* Composer Header */}
          <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-4">
            <div className="flex items-center gap-3">
              {/* Simple flat borderless icon frame for mail icon (no rounded square gradient or glow block) */}
              <div className="p-1.5 rounded-lg border border-[#E5E5E5] text-[#18181B] flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="text-[15px] font-semibold text-[#18181B]">
                  Campaign Composer
                </h2>
                <p className="text-xs text-[#71717A] mt-0.5 font-normal">
                  Targeting:{" "}
                  <span className="font-semibold text-[#18181B]">
                    {getSegmentName(activeSegmentId)}
                  </span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setComposerOpen(false)}
              className="px-3 py-1.5 rounded-lg border border-[#E5E5E5] bg-[#F4F4F5] hover:bg-[#E8EAED] text-[#71717A] hover:text-[#18181B] text-xs font-medium transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
              type="button"
            >
              <X className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>Cancel</span>
            </button>
          </div>

          {/* Form + Live Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Form Column (col-span-7) */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              {/* Campaign Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.06em]">
                  CAMPAIGN NAME
                </label>
                <input
                  type="text"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F4F4F5] text-[#18181B] text-xs font-normal rounded-xl border border-[#E5E5E5] focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Target Segment */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.06em]">
                  TARGET SEGMENT
                </label>
                <div className="relative">
                  <select
                    value={activeSegmentId}
                    onChange={(e) => setActiveSegmentId(e.target.value as SegmentId)}
                    className="w-full px-3.5 py-2.5 bg-[#F4F4F5] text-[#18181B] text-xs font-normal rounded-xl border border-[#E5E5E5] appearance-none focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all pr-9"
                  >
                    <option value="at-risk">At Risk Customers (312)</option>
                    <option value="regular">Regular Customers (892)</option>
                    <option value="new">New Customers (120)</option>
                    <option value="inactive">Inactive Customers (27)</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" strokeWidth={1.5} />
                </div>
              </div>

              {/* Email Template */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.06em]">
                  EMAIL TEMPLATE
                </label>
                <div className="relative">
                  <select
                    value={emailTemplate}
                    onChange={(e) => setEmailTemplate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F4F4F5] text-[#18181B] text-xs font-normal rounded-xl border border-[#E5E5E5] appearance-none focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all pr-9"
                  >
                    <option value="we-miss-you">We Miss You (Win-Back)</option>
                    <option value="autumn-special">Autumn Menu Special</option>
                    <option value="vip-reward">VIP Rewards Claim</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" strokeWidth={1.5} />
                </div>
              </div>

              {/* Subject Line */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.06em]">
                  SUBJECT LINE
                </label>
                <input
                  type="text"
                  value={subjectLine}
                  onChange={(e) => setSubjectLine(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F4F4F5] text-[#18181B] text-xs font-normal rounded-xl border border-[#E5E5E5] focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.06em]">
                    MESSAGE BODY
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setMessageBody((prev) => prev + " {{customer_name}}")}
                      className="px-2 py-0.5 rounded bg-[#F4F4F5] border border-[#E5E5E5] text-[10px] text-[#71717A] hover:text-[#18181B]"
                    >
                      + Name Tag
                    </button>
                    <button
                      type="button"
                      onClick={() => setMessageBody((prev) => prev + " {{business_name}}")}
                      className="px-2 py-0.5 rounded bg-[#F4F4F5] border border-[#E5E5E5] text-[10px] text-[#71717A] hover:text-[#18181B]"
                    >
                      + Business Tag
                    </button>
                  </div>
                </div>
                <textarea
                  rows={5}
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F4F4F5] text-[#18181B] text-xs font-normal rounded-xl border border-[#E5E5E5] focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all leading-relaxed resize-none"
                />
              </div>
            </div>

            {/* Right Live Preview Column (col-span-5) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.06em]">
                  LIVE RECIPIENT PREVIEW
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#F4F4F5] text-[#71717A] text-[10px] font-medium border border-[#E5E5E5]">
                  Rendered Email
                </span>
              </div>

              {/* Rendered Email Card */}
              <div className="bg-white rounded-xl border border-[#E5E5E5] p-4 flex flex-col gap-3 shadow-xs">
                <div className="flex items-center justify-between text-xs font-normal border-b border-[#E5E5E5] pb-2 text-xs text-[#71717A]">
                  <span>ABC Café &lt;hello@abccafe.com&gt;</span>
                  <span>Rahul Thapa</span>
                </div>

                <div className="text-xs font-semibold text-[#18181B]">
                  {subjectLine}
                </div>

                <div className="bg-[#F4F4F5] p-4 rounded-xl border border-[#E5E5E5] text-xs text-[#18181B] font-normal leading-relaxed whitespace-pre-line">
                  {messageBody
                    .replace(/{{customer_name}}/g, "Rahul")
                    .replace(/{{business_name}}/g, "ABC Café")}

                  <div className="mt-4 pt-2 border-t border-[#E5E5E5] text-[#71717A] font-normal">
                    Warm regards,<br />
                    <span className="font-semibold text-[#18181B]">The ABC Café Team</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons Stack */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    alert("Campaign dispatched to segment!");
                    setComposerOpen(false);
                  }}
                  className="btn-press flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary hover:bg-primary-hover active:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  type="button"
                >
                  <Send className="w-4 h-4 fill-white" strokeWidth={1.5} />
                  <span>Send Campaign Now</span>
                </button>

                <button
                  onClick={() => {
                    alert("Campaign saved as draft!");
                    setComposerOpen(false);
                  }}
                  className="btn-press px-4 py-2.5 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] hover:bg-[#E8EAED] active:bg-[#E5E5E5] text-[#18181B] text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  type="button"
                >
                  Save Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
