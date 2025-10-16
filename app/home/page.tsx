"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BarChart3, Camera, Zap, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"
import { CameraFeedAdvanced } from "@/components/video/camera-feed-advanced"
import { ParkingGridAdvanced } from "@/components/parking/parking-grid-advanced"

export default function HomePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState<"overview" | "camera" | "parking">("overview")

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Smart Parking</h1>
              <p className="text-xs text-slate-400">Real-time Monitoring System</p>
            </div>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("authToken")
              router.push("/login")
            }}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-slate-900 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 flex gap-4">
          {[
            { id: "overview", label: "Overview", icon: BarChart3 },
            { id: "camera", label: "Live Camera", icon: Camera },
            { id: "parking", label: "Parking Lot", icon: TrendingUp },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === id
                  ? "border-cyan-500 text-cyan-400"
                  : "border-transparent text-slate-400 hover:text-slate-300"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Pipeline Visualization */}
            <div className="bg-slate-900 rounded-lg border border-slate-700 p-6">
              <h2 className="text-lg font-bold text-white mb-6">PROCESSING PIPELINE</h2>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  {
                    step: 1,
                    title: "Video Capture",
                    description: "Real-time frame acquisition",
                    icon: Camera,
                    status: "active",
                  },
                  {
                    step: 2,
                    title: "Preprocessing",
                    description: "Frame normalization",
                    icon: Zap,
                    status: "active",
                  },
                  {
                    step: 3,
                    title: "Gemini Detection",
                    description: "Object detection via AI",
                    icon: BarChart3,
                    status: "active",
                  },
                  {
                    step: 4,
                    title: "Polygon Mapping",
                    description: "Boundary detection",
                    icon: TrendingUp,
                    status: "active",
                  },
                  {
                    step: 5,
                    title: "Analytics",
                    description: "Real-time insights",
                    icon: CheckCircle,
                    status: "active",
                  },
                ].map(({ step, title, description, icon: Icon, status }) => (
                  <div key={step} className="relative">
                    <div
                      className={`p-4 rounded-lg border-2 transition-all ${
                        status === "active" ? "bg-cyan-500/10 border-cyan-500" : "bg-slate-800 border-slate-700"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            status === "active" ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-400"
                          }`}
                        >
                          {step}
                        </div>
                        <Icon className={`w-4 h-4 ${status === "active" ? "text-cyan-400" : "text-slate-600"}`} />
                      </div>
                      <h3 className="font-semibold text-sm text-white mb-1">{title}</h3>
                      <p className="text-xs text-slate-400">{description}</p>
                    </div>

                    {/* Arrow */}
                    {step < 5 && (
                      <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-cyan-500 text-xl">
                        →
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Active Cameras",
                  value: "8",
                  change: "+2",
                  icon: Camera,
                  color: "cyan",
                },
                {
                  label: "Detection Accuracy",
                  value: "94.2%",
                  change: "+2.1%",
                  icon: BarChart3,
                  color: "green",
                },
                {
                  label: "Avg Response Time",
                  value: "45ms",
                  change: "-5ms",
                  icon: Zap,
                  color: "blue",
                },
                {
                  label: "System Health",
                  value: "98.5%",
                  change: "Optimal",
                  icon: CheckCircle,
                  color: "emerald",
                },
              ].map(({ label, value, change, icon: Icon, color }) => (
                <div
                  key={label}
                  className={`bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-slate-700 p-4`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-${color}-500/20 flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 text-${color}-400`} />
                    </div>
                    <span className={`text-xs font-semibold text-${color}-400`}>{change}</span>
                  </div>
                  <div className="text-xs text-slate-400 mb-1">{label}</div>
                  <div className="text-2xl font-bold text-white">{value}</div>
                </div>
              ))}
            </div>

            {/* System Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-900 rounded-lg border border-slate-700 p-4">
                <h3 className="text-sm font-semibold text-white mb-4">ACTIVE ALERTS</h3>
                <div className="space-y-2">
                  {[
                    { type: "warning", message: "Camera 3 - Low light detected" },
                    { type: "info", message: "Lot A - 95% occupancy" },
                  ].map((alert, i) => (
                    <div key={i} className="flex items-start gap-3 p-2 bg-slate-800 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs text-slate-300">{alert.message}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 rounded-lg border border-slate-700 p-4">
                <h3 className="text-sm font-semibold text-white mb-4">SYSTEM SERVICES</h3>
                <div className="space-y-2">
                  {[
                    { name: "Gemini API", status: "online" },
                    { name: "Video Processor", status: "online" },
                    { name: "Database", status: "online" },
                  ].map((service, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-slate-800 rounded-lg">
                      <span className="text-xs text-slate-300">{service.name}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-xs text-green-400">{service.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Camera Tab */}
        {activeTab === "camera" && (
          <div>
            <CameraFeedAdvanced />
          </div>
        )}

        {/* Parking Tab */}
        {activeTab === "parking" && (
          <div>
            <ParkingGridAdvanced />
          </div>
        )}
      </main>
    </div>
  )
}
