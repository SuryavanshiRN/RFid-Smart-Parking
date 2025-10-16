import { analyzeImageWithGemini } from "@/lib/gemini-client"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { imageData } = await request.json()

    if (!imageData) {
      return NextResponse.json({ error: "No image data provided" }, { status: 400 })
    }

    const analysis = await analyzeImageWithGemini(imageData)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Parking analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze parking" }, { status: 500 })
  }
}
