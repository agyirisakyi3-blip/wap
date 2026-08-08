import { google } from "googleapis"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const credPath = join(__dirname, "..", "wpa-credentials.json")
const sheetId = process.env.GOOGLE_SHEET_ID

if (!sheetId) {
  console.error("GOOGLE_SHEET_ID environment variable is required")
  process.exit(1)
}

const auth = new google.auth.GoogleAuth({
  keyFile: credPath,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
})

const sheets = google.sheets({ version: "v4", auth })

const categories = [
  ["id", "name", "description", "icon"],
  ["mt", "Management Team", "Oversee association operations, strategic planning, and governance", "Users"],
  ["ex", "Executive Positions", "Leadership and advocacy roles representing WPA globally", "Shield"],
  ["ac", "Academic / Research", "Research, publications, curriculum development, and academic standards", "BookOpen"],
  ["re", "Regional / International", "Regional coordination, international partnerships, and cultural exchange", "Globe"],
  ["st", "Specialized / Technical", "Technical and digital roles including IT, media, and special projects", "Settings"],
]

const positions = [
  ["id", "title", "category", "description", "type", "location"],
  ["pres", "President", "ex", "Chief Executive Officer of WPA - provides strategic leadership and represents the association globally", "Executive", "Global"],
  ["vp", "Vice President", "ex", "Deputy to the President - assists in leadership and steps in as needed", "Executive", "Global"],
  ["sg", "Secretary General", "mt", "Oversees administrative operations, records, and organizational communication", "Management", "Global"],
  ["dsg", "Deputy Secretary General", "mt", "Supports the Secretary General in administrative and coordination duties", "Management", "Global"],
  ["treasurer", "Treasurer", "mt", "Manages finances, budgeting, and financial reporting", "Management", "Global"],
  ["legal", "Legal Advisor", "st", "Provides legal guidance on policies, compliance, and governance matters", "Specialized", "Global"],
  ["dir-comms", "Director of Communications", "mt", "Oversees PR, media relations, newsletters, and institutional communications", "Management", "Global"],
  ["dir-digital", "Director of Digital Strategy", "st", "Manages digital presence - website, social media, and online engagement", "Specialized", "Global"],
  ["dir-research", "Director of Research", "ac", "Leads research initiatives, journals, and academic publications", "Academic", "Global"],
  ["dir-programs", "Director of Academic Programs", "ac", "Oversees curriculum development, fellowships, and academic exchanges", "Academic", "Global"],
  ["edit-chief", "Editor-in-Chief", "ac", "Leads the editorial board for WPA journals and academic publications", "Academic", "Global"],
  ["reg-africa", "Regional Director - Africa", "re", "Coordinates WPA activities and membership across Africa", "Regional", "Africa"],
  ["reg-asia", "Regional Director - Asia", "re", "Coordinates WPA activities and membership across Asia", "Regional", "Asia"],
  ["reg-europe", "Regional Director - Europe", "re", "Coordinates WPA activities and membership across Europe", "Regional", "Europe"],
  ["reg-americas", "Regional Director - Americas", "re", "Coordinates WPA activities and membership across the Americas", "Regional", "Americas"],
  ["reg-mena", "Regional Director - MENA", "re", "Coordinates WPA activities and membership across the Middle East and North Africa", "Regional", "MENA"],
  ["dir-membership", "Director of Membership", "mt", "Manages member recruitment, retention, and engagement strategies", "Management", "Global"],
  ["dir-events", "Director of Events", "mt", "Plans and coordinates conferences, workshops, and WPA events", "Management", "Global"],
  ["dir-grants", "Director of Grants & Partnerships", "st", "Manages grant programs, sponsorships, and institutional partnerships", "Specialized", "Global"],
  ["dir-youth", "Director of Youth & Innovation", "st", "Leads initiatives for emerging scholars and innovative academic programs", "Specialized", "Global"],
  ["ombud", "Ombudsperson", "st", "Ensures ethical compliance, mediates disputes, and upholds WPA values", "Specialized", "Global"],
]

const submissionsHeaders = [["timestamp", "positionId", "fullName", "email", "phone", "institution", "country", "message", "photoUrl"]]

async function populate() {
  // Check if sheet has the tabs
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId: sheetId })
  const existingTabs = spreadsheet.data.sheets?.map((s) => s.properties?.title) ?? []

  console.log("Existing tabs:", existingTabs)

  const tabsToCreate = ["categories", "positions", "submissions"].filter((t) => !existingTabs.includes(t))

  for (const tab of tabsToCreate) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: sheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: tab } } }],
      },
    })
    console.log(`Created tab: ${tab}`)
  }

  // Populate categories
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: "categories!A1:D100",
    valueInputOption: "RAW",
    requestBody: { values: categories },
  })
  console.log(`Populated categories (${categories.length - 1} rows)`)

  // Populate positions
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: "positions!A1:F100",
    valueInputOption: "RAW",
    requestBody: { values: positions },
  })
  console.log(`Populated positions (${positions.length - 1} rows)`)

  // Populate submissions header
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: "submissions!A1:I1",
    valueInputOption: "RAW",
    requestBody: { values: submissionsHeaders },
  })
  console.log("Populated submissions header")

  console.log("\nDone! Sheet is ready.")
}

populate().catch(console.error)
