export interface DetectionResult {
  id: string
  type: "car" | "truck" | "motorcycle" | "bus"
  confidence: number
  polygon: Array<[number, number]>
  center: { x: number; y: number }
  timestamp: number
}

export interface ParkingSpace {
  id: string
  x: number
  y: number
  width: number
  height: number
  occupied: boolean
  occupiedBy?: string
}

export interface FrameAnalysis {
  frameId: string
  timestamp: number
  detections: DetectionResult[]
  parkingSpaces: ParkingSpace[]
  occupancyRate: number
  availableSpaces: number
  totalSpaces: number
}

export class VideoProcessor {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private frameBuffer: ImageData[] = []
  private maxBufferSize = 30

  constructor(width = 1280, height = 720) {
    this.canvas = document.createElement("canvas")
    this.canvas.width = width
    this.canvas.height = height
    const ctx = this.canvas.getContext("2d")
    if (!ctx) throw new Error("Failed to get canvas context")
    this.ctx = ctx
  }

  drawFrame(imageData: ImageData): string {
    this.ctx.putImageData(imageData, 0, 0)
    return this.canvas.toDataURL("image/jpeg", 0.8)
  }

  drawDetections(detections: DetectionResult[], width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Failed to get canvas context")

    ctx.fillStyle = "rgba(15, 20, 25, 0.8)"
    ctx.fillRect(0, 0, width, height)

    detections.forEach((detection) => {
      // Draw polygon
      ctx.strokeStyle = this.getColorByType(detection.type)
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
      ctx.fillStyle = this.getColorByType(detection.type)
      ctx.font = "bold 14px Arial"
      ctx.fillText(
        `${detection.type} (${(detection.confidence * 100).toFixed(0)}%)`,
        detection.center.x,
        detection.center.y - 10,
      )
    })

    return canvas
  }

  private getColorByType(type: string): string {
    const colors: Record<string, string> = {
      car: "#00d9ff",
      truck: "#ff6b6b",
      motorcycle: "#ffd93d",
      bus: "#6bcf7f",
    }
    return colors[type] || "#00d9ff"
  }

  addToBuffer(imageData: ImageData): void {
    this.frameBuffer.push(imageData)
    if (this.frameBuffer.length > this.maxBufferSize) {
      this.frameBuffer.shift()
    }
  }

  getBufferSize(): number {
    return this.frameBuffer.length
  }
}
