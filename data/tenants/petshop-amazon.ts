import type { TenantConfig } from "./types"

/**
 * PET SHOP AMAZON — Novi Sad
 *
 * Podaci sa zvaničnih izvora (PlanPlus, stari sajt petshopamazon.com preko
 * Wayback arhive, Facebook amazon.novisad, Instagram petshop_amazon):
 * osnovan 1997, tri lokacije u Novom Sadu:
 *   - SPENS (Sutjeska 2)              — glavna adresa na sajtu
 *   - Futoška pijaca (Jevrejska 44)
 *   - Novo naselje (Radomira Raše Radujkova 1a)
 *
 * NAPOMENA: njihov stari sajt petshopamazon.com više ne postoji (DNS ne
 * resolvuje) — ovo je prilika za novi sajt.
 *
 * TODO pre lansa: tačan pravni naziv + PIB + MB (nisu javno dostupni),
 * potvrda radnog vremena i koja lokacija je primarna za kontakt.
 */
export const petshopAmazon: TenantConfig = {
  id: "petshop-amazon",
  shopInfo: {
    name: "Amazon",
    tagline: "Pet Shop",
    legalName: "Pet Shop Amazon",
    description:
      "Pet shop Amazon u Novom Sadu — više od 25 godina uzgajamo poverenje ljubitelja životinja. Hrana, oprema i kompletan asortiman za pse, mačke, ptice, ribice i male životinje. Tri radnje u gradu: SPENS (Sutjeska 2), Futoška pijaca (Jevrejska 44) i Novo naselje (Radomira Raše Radujkova 1a). Porudžbine online, preuzimanje u radnji.",
    phone: "021/422-756",
    phoneHref: "tel:+38121422756",
    email: "amazonovisad@gmail.com",
    instagram: "https://www.instagram.com/petshop_amazon/",
    facebook: "https://www.facebook.com/amazon.novisad/",
    // Primarna lokacija = SPENS (tako je bilo i na starom sajtu u kontaktu)
    street: "Sutjeska 2",
    zip: "21000",
    city: "Novi Sad",
    district: "Novi Sad",
    siteUrl: "https://petshop-amazon.vercel.app",
    openingHours: [
      { days: "Mo-Fr", label: "Pon-Petak", opens: "09:00", closes: "20:30" },
      { days: "Sa", label: "Subota", opens: "09:00", closes: "16:30" },
      { days: "Su", label: "Nedelja", closed: true },
    ],
    // TEST: dok neregistrovan domen — porudžbine dolaze ovde. Pre lansa:
    // NEXT_PUBLIC_SHOP_EMAIL = amazonovisad@gmail.com + Resend domen
    orderEmail: "pavlemaksimovic6@gmail.com",
    orderFrom: "onboarding@resend.dev",
    gaId: "",
    metaPixelId: "",
    // Logo izvučen iz FB cover slike (943x524): mačka + "Pet Shop" limeta +
    // "AMAZON" tamnozelena sa žutim obrisom + ribica u kugli umesto slova O.
    // Pozadina (mornarsko plava) uklonjena; logo.png = providno (navbar),
    // logo-light.png = ista slika na beloj zaobljenoj ploči (footer).
    // Original: logo-fb.jpg za referencu.
    logo: "/tenants/petshop-amazon/logo.png",
    logoLight: "/tenants/petshop-amazon/logo-light.png",
    bankAccount: "",
    orderPrefix: "AM",
    // TODO: pravni podaci (PIB/MB) — nisu javno dostupni, tražiti od klijenta
    pib: "",
    registrationNo: "",
    keywords: [
      "pet shop Novi Sad",
      "hrana za pse Novi Sad",
      "hrana za mačke Novi Sad",
      "akvaristika Novi Sad",
      "ptice i glodari Novi Sad",
      "oprema za kućne ljubimce Novi Sad",
    ],
    schemaType: "PetStore",
  },
  colors: {
    // Tamnozelena iz logotipa (slova AMAZON)
    primary: "#146c2e",
    primaryHover: "#0d4a1f",
  },
  // Recenzije: [] = sekcija se automatski uklanja (ne izmišljati!)
  testimonials: [],
  googleReviews: null,
  businessType: "pet-shop",
}
