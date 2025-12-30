import { detectVehiclesInFrame } from "@/lib/gemini-client"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { frameData } = await request.json()

    if (!frameData) {
      return NextResponse.json({ error: "No frame data provided" }, { status: 400 })
    }

    const detections = await detectVehiclesInFrame(frameData)

    return NextResponse.json(detections)
  } catch (error) {
    console.error("Frame analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze frame" }, { status: 500 })
  }
}
