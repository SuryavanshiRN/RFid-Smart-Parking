"use client"

import { useVideoStream } from "@/hooks/use-video-stream"
import { useEffect, useRef, useState } from "react"
import { DummyVideoGenerator } from "@/lib/dummy-video-generator"

export function LiveFeed() {
  const { isStreaming, frameRate, detections, error, startStream, stopStream } = useVideoStream(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const generatorRef = useRef<DummyVideoGenerator | null>(null)
  const [isCanvasReady, setIsCanvasReady] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    if (!generatorRef.current) {
      generatorRef.current = new DummyVideoGenerator(1280, 720)
    }
    setIsCanvasReady(true)
  }, [])

  useEffect(() => {
    if (!isCanvasReady || !canvasRef.current || !generatorRef.current) return

    const animationId = setInterval(() => {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      try {
        const frameDataUrl = generatorRef.current!.generateFrame()
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => {
          if (canvas.width > 0 && canvas.height > 0) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

            // Draw detections
            if (detections) {
              detections.detections.forEach((detection) => {
                ctx.strokeStyle = "#00d9ff"
                ctx.lineWidth = 3
                ctx.beginPath()
                detection.polygon.forEach((point, index) => {
                  if (index === 0) {
                    ctx.moveTo(point[0], point[1])
                  } else {
                    ctx.lineTo(point[0], point[1])
                  }
                })
                ctx.closePath()
                ctx.stroke()

                // Draw label
                ctx.fillStyle = "#00d9ff"
                ctx.font = "bold 14px Arial"
                ctx.fillText(
                  `${detection.type} (${(detection.confidence * 100).toFixed(0)}%)`,
                  detection.center.x,
                  detection.center.y - 10,
                )
              })
            }
          }
        }
        img.onerror = () => {
          console.error("Failed to load frame image")
        }
        img.src = frameDataUrl
      } catch (err) {
        console.error("Animation frame error:", err)
      }
    }, 33) // ~30 FPS

    return () => clearInterval(animationId)
  }, [detections, isCanvasReady])

  return (
    <div className="w-full bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          className="w-full h-auto bg-slate-950"
          style={{ display: "block" }}
        />

        {/* Overlay Stats */}
        <div className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-sm p-4 rounded-lg border border-slate-700">
          <div className="text-sm text-slate-300 space-y-2">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isStreaming ? "bg-green-500" : "bg-red-500"}`} />
              <span>{isStreaming ? "LIVE" : "OFFLINE"}</span>
            </div>
            <div>FPS: {frameRate}</div>
            {detections && (
              <>
                <div>Vehicles: {detections.detections.length}</div>
                <div>Occupancy: {(detections.occupancyRate * 100).toFixed(1)}%</div>
              </>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="absolute bottom-4 left-4 bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 bg-slate-900 border-t border-slate-700 flex gap-2">
        <button
          onClick={startStream}
          disabled={isStreaming}
          className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Start Stream
        </button>
        <button
          onClick={stopStream}
          disabled={!isStreaming}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
        >
          Stop Stream
        </button>
      </div>
    </div>
  )
}
