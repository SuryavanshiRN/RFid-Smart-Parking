"use client"

import { useState } from "react"
import { Grid3x3, List, Plus, Edit2, Trash2 } from "lucide-react"

const parkingLots = [
  { id: 1, name: "Main Lot A", total: 100, occupied: 78, available: 22, status: "active" },
  { id: 2, name: "Main Lot B", total: 80, occupied: 65, available: 15, status: "active" },
  { id: 3, name: "Basement Level 1", total: 50, occupied: 42, available: 8, status: "active" },
  { id: 4, name: "Basement Level 2", total: 50, occupied: 38, available: 12, status: "maintenance" },
]

export default function ParkingPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Parking Lots</h1>
          <p className="text-slate-400">Manage all parking facilities</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-lg transition">
          <Plus className="w-5 h-5" />
          Add Lot
        </button>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded-lg transition ${viewMode === "grid" ? "bg-cyan-500/20 text-cyan-500" : "bg-slate-900 text-slate-400 hover:text-slate-100"}`}
        >
          <Grid3x3 className="w-5 h-5" />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded-lg transition ${viewMode === "list" ? "bg-cyan-500/20 text-cyan-500" : "bg-slate-900 text-slate-400 hover:text-slate-100"}`}
        >
          <List className="w-5 h-5" />
        </button>
      </div>

      {viewMode === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {parkingLots.map((lot) => (
            <div
              key={lot.id}
              className="bg-slate-900 border border-slate-700 rounded-lg p-6 hover:border-cyan-500/50 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-slate-100">{lot.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${lot.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                    >
                      {lot.status}
                    </span>
                  </p>
                </div>
              </div>
              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-400">Occupancy</span>
                    <span className="font-semibold text-slate-100">
                      {lot.occupied}/{lot.total}
                    </span>
                  </div>
                  <div className="w-full bg-slate-950 rounded-full h-2">
                    <div
                      className="bg-cyan-500 h-2 rounded-full"
                      style={{ width: `${(lot.occupied / lot.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 p-2 bg-slate-950 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-100 transition text-sm font-medium">
                  <Edit2 className="w-4 h-4 mx-auto" />
                </button>
                <button className="flex-1 p-2 bg-slate-950 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-100 transition text-sm font-medium">
                  <Trash2 className="w-4 h-4 mx-auto" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === "list" && (
        <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-950 border-b border-slate-700">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-100">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-100">Total Slots</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-100">Occupied</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-100">Available</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-100">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-100">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parkingLots.map((lot) => (
                <tr key={lot.id} className="border-b border-slate-700 hover:bg-slate-800 transition">
                  <td className="px-6 py-4 text-sm text-slate-100 font-medium">{lot.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{lot.total}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{lot.occupied}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{lot.available}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${lot.status === "active" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}
                    >
                      {lot.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm flex gap-2">
                    <button className="p-1 hover:bg-slate-950 rounded transition">
                      <Edit2 className="w-4 h-4 text-slate-400 hover:text-slate-100" />
                    </button>
                    <button className="p-1 hover:bg-slate-950 rounded transition">
                      <Trash2 className="w-4 h-4 text-slate-400 hover:text-slate-100" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
