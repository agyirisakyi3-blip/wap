import { NextResponse } from "next/server"
import { getSheetData } from "@/lib/sheets"

export const revalidate = 60

export async function GET() {
  try {
    const rows = await getSheetData("categories!A2:D100")
    const categories = rows.map(([id, name, description, icon]) => ({
      id,
      name,
      description: description ?? "",
      icon: icon ?? "FileText",
    }))
    return NextResponse.json({ categories })
  } catch (error) {
    console.error("Failed to fetch categories:", error)
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
}
