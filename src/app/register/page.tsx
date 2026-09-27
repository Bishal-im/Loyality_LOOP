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
    <main className="min-h-screen bg-[#F2F2F5] text-[#1C1C1E] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-[375px] mx-auto py-8">
        <div className="text-center mb-7">
          <h1 className="text-3xl font-serif tracking-tight text-[#1C1C1E]">
            LoyalLoop
          </h1>
          <p className="text-sm text-[#6E6E73] mt-1.5">
            Welcome! Let's get you set up.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-[20px] p-6 shadow-sm flex flex-col space-y-5 border border-[#E4E4E7]"
        >
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="fullName"
              className="text-[11px] font-semibold uppercase tracking-wider text-[#1C1C1E]"
            >
              Name
            </label>
            <input
              id="fullName"
              type="text"
              placeholder="Alex Morgan"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-[#F2F2F5] border border-[#E4E4E7] text-sm text-[#1C1C1E] placeholder:text-[#6E6E73] outline-none focus:border-[#1C7C54] transition-colors"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="phone"
              className="text-[11px] font-semibold uppercase tracking-wider text-[#1C1C1E]"
            >
              Phone number
            </label>
            <div className="flex items-center w-full h-12 rounded-xl bg-[#F2F2F5] border border-[#E4E4E7] px-3 focus-within:border-[#1C7C54] transition-colors">
              <button
                type="button"
                className="flex items-center space-x-1 py-1 text-[#1C1C1E] shrink-0 focus:outline-none pr-2"
              >
                <span className="text-xs font-medium">Nepal +977</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#6E6E73]" />
              </button>
              <span className="w-px h-5 bg-[#E4E4E7] mx-2 shrink-0" />
              <input
                id="phone"
                type="tel"
                placeholder="980 000 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-transparent text-sm text-[#1C1C1E] placeholder:text-[#6E6E73] outline-none pl-1"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            <label
              htmlFor="email"
              className="text-[11px] font-semibold uppercase tracking-wider text-[#1C1C1E]"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="alex@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-xl bg-[#F2F2F5] border border-[#E4E4E7] text-sm text-[#1C1C1E] placeholder:text-[#6E6E73] outline-none focus:border-[#1C7C54] transition-colors"
            />
          </div>

          <label className="flex items-start space-x-3 cursor-pointer select-none pt-1">
            <div className="relative flex items-center justify-center shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={updates}
                onChange={(e) => setUpdates(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-[18px] h-[18px] rounded border border-[#E4E4E7] bg-[#F2F2F5] peer-checked:bg-[#1C7C54] peer-checked:border-[#1C7C54] flex items-center justify-center transition-colors">
                <Check className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity stroke-[3]" />
              </div>
            </div>
            <span className="text-xs text-[#6E6E73] leading-tight">
              Send me updates about my rewards and offers.
            </span>
          </label>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-12 rounded-xl bg-[#1C7C54] hover:bg-[#16603F] text-white font-semibold text-sm flex items-center justify-center transition-colors shadow-sm"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
