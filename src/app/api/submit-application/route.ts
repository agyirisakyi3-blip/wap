import { NextResponse } from "next/server"
import { appendSheetData } from "@/lib/sheets"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { positionId, fullName, email, phone, institution, country, message, photoUrl } = body

    if (!positionId || !fullName || !email) {
      return NextResponse.json({ error: "positionId, fullName, and email are required" }, { status: 400 })
    }

    const timestamp = new Date().toISOString()
    await appendSheetData("submissions!A:I", [[
      timestamp,
      positionId,
      fullName,
      email,
      phone ?? "",
      institution ?? "",
      country ?? "",
      message ?? "",
      photoUrl ?? "",
    ]])

    return NextResponse.json({ success: true, timestamp })
  } catch (error) {
    console.error("Failed to submit application:", error)
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
  }
}
