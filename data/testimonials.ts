export type Testimonial = {
  id: number
  /** Ime kupca - za pravog klijenta koristiti prava imena uz dozvolu */
  name: string
  pet: string
  review: string
}

/**
 * =========================================================================
 *  RECENZIJE SU DEMO PODACI.
 *
 *  PRE ISPORUKE PRAVOM KLJENTU: postaviti `export const testimonials = []`
 *  i sekcija se automatski uklanja sa pocetne strane.
 *
 *  Izmisljene reference sa zvucnim imenima = lazna reklama.
 *  Klijent snosi odgovornost, ali i ti ako ga uputis da objavi.
 *  Prave recenzije se prikupljaju od stvarnih kupaca (uz njihovu saglasnost).
 * =========================================================================
 */
export const testimonials: Testimonial[] = [
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
]

/**
 * Google ocena se NE izmislja.
 *
 * Prikaz broja zvezdica i broja recenzija koje ne postoje je
 * konkretan navod koji moze da se prijavi. Zato je podrazumevano null
 * i blok se uopste ne renderuje.
 *
 * Kad klijent dobije prave recenzije, popuniti:
 *   export const googleReviews = { rating: 4.8, count: 63 }
 */
export const googleReviews: { rating: number; count: number } | null = null

/** Inicijali za avatar - bez spoljnih servisa (pravatar.cc) i bez trackinga */
export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
}
