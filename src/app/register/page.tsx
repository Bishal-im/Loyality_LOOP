"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Check, AlertCircle } from "lucide-react";

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [updates, setUpdates] = useState(false); // Initialize unchecked
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!fullName.trim()) e.fullName = "Name is required";
    if (!phone.trim()) {
      e.phone = "Phone number is required";
    } else if (phone.replace(/\D/g, "").length < 7) {
      e.phone = "Please enter a valid phone number";
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = "Please enter a valid email address";
    }
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      // Focus first invalid field for accessibility
      const firstErrorField = errs.fullName ? "fullName" : errs.phone ? "phone" : "email";
      document.getElementById(firstErrorField)?.focus();
      return;
    }
    setLoading(true);
    // Show prototype preview instead of claiming real account creation
    setTimeout(() => {
      setLoading(false);
      setShowPreview(true);
    }, 800);
  };

  const inputStyle = (hasErr?: string) => ({
    backgroundColor: "var(--c-bg)",
    borderColor: hasErr ? "var(--c-alert)" : "var(--c-border)",
    color: "var(--c-text-primary)",
  });

  if (showPreview) {
    return (
      <main
        className="min-h-screen flex flex-col justify-center items-center p-4"
        style={{ backgroundColor: "var(--c-bg)" }}
      >
        <div className="w-full max-w-[420px] mx-auto py-8">
          <div
            className="rounded-[20px] p-8 flex flex-col items-center space-y-5 border"
            style={{
              backgroundColor: "var(--c-surface)",
              borderColor: "var(--c-border)",
              boxShadow: "0 2px 16px rgba(43,33,24,0.07)",
            }}
          >
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "var(--c-gold-light)" }}
            >
              <Check className="w-8 h-8" style={{ color: "var(--c-gold)" }} strokeWidth={2.5} />
            </div>

            <div className="text-center space-y-2">
              <h2
                className="text-xl font-serif tracking-tight"
                style={{ color: "var(--c-text-primary)" }}
              >
                Registration Preview
              </h2>
              <p className="text-sm" style={{ color: "var(--c-text-secondary)" }}>
                Frontend prototype only — no account was created
              </p>
            </div>

            <div
              className="w-full p-4 rounded-xl border"
              style={{ backgroundColor: "var(--c-bg)", borderColor: "var(--c-border)" }}
            >
              <div className="flex flex-col gap-2 text-xs" style={{ color: "var(--c-text-secondary)" }}>
                <div className="flex justify-between">
                  <span>Name:</span>
                  <span style={{ color: "var(--c-text-primary)", fontWeight: 600 }}>{fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span style={{ color: "var(--c-text-primary)", fontWeight: 600 }}>
                    +977 {phone}
                  </span>
                </div>
                {email && (
                  <div className="flex justify-between">
                    <span>Email:</span>
                    <span style={{ color: "var(--c-text-primary)", fontWeight: 600 }}>{email}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Marketing consent:</span>
                  <span style={{ color: "var(--c-text-primary)", fontWeight: 600 }}>
                    {updates ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>

            <div
              className="w-full p-3 rounded-lg flex items-start gap-2 border"
              style={{
                backgroundColor: "var(--c-banner-bg)",
                borderColor: "var(--c-banner-border)",
              }}
            >
              <AlertCircle
                className="w-4 h-4 mt-0.5 shrink-0"
                style={{ color: "var(--c-banner-text)" }}
              />
              <p className="text-[11px] leading-relaxed" style={{ color: "var(--c-banner-text)" }}>
                This is a disconnected frontend demo. In production, registration would create an
                account and send a verification code.
              </p>
            </div>

            <div className="w-full flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => router.push("/home")}
                className="btn-press w-full h-12 rounded-xl text-white font-semibold text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                style={{ backgroundColor: "var(--c-terracotta)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--c-terracotta-deep)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--c-terracotta)")
                }
              >
                Continue to Demo App
              </button>
              <button
                type="button"
                onClick={() => setShowPreview(false)}
                className="btn-press w-full h-10 rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                style={{ color: "var(--c-text-secondary)" }}
              >
                ← Back to Form
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex flex-col justify-center items-center p-4"
      style={{ backgroundColor: "var(--c-bg)" }}
    >
      <div className="w-full max-w-[375px] mx-auto py-8">
        <div className="text-center mb-7">
          <h1 className="text-3xl font-serif tracking-tight" style={{ color: "var(--c-text-primary)" }}>
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
          {/* Full Name - REQUIRED */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="fullName"
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--c-text-primary)" }}
            >
              Name <span style={{ color: "var(--c-alert)" }}>*</span>
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Alex Morgan"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                setErrors((v) => ({ ...v, fullName: undefined }));
              }}
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              className="w-full h-12 px-4 rounded-xl text-sm outline-none border transition-colors"
              style={inputStyle(errors.fullName)}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--c-terracotta)")}
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = errors.fullName
                  ? "var(--c-alert)"
                  : "var(--c-border)")
              }
            />
            {errors.fullName && (
              <div id="fullName-error" className="flex items-center gap-1" role="alert">
                <AlertCircle className="w-3.5 h-3.5" style={{ color: "var(--c-alert)" }} />
                <p className="text-[11px]" style={{ color: "var(--c-alert)" }}>
                  {errors.fullName}
                </p>
              </div>
            )}
          </div>

          {/* Phone - REQUIRED */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="phone"
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--c-text-primary)" }}
            >
              Phone number <span style={{ color: "var(--c-alert)" }}>*</span>
            </label>
            <div
              className="flex items-center w-full h-12 rounded-xl px-3 border transition-colors"
              style={inputStyle(errors.phone)}
              onFocusCapture={(e) => (e.currentTarget.style.borderColor = "var(--c-terracotta)")}
              onBlurCapture={(e) =>
                (e.currentTarget.style.borderColor = errors.phone
                  ? "var(--c-alert)"
                  : "var(--c-border)")
              }
            >
              <button
                type="button"
                className="flex items-center space-x-1 py-1 shrink-0 focus:outline-none pr-2"
                style={{ color: "var(--c-text-primary)" }}
              >
                <span className="text-xs font-medium">+977</span>
                <ChevronDown className="w-3.5 h-3.5" style={{ color: "var(--c-text-secondary)" }} />
              </button>
              <span className="w-px h-5 mx-2 shrink-0" style={{ backgroundColor: "var(--c-border)" }} />
              <input
                id="phone"
                type="tel"
                placeholder="980 000 0000"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setErrors((v) => ({ ...v, phone: undefined }));
                }}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
                className="w-full bg-transparent text-sm outline-none pl-1"
                style={{ color: "var(--c-text-primary)" }}
              />
            </div>
            {errors.phone && (
              <div id="phone-error" className="flex items-center gap-1" role="alert">
                <AlertCircle className="w-3.5 h-3.5" style={{ color: "var(--c-alert)" }} />
                <p className="text-[11px]" style={{ color: "var(--c-alert)" }}>
                  {errors.phone}
                </p>
              </div>
            )}
          </div>

          {/* Email (optional) */}
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="email"
              className="text-[11px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--c-text-primary)" }}
            >
              Email <span style={{ color: "var(--c-text-muted)", fontWeight: 400 }}>(optional)</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((v) => ({ ...v, email: undefined }));
              }}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full h-12 px-4 rounded-xl text-sm outline-none border transition-colors"
              style={inputStyle(errors.email)}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--c-terracotta)")}
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = errors.email
                  ? "var(--c-alert)"
                  : "var(--c-border)")
              }
            />
            {errors.email && (
              <div id="email-error" className="flex items-center gap-1" role="alert">
                <AlertCircle className="w-3.5 h-3.5" style={{ color: "var(--c-alert)" }} />
                <p className="text-[11px]" style={{ color: "var(--c-alert)" }}>
                  {errors.email}
                </p>
              </div>
            )}
          </div>

          {/* Updates checkbox - separate from required fields */}
          <div className="pt-2 border-t" style={{ borderColor: "var(--c-border)" }}>
            <label className="flex items-start space-x-3 cursor-pointer select-none">
              <div className="relative flex items-center justify-center shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={updates}
                  onChange={(e) => setUpdates(e.target.checked)}
                  className="sr-only"
                  aria-label="Send me updates about my rewards and offers"
                />
                <div
                  className="w-[18px] h-[18px] rounded flex items-center justify-center border transition-colors"
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
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="btn-press w-full h-12 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              style={{ backgroundColor: loading ? "var(--c-text-muted)" : "var(--c-terracotta)" }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = "var(--c-terracotta-deep)";
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.backgroundColor = "var(--c-terracotta)";
              }}
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="white"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : null}
              {loading ? "Setting up…" : "Continue"}
            </button>
          </div>
        </form>

        <p className="text-center text-[11px] mt-4" style={{ color: "var(--c-text-muted)" }}>
          Already a member?{" "}
          <button
            onClick={() => router.push("/home")}
            className="font-semibold btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 rounded"
            style={{ color: "var(--c-terracotta)" }}
          >
            Sign in
          </button>
        </p>
      </div>
    </main>
  );
}
