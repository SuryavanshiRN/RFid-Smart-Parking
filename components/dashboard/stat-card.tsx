import { TrendingUp, TrendingDown } from "lucide-react"
import type React from "react"

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ReactNode
  trend: "up" | "down"
}

export default function StatCard({ title, value, change, icon, trend }: StatCardProps) {
  const isPositive = trend === "up"

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-500/50 transition shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">{icon}</div>
        <div
          className={`flex items-center gap-1 text-sm font-semibold ${isPositive ? "text-green-600" : "text-red-600"}`}
        >
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {change}
        </div>
      </div>
      <p className="text-gray-600 text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}
