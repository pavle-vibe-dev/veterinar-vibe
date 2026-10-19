import type { TenantConfig } from "./types"

/**
 * PET SHOP MAZA — Stojana Novakovića 27, Šabac (Tatjana Matić PR)
 *
 * PAŽLJIVO: ovo NIJE "maza-nera" iz Zemuna — potpuno druga radnja!
 * Podaci od klijenta / iz APRregistra (19.10.2026): PIB 115862862,
 * MB 68699487, osnovana 31.7.2026. Logo sa FB profilne slike (720px).
 */
export const petshopMaza: TenantConfig = {
  id: "petshop-maza",
  shopInfo: {
    name: "Maza",
    tagline: "Pet Shop",
    legalName: "Tatjana Matić Pr MAZA PET SHOP",
    description:
      "Pet shop Maza u Šapcu, Stojana Novakovića 27. Hrana, oprema i kozmetika za kućne ljubimce — sve za pse, mačke i druge ljubimce na jednom mestu. Porudžbine online, preuzimanje u radnji ili dostava.",
    phone: "062/300-505",
    phoneHref: "tel:+38162300505",
    email: "tanjasrebro@gmail.com",
    // TODO: Instagram handle (pominju "Instagram profil" — handle nije poznat)
    instagram: "",
    facebook: "https://www.facebook.com/p/Pet-Shop-MAZA-61593823089840/",
    street: "Stojana Novakovića 27",
    zip: "15000",
    city: "Šabac",
    district: "Šabac",
    siteUrl: "https://petshop-maza.vercel.app",
    openingHours: [
      { days: "Mo-Fr", label: "Pon-Petak", opens: "09:00", closes: "20:00" },
      { days: "Sa", label: "Subota", opens: "09:00", closes: "17:00" },
      { days: "Su", label: "Nedelja", closed: true },
    ],
    // TEST: dok neregistrovan domen — porudžbine dolaze ovde. Pre lansa:
    // NEXT_PUBLIC_SHOP_EMAIL = tanjasrebro@gmail.com + Resend domen
    orderEmail: "pavlemaksimovic6@gmail.com",
    orderFrom: "onboarding@resend.dev",
    gaId: "",
    metaPixelId: "",
    // Izvučen iz FB profilne slike 720px: emblem (pas+mačka u krugu) +
    // wordmark "Maza" (serif, šapa u slovu) + "♡ PET SHOP ♡" linija.
    // logo.png = kraft bez -> bela (navbar); logo-light.png = bez -> #0f172a,
    // mastilo -> belo (footer). Original: logo-fb.jpg za referencu.
    logo: "/tenants/petshop-maza/logo.png",
    logoLight: "/tenants/petshop-maza/logo-light.png",
    bankAccount: "",
    orderPrefix: "PM",
    // APR podaci od klijenta — javni registarski podaci spremni (ne trebaju TODO)
    pib: "115862862",
    registrationNo: "68699487",
    keywords: [
      "pet shop Šabac",
      "hrana za pse Šabac",
      "hrana za mačke Šabac",
      "oprema za kućne ljubimce Šabac",
      "kozmetika za ljubimce Šabac",
    ],
    schemaType: "PetStore",
  },
  colors: {
    // Mastilo logotipa je crno; tamno dugme = klasika uz kraft/bež estetiku
    primary: "#23201c",
    primaryHover: "#12100d",
  },
  // Recenzije: [] = sekcija se automatski uklanja (ne izmišljati!)
  testimonials: [],
  googleReviews: null,
  businessType: "pet-shop",
}
