"use client"

import { CreditCard, Send, Plus, History, TrendingUp } from "lucide-react"
import { useState } from "react"

interface WalletTransaction {
  id: number
  type: "credit" | "debit"
  description: string
  amount: number
  date: string
  balance: number
}

const walletTransactions: WalletTransaction[] = [
  {
    id: 1,
    type: "credit",
    description: "Added funds",
    amount: 50,
    date: "2024-01-15 02:30 PM",
    balance: 125.5,
  },
  {
    id: 2,
    type: "debit",
    description: "Parking session ABC-1234",
    amount: 4.5,
    date: "2024-01-15 10:30 AM",
    balance: 75.5,
  },
  {
    id: 3,
    type: "debit",
    description: "Parking session XYZ-5678",
    amount: 7.5,
    date: "2024-01-15 09:15 AM",
    balance: 80,
  },
  {
    id: 4,
    type: "credit",
    description: "Refund - Session cancelled",
    amount: 5,
    date: "2024-01-14 04:20 PM",
    balance: 87.5,
  },
  {
    id: 5,
    type: "debit",
    description: "Parking session DEF-9012",
    amount: 11,
    date: "2024-01-14 08:00 AM",
    balance: 82.5,
  },
]

export default function WalletPage() {
  const [showTransfer, setShowTransfer] = useState(false)
  const [transferAmount, setTransferAmount] = useState("")
  const [transferEmail, setTransferEmail] = useState("")

  const currentBalance = 125.5
  const monthlySpent = 45.5
  const monthlyLimit = 500

  const handleTransfer = () => {
    if (transferAmount && transferEmail) {
      alert(`Transferred $${transferAmount} to ${transferEmail}`)
      setTransferAmount("")
      setTransferEmail("")
      setShowTransfer(false)
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Wallet</h1>
        <p className="text-text-secondary">Manage your parking wallet and funds</p>
      </div>

      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 rounded-lg p-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <p className="text-text-secondary text-sm mb-2">Current Balance</p>
            <p className="text-5xl font-bold text-foreground">${currentBalance.toFixed(2)}</p>
          </div>
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-primary-dark text-background font-semibold rounded-lg transition">
            <Plus className="w-5 h-5" />
            Add Funds
          </button>
          <button
            onClick={() => setShowTransfer(!showTransfer)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-background/50 hover:bg-background border border-primary/30 text-foreground font-semibold rounded-lg transition"
          >
            <Send className="w-5 h-5" />
            Transfer
          </button>
        </div>
      </div>

      {/* Transfer Modal */}
      {showTransfer && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Transfer Funds</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Recipient Email</label>
              <input
                type="email"
                value={transferEmail}
                onChange={(e) => setTransferEmail(e.target.value)}
                placeholder="recipient@example.com"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-text-tertiary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Amount (USD)</label>
              <input
                type="number"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder-text-tertiary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleTransfer}
                className="flex-1 px-4 py-2 bg-primary hover:bg-primary-dark text-background font-semibold rounded-lg transition"
              >
                Transfer
              </button>
              <button
                onClick={() => setShowTransfer(false)}
                className="flex-1 px-4 py-2 bg-background border border-border text-foreground font-semibold rounded-lg hover:bg-card-hover transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Monthly Spent</p>
            <TrendingUp className="w-5 h-5 text-accent-warning" />
          </div>
          <p className="text-3xl font-bold text-foreground">${monthlySpent.toFixed(2)}</p>
          <p className="text-xs text-text-secondary mt-2">of ${monthlyLimit} limit</p>
          <div className="w-full bg-background rounded-full h-2 mt-3">
            <div
              className="bg-accent-warning h-2 rounded-full"
              style={{ width: `${(monthlySpent / monthlyLimit) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Total Transactions</p>
            <History className="w-5 h-5 text-primary" />
          </div>
          <p className="text-3xl font-bold text-foreground">{walletTransactions.length}</p>
          <p className="text-xs text-text-secondary mt-2">All time</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-text-secondary text-sm">Remaining Budget</p>
            <CreditCard className="w-5 h-5 text-accent-success" />
          </div>
          <p className="text-3xl font-bold text-foreground">${(monthlyLimit - monthlySpent).toFixed(2)}</p>
          <p className="text-xs text-accent-success mt-2">This month</p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <History className="w-5 h-5" />
            Transaction History
          </h2>
        </div>
        <table className="w-full">
          <thead className="bg-background border-b border-border">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Description</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Amount</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">Balance</th>
            </tr>
          </thead>
          <tbody>
            {walletTransactions.map((tx) => (
              <tr key={tx.id} className="border-b border-border hover:bg-card-hover transition">
                <td className="px-6 py-4 text-sm font-medium text-foreground">{tx.description}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      tx.type === "credit"
                        ? "bg-accent-success/20 text-accent-success"
                        : "bg-accent-error/20 text-accent-error"
                    }`}
                  >
                    {tx.type === "credit" ? "+" : "-"}${tx.amount.toFixed(2)}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-foreground">
                  {tx.type === "credit" ? "+" : "-"}${tx.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">{tx.date}</td>
                <td className="px-6 py-4 text-sm font-semibold text-foreground">${tx.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
