"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Activity, AlertTriangle, TrendingUp, Users } from "lucide-react"

interface MonitoringData {
  timestamp: number
  occupancy: number
  detections: number
  fps: number
  accuracy: number
  responseTime: number
}

export default function MonitoringDashboard() {
  const [data, setData] = useState<MonitoringData[]>([])
  const [alerts, setAlerts] = useState<Array<{ id: string; type: string; message: string; time: string }>>([])
  const [liveStats, setLiveStats] = useState({
    totalVehicles: 0,
    activeAlerts: 0,
    avgAccuracy: 0,
    systemHealth: 0,
  })

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [
          ...prev,
          {
            timestamp: Date.now(),
            occupancy: Math.random() * 40 + 50,
            detections: Math.floor(Math.random() * 15 + 5),
            fps: Math.floor(Math.random() * 10 + 25),
            accuracy: Math.random() * 0.1 + 0.85,
            responseTime: Math.floor(Math.random() * 30 + 20),
          },
        ]
        return newData.slice(-60) // Keep last 60 data points
      })

      // Update live stats
      setLiveStats({
        totalVehicles: Math.floor(Math.random() * 20 + 10),
        activeAlerts: Math.floor(Math.random() * 3),
        avgAccuracy: Math.random() * 0.1 + 0.88,
        systemHealth: Math.random() * 5 + 95,
      })

      // Simulate alerts
      if (Math.random() > 0.8) {
        const alertTypes = ["warning", "info", "critical"]
        const alertMessages = [
          "High occupancy detected in Lot A",
          "Camera 3 - Low light conditions",
          "Unusual vehicle detected",
          "Parking space malfunction",
        ]
        setAlerts((prev) =>
          [
            {
              id: Date.now().toString(),
              type: alertTypes[Math.floor(Math.random() * alertTypes.length)],
              message: alertMessages[Math.floor(Math.random() * alertMessages.length)],
              time: new Date().toLocaleTimeString(),
            },
            ...prev,
          ].slice(0, 5),
        )
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-slate-950 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Real-time Monitoring</h1>
            <p className="text-slate-400 text-sm mt-1">Live system analytics and performance metrics</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-green-400 font-semibold">LIVE</span>
          </div>
        </div>

        {/* Live Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              label: "Total Vehicles",
              value: liveStats.totalVehicles,
              icon: Users,
              color: "cyan",
            },
            {
              label: "Active Alerts",
              value: liveStats.activeAlerts,
              icon: AlertTriangle,
              color: "red",
            },
            {
              label: "Avg Accuracy",
              value: `${(liveStats.avgAccuracy * 100).toFixed(1)}%`,
              icon: TrendingUp,
              color: "green",
            },
            {
              label: "System Health",
              value: `${liveStats.systemHealth.toFixed(1)}%`,
              icon: Activity,
              color: "emerald",
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-slate-700 p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg bg-${color}-500/20 flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 text-${color}-400`} />
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="text-xs text-slate-400 mb-1">{label}</div>
              <div className="text-2xl font-bold text-white">{value}</div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Occupancy Trend */}
          <div className="bg-slate-900 rounded-lg border border-slate-700 p-4">
            <h2 className="text-sm font-semibold text-white mb-4">OCCUPANCY TREND</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#00d9ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Area
                  type="monotone"
                  dataKey="occupancy"
                  stroke="#00d9ff"
                  fillOpacity={1}
                  fill="url(#colorOccupancy)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Detection Accuracy */}
          <div className="bg-slate-900 rounded-lg border border-slate-700 p-4">
            <h2 className="text-sm font-semibold text-white mb-4">DETECTION ACCURACY</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} domain={[0, 1]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
                  labelStyle={{ color: "#e2e8f0" }}
                  formatter={(value) => `${(value * 100).toFixed(1)}%`}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#6bcf7f"
                  dot={false}
                  strokeWidth={2}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* FPS Performance */}
          <div className="bg-slate-900 rounded-lg border border-slate-700 p-4">
            <h2 className="text-sm font-semibold text-white mb-4">FPS PERFORMANCE</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Bar dataKey="fps" fill="#ffd93d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Response Time */}
          <div className="bg-slate-900 rounded-lg border border-slate-700 p-4">
            <h2 className="text-sm font-semibold text-white mb-4">RESPONSE TIME (ms)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="timestamp" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#1e293b", border: "1px solid #475569" }}
                  labelStyle={{ color: "#e2e8f0" }}
                />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#ff6b6b"
                  dot={false}
                  strokeWidth={2}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Alerts */}
        <div className="bg-slate-900 rounded-lg border border-slate-700 p-4">
          <h2 className="text-sm font-semibold text-white mb-4">RECENT ALERTS</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-slate-400">No alerts</div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border flex items-start gap-3 ${
                    alert.type === "critical"
                      ? "bg-red-500/10 border-red-500"
                      : alert.type === "warning"
                        ? "bg-yellow-500/10 border-yellow-500"
                        : "bg-blue-500/10 border-blue-500"
                  }`}
                >
                  <AlertTriangle
                    className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                      alert.type === "critical"
                        ? "text-red-400"
                        : alert.type === "warning"
                          ? "text-yellow-400"
                          : "text-blue-400"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-300">{alert.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{alert.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
