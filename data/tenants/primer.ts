import type { TenantConfig } from "./types"

/**
 * =========================================================================
 *  PRIMER TENANTA — šablon za nove klijente + test da multi-tenant radi.
 *
 *  Koristi se: NEXT_PUBLIC_TENANT=primer
 *  (lokalno: set NEXT_PUBLIC_TENANT=primer && npm run dev)
 *
 *  ZA NOVOG KLJENTA (4 koraka):
 *   1. Kopiraj OVaj fajl u data/tenants/<id>.ts  (id = mala slova + crtice,
 *      npr. "pet-shop-jovanovic")
 *   2. Popuni podatke klijenta (ime, kontakt, adresa, boje, logo, račun...)
 *   3. Registruj ga u data/tenants/index.ts — jedan red u registry:
 *        "<id>": <imeKonstante>,
 *   4. Na Vercelu u tom projektu podesi env: NEXT_PUBLIC_TENANT=<id>
 *
 *  Posle toga SVE na sajtu (ime, logo, boje, SEO, kontakt, mejlovi,
 *  prefiks porudžbine) dolazi iz ovog fajla — kod se ne dira.
 * =========================================================================
 */
export const primerTenant: TenantConfig = {
  id: "primer",
  shopInfo: {
    // ── Osnovno ────────────────────────────────────────────────
    name: "DEMO APOTEKA",
    tagline: "Veterinarska apoteka i Pet Shop",
    legalName: "DEMO APOTEKA DOO",
    description:
      "Veterinarska apoteka i Pet Shop — demo podaci. Medicinska hrana, zaštita od parazita, suplementi, vitamini, oprema i kozmetika za pse i mačke.",
    // ── Kontakt ────────────────────────────────────────────────
    phone: "011/000-0000",
    phoneHref: "tel:+381110000000",
    email: "info@demo.rs",
    // ── Adresa i radno vreme ───────────────────────────────────
    street: "Primer Ulica 1",
    zip: "11000",
    city: "Beograd",
    district: "Centar",
    siteUrl: "https://primer.vercel.app",
    openingHours: [
      { days: "Mo-Fr", label: "Pon-Pet", opens: "09:00", closes: "17:00" },
      { days: "Sa", label: "Subota", opens: "09:00", closes: "13:00" },
      { days: "Su", label: "Nedelja", closed: true },
    ],
    // ── Mejl preko Resend-a (env varijable imaju prioritet) ────
    orderEmail: "porudzbine@demo.rs",
    orderFrom: "narudzbe@demo.rs",
    gaId: "",
    metaPixelId: "",
    instagram: "", // npr. "https://www.instagram.com/ime_profila"
    facebook: "",
    // ── Brend ──────────────────────────────────────────────────
    logo: "", // npr. "/tenants/primer/logo.png" (fajl u public/)
    bankAccount: "", // PRAZNO = kupac ne vidi broj (bezbedno pre popunjavanja)
    orderPrefix: "DM", // prefiks broja porudžbine, npr. "DM-2026-1234"
    pib: "",
    registrationNo: "",
    keywords: ["pet shop", "hrana za pse", "oprema za ljubimce"],
    schemaType: "PetStore",
  },
  colors: {
    // Test boja (plava) — dokaz da boje nisu vezane za zeleno.
    primary: "#2563eb",
    primaryHover: "#1d4ed8",
  },
  // Recenzije: [] = sekcija se uklanja. Ne izmišljati za klijenta!
  testimonials: [],
  googleReviews: null,
  businessType: "mixed",
}