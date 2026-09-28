"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { PageShell } from "@/components/customer/PageShell";
import { useCustomer } from "@/lib/customer-store";

export default function EditProfilePage() {
  const router = useRouter();
  const { state, updateProfile } = useCustomer();
  const { profile } = state;

  const [name,  setName]  = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim())  e.name  = "Name is required";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Valid email required";
    if (!phone.trim()) e.phone = "Phone is required";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    updateProfile({ name, email, phone, avatarInitial: name.trim()[0].toUpperCase() });
    setSaved(true);
    setTimeout(() => { setSaved(false); router.push("/profile"); }, 1000);
  };

  const fieldStyle = (err?: string) => ({
    backgroundColor: "var(--c-bg)",
    borderColor: err ? "var(--c-alert)" : "var(--c-border)",
    color: "var(--c-text-primary)",
  });

  return (
    <PageShell back backHref="/profile" title="Edit Profile">
      <div className="flex flex-col gap-5">
        {/* Avatar */}
        <div className="flex flex-col items-center py-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white"
            style={{ background: "linear-gradient(135deg, #B8A898 0%, #7A9A82 100%)" }}>
            {name.trim()[0]?.toUpperCase() ?? "?"}
          </div>
          <p className="text-[12px] mt-2" style={{ color: "var(--c-text-muted)" }}>Tap to change photo (coming soon)</p>
        </div>

        <div className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}>
          {/* Full Name */}
          <div className="px-4 py-4 border-b" style={{ borderColor: "var(--c-border)" }}>
            <label className="text-[10px] font-semibold uppercase tracking-widest block mb-2" style={{ color: "var(--c-text-muted)" }}>Full Name</label>
            <input value={name} onChange={e => { setName(e.target.value); setErrors(v => ({ ...v, name: "" })); }}
              className="w-full h-11 px-3.5 rounded-xl text-[14px] outline-none border"
              style={fieldStyle(errors.name)} />
            {errors.name && <p className="text-[11px] mt-1" style={{ color: "var(--c-alert)" }}>{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="px-4 py-4 border-b" style={{ borderColor: "var(--c-border)" }}>
            <label className="text-[10px] font-semibold uppercase tracking-widest block mb-2" style={{ color: "var(--c-text-muted)" }}>Email Address</label>
            <input type="email" value={email} onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: "" })); }}
              className="w-full h-11 px-3.5 rounded-xl text-[14px] outline-none border"
              style={fieldStyle(errors.email)} />
            {errors.email && <p className="text-[11px] mt-1" style={{ color: "var(--c-alert)" }}>{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className="px-4 py-4">
            <label className="text-[10px] font-semibold uppercase tracking-widest block mb-2" style={{ color: "var(--c-text-muted)" }}>Phone Number</label>
            <input type="tel" value={phone} onChange={e => { setPhone(e.target.value); setErrors(v => ({ ...v, phone: "" })); }}
              className="w-full h-11 px-3.5 rounded-xl text-[14px] outline-none border"
              style={fieldStyle(errors.phone)} />
            {errors.phone && <p className="text-[11px] mt-1" style={{ color: "var(--c-alert)" }}>{errors.phone}</p>}
          </div>
        </div>

        {/* Read-only fields */}
        <div className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: "var(--c-surface)", borderColor: "var(--c-border)" }}>
          <div className="px-4 py-3.5 flex justify-between border-b" style={{ borderColor: "var(--c-border)" }}>
            <span className="text-[13px]" style={{ color: "var(--c-text-secondary)" }}>Patron ID</span>
            <span className="text-[13px] font-semibold" style={{ color: "var(--c-text-primary)" }}>{profile.patronId}</span>
          </div>
          <div className="px-4 py-3.5 flex justify-between">
            <span className="text-[13px]" style={{ color: "var(--c-text-secondary)" }}>Member Since</span>
            <span className="text-[13px] font-semibold" style={{ color: "var(--c-text-primary)" }}>{profile.memberSince}</span>
          </div>
        </div>

        <button onClick={handleSave}
          className="w-full h-13 py-3.5 rounded-xl font-semibold text-[15px] text-white flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          style={{ backgroundColor: saved ? "var(--c-sage)" : "var(--c-terracotta)" }}
          onMouseEnter={e => { if (!saved) e.currentTarget.style.backgroundColor = "var(--c-terracotta-deep)"; }}
          onMouseLeave={e => { if (!saved) e.currentTarget.style.backgroundColor = "var(--c-terracotta)"; }}>
          {saved ? <><Check className="w-4 h-4" /> Saved!</> : "Save Changes"}
        </button>
      </div>
    </PageShell>
  );
}
