/**
 * Realan test slanja mejla koristeci iste podatke kao sendInquiry.ts
 * - NE salje se nikome van tvog naloga
 * - prikazuje stvarni odgovor Resend-a
 */
import { readFileSync } from "node:fs"

const envPath = new URL("../.env.local", import.meta.url)
const env = {}
try {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const i = line.indexOf("=")
    if (i > 0) env[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
} catch {}

const KEY = process.env.RESEND_API_KEY || env.RESEND_API_KEY || ""
const FROM = process.env.ORDER_FROM_EMAIL || env.ORDER_FROM_EMAIL || "onboarding@resend.dev"
const TO = process.env.NEXT_PUBLIC_SHOP_EMAIL || env.NEXT_PUBLIC_SHOP_EMAIL || "pavlemaksimovic6@gmail.com"

console.log("RESEND_API_KEY: " + (KEY ? `postoji (${KEY.length} znakova)` : "NEDOSTAJE"))
console.log("from: " + FROM)
console.log("to:   " + TO)
console.log("---")

if (!KEY) {
  console.error("Nema kljuca - stao.")
  process.exit(1)
}

async function send(label, payload) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
  const text = await res.text()
  let body
  try { body = JSON.parse(text) } catch { body = text }
  console.log(`${label} -> HTTP ${res.status}`)
  if (res.ok) {
    console.log(`   id: ${body?.id || "?"}`)
    console.log(`   STATUS: USPESNO`)
  } else {
    console.log(`   STATUS: GRESKA`)
    console.log(`   odgovor: ${JSON.stringify(body)}`)
  }
  return res.ok
}

const okOwner = await send("MEJL VLASNIKU (kupac -> ti)", {
  from: `BG PET <${FROM}>`,
  to: [TO],
  subject: "[TEST] Novi upit — BG PET (test slanja)",
  html: `<p><strong>Ovo je automatski test slanja.</strong></p>
         <p>Ako vidite ovaj mejl, ceo tok funkcioniše: kljuc, slanje, prijem.</p>
         <p style="color:#64748b;font-size:13px;">Poslato ${new Date().toLocaleString("sr-RS")}</p>`
})

console.log("---")

// Drugi mejl: kupcu - na adresu koja NIJE tvoja
// Resend besplatan nalog ne dozvoljava slanje van racuna, pa ocekujemo GRESKU
const okCustomer = await send("MEJL KUPCU (potvrda na tudju adresu)", {
  from: `BG PET <${FROM}>`,
  to: ["test-kupac@example.com"],
  subject: "Potvrda upita — BG PET (test slanja)",
  html: `<p>Potvrda upita - test.</p>`
})

console.log("---")
console.log("ZAKLJUCAK:")
console.log(okOwner ? "  [OK] mejl vlasniku prolazi" : "  [FAIL] mejl vlasniku ne prolazi")
console.log(okCustomer
  ? "  [OK] mejl kupcu prolazi (domen verifikovan)"
  : "  [OCEKIVANO] mejl kupcu NE prolazi - nema verifikovan domen")