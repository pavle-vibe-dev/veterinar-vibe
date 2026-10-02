export type OpeningHours = {
  /** Schema.org format, npr. "Mo-Fr", "Sa" */
  days: string
  /** Za prikaz na sajtu, npr. "Pon-Pet" */
  label: string
  opens?: string
  closes?: string
  closed?: boolean
}

export type ShopInfo = {
  name: string
  tagline: string
  legalName: string
  description: string
  phone: string
  phoneHref: string
  email: string
  street: string
  zip: string
  city: string
  district: string
  siteUrl: string
  openingHours: OpeningHours[]
  orderEmail: string
  orderFrom: string
  gaId: string
  metaPixelId: string
}

export const shopInfo: ShopInfo = {
  name: "BG PET",
  tagline: "Veterinarska apoteka i Pet Shop",
  legalName: "BG PET DOO",
  description:
    "Veterinarska apoteka i Pet Shop na Voždovcu. Medicinska hrana, zaštita od parazita, suplementi, vitamini, oprema i kozmetika za pse i mačke. Porudžbine online, preuzimanje u radnji ili dostava.",
  phone: "065/866-5393",
  phoneHref: "tel:+381658665393",
  email: "info@bgpet.rs",
  street: "Vojvode Stepe 189",
  zip: "11010",
  city: "Beograd",
  district: "Voždovac",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://veterinar-vibe.vercel.app",
  openingHours: [
    { days: "Mo-Fr", label: "Pon-Pet", opens: "09:00", closes: "20:00" },
    { days: "Sa", label: "Subota", opens: "10:00", closes: "16:00" },
    { days: "Su", label: "Nedelja", closed: true }
  ],
  orderEmail: process.env.NEXT_PUBLIC_SHOP_EMAIL || "pavlemaksimovic6@gmail.com",
  orderFrom: process.env.ORDER_FROM_EMAIL || "onboarding@resend.dev",
  gaId: process.env.NEXT_PUBLIC_GA_ID || "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || ""
}

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