import { NextResponse } from "next/server"
import { getSheetData } from "@/lib/sheets"

export const revalidate = 60

export async function GET() {
  try {
    const rows = await getSheetData("positions!A2:F100")
    const positions = rows.map(([id, title, category, description, type, location]) => ({
      id,
      title,
      category,
      description: description ?? "",
      type: type ?? "",
      location: location ?? "",
    }))
    return NextResponse.json({ positions })
  } catch (error) {
    console.error("Failed to fetch positions:", error)
    return NextResponse.json({ error: "Failed to fetch positions" }, { status: 500 })
  }
}
