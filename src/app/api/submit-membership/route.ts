import { NextResponse } from "next/server"
import { appendSheetData } from "@/lib/sheets"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      fullName, gender, dateOfBirth, email, phone, contactMethod, country, nationalChapter, address,
      highestQualification, yearGraduated, faculty, yearsExperience, specialization, orcid,
      membershipCategory, fee, paymentDate, paymentMethod,
      declaration, signature, privacyConsent, howHeard,
      referee1Name, referee1Position, referee1Phone, referee1Email, referee1Institution,
      referee2Name, referee2Phone, referee2Email,
      degreeCertificate,
    } = body

    if (!fullName || !email) {
      return NextResponse.json({ error: "fullName and email are required" }, { status: 400 })
    }

    const timestamp = new Date().toISOString()
    await appendSheetData("membership_submissions!A1", [[
      timestamp,
      fullName ?? "",
      gender ?? "",
      dateOfBirth ?? "",
      email ?? "",
      phone ?? "",
      contactMethod ?? "",
      country ?? "",
      nationalChapter ?? "",
      address ?? "",
      highestQualification ?? "",
      yearGraduated ?? "",
      faculty ?? "",
      yearsExperience ?? "",
      specialization ?? "",
      orcid ?? "",
      membershipCategory ?? "",
      fee ?? "",
      paymentDate ?? "",
      paymentMethod ?? "",
      declaration ?? "",
      signature ?? "",
      privacyConsent ?? "",
      howHeard ?? "",
      referee1Name ?? "",
      referee1Position ?? "",
      referee1Phone ?? "",
      referee1Email ?? "",
      referee1Institution ?? "",
      referee2Name ?? "",
      referee2Phone ?? "",
      referee2Email ?? "",
      degreeCertificate ?? "",
    ]])

    return NextResponse.json({ success: true, timestamp })
  } catch (error) {
    console.error("Failed to submit membership application:", error)
    return NextResponse.json({ error: "Failed to submit membership application" }, { status: 500 })
  }
}
