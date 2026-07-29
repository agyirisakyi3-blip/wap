import { google } from "googleapis"
import path from "path"

function getAuth() {
  const keyFile = path.join(process.cwd(), "wpa-credentials.json")
  return new google.auth.GoogleAuth({
    keyFile,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })
}

function getSheetId(): string {
  const id = process.env.GOOGLE_SHEET_ID
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

export async function updateSheetData(range: string, values: (string | number)[][]): Promise<void> {
  const auth = getAuth()
  const sheets = google.sheets({ version: "v4", auth })
  await sheets.spreadsheets.values.update({
    spreadsheetId: getSheetId(),
    range,
    valueInputOption: "RAW",
    requestBody: { values },
  })
}
