"use client";

import React, { useState } from "react";
import { Bell, ChevronRight, Lock, PartyPopper, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BottomTabBar } from "@/components/customer/BottomTabBar";
import { StampRequestModal } from "@/components/customer/StampRequestModal";
import { StampProgressModal } from "@/components/customer/StampProgressModal";
import { RewardUnlockedModal } from "@/components/customer/RewardUnlockedModal";
import { GoogleReviewModal } from "@/components/customer/GoogleReviewModal";
import { useCustomer } from "@/lib/customer-store";

// ─── Stamp dot ────────────────────────────────────────────────────────────────
function StampDot({ filled, isFree, label }: { filled: boolean; isFree?: boolean; label?: number }) {
  if (isFree) {
    return (
      <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center border-2"
        style={{ backgroundColor: "var(--c-card-mid)", borderColor: "var(--c-gold)" }}>
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--c-gold)" }}>FREE</span>
      </div>
    );
  }
  if (filled) {
    return (
      <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center"
        style={{ backgroundColor: "var(--c-gold)", boxShadow: "0 2px 10px rgba(217,164,65,0.45)" }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M6 7h12l-1.5 9H7.5L6 7Z" fill="rgba(255,255,255,0.25)" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M18 9h1.5a1.5 1.5 0 0 1 0 3H18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5 17h14" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-[52px] h-[52px] rounded-full flex items-center justify-center"
      style={{ backgroundColor: "rgba(43,29,18,0.35)", border: "1px solid rgba(217,164,65,0.2)" }}>
      {label !== undefined && (
        <span className="text-[13px] font-medium" style={{ color: "var(--c-card-light)" }}>{label}</span>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  const router = useRouter();
  const { state, addStamp, dismissAnnouncement, unreadCount, shouldShowReviewPrompt, dismissReviewPrompt } = useCustomer();

  const [showStampModal,  setShowStampModal]  = useState(false);
  const [showQrModal,     setShowQrModal]     = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [justUnlockedReward, setJustUnlockedReward] = useState<{ id: string; title: string } | null>(null);

  const { currentStamps, maxStamps, profile, rewards, announcementText, announcementDismissed } = state;
  const stampsLeft = maxStamps - currentStamps;
  const milestones = rewards.slice(0, 2);

  // Called when admin scan is confirmed (QR modal closes first)
  const handleStampGranted = () => {
    // Capture completing reward BEFORE adding the stamp
    const completingReward = rewards.find(
      r => r.status === "in_progress" && r.stampsRequired === currentStamps + 1
    );
    
    // Calculate if we should show review after this stamp is added
    const newTotalStamps = state.totalStamps + 1;
    const newStampsSinceLastReview = state.stampsSinceLastReviewPrompt + 1;
    const willShowReviewPrompt = newStampsSinceLastReview >= 3;
    
    // Debug logging
    console.log("Before adding stamp:", {
      currentStamps,
      totalStamps: state.totalStamps,
      stampsSinceLastReviewPrompt: state.stampsSinceLastReviewPrompt,
      newTotalStamps,
      newStampsSinceLastReview,
      willShowReviewPrompt,
      completingReward: completingReward?.title || "none"
    });
    
    addStamp();
    setShowStampModal(true);

    if (completingReward) {
      // Stamp unlocked a reward → show reward modal after stamp modal
      // then offer review after reward modal would normally close
      setTimeout(() => {
        setShowStampModal(false);
        setJustUnlockedReward({ id: completingReward.id, title: completingReward.title });
        setShowRewardModal(true);
      }, 1800);
    } else if (willShowReviewPrompt) {
      // No reward unlocked — offer review after stamp modal closes
      setTimeout(() => {
        setShowStampModal(false);
        setShowReviewModal(true);
      }, 2000);
    }
  };

  // When the reward modal closes, check whether we should also show the review prompt
  const handleRewardModalClose = () => {
    setShowRewardModal(false);
    
    // Calculate if we should show review based on current state
    // (at this point the stamp has already been added)
    const shouldShowReview = state.stampsSinceLastReviewPrompt === 0 && state.totalStamps > 0;
    
    if (shouldShowReview) {
      // Small delay so modals don't stack immediately
      setTimeout(() => setShowReviewModal(true), 300);
    }
  };

  // Dismiss review modal and tell the store so the counter resets cleanly
  const handleReviewModalClose = () => {
    setShowReviewModal(false);
    dismissReviewPrompt();
  };

  return (
    <div className="min-h-screen flex flex-col pb-24" style={{ backgroundColor: "var(--c-bg)", color: "var(--c-text-primary)" }}>
      {/* ── Header ── */}
      <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 px-4 pt-3 pb-2" style={{ backgroundColor: "var(--c-bg)" }}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-bold tracking-tight leading-none" style={{ color: "var(--c-text-primary)" }}>Atelier Guild</p>
            <p className="text-[10px] font-semibold tracking-widest uppercase mt-0.5" style={{ color: "var(--c-terracotta)" }}>Patron Salon</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/notifications" className="relative w-9 h-9 flex items-center justify-center">
              <Bell className="w-5 h-5" style={{ color: "var(--c-text-primary)" }} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full text-white text-[9px] font-bold flex items-center justify-center"
                  style={{ backgroundColor: "var(--c-terracotta)" }}>
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
            <Link href="/profile">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--c-peach)" }}>
                <span className="text-sm font-semibold" style={{ color: "var(--c-espresso)" }}>{profile.avatarInitial}</span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-md mx-auto pt-[72px] px-4 flex flex-col gap-4">
        {/* Greeting */}
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[22px] font-bold tracking-tight" style={{ color: "var(--c-text-primary)" }}>
              Good afternoon, {profile.name.split(" ")[0]}
            </h1>
            <span className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full border"
              style={{ backgroundColor: "var(--c-sage-light)", color: "var(--c-sage)", borderColor: "var(--c-sage)" }}>
              <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "var(--c-sage)" }} />
              Active Patron
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="text-base">🏪</span>
            <p className="text-[12px]" style={{ color: "var(--c-text-secondary)" }}>
              Welcome to ABC Café • <span className="font-medium" style={{ color: "var(--c-text-primary)" }}>Downtown Roastery</span>
            </p>
          </div>
        </div>

        {/* Announcement */}
        {!announcementDismissed && (
          <div className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 border"
            style={{ backgroundColor: "var(--c-banner-bg)", borderColor: "var(--c-banner-border)" }}>
            <Bell className="w-4 h-4 flex-shrink-0" style={{ color: "var(--c-gold)" }} />
            <p className="text-[12px] font-medium flex-1" style={{ color: "var(--c-banner-text)" }}>{announcementText}</p>
            <button onClick={dismissAnnouncement} className="flex-shrink-0">
              <X className="w-3.5 h-3.5" style={{ color: "var(--c-banner-text)" }} />
            </button>
          </div>
        )}

        {/* Loyalty Passport Card */}
        <div className="rounded-2xl overflow-hidden"
          style={{ background: "linear-gradient(145deg, var(--c-card-mid) 0%, var(--c-card-dark) 100%)" }}>
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-start justify-between mb-1">
              <div>
                <p className="text-[9px] font-semibold tracking-[0.18em] uppercase mb-0.5" style={{ color: "var(--c-card-accent)" }}>Loyalty Passport</p>
                <p className="text-[18px] font-bold tracking-tight leading-tight text-white">ABC CAFÉ</p>
              </div>
              <div className="text-right">
                <span className="inline-block text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider" style={{ backgroundColor: "var(--c-gold)" }}>
                  {profile.tier}
                </span>
                <p className="text-[11px] mt-1" style={{ color: "var(--c-card-accent)" }}>{profile.patronId}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 mb-3">
              <p className="text-[9px] font-semibold tracking-[0.15em] uppercase" style={{ color: "var(--c-card-accent)" }}>Stamp Progression</p>
              <p className="text-[15px] font-bold text-white">
                <span style={{ color: "var(--c-gold)" }}>{currentStamps}</span>
                <span className="text-[12px]" style={{ color: "var(--c-card-accent)" }}> / {maxStamps} Stamps</span>
              </p>
            </div>

            {/* Stamp grid */}
            <div className="flex flex-col gap-2.5">
              <div className="flex gap-2 justify-between">
                {Array.from({ length: 5 }).map((_, i) => <StampDot key={i} filled={i < currentStamps} />)}
              </div>
              <div className="flex gap-2 justify-between">
                {Array.from({ length: 5 }).map((_, i) => {
                  const gi = 5 + i;
                  if (gi === maxStamps - 1) return <StampDot key={gi} filled={gi < currentStamps} isFree />;
                  return <StampDot key={gi} filled={gi < currentStamps} label={gi < currentStamps ? undefined : gi + 1} />;
                })}
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3.5" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="flex items-center gap-1.5">
                <PartyPopper className="w-3.5 h-3.5" style={{ color: "var(--c-gold)" }} />
                <p className="text-[11px]" style={{ color: "var(--c-card-light)" }}>
                  {stampsLeft > 0 ? `${stampsLeft} more visit${stampsLeft !== 1 ? "s" : ""} to unlock: Artisanal Coffee & Pastry` : "Reward ready to redeem!"}
                </p>
              </div>
            </div>
            <button onClick={() => router.push("/rewards")} className="mt-1 flex items-center gap-1 text-[11px] font-semibold" style={{ color: "var(--c-gold)" }}>
              View Reward Details <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Request Stamp */}
        <button
          onClick={() => setShowQrModal(true)}
          className="w-full flex items-center justify-center gap-2.5 text-white font-semibold text-[15px] py-4 rounded-2xl transition-all active:scale-[0.98]"
          style={{ backgroundColor: "var(--c-terracotta)" }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--c-terracotta-deep)")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--c-terracotta)")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="14" width="18" height="3" rx="1.5" fill="white" opacity="0.9" />
            <path d="M6 14V9a6 6 0 0 1 12 0v5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="12" cy="9" r="2.5" fill="white" opacity="0.7" />
          </svg>
          Request Stamp
        </button>

        {/* Admin Testing Button - Bypass QR Scan */}
        <button
          onClick={handleStampGranted}
          className="w-full flex items-center justify-center gap-2.5 font-semibold text-[14px] py-3 rounded-xl transition-all active:scale-[0.98] border-2 border-dashed"
          style={{ 
            backgroundColor: "rgba(255, 140, 0, 0.1)", 
            borderColor: "#ff8c00",
            color: "#ff8c00"
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v20M2 12h20" stroke="#ff8c00" strokeWidth="2" strokeLinecap="round" />
          </svg>
          [TEST] Grant Stamp Directly
        </button>

        {/* Next Milestones */}
        <div className="rounded-2xl px-4 pt-4 pb-1" style={{ backgroundColor: "var(--c-surface)" }}>
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-[15px] font-bold" style={{ color: "var(--c-text-primary)" }}>Next Milestones</h2>
            <Link href="/rewards" className="flex items-center gap-0.5 text-[12px] font-semibold" style={{ color: "var(--c-terracotta)" }}>
              View all ({rewards.length}) <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div>
            {milestones.map((m, i) => {
              const isReady = m.status === "unlocked";
              return (
                <div key={m.id} className="flex items-center gap-3 py-3.5"
                  style={i < milestones.length - 1 ? { borderBottom: "1px solid var(--c-border)" } : {}}>
                  <div className="w-[60px] h-[60px] rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-2xl"
                    style={{ background: "linear-gradient(135deg, var(--c-peach) 0%, var(--c-gold) 100%)" }}>☕</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[13px] font-semibold truncate" style={{ color: "var(--c-text-primary)" }}>{m.title}</span>
                      {isReady
                        ? <span className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--c-sage-light)", color: "var(--c-sage)" }}>Ready</span>
                        : <span className="flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: "var(--c-bg)", color: "var(--c-text-muted)" }}>Tier II</span>
                      }
                    </div>
                    <p className="text-[11px] mb-1.5 truncate" style={{ color: "var(--c-text-secondary)" }}>{m.description}</p>
                    {isReady ? (
                      <div className="flex items-center justify-between">
                        <span className="text-[11px]" style={{ color: "var(--c-text-muted)" }}>1 Voucher Available</span>
                        <button
                          onClick={() => router.push(`/redeem/${m.id}`)}
                          className="text-[11px] font-semibold text-white px-3 py-1 rounded-lg"
                          style={{ backgroundColor: "var(--c-terracotta)" }}>Redeem</button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1">
                        <Lock className="w-3 h-3" style={{ color: "var(--c-text-muted)" }} />
                        <span className="text-[11px]" style={{ color: "var(--c-text-muted)" }}>
                          {"stampsRequired" in m ? `Unlocked at ${m.stampsRequired} stamps` : ""}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Visit Activity */}
        <Link href="/activity" className="flex items-center gap-3 rounded-2xl px-4 py-3.5 transition-colors" style={{ backgroundColor: "var(--c-surface)" }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--c-bg)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="5" width="18" height="16" rx="2" stroke="var(--c-text-secondary)" strokeWidth="1.6" />
              <path d="M3 9h18" stroke="var(--c-text-secondary)" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M8 3v4M16 3v4" stroke="var(--c-text-secondary)" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-semibold" style={{ color: "var(--c-text-primary)" }}>Recent Visit Activity</p>
            <p className="text-[11px]" style={{ color: "var(--c-text-secondary)" }}>
              {state.activity[0]?.datetime ?? "No activity yet"} • +{state.activity[0]?.stampDelta ?? 0} Stamp
            </p>
          </div>
          <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: "var(--c-text-muted)" }} />
        </Link>

        <div className="h-2" />
      </main>

      {/* QR stamp request sheet — customer shows this to the barista */}
      <StampRequestModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        patronId={profile.patronId}
        patronName={profile.name}
        currentStamps={state.currentStamps}
        maxStamps={state.maxStamps}
      />

      {/* Stamp progress overlay — shown AFTER stamp is granted */}
      <StampProgressModal
        isOpen={showStampModal}
        onClose={() => setShowStampModal(false)}
        currentStamps={state.currentStamps}
        totalStamps={state.maxStamps}
        rewardTitle="Artisan Coffee & Pastry"
      />

      {/* Reward unlocked overlay — shown if stamp completed a reward */}
      <RewardUnlockedModal
        isOpen={showRewardModal}
        onClose={handleRewardModalClose}
        rewardTitle={justUnlockedReward?.title}
        rewardId={justUnlockedReward?.id}
        currentStamps={state.currentStamps}
        totalStamps={state.maxStamps}
      />

      {/* Google Review modal — shown every 3rd stamp */}
      <GoogleReviewModal
        isOpen={showReviewModal}
        onClose={handleReviewModalClose}
        reviewUrl={state.googleReviewUrl}
        currentStamps={state.currentStamps}
        maxStamps={state.maxStamps}
        businessName="ABC Café"
      />

      <BottomTabBar />
    </div>
  );
}
