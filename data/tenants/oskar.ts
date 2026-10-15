import type { TenantConfig } from "./types"

/**
 * PET SHOP OSKAR — Altina, Zemun (Ugrinovački put 31)
 *
 * Podaci izvučeni sa 011info.com, portal-srbija.com i companywall.rs (15.10.2026).
 * TEST FAZA: porudžbine idu na tvoj email (pavlemaksimovic6) umesto na
 * klijentov — menja pre lansa (NEXT_PUBLIC_SHOP_EMAIL + Resend domen).
 */
export const oskar: TenantConfig = {
  id: "petshop-oskar",
  shopInfo: {
    name: "Oskar",
    tagline: "Pet Shop",
    legalName: "Vladislav Bosanac PR — Pet Shop Oskar",
    description:
      "Pet shop Oskar na Altini, Ugrinovački put 31. Hrana za pse i mačke (Royal Canin, Josera, Pedigree, Whiskas...), ogrlice, povodci, vitamini, poslastice i kozmetika. Besplatni veterinarski saveti. Područje: Altina, Galenika, Batajnica, Zemun polje.",
    phone: "064/998-60-60",
    phoneHref: "tel:+381649986060",
    // TODO: nabaviti pravi email od klijenta (011info ne prikazuje email)
    email: "",
    // TODO: Instagram/Facebook profil (proveriti kod klijenta)
    instagram: "",
    facebook: "",
    street: "Ugrinovački put 31",
    zip: "11080",
    city: "Beograd",
    district: "Altina",
    siteUrl: "https://petshop-oskar.vercel.app",
    // Radno vreme po portal-srbija: radnim danima 09-20, subota 09-17, nedelja zatvoreno
    openingHours: [
      { days: "Mo-Fr", label: "Pon-Petak", opens: "09:00", closes: "20:00" },
      { days: "Sa", label: "Subota", opens: "09:00", closes: "17:00" },
      { days: "Su", label: "Nedelja", closed: true },
    ],
    // TEST: porudžbine dolaze tebi — pre lansa na klijentov email + Resend domen
    orderEmail: "pavlemaksimovic6@gmail.com",
    orderFrom: "onboarding@resend.dev",
    gaId: "",
    metaPixelId: "",
    // Logo u boji (banner) — ima sopstvenu svetlo-plavu pozadinu, koristi se JPG kakav jeste
    logo: "/tenants/oskar/logo.jpg",
    // Prazno = kupac ne vidi broj (piše "račun dobijate uz potvrdu")
    bankAccount: "",
    orderPrefix: "OS",
    // Javni registarski podaci (companywall/ls.rs)
    pib: "106822233",
    registrationNo: "62299495",
    keywords: [
      "pet shop Altina",
      "hrana za pse Zemun",
      "hrana za mačke Altina",
      "oprema za kućne ljubimce",
      "poslastice za pse",
      "pet shop Zemun",
    ],
    schemaType: "PetStore",
  },
  colors: {
    // Zeleno iz logotipa ("PET SHOP OSKAR") — POTVRDITI sa klijentom
    primary: "#16a34a",
    primaryHover: "#15803d",
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
