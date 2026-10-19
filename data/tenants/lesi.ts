import type { TenantConfig } from "./types"

/**
 * PET SHOP LESI — Ruzveltova 12, Beograd (Palilula, kod Vukovog spomenika)
 *
 * Podaci izvučeni sa navidiku.rs (19.10.2026).
 * TEST FAZA: porudžbine idu na tvoj email (pavlemaksimovic6) umesto na
 * klijentov — menja pre lansa (NEXT_PUBLIC_SHOP_EMAIL + Resend domen).
 */
export const lesi: TenantConfig = {
  id: "petshop-lesi",
  shopInfo: {
    name: "Lesi",
    tagline: "Pet Shop",
    // TODO: navidiku ne prikazuje pravno lice — uzeti PIB/registraciju od klijenta (APR)
    legalName: "Pet Shop Lesi",
    description:
      "Pet shop Lesi u Ruzveltovoj 12, kod Vukovog spomenika — od 2006. godine. Veliki izbor hrane za pse, mačke, glodare, ribice i ptice (Royal Canin, Pedigree, Hills, Josera, Whiskas...). Oprema: ogrlice, povodci, kavezi, igračke, posude i kozmetika. Popust na veće količine hrane. Područje: Palilula, Zvezdara, Vukov spomenik, Dalmatinska.",
    phone: "063/199-9444",
    phoneHref: "tel:+381631999444",
    // Drugi telefon sa portala: 011/240-4166 (fiksni) — TODO dodati kad ShopInfo
    // dobije polje za više brojeva
    // TODO: nabaviti email od klijenta (navidiku ga ne prikazuje)
    email: "",
    // TODO: Instagram/Facebook profil (proveriti kod klijenta)
    instagram: "",
    facebook: "",
    street: "Ruzveltova 12",
    // TODO: potvrditi poštanski broj sa klijentom (Ruzveltova = 11000)
    zip: "11000",
    city: "Beograd",
    // Portal u hederu piše "Zvezdara", ali tekst firme kaže "na Paliluli" —
    // stajališta (Dalmatinska, Vukov spomenik) su Palilula. POTVRDITI.
    district: "Palilula",
    siteUrl: "https://petshop-lesi.vercel.app",
    // Radno vreme po navidiku: radnim danima 08-20, subota 08-15, nedelja ne radi
    openingHours: [
      { days: "Mo-Fr", label: "Pon-Petak", opens: "08:00", closes: "20:00" },
      { days: "Sa", label: "Subota", opens: "08:00", closes: "15:00" },
      { days: "Su", label: "Nedelja", closed: true },
    ],
    // TEST: porudžbine dolaze tebi — pre lansa na klijentov email + Resend domen
    orderEmail: "pavlemaksimovic6@gmail.com",
    orderFrom: "onboarding@resend.dev",
    gaId: "",
    metaPixelId: "",
    // SVG wordmark (šapa + PET SHOP / LESI) u stilu Oskarovog logotipa —
    // originalni JPG (collie, krem pozadina, 120x60) ostavljen kao logo.jpg
    // za referencu; zameniti ako klijent pošalje vektorski logo.
    logo: "/tenants/lesi/logo.svg",
    // Varijanta za tamnu pozadinu (footer) — bela slova
    logoLight: "/tenants/lesi/logo-light.svg",
    // Prazno = kupac ne vidi broj (piše "račun dobijate uz potvrdu")
    bankAccount: "",
    orderPrefix: "LE",
    // TODO: javni registarski podaci (navidiku ih ne prikazuje) — obavezni
    // na Uslovima korišćenja pre lansa
    pib: "",
    registrationNo: "",
    keywords: [
      "pet shop Beograd",
      "pet shop Palilula",
      "pet shop Zvezdara",
      "hrana za pse Beograd",
      "hrana za mačke Beograd",
      "oprema za kućne ljubimce",
    ],
    schemaType: "PetStore",
  },
  colors: {
    // Crveno iz logotipa ("PET SHOP LESI") — izvučeno iz JPG-a
    primary: "#dc2626",
    primaryHover: "#b91c1c",
  },
  // Recenzije: [] = sekcija se automatski uklanja (ne izmišljati!)
  // (navidiku prikazuje 5.0/3 recenzije, ali to nisu Google recenzije)
  testimonials: [],
  googleReviews: null,
  businessType: "pet-shop",
}
