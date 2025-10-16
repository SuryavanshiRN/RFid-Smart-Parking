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
  Legend,
  ResponsiveContainer,
} from "recharts"
import StatCard from "@/components/dashboard/stat-card"
import { Users, ParkingCircle, DollarSign, AlertCircle, Activity } from "lucide-react"

const occupancyData = [
  { time: "00:00", occupied: 45, available: 155 },
  { time: "04:00", occupied: 32, available: 168 },
  { time: "08:00", occupied: 120, available: 80 },
  { time: "12:00", occupied: 165, available: 35 },
  { time: "16:00", occupied: 180, available: 20 },
  { time: "20:00", occupied: 95, available: 105 },
  { time: "24:00", occupied: 50, available: 150 },
]

const revenueData = [
  { date: "Mon", revenue: 2400 },
  { date: "Tue", revenue: 2210 },
  { date: "Wed", revenue: 2290 },
  { date: "Thu", revenue: 2000 },
  { date: "Fri", revenue: 2181 },
  { date: "Sat", revenue: 2500 },
  { date: "Sun", revenue: 2100 },
]

const slotDistribution = [
  { name: "Occupied", value: 165, color: "#ef4444" },
  { name: "Available", value: 35, color: "#10b981" },
]

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8 bg-gray-50">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Real-time parking management overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Slots"
          value="200"
          change="+2.5%"
          icon={<ParkingCircle className="w-6 h-6" />}
          trend="up"
        />
        <StatCard title="Occupied" value="165" change="+12.3%" icon={<Activity className="w-6 h-6" />} trend="up" />
        <StatCard
          title="Revenue Today"
          value="$2,450"
          change="+8.2%"
          icon={<DollarSign className="w-6 h-6" />}
          trend="up"
        />
        <StatCard title="Active Users" value="1,234" change="+5.1%" icon={<Users className="w-6 h-6" />} trend="up" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Occupancy Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={occupancyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                labelStyle={{ color: "#111827" }}
              />
              <Legend />
              <Line type="monotone" dataKey="occupied" stroke="#3b82f6" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="available" stroke="#10b981" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Slot Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={slotDistribution}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {slotDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
                labelStyle={{ color: "#111827" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {slotDistribution.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                <span className="font-semibold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Weekly Revenue</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "8px" }}
              labelStyle={{ color: "#111827" }}
            />
            <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          System Alerts
        </h2>
        <div className="space-y-3">
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-yellow-600 mt-1.5 flex-shrink-0"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">High Occupancy</p>
              <p className="text-xs text-gray-600">Parking lot is 82% full</p>
            </div>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Camera Offline</p>
              <p className="text-xs text-gray-600">Camera CAM_02 is not responding</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
