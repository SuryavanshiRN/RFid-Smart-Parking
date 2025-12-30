"use client"

import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { DollarSign, TrendingUp, Plus } from "lucide-react"
import { useState } from "react"

const paymentData = [
  { date: "Mon", transactions: 45, amount: 2400 },
  { date: "Tue", transactions: 52, amount: 2210 },
  { date: "Wed", transactions: 48, amount: 2290 },
  { date: "Thu", transactions: 61, amount: 2000 },
  { date: "Fri", transactions: 55, amount: 2181 },
  { date: "Sat", transactions: 67, amount: 2500 },
  { date: "Sun", transactions: 50, amount: 2100 },
]

const transactions = [
  { id: 1, user: "John Doe", amount: "$4.50", method: "Wallet", date: "2024-01-15 10:30 AM", status: "completed" },
  {
    id: 2,
    user: "Jane Smith",
    amount: "$7.50",
    method: "Credit Card",
    date: "2024-01-15 09:15 AM",
    status: "completed",
  },
  { id: 3, user: "Mike Johnson", amount: "$11.00", method: "Wallet", date: "2024-01-15 08:00 AM", status: "completed" },
  {
    id: 4,
    user: "Sarah Williams",
    amount: "$12.50",
    method: "Razorpay",
    date: "2024-01-15 07:45 AM",
    status: "completed",
  },
]

export default function PaymentsPage() {
  const [showAddFunds, setShowAddFunds] = useState(false)
  const [fundAmount, setFundAmount] = useState("")

  const handleAddFunds = () => {
    if (fundAmount) {
      alert(`Added $${fundAmount} to wallet`)
      setFundAmount("")
      setShowAddFunds(false)
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Payments</h1>
          <p className="text-text-secondary">Payment analytics and transaction history</p>
        </div>
        <button
          onClick={() => setShowAddFunds(!showAddFunds)}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-background font-semibold rounded-lg transition"
        >
          <Plus className="w-5 h-5" />
          Add Funds
        </button>
      </div>

      {showAddFunds && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Add Funds to Wallet</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Amount (USD)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-text-tertiary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition"
                />
                <button
                  onClick={handleAddFunds}
                  className="px-6 py-2 bg-primary hover:bg-primary-dark text-background font-semibold rounded-lg transition"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[10, 25, 50, 100].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setFundAmount(amount.toString())}
                  className="px-3 py-2 bg-background border border-border rounded-lg text-foreground hover:border-primary transition text-sm font-medium"
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Total Revenue</p>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">$16,681</p>
          <p className="text-xs text-accent-success mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +12.5% from last week
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Total Transactions</p>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">378</p>
          <p className="text-xs text-accent-success mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +8.2% from last week
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Avg Transaction</p>
            <DollarSign className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">$44.12</p>
          <p className="text-xs text-accent-success mt-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            +3.1% from last week
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Daily Transactions</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paymentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "8px" }}
                labelStyle={{ color: "#e4e6eb" }}
              />
              <Bar dataKey="transactions" fill="#00d9ff" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Daily Revenue</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={paymentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="date" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{ backgroundColor: "#1a1f2e", border: "1px solid #2d3748", borderRadius: "8px" }}
                labelStyle={{ color: "#e4e6eb" }}
              />
              <Line type="monotone" dataKey="amount" stroke="#00d9ff" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
        </div>
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">User</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Method</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} className="border-b border-border hover:bg-card-hover transition">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{tx.user}</td>
                <td className="px-6 py-4 text-sm font-semibold text-foreground">{tx.amount}</td>
                <td className="px-6 py-4 text-sm text-text-secondary">{tx.method}</td>
                <td className="px-6 py-4 text-sm text-text-secondary">{tx.date}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="inline-block px-2 py-1 rounded text-xs font-medium bg-accent-success/20 text-accent-success">
                    {tx.status}
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
