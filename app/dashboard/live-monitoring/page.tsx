"use client"

import { useState } from "react"
import { Camera, ParkingCircle } from "lucide-react"
import { RealVideoProcessor } from "@/components/video/real-video-processor"
import { ParkingGridAdvanced } from "@/components/parking/parking-grid-advanced"

export default function LiveMonitoringPage() {
  const [activeTab, setActiveTab] = useState<"camera" | "parking">("camera")

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Live Monitoring</h1>
            <p className="text-slate-600 text-sm mt-1">
              Real-time camera feeds with Gemini AI detection and parking lot visualization
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 border border-green-300 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
            <span className="text-sm text-green-700 font-semibold">LIVE</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-b border-slate-200">
          {[
            { id: "camera", label: "Live Camera Feed", icon: Camera },
            { id: "parking", label: "Parking Lot View", icon: ParkingCircle },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === id
                  ? "border-purple-600 text-purple-600"
                  : "border-transparent text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg border border-slate-200 p-6">
          {activeTab === "camera" && <RealVideoProcessor isProcessing={true} />}
          {activeTab === "parking" && <ParkingGridAdvanced />}
        </div>
      </div>
    </div>
  )
}
