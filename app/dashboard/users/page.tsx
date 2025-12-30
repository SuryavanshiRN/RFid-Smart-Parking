"use client"

import { Plus, Edit2, Trash2, CreditCard } from "lucide-react"

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", rfid: "RFID-001", wallet: "$25.50", status: "active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", rfid: "RFID-002", wallet: "$12.00", status: "active" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", rfid: "RFID-003", wallet: "$0.00", status: "inactive" },
  { id: 4, name: "Sarah Williams", email: "sarah@example.com", rfid: "RFID-004", wallet: "$45.75", status: "active" },
]

export default function UsersPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Users</h1>
          <p className="text-text-secondary">Manage RFID users and wallets</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-background font-semibold rounded-lg transition">
          <Plus className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">RFID Tag</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Wallet</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-border hover:bg-card-hover transition">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{user.name}</td>
                <td className="px-6 py-4 text-sm text-text-secondary">{user.email}</td>
                <td className="px-6 py-4 text-sm text-text-secondary font-mono">{user.rfid}</td>
                <td className="px-6 py-4 text-sm font-semibold text-foreground flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  {user.wallet}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${user.status === "active" ? "bg-accent-success/20 text-accent-success" : "bg-accent-error/20 text-accent-error"}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm flex gap-2">
                  <button className="p-1 hover:bg-background rounded transition">
                    <Edit2 className="w-4 h-4 text-text-secondary hover:text-foreground" />
                  </button>
                  <button className="p-1 hover:bg-background rounded transition">
                    <Trash2 className="w-4 h-4 text-text-secondary hover:text-foreground" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
