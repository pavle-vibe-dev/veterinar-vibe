/**
 * Tipovi multi-tenant (beli znak) konfiguracije.
 *
 * Svaka apoteka/klijent = jedan TenantConfig fajl u data/tenants/.
 * Aktivan tenant se bira preko env varijable NEXT_PUBLIC_TENANT
 * (na Vercelu: Settings → Environment Variables, po projektu).
 */

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
  /**
   * Kanonski URL sajta. Ovde je FALLBACK — stvarna vrednost dolazi iz
   * env varijable NEXT_PUBLIC_SITE_URL (per Vercel projekat).
   */
  siteUrl: string
  openingHours: OpeningHours[]
  /**
   * Kome stižu porudžbine (fallback). Env NEXT_PUBLIC_SHOP_EMAIL ima prioritet.
   */
  orderEmail: string
  /** Sa koje adrese se šalje mejl (fallback). Env ORDER_FROM_EMAIL ima prioritet. */
  orderFrom: string
  /** Fallback — env NEXT_PUBLIC_GA_ID ima prioritet. */
  gaId: string
  /** Fallback — env NEXT_PUBLIC_META_PIXEL_ID ima prioritet. */
  metaPixelId: string
  /**
   * Putanja do logotipa npr. "/logo.png" (fajl u public/).
   * Prazno = koristi se ikonica + naziv (tekst).
   */
  logo: string
  /**
   * Tekući račun za virman. Prazno = broj se NE prikazuje kupcu,
   * umesto toga stoji "račun dobijate nakon potvrde".
   * OVO MORAS ZA SVAKOG KLJENTA — inace kupac vidi tudji broj.
   */
  bankAccount: string
  /**
   * Prefiks broja porudžbine, npr. "BG-2026-1234".
   * Menja se po klijentu da broj ne nosi tudje ime.
   */
  orderPrefix: string
  /**
   * PIB i matični broj pravnog lica — OBAVEZNI na Uslovima korišćenja
   * i Politici privatnosti (Zakon o zaštiti potrošača / e-trgovina).
   * Prazno = podatak se ne prikazuje, a lice NIJE registrovano za e-trgovinu.
   */
  pib: string
  registrationNo: string
}

export type Testimonial = {
  id: number
  /** Ime kupca - za pravog klijenta koristiti prava imena uz dozvolu */
  name: string
  pet: string
  review: string
}

/**
 * Google ocena se NE izmislja — null = blok se uopste ne renderuje.
 * Kad klijent dobije prave recenzije: { rating: 4.8, count: 63 }
 */
export type GoogleReviews = { rating: number; count: number } | null

/**
 * Brend boje tenanta — mapiraju se na CSS varijable
 * --color-brand-primary / --color-brand-primary-hover (app/globals.css)
 * i primenjuju se kao inline stil na <html> u app/layout.tsx.
 */
export type BrandColors = {
  primary: string
  /** Tamnija nijansa primarne — hover stanje dugmića i linkova */
  primaryHover: string
}

export type TenantConfig = {
  /** Kratki id za NEXT_PUBLIC_TENANT, npr. "bg-pet" (mala slova i crtice) */
  id: string
  shopInfo: ShopInfo
  colors: BrandColors
  /**
   * Recenzije kupaca. Prazan niz = sekcija se automatski uklanja.
   * ZA NOVOG KLJENTA: ostavi [] dok ne stignu STVARNE recenzije —
   * izmišljene reference su lažna reklama (kažnjivo u Srbiji).
   */
  testimonials: Testimonial[]
  googleReviews: GoogleReviews
}