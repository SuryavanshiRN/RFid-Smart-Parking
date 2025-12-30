import { detectVehiclesInFrame } from "@/lib/gemini-client"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { frameData } = await request.json()

    if (!frameData) {
      return NextResponse.json({ error: "No frame data provided" }, { status: 400 })
    }

    let base64Data = frameData
    if (frameData.startsWith("data:image")) {
      base64Data = frameData.split(",")[1]
    }

    const result = await detectVehiclesInFrame(base64Data)

    return NextResponse.json({
      detections: (result.detections || []).map((det: any) => ({
        type: det.type || "car",
        confidence: det.confidence || 0.8,
        bbox: det.bbox || [0, 0, 100, 100],
        polygon: det.polygon || [],
      })),
      timestamp: result.timestamp || Date.now(),
      success: true,
    })
  } catch (error) {
    console.error("[v0] Vehicle detection error:", error)
    return NextResponse.json(
      {
        error: "Failed to detect vehicles",
        detections: [],
        success: false,
      },
      { status: 500 },
    )
  }
}
