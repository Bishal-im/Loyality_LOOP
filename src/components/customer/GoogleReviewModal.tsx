"use client";

import React from "react";
import { X, Star, ExternalLink } from "lucide-react";

interface GoogleReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviewUrl: string;
  currentStamps: number;
  maxStamps: number;
  businessName?: string;
}

export const GoogleReviewModal: React.FC<GoogleReviewModalProps> = ({
  isOpen,
  onClose,
  reviewUrl,
  currentStamps,
  maxStamps,
  businessName = "ABC Café",
}) => {
  if (!isOpen) return null;

  const handleReview = () => {
    window.open(reviewUrl, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center backdrop-blur-[4px]"
      style={{ backgroundColor: "rgba(43,33,24,0.60)" }}
      onClick={onClose}
    >
      {/* Bottom sheet */}
      <div
        className="w-full max-w-md rounded-t-3xl overflow-hidden"
        style={{ backgroundColor: "var(--c-surface)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: "var(--c-border)" }} />
        </div>

        <div className="px-6 pt-4 pb-8 flex flex-col items-center gap-5">

          {/* Close button */}
          <div className="w-full flex justify-end -mt-1 -mb-2">
            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 flex items-center justify-center rounded-full"
              style={{ backgroundColor: "var(--c-bg)", color: "var(--c-text-muted)" }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stamp success badge */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "var(--c-gold-light)",
                boxShadow: "0 0 0 8px rgba(217,164,65,0.12)",
              }}
            >
              <span className="text-3xl leading-none">🎉</span>
            </div>
            <h2 className="text-[20px] font-bold tracking-tight text-center" style={{ color: "var(--c-text-primary)" }}>
              Stamp Added!
            </h2>
            {/* Live stamp count pill */}
            <div
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full"
              style={{ backgroundColor: "var(--c-gold-light)", border: "1px solid var(--c-banner-border)" }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M6 7h12l-1.5 9H7.5L6 7Z" fill="rgba(217,164,65,0.4)" stroke="var(--c-gold)" strokeWidth="2" strokeLinejoin="round" />
                <path d="M18 9h1.5a1.5 1.5 0 0 1 0 3H18" stroke="var(--c-gold)" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="text-[12px] font-bold" style={{ color: "var(--c-gold)" }}>
                {currentStamps}
              </span>
              <span className="text-[12px]" style={{ color: "var(--c-banner-text)" }}>
                / {maxStamps} stamps
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px" style={{ backgroundColor: "var(--c-border)" }} />

          {/* Review ask */}
          <div className="flex flex-col items-center gap-2 text-center">
            {/* Google-coloured star row */}
            <div className="flex items-center gap-0.5">
              {["#EA4335","#FBBC04","#34A853","#4285F4","#EA4335"].map((c, i) => (
                <Star key={i} className="w-5 h-5 fill-current" style={{ color: c }} />
              ))}
            </div>
            <p className="text-[15px] font-semibold" style={{ color: "var(--c-text-primary)" }}>
              Enjoying your experience?
            </p>
            <p className="text-[13px] leading-relaxed" style={{ color: "var(--c-text-secondary)" }}>
              Share your experience with us on Google — it only takes 30 seconds and helps us grow!
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleReview}
            type="button"
            className="w-full h-13 py-3.5 rounded-2xl flex items-center justify-center gap-2.5 font-semibold text-[15px] text-white transition-all active:scale-[0.98]"
            style={{ backgroundColor: "var(--c-terracotta)" }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--c-terracotta-deep)")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--c-terracotta)")}
          >
            <Star className="w-4.5 h-4.5 fill-white" />
            Review us on Google
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </button>

          {/* Secondary dismiss */}
          <button
            onClick={onClose}
            type="button"
            className="text-[13px] font-medium transition-colors"
            style={{ color: "var(--c-text-muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--c-text-secondary)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--c-text-muted)")}
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
};
