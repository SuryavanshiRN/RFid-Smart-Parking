"use client"

import { useState } from "react"
import { Camera, Upload, LinkIcon } from "lucide-react"
import { VideoUpload } from "./video-upload"
import { RTSPStream } from "./rtsp-stream"

type VideoSource = "dummy" | "upload" | "rtsp"

export function VideoSourceSelector() {
  const [selectedSource, setSelectedSource] = useState<VideoSource>("dummy")

  return (
    <div className="w-full space-y-4">
      {/* Source Selection Tabs */}
      <div className="flex gap-2 border-b border-slate-700">
        {[
          { id: "dummy", label: "Demo Feed", icon: Camera },
          { id: "upload", label: "Upload Video", icon: Upload },
          { id: "rtsp", label: "RTSP Stream", icon: LinkIcon },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setSelectedSource(id as VideoSource)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              selectedSource === id
                ? "border-cyan-500 text-cyan-400"
                : "border-transparent text-slate-400 hover:text-slate-300"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-slate-900 rounded-lg border border-slate-700 p-6">
        {selectedSource === "dummy" && (
          <div className="text-center py-8">
            <Camera className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-300 font-medium">Demo Parking Feed</p>
            <p className="text-slate-500 text-sm mt-1">Realistic dummy footage with vehicle detection</p>
          </div>
        )}
        {selectedSource === "upload" && <VideoUpload />}
        {selectedSource === "rtsp" && <RTSPStream />}
      </div>
    </div>
  )
}
