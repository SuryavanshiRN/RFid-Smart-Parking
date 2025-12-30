"use client"

import { Camera, AlertCircle, CheckCircle, Wifi, WifiOff, Activity, BarChart3 } from "lucide-react"
import { useState } from "react"
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const cameras = [
  {
    id: 1,
    name: "Main Lot A - Camera 1",
    location: "Entrance",
    status: "online",
    fps: 30,
    resolution: "1920x1080",
    lastUpdate: "2 seconds ago",
    detections: 45,
    accuracy: 98.5,
  },
  {
    id: 2,
    name: "Main Lot A - Camera 2",
    location: "Exit",
    status: "online",
    fps: 30,
    resolution: "1920x1080",
    lastUpdate: "1 second ago",
    detections: 38,
    accuracy: 97.8,
  },
  {
    id: 3,
    name: "Main Lot B - Camera 1",
    location: "Entrance",
    status: "online",
    fps: 25,
    resolution: "1280x720",
    lastUpdate: "3 seconds ago",
    detections: 32,
    accuracy: 96.2,
  },
  {
    id: 4,
    name: "Basement Level 1",
    location: "Main Area",
    status: "offline",
    fps: 0,
    resolution: "N/A",
    lastUpdate: "5 minutes ago",
    detections: 0,
    accuracy: 0,
  },
]

const detectionData = [
  { time: "00:00", vehicles: 12, empty: 188 },
  { time: "04:00", vehicles: 8, empty: 192 },
  { time: "08:00", vehicles: 95, empty: 105 },
  { time: "12:00", vehicles: 165, empty: 35 },
  { time: "16:00", vehicles: 178, empty: 22 },
  { time: "20:00", vehicles: 85, empty: 115 },
  { time: "24:00", vehicles: 15, empty: 185 },
]

const accuracyData = [
  { camera: "CAM_01", accuracy: 98.5 },
  { camera: "CAM_02", accuracy: 97.8 },
  { camera: "CAM_03", accuracy: 96.2 },
  { camera: "CAM_04", accuracy: 0 },
]

export default function CamerasPage() {
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null)

  const onlineCount = cameras.filter((c) => c.status === "online").length
  const totalDetections = cameras.reduce((sum, c) => sum + c.detections, 0)
  const avgAccuracy =
    cameras.filter((c) => c.status === "online").reduce((sum, c) => sum + c.accuracy, 0) /
    cameras.filter((c) => c.status === "online").length

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Cameras & Computer Vision</h1>
        <p className="text-text-secondary">Real-time vehicle detection and analytics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Online Cameras</p>
            <Wifi className="w-5 h-5 text-accent-success" />
          </div>
          <p className="text-3xl font-bold text-foreground">{onlineCount}</p>
          <p className="text-xs text-accent-success mt-2">of {cameras.length} cameras</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Total Detections</p>
            <Activity className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">{totalDetections}</p>
          <p className="text-xs text-text-secondary mt-2">Today</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Avg Accuracy</p>
            <BarChart3 className="w-5 h-5 text-accent-success" />
          </div>
          <p className="text-3xl font-bold text-foreground">{avgAccuracy.toFixed(1)}%</p>
          <p className="text-xs text-accent-success mt-2">Detection accuracy</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">System Status</p>
            <CheckCircle className="w-5 h-5 text-accent-success" />
          </div>
          <p className="text-3xl font-bold text-foreground">Active</p>
          <p className="text-xs text-accent-success mt-2">All systems operational</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Vehicle Detection Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={detectionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "8px" }}
                labelStyle={{ color: "#e4e6eb" }}
              />
              <Line type="monotone" dataKey="vehicles" stroke="#ef4444" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="empty" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Detection Accuracy by Camera</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="camera" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" domain={[0, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "8px" }}
                labelStyle={{ color: "#e4e6eb" }}
              />
              <Bar dataKey="accuracy" fill="#00d9ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Camera Grid */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Camera Feeds</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cameras.map((camera) => (
            <div
              key={camera.id}
              onClick={() => setSelectedCamera(selectedCamera === camera.id ? null : camera.id)}
              className={`bg-card border rounded-lg overflow-hidden hover:border-primary/50 transition cursor-pointer ${
                selectedCamera === camera.id ? "border-primary" : "border-border"
              }`}
            >
              {/* Camera Feed Placeholder */}
              <div className="w-full h-40 bg-background flex items-center justify-center border-b border-border relative">
                <Camera className="w-12 h-12 text-text-tertiary" />
                {camera.status === "online" && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-accent-success rounded-full animate-pulse"></div>
                )}
              </div>

              {/* Camera Info */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{camera.name}</h3>
                  <p className="text-xs text-text-secondary mt-1">{camera.location}</p>
                </div>

                {/* Status */}
                <div className="flex items-center gap-2">
                  {camera.status === "online" ? (
                    <>
                      <Wifi className="w-4 h-4 text-accent-success" />
                      <span className="text-xs font-medium text-accent-success">Online</span>
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-4 h-4 text-accent-error" />
                      <span className="text-xs font-medium text-accent-error">Offline</span>
                    </>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-background p-2 rounded">
                    <p className="text-text-tertiary">FPS</p>
                    <p className="font-semibold text-foreground">{camera.fps}</p>
                  </div>
                  <div className="bg-background p-2 rounded">
                    <p className="text-text-tertiary">Accuracy</p>
                    <p className="font-semibold text-foreground">{camera.accuracy}%</p>
                  </div>
                </div>

                {/* Detection Count */}
                {camera.status === "online" && (
                  <div className="bg-primary/10 border border-primary/30 rounded p-2">
                    <p className="text-xs text-text-secondary">Detections</p>
                    <p className="font-semibold text-primary">{camera.detections}</p>
                  </div>
                )}

                {/* Last Update */}
                <p className="text-xs text-text-tertiary">Updated {camera.lastUpdate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Vision Service Status</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-accent-success" />
              <div>
                <p className="text-sm font-medium text-foreground">YOLOv8 Detection Engine</p>
                <p className="text-xs text-text-secondary">Running normally - 98.5% avg accuracy</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-accent-success">Active</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-accent-success" />
              <div>
                <p className="text-sm font-medium text-foreground">MQTT Broker Connection</p>
                <p className="text-xs text-text-secondary">Connected to localhost:1883</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-accent-success">Connected</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-accent-warning" />
              <div>
                <p className="text-sm font-medium text-foreground">ESP32-CAM Stream</p>
                <p className="text-xs text-text-secondary">1 camera offline - Basement Level 1</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-accent-warning">Warning</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-background rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-accent-success" />
              <div>
                <p className="text-sm font-medium text-foreground">Real-time Processing</p>
                <p className="text-xs text-text-secondary">Processing 115 frames per second</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-accent-success">Active</span>
          </div>
        </div>
      </div>
    </div>
  )
}
