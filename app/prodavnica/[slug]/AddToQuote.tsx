"use client"

import { useState } from "react"
import Link from "next/link"
import { useCart } from "../../../components/cart/CartProvider"
import { formatPrice, getProduct } from "../../../data/shop"

export default function AddToQuote({ slug }: { slug: string }) {
  const { add } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    add(slug, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="flex items-center border border-slate-200 rounded-button overflow-hidden">
        <button
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="px-4 py-3 font-bold text-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Smanji količinu"
        >
          −
        </button>
        <span className="px-4 font-bold min-w-10 text-center">{qty}</span>
        <button
          onClick={() => setQty((q) => Math.min(99, q + 1))}
          className="px-4 py-3 font-bold text-lg hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Povećaj količinu"
        >
          +
        </button>
      </div>
      <button
        onClick={handleAdd}
        className="flex-1 bg-brand-primary hover:bg-brand-primary-hover text-white font-bold py-3 px-6 rounded-button transition-all cursor-pointer"
      >
        {added ? "✓ Dodato u upit!" : "Dodaj u upit"}
      </button>
      <Link
        href="/upit"
        className="inline-flex items-center justify-center px-6 py-3 border-2 border-brand-primary/20 text-brand-primary font-bold rounded-button hover:bg-emerald-50 transition-all"
      >
        Pogledaj upit
      </Link>
    </div>
  )
}

export function QuoteSummaryLine({ slug, qty }: { slug: string; qty: number }) {
  const p = getProduct(slug)
  if (!p) return null
  return (
    <span>
      {p.name} × {qty} = {formatPrice(p.price * qty)}
    </span>
  )
}
