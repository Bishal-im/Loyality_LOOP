"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, User } from "lucide-react";
import { CustomerShell } from "@/components/customer/CustomerShell";

export default function ProfilePage() {
  const [marketingEnabled, setMarketingEnabled] = useState(true);
  const [dob, setDob] = useState("");

  React.useEffect(() => {
    // Load DOB from local storage
    const savedDob = localStorage.getItem("customerDob");
    if (savedDob) {
      setDob(savedDob);
    }
  }, []);

  return (
    <CustomerShell
      title="Profile"
      trailing={
        <div className="w-8 h-8 rounded-[0.65rem] bg-primary flex items-center justify-center text-bg">
          <User className="w-4 h-4" />
        </div>
      }
    >
      <div className="flex flex-col items-center justify-center pt-6 pb-6">
        <div className="relative flex items-center justify-center w-[72px] h-[72px] rounded-[1.15rem] bg-primary text-bg select-none">
          <span className="text-2xl font-display font-medium">R</span>
        </div>
        <h2 className="mt-3 text-lg font-display font-medium tracking-tight text-center">
          Rahul Thapa
        </h2>
        <p className="mt-0.5 text-xs text-text-secondary text-center">
          +977 9841234567
        </p>
        {dob && (
          <p className="mt-1 text-xs text-text-secondary text-center">
            Born: {new Date(dob).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        )}
      </div>

      <div className="w-full paper-card overflow-hidden rounded-[1.5rem]">
        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
          <span className="text-sm">Email</span>
          <span className="text-sm text-text-secondary select-all">
            rahul@example.com
          </span>
        </div>

        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
          <span className="text-sm">Marketing preferences</span>
          <button
            type="button"
            aria-pressed={marketingEnabled}
            onClick={() => setMarketingEnabled(!marketingEnabled)}
            className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ${
              marketingEnabled ? "bg-primary" : "bg-border"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-surface shadow-sm ring-0 transition duration-200 ${
                marketingEnabled ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between px-4 py-3.5 border-b border-border">
          <span className="text-sm">Date of Birth</span>
          <span className="text-sm text-text-secondary">
            {dob ? new Date(dob).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Not provided"}
          </span>
        </div>

        <Link
          href="#"
          className="flex items-center justify-between px-4 py-3.5 border-b border-border hover:bg-surface-low transition-colors group"
        >
          <span className="text-sm">Privacy Policy</span>
          <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-colors" />
        </Link>

        <Link
          href="#"
          className="flex items-center justify-between px-4 py-3.5 hover:bg-surface-low transition-colors group"
        >
          <span className="text-sm">Terms of Service</span>
          <ChevronRight className="w-5 h-5 text-text-secondary group-hover:text-text-primary transition-colors" />
        </Link>
      </div>

      <div className="w-full mt-4 paper-card overflow-hidden rounded-[1.5rem]">
        <button
          type="button"
          onClick={() => alert("Delete account functionality stubbed")}
          className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-surface-low transition-colors text-left"
        >
          <span className="text-sm font-medium text-alert">Delete Account</span>
          <ChevronRight className="w-5 h-5 text-alert" />
        </button>
      </div>

      <div className="flex justify-center items-center mt-7">
        <Link
          href="/register"
          className="text-sm text-text-secondary hover:text-text-primary transition-colors py-2 px-4"
        >
          Log Out
        </Link>
      </div>
    </CustomerShell>
  );
}
