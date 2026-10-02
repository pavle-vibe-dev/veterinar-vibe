import "server-only"

import { google } from "googleapis"
import { formatDin, sumLines, type ShopInquiry, type ShopOrder } from "./orders-types"

const SHEET_TAB = process.env.GOOGLE_SHEET_TAB || "Narudzbe"

export const sheetConfigured = () =>
  Boolean(
    process.env.GOOGLE_SHEET_ID &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY
  )

const getSheets = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
  })

  return google.sheets({ version: "v4", auth })
}

const HEADERS = [
  "Broj narudžbe",
  "Datum",
  "Tip",
  "Status",
  "Kupac",
  "Telefon",
  "Email",
  "Adresa",
  "Dostava",
  "Plaćanje",
  "Proizvodi",
  "Međuzbir",
  "Dostava cena",
  "Ukupno",
  "Apotekarski artikli",
  "Napomena"
]

const stamp = (d: Date) => {
  const p = (n: number) => String(n).padStart(2, "0")
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`
}

export const ensureTab = async () => {
  const sheets = await getSheets()
  const spreadsheetId = process.env.GOOGLE_SHEET_ID!

  const meta = await sheets.spreadsheets.get({ spreadsheetId })
  const exists = meta.data.sheets?.some((s) => s.properties?.title === SHEET_TAB)

  if (exists) return

  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [{ addSheet: { properties: { title: SHEET_TAB } } }]
    }
  })

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_TAB}!A1`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [HEADERS] }
  })
}

export const recordOrder = async (order: ShopOrder) => {
  if (!sheetConfigured()) return { recorded: false as const }

  try {
    const sheets = await getSheets()

    const itemLines = order.items
      .map((i) => `${i.qty} x ${i.name} (${i.unit}) — ${formatDin(i.price * i.qty)}`)
      .join("\n")

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: `${SHEET_TAB}!A1`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          [
            order.orderNumber,
            stamp(new Date()),
            "PORUDŽBINA",
            "Novi",
            order.customerName,
            order.phone,
            order.email || "",
            `${order.address}, ${order.zip} ${order.city}`.trim(),
            order.deliveryName,
            order.paymentName,
            itemLines,
            order.subtotal,
            order.deliveryPrice,
            order.total,
            order.hasApotekaItems ? "DA — kontakt i provera apotekara" : "Ne",
            order.note || ""
          ]
        ]
      }
    })

    return { recorded: true as const }
  } catch (error) {
    console.error("recordOrder error:", error)
    return { recorded: false as const }
  }
}

export const recordInquiry = async (inquiry: ShopInquiry) => {
  if (!sheetConfigured()) return { recorded: false as const }

  try {
    const sheets = await getSheets()

    const itemLines = inquiry.items
      .map((i) => `${i.qty} x ${i.name} (${i.unit}) — ${formatDin(i.price * i.qty)}`)
      .join("\n")

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: `${SHEET_TAB}!A1`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [
          [
            inquiry.email ? `UP-${Date.now().toString().slice(-6)}` : "",
            stamp(new Date()),
            "UPIT",
            "Novi",
            inquiry.customerName,
            inquiry.phone,
            inquiry.email || "",
            "",
            "",
            "",
            itemLines,
            inquiry.items.length ? sumLines(inquiry.items) : "",
            "",
            inquiry.items.length ? sumLines(inquiry.items) : "",
            "",
            inquiry.note || ""
          ]
        ]
      }
    })

    return { recorded: true as const }
  } catch (error) {
    console.error("recordInquiry error:", error)
    return { recorded: false as const }
  }
}