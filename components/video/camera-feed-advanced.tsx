"use client"

import { useVideoStream } from "@/hooks/use-video-stream"
import { useEffect, useRef, useState } from "react"
import { DummyVideoGenerator } from "@/lib/dummy-video-generator"
import { AlertCircle, Camera, Zap } from "lucide-react"

interface CameraStats {
  fps: number
  resolution: string
  latency: number
  detectionAccuracy: number
}

export function CameraFeedAdvanced() {
  const { isStreaming, frameRate, detections, error, startStream, stopStream } = useVideoStream(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null)
  const generatorRef = useRef<DummyVideoGenerator | null>(null)
  const [stats, setStats] = useState<CameraStats>({
    fps: 0,
    resolution: "1280x720",
    latency: 0,
    detectionAccuracy: 0,
  })
  const [selectedDetection, setSelectedDetection] = useState<string | null>(null)

  useEffect(() => {
    if (!generatorRef.current) {
      generatorRef.current = new DummyVideoGenerator(1280, 720)
    }

    const animationId = setInterval(() => {
      if (canvasRef.current && overlayCanvasRef.current && generatorRef.current) {
        const ctx = canvasRef.current.getContext("2d")
        const overlayCtx = overlayCanvasRef.current.getContext("2d")

        if (ctx && overlayCtx) {
          // Draw main frame
          const frameDataUrl = generatorRef.current.generateFrame()
          const img = new Image()
          img.crossOrigin = "anonymous"
          img.onload = () => {
            if (!canvasRef.current || !overlayCanvasRef.current) return

            ctx.drawImage(img, 0, 0)

            // Clear overlay
            overlayCtx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height)

            // Draw detections with polygons
            if (detections) {
              detections.detections.forEach((detection, index) => {
                const isSelected = selectedDetection === detection.id
                const color = getColorByType(detection.type)

                // Draw polygon
                overlayCtx.strokeStyle = isSelected ? "#ffff00" : color
                overlayCtx.lineWidth = isSelected ? 4 : 3
                overlayCtx.beginPath()
                detection.polygon.forEach((point, pointIndex) => {
                  if (pointIndex === 0) {
                    overlayCtx.moveTo(point[0], point[1])
                  } else {
                    overlayCtx.lineTo(point[0], point[1])
                  }
                })
                overlayCtx.closePath()
                overlayCtx.stroke()

                // Draw filled polygon with transparency
                overlayCtx.fillStyle = isSelected ? "rgba(255, 255, 0, 0.1)" : `${color}20`
                overlayCtx.fill()

                // Draw center point
                overlayCtx.fillStyle = color
                overlayCtx.beginPath()
                overlayCtx.arc(detection.center.x, detection.center.y, 5, 0, Math.PI * 2)
                overlayCtx.fill()

                // Draw label with background
                const label = `${detection.type.toUpperCase()} ${(detection.confidence * 100).toFixed(0)}%`
                overlayCtx.font = "bold 14px Arial"
                const textMetrics = overlayCtx.measureText(label)
                const textWidth = textMetrics.width + 8
                const textHeight = 20

                overlayCtx.fillStyle = isSelected ? "rgba(255, 255, 0, 0.9)" : `${color}cc`
                overlayCtx.fillRect(detection.center.x - textWidth / 2, detection.center.y - 30, textWidth, textHeight)

                overlayCtx.fillStyle = "#000"
                overlayCtx.fillText(label, detection.center.x - textWidth / 2 + 4, detection.center.y - 15)
              })

              // Update stats
              setStats((prev) => ({
                ...prev,
                fps: frameRate,
                latency: Math.floor(Math.random() * 50 + 20),
                detectionAccuracy: Math.random() * 0.15 + 0.85,
              }))
            }
          }
          img.src = frameDataUrl
        }
      }
    }, 33)

    return () => clearInterval(animationId)
  }, [detections, frameRate, selectedDetection])

  return (
    <div className="w-full space-y-4">
      {/* Main Camera Feed */}
      <div className="relative bg-slate-950 rounded-lg overflow-hidden border border-slate-700 shadow-2xl">
        <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
          <canvas ref={canvasRef} width={1280} height={720} className="w-full h-full bg-slate-950" />
          <canvas ref={overlayCanvasRef} width={1280} height={720} className="absolute inset-0 w-full h-full" />

          {/* Top Left - Camera Info */}
          <div className="absolute top-4 left-4 bg-slate-950/90 backdrop-blur-md p-3 rounded-lg border border-slate-700 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400">
              <Camera className="w-4 h-4" />
              <span className="text-sm font-semibold">CAMERA 1</span>
            </div>
            <div className="text-xs text-slate-400 space-y-1">
              <div>Resolution: {stats.resolution}</div>
              <div>FPS: {stats.fps}</div>
              <div>Latency: {stats.latency}ms</div>
            </div>
          </div>

          {/* Top Right - Live Indicator */}
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-slate-950/90 backdrop-blur-md px-3 py-2 rounded-lg border border-slate-700">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isStreaming ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-xs font-semibold text-slate-300">{isStreaming ? "LIVE" : "OFFLINE"}</span>
          </div>

          {/* Bottom Left - Detection Stats */}
          <div className="absolute bottom-4 left-4 bg-slate-950/90 backdrop-blur-md p-3 rounded-lg border border-slate-700 space-y-2">
            <div className="text-xs font-semibold text-slate-300">DETECTIONS</div>
            {detections && (
              <div className="text-xs text-slate-400 space-y-1">
                <div>Vehicles: {detections.detections.length}</div>
                <div>Occupancy: {(detections.occupancyRate * 100).toFixed(1)}%</div>
                <div>
                  Available: {detections.availableSpaces}/{detections.totalSpaces}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Right - Accuracy */}
          <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md p-3 rounded-lg border border-slate-700">
            <div className="text-xs font-semibold text-slate-300 mb-2">ACCURACY</div>
            <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all"
                style={{ width: `${stats.detectionAccuracy * 100}%` }}
              />
            </div>
            <div className="text-xs text-slate-400 mt-1">{(stats.detectionAccuracy * 100).toFixed(1)}%</div>
          </div>

          {/* Error Overlay */}
          {error && (
            <div className="absolute inset-0 bg-red-500/20 backdrop-blur-sm flex items-center justify-center">
              <div className="bg-red-950 border border-red-500 rounded-lg p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="text-red-200 text-sm">{error}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detection List */}
      {detections && detections.detections.length > 0 && (
        <div className="bg-slate-900 rounded-lg border border-slate-700 p-4">
          <div className="text-sm font-semibold text-slate-300 mb-3">DETECTED VEHICLES</div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {detections.detections.map((detection) => (
              <button
                key={detection.id}
                onClick={() => setSelectedDetection(selectedDetection === detection.id ? null : detection.id)}
                className={`p-3 rounded-lg border transition-all text-left text-xs ${
                  selectedDetection === detection.id
                    ? "bg-yellow-500/20 border-yellow-500"
                    : "bg-slate-800 border-slate-700 hover:border-slate-600"
                }`}
              >
                <div className="font-semibold text-slate-200 capitalize">{detection.type}</div>
                <div className="text-slate-400">ID: {detection.id}</div>
                <div className="text-slate-400">Confidence: {(detection.confidence * 100).toFixed(0)}%</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2">
        <button
          onClick={startStream}
          disabled={isStreaming}
          className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" />
          Start Stream
        </button>
        <button
          onClick={stopStream}
          disabled={!isStreaming}
          className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Stop Stream
        </button>
      </div>
    </div>
  )
}

function getColorByType(type: string): string {
  const colors: Record<string, string> = {
    car: "#00d9ff",
    truck: "#ff6b6b",
    motorcycle: "#ffd93d",
    bus: "#6bcf7f",
  }
  return colors[type] || "#00d9ff"
}
