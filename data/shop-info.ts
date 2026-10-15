import { tenant } from "./tenants"
import type { ShopInfo } from "./tenants/types"

export type { OpeningHours, ShopInfo, Testimonial } from "./tenants/types"

/**
 * Kontakt/brend podaci AKTIVNOG tenanta (bira se preko NEXT_PUBLIC_TENANT).
 *
 * Env varijable (per Vercel projekat) imaju prioritet nad fallback
 * vrednostima iz data/tenants/<id>.ts — tako svaki deploy dobija
 * svoj domen, email i analitiku iz istog koda.
 *
 * Menjaj podatke klijenta u data/tenants/<id>.ts, ne ovde.
 */
export const shopInfo: ShopInfo = {
  ...tenant.shopInfo,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || tenant.shopInfo.siteUrl,
  orderEmail: process.env.NEXT_PUBLIC_SHOP_EMAIL || tenant.shopInfo.orderEmail,
  orderFrom: process.env.ORDER_FROM_EMAIL || tenant.shopInfo.orderFrom,
  gaId: process.env.NEXT_PUBLIC_GA_ID || tenant.shopInfo.gaId,
  metaPixelId:
    process.env.NEXT_PUBLIC_META_PIXEL_ID || tenant.shopInfo.metaPixelId,
}

/** Brend boje aktivnog tenanta — koristi se i u email šablonima (app/actions/*) */
export const brandColors = tenant.colors

export const analyticsEnabled = () =>
  Boolean(shopInfo.gaId || shopInfo.metaPixelId)

export const fullAddress = `${shopInfo.street}, ${shopInfo.zip} ${shopInfo.city}`

export const mapEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  fullAddress
)}&output=embed`

/** Za prikaz na sajtu — izvedeno iz openingHours da se ne raziđe */
export const hoursDisplay = shopInfo.openingHours.map((h) => ({
  days: h.label,
  time: h.closed
    ? "Zatvoreno"
    : `${h.opens!.slice(0, 2)}-${h.closes!.slice(0, 2)}h`
}))