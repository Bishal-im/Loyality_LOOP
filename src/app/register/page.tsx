"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [updates, setUpdates] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/profile");
  };

  return (
    <main
      className="min-h-screen flex flex-col justify-center items-center p-4"
      style={{ backgroundColor: "var(--c-bg)", color: "var(--c-text-primary)" }}
    >
      <div className="w-full max-w-[375px] mx-auto py-8">
        {/* Heading */}
        <div className="text-center mb-7">
          <h1
            className="text-3xl font-serif tracking-tight"
            style={{ color: "var(--c-text-primary)" }}
          >
            LoyalLoop
          </h1>
          <p className="text-sm mt-1.5" style={{ color: "var(--c-text-secondary)" }}>
            Welcome! Let&apos;s get you set up.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[20px] p-6 flex flex-col space-y-5 border"
          style={{
            backgroundColor: "var(--c-surface)",
            borderColor: "var(--c-border)",
            boxShadow: "0 2px 16px rgba(43,33,24,0.07)",
          }}
        >
          {/* Name */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="fullName"
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--c-text-primary)" }}
            >
              Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Alex Morgan"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-12 px-4 rounded-xl text-sm outline-none transition-colors border"
              style={{
                backgroundColor: "var(--c-bg)",
                borderColor: "var(--c-border)",
                color: "var(--c-text-primary)",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--c-terracotta)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--c-border)")}
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="phone"
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--c-text-primary)" }}
            >
              Phone number
            </label>
            <div
              className="flex items-center w-full h-12 rounded-xl px-3 border transition-colors"
              style={{
                backgroundColor: "var(--c-bg)",
                borderColor: "var(--c-border)",
              }}
              onFocusCapture={e => (e.currentTarget.style.borderColor = "var(--c-terracotta)")}
              onBlurCapture={e => (e.currentTarget.style.borderColor = "var(--c-border)")}
            >
              <button
                type="button"
                className="flex items-center space-x-1 py-1 shrink-0 focus:outline-none pr-2"
                style={{ color: "var(--c-text-primary)" }}
              >
                <span className="text-xs font-medium">Nepal +977</span>
                <ChevronDown className="w-3.5 h-3.5" style={{ color: "var(--c-text-secondary)" }} />
              </button>
              <span
                className="w-px h-5 mx-2 shrink-0"
                style={{ backgroundColor: "var(--c-border)" }}
              />
              <input
                id="phone"
                type="tel"
                placeholder="980 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent text-sm outline-none pl-1"
                style={{ color: "var(--c-text-primary)" }}
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="email"
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--c-text-primary)" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-xl text-sm outline-none transition-colors border"
              style={{
                backgroundColor: "var(--c-bg)",
                borderColor: "var(--c-border)",
                color: "var(--c-text-primary)",
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "var(--c-terracotta)")}
              onBlur={e => (e.currentTarget.style.borderColor = "var(--c-border)")}
            />
          </div>

          {/* Marketing checkbox */}
          <label className="flex items-start space-x-3 cursor-pointer select-none pt-1">
            <div className="relative flex items-center justify-center shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={updates}
                onChange={(e) => setUpdates(e.target.checked)}
                className="sr-only peer"
              />
              <div
                className="w-[18px] h-[18px] rounded flex items-center justify-center transition-colors border"
                style={{
                  backgroundColor: updates ? "var(--c-terracotta)" : "var(--c-bg)",
                  borderColor: updates ? "var(--c-terracotta)" : "var(--c-border)",
                }}
              >
                {updates && <Check className="w-3 h-3 text-white stroke-[3]" />}
              </div>
            </div>
            <span className="text-xs leading-tight" style={{ color: "var(--c-text-secondary)" }}>
              Send me updates about my rewards and offers.
            </span>
          </label>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 rounded-xl text-white font-semibold text-sm flex items-center justify-center transition-colors"
              style={{ backgroundColor: "var(--c-terracotta)" }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = "var(--c-terracotta-deep)")}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = "var(--c-terracotta)")}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
