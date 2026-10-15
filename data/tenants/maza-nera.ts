import type { TenantConfig } from "./types"

/**
 * PET SHOP MAZA & NERA — Zemun (naselje Save Kovačević)
 *
 * Podaci izvučeni sa mazanera.rs, 011info.com i companywall.rs (15.10.2026).
 * TEST FAZA: porudžbine idu na tvoj email (pavlemaksimovic6) umesto na
 * klijentov — menjati pre lansa (NEXT_PUBLIC_SHOP_EMAIL + Resend domen).
 */
export const mazaNera: TenantConfig = {
  id: "maza-nera",
  shopInfo: {
    name: "Maza & Nera",
    tagline: "Pet Shop",
    legalName: "Jelena Đurković PR — Pet Shop Maza & Nera",
    description:
      "Pet shop Maza & Nera u Zemunu, naselje Save Kovačević. Hrana, poslastice, igračke, suplementi i kozmetika za pse i mačke — Happy Dog, Farmina N&D, Cibao i drugi brendovi. Porudžbine online, preuzimanje u radnji ili dostava.",
    phone: "069/1660-190",
    phoneHref: "tel:+381691660190",
    email: "petshopmazainera2026@gmail.com",
    instagram: "https://www.instagram.com/mazanera.2026", // IG handle: @mazanera.2026 (provereno preko 011info/moja-delatnost)
    facebook: "",
    street: "Gornjogradska 7i",
    zip: "11080",
    city: "Beograd",
    district: "Zemun",
    siteUrl: "https://maza-nera.vercel.app",
    // Radno vreme po 011info: Ponedeljak ne rade, Ut-Pet 12-21, Sub/Ned 10-17
    openingHours: [
      { days: "Mo", label: "Ponedeljak", closed: true },
      { days: "Tu-Fr", label: "Utorak-Petak", opens: "12:00", closes: "21:00" },
      { days: "Sa", label: "Subota", opens: "10:00", closes: "17:00" },
      { days: "Su", label: "Nedelja", opens: "10:00", closes: "17:00" },
    ],
    // TEST: porudžbine dolaze tebi — pre lansa na klijentov email + Resend domen
    orderEmail: "pavlemaksimovic6@gmail.com",
    orderFrom: "onboarding@resend.dev",
    gaId: "",
    metaPixelId: "",
    // Logo preuzet sa 011info (crno-beli linework) — konvertovan u PNG
    // sa providnom pozadinom (crna verzija za navbar, bela za footer).
    logo: "/tenants/maza-nera/logo.png",
    logoLight: "/tenants/maza-nera/logo-light.png",
    // Kad klijent pošalje fotografiju radnje (široki format ~1920x1080),
    // snimiti je u public/tenants/maza-nera/hero.jpg i odkomentarisati:
    // heroImage: "/tenants/maza-nera/hero.jpg",
    heroImage: "",
    // Prazno = kupac ne vidi broj (piše "račun dobijate uz potvrdu").
    // Račun postoji (Raiffeisen, 265-1100310102187-08) — dodati uz potvrdu klijenta.
    bankAccount: "",
    orderPrefix: "MN",
    // Javni registarski podaci (companywall.rs) — obavezni na Uslovima/Politici
    pib: "115428331",
    registrationNo: "68359201",
    keywords: [
      "pet shop Zemun",
      "hrana za pse Zemun",
      "hrana za mačke Zemun",
      "poslastice za pse",
      "oprema za kućne ljubimce",
      "suplementi za pse",
    ],
    schemaType: "PetStore",
  },
  colors: {
    // Topla narandžasta — u skladu sa crno-belim logom (pas+mačka+šapa).
    // Razlikuje se od bg-pet zelenog (#10b981) i primer plavog (#2563eb).
    primary: "#f97316",
    primaryHover: "#ea580c",
  },
  // Recenzije: [] = sekcija se automatski uklanja (ne izmišljati!)
  testimonials: [],
  googleReviews: null,
  businessType: "pet-shop",
  // Preimenovanje kategorije za pet shop (umesto "Veterinarska apoteka")
  categoryNames: {
    apoteka: "Zaštita i vitamini",
  },
}