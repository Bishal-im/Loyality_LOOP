"use client";

import React, { useState } from "react";
import { Plus, X, ChevronDown, Mail } from "lucide-react";

type FilterSegment = "all" | "new" | "regular" | "at-risk" | "inactive";
type SegmentId = "new" | "regular" | "at-risk" | "inactive";

interface CampaignItem {
  id: string;
  name: string;
  segmentId: SegmentId;
  segmentName: string;
  leftBarColor: string;
  status: "Sent" | "Draft";
  date: string;
  sentCount?: number;
  openedRate?: string;
  returnedRate?: string;
  isDraft?: boolean;
}

export default function AdminCampaignsPage() {
  const [activeTab, setActiveTab] = useState<FilterSegment>("all");
  const [composerOpen, setComposerOpen] = useState<boolean>(true);
  const [activeSegmentId, setActiveSegmentId] = useState<SegmentId>("at-risk");
  const [campaignName, setCampaignName] = useState("October Win-Back Special");
  const [emailTemplate, setEmailTemplate] = useState("win-back");
  const [subjectLine, setSubjectLine] = useState("We miss you at ABC Café!");
  const [messageBody, setMessageBody] = useState(
    "Hi {{customer_name}},\n\nIt's been a while since your last visit to {{business_name}}! We'd love to see you again soon. Come by this week and enjoy your favorite coffee and treats on us."
  );

  const [campaigns, setCampaigns] = useState<CampaignItem[]>([
    {
      id: "camp_risk_2",
      name: "October Win-Back Special",
      segmentId: "at-risk",
      segmentName: "At Risk Customers",
      leftBarColor: "bg-[#C5221F]",
      status: "Draft",
      date: "Created Sep 18, 2024",
      isDraft: true,
    },
    {
      id: "camp_risk_1",
      name: "We Miss You - September",
      segmentId: "at-risk",
      segmentName: "At Risk Customers",
      leftBarColor: "bg-[#C5221F]",
      status: "Sent",
      date: "Sent Sep 15, 2024",
      sentCount: 312,
      openedRate: "58%",
      returnedRate: "19%",
    },
    {
      id: "camp_new_1",
      name: "Welcome & First Visit Bonus",
      segmentId: "new",
      segmentName: "New Customers",
      leftBarColor: "bg-[#1A73E8]",
      status: "Sent",
      date: "Sent Sep 10, 2024",
      sentCount: 120,
      openedRate: "64%",
      returnedRate: "38%",
    },
    {
      id: "camp_reg_1",
      name: "Autumn Double Stamps Day",
      segmentId: "regular",
      segmentName: "Regular Customers",
      leftBarColor: "bg-[#137333]",
      status: "Sent",
      date: "Sent Sep 1, 2024",
      sentCount: 892,
      openedRate: "55%",
      returnedRate: "11%",
    },
    {
      id: "camp_inac_1",
      name: "Re-engagement Voucher (NPR 500)",
      segmentId: "inactive",
      segmentName: "Inactive Customers",
      leftBarColor: "bg-[#71717A]",
      status: "Sent",
      date: "Sent Aug 20, 2024",
      sentCount: 27,
      openedRate: "41%",
      returnedRate: "15%",
    },
  ]);

  const handleOpenComposer = (segmentId: SegmentId = "at-risk") => {
    setActiveSegmentId(segmentId);
    setComposerOpen(true);
    if (segmentId === "at-risk") {
      setCampaignName("October Win-Back Special");
      setEmailTemplate("win-back");
      setSubjectLine("We miss you at ABC Café!");
      setMessageBody(
        "Hi {{customer_name}},\n\nIt's been a while since your last visit to {{business_name}}! We'd love to see you again soon. Come by this week and enjoy your favorite coffee and treats on us."
      );
    } else if (segmentId === "new") {
      setCampaignName("Welcome Gift Campaign");
      setEmailTemplate("welcome");
      setSubjectLine("Welcome to ABC Café! Enjoy 15% off your next visit.");
      setMessageBody(
        "Hi {{customer_name}},\n\nThank you for joining {{business_name}}! Show this email on your next visit to claim your welcome gift."
      );
    } else if (segmentId === "regular") {
      setCampaignName("Double Stamp Weekend");
      setEmailTemplate("autumn-special");
      setSubjectLine("Double stamps this weekend for our regular guests!");
      setMessageBody(
        "Hi {{customer_name}},\n\nAs a valued regular at {{business_name}}, earn 2x stamps on every order this Saturday & Sunday!"
      );
    } else {
      setCampaignName("Re-activation Treat");
      setEmailTemplate("re-engagement");
      setSubjectLine("We saved your favorite table at ABC Café!");
      setMessageBody(
        "Hi {{customer_name}},\n\nWe haven't seen you in a while at {{business_name}}! Here is a NPR 500 voucher on us for your next visit."
      );
    }
  };

  const handleSegmentChange = (segmentId: SegmentId) => {
    setActiveSegmentId(segmentId);
  };

  const handleTemplateChange = (template: string) => {
    setEmailTemplate(template);
    if (template === "win-back") {
      setSubjectLine("We miss you at ABC Café!");
      setMessageBody(
        "Hi {{customer_name}},\n\nIt's been a while since your last visit to {{business_name}}! We'd love to see you again soon."
      );
    } else if (template === "welcome") {
      setSubjectLine("Welcome to ABC Café!");
      setMessageBody(
        "Hi {{customer_name}},\n\nWelcome to {{business_name}}! Enjoy 15% off your next order."
      );
    } else if (template === "autumn-special") {
      setSubjectLine("Special Autumn Double Stamps!");
      setMessageBody(
        "Hi {{customer_name}},\n\nEarn 2x stamps all weekend at {{business_name}}!"
      );
    } else if (template === "re-engagement") {
      setSubjectLine("Exclusive NPR 500 Voucher Inside");
      setMessageBody(
        "Hi {{customer_name}},\n\nWe miss you at {{business_name}}! Here is NPR 500 off your next visit."
      );
    }
  };

  const getSegmentTitle = (id: SegmentId) => {
    switch (id) {
      case "new":
        return "New Customers (120)";
      case "regular":
        return "Regular Customers (892)";
      case "at-risk":
        return "At Risk Customers (312)";
      case "inactive":
        return "Inactive Customers (27)";
    }
  };

  const getSegmentColor = (id: SegmentId) => {
    switch (id) {
      case "new":
        return "bg-[#1A73E8]";
      case "regular":
        return "bg-[#137333]";
      case "at-risk":
        return "bg-[#C5221F]";
      case "inactive":
        return "bg-[#71717A]";
    }
  };

  const handleSendCampaign = () => {
    const newCamp: CampaignItem = {
      id: `camp_${Date.now()}`,
      name: campaignName || "New Targeted Campaign",
      segmentId: activeSegmentId,
      segmentName:
        activeSegmentId === "new"
          ? "New Customers"
          : activeSegmentId === "regular"
          ? "Regular Customers"
          : activeSegmentId === "at-risk"
          ? "At Risk Customers"
          : "Inactive Customers",
      leftBarColor: getSegmentColor(activeSegmentId),
      status: "Sent",
      date: "Sent Just now",
      sentCount:
        activeSegmentId === "new"
          ? 120
          : activeSegmentId === "regular"
          ? 892
          : activeSegmentId === "at-risk"
          ? 312
          : 27,
      openedRate: "0%",
      returnedRate: "0%",
    };

    setCampaigns((prev) => [newCamp, ...prev]);
    setComposerOpen(false);
  };

  const handleSaveDraft = () => {
    const newDraft: CampaignItem = {
      id: `draft_${Date.now()}`,
      name: campaignName || "Draft Campaign",
      segmentId: activeSegmentId,
      segmentName:
        activeSegmentId === "new"
          ? "New Customers"
          : activeSegmentId === "regular"
          ? "Regular Customers"
          : activeSegmentId === "at-risk"
          ? "At Risk Customers"
          : "Inactive Customers",
      leftBarColor: getSegmentColor(activeSegmentId),
      status: "Draft",
      date: "Created Just now",
      isDraft: true,
    };

    setCampaigns((prev) => [newDraft, ...prev]);
    setComposerOpen(false);
  };

  const filteredCampaigns = campaigns.filter((camp) => {
    if (activeTab === "all") return true;
    return camp.segmentId === activeTab;
  });

  return (
    <div className="flex flex-col w-full max-w-[1000px] mx-auto gap-6 pb-12">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-[24px] font-semibold text-[#18181B] tracking-tight leading-tight">
            Campaigns
          </h1>
          <p className="text-[14px] font-normal text-[#71717A] mt-0.5">
            Send targeted emails to your customers
          </p>
        </div>

        {/* Header Action Button — Single plus icon, no duplicate plus symbol */}
        <button
          onClick={() =>
            handleOpenComposer(
              activeTab !== "all" ? (activeTab as SegmentId) : "at-risk"
            )
          }
          className="btn-press inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          type="button"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          <span>New Campaign</span>
        </button>
      </div>

      {/* 2. Filter Tab Row (Same filter pill style as Customers page) */}
      <div className="flex items-center justify-between gap-4 border-b border-[#E5E5E5] pb-4">
        <div className="inline-flex items-center p-1 bg-[#F4F4F5] rounded-xl border border-[#E5E5E5] gap-1 overflow-x-auto max-w-full">
          {[
            { id: "all", label: "All" },
            { id: "new", label: "New (120)" },
            { id: "regular", label: "Regular (892)" },
            { id: "at-risk", label: "At Risk (312)" },
            { id: "inactive", label: "Inactive (27)" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as FilterSegment)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 ${
                activeTab === tab.id
                  ? "bg-[#18181B] text-white font-semibold shadow-xs"
                  : "text-[#71717A] hover:text-[#18181B] hover:bg-[#E8EAED]"
              }`}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-[#71717A] font-normal hidden sm:inline-block">
          Showing {filteredCampaigns.length}{" "}
          {filteredCampaigns.length === 1 ? "campaign" : "campaigns"}
        </span>
      </div>

      {/* 3. Filtered Vertical Campaign List */}
      <div className="flex flex-col gap-3.5">
        {filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((camp) => (
            <div
              key={camp.id}
              className="bg-white rounded-[16px] border border-[#E5E5E5] p-5 pl-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all flex flex-col gap-3 relative overflow-hidden"
            >
              {/* Colored 4px Left-Edge Bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-[4px] ${camp.leftBarColor}`}
              />

              {/* Title, Target Segment, & Status Pill */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[15px] font-semibold text-[#18181B] leading-snug">
                    {camp.name}
                  </h3>
                  <span className="text-xs text-[#71717A] font-normal">
                    Targeted:{" "}
                    <span className="font-medium text-[#3F3F46]">
                      {camp.segmentName}
                    </span>
                  </span>
                </div>

                {camp.status === "Sent" ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E6F4EA] text-[#137333] shrink-0">
                    Sent
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F4F4F5] text-[#71717A] border border-[#E5E5E5] shrink-0">
                    Draft
                  </span>
                )}
              </div>

              {/* Stats Line (if Sent) — plain inline text */}
              {camp.status === "Sent" ? (
                <div className="text-xs text-[#71717A] font-normal">
                  <span className="tabular-nums font-semibold text-[#18181B]">
                    {camp.sentCount}
                  </span>{" "}
                  sent ·{" "}
                  <span className="tabular-nums font-semibold text-[#18181B]">
                    {camp.openedRate}
                  </span>{" "}
                  opened ·{" "}
                  <span className="tabular-nums font-semibold text-[#18181B]">
                    {camp.returnedRate}
                  </span>{" "}
                  returned
                </div>
              ) : (
                <div className="text-xs text-[#71717A] font-normal flex items-center justify-between">
                  <span>Not sent · Ready to schedule</span>
                  <button
                    onClick={() => handleOpenComposer(camp.segmentId)}
                    className="font-semibold text-primary hover:underline"
                    type="button"
                  >
                    Edit Draft &rarr;
                  </button>
                </div>
              )}

              {/* Footer Date */}
              <div className="text-xs text-[#A1A1AA] font-normal border-t border-[#F4F4F5] pt-2.5">
                {camp.date}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-[16px] border border-dashed border-[#E5E5E5] p-8 flex flex-col items-center justify-center text-center gap-2">
            <Mail className="w-6 h-6 text-[#A1A1AA]" strokeWidth={1.5} />
            <span className="text-xs font-semibold text-[#18181B]">
              No campaigns found for this segment
            </span>
            <button
              onClick={() =>
                handleOpenComposer(
                  activeTab !== "all" ? (activeTab as SegmentId) : "at-risk"
                )
              }
              className="text-xs font-semibold text-primary hover:underline mt-1"
              type="button"
            >
              + Create a new campaign
            </button>
          </div>
        )}
      </div>

      {/* 4. Slide-Over Composer Panel */}
      {composerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Semi-transparent dark backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px] transition-opacity"
            onClick={() => setComposerOpen(false)}
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-[520px] bg-white shadow-2xl flex flex-col h-full border-l border-[#E5E5E5] relative z-10">
              {/* Panel Header */}
              <div className="px-6 py-5 border-b border-[#E5E5E5] flex items-center justify-between bg-white shrink-0">
                <div>
                  <h2 className="text-[18px] font-semibold text-[#18181B]">
                    New Campaign
                  </h2>
                  <p className="text-xs text-[#71717A] mt-0.5 font-normal">
                    Targeting:{" "}
                    <span className="font-semibold text-[#18181B]">
                      {getSegmentTitle(activeSegmentId)}
                    </span>
                  </p>
                </div>
                <button
                  onClick={() => setComposerOpen(false)}
                  className="w-8 h-8 rounded-lg border border-[#E5E5E5] text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] flex items-center justify-center transition-colors btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  type="button"
                  aria-label="Close panel"
                >
                  <X className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* Panel Body (Scrollable Form + Stacked Live Preview) */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
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
                      onChange={(e) =>
                        handleSegmentChange(e.target.value as SegmentId)
                      }
                      className="w-full px-3.5 py-2.5 bg-[#F4F4F5] text-[#18181B] text-xs font-normal rounded-xl border border-[#E5E5E5] appearance-none focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all pr-9"
                    >
                      <option value="at-risk">At Risk Customers (312)</option>
                      <option value="new">New Customers (120)</option>
                      <option value="regular">Regular Customers (892)</option>
                      <option value="inactive">Inactive Customers (27)</option>
                    </select>
                    <ChevronDown
                      className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none"
                      strokeWidth={1.5}
                    />
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
                      onChange={(e) => handleTemplateChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#F4F4F5] text-[#18181B] text-xs font-normal rounded-xl border border-[#E5E5E5] appearance-none focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all pr-9"
                    >
                      <option value="win-back">We Miss You (Win-Back)</option>
                      <option value="welcome">Welcome Discount Offer</option>
                      <option value="autumn-special">
                        Autumn Menu & Double Stamps
                      </option>
                      <option value="re-engagement">
                        Re-engagement Voucher
                      </option>
                    </select>
                    <ChevronDown
                      className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none"
                      strokeWidth={1.5}
                    />
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

                {/* Message Body */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.06em]">
                      MESSAGE BODY
                    </label>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          setMessageBody((prev) => prev + " {{customer_name}}")
                        }
                        className="px-2 py-1 rounded bg-[#F4F4F5] border border-[#E5E5E5] text-[10px] text-[#71717A] hover:text-[#18181B] transition-colors"
                      >
                        + Name Tag
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setMessageBody((prev) => prev + " {{business_name}}")
                        }
                        className="px-2 py-1 rounded bg-[#F4F4F5] border border-[#E5E5E5] text-[10px] text-[#71717A] hover:text-[#18181B] transition-colors"
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

                {/* Live Preview Stacked Below Fields */}
                <div className="flex flex-col gap-2.5 pt-2 border-t border-[#E5E5E5]">
                  <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.06em]">
                    LIVE RECIPIENT PREVIEW
                  </span>
                  <div className="bg-[#FAFAFA] rounded-xl border border-[#E5E5E5] p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-[11px] text-[#71717A] border-b border-[#E5E5E5] pb-2">
                      <span>From: ABC Café &lt;hello@abccafe.com&gt;</span>
                      <span className="font-medium text-[#18181B]">
                        To: Rahul Thapa
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-[#18181B]">
                      {subjectLine || "No subject set"}
                    </div>
                    <div className="bg-white p-3.5 rounded-lg border border-[#E5E5E5] text-xs text-[#18181B] font-normal leading-relaxed whitespace-pre-line">
                      {messageBody
                        .replace(/{{customer_name}}/g, "Rahul")
                        .replace(/{{business_name}}/g, "ABC Café")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sticky Panel Footer */}
              <div className="p-5 bg-white border-t border-[#E5E5E5] flex items-center gap-3 sticky bottom-0 z-10 shrink-0">
                <button
                  onClick={handleSendCampaign}
                  className="btn-press flex-1 py-3 rounded-xl bg-primary hover:bg-primary-hover active:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  type="button"
                >
                  <span>Send Campaign</span>
                </button>
                <button
                  onClick={handleSaveDraft}
                  className="btn-press px-4 py-3 rounded-xl bg-white border border-[#E5E5E5] hover:bg-[#F4F4F5] text-[#18181B] text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  type="button"
                >
                  Save as Draft
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
