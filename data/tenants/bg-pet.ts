import type { TenantConfig } from "./types"

/**
 * Podrazumevani (i fabrički) tenant — demo brend "BG PET".
 *
 * Ako NEXT_PUBLIC_TENANT nije setovan, uvek se koristi OVAJ tenant,
 * pa postojeći demo sajt radi tačno kao pre multi-tenanta.
 */
export const bgPet: TenantConfig = {
  id: "bg-pet",
  shopInfo: {
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
    siteUrl: "https://veterinar-vibe.vercel.app",
    openingHours: [
      { days: "Mo-Fr", label: "Pon-Pet", opens: "09:00", closes: "20:00" },
      { days: "Sa", label: "Subota", opens: "10:00", closes: "16:00" },
      { days: "Su", label: "Nedelja", closed: true },
    ],
    orderEmail: "pavlemaksimovic6@gmail.com",
    orderFrom: "onboarding@resend.dev",
    gaId: "",
    metaPixelId: "",
    instagram: "https://www.instagram.com/_bg_pet",
    facebook: "",
    logo: "",
    bankAccount: "",
    orderPrefix: "BG",
    pib: "",
    registrationNo: "",
    keywords: [
      "veterinarska apoteka",
      "pet shop Beograd",
      "hrana za pse",
      "zaštita od krpelja",
      "vitamini za ljubimce",
    ],
    schemaType: "VeterinaryCare",
  },
  colors: {
    primary: "#10b981",
    primaryHover: "#059669",
  },
  /**
   * DEMO recenzije — važe samo za bg-pet (ovaj brend i jeste demo).
   * Drugi tenanti kreću sa praznim nizom.
   */
  testimonials: [
    {
      id: 1,
      name: "Marko N.",
      pet: "vlasnik zlatnog retrivera",
      review:
        "Najbolje snabdevena apoteka na Voždovcu! Uvek imaju medicinsku hranu koja je mom psu potrebna, a osoblje je izuzetno stručno.",
    },
    {
      id: 2,
      name: "Jelena K.",
      pet: "vlasnica mačke Lune",
      review:
        "Sve preporuke za BG PET. Sve preparate protiv krpelja kupujem isključivo ovde jer su uvek sveži i originalni.",
    },
    {
      id: 3,
      name: "Petar J.",
      pet: "vlasnik nemačkog ovčara",
      review:
        "Odličan izbor suplemenata i vitamina. Moj pas već godinama koristi njihove proizvode i rezultati su odlični!",
    },
  ],
  googleReviews: null,
  businessType: "mixed",
}