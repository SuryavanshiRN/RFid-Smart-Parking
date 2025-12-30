import { GoogleGenerativeAI } from "@google/generative-ai"

let genAI: GoogleGenerativeAI | null = null

export function getGeminiClient() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set")
    }
    genAI = new GoogleGenerativeAI(apiKey)
  }
  return genAI
}

export async function analyzeImageWithGemini(imageData: string | Uint8Array) {
  const client = getGeminiClient()
  const model = client.getGenerativeModel({ model: "gemini-2.0-flash" })

  const result = await model.generateContent([
    {
      inlineData: {
        data: typeof imageData === "string" ? imageData : Buffer.from(imageData).toString("base64"),
        mimeType: "image/jpeg",
      },
    },
    {
      text: `Analyze this parking lot image and detect:
1. All vehicles (cars, motorcycles, trucks) with their positions
2. Empty parking spaces
3. Occupied parking spaces
4. Any obstacles or issues

Return a JSON object with:
{
  "vehicles": [{"x": number, "y": number, "width": number, "height": number, "confidence": number, "type": "car|truck|motorcycle"}],
  "parkingSpaces": [{"x": number, "y": number, "width": number, "height": number, "occupied": boolean}],
  "occupancyRate": number,
  "issues": string[]
}`,
    },
  ])

  const responseText = result.response.text()
  const jsonMatch = responseText.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error("Failed to parse Gemini response")
  }

  return JSON.parse(jsonMatch[0])
}

export async function detectVehiclesInFrame(frameData: string) {
  const client = getGeminiClient()
  const model = client.getGenerativeModel({ model: "gemini-2.0-flash" })

  const result = await model.generateContent([
    {
      inlineData: {
        data: frameData,
        mimeType: "image/jpeg",
      },
    },
    {
      text: `Analyze this parking lot frame and detect all vehicles and parking spaces.
For each vehicle, provide:
- Type: car, truck, motorcycle, or bus
- Confidence: 0-1 confidence score
- Bounding box: [x1, y1, x2, y2] in pixel coordinates
- Polygon: array of [x, y] points outlining the vehicle

Return ONLY valid JSON (no markdown, no code blocks):
{
  "detections": [
    {
      "type": "car",
      "confidence": 0.95,
      "bbox": [100, 150, 250, 300],
      "polygon": [[100, 150], [250, 150], [250, 300], [100, 300]]
    }
  ],
  "parkingSpaces": [
    {
      "occupied": true,
      "confidence": 0.9,
      "bbox": [50, 100, 150, 200]
    }
  ],
  "occupancyRate": 0.75,
  "timestamp": ${Date.now()}
}`,
    },
  ])

  const responseText = result.response.text()

  const jsonMatch = responseText.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    console.error("[v0] No JSON found in response:", responseText)
    // Return empty detections if parsing fails
    return {
      detections: [],
      parkingSpaces: [],
      occupancyRate: 0,
      timestamp: Date.now(),
    }
  }

  try {
    return JSON.parse(jsonMatch[0])
  } catch (e) {
    console.error("[v0] Failed to parse JSON:", e)
    return {
      detections: [],
      parkingSpaces: [],
      occupancyRate: 0,
      timestamp: Date.now(),
    }
  }
}
