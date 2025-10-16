"use client"

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { AlertTriangle, TrendingUp, Eye } from "lucide-react"

const vehicleTypeData = [
  { type: "Sedan", count: 245, color: "#3b82f6" },
  { type: "SUV", count: 189, color: "#10b981" },
  { type: "Truck", count: 67, color: "#f59e0b" },
  { type: "Motorcycle", count: 34, color: "#8b5cf6" },
]

const detectionAccuracyData = [
  { time: "00:00", accuracy: 97.2 },
  { time: "04:00", accuracy: 98.1 },
  { time: "08:00", accuracy: 96.8 },
  { time: "12:00", accuracy: 98.5 },
  { time: "16:00", accuracy: 97.9 },
  { time: "20:00", accuracy: 98.2 },
  { time: "24:00", accuracy: 97.5 },
]

const falsePositiveData = [
  { camera: "CAM_01", falsePositives: 2 },
  { camera: "CAM_02", falsePositives: 1 },
  { camera: "CAM_03", falsePositives: 3 },
  { camera: "CAM_04", falsePositives: 0 },
]

export default function VisionPage() {
  const totalDetections = vehicleTypeData.reduce((sum, item) => sum + item.count, 0)
  const avgAccuracy = 97.8

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Vision Analytics</h1>
        <p className="text-text-secondary">Advanced computer vision detection and analysis</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Total Detections</p>
            <Eye className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">{totalDetections}</p>
          <p className="text-xs text-accent-success mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +12.5% from yesterday
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Avg Accuracy</p>
            <TrendingUp className="w-5 h-5 text-accent-success" />
          </div>
          <p className="text-3xl font-bold text-foreground">{avgAccuracy}%</p>
          <p className="text-xs text-text-secondary mt-2">Detection confidence</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">False Positives</p>
            <AlertTriangle className="w-5 h-5 text-accent-warning" />
          </div>
          <p className="text-3xl font-bold text-foreground">6</p>
          <p className="text-xs text-text-secondary mt-2">Today</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Processing Speed</p>
            <Eye className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">115 FPS</p>
          <p className="text-xs text-text-secondary mt-2">Real-time</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Vehicle Type Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={vehicleTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="count"
              >
                {vehicleTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "8px" }}
                labelStyle={{ color: "#e4e6eb" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {vehicleTypeData.map((item) => (
              <div key={item.type} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-text-secondary">{item.type}</span>
                </div>
                <span className="font-semibold text-foreground">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Detection Accuracy Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={detectionAccuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="time" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" domain={[95, 100]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "8px" }}
                labelStyle={{ color: "#e4e6eb" }}
              />
              <Line type="monotone" dataKey="accuracy" stroke="#00d9ff" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* False Positives */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">False Positives by Camera</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={falsePositiveData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
            <XAxis dataKey="camera" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{ backgroundColor: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "8px" }}
              labelStyle={{ color: "#e4e6eb" }}
            />
            <Bar dataKey="falsePositives" fill="#f59e0b" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detection Models */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Active Detection Models</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-background rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">YOLOv8 - Vehicle Detection</p>
              <p className="text-xs text-text-secondary mt-1">Detects cars, trucks, motorcycles, and buses</p>
            </div>
            <span className="px-3 py-1 bg-accent-success/20 text-accent-success text-xs font-semibold rounded">
              Active
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-background rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">License Plate Recognition</p>
              <p className="text-xs text-text-secondary mt-1">OCR-based plate detection and reading</p>
            </div>
            <span className="px-3 py-1 bg-accent-success/20 text-accent-success text-xs font-semibold rounded">
              Active
            </span>
          </div>
          <div className="flex items-center justify-between p-4 bg-background rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">Parking Space Detection</p>
              <p className="text-xs text-text-secondary mt-1">Real-time empty slot identification</p>
            </div>
            <span className="px-3 py-1 bg-accent-success/20 text-accent-success text-xs font-semibold rounded">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
