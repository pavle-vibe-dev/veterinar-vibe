import type { TenantConfig } from "./types"
import type { Product } from "../shop"

/**
 * PET SHOP ŽIVANOVIĆ — Knjaza Miloša 109, Knjaževac
 *
 * Izvori: Instagram profil @petshop_zivanovic + podaci od klijenta
 * (adresa, telefon 069/381-7546, radno vreme pon-sub 08-20, nedelja ne radi).
 *
 * KATALOG: 12 proizvoda sa IG objava (slike: IG foto, public/tenants/...).
 * CENE SU PROCENE (uporedjene sa petmarket.rs/pawz.rs/granule.rs) —
 * POTVRDITI klijentov cenovnik pre lansa.
 *
 * TODO pre lansa: pravni naziv + PIB + MB, email za porudžbine.
 *
 * Brend identitet sa IG poster-a (LETNJE RADNO VREME): zlatni serifni
 * natpis "ZIVANOVIC" na crnoj + siluete psa i macke. ORIGINAL artwork
 * izvađen iz poster-a: logo-h.png (horizontalni, navbar) + logo.png
 *
 * DEMO RASPORED OZNAKE: badges + oldPrice su procene da homepage railovi
 * ("Nasa preporuka" / "Najveci popusti" / "Novo u asortimanu") pokazuju
 * po 4 artikla vise — POTVRDITI klijentov cenovnik i izdvojiti stvarne
 * akcije pre lansa.
 */
export const petshopZivanovic: TenantConfig = {
  id: "petshop-zivanovic",
  shopInfo: {
    name: "Živanović",
    tagline: "Pet Shop",
    // TODO: uzeti pravni naziv + PIB + MB od klijenta (APR)
    legalName: "Pet Shop Živanović",
    description:
      "Pet Shop Živanović na Knjaza Miloša 109 u Knjaževcu — radnja za ljubimce " +
      "sa pažljivo biranim asortimanom: hrana za pse i mačke (Monge, " +
      "Nature's Protection, Pro Plan, Alfa, Dalmi, Felicia), mokra hrana, " +
      "suplementi i preparati za negu. Posetite nas i obradujte svoje kućne ljubimce.",
    phone: "069/381-7546",
    phoneHref: "tel:+381693817546",
    email: "",
    instagram: "https://www.instagram.com/petshop_zivanovic/",
    facebook: "",
    street: "Knjaza Miloša 109",
    zip: "19350",
    city: "Knjaževac",
    district: "Knjaževac",
    siteUrl: "https://petshop-zivanovic.vercel.app",
    // Radno vreme po klijentu (poruka): pon-sub 08-20, nedelja ne radi.
    // IG poster za letnje vreme kaže pon-pet 07:30-20:30, sub 08-19 —
    // držimo se poruke dok klijent ne potvrdi drugo.
    openingHours: [
      { days: "Mo-Sa", label: "Pon-Subota", opens: "08:00", closes: "20:00" },
      { days: "Su", label: "Nedelja", closed: true },
    ],
    // TEST: porudžbine idu na tvoj email dok se ne registruje domen
    orderEmail: "pavlemaksimovic6@gmail.com",
    orderFrom: "onboarding@resend.dev",
    gaId: "",
    metaPixelId: "",
    // ORIGINALNI logo izvađen iz klijentovog IG poster-a (zlato na
    // providnim) — emblem sa psom i mačkom + natpis ZIVANOVIĆ PET SHOP.
    // `logo` = TAMNA verzija za belu pozadinu navbara (čitljivo),
    // `logoLight` = zlatna verzija za tamnu pozadinu footer-a.
    logo: "/tenants/petshop-zivanovic/logo-h-dark.png",
    logoLight: "/tenants/petshop-zivanovic/logo-h.png",
    // Prazno = kupac ne vidi ovaj broj (piše "račun dobijate uz potvrdu")
    bankAccount: "",
    orderPrefix: "ZIV",
    // TODO: obavezno na Uslovima korišćenja pre lansa
    pib: "",
    registrationNo: "",
    keywords: [
      "pet shop Knjaževac",
      "hrana za pse Knjaževac",
      "hrana za mačke Knjaževac",
      "oprema za kućne ljubimce Knjaževac",
      "pet shop Knjaza Miloša 109",
    ],
    schemaType: "PetStore",
  },
  colors: {
    // Zlatno iz brend identiteta (IG poster — zlato na crnoj)
    primary: "#c29a3b",
    primaryHover: "#a37e28",
  },
  // Recenzije: [] = sekcija se automatski uklanja (ne izmišljati!)
  // (Google kartica 5.0/3 postoji, ali čekamo potvrdu klijenta)
  testimonials: [],
  googleReviews: null,
  businessType: "pet-shop",
  /**
   * KATALOG SA IG PROFILA — slike su IG objave klijenta.
   * CENE = procene po lokalnim prodavnicama; potvrditi cenovnik pre lansa.
   */
  products: [
    {
      slug: "alfa-beef-dog-10kg",
      name: "Alfa Adult Beef, hrana za pse sa govedinom 10kg",
      brand: "Alfa",
      category: "hrana-psi",
      sub: "granule-psi",
      price: 4690,
      image: "/tenants/petshop-zivanovic/alfa-beef-dog-10kg.jpg",
      shortDesc: "Kompletna suva hrana za odrasle pse sa govedinom.",
      description:
        "Alfa Adult Beef — kompletna suva hrana za odrasle pse sa govedinom. " +
        "Prirodna receptura sa dodatim vitaminima, mineralima i nutrijentima. " +
        "Veličina vreće 10kg.",
      stock: "dostupno",
      badges: ["preporuka"],
      rating: 4.8,
      unit: "10kg",
    },
    {
      slug: "monge-maxi-adult-3kg",
      name: "Monge Natural Superpremium Maxi Adult, piletina 3kg",
      brand: "Monge",
      category: "hrana-psi",
      sub: "granule-psi",
      price: 2390,
      image: "/tenants/petshop-zivanovic/monge-maxi-adult-3kg.jpg",
      shortDesc: "Superpremium hrana za velike rase (32-80kg), bogata piletinom.",
      description:
        "Monge Natural Superpremium Maxi Adult Rich in Chicken za odrasle pse " +
        "velikih rasa (32-80 kg). Glukozamin i hondroitin za zglobove, " +
        "prebiotici za probavu, omega masne kiseline za sjajnu dlaku. " +
        "Veličina vreće 3kg. Proizvedeno u Italiji.",
      stock: "dostupno",
      // DEMO raspored: preporuka (rail "Naša preporuka")
      badges: ["preporuka"],
      rating: 4.9,
      unit: "3kg",
    },
    {
      slug: "dalmi-govedina-10kg",
      name: "Dalmi Govedina, hrana za pse 10kg",
      brand: "Dalmi",
      category: "hrana-psi",
      sub: "granule-psi",
      price: 3290,
      image: "/tenants/petshop-zivanovic/dalmi-govedina-10kg.jpg",
      shortDesc: "Ljubav na prvi obrok — domaća hrana sa govedinom.",
      description:
        "Dalmi Govedina 10kg — kompletna suva hrana za odrasle pse svih rasa. " +
        "Domaći brend odličnog odnosa cene i kvaliteta.",
      stock: "dostupno",
      // DEMO raspored: preporuka da rail "Naša preporuka" ima 4 artikla
      badges: ["preporuka"],
      rating: 4.7,
      unit: "10kg",
    },
    {
      slug: "rinti-kennerfleisch-piletina-800g",
      name: "Rinti Kennerfleisch, ptičija srca bez žitarica 800g",
      brand: "Rinti",
      category: "hrana-psi",
      sub: "mokri-psi",
      price: 890,
      image: "/tenants/petshop-zivanovic/rinti-kennerfleisch-piletina-800g.jpg",
      shortDesc: "Pravi komadi mesa u prirodnom soku, bez žitarica.",
      description:
        "Rinti Kennerfleisch mit Geflügelherzen — pravi komadi visokokvalitetnog " +
        "ptičijeg mesa i ptičijih srca u prirodnom soku. Bez žitarica, soje, " +
        "veštačkih boja i konzervanasa. Rinti od 1988. Nemački kvalitet. " +
        "Pakovanje 800g.",
      stock: "dostupno",
      // DEMO raspored: novo (rail "Novo u asortimanu")
      badges: ["novo"],
      rating: 4.8,
      unit: "800g",
    },
    {
      slug: "brit-sausage-piletina-divljac-800g",
      name: "Brit Premium Sausage, piletina i divljač 800g",
      brand: "Brit",
      category: "hrana-psi",
      sub: "mokri-psi",
      price: 690,
      oldPrice: 900,
      image: "/tenants/petshop-zivanovic/brit-sausage-piletina-divljac-800g.jpg",
      shortDesc: "Kompletna mokra hrana — kobasica sa 95% mesa.",
      description:
        "Brit Premium Sausage sa 95% piletine i divljači — kompletna mokra " +
        "hrana za pse svih rasa. Seče se na komade i služi kao obrok ili " +
        "nagrada za obuku. Pakovanje 800g.",
      stock: "dostupno",
      // DEMO cena: oldPrice = estimirana redovna cena — POTVRDITI cenovnik
      // DEMO raspored: akcija (rail "Najveći popusti")
      badges: ["akcija"],
      rating: 4.8,
      unit: "800g",
    },
    {
      slug: "felicia-lamb-3kg",
      name: "Felicia Adult Small&Mini Hypoallergenic Lamb 3kg",
      brand: "Felicia",
      category: "hrana-psi",
      sub: "granule-psi",
      price: 1690,
      image: "/tenants/petshop-zivanovic/felicia-lamb-3kg.jpg",
      shortDesc: "Hipoalergena formula sa jagnjetinom, bez pšenice.",
      description:
        "Felicia Sensitive+ Care Hypoallergenic Lamb za pse malih i srednjih " +
        "rasa — 27% proteina, 12% masti, bez pšenice. Low Grain formula za " +
        "zdravlje kože i dlake. Veličina vreće 3kg.",
      stock: "dostupno",
      // DEMO raspored: preporuka (rail "Naša preporuka")
      badges: ["preporuka"],
      rating: 4.8,
      unit: "3kg",
    },
    {
      slug: "np-white-dogs-15kg",
      name: "Nature's Protection Superior Care White Dogs, Grain Free 1.5kg",
      brand: "Nature's Protection",
      category: "hrana-psi",
      sub: "granule-psi",
      price: 2990,
      image: "/tenants/petshop-zivanovic/np-white-dogs-15kg.jpg",
      shortDesc: "Formula za bele rase — protiv suznih tragova i za belu dlaku.",
      description:
        "Nature's Protection Superior Care White Dogs Grain Free za odrasle pse " +
        "malih i mini rasa (do 10kg). Sa belim ribama i krilom — održava " +
        "snežno belu dlaku i smanjuje suzne tragove oko očiju, njuške i šapa.",
      stock: "dostupno",
      badges: ["novo"],
      rating: 4.9,
      unit: "1.5kg",
    },
    {
      slug: "np-red-coat-15kg",
      name: "Nature's Protection Superior Care Red Coat, Grain Free 1.5kg",
      brand: "Nature's Protection",
      category: "hrana-psi",
      sub: "granule-psi",
      price: 2990,
      image: "/tenants/petshop-zivanovic/np-red-coat-15kg.jpg",
      shortDesc: "Formula za pse malih rasa sa crvenom i krem dlakom.",
      description:
        "Nature's Protection Superior Care Red Coat Grain Free, Adult Small " +
        "Breeds — specijalno razvijena formula za pse sa crvenom i krem " +
        "dlakom (Pomeranac, Čivava...). Sa piletinom — RC kompleks za duboku " +
        "crvenu boju dlake.",
      stock: "dostupno",
      // DEMO raspored: novo (rail "Novo u asortimanu")
      badges: ["novo"],
      rating: 4.9,
      unit: "1.5kg",
    },
    {
      slug: "pro-plan-cat-delicate-15kg",
      name: "Purina Pro Plan Adult 1+ Delicate Digestion, ćuretina 1.5kg",
      brand: "Purina Pro Plan",
      category: "hrana-macke",
      sub: "granule-macke",
      price: 1490,
      image: "/tenants/petshop-zivanovic/pro-plan-cat-delicate-15kg.jpg",
      shortDesc: "Bogata ćuretinom, za mačke sa osetljivom probavom.",
      description:
        "Purina Pro Plan Cat Adult 1+ Delicate Digestion, bogata ćuretinom — " +
        "visokokvalitetni proteini za zdravu probavu, bez dodatih boja i " +
        "aroma. Po preporuci ISFM (International Society of Feline Medicine).",
      stock: "dostupno",
      badges: ["novo"],
      rating: 4.9,
      unit: "1.5kg",
    },
    {
      slug: "biogance-dentifresh-300ml",
      name: "Biogance Dentifresh, losion za oralnu higijenu 300ml",
      brand: "Biogance",
      category: "oprema",
      sub: "kozmetika",
      price: 990,
      oldPrice: 1290,
      image: "/tenants/petshop-zivanovic/biogance-dentifresh-300ml.jpg",
      shortDesc: "Enzimski losion za zube i svež dah — bez četkanja.",
      description:
        "Biogance Dentifresh Oral & Dental Lotion — enzimski losion za zube " +
        "psa i mačke: svež dah, higijena i zaštita od plaka bez agresivnih " +
        "sastojaka. Bez parabena i alkohola. 98% prirodno. Pravljeno u " +
        "Francuskoj. Pakovanje 300ml.",
      stock: "dostupno",
      // DEMO cena: oldPrice = estimirana redovna cena — POTVRDITI cenovnik
      // DEMO raspored: akcija (rail "Najveći popusti")
      badges: ["akcija"],
      rating: 4.7,
      unit: "300ml",
    },
    {
      slug: "paws-hepatic-100ml",
      name: "Paws&Paws Hepatic, podrška jetri 100ml",
      brand: "Paws & Paws",
      category: "oprema",
      sub: "kozmetika",
      price: 1290,
      oldPrice: 1490,
      image: "/tenants/petshop-zivanovic/paws-hepatic-100ml.jpg",
      shortDesc: "Mlečni čagalj — prirodna podrška jetri.",
      description:
        "Paws&Paws Hepatic sa mlečnim čagaljem (Silybum marianum) — prirodna " +
        "podrška funkciji jetre kod pasa i mačaka. Aroma salamure — lako se " +
        "prima direktno u usta. Bio proizvod. Pakovanje 100ml.",
      stock: "dostupno",
      // DEMO cena: oldPrice = estimirana redovna cena — POTVRDITI cenovnik
      // DEMO raspored: akcija (rail "Najveći popusti")
      badges: ["akcija"],
      rating: 4.8,
      unit: "100ml",
    },
    {
      slug: "diamond-eyes-30tbl",
      name: "Diamond Eyes Natural, tablete za žvakanje 30 / 750mg",
      brand: "Diamond Eyes",
      category: "oprema",
      sub: "kozmetika",
      price: 890,
      oldPrice: 1090,
      image: "/tenants/petshop-zivanovic/diamond-eyes-30tbl.jpg",
      shortDesc: "Rezultat vidljiv za 3 nedelje — protiv suznih tragova.",
      description:
        "Diamond Eyes Natural — tablete za žvakanje protiv suznih tragova. " +
        "Rezultat vidljiv već nakon 3 nedelje. Za bele rase (Maltezer, Westy, " +
        "Shi-tzu...). Bez parabena i veštačkih dodataka. 30 tableta / 750 mg.",
      stock: "dostupno",
      // DEMO cena: oldPrice = estimirana redovna cena — POTVRDITI cenovnik
      // DEMO raspored: akcija (rail "Najveći popusti")
      badges: ["akcija"],
      rating: 4.7,
      unit: "30 tab",
    },
  ],
}
