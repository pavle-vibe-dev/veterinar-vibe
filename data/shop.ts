export interface Category {
  slug: string
  name: string
  description: string
  seo: string
  animal: "Psi" | "Mačke" | "Apoteka" | "Oprema"
}

export interface Subgroup {
  slug: string
  name: string
  category: string // category slug
  desc: string
}

export interface Product {
  slug: string
  name: string
  brand: string
  category: string // category slug
  sub: string // subgroup slug
  price: number // RSD
  oldPrice?: number
  image: string
  shortDesc: string
  description: string
  stock: "dostupno" | "poslednji-komadi" | "na-upit"
  badges?: ("akcija" | "novo" | "preporuka")[]
  rating: number
  unit: string // npr. "11.4kg", "3 tbl", "250ml"
}

export const categories: Category[] = [
  {
    slug: "hrana-psi",
    name: "Psi",
    description: "Granule, vlažna hrana i veterinarske dijete za pse",
    seo: "Kvalitetna hrana je osnova zdravlja psa. Držimo granule sa visokim udelom mesa, bez štetnih aditiva — birane prema uzrastu, veličini i aktivnosti ljubimca.",
    animal: "Psi",
  },
  {
    slug: "hrana-macke",
    name: "Mačke",
    description: "Suva i vlažna hrana i dijete za mačke",
    seo: "Mačke su izbirljive — zato držimo proverene formule bogate proteinima, uključujući medicinske dijete za mace sa osetljivim bubrezima i stomakom.",
    animal: "Mačke",
  },
  {
    slug: "apoteka",
    name: "Veterinarska apoteka",
    description: "Antiparazitici, vitamini, suplementi i probiotici",
    seo: "Zaštita od buva, krpelja i crevnih parazita, vitamini i probiotici za imunitet. Originalni preparati uz stručni savet apotekara.",
    animal: "Apoteka",
  },
  {
    slug: "oprema",
    name: "Oprema i kozmetika",
    description: "Transporteri, kreveti, šamponi, četke i igračke",
    seo: "Transporteri za put, udobni kreveti, blaga kozmetika i igračke — sve za negu, putovanja i igru vašeg ljubimca na jednom mestu.",
    animal: "Oprema",
  },
]

export const subgroups: Subgroup[] = [
  { slug: "granule-psi", name: "Granule za pse", category: "hrana-psi", desc: "Suva hrana za odrasle pse" },
  { slug: "granule-macke", name: "Granule za mačke", category: "hrana-macke", desc: "Suva hrana za mačke" },
  { slug: "dijete", name: "Veterinarske dijete", category: "hrana-macke", desc: "Medicinske formule uz savet veterinara" },
  { slug: "antiparazitici", name: "Antiparazitici", category: "apoteka", desc: "Tablete, ampule i ogrlice protiv buva i krpelja" },
  { slug: "vitamini", name: "Vitamini i suplementi", category: "apoteka", desc: "Za imunitet, zglobove i sjajnu dlaku" },
  { slug: "toaleti", name: "Toaleti i posip", category: "oprema", desc: "WC kutije i prirodni posipi" },
  { slug: "kozmetika", name: "Kozmetika i nega", category: "oprema", desc: "Šamponi, četke i preparati za negu" },
  { slug: "igracke", name: "Igračke", category: "oprema", desc: "Lopte i igračke za pse i mačke" },
  { slug: "kreveti", name: "Kreveti", category: "oprema", desc: "Udobni kreveti i ležaljke" },
  { slug: "transporteri", name: "Transporteri", category: "oprema", desc: "Za putovanja i posete veterinaru" },
]

export function getSubgroup(slug: string) {
  return subgroups.find((s) => s.slug === slug)
}

export function subgroupsOf(categorySlug: string) {
  return subgroups.filter((s) => s.category === categorySlug)
}

export function countSub(subSlug: string) {
  return products.filter((p) => p.sub === subSlug).length
}

export const brands = [
  "Acana",
  "Orijen",
  "Hills",
  "NexGard",
  "Bravecto",
  "Foresto",
  "Anima Strath",
  "Vethealth",
  "InterVet",
  "Trixie",
  "Rogz",
  "Duvo",
  "Fruity",
  "BG PET",
]

export const products: Product[] = [
  {
    slug: "acana-grass-fed-lamb-114kg",
    name: "Acana Grass-Fed Lamb, monoproteinska hrana za pse 11.4kg",
    brand: "Acana",
    category: "hrana-psi",
    sub: "granule-psi",
    price: 14990,
    image: "/products/acana-grass-fed-lamb-114kg.jpg",
    shortDesc: "Monoproteinska hrana sa jagnjetinom sa pašnjaka, bez žitarica.",
    description:
      "Acana Grass-Fed Lamb sa 60% jagnjetine, jabukom i bundevom. Monoproteinska formula pogodna za pse sa osetljivom probavom. Za odrasle pse svih rasa.",
    stock: "dostupno",
    badges: ["preporuka"],
    rating: 4.9,
    unit: "11.4kg",
  },
  {
    slug: "orijen-six-fish-macke-54kg",
    name: "Orijen Six Fish, hrana za mačke 5.4kg",
    brand: "Orijen",
    category: "hrana-macke",
    sub: "granule-macke",
    price: 11990,
    image: "/products/orijen-six-fish-macke-54kg.jpg",
    shortDesc: "Šest vrsta divlje ribe, 85% mesnih sastojaka.",
    description:
      "Orijen Six Fish sa divljim lososom, oslićem i smuđem. Visok udeo proteina i omega masnih kiselina za sjajnu dlaku i vitalnost mačaka.",
    stock: "dostupno",
    badges: ["preporuka"],
    rating: 4.8,
    unit: "5.4kg",
  },
  {
    slug: "hills-kd-macke-15kg",
    name: "Hills K/D, bubrežna dijeta za mačke 1.5kg",
    brand: "Hills",
    category: "hrana-macke",
    sub: "dijete",
    price: 2995,
    oldPrice: 3990,
    image: "/products/hills-kd-macke-15kg.jpg",
    shortDesc: "Medicinska dijeta za mačke sa bubrežnim problemima.",
    description:
      "Hills Prescription Diet k/d podržava funkciju bubrega, sa kontrolisanim fosforom, natrijumom i visokokvalitetnim proteinima. Koristiti uz savet veterinara.",
    stock: "dostupno",
    badges: ["akcija"],
    rating: 4.9,
    unit: "1.5kg",
  },
  {
    slug: "nexgard-spectra-s-3tbl",
    name: "NexGard Spectra S, tablete protiv buva i krpelja 3tbl",
    brand: "NexGard",
    category: "apoteka",
    sub: "antiparazitici",
    price: 5490,
    image: "/products/nexgard-spectra-s-3tbl.jpg",
    shortDesc: "Mesečna zaštita od buva, krpelja i crevnih parazita.",
    description:
      "NexGard Spectra za pse 3.5–7.5kg. Afoxolaner + milbemicin oksim. Ukusne tablete za žvakanje, zaštita 30 dana. Izdaje se bez recepta uz savet apotekara.",
    stock: "dostupno",
    badges: ["preporuka"],
    rating: 5.0,
    unit: "3 tablete",
  },
  {
    slug: "bravecto-tablete-psi",
    name: "Bravecto tablete protiv buva i krpelja za pse",
    brand: "Bravecto",
    category: "apoteka",
    sub: "antiparazitici",
    price: 4590,
    image: "/products/bravecto-tablete-psi.jpg",
    shortDesc: "Jedna tableta — 12 nedelja zaštite od buva i krpelja.",
    description:
      "Bravecto tablete za žvakanje sa fluralanerom. Deluju 12 nedelja protiv buva i krpelja. Doziranje prema telesnoj težini, uz savet veterinara.",
    stock: "dostupno",
    rating: 4.7,
    unit: "1 tableta",
  },
  {
    slug: "foresto-ogrlica-8kg",
    name: "Foresto ogrlica protiv buva i krpelja, do 8kg",
    brand: "Foresto",
    category: "apoteka",
    sub: "antiparazitici",
    price: 8990,
    image: "/products/foresto-ogrlica-8kg.jpg",
    shortDesc: "Ogrlica sa 8 meseci neprekidne zaštite, bez mirisa.",
    description:
      "Foresto ogrlica sa imidaklopridom i flumethrinom. Štiti do 8 meseci od buva, krpelja i vaši. Vodootporna, bez mirisa, za male pse i mačke do 8kg.",
    stock: "dostupno",
    rating: 4.8,
    unit: "1 ogrlica",
  },
  {
    slug: "anima-strath-250ml",
    name: "Anima Strath, dodatak ishrani 250ml",
    brand: "Anima Strath",
    category: "apoteka",
    sub: "vitamini",
    price: 2890,
    image: "/products/anima-strath-250ml.jpg",
    shortDesc: "Prirodni multivitamin za imunitet, dlaku i apetit.",
    description:
      "Tečni kvasac sa 61 nutrijentom — vitamini B grupe, aminokiseline, minerali. Za pse, mačke i male životinje. Jača imunitet i sjaj dlake.",
    stock: "dostupno",
    rating: 4.9,
    unit: "250ml",
  },
  {
    slug: "vethealth-cbd-ulje-8",
    name: "Vethealth CBD ulje, kapi za pse i mačke 8%",
    brand: "Vethealth",
    category: "apoteka",
    sub: "vitamini",
    price: 9720,
    image: "/products/vethealth-cbd-ulje-8.jpg",
    shortDesc: "Prirodna podrška kod stresa, bola i problema sa zglobovima.",
    description:
      "Vethealth CBD kapi 8% od industrijske konoplje. Za smirenje, podršku zglobovima i apetit kod pasa i mačaka. Doziranje prema težini, uz savet veterinara.",
    stock: "dostupno",
    badges: ["novo"],
    rating: 4.7,
    unit: "30ml",
  },
  {
    slug: "probiovet-forte-40tbl",
    name: "ProbioVet Forte 40, probiotik 40 tableta",
    brand: "InterVet",
    category: "apoteka",
    sub: "vitamini",
    price: 450,
    image: "/products/probiovet-forte-40tbl.jpg",
    shortDesc: "Za digestiju i imunitet pasa i mačaka.",
    description:
      "Probiotski kompleks sa prebioticima. Kod proliva, posle antibiotika i promene hrane. 40 ukusnih tableta.",
    stock: "dostupno",
    badges: ["novo"],
    rating: 4.7,
    unit: "40 tableta",
  },
  {
    slug: "trixie-wc-kutija-sa-sitom",
    name: "Trixie Berto WC kutija za mačke sa sitom",
    brand: "Trixie",
    category: "oprema",
    sub: "toaleti",
    price: 3190,
    image: "/products/trixie-wc-kutija-sa-sitom.jpg",
    shortDesc: "Praktična kutija 39×22×59cm sa sistemom sita.",
    description:
      "Trixie Berto sa sitom za lako čišćenje peleta i posipa. Visoke ivice, poklopac i ručka za nošenje. Za pelet i grudvajući posip.",
    stock: "poslednji-komadi",
    badges: ["novo"],
    rating: 4.5,
    unit: "1 kom",
  },
  {
    slug: "drveni-pelet-posip-5kg",
    name: "Drveni pelet posip za mačke 5kg",
    brand: "BG PET",
    category: "oprema",
    sub: "toaleti",
    price: 650,
    image: "/products/drveni-pelet-posip-5kg.jpg",
    shortDesc: "Prirodan, upijajući posip bez mirisa.",
    description:
      "100% prirodni drveni pelet. Odlična apsorpcija, neutrališe mirise, kompostabilan. Za mačke i male glodare.",
    stock: "dostupno",
    badges: ["novo"],
    rating: 4.6,
    unit: "5kg",
  },
  {
    slug: "fruity-sampon-banana-250ml",
    name: "Fruity šampon za pse i mačke, banana 250ml",
    brand: "Fruity",
    category: "oprema",
    sub: "kozmetika",
    price: 790,
    image: "/products/fruity-sampon-banana-250ml.jpg",
    shortDesc: "Blagi šampon prijatnog mirisa banane.",
    description:
      "Fruity šampon za redovno kupanje pasa i mačaka. Ne iritira oči, ostavlja dlaku mekanom i mirišljavom. Pakovanje 250ml.",
    stock: "dostupno",
    rating: 4.5,
    unit: "250ml",
  },
  {
    slug: "trixie-cetka-cesalj-27cm",
    name: "Trixie četka-češalj za pse i mačke 27cm",
    brand: "Trixie",
    category: "oprema",
    sub: "kozmetika",
    price: 1590,
    image: "/products/trixie-cetka-cesalj-27cm.jpg",
    shortDesc: "Dvostrana četka za svakodnevnu negu dlake.",
    description:
      "Trixie kombinovana četka — sa jedne strane meka četka, sa druge metalni češalj. Za uklanjanje opale dlake i raščešljavanje. Dužina 27cm.",
    stock: "dostupno",
    rating: 4.6,
    unit: "27cm",
  },
  {
    slug: "rogz-grinz-lopta-crvena",
    name: "Rogz Grinz lopta za poslastice, crvena",
    brand: "Rogz",
    category: "oprema",
    sub: "igracke",
    price: 1490,
    image: "/products/rogz-grinz-lopta-crvena.jpg",
    shortDesc: "Gumena lopta sa zubima — puni se poslasticama.",
    description:
      "Rogz Grinz od izdržljive gume sa žljebovima za poslastice. Zabava i nagrada u jednom, podstiče žvakanje i igru. Crvena, plutajuća.",
    stock: "dostupno",
    badges: ["preporuka"],
    rating: 4.8,
    unit: "1 kom",
  },
  {
    slug: "duvo-krevet-marquise-gold-85cm",
    name: "Duvo Marquoise Gold krevet za pse 85×70cm",
    brand: "Duvo",
    category: "oprema",
    sub: "kreveti",
    price: 5990,
    oldPrice: 7490,
    image: "/products/duvo-krevet-marquise-gold-85cm.jpg",
    shortDesc: "Udobna pravougaona korpa sa vađenim jastukom.",
    description:
      "Duvo Marquoise Gold krevet-korpa 85×70cm sa mekanim jastukom na patent zatvarač. Periva navlaka, elegantan dezen. Za srednje i velike pse.",
    stock: "poslednji-komadi",
    badges: ["akcija"],
    rating: 4.7,
    unit: "85cm",
  },
  {
    slug: "trixie-transporter-capri-eco",
    name: "Trixie Capri ECO transporter za pse i mačke",
    brand: "Trixie",
    category: "oprema",
    sub: "transporteri",
    price: 7490,
    image: "/products/trixie-transporter-capri-eco.jpg",
    shortDesc: "Plastični transporter od recikliranog materijala.",
    description:
      "Trixie Capri ECO od ekološke plastike, sa metalnim vratima i ventilacijom. Pogodan za putovanja i posete veterinaru. Za mačke i male pse.",
    stock: "na-upit",
    rating: 4.8,
    unit: "M veličina",
  },
]

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function formatPrice(value: number) {
  return (
    value.toLocaleString("sr-RS", { maximumFractionDigits: 0 }) + " RSD"
  )
}
