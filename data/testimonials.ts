import { tenant } from "./tenants"
import type { Testimonial } from "./tenants/types"

export type { Testimonial, GoogleReviews } from "./tenants/types"

/**
 * =========================================================================
 *  RECENZIJE SE NALAZE U DATA/TENANTS/<id>.ts (po klijentu).
 *
 *  Za bg-pet (demo) su ostavljene demo recenzije — taj brend i jeste demo.
 *
 *  PRE ISPORUKE PRAVOM KLJENTU: u njegovom tenant fajlu ostaviti
 *  `testimonials: []` — sekcija se automatski uklanja sa pocetne strane.
 *
 *  Izmisljene reference sa zvucnim imenima = lazna reklama.
 *  Klijent snosi odgovornost, ali i ti ako ga uputis da objavi.
 *  Prave recenzije se prikupljaju od stvarnih kupaca (uz njihovu saglasnost).
 * =========================================================================
 */
export const testimonials: Testimonial[] = tenant.testimonials

/** Google ocena aktivnog tenanta — null = blok se uopste ne renderuje */
export const googleReviews = tenant.googleReviews

/** Inicijali za avatar - bez spoljnih servisa (pravatar.cc) i bez trackinga */
export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
}
