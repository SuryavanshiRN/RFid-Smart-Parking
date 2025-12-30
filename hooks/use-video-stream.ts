"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { DummyVideoGenerator } from "@/lib/dummy-video-generator"
import { VideoProcessor, type FrameAnalysis } from "@/lib/video-processor"

export function useVideoStream(enabled = true) {
  const [isStreaming, setIsStreaming] = useState(false)
  const [frameRate, setFrameRate] = useState(0)
  const [detections, setDetections] = useState<FrameAnalysis | null>(null)
  const [error, setError] = useState<string | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const processorRef = useRef<VideoProcessor | null>(null)
  const generatorRef = useRef<DummyVideoGenerator | null>(null)
  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(Date.now())
  const animationIdRef = useRef<number | null>(null)
  const isStreamingRef = useRef(false)

  useEffect(() => {
    if (!enabled) {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
        animationIdRef.current = null
      }
      isStreamingRef.current = false
      setIsStreaming(false)
      return
    }

    if (isStreamingRef.current) return

    try {
      setError(null)
      isStreamingRef.current = true
      setIsStreaming(true)

      // Initialize processor and generator
      if (!processorRef.current) {
        processorRef.current = new VideoProcessor(1280, 720)
      }
      if (!generatorRef.current) {
        generatorRef.current = new DummyVideoGenerator(1280, 720)
      }

      const processFrame = () => {
        try {
          // Generate dummy frame
          generatorRef.current!.generateFrame()

          // For now, use mock detections since we're using dummy footage
          const mockDetections: FrameAnalysis = {
            frameId: `frame-${frameCountRef.current}`,
            timestamp: Date.now(),
            detections: generateMockDetections(),
            parkingSpaces: generateMockParkingSpaces(),
            occupancyRate: Math.random() * 0.6 + 0.3,
            availableSpaces: Math.floor(Math.random() * 15 + 5),
            totalSpaces: 32,
          }

          setDetections(mockDetections)

          // Update frame rate
          frameCountRef.current++
          const now = Date.now()
          if (now - lastTimeRef.current >= 1000) {
            setFrameRate(frameCountRef.current)
            frameCountRef.current = 0
            lastTimeRef.current = now
          }

          if (isStreamingRef.current) {
            animationIdRef.current = requestAnimationFrame(processFrame)
          }
        } catch (err) {
          console.error("Frame processing error:", err)
          setError("Failed to process frame")
        }
      }

      animationIdRef.current = requestAnimationFrame(processFrame)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start stream")
      isStreamingRef.current = false
      setIsStreaming(false)
    }

    return () => {
      isStreamingRef.current = false
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
        animationIdRef.current = null
      }
    }
  }, [enabled])

  const startStream = useCallback(() => {
    // No-op since streaming is controlled by the enabled prop
  }, [])

  const stopStream = useCallback(() => {
    isStreamingRef.current = false
    setIsStreaming(false)
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current)
      animationIdRef.current = null
    }
  }, [])

  return {
    isStreaming,
    frameRate,
    detections,
    error,
    startStream,
    stopStream,
    videoRef,
    canvasRef,
  }
}

function generateMockDetections() {
  const detections = []
  const vehicleTypes = ["car", "truck", "motorcycle", "bus"] as const

  for (let i = 0; i < Math.floor(Math.random() * 5 + 3); i++) {
    const type = vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]
    const x = Math.random() * 1000 + 100
    const y = Math.random() * 500 + 100
    const width = type === "truck" ? 150 : type === "bus" ? 200 : 100
    const height = type === "truck" ? 100 : type === "bus" ? 80 : 70

    detections.push({
      id: `vehicle-${i}`,
      type,
      confidence: Math.random() * 0.3 + 0.7,
      polygon: [
        [x, y],
        [x + width, y],
        [x + width, y + height],
        [x, y + height],
      ],
      center: { x: x + width / 2, y: y + height / 2 },
      timestamp: Date.now(),
    })
  }

  return detections
}

function generateMockParkingSpaces() {
  const spaces = []
  const spaceWidth = 120
  const spaceHeight = 80
  const rows = 4
  const cols = 8
  const padding = 40

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      spaces.push({
        id: `space-${row}-${col}`,
        x: padding + col * (spaceWidth + 20),
        y: padding + row * (spaceHeight + 20),
        width: spaceWidth,
        height: spaceHeight,
        occupied: Math.random() > 0.4,
      })
    }
  }

  return spaces
}
