"use client";

import React, { useState } from "react";
import {
  Plus,
  Shield,
  Filter,
  MoreVertical,
  CheckCircle2,
  Info,
  UserCheck,
  Mail,
  Lock,
  Clock
} from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarText: string;
  title: string;
  role: "Owner" | "Staff";
  email: string;
  status: "Active" | "Invited (pending)";
  addedDate: string;
}

export default function AdminStaffPage() {
  const [filterKeyword, setFilterKeyword] = useState("");

  const staffMembers: StaffMember[] = [
    {
      id: "staff_1",
      name: "Sarah K.",
      initials: "SK",
      avatarBg: "bg-[#A7F3D0]",
      avatarText: "text-[#065F46]",
      title: "Primary Store Admin",
      role: "Owner",
      email: "sarah@abccafe.com",
      status: "Active",
      addedDate: "Aug 1, 2024",
    },
    {
      id: "staff_2",
      name: "Bikash Shrestha",
      initials: "BS",
      avatarBg: "bg-[#E4E4E7]",
      avatarText: "text-[#1C1C1E]",
      title: "Front of House Shift",
      role: "Staff",
      email: "bikash@abccafe.com",
      status: "Active",
      addedDate: "Aug 15, 2024",
    },
    {
      id: "staff_3",
      name: "Anita Rai",
      initials: "AR",
      avatarBg: "bg-[#E4E4E7]",
      avatarText: "text-[#1C1C1E]",
      title: "Lead Barista",
      role: "Staff",
      email: "anita@abccafe.com",
      status: "Active",
      addedDate: "Sep 1, 2024",
    },
    {
      id: "staff_4",
      name: "Kiran Thapa",
      initials: "KT",
      avatarBg: "bg-[#E4E4E7]",
      avatarText: "text-[#1C1C1E]",
      title: "Weekend Service",
      role: "Staff",
      email: "kiran@abccafe.com",
      status: "Invited (pending)",
      addedDate: "Sep 20, 2024",
    },
  ];

  const filteredStaff = staffMembers.filter((staff) => {
    if (!filterKeyword) return true;
    const query = filterKeyword.toLowerCase();
    return (
      staff.name.toLowerCase().includes(query) ||
      staff.email.toLowerCase().includes(query) ||
      staff.title.toLowerCase().includes(query)
    );
  });

  const permissions = [
    {
      capability: "Look up & register customers",
      description: "Search by phone, email or enroll new guests at the counter",
      owner: true,
      staff: true,
    },
    {
      capability: "Verify reward redemption",
      description: "Scan pass codes and mark customer vouchers as spent",
      owner: true,
      staff: true,
    },
    {
      capability: "Create & edit rewards",
      description: "Configure point thresholds, rules, expirations, and campaigns",
      owner: true,
      staff: false,
    },
    {
      capability: "View analytics & reports",
      description: "Retention cohorts, revenue attribution, and exportable ledger",
      owner: true,
      staff: false,
    },
    {
      capability: "Manage staff access",
      description: "Grant logins, revoke team credentials, and assign shift roles",
      owner: true,
      staff: false,
    },
    {
      capability: "Delete customer history",
      description: "Permanently remove a customer's records on request",
      owner: true,
      staff: false,
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto gap-6">
      {/* 1. Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-[#1C1C1E] tracking-tight">
              Staff
            </h1>
            <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#E4E4E7] text-xs font-semibold text-[#6E6E73]">
              4 Members
            </span>
          </div>
          <p className="text-xs text-[#6E6E73] mt-1 font-medium">
            Manage team access and credential governance for ABC Café
          </p>
        </div>

        <button
          onClick={() => alert("Invite staff modal")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#046A38] hover:bg-[#03522B] text-white text-xs font-bold shadow-sm transition-colors self-start sm:self-auto"
          type="button"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Invite Staff</span>
        </button>
      </div>

      {/* 2. Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Stat 1: Active Seats */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4E4E7] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
              ACTIVE SEATS
            </span>
            <span className="text-3xl font-bold text-[#1C1C1E] mt-2">3</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#A7F3D0]/50 text-[#046A38] flex items-center justify-center flex-shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        {/* Stat 2: Pending Invitations */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4E4E7] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
              PENDING INVITATIONS
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-bold text-[#1C1C1E]">1</span>
              <span className="text-xs text-[#6E6E73] font-medium">expiring in 4 days</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#F2F2F5] text-[#6E6E73] flex items-center justify-center flex-shrink-0 border border-[#E4E4E7]">
            <Mail className="w-5 h-5" />
          </div>
        </div>

        {/* Stat 3: Store Role Distribution */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4E4E7] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider">
              STORE ROLE DISTRIBUTION
            </span>
            <span className="text-sm font-bold text-[#1C1C1E] mt-3">
              1 Owner • 3 Staff
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#F2F2F5] text-[#6E6E73] flex items-center justify-center flex-shrink-0 border border-[#E4E4E7]">
            <Lock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Filter Bar & Staff Table Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#E4E4E7] overflow-hidden flex flex-col">
        {/* Search Header Bar */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-[#E4E4E7]">
          <div className="relative flex items-center w-full max-w-md">
            <Filter className="w-4 h-4 absolute left-3.5 text-[#6E6E73] pointer-events-none" />
            <input
              type="text"
              placeholder="Filter staff by name or email..."
              value={filterKeyword}
              onChange={(e) => setFilterKeyword(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F2F2F5] text-[#1C1C1E] placeholder:text-[#6E6E73] text-xs rounded-xl border border-transparent focus:outline-none focus:border-[#046A38] focus:bg-white transition-colors"
            />
          </div>

          <span className="text-xs text-[#6E6E73] font-medium self-end sm:self-auto whitespace-nowrap">
            Showing {filteredStaff.length} of {staffMembers.length} team members
          </span>
        </div>

        {/* Staff Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8F8FA] text-[#6E6E73] text-[11px] font-semibold uppercase tracking-wider border-b border-[#E4E4E7]">
                <th className="px-6 py-3.5">NAME</th>
                <th className="px-6 py-3.5">ROLE</th>
                <th className="px-6 py-3.5">EMAIL</th>
                <th className="px-6 py-3.5">STATUS</th>
                <th className="px-6 py-3.5">ADDED</th>
                <th className="px-6 py-3.5 text-right w-12" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              {filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-[#F8F8FA] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full ${staff.avatarBg} ${staff.avatarText} flex items-center justify-center text-xs font-bold flex-shrink-0`}
                      >
                        {staff.initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-[#1C1C1E] text-sm leading-tight">
                          {staff.name}
                        </span>
                        <span className="text-[11px] text-[#6E6E73] font-medium mt-0.5">
                          {staff.title}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {staff.role === "Owner" ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[#046A38] text-white">
                        Owner
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-[#F2F2F5] text-[#6E6E73] border border-[#E4E4E7]">
                        Staff
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-[#1C1C1E] font-medium">
                    {staff.email}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {staff.status === "Active" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#A7F3D0]/40 text-[#046A38]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#046A38]" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#F2F2F5] text-[#6E6E73]">
                        <Clock className="w-3 h-3 text-[#6E6E73]" />
                        Invited (pending)
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-[#6E6E73] font-medium">
                    {staff.addedDate}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      type="button"
                      className="p-1 rounded-lg hover:bg-[#E4E4E7] text-[#6E6E73] hover:text-[#1C1C1E] transition-colors"
                      onClick={() => alert(`Actions for ${staff.name}`)}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Staff Permissions Matrix Card */}
      <section className="bg-white rounded-2xl shadow-sm border border-[#E4E4E7] p-6 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#A7F3D0]/40 text-[#046A38] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1C1C1E]">
                Staff Permissions
              </h2>
              <p className="text-xs text-[#6E6E73] mt-0.5 font-medium max-w-2xl">
                Clear reference of access levels and capabilities across roles — staff members cannot access store analytics or modify reward structures.
              </p>
            </div>
          </div>

          <span className="self-start px-2.5 py-1 rounded-md bg-[#F2F2F5] text-[#6E6E73] text-[11px] font-semibold whitespace-nowrap">
            Read-only Policy
          </span>
        </div>

        {/* Capabilities Table */}
        <div className="w-full overflow-x-auto border-t border-[#E4E4E7]">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8F8FA] text-[#6E6E73] text-[11px] font-semibold uppercase tracking-wider border-b border-[#E4E4E7]">
                <th className="px-4 py-3.5">CAPABILITY / ACTION</th>
                <th className="px-4 py-3.5 text-center w-28">
                  <span className="inline-flex items-center gap-1">
                    OWNER
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#046A38]" />
                  </span>
                </th>
                <th className="px-4 py-3.5 text-center w-28">STAFF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              {permissions.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#F8F8FA] transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#1C1C1E] text-xs">
                        {item.capability}
                      </span>
                      <span className="text-[11px] text-[#6E6E73] mt-0.5 font-medium">
                        {item.description}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-center">
                    {item.owner ? (
                      <div className="flex justify-center">
                        <CheckCircle2 className="w-4 h-4 text-[#046A38]" />
                      </div>
                    ) : (
                      <span className="text-[#9CA3AF] font-bold">—</span>
                    )}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {item.staff ? (
                      <div className="flex justify-center">
                        <CheckCircle2 className="w-4 h-4 text-[#046A38]" />
                      </div>
                    ) : (
                      <span className="text-[#9CA3AF] font-bold">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Security Audit Note */}
        <div className="p-3.5 rounded-xl bg-[#F8F8FA] border border-[#E4E4E7] flex items-start gap-3">
          <Info className="w-4 h-4 text-[#1C7C54] flex-shrink-0 mt-0.5" />
          <p className="text-xs text-[#6E6E73] font-medium leading-relaxed">
            Staff logins operate under scoped counter permissions. Any attempt to modify system settings or access confidential store analytics logs a security event in the owner audit stream.
          </p>
        </div>
      </section>
    </div>
  );
}
