"use client"

import { Save, Bell, Lock, Database } from "lucide-react"
import { useState } from "react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    parkingRate: "2.50",
    maxDuration: "24",
    notificationsEnabled: true,
    emailAlerts: true,
  })

  const handleSave = () => {
    alert("Settings saved successfully!")
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-text-secondary">Configure system preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Pricing Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Pricing Configuration
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Hourly Rate (USD)</label>
              <input
                type="number"
                value={settings.parkingRate}
                onChange={(e) => setSettings({ ...settings, parkingRate: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Maximum Duration (hours)</label>
              <input
                type="number"
                value={settings.maxDuration}
                onChange={(e) => setSettings({ ...settings, maxDuration: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-primary" />
            Notifications
          </h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notificationsEnabled}
                onChange={(e) => setSettings({ ...settings, notificationsEnabled: e.target.checked })}
                className="w-4 h-4 rounded border-border bg-background cursor-pointer"
              />
              <span className="text-sm text-foreground">Enable in-app notifications</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })}
                className="w-4 h-4 rounded border-border bg-background cursor-pointer"
              />
              <span className="text-sm text-foreground">Enable email alerts</span>
            </label>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Security
          </h2>
          <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-background font-semibold rounded-lg transition">
            Change Password
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2 bg-primary hover:bg-primary-dark text-background font-semibold rounded-lg transition"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>
    </div>
  )
}
