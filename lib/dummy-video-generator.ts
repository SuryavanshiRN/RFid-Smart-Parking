export interface DummyFrame {
  data: Uint8ClampedArray
  width: number
  height: number
}

export class DummyVideoGenerator {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private frameCount = 0

  constructor(width = 1280, height = 720) {
    this.canvas = document.createElement("canvas")
    this.canvas.width = width
    this.canvas.height = height
    const ctx = this.canvas.getContext("2d")
    if (!ctx) throw new Error("Failed to get canvas context")
    this.ctx = ctx
  }

  generateFrame(): string {
    this.frameCount++

    // Draw parking lot background
    this.ctx.fillStyle = "#1a2332"
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Draw parking spaces
    const spaceWidth = 120
    const spaceHeight = 80
    const rows = 4
    const cols = 8
    const padding = 40

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = padding + col * (spaceWidth + 20)
        const y = padding + row * (spaceHeight + 20)

        // Randomly occupy spaces
        const isOccupied = Math.random() > 0.4

        if (isOccupied) {
          // Draw car
          this.ctx.fillStyle = "#ff6b6b"
          this.ctx.fillRect(x, y, spaceWidth, spaceHeight)
          this.ctx.strokeStyle = "#ff9999"
          this.ctx.lineWidth = 2
          this.ctx.strokeRect(x, y, spaceWidth, spaceHeight)

          // Draw car details
          this.ctx.fillStyle = "#333"
          this.ctx.fillRect(x + 10, y + 10, spaceWidth - 20, spaceHeight - 20)
        } else {
          // Draw empty space
          this.ctx.strokeStyle = "#00d9ff"
          this.ctx.lineWidth = 2
          this.ctx.strokeRect(x, y, spaceWidth, spaceHeight)
          this.ctx.fillStyle = "#00d9ff"
          this.ctx.font = "12px Arial"
          this.ctx.fillText("EMPTY", x + 30, y + 45)
        }
      }
    }

    // Draw some moving vehicles
    this.drawMovingVehicles()

    // Draw timestamp
    this.ctx.fillStyle = "#00d9ff"
    this.ctx.font = "bold 16px Arial"
    this.ctx.fillText(`Frame: ${this.frameCount}`, 20, 30)
    this.ctx.fillText(`Occupancy: ${Math.floor(Math.random() * 40 + 50)}%`, 20, 60)

    return this.canvas.toDataURL("image/jpeg", 0.8)
  }

  private drawMovingVehicles(): void {
    const vehicleCount = 3
    for (let i = 0; i < vehicleCount; i++) {
      const x = (this.frameCount * 2 + i * 100) % this.canvas.width
      const y = 100 + i * 150

      this.ctx.fillStyle = "#ffd93d"
      this.ctx.fillRect(x, y, 80, 50)
      this.ctx.strokeStyle = "#ffed4e"
      this.ctx.lineWidth = 2
      this.ctx.strokeRect(x, y, 80, 50)
    }
  }
}
