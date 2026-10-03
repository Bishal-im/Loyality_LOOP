"use client";

import React, { useState } from "react";
import {
  Plus,
  Shield,
  MoreVertical,
  CheckCircle2,
  Info,
  UserCheck,
  Mail,
  Lock,
  Clock,
  X,
  Check,
  Search,
  Crown,
} from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  title: string;
  role: "Owner" | "Staff";
  email: string;
  status: "Active" | "Invited (pending)";
  addedDate: string;
  lastActive: string;
}

const STAFF: StaffMember[] = [
  {
    id: "staff_1", name: "Sarah K.", initials: "SK", avatarColor: "#27272A",
    title: "Primary Store Admin", role: "Owner", email: "sarah@abccafe.com",
    status: "Active", addedDate: "Aug 1, 2024", lastActive: "2 min ago",
  },
  {
    id: "staff_2", name: "Bikash Shrestha", initials: "BS", avatarColor: "#3F3F46",
    title: "Front of House Shift", role: "Staff", email: "bikash@abccafe.com",
    status: "Active", addedDate: "Aug 15, 2024", lastActive: "1 h ago",
  },
  {
    id: "staff_3", name: "Anita Rai", initials: "AR", avatarColor: "#52525B",
    title: "Lead Barista", role: "Staff", email: "anita@abccafe.com",
    status: "Active", addedDate: "Sep 1, 2024", lastActive: "Yesterday",
  },
  {
    id: "staff_4", name: "Kiran Thapa", initials: "KT", avatarColor: "#71717A",
    title: "Weekend Service", role: "Staff", email: "kiran@abccafe.com",
    status: "Invited (pending)", addedDate: "Sep 20, 2024", lastActive: "Pending",
  },
];

const PERMISSIONS = [
  { capability: "Look up & register customers", description: "Search by phone, email or enroll new guests at the counter", owner: true, staff: true },
  { capability: "Verify reward redemption", description: "Scan pass codes and mark customer vouchers as spent", owner: true, staff: true },
  { capability: "Add visit stamps", description: "Record a customer visit and increment their loyalty progress", owner: true, staff: true },
  { capability: "Create & edit rewards", description: "Configure point thresholds, rules, expirations, and campaigns", owner: true, staff: false },
  { capability: "View analytics & reports", description: "Retention cohorts, revenue attribution, and exportable ledger", owner: true, staff: false },
  { capability: "Manage staff access", description: "Grant logins, revoke team credentials, and assign shift roles", owner: true, staff: false },
  { capability: "Delete customer history", description: "Permanently remove a customer's records on request", owner: true, staff: false },
];

export default function AdminStaffPage() {
  const [filterKeyword, setFilterKeyword] = useState("");
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<"Staff" | "Owner">("Staff");

  const filteredStaff = STAFF.filter(s => {
    if (!filterKeyword) return true;
    const q = filterKeyword.toLowerCase();
    return s.name.toLowerCase().includes(q) || s.email.toLowerCase().includes(q) || s.title.toLowerCase().includes(q);
  });

  const activeCount = STAFF.filter(s => s.status === "Active").length;
  const pendingCount = STAFF.filter(s => s.status !== "Active").length;

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-6">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col">
          <div className="flex items-center gap-2.5">
            <h1 className="text-[24px] font-semibold text-[#18181B] tracking-tight leading-tight">Staff</h1>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-[#F4F4F5] border border-[#E5E5E5] text-[#71717A] text-[11px] font-medium">
              {STAFF.length} members
            </span>
          </div>
          <p className="text-[14px] font-normal text-[#71717A] mt-0.5">Manage team access and credential governance for ABC Café</p>
        </div>
        <button
          onClick={() => setShowInviteForm(!showInviteForm)}
          className="btn-press inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          type="button"
        >
          <Plus className="w-4 h-4" strokeWidth={2} />
          <span>Invite Staff</span>
        </button>
      </div>

      {/* Invite form inline */}
      {showInviteForm && (
        <div className="bg-white rounded-[16px] border border-primary/25 shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-[15px] font-semibold text-[#18181B]">Invite a team member</h2>
              <p className="text-xs text-[#71717A] font-normal mt-0.5">They'll receive an email to set up their login</p>
            </div>
            <button onClick={() => setShowInviteForm(false)} className="p-1.5 rounded-lg bg-[#F4F4F5] border border-[#E5E5E5] hover:bg-[#E8EAED] text-[#71717A] transition-colors" type="button">
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.06em]">EMAIL ADDRESS</label>
              <input
                type="email" placeholder="staff@abccafe.com" value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#F4F4F5] text-[#18181B] text-xs rounded-xl border border-[#E5E5E5] focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.06em]">ROLE</label>
              <div className="flex gap-2">
                {(["Staff", "Owner"] as const).map(r => (
                  <button key={r} type="button" onClick={() => setInviteRole(r)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-medium border transition-all ${inviteRole === r ? "border-primary bg-primary/10 text-primary" : "border-[#E5E5E5] bg-[#F4F4F5] text-[#71717A] hover:text-[#18181B]"}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button onClick={() => setShowInviteForm(false)} className="px-4 py-2 rounded-xl bg-[#F4F4F5] border border-[#E5E5E5] text-[#71717A] text-xs font-medium hover:bg-[#E8EAED] transition-colors" type="button">Cancel</button>
            <button
              onClick={() => { alert(`Invite sent to ${inviteEmail} as ${inviteRole}`); setShowInviteForm(false); setInviteEmail(""); }}
              className="btn-press px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white text-xs font-semibold transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              type="button"
            >
              <Mail className="w-3.5 h-3.5" strokeWidth={1.5} /><span>Send Invite</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Seats", value: activeCount, icon: UserCheck, note: "team members" },
          { label: "Pending Invites", value: pendingCount, icon: Mail, note: "expiring in 4 days" },
          { label: "Role Distribution", value: "1 Owner", icon: Crown, note: `+ ${STAFF.length - 1} Staff` },
          { label: "Staff Permissions", value: "Scoped", icon: Lock, note: "counter access only" },
        ].map(({ label, value, icon: Icon, note }) => (
          <div key={label} className="bg-white rounded-[16px] p-5 border border-[#E5E5E5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:-translate-y-[1px] transition-all flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-[#71717A] uppercase tracking-[0.06em]">{label}</span>
              <div className="w-8 h-8 rounded-lg bg-[#F4F4F5] border border-[#E5E5E5]/60 flex items-center justify-center text-[#71717A]">
                <Icon className="w-4 h-4" strokeWidth={1.5} />
              </div>
            </div>
            <span className="text-[28px] font-bold text-[#18181B] leading-none tabular-nums">{value}</span>
            <span className="text-xs text-[#71717A] font-normal">{note}</span>
          </div>
        ))}
      </div>

      {/* 3. Staff Table */}
      <div className="bg-white rounded-[16px] border border-[#E5E5E5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all overflow-hidden">
        {/* Table header */}
        <div className="px-6 py-4 border-b border-[#E5E5E5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-[15px] font-semibold text-[#18181B]">Team Members</h2>
            <p className="text-xs text-[#71717A] mt-0.5 font-normal">Showing {filteredStaff.length} of {STAFF.length} members</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#71717A] pointer-events-none" strokeWidth={1.5} />
            <input
              type="text" placeholder="Search staff..." value={filterKeyword}
              onChange={e => setFilterKeyword(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2.5 bg-[#F4F4F5] text-[#18181B] placeholder:text-[#71717A] text-xs rounded-xl border border-[#E5E5E5] focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F4F4F5] text-[#71717A] text-[11px] font-medium uppercase tracking-[0.06em] border-b border-[#E5E5E5]">
              <th className="px-6 py-3.5">MEMBER</th>
              <th className="px-4 py-3.5">ROLE</th>
              <th className="px-4 py-3.5">EMAIL</th>
              <th className="px-4 py-3.5">STATUS</th>
              <th className="px-4 py-3.5">LAST ACTIVE</th>
              <th className="px-4 py-3.5">ADDED</th>
              <th className="px-6 py-3.5 w-12" />
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5E5]">
            {filteredStaff.map(staff => (
              <tr key={staff.id} className="group hover:bg-[#F4F4F5]/60 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold text-white flex-shrink-0"
                      style={{ backgroundColor: staff.avatarColor }}
                    >
                      {staff.initials}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-[14px] text-[#18181B] leading-tight">{staff.name}</span>
                      <span className="text-[11px] text-[#71717A] font-normal mt-0.5">{staff.title}</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {staff.role === "Owner" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#27272A] text-white">
                      <Crown className="w-3 h-3" strokeWidth={1.5} />Owner
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#F4F4F5] border border-[#E5E5E5] text-[#71717A]">Staff</span>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-[14px] text-[#18181B] font-normal">{staff.email}</td>
                <td className="px-4 py-4 whitespace-nowrap">
                  {staff.status === "Active" ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#E6F4EA] text-[#137333]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#137333]" />Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#FEF7E0] text-[#B06000]">
                      <Clock className="w-3 h-3" strokeWidth={1.5} />Pending
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-xs text-[#71717A] tabular-nums">{staff.lastActive}</td>
                <td className="px-4 py-4 whitespace-nowrap text-xs text-[#71717A] tabular-nums">{staff.addedDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button
                    type="button" onClick={() => alert(`Actions for ${staff.name}`)}
                    className="p-1.5 rounded-lg text-[#71717A] hover:bg-[#F4F4F5] hover:text-[#18181B] transition-colors"
                  >
                    <MoreVertical className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 4. Permissions Matrix */}
      <div className="bg-white rounded-[16px] border border-[#E5E5E5] shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all overflow-hidden">
        <div className="px-6 py-4 border-b border-[#E5E5E5] flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#F4F4F5] border border-[#E5E5E5]/60 flex items-center justify-center text-[#71717A]">
            <Shield className="w-4 h-4" strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="text-[15px] font-semibold text-[#18181B]">Staff Permissions</h2>
            <p className="text-xs text-[#71717A] mt-0.5 font-normal">Reference of access levels — staff cannot access analytics or modify reward structures</p>
          </div>
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F4F4F5] text-[#71717A] text-[11px] font-medium uppercase tracking-[0.06em] border-b border-[#E5E5E5]">
              <th className="px-6 py-3.5">CAPABILITY</th>
              <th className="px-4 py-3.5 text-center w-28">
                <span className="inline-flex items-center gap-1 justify-center">
                  <Crown className="w-3 h-3" strokeWidth={1.5} />OWNER
                </span>
              </th>
              <th className="px-4 py-3.5 text-center w-28">STAFF</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E5E5]">
            {PERMISSIONS.map((item, idx) => (
              <tr key={idx} className="hover:bg-[#F4F4F5]/60 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-[14px] text-[#18181B]">{item.capability}</span>
                    <span className="text-[11px] text-[#71717A] font-normal mt-0.5">{item.description}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center">
                  {item.owner ? (
                    <div className="flex justify-center"><CheckCircle2 className="w-4.5 h-4.5 text-[#137333]" strokeWidth={1.5} /></div>
                  ) : (
                    <span className="text-[#D4D4D8] font-bold">—</span>
                  )}
                </td>
                <td className="px-4 py-4 text-center">
                  {item.staff ? (
                    <div className="flex justify-center"><Check className="w-4 h-4 text-[#137333]" strokeWidth={2} /></div>
                  ) : (
                    <span className="text-[#D4D4D8] font-bold">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Security note */}
        <div className="px-6 py-4 border-t border-[#E5E5E5] bg-[#F4F4F5]">
          <div className="flex items-start gap-3">
            <Info className="w-4 h-4 text-[#71717A] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-xs text-[#71717A] font-normal leading-relaxed">
              Staff logins operate under scoped counter permissions. Any attempt to modify system settings or access confidential store analytics logs a security event in the owner audit stream.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
