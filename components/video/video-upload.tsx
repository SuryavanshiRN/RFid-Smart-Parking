"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Upload, Play, Pause, Volume2, VolumeX } from "lucide-react"

interface VideoUploadProps {
  onVideoLoad?: (videoElement: HTMLVideoElement) => void
}

export function VideoUpload({ onVideoLoad }: VideoUploadProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setVideoUrl(url)
      setIsPlaying(false)
    }
  }

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="w-full space-y-4">
      {!videoUrl ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-500 hover:bg-slate-900/50 transition-colors"
        >
          <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-300 font-medium">Click to upload parking video</p>
          <p className="text-slate-500 text-sm">MP4, WebM, or other video formats</p>
          <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative bg-slate-950 rounded-lg overflow-hidden border border-slate-700">
            <video
              ref={videoRef}
              src={videoUrl}
              className="w-full h-auto"
              onLoadedMetadata={() => onVideoLoad?.(videoRef.current!)}
            />
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePlayPause}
              className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button
              onClick={handleMute}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setVideoUrl(null)
                setIsPlaying(false)
              }}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
