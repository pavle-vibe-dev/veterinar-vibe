"use client"

import type { Product } from "../data/shop"
import ProductCard from "./cart/ProductCard"

/**
 * Horizontalni "swipe" rail za mobilni (snap scroll + peek sledeće kartice),
 * a na tabletu/desktopu normalna mreža (2 kolone / 4 kolone).
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
  return (
    <div className="relative">
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-1 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0">
        {products.map((p) => (
          <div
            key={p.slug}
            className="w-[52%] sm:w-[38%] md:w-[30%] shrink-0 snap-start lg:w-auto lg:shrink"
          >
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      <div
        className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l ${fadeFrom} to-transparent lg:hidden`}
      />
    </div>
  )
}
