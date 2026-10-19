import type { TenantConfig } from "./types"

/**
 * PET SHOP GIVE ME PAW — Gerberovih 1, Bečej
 *
 * Podaci izvučeni: Google podaci preko exa.ai (adresa/telefon/ocena/radno vreme),
 * becejskidani.co.rs + mojbecej.rs (asortiman, otvaranje 2022), infobel.rs
 * (pravno lice), Facebook stranica (logo — 720px profilna slika, 19.10.2026).
 * TEST FAZA: porudžbine idu na tvoj email (pavlemaksimovic6) umesto na
 * klijentov — menja pre lansa (NEXT_PUBLIC_SHOP_EMAIL + Resend domen).
 */
export const giveMePaw: TenantConfig = {
  id: "give-me-paw",
  shopInfo: {
    name: "Give Me Paw",
    tagline: "Pet Shop",
    // TODO: infobel prikazuje "Vesna Lam PR" — POTVRDITI pre lansa (potpis na Uslovima)
    legalName: "Vesna Lam PR Pet shop Give Me Paw",
    description:
      "Pet shop Give Me Paw u Bečeju, Gerberovih 1. Hrana i poslastice za pse, mačke, ptice i glodare, akvaristika i teraristika, ogrlice, povodci, krevetići, igračke i kozmetika (Royal Canin, Acana, Monge, Farmina N&D...). Očekujemo vas i vaše ljubimce!",
    phone: "063/733-29-25",
    phoneHref: "tel:+381637332925",
    // TODO: nabaviti email od klijenta (nigde se ne pojavljuje)
    email: "",
    // Facebook = glavna web prisutnost (do lansa); Instagram pominju na FB ali
    // handle nije javno objavljen — TODO pitati klijenta
    instagram: "",
    facebook: "https://www.facebook.com/p/Give-Me-Paw-Be%C4%8Dej-100076826010141/",
    street: "Gerberovih 1",
    zip: "21220",
    city: "Bečej",
    district: "Bečej",
    siteUrl: "https://give-me-paw.vercel.app",
    // KONFLIKT: Google (2026) kaže Pon-Pet 09-19, Sub 08-13; članak iz 2022.
    // govi 08-20 / 08-15. Uzeo novije (Google) — TODO POTVRDITI sa klijentom!
    openingHours: [
      { days: "Mo-Fr", label: "Pon-Petak", opens: "09:00", closes: "19:00" },
      { days: "Sa", label: "Subota", opens: "08:00", closes: "13:00" },
      { days: "Su", label: "Nedelja", closed: true },
    ],
    // TEST: porudžbine dolaze tebi — pre lansa na klijentov email + Resend domen
    orderEmail: "pavlemaksimovic6@gmail.com",
    orderFrom: "onboarding@resend.dev",
    gaId: "",
    metaPixelId: "",
    // Izvučen wordmark (skript "give me paw" + dlan/šapa high-five) iz FB
    // profilne slike 720px; logo.png = krem->bela (navbar), logo-light.png =
    // krem->#0f172a + slova bela (footer). Original: logo-fb.jpg za referencu.
    logo: "/tenants/give-me-paw/logo.png",
    logoLight: "/tenants/give-me-paw/logo-light.png",
    // Prazno = kupac ne vidi broj računa (piše "račun dobijate uz potvrdu")
    bankAccount: "",
    orderPrefix: "GP",
    // TODO: javni registarski podaci — obavezni na Uslovima korišćenja pre lansa
    pib: "",
    registrationNo: "",
    keywords: [
      "pet shop Bečej",
      "hrana za pse Bečej",
      "hrana za mačke Bečej",
      "akvaristika Bečej",
      "teraristika Bečej",
      "oprema za kućne ljubimce Bečej",
    ],
    schemaType: "PetStore",
  },
  colors: {
    // Boja mastila iz logotipa (uzorkovana iz FB profilne slike) — tamni bordeaux
    primary: "#563e39",
    primaryHover: "#42302c",
  },
  // Recenzije: [] = sekcija se automatski uklanja (ne izmišljati!)
  // (Google pokazuje 4.8/8 recenzija — uključiti kad klijent potvrdi)
  testimonials: [],
  googleReviews: null,
  businessType: "pet-shop",
}
