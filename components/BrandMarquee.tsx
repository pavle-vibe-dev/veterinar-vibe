import Link from "next/link"
import { BrandWordmark, brandPalette } from "./BrandTile"

/**
 * "Brendova kojima verujete" — marquee traka logotipa (uzor Premium Pet).
 * Traka se sama kreće (CSS animacija), STAJE kad mišem dođeš na bilo koji
 * brend (ihover na traku pauzira animaciju), i radi od desktopa do mobilne.
 * Logotipi su ista stilizovana "wordmark" pločica kao u BRENDOVI gridu —
 * pravi logo fajlovi se kasnije zamenjuju kroz public/brands/.
 */
export default function BrandMarquee({ brands }: { brands: string[] }) {
  if (brands.length === 0) return null

  return (
    <section className="py-9 md:py-14 bg-white border-y border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-3 md:gap-4 mb-5 md:mb-8">
          <div>
            <p className="text-[10px] md:text-xs font-bold text-brand-primary uppercase tracking-[0.18em] mb-1 md:mb-2">
              Širok asortiman
            </p>
            <h2 className="text-[21px] sm:text-2xl md:text-[30px] font-bold text-brand-dark tracking-tight leading-tight">
              Brendova kojima <span className="text-brand-primary">verujete</span>
            </h2>
          </div>
          <Link
            href="/prodavnica"
            className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-brand-primary hover:gap-2 transition-all shrink-0 pb-0.5"
          >
            Svi brendovi
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* Marquee traka — full-bleed, pauza na hover */}
      <div className="relative group/marquee">
        <div className="overflow-hidden">
          <div className="flex w-max gap-3 md:gap-4 animate-marquee group-hover/marquee:[animation-play-state:paused]">
            {[0, 1].map((group) => (
              <div
                key={group}
                className="flex shrink-0 gap-3 md:gap-4"
                aria-hidden={group === 1}
              >
                {brands.map((b) => (
                  <Link
                    key={`${b}-${group}`}
                    href={`/prodavnica?brand=${encodeURIComponent(b)}`}
                    tabIndex={group === 1 ? -1 : undefined}
                    className="flex h-[96px] w-[168px] sm:h-[112px] sm:w-[196px] md:h-[124px] md:w-[220px] shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 shadow-[0_1px_6px_rgba(15,23,42,0.05)] transition-all hover:border-brand-primary/60 hover:shadow-md"
                    aria-label={`Brend ${b} — pogledaj proizvode`}
                  >
                    <div className="h-full w-full">
                      <BrandWordmark name={b} palette={brandPalette(b)} />
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Izbledovane ivice da traka "ulazi" i "izlazi" */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 md:w-20 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 md:w-20 bg-gradient-to-l from-white to-transparent" />
      </div>

      <p className="text-center text-sm text-brand-muted mt-6">
        + još 300 brendova dostupno po porudžbini — pošaljite nam{" "}
        <Link href="/kontakt" className="font-bold text-brand-primary">
          upit
        </Link>
        .
      </p>
    </section>
  )
}
