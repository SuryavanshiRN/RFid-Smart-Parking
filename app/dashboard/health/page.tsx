"use client"

import type React from "react"

import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { AlertCircle, CheckCircle, AlertTriangle, Activity, Database, Zap } from "lucide-react"
import { useState, useEffect } from "react"

const cpuData = [
  { time: "00:00", usage: 25 },
  { time: "04:00", usage: 18 },
  { time: "08:00", usage: 45 },
  { time: "12:00", usage: 72 },
  { time: "16:00", usage: 68 },
  { time: "20:00", usage: 52 },
  { time: "24:00", usage: 35 },
]

const memoryData = [
  { time: "00:00", used: 2.1, total: 8 },
  { time: "04:00", used: 1.8, total: 8 },
  { time: "08:00", used: 4.2, total: 8 },
  { time: "12:00", used: 6.5, total: 8 },
  { time: "16:00", used: 6.8, total: 8 },
  { time: "20:00", used: 5.2, total: 8 },
  { time: "24:00", used: 3.5, total: 8 },
]

const diskData = [
  { name: "Used", value: 245, color: "#ef4444" },
  { name: "Available", value: 255, color: "#10b981" },
]

const responseTimeData = [
  { time: "00:00", api: 45, db: 32 },
  { time: "04:00", api: 38, db: 28 },
  { time: "08:00", api: 62, db: 48 },
  { time: "12:00", api: 85, db: 72 },
  { time: "16:00", api: 92, db: 78 },
  { time: "20:00", api: 68, db: 55 },
  { time: "24:00", api: 52, db: 42 },
]

interface SystemMetric {
  name: string
  status: "healthy" | "warning" | "critical"
  value: string
  description: string
  icon: React.ReactNode
}

export default function HealthPage() {
  const [uptime, setUptime] = useState("45d 12h 34m")
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString())

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const metrics: SystemMetric[] = [
    {
      name: "API Server",
      status: "healthy",
      value: "200 OK",
      description: "All endpoints responding normally",
      icon: <CheckCircle className="w-5 h-5 text-accent-success" />,
    },
    {
      name: "Database",
      status: "healthy",
      value: "Connected",
      description: "PostgreSQL connection stable",
      icon: <CheckCircle className="w-5 h-5 text-accent-success" />,
    },
    {
      name: "Cache Server",
      status: "healthy",
      value: "Online",
      description: "Redis cache operational",
      icon: <CheckCircle className="w-5 h-5 text-accent-success" />,
    },
    {
      name: "Message Queue",
      status: "warning",
      value: "85% Full",
      description: "MQTT broker queue at high capacity",
      icon: <AlertTriangle className="w-5 h-5 text-accent-warning" />,
    },
    {
      name: "Storage",
      status: "healthy",
      value: "245 GB / 500 GB",
      description: "49% disk usage",
      icon: <CheckCircle className="w-5 h-5 text-accent-success" />,
    },
    {
      name: "Network",
      status: "healthy",
      value: "Stable",
      description: "Bandwidth: 450 Mbps",
      icon: <CheckCircle className="w-5 h-5 text-accent-success" />,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-accent-success/10 border-accent-success/30"
      case "warning":
        return "bg-accent-warning/10 border-accent-warning/30"
      case "critical":
        return "bg-accent-error/10 border-accent-error/30"
      default:
        return "bg-card border-border"
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">System Health</h1>
          <p className="text-text-secondary">Real-time infrastructure monitoring and diagnostics</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-text-secondary">Last updated</p>
          <p className="text-lg font-semibold text-foreground">{lastUpdate}</p>
        </div>
      </div>

      {/* Overall Status */}
      <div className="bg-gradient-to-r from-accent-success/20 to-accent-success/5 border border-accent-success/30 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-accent-success" />
              <h2 className="text-2xl font-bold text-foreground">All Systems Operational</h2>
            </div>
            <p className="text-text-secondary">Uptime: {uptime}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-text-secondary mb-1">System Status</p>
            <div className="flex items-center gap-2 justify-end">
              <div className="w-3 h-3 bg-accent-success rounded-full animate-pulse"></div>
              <span className="text-lg font-semibold text-accent-success">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">CPU Usage</p>
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">68%</p>
          <div className="w-full bg-background rounded-full h-2 mt-3">
            <div className="bg-primary h-2 rounded-full" style={{ width: "68%" }}></div>
          </div>
          <p className="text-xs text-text-secondary mt-2">Peak: 92% at 16:00</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Memory Usage</p>
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">6.8 GB</p>
          <div className="w-full bg-background rounded-full h-2 mt-3">
            <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
          </div>
          <p className="text-xs text-text-secondary mt-2">of 8 GB available</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Disk Usage</p>
            <Database className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">245 GB</p>
          <div className="w-full bg-background rounded-full h-2 mt-3">
            <div className="bg-primary h-2 rounded-full" style={{ width: "49%" }}></div>
          </div>
          <p className="text-xs text-text-secondary mt-2">of 500 GB total</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">CPU Usage Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={cpuData}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d9ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00d9ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "8px" }}
                labelStyle={{ color: "#e4e6eb" }}
              />
              <Area type="monotone" dataKey="usage" stroke="#00d9ff" fillOpacity={1} fill="url(#colorCpu)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Memory Usage Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={memoryData}>
              <defs>
                <linearGradient id="colorMemory" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "8px" }}
                labelStyle={{ color: "#e4e6eb" }}
              />
              <Area type="monotone" dataKey="used" stroke="#10b981" fillOpacity={1} fill="url(#colorMemory)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Response Time */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">API & Database Response Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={responseTimeData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "8px" }}
              labelStyle={{ color: "#e4e6eb" }}
            />
            <Line type="monotone" dataKey="api" stroke="#00d9ff" strokeWidth={2} dot={false} name="API" />
            <Line type="monotone" dataKey="db" stroke="#10b981" strokeWidth={2} dot={false} name="Database" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Service Status */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Service Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className={`border rounded-lg p-4 ${getStatusColor(metric.status)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  {metric.icon}
                  <div>
                    <p className="font-semibold text-foreground">{metric.name}</p>
                    <p className="text-sm text-text-secondary mt-1">{metric.description}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-foreground whitespace-nowrap ml-2">{metric.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-accent-warning" />
          Active Alerts
        </h2>
        <div className="space-y-3">
          <div className="p-4 bg-accent-warning/10 border border-accent-warning/30 rounded-lg flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-accent-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">High Message Queue Usage</p>
              <p className="text-sm text-text-secondary mt-1">
                MQTT broker queue is at 85% capacity. Consider processing backlog.
              </p>
              <p className="text-xs text-text-tertiary mt-2">Detected 2 minutes ago</p>
            </div>
          </div>
          <div className="p-4 bg-accent-info/10 border border-accent-info/30 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-accent-info flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Scheduled Maintenance</p>
              <p className="text-sm text-text-secondary mt-1">
                Database maintenance scheduled for 2024-01-20 at 02:00 AM UTC
              </p>
              <p className="text-xs text-text-tertiary mt-2">Scheduled 5 days from now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
