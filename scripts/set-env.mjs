/**
 * Bezbedno postavljanje kljuceva - kljuc se nikad ne prikazuje.
 *
 *   node scripts/set-env.mjs RESEND_API_KEY
 *
 * Pokreni bez argumenata da vidi listu kljuceva.
 * Skripta sama sklanja navodnike ako ih shutilis (cmd echo ih ne sklanja).
 */
import { readFileSync, writeFileSync, existsSync, copyFileSync } from "node:fs"
import { join } from "node:path"
import { createInterface } from "node:readline/promises"

const KNOWN = [
  "RESEND_API_KEY",
  "ORDER_FROM_EMAIL",
  "NEXT_PUBLIC_SHOP_EMAIL",
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_GA_ID",
  "NEXT_PUBLIC_META_PIXEL_ID",
  "GOOGLE_SHEET_ID",
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
  "GOOGLE_SHEET_TAB"
]

const name = process.argv[2]

if (!name) {
  console.error("Upotreba: node scripts/set-env.mjs <IME_KLJUC>")
  console.error("")
  console.error("Poznati kljucevi:")
  for (const k of KNOWN) console.error("  " + k)
  process.exit(1)
}

if (!/^[A-Z0-9_]+$/.test(name)) {
  console.error("Ime kljuca smere da bude A-Z, 0-9 i _")
  process.exit(1)
}

const path = join(process.cwd(), ".env.local")

if (!existsSync(path)) {
  console.error("Nema .env.local - kopiraj .env.example i popuni")
  process.exit(1)
}

// backup pre izmene da se moze vratiti
const backup = path + ".bak"
copyFileSync(path, backup)

function readHidden(prompt) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout })
    process.stdout.write(prompt)
    if (!process.stdin.isTTY) {
      // ulaz sa stdin-a (pipe/redirect) - nema terminala, nema echa
      let buf = ""
      process.stdin.setEncoding("utf8")
      process.stdin.on("data", (d) => (buf += d))
      process.stdin.on("end", () => {
        rl.close()
        resolve(buf)
      })
      return
    }
    process.stdin.setRawMode(true)
    process.stdin.setEncoding("utf8")
    let buf = ""
    process.stdin.on("data", (d) => {
      for (const ch of d) {
        if (ch === "\r" || ch === "\n" || ch === "") {
          process.stdin.setRawMode(false)
          process.stdout.write("\n")
          rl.close()
          resolve(buf)
          return
        }
        if (ch === "") process.exit(130)
        buf += ch
      }
    })
  })
}

const raw = await readHidden(`Unesi vrednost za ${name}: `)

// cmd echo NE sklanja navodnike - ovde cistimo
let value = raw.trim().replace(/^["']|["']$/g, "").trim()

if (!value) {
  console.error("Prazna vrednost - nista nije promenjeno.")
  process.exit(1)
}

const lines = readFileSync(path, "utf8").split(/\r?\n/)
let replaced = false
const next = []

for (const l of lines) {
  if (l.startsWith(name + "=")) {
    if (!replaced) {
      next.push(`${name}=${value}`)
      replaced = true
    }
    continue
  }
  if (l.trim() !== "") next.push(l)
}
if (!replaced) next.push(`${name}=${value}`)

// ASCII bez BOM - UTF8 u PowerShell-u doda BOM i pokvari prvu liniju
writeFileSync(path, next.join("\n"), "ascii")

console.log(`${name} postavljen (${value.length} znakova) - vrednost nije prikazana.`)

const check = readFileSync(path, "utf8")
const count = check.split(/\r?\n/).filter((l) => l.trim()).length
console.log(`Aktivnih kljuceva u .env.local: ${count}`)

const bad = check.split(/\r?\n/).some((l) => l.length > 0 && /["']/.test(l.split("=")[1] ?? ""))
if (bad) {
  console.error("UPOZORENJE: u fajlu je ostao navodnik u vrednosti.")
}

console.log(`Backup: ${backup}`)
console.log("Promena vazi posle restarta dev servera (Ctrl+C, npm run dev).")