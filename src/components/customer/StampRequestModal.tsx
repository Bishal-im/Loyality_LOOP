"use client";

import React, { useState, useEffect, useCallback } from "react";
import QRCode from "qrcode.react";
import { X, RefreshCw, Clock } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface StampRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  patronId: string;
  patronName: string;
  currentStamps: number;
  maxStamps: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function buildQrPayload(patronId: string): string {
  const timestamp = Date.now();
  const nonce = Math.random().toString(36).substring(2, 9).toUpperCase();
  return `STAMP:${patronId}:${timestamp}:${nonce}`;
}

const EXPIRY_SECONDS = 60;

// ─── Component ────────────────────────────────────────────────────────────────
export const StampRequestModal: React.FC<StampRequestModalProps> = ({
  isOpen,
  onClose,
  patronId,
  patronName,
  currentStamps,
  maxStamps,
}) => {
  const [qrValue,   setQrValue]   = useState(() => buildQrPayload(patronId));
  const [countdown, setCountdown] = useState(EXPIRY_SECONDS);

  // ── Refresh QR ──────────────────────────────────────────────────────────────
  const refreshQr = useCallback(() => {
    setQrValue(buildQrPayload(patronId));
    setCountdown(EXPIRY_SECONDS);
  }, [patronId]);

  // ── Countdown — auto-refresh when it hits 0 ─────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    if (countdown <= 0) { refreshQr(); return; }
    const id = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(id);
  }, [isOpen, countdown, refreshQr]);

  // ── Reset on open ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setCountdown(EXPIRY_SECONDS);
      setQrValue(buildQrPayload(patronId));
    }
  }, [isOpen, patronId]);

  if (!isOpen) return null;

  const pct = (countdown / EXPIRY_SECONDS) * 100;
  const circumference = 2 * Math.PI * 20; // r=20
  const strokeDash = (pct / 100) * circumference;
  const isExpiring = countdown <= 15;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center backdrop-blur-[4px]"
      style={{ backgroundColor: "rgba(43,33,24,0.65)" }}
      onClick={onClose}
    >
      {/* Bottom sheet */}
      <div
        className="w-full max-w-md rounded-t-3xl overflow-hidden flex flex-col"
        style={{ backgroundColor: "var(--c-surface)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full" style={{ backgroundColor: "var(--c-border)" }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-3 pb-2">
          <div>
            <h2 className="text-[18px] font-bold" style={{ color: "var(--c-text-primary)" }}>
              Request Stamp
            </h2>
            <p className="text-[12px] mt-0.5" style={{ color: "var(--c-text-secondary)" }}>
              Show this QR code to your barista
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--c-bg)", color: "var(--c-text-muted)" }}
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex flex-col items-center px-6 pb-8 pt-2 gap-5">
          {/* Patron info pill */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full border"
            style={{ backgroundColor: "var(--c-bg)", borderColor: "var(--c-border)" }}
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: "var(--c-peach)", color: "var(--c-espresso)" }}
            >
              {patronName[0].toUpperCase()}
            </div>
            <span className="text-[12px] font-semibold" style={{ color: "var(--c-text-primary)" }}>
              {patronName}
            </span>
            <span className="text-[11px]" style={{ color: "var(--c-text-muted)" }}>
              {patronId}
            </span>
          </div>

          {/* QR Code — clean, no scan animation */}
          <div
            className="p-5 rounded-2xl transition-all duration-300"
            style={{
              backgroundColor: "white",
              boxShadow: isExpiring
                ? "0 0 0 3px var(--c-terracotta), 0 8px 32px rgba(201,111,74,0.2)"
                : "0 0 0 1px var(--c-border), 0 8px 32px rgba(43,33,24,0.08)",
            }}
          >
            <QRCode
              value={qrValue}
              size={210}
              level="M"
              renderAs="svg"
              fgColor="#2B2118"
              bgColor="#FFFFFF"
              includeMargin={false}
            />
          </div>

          {/* Countdown + refresh row */}
          <div className="flex items-center gap-3 w-full">
            {/* Circular countdown ring */}
            <div className="relative w-10 h-10 flex-shrink-0">
              <svg width="40" height="40" viewBox="0 0 48 48" className="-rotate-90">
                <circle cx="24" cy="24" r="20" stroke="var(--c-border)" strokeWidth="3.5" fill="none" />
                <circle
                  cx="24" cy="24" r="20"
                  stroke={isExpiring ? "var(--c-terracotta)" : "var(--c-gold)"}
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${strokeDash} ${circumference}`}
                  style={{ transition: "stroke-dasharray 0.9s linear, stroke 0.3s" }}
                />
              </svg>
              <span
                className="absolute inset-0 flex items-center justify-center text-[11px] font-bold"
                style={{ color: isExpiring ? "var(--c-terracotta)" : "var(--c-text-secondary)" }}
              >
                {countdown}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold" style={{ color: "var(--c-text-primary)" }}>
                {isExpiring ? "Code expiring soon…" : "Waiting for staff to scan"}
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: "var(--c-text-muted)" }}>
                Refreshes every {EXPIRY_SECONDS}s for security
              </p>
            </div>

            <button
              onClick={refreshQr}
              className="w-9 h-9 flex items-center justify-center rounded-full flex-shrink-0 active:scale-90 transition-transform"
              style={{ backgroundColor: "var(--c-bg)", color: "var(--c-text-secondary)" }}
              type="button"
              title="Refresh QR code"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

          {/* Stamp count strip */}
          <div
            className="w-full rounded-xl px-4 py-3 flex items-center justify-between"
            style={{ backgroundColor: "var(--c-bg)", border: "1px solid var(--c-border)" }}
          >
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" style={{ color: "var(--c-text-muted)" }} />
              <span className="text-[12px]" style={{ color: "var(--c-text-secondary)" }}>
                Current stamps
              </span>
            </div>
            <span className="text-[14px] font-bold">
              <span style={{ color: "var(--c-gold)" }}>{currentStamps}</span>
              <span style={{ color: "var(--c-text-muted)" }}> / {maxStamps}</span>
            </span>
          </div>

          <p className="text-[11px] text-center leading-relaxed" style={{ color: "var(--c-text-muted)" }}>
            The barista will scan this code with the staff app to credit your stamp.
          </p>
        </div>
      </div>
    </div>
  );
};
