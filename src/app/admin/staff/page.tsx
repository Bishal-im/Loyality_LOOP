"use client";

import React, { useState } from "react";
import { UserCheck, Plus, Shield, Key, Eye, EyeOff } from "lucide-react";
import { MOCK_STAFF } from "@/lib/mock-data";

export default function AdminStaffPage() {
  const [showPins, setShowPins] = useState<{ [key: string]: boolean }>({});

  const togglePin = (id: string) => {
    setShowPins((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col w-full gap-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1C1C1E] tracking-tight">
            Staff Management
          </h1>
          <p className="text-xs text-[#6E6E73] mt-0.5">
            Manage store staff accounts, access roles, and PIN codes for stamp scanning
          </p>
        </div>

        <button
          onClick={() => alert("Add Staff modal stubbed")}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1C7C54] hover:bg-[#16603F] text-white text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E4E4E7] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F2F2F5] border-b border-[#E4E4E7] text-[#6E6E73] uppercase tracking-wider text-[11px] font-semibold">
                <th className="px-6 py-3.5">Staff Member</th>
                <th className="px-6 py-3.5">Role</th>
                <th className="px-6 py-3.5">Contact Email</th>
                <th className="px-6 py-3.5">Scanner PIN</th>
                <th className="px-6 py-3.5">Total Scans</th>
                <th className="px-6 py-3.5">Last Active</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              {MOCK_STAFF.map((staff) => (
                <tr key={staff.id} className="hover:bg-[#F2F2F5] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#1C7C54]/10 text-[#1C7C54] font-bold flex items-center justify-center text-sm">
                        {staff.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-semibold text-[#1C1C1E]">
                          {staff.name}
                        </span>
                        <p className="text-[11px] text-[#6E6E73]">{staff.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-[#1C1C1E]">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F2F2F5] border border-[#E4E4E7] text-[#1C1C1E]">
                      <Shield className="w-3 h-3 text-[#1C7C54]" />
                      <span>{staff.role}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#6E6E73]">{staff.email}</td>
                  <td className="px-6 py-4">
                    <div className="inline-flex items-center gap-2 font-mono bg-[#F2F2F5] px-2.5 py-1 rounded-lg border border-[#E4E4E7]">
                      <Key className="w-3 h-3 text-[#6E6E73]" />
                      <span>{showPins[staff.id] ? staff.pin : "••••"}</span>
                      <button
                        onClick={() => togglePin(staff.id)}
                        className="text-[#6E6E73] hover:text-[#1C1C1E] ml-1"
                        type="button"
                      >
                        {showPins[staff.id] ? (
                          <EyeOff className="w-3 h-3" />
                        ) : (
                          <Eye className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-[#1C7C54]">
                    {staff.totalScans} scans
                  </td>
                  <td className="px-6 py-4 text-[#6E6E73]">{staff.lastActive}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => alert(`Edit ${staff.name}`)}
                      className="text-xs font-semibold text-[#1C7C54] hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
