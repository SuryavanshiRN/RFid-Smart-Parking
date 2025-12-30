"use client"

import React from "react"
import { Bell, Search, User } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [userEmail, setUserEmail] = useState("")

  React.useEffect(() => {
    setUserEmail(localStorage.getItem("userEmail") || "admin@parking.com")
  }, [])

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-8">
        <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">Admin</p>
            <p className="text-xs text-gray-500">{userEmail}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>
    </header>
  )
}
