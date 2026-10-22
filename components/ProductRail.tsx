"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { Product } from "../data/shop"
import ProductCard from "./cart/ProductCard"

/**
 * Horizontalni rail proizvoda — swipe na mobilnom, a na tabletu/desktopu
 * isti "carousel" sa strelicama (klik mišem) i strelkama na tastaturi
 * kada je rail u fokusu (Tab do njega ili klik unutar njega).
 *
 * fadeFrom: boja pozadine sekcije ("from-white" ili "from-brand-bg") —
 * služi za blagi gradient na desnoj ivici koji nagoveštava da ima još.
 */
export default function ProductRail({
  products,
  fadeFrom = "from-white",
}: {
  products: Product[]
  fadeFrom?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const update = () => {
    const el = trackRef.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  // Prati promene velicine (resize / ucitavanje slika menja visinu, ne sirinu)
  useEffect(() => {
    update()
    const el = trackRef.current
    if (!el) return
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  function step(dir: 1 | -1) {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: dir * el.clientWidth * 0.92, behavior: "smooth" })
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") {
      e.preventDefault()
      e.stopPropagation()
      step(-1)
    } else if (e.key === "ArrowRight") {
      e.preventDefault()
      e.stopPropagation()
      step(1)
    }
  }

  const arrowClass =
    "flex absolute top-[42%] -translate-y-1/2 z-20 h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full bg-white text-brand-dark shadow-[0_6px_20px_rgba(15,23,42,0.18)] border border-slate-200 cursor-pointer transition-all hover:bg-brand-primary hover:text-white hover:border-brand-primary active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 disabled:opacity-0 disabled:cursor-default"

  return (
    <div className="relative md:-mx-4 lg:-mx-6">
      <div
        ref={trackRef}
        onScroll={update}
        tabIndex={0}
        onKeyDown={onKey}
        aria-label="Lista proizvoda — skrol levo/desno"
        className="no-scrollbar -mx-4 md:mx-0 flex snap-x snap-mandatory gap-2.5 sm:gap-3 lg:gap-6 overflow-x-auto px-4 md:px-6 lg:px-8 pb-1 focus-visible:ring-2 focus-visible:ring-brand-primary/40 rounded-xl"
      >
        {products.map((p) => (
          <div
            key={p.slug}
            className="w-[52%] sm:w-[38%] md:w-[31%] lg:w-[23.2%] shrink-0 snap-start"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>

      {/* Strelice — uvek vidljive dok rail ima šta da skroluje */}
      <button
        type="button"
        onClick={() => step(-1)}
        disabled={!canPrev}
        aria-label="Prethodni proizvodi"
        className={`${arrowClass} -left-1.5 md:-left-2 lg:-left-3`}
      >
        <ChevronLeft className="h-4.5 w-4.5 md:h-5 md:w-5" />
      </button>
      <button
        type="button"
        onClick={() => step(1)}
        disabled={!canNext}
        aria-label="Sledeći proizvodi"
        className={`${arrowClass} -right-1.5 md:-right-2 lg:-right-3`}
      >
        <ChevronRight className="h-4.5 w-4.5 md:h-5 md:w-5" />
      </button>

      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l ${fadeFrom} to-transparent md:hidden`}
      />
    </div>
  )
}
