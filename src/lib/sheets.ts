import { google } from "googleapis"
import path from "path"
import { readFileSync, existsSync } from "fs"

function getCredentials() {
  const filePath = path.join(process.cwd(), "wpa-credentials.json")
  if (existsSync(filePath)) {
    return JSON.parse(readFileSync(filePath, "utf-8"))
  }
  const b64 = process.env.GOOGLE_CREDENTIALS_B64
  if (b64) {
    return JSON.parse(Buffer.from(b64, "base64").toString("utf-8"))
  }
  const raw = process.env.GOOGLE_CREDENTIALS
  if (raw) {
    return JSON.parse(raw)
  }
  throw new Error("No Google credentials found. Set GOOGLE_CREDENTIALS_B64 or GOOGLE_CREDENTIALS env var, or place wpa-credentials.json in project root.")
}

function getAuth() {
  const credentials = getCredentials()
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })
}

function getSheetId(): string {
  const id = process.env.GOOGLE_SHEET_ID?.trim()
  if (!id) throw new Error("GOOGLE_SHEET_ID environment variable is not set")
  return id
}

export async function getSheetData(range: string): Promise<string[][]> {
  const auth = getAuth()
  const sheets = google.sheets({ version: "v4", auth })
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: getSheetId(),
    range,
  })
  return res.data.values ?? []
}

export async function appendSheetData(range: string, values: (string | number)[][]): Promise<void> {
  const auth = getAuth()
  const sheets = google.sheets({ version: "v4", auth })
  await sheets.spreadsheets.values.append({
    spreadsheetId: getSheetId(),
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values },
  })
}
