import type { TenantConfig } from "./types"
import { bgPet } from "./bg-pet"
import { primerTenant } from "./primer"
import { mazaNera } from "./maza-nera"

/**
 * Registr svih tenanata (klijenata).
 *
 * NOVI KLJENT = novi fajl u data/tenants/ + JEDAN red ovde.
 *
 *   import { petShopJovanovic } from "./pet-shop-jovanovic"
 *   ...
 *   const registry = {
 *     "bg-pet": bgPet,
 *     "pet-shop-jovanovic": petShopJovanovic,
 *   }
 */
const registry: Record<string, TenantConfig> = {
  "bg-pet": bgPet,
  primer: primerTenant,
  "maza-nera": mazaNera,
}

/**
 * Aktivan tenant se bira env varijablom NEXT_PUBLIC_TENANT
 * (per Vercel projekat — svaki deploy drugačiji).
 * Bez env varijable = "bg-pet" (postojeći demo sajt radi kao pre).
 */
const tenantId = process.env.NEXT_PUBLIC_TENANT || "bg-pet"

export function getTenant(): TenantConfig {
  const found = registry[tenantId]
  if (!found) {
    throw new Error(
      `Nepoznat NEXT_PUBLIC_TENANT "${tenantId}". ` +
        `Poznati tenanti: ${Object.keys(registry).join(", ")} ` +
        `— dodaj fajl u data/tenants/ i registruj ga u index.ts.`
    )
  }
  return found
}

/**
 * Aktivan tenant — resava se jednom na učitavanju modula,
 * pa nepoznat id pada VEĆ NA BUILD-U (fail-fast), ne u produkciji.
 */
export const tenant = getTenant()

/** Svi registrovani id-jevi (za dokumentaciju/skripte) */
export const tenantIds = Object.keys(registry)