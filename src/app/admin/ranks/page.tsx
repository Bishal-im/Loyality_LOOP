"use client";

import React, { useState } from "react";
import {
  Award,
  Edit2,
  Save,
  X,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Stamp,
  Users,
  Crown,
  Star,
  Sparkles,
} from "lucide-react";

type Rank = {
  id: number;
  name: string;
  stampsRequired: number;
  color: string;
  icon: string;
  benefits: string[];
  customerCount: number;
};

export default function AdminRanksPage() {
  const [ranks, setRanks] = useState<Rank[]>([
    {
      id: 1,
      name: "Bronze",
      stampsRequired: 0,
      color: "#CD7F32",
      icon: "star",
      benefits: ["Welcome bonus", "Birthday reward"],
      customerCount: 523,
    },
    {
      id: 2,
      name: "Silver",
      stampsRequired: 10,
      color: "#C0C0C0",
      icon: "star",
      benefits: ["Bronze benefits", "10% off on rewards", "Early access to new items"],
      customerCount: 342,
    },
    {
      id: 3,
      name: "Gold",
      stampsRequired: 25,
      color: "#FFD700",
      icon: "crown",
      benefits: ["Silver benefits", "15% off on rewards", "Priority support", "Exclusive events"],
      customerCount: 156,
    },
    {
      id: 4,
      name: "Platinum",
      stampsRequired: 50,
      color: "#E5E4E2",
      icon: "sparkles",
      benefits: ["Gold benefits", "20% off on rewards", "VIP lounge access", "Personal concierge"],
      customerCount: 27,
    },
  ]);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Rank>>({});

  const startEdit = (rank: Rank) => {
    setEditingId(rank.id);
    setEditForm({ ...rank });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = () => {
    if (editingId && editForm.stampsRequired !== undefined) {
      setRanks((prev) =>
        prev.map((r) =>
          r.id === editingId
            ? { ...r, ...editForm, stampsRequired: editForm.stampsRequired! }
            : r
        )
      );
      setEditingId(null);
      setEditForm({});
    }
  };

  const deleteRank = (id: number) => {
    if (ranks.length <= 1) {
      alert("You must have at least one rank tier");
      return;
    }
    if (confirm("Are you sure you want to delete this rank tier?")) {
      setRanks((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const moveRank = (id: number, direction: "up" | "down") => {
    const index = ranks.findIndex((r) => r.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === ranks.length - 1)
    ) {
      return;
    }
    const newRanks = [...ranks];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newRanks[index], newRanks[targetIndex]] = [newRanks[targetIndex], newRanks[index]];
    setRanks(newRanks);
  };

  const addNewRank = () => {
    const maxId = Math.max(...ranks.map((r) => r.id), 0);
    const lastStamps = ranks.length > 0 ? ranks[ranks.length - 1].stampsRequired : 0;
    const newRank: Rank = {
      id: maxId + 1,
      name: "New Rank",
      stampsRequired: lastStamps + 10,
      color: "#C96F4A",
      icon: "star",
      benefits: ["New benefit"],
      customerCount: 0,
    };
    setRanks((prev) => [...prev, newRank]);
    setEditingId(newRank.id);
    setEditForm(newRank);
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "crown":
        return Crown;
      case "sparkles":
        return Sparkles;
      case "star":
      default:
        return Star;
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[1440px] mx-auto gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-display font-medium text-[#1D2925] tracking-tight">
            Rank Management
          </h1>
          <p className="text-xs font-normal text-[#718078] mt-1">
            Configure stamp requirements and benefits for each tier
          </p>
        </div>

        <button
          onClick={addNewRank}
          className="btn-press inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#173F35] hover:bg-[#002920] text-white transition-colors text-xs font-semibold shadow-xs whitespace-nowrap"
          type="button"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Rank</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E4E2DD]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-[#718078] uppercase tracking-wider">
              Total Ranks
            </span>
            <Award className="w-4 h-4 text-[#718078]" />
          </div>
          <span className="text-[28px] font-bold text-[#1D2925] leading-tight">
            {ranks.length}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E4E2DD]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-[#718078] uppercase tracking-wider">
              Total Customers
            </span>
            <Users className="w-4 h-4 text-[#718078]" />
          </div>
          <span className="text-[28px] font-bold text-[#1D2925] leading-tight">
            {ranks.reduce((sum, r) => sum + r.customerCount, 0)}
          </span>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E4E2DD]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium text-[#718078] uppercase tracking-wider">
              Highest Tier
            </span>
            <Stamp className="w-4 h-4 text-[#718078]" />
          </div>
          <span className="text-[28px] font-bold text-[#1D2925] leading-tight">
            {Math.max(...ranks.map((r) => r.stampsRequired))}
          </span>
          <p className="text-xs text-[#718078] mt-1">stamps required</p>
        </div>
      </div>

      {/* Ranks Table */}
      <div className="bg-white rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E4E2DD] overflow-hidden">
        <div className="p-6 border-b border-[#E4E2DD]">
          <h2 className="text-base font-semibold text-[#1D2925]">Rank Tiers</h2>
          <p className="text-xs text-[#718078] mt-1 font-normal">
            Manage promotion requirements and customer progression
          </p>
        </div>

        <div className="divide-y divide-[#E4E2DD]">
          {ranks.map((rank, index) => {
            const isEditing = editingId === rank.id;
            const IconComponent = getIconComponent(rank.icon);

            return (
              <div
                key={rank.id}
                className="px-6 py-4 hover:bg-[#F5F3EE] transition-colors"
              >
                {isEditing ? (
                  // Edit Mode
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${editForm.color || rank.color}20` }}
                        >
                          <IconComponent
                            className="w-6 h-6"
                            style={{ color: editForm.color || rank.color }}
                          />
                        </div>
                        <div className="flex flex-col gap-2 flex-1 max-w-md">
                          <input
                            type="text"
                            value={editForm.name ?? rank.name}
                            onChange={(e) =>
                              setEditForm({ ...editForm, name: e.target.value })
                            }
                            className="px-3 py-2 text-sm font-semibold text-[#1D2925] border border-[#E4E2DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173F35]"
                            placeholder="Rank name"
                          />
                          <div className="flex items-center gap-2">
                            <Stamp className="w-4 h-4 text-[#718078]" />
                            <input
                              type="number"
                              min="0"
                              value={editForm.stampsRequired ?? rank.stampsRequired}
                              onChange={(e) =>
                                setEditForm({
                                  ...editForm,
                                  stampsRequired: parseInt(e.target.value) || 0,
                                })
                              }
                              className="px-3 py-2 text-xs font-medium text-[#1D2925] border border-[#E4E2DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#173F35] w-24"
                              placeholder="Stamps"
                            />
                            <span className="text-xs text-[#718078]">stamps required</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={saveEdit}
                          className="btn-press p-2 rounded-lg bg-[#173F35] text-white hover:bg-[#002920] transition-colors"
                          title="Save"
                          type="button"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="btn-press p-2 rounded-lg bg-[#E4E2DD] text-[#718078] hover:bg-[#D9CFC4] transition-colors"
                          title="Cancel"
                          type="button"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${rank.color}20` }}
                      >
                        <IconComponent className="w-6 h-6" style={{ color: rank.color }} />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#1D2925]">
                            {rank.name}
                          </span>
                          {index === 0 && (
                            <span className="px-2 py-0.5 rounded-full bg-[#173F35]/10 text-[#173F35] text-[10px] font-semibold">
                              STARTING TIER
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#718078] mt-1">
                          <div className="flex items-center gap-1.5">
                            <Stamp className="w-3.5 h-3.5" />
                            <span className="font-medium text-[#1D2925]">
                              {rank.stampsRequired}
                            </span>
                            <span>stamps required</span>
                          </div>
                          <span>•</span>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            <span className="font-medium text-[#1D2925]">
                              {rank.customerCount}
                            </span>
                            <span>customers</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => moveRank(rank.id, "up")}
                        disabled={index === 0}
                        className="btn-press p-2 rounded-lg bg-white border border-[#E4E2DD] text-[#718078] hover:bg-[#F8F6F1] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        title="Move up"
                        type="button"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveRank(rank.id, "down")}
                        disabled={index === ranks.length - 1}
                        className="btn-press p-2 rounded-lg bg-white border border-[#E4E2DD] text-[#718078] hover:bg-[#F8F6F1] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        title="Move down"
                        type="button"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => startEdit(rank)}
                        className="btn-press p-2 rounded-lg bg-white border border-[#E4E2DD] text-[#718078] hover:bg-[#F8F6F1] transition-colors"
                        title="Edit"
                        type="button"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteRank(rank.id)}
                        disabled={ranks.length <= 1}
                        className="btn-press p-2 rounded-lg bg-white border border-[#E4E2DD] text-[#C25953] hover:bg-[#FFF4F4] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        title="Delete"
                        type="button"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="px-6 py-4 bg-[#F5F3EE] border-t border-[#E4E2DD] text-xs text-[#718078]">
          <p>
            Changes are saved automatically. Customers will be promoted to the next rank when they
            reach the required stamp count.
          </p>
        </div>
      </div>

      {/* Progression Preview */}
      <div className="bg-white rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] border border-[#E4E2DD]">
        <h2 className="text-base font-semibold text-[#1D2925] mb-4">Progression Path</h2>
        <div className="flex flex-wrap items-center gap-3">
          {ranks.map((rank, index) => {
            const IconComponent = getIconComponent(rank.icon);
            return (
              <React.Fragment key={rank.id}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${rank.color}20` }}
                  >
                    <IconComponent className="w-8 h-8" style={{ color: rank.color }} />
                  </div>
                  <span className="text-xs font-semibold text-[#1D2925]">{rank.name}</span>
                  <span className="text-[10px] text-[#718078]">
                    {rank.stampsRequired === 0 ? "Start" : `${rank.stampsRequired} stamps`}
                  </span>
                </div>
                {index < ranks.length - 1 && (
                  <div className="flex items-center text-[#E4E2DD] px-2">
                    <ChevronDown className="w-5 h-5 rotate-[-90deg]" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
