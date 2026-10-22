"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { products, categories, subgroups } from "../data/shop"

/**
 * "Istražite po vrsti ljubimca" — veliki krugovi sa slikom (uzor Premium Pet).
 * Pločice se izvlače iz AKTIVNOG kataloga: prvo vrste ljubimaca (Psi/Mačke sa
 * slikom), pa potkategorije koje imaju proizvode, pa kategorije čiji proizvodi
 * nisu pokriveni prikazanim potkategorijama. Ništa ne vodi u prazno.
 * Horizontalni rail na SVIM velikim ekranima, sa strelicama uvek dostupnim.
 */

type Tile = {
  label: string
  image: string
  fit: "photo" | "product"
  href: string
  count: number
}

const typePhotos: Record<string, string> = {
  "hrana-psi": "/categories/pas.jpg",
  "hrana-macke": "/categories/macka.jpg",
}

function buildTiles(): Tile[] {
  const tiles: Tile[] = []
  const shownSubs = new Set<string>()

  // 1) Vrste ljubimaca (Psi / Mačke) — uvek prve, foto krug
  for (const c of categories) {
    if (!typePhotos[c.slug]) continue
    const count = products.filter((p) => p.category === c.slug).length
    if (count === 0) continue
    tiles.push({
      label: c.name,
      image: typePhotos[c.slug],
      fit: "photo",
      href: `/prodavnica?category=${c.slug}`,
      count,
    })
  }

  // 2) Potkategorije sa proizvodima (u redosledu deklaracije)
  for (const s of subgroups) {
    const count = products.filter((p) => p.sub === s.slug).length
    if (count === 0) continue
    shownSubs.add(s.slug)
    tiles.push({
      label: s.name,
      image: products.find((p) => p.sub === s.slug)!.image,
      fit: "product",
      href: `/prodavnica?category=${s.category}&sub=${s.slug}`,
      count,
    })
  }

  // 3) Druge kategorije čiji proizvodi nisu pokriveni prikazanim
  //    potkategorijama (npr. "Veterinarska apoteka")
  for (const c of categories) {
    if (typePhotos[c.slug]) continue
    const subsOfCat = new Set(
      subgroups.filter((s) => s.category === c.slug).map((s) => s.slug)
    )
    const count = products.filter(
      (p) => p.category === c.slug && !subsOfCat.has(p.sub)
    ).length
    if (count === 0) continue
    tiles.push({
      label: c.name,
      image: products.find((p) => p.category === c.slug)!.image,
      fit: "product",
      href: `/prodavnica?category=${c.slug}`,
      count,
    })
  }

  return tiles
}

function countLabel(n: number) {
  return n === 1 ? "1 proizvod" : `${n} proizvoda`
}

export default function PetTypeRail() {
  const [tiles] = useState<Tile[]>(buildTiles)
  const railRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const update = () => {
    const el = railRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    update()
    const el = railRef.current
    if (!el) return
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  function step(dir: 1 | -1) {
    const el = railRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: "smooth" })
  }

  if (tiles.length === 0) return null

  const arrowClass =
    "absolute top-[68px] sm:top-[76px] md:top-[90px] lg:top-[98px] -translate-y-1/2 z-20 h-9 w-9 md:h-11 md:w-11 flex items-center justify-center rounded-full bg-white text-brand-dark shadow-[0_6px_22px_rgba(15,23,42,0.22)] border border-slate-100 cursor-pointer transition-all hover:bg-brand-primary hover:text-white hover:border-brand-primary active:scale-95 disabled:opacity-0 disabled:cursor-default"

  return (
    <section className="py-9 md:py-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-2 md:mb-3">
          <p className="text-[10px] md:text-xs font-bold text-brand-primary uppercase tracking-[0.2em] mb-1.5">
            Kategorije
          </p>
          <h2 className="text-[20px] sm:text-2xl md:text-[30px] font-bold text-brand-dark tracking-tight leading-tight">
            Najtraženije kategorije
          </h2>
        </div>

        <div className="relative">
          <div
            ref={railRef}
            onScroll={update}
            className="no-scrollbar -mx-4 sm:mx-0 flex snap-x gap-3 md:gap-6 overflow-x-auto px-5 sm:px-6 lg:px-10 py-3 md:py-4"
          >
            {tiles.map((t) => (
              <Link
                key={t.href + t.label}
                href={t.href}
                className="group flex w-[112px] shrink-0 snap-start flex-col items-center sm:w-[128px] md:w-[148px] lg:w-[164px]"
              >
                <div
                  className={`aspect-square w-full rounded-full overflow-hidden bg-brand-50 ring-2 transition-all shadow-sm group-hover:shadow-md ${
                    t.fit === "photo"
                      ? "ring-brand-100 group-hover:ring-brand-primary"
                      : "ring-transparent group-hover:ring-brand-primary"
                  }`}
                >
                  <Image
                    src={t.image}
                    alt={t.label}
                    width={300}
                    height={300}
                    className={`w-full h-full transition-transform duration-300 group-hover:scale-105 ${
                      t.fit === "product" ? "object-contain p-4 md:p-5" : "object-cover"
                    }`}
                  />
                </div>
                <p className="mt-2 md:mt-2.5 text-[12px] sm:text-[12.5px] md:text-sm font-bold text-brand-dark text-center leading-tight group-hover:text-brand-primary transition-colors">
                  {t.label}
                </p>
                <p className="mt-0.5 text-[11px] md:text-xs text-brand-muted">
                  {countLabel(t.count)}
                </p>
              </Link>
            ))}
          </div>

          {/* Strelice — uvek vidljive (mobilni, tablet, desktop) */}
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={!canPrev}
            aria-label="Prethodne kategorije"
            className={`${arrowClass} left-0 md:-left-2`}
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            disabled={!canNext}
            aria-label="Sledeće kategorije"
            className={`${arrowClass} right-0 md:-right-2`}
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>
      </div>
    </section>
  )
}
