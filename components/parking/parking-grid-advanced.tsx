"use client"

import { useVideoStream } from "@/hooks/use-video-stream"
import { useState } from "react"
import { ChevronDown, Grid3x3, List } from "lucide-react"

interface ParkingSpaceUI {
  id: string
  row: number
  col: number
  occupied: boolean
  vehicleType?: string
  duration?: number
}

export function ParkingGridAdvanced() {
  const { detections } = useVideoStream(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterOccupancy, setFilterOccupancy] = useState<"all" | "occupied" | "empty">("all")
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null)

  // Generate parking spaces
  const parkingSpaces: ParkingSpaceUI[] = Array.from({ length: 32 }, (_, i) => ({
    id: `space-${i}`,
    row: Math.floor(i / 8),
    col: i % 8,
    occupied: Math.random() > 0.4,
    vehicleType: Math.random() > 0.5 ? "car" : "truck",
    duration: Math.floor(Math.random() * 240 + 10),
  }))

  const filteredSpaces = parkingSpaces.filter((space) => {
    if (filterOccupancy === "occupied") return space.occupied
    if (filterOccupancy === "empty") return !space.occupied
    return true
  })

  const occupancyRate = (parkingSpaces.filter((s) => s.occupied).length / parkingSpaces.length) * 100
  const availableSpaces = parkingSpaces.filter((s) => !s.occupied).length

  return (
    <div className="w-full space-y-4">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-slate-700 p-4">
          <div className="text-xs text-slate-400 mb-1">TOTAL SPACES</div>
          <div className="text-2xl font-bold text-cyan-400">{parkingSpaces.length}</div>
        </div>
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-slate-700 p-4">
          <div className="text-xs text-slate-400 mb-1">AVAILABLE</div>
          <div className="text-2xl font-bold text-green-400">{availableSpaces}</div>
        </div>
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-slate-700 p-4">
          <div className="text-xs text-slate-400 mb-1">OCCUPIED</div>
          <div className="text-2xl font-bold text-red-400">{parkingSpaces.length - availableSpaces}</div>
        </div>
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-slate-700 p-4">
          <div className="text-xs text-slate-400 mb-1">OCCUPANCY RATE</div>
          <div className="text-2xl font-bold text-yellow-400">{occupancyRate.toFixed(1)}%</div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex gap-2 bg-slate-900 rounded-lg border border-slate-700 p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded transition-colors ${
              viewMode === "grid" ? "bg-cyan-600 text-white" : "text-slate-400 hover:text-slate-300"
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded transition-colors ${
              viewMode === "list" ? "bg-cyan-600 text-white" : "text-slate-400 hover:text-slate-300"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>

        <div className="relative group">
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-slate-300 hover:border-slate-600 transition-colors">
            <span>Filter: {filterOccupancy}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <div className="absolute hidden group-hover:block top-full left-0 mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-10">
            {["all", "occupied", "empty"].map((option) => (
              <button
                key={option}
                onClick={() => setFilterOccupancy(option as any)}
                className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="bg-slate-900 rounded-lg border border-slate-700 p-6">
          <div className="grid grid-cols-8 gap-3">
            {filteredSpaces.map((space) => (
              <button
                key={space.id}
                onClick={() => setSelectedSpace(selectedSpace === space.id ? null : space.id)}
                className={`aspect-square rounded-lg border-2 transition-all transform hover:scale-105 flex items-center justify-center text-xs font-bold relative group ${
                  space.occupied
                    ? "bg-red-500/20 border-red-500 text-red-300"
                    : "bg-green-500/20 border-green-500 text-green-300"
                } ${selectedSpace === space.id ? "ring-2 ring-yellow-400 scale-110" : ""}`}
              >
                <div className="text-center">
                  <div>{space.row * 8 + space.col + 1}</div>
                  {space.occupied && <div className="text-xs mt-1 opacity-75">{space.vehicleType}</div>}
                </div>

                {/* Hover Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-950 border border-slate-700 rounded-lg p-2 whitespace-nowrap text-xs text-slate-300 z-20">
                  <div>Space {space.row * 8 + space.col + 1}</div>
                  <div>{space.occupied ? "Occupied" : "Available"}</div>
                  {space.occupied && <div>Duration: {space.duration}m</div>}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-800 border-b border-slate-700">
                <tr>
                  <th className="px-4 py-3 text-left text-slate-300 font-semibold">Space ID</th>
                  <th className="px-4 py-3 text-left text-slate-300 font-semibold">Status</th>
                  <th className="px-4 py-3 text-left text-slate-300 font-semibold">Type</th>
                  <th className="px-4 py-3 text-left text-slate-300 font-semibold">Duration</th>
                  <th className="px-4 py-3 text-left text-slate-300 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSpaces.map((space, index) => (
                  <tr
                    key={space.id}
                    className={`border-b border-slate-700 hover:bg-slate-800 transition-colors ${
                      index % 2 === 0 ? "bg-slate-900/50" : ""
                    }`}
                  >
                    <td className="px-4 py-3 text-slate-300 font-medium">{space.row * 8 + space.col + 1}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          space.occupied ? "bg-red-500/20 text-red-300" : "bg-green-500/20 text-green-300"
                        }`}
                      >
                        {space.occupied ? "Occupied" : "Available"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 capitalize">{space.occupied ? space.vehicleType : "-"}</td>
                    <td className="px-4 py-3 text-slate-400">{space.occupied ? `${space.duration}m` : "-"}</td>
                    <td className="px-4 py-3">
                      <button className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold">
                        {space.occupied ? "Release" : "Reserve"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Selected Space Details */}
      {selectedSpace && (
        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-semibold text-cyan-400 mb-2">SPACE DETAILS</div>
              <div className="text-xs text-slate-300 space-y-1">
                <div>
                  Space ID: {parkingSpaces.find((s) => s.id === selectedSpace)?.row}
                  {parkingSpaces.find((s) => s.id === selectedSpace)?.col}
                </div>
                <div>
                  Status: {parkingSpaces.find((s) => s.id === selectedSpace)?.occupied ? "Occupied" : "Available"}
                </div>
              </div>
            </div>
            <button onClick={() => setSelectedSpace(null)} className="text-slate-400 hover:text-slate-300">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
