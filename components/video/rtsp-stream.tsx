"use client"

import { useState } from "react"
import { Link, Play } from "lucide-react"

interface RTSPStreamProps {
  onStreamConnect?: (url: string) => void
}

export function RTSPStream({ onStreamConnect }: RTSPStreamProps) {
  const [rtspUrl, setRtspUrl] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleConnect = async () => {
    if (!rtspUrl.trim()) {
      setError("Please enter an RTSP URL")
      return
    }

    setIsConnecting(true)
    setError(null)

    try {
      if (!rtspUrl.startsWith("rtsp://") && !rtspUrl.startsWith("rtsps://")) {
        throw new Error("URL must start with rtsp:// or rtsps://")
      }

      onStreamConnect?.(rtspUrl)
      setRtspUrl("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to connect to stream")
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="w-full space-y-4 bg-slate-900 rounded-lg border border-slate-700 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Link className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-semibold text-white">Connect RTSP Stream</h3>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">RTSP URL</label>
          <input
            type="text"
            value={rtspUrl}
            onChange={(e) => {
              setRtspUrl(e.target.value)
              setError(null)
            }}
            placeholder="rtsp://camera-ip:554/stream"
            className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
          <p className="text-xs text-slate-400 mt-1">Example: rtsp://192.168.1.100:554/stream</p>
        </div>

        {error && (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded p-2">{error}</div>
        )}

        <button
          onClick={handleConnect}
          disabled={isConnecting || !rtspUrl.trim()}
          className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Play className="w-4 h-4" />
          {isConnecting ? "Connecting..." : "Connect Stream"}
        </button>
      </div>

      <div className="bg-slate-800/50 rounded p-3 text-xs text-slate-400 space-y-1">
        <p className="font-semibold text-slate-300">Supported Formats:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>RTSP streams from IP cameras</li>
          <li>HTTP/HTTPS video streams</li>
          <li>Local video files</li>
        </ul>
      </div>
    </div>
  )
}
