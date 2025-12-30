"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("admin@parking.com")
  const [password, setPassword] = useState("admin123")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email && password) {
        localStorage.setItem("authToken", "mock-token-" + Date.now())
        localStorage.setItem("userEmail", email)
        if (rememberMe) {
          localStorage.setItem("rememberEmail", email)
        }
        router.push("/dashboard")
      }
    } catch (err) {
      setError("Invalid credentials")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-500/10 mb-4">
            <Lock className="w-6 h-6 text-cyan-500" />
          </div>
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Smart Parking</h1>
          <p className="text-slate-400">IoT Parking Management System</p>
        </div>

        <div className="bg-slate-900 border border-slate-700 rounded-lg p-8 shadow-lg">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-100 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition"
                  placeholder="admin@parking.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-100 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/50 transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-100 transition"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-700 bg-slate-950 cursor-pointer"
                />
                <span className="text-sm text-slate-400">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-cyan-500 hover:text-cyan-400 transition">
                Forgot password?
              </Link>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-slate-400 text-sm mt-6">
            Don't have an account?{" "}
            <Link href="/signup" className="text-cyan-500 hover:text-cyan-400 transition font-medium">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-6 p-4 bg-slate-900/50 border border-slate-700 rounded-lg">
          <p className="text-xs text-slate-500 mb-2">Demo Credentials:</p>
          <p className="text-xs text-slate-400">Email: admin@parking.com</p>
          <p className="text-xs text-slate-400">Password: admin123</p>
        </div>
      </div>
    </div>
  )
}
