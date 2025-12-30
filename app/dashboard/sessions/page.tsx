"use client"

import { Clock, MapPin, DollarSign, User, Filter, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"

interface Session {
  id: number
  vehicle: string
  user: string
  entryTime: string
  duration: string
  amount: string
  status: "active" | "completed"
  lot: string
  elapsedSeconds: number
}

const initialSessions: Session[] = [
  {
    id: 1,
    vehicle: "ABC-1234",
    user: "John Doe",
    entryTime: "10:30 AM",
    duration: "2h 15m",
    amount: "$4.50",
    status: "active",
    lot: "Main Lot A",
    elapsedSeconds: 8100,
  },
  {
    id: 2,
    vehicle: "XYZ-5678",
    user: "Jane Smith",
    entryTime: "09:15 AM",
    duration: "3h 45m",
    amount: "$7.50",
    status: "active",
    lot: "Main Lot B",
    elapsedSeconds: 13500,
  },
  {
    id: 3,
    vehicle: "DEF-9012",
    user: "Mike Johnson",
    entryTime: "08:00 AM",
    duration: "5h 30m",
    amount: "$11.00",
    status: "completed",
    lot: "Basement Level 1",
    elapsedSeconds: 19800,
  },
  {
    id: 4,
    vehicle: "GHI-3456",
    user: "Sarah Williams",
    entryTime: "07:45 AM",
    duration: "6h 15m",
    amount: "$12.50",
    status: "completed",
    lot: "Main Lot A",
    elapsedSeconds: 22500,
  },
]

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>(initialSessions)
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "completed">("all")
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    if (!autoRefresh) return

    const interval = setInterval(() => {
      setSessions((prevSessions) =>
        prevSessions.map((session) => {
          if (session.status === "active") {
            const newElapsedSeconds = session.elapsedSeconds + 1
            const hours = Math.floor(newElapsedSeconds / 3600)
            const minutes = Math.floor((newElapsedSeconds % 3600) / 60)
            const seconds = newElapsedSeconds % 60

            const durationStr = `${hours}h ${minutes}m`
            const hourlyRate = 2.5
            const amount = (newElapsedSeconds / 3600) * hourlyRate

            return {
              ...session,
              elapsedSeconds: newElapsedSeconds,
              duration: durationStr,
              amount: `$${amount.toFixed(2)}`,
            }
          }
          return session
        }),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [autoRefresh])

  const filteredSessions = sessions.filter((session) => {
    if (filterStatus === "all") return true
    return session.status === filterStatus
  })

  const activeSessions = sessions.filter((s) => s.status === "active").length
  const completedSessions = sessions.filter((s) => s.status === "completed").length

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Parking Sessions</h1>
          <p className="text-text-secondary">Monitor active and completed parking sessions</p>
        </div>
        <button
          onClick={() => setAutoRefresh(!autoRefresh)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
            autoRefresh
              ? "bg-primary/20 text-primary"
              : "bg-card border border-border text-text-secondary hover:text-foreground"
          }`}
        >
          <RefreshCw className={`w-5 h-5 ${autoRefresh ? "animate-spin" : ""}`} />
          {autoRefresh ? "Live" : "Paused"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-text-secondary text-sm mb-2">Active Sessions</p>
          <p className="text-3xl font-bold text-foreground">{activeSessions}</p>
          <p className="text-xs text-accent-info mt-2">Real-time monitoring</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-text-secondary text-sm mb-2">Completed Today</p>
          <p className="text-3xl font-bold text-foreground">{completedSessions}</p>
          <p className="text-xs text-accent-success mt-2">Sessions finished</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-text-secondary text-sm mb-2">Total Revenue</p>
          <p className="text-3xl font-bold text-foreground">
            ${sessions.reduce((sum, s) => sum + Number.parseFloat(s.amount.replace("$", "")), 0).toFixed(2)}
          </p>
          <p className="text-xs text-accent-success mt-2">From all sessions</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-text-secondary" />
        <button
          onClick={() => setFilterStatus("all")}
          className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
            filterStatus === "all"
              ? "bg-primary/20 text-primary"
              : "bg-card border border-border text-text-secondary hover:text-foreground"
          }`}
        >
          All Sessions
        </button>
        <button
          onClick={() => setFilterStatus("active")}
          className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
            filterStatus === "active"
              ? "bg-primary/20 text-primary"
              : "bg-card border border-border text-text-secondary hover:text-foreground"
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilterStatus("completed")}
          className={`px-4 py-2 rounded-lg transition text-sm font-medium ${
            filterStatus === "completed"
              ? "bg-primary/20 text-primary"
              : "bg-card border border-border text-text-secondary hover:text-foreground"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Sessions Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Vehicle</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">User</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Lot</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Entry Time</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Duration</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((session) => (
              <tr
                key={session.id}
                className={`border-b border-border hover:bg-card-hover transition ${
                  session.status === "active" ? "bg-background/50" : ""
                }`}
              >
                <td className="px-6 py-4 text-sm font-medium text-foreground">{session.vehicle}</td>
                <td className="px-6 py-4 text-sm text-text-secondary flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {session.user}
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {session.lot}
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">{session.entryTime}</td>
                <td className="px-6 py-4 text-sm text-text-secondary flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {session.duration}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  {session.amount}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      session.status === "active"
                        ? "bg-accent-info/20 text-accent-info"
                        : "bg-accent-success/20 text-accent-success"
                    }`}
                  >
                    {session.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
