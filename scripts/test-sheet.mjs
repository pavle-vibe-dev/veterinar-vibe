/**
 * Proverava da li Google Sheet evidencija radi.
 *
 * Pokretanje:
 *   node scripts/test-sheet.mjs
 *
 * cita .env.local, pravi probnu narudzbu i prikazuje sta se desilo.
 * Bez popunjenih GOOGLE_* promenljivih ispisuje upustvo i izlazi.
 */
import { readFileSync, existsSync } from "node:fs"
import { join } from "node:path"
import { google } from "googleapis"

const root = process.cwd()
const envPath = join(root, ".env.local")

if (!existsSync(envPath)) {
  console.error("Nema .env.local — kopiraj .env.example i popuni ga.")
  process.exit(1)
}

const env = {}
for (const line of readFileSync(envPath, "utf8").split("\n")) {
  const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
  if (!m) continue
  env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "").replace(/\\n/g, "\n")
}

const { GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } = env

const missing = Object.entries({
  GOOGLE_SHEET_ID,
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY
})
  .filter(([, v]) => !v)
  .map(([k]) => k)

if (missing.length) {
  console.error("Nisu popunjene: " + missing.join(", "))
  console.error("Narudzbe i dalje rade preko emaila, samo se ne belezu u tabelu.")
  process.exit(1)
}

const TAB = env.GOOGLE_SHEET_TAB || "Narudzbe"
const t = (n) => String(n).padStart(2, "0")
const d = new Date()

const auth = new google.auth.GoogleAuth({
  credentials: { client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL, private_key: GOOGLE_PRIVATE_KEY },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
})
const sheets = google.sheets({ version: "v4", auth })

const testOrder = {
  orderNumber: "TEST-" + d.getTime().toString().slice(-6),
  customerName: "TEST klijent (obrisati ovaj red)",
  phone: "000000000",
  email: "",
  address: "Test adresa 1",
  city: "Beograd",
  zip: "11000",
  deliveryName: "Preuzimanje u radnji",
  deliveryPrice: 0,
  paymentName: "Plaćanje pri preuzimanju",
  items: [{ name: "Probni proizvod", unit: "1 kom", qty: 2, price: 1000 }],
  subtotal: 2000,
  total: 2000,
  hasApotekaItems: false,
  note: "Automatski generisano iz scripts/test-sheet.mjs"
}

try {
  // 1. Da li Sheet postoji i da li service account ima pristup
  const meta = await sheets.spreadsheets.get({ spreadsheetId: GOOGLE_SHEET_ID })
  const titles = meta.data.sheets?.map((s) => s.properties?.title) ?? []
  console.log("Sheet dostupan. Tabovi:", titles.join(", "))

  if (!titles.includes(TAB)) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: GOOGLE_SHEET_ID,
      requestBody: { requests: [{ addSheet: { properties: { title: TAB } } }] }
    })
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${TAB}!A1`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [["Broj", "Datum", "Tip", "Status", "Kupac", "Telefon", "Email", "Adresa", "Dostava", "Plaćanje", "Proizvodi", "Međuzbir", "Dostava cena", "Ukupno", "Apotekarski artikli", "Napomena"]]
      }
    })
    console.log(`Tab "${TAB}" je napravljen sa zaglavljem.`)
  }

  // 2. Upis probe
  await sheets.spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: `${TAB}!A1`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[
        testOrder.orderNumber,
        `${t(d.getDate())}.${t(d.getMonth() + 1)}.${d.getFullYear()} ${t(d.getHours())}:${t(d.getMinutes())}`,
        "TEST",
        "Novi",
        testOrder.customerName,
        testOrder.phone,
        "",
        `${testOrder.address}, ${testOrder.zip} ${testOrder.city}`,
        testOrder.deliveryName,
        testOrder.paymentName,
        "2 x Probni proizvod (1 kom) — 2.000 RSD",
        testOrder.subtotal,
        testOrder.deliveryPrice,
        testOrder.total,
        "Ne",
        testOrder.note
      ]]
    }
  })
  console.log("Upis PROSLEO — red je dodat u tabu", TAB)
  console.log("Obrisi red '" + testOrder.orderNumber + "' iz tabele.")
} catch (e) {
  console.error("Upis NIJE PROSLEO:", e?.message ?? e)
  console.error("")
  console.error("Najčešći uzrok: Sheet nije deljen sa service account email-om.")
  console.error("Otvori Sheet → Desni klik → Dijeli → dodaj:", GOOGLE_SERVICE_ACCOUNT_EMAIL)
  process.exit(1)
}