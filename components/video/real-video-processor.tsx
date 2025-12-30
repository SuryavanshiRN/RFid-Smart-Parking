"use client"

import type React from "react"

import { useRef, useEffect, useState, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Play, Pause, Upload } from "lucide-react"

interface Detection {
  type: "car" | "truck" | "motorcycle" | "bus" | "parking_space"
  confidence: number
  bbox: [number, number, number, number]
  polygon?: [number, number][]
}

interface VideoProcessorProps {
  videoSource?: string
  onDetectionsUpdate?: (detections: Detection[]) => void
  isProcessing?: boolean
}

export function RealVideoProcessor({ videoSource, onDetectionsUpdate, isProcessing = true }: VideoProcessorProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [detections, setDetections] = useState<Detection[]>([])
  const [fps, setFps] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const animationFrameRef = useRef<number>()
  const lastTimeRef = useRef(Date.now())
  const frameCountRef = useRef(0)

  // Process frame with Gemini API
  const processFrame = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current || !isPlaying) return

    try {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Draw video frame to canvas
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)

      // Get frame data
      const imageData = canvas.toDataURL("image/jpeg", 0.8)

      // Send to Gemini API for real detection
      const response = await fetch("/api/detect-vehicles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          frameData: imageData,
          timestamp: Date.now(),
        }),
      })

      if (!response.ok) throw new Error("Detection failed")

      const result = await response.json()
      setDetections(result.detections || [])
      onDetectionsUpdate?.(result.detections || [])

      // Draw detections on canvas
      drawDetections(ctx, result.detections || [], canvas.width, canvas.height)

      // Calculate FPS
      frameCountRef.current++
      const now = Date.now()
      if (now - lastTimeRef.current >= 1000) {
        setFps(frameCountRef.current)
        frameCountRef.current = 0
        lastTimeRef.current = now
      }
    } catch (err) {
      console.error("[v0] Detection error:", err)
      setError(err instanceof Error ? err.message : "Detection failed")
    }

    if (isProcessing && isPlaying) {
      animationFrameRef.current = requestAnimationFrame(processFrame)
    }
  }, [isPlaying, isProcessing, onDetectionsUpdate])

  // Draw detections on canvas
  const drawDetections = (ctx: CanvasRenderingContext2D, detections: Detection[], width: number, height: number) => {
    // Clear previous drawings
    ctx.clearRect(0, 0, width, height)
    ctx.drawImage(videoRef.current!, 0, 0, width, height)

    detections.forEach((det) => {
      const [x1, y1, x2, y2] = det.bbox
      const w = x2 - x1
      const h = y2 - y1

      // Draw bounding box
      ctx.strokeStyle = det.confidence > 0.8 ? "#10b981" : "#f59e0b"
      ctx.lineWidth = 2
      ctx.strokeRect(x1, y1, w, h)

      // Draw label
      ctx.fillStyle = det.confidence > 0.8 ? "#10b981" : "#f59e0b"
      ctx.font = "bold 12px Arial"
      ctx.fillText(`${det.type} ${(det.confidence * 100).toFixed(0)}%`, x1, y1 - 5)

      // Draw polygon if available
      if (det.polygon && det.polygon.length > 0) {
        ctx.strokeStyle = "#3b82f6"
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(det.polygon[0][0], det.polygon[0][1])
        for (let i = 1; i < det.polygon.length; i++) {
          ctx.lineTo(det.polygon[i][0], det.polygon[i][1])
        }
        ctx.closePath()
        ctx.stroke()
      }
    })
  }

  // Handle video play/pause
  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      } else {
        videoRef.current.play()
        setIsPlaying(true)
        processFrame()
      }
    }
  }

  // Handle file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && videoRef.current) {
      const url = URL.createObjectURL(file)
      videoRef.current.src = url
      setError(null)
    }
  }

  // Initialize video
  useEffect(() => {
    if (videoSource && videoRef.current) {
      videoRef.current.src = videoSource
    }
  }, [videoSource])

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <Card className="w-full bg-white border-slate-200">
      <div className="p-6">
        <div className="space-y-4">
          {/* Video Display */}
          <div className="relative bg-slate-900 rounded-lg overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-auto"
              onPlay={() => {
                setIsPlaying(true)
                processFrame()
              }}
              onPause={() => setIsPlaying(false)}
            />
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ display: "none" }} />

            {/* FPS Counter */}
            <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm">FPS: {fps}</div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
              <AlertCircle className="w-4 h-4" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-2">
            <Button onClick={togglePlayPause} variant="default" className="flex items-center gap-2">
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Play
                </>
              )}
            </Button>

            <label>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent" asChild>
                <span>
                  <Upload className="w-4 h-4" />
                  Upload Video
                  <input type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
                </span>
              </Button>
            </label>
          </div>

          {/* Detection Stats */}
          <div className="grid grid-cols-4 gap-2">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-600">Total Detections</div>
              <div className="text-lg font-bold text-slate-900">{detections.length}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-600">Avg Confidence</div>
              <div className="text-lg font-bold text-slate-900">
                {detections.length > 0
                  ? ((detections.reduce((sum, d) => sum + d.confidence, 0) / detections.length) * 100).toFixed(0)
                  : "0"}
                %
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-600">Processing</div>
              <div className="text-lg font-bold text-slate-900">{isProcessing ? "Yes" : "No"}</div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <div className="text-xs text-slate-600">Status</div>
              <div className="text-lg font-bold text-green-600">{isPlaying ? "Live" : "Idle"}</div>
            </div>
          </div>

          {/* Detections List */}
          {detections.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-slate-900">Detected Objects</h3>
              <div className="max-h-40 overflow-y-auto space-y-1">
                {detections.map((det, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-200 text-sm"
                  >
                    <span className="text-slate-700 capitalize">{det.type}</span>
                    <span className="text-slate-600">{(det.confidence * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
