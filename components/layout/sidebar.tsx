"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  ParkingCircle,
  Users,
  CreditCard,
  Camera,
  Activity,
  Settings,
  LogOut,
  Wallet,
  Eye,
  ActivityIcon,
  BarChart3,
} from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Camera, label: "Live Monitoring", href: "/dashboard/live-monitoring" },
  { icon: ParkingCircle, label: "Parking Lots", href: "/dashboard/parking" },
  { icon: Activity, label: "Sessions", href: "/dashboard/sessions" },
  { icon: Users, label: "Users", href: "/dashboard/users" },
  { icon: CreditCard, label: "Payments", href: "/dashboard/payments" },
  { icon: Wallet, label: "Wallet", href: "/dashboard/wallet" },
  { icon: Eye, label: "Vision Analytics", href: "/dashboard/vision" },
  { icon: ActivityIcon, label: "System Health", href: "/dashboard/health" },
  { icon: BarChart3, label: "Monitoring", href: "/dashboard/monitoring" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
]

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("userEmail")
    router.push("/login")
  }

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <ParkingCircle className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900">Smart Parking</h1>
            <p className="text-xs text-gray-500">Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive
                  ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}
