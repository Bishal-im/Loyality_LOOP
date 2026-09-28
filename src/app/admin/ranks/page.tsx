"use client";

import React, { useState } from "react";
import {
  Trophy,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  ChevronDown,
  Star
} from "lucide-react";
import { CustomerShell } from "@/components/customer/CustomerShell";

interface Rank {
  id: string;
  name: string;
  minStamps: number;
  color: string;
  icon?: string;
  description?: string;
  benefits?: string[];
}

const DEFAULT_RANKS: Rank[] = [
  {
    id: "bronze",
    name: "Bronze",
    minStamps: 10,
    color: "bg-[#CD7F32]",
    description: "Starting level for new customers",
    benefits: ["5% discount on all beverages"]
  },
  {
    id: "silver",
    name: "Silver",
    minStamps: 30,
    color: "bg-[#C0C0C0]",
    description: "Regular patrons who visit frequently",
    benefits: ["10% discount on all beverages", "Free refill on coffee"]
  },
  {
    id: "gold",
    name: "Gold",
    minStamps: 70,
    color: "bg-[#D6A85F]",
    description: "Loyal customers with exceptional visits",
    benefits: ["15% discount on all orders", "Free birthday treat", "Priority service"]
  },
  {
    id: "platinum",
    name: "Platinum",
    minStamps: 150,
    color: "bg-[#173F35]",
    description: "Our most dedicated patrons",
    benefits: ["20% discount on all orders", "Complimentary monthly treat", "VIP event invitations"]
  }
];

export default function AdminRanksPage() {
  const [ranks, setRanks] = useState<Rank[]>(DEFAULT_RANKS);
  const [editingRank, setEditingRank] = useState<Rank | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const openAddModal = () => {
    setEditingRank(null);
    setShowModal(true);
  };

  const openEditModal = (rank: Rank) => {
    setEditingRank({ ...rank });
    setShowModal(true);
  };

  const deleteRank = (id: string) => {
    setRanks(ranks.filter(r => r.id !== id));
    setShowDeleteConfirm(null);
  };

  const saveRank = () => {
    if (!editingRank) return;

    const rankExists = ranks.some(r => r.id === editingRank.id && r.id !== editingRank.id);
    if (rankExists) {
      alert("A rank with this name already exists");
      return;
    }

    if (editingRank.minStamps < 0) {
      alert("Minimum stamps cannot be negative");
      return;
    }

    if (editingRank.id) {
      // Update existing
      setRanks(ranks.map(r => r.id === editingRank.id ? editingRank : r));
    } else {
      // Add new
      const newRank = { ...editingRank, id: Date.now().toString() };
      setRanks([...ranks, newRank]);
    }
    setShowModal(false);
    setEditingRank(null);
  };

  const cancelEdit = () => {
    setShowModal(false);
    setEditingRank(null);
  };

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-display font-medium text-[#1D2925] tracking-tight">
            Rank Tiers
          </h1>
          <p className="text-xs text-[#718078] mt-1">
            Configure customer loyalty tiers based on stamp accumulation
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#173F35] hover:bg-[#002920] text-white transition-colors text-xs font-semibold shadow-sm whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Tier</span>
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E2DD]">
          <p className="text-[11px] font-medium text-[#718078] uppercase tracking-wider">Total Tiers</p>
          <p className="font-display text-2xl font-semibold text-[#1D2925] mt-1">{ranks.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E2DD]">
          <p className="text-[11px] font-medium text-[#718078] uppercase tracking-wider">Stamps Needed</p>
          <p className="font-display text-2xl font-semibold text-[#1D2925] mt-1">
            {Math.max(...ranks.map(r => r.minStamps), 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E2DD]">
          <p className="text-[11px] font-medium text-[#718078] uppercase tracking-wider">Active Customers</p>
          <p className="font-display text-2xl font-semibold text-[#1D2925] mt-1">
            {ranks.reduce((acc, r) => acc + (r.id === 'gold' ? 45 : r.id === 'silver' ? 78 : 0), 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-[#E4E2DD]">
          <p className="text-[11px] font-medium text-[#718078] uppercase tracking-wider">Avg. Visit Frequency</p>
          <p className="font-display text-2xl font-semibold text-[#1D2925] mt-1">3.2x/week</p>
        </div>
      </div>

      {/* Ranks List */}
      <div className="space-y-4">
        {ranks.map((rank, index) => (
          <div
            key={rank.id}
            className="bg-white rounded-2xl p-5 shadow-sm border border-[#E4E2DD] hover:shadow-md transition-shadow group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${rank.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  {rank.icon === 'star' ? (
                    <Star className="w-6 h-6 text-white" />
                  ) : (
                    <Trophy className="w-6 h-6 text-white" />
                  )}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-xl font-medium text-[#1D2925]">
                      {rank.name}
                    </h3>
                    {rank.id === 'gold' && (
                      <span className="px-2 py-0.5 rounded-full bg-gold/15 text-gold-ink text-[10px] font-semibold">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#718078] mt-1">{rank.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F5F3EE]">
                      <span className="text-[10px] font-semibold text-[#718078]">Stamps:</span>
                      <span className="font-display text-sm font-bold text-[#1D2925]">
                        {rank.minStamps}+
                      </span>
                    </div>
                    {rank.benefits && rank.benefits.length > 0 && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F5F3EE]">
                        <span className="text-[10px] font-semibold text-[#718078]">Benefits:</span>
                        <span className="text-xs text-[#1D2925]">
                          {rank.benefits.length} included
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => openEditModal(rank)}
                  className="p-2 rounded-lg hover:bg-[#F8F6F1] text-[#718078] hover:text-[#1D2925] transition-colors"
                  title="Edit tier"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(rank.id)}
                  className="p-2 rounded-lg hover:bg-[#F8F6F1] text-[#C25953] hover:text-[#A63A34] transition-colors"
                  title="Delete tier"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {rank.benefits && rank.benefits.length > 0 && (
              <div className="mt-4 pt-4 border-t border-[#E4E2DD]">
                <p className="text-[10px] font-semibold text-[#718078] uppercase tracking-wider mb-2">
                  Tier Benefits
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {rank.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#1D2925]">
                      <div className={`w-1.5 h-1.5 rounded-full ${rank.color.replace('bg-', 'bg-opacity-20 bg-')}`} />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#002920]/40 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(null)}
          />
          <div className="relative bg-white rounded-2xl p-6 shadow-xl max-w-sm w-full z-10">
            <h3 className="font-display text-lg font-semibold text-[#1D2925] mb-2">
              Delete Tier?
            </h3>
            <p className="text-xs text-[#718078] leading-relaxed mb-6">
              Are you sure you want to delete this rank tier? Customers with this tier will be downgraded to the next lower tier.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 rounded-xl bg-[#F8F6F1] hover:bg-[#E4E2DD] text-[#1D2925] text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteRank(showDeleteConfirm)}
                className="px-4 py-2 rounded-xl bg-[#C25953] hover:bg-[#A63A34] text-white text-xs font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && editingRank && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#002920]/40 backdrop-blur-sm"
            onClick={cancelEdit}
          />
          <div className="relative bg-white rounded-2xl p-6 shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto z-10">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-xl font-semibold text-[#1D2925]">
                {editingRank.id ? "Edit Tier" : "Create New Tier"}
              </h3>
              <button
                onClick={cancelEdit}
                className="p-1.5 rounded-lg hover:bg-[#F8F6F1] text-[#718078] hover:text-[#1D2925] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider">
                  Tier Name
                </label>
                <input
                  type="text"
                  value={editingRank.name}
                  onChange={(e) => setEditingRank({ ...editingRank, name: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#F5F3EE] text-[#1D2925] text-sm font-semibold rounded-xl border border-[#E4E2DD] focus:outline-none focus:border-[#173F35] focus:bg-white transition-colors"
                  placeholder="e.g., Bronze"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider">
                  Minimum Stamps Required
                </label>
                <input
                  type="number"
                  value={editingRank.minStamps}
                  onChange={(e) => setEditingRank({ ...editingRank, minStamps: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2.5 bg-[#F5F3EE] text-[#1D2925] text-sm font-semibold rounded-xl border border-[#E4E2DD] focus:outline-none focus:border-[#173F35] focus:bg-white transition-colors"
                  placeholder="e.g., 10"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider">
                  Color Theme
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { name: "Bronze", value: "bg-[#CD7F32]", label: "Bronze" },
                    { name: "Silver", value: "bg-[#C0C0C0]", label: "Silver" },
                    { name: "Gold", value: "bg-[#D6A85F]", label: "Gold" },
                    { name: "Platinum", value: "bg-[#173F35]", label: "Platinum" }
                  ].map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setEditingRank({ ...editingRank, color: color.value })}
                      className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all ${
                        editingRank.color === color.value ? "ring-2 ring-[#173F35]" : "hover:scale-105"
                      }`}
                      title={color.label}
                    >
                      <div className={`w-6 h-6 rounded-full ${color.value}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  value={editingRank.description}
                  onChange={(e) => setEditingRank({ ...editingRank, description: e.target.value })}
                  className="w-full px-3 py-2.5 bg-[#F5F3EE] text-[#1D2925] text-sm font-semibold rounded-xl border border-[#E4E2DD] focus:outline-none focus:border-[#173F35] focus:bg-white transition-colors min-h-[80px]"
                  placeholder="Describe this tier..."
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-[#718078] uppercase tracking-wider">
                  Benefits (comma-separated)
                </label>
                <textarea
                  value={editingRank.benefits?.join(", ") || ""}
                  onChange={(e) => setEditingRank({
                    ...editingRank,
                    benefits: e.target.value.split(",").map(b => b.trim()).filter(Boolean)
                  })}
                  className="w-full px-3 py-2.5 bg-[#F5F3EE] text-[#1D2925] text-sm font-semibold rounded-xl border border-[#E4E2DD] focus:outline-none focus:border-[#173F35] focus:bg-white transition-colors min-h-[80px]"
                  placeholder="e.g., 10% discount, Free coffee refill"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={cancelEdit}
                className="px-4 py-2 rounded-xl bg-[#F8F6F1] hover:bg-[#E4E2DD] text-[#1D2925] text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={saveRank}
                className="px-4 py-2 rounded-xl bg-[#173F35] hover:bg-[#002920] text-white text-xs font-semibold transition-colors"
              >
                <Save className="w-4 h-4 inline mr-1.5" />
                <span>Save Tier</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
