"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus, Check } from "lucide-react"
import { formatPrice, getProduct } from "../../data/shop"
import { useCart } from "../cart/CartProvider"

export default function InlineProduct({ slug }: { slug: string }) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  const product = getProduct(slug)

  if (!product) return null

  const handleAdd = () => {
    add(product.slug)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <span className="my-6 flex flex-col sm:flex-row sm:items-center gap-3 bg-white border border-emerald-100 rounded-2xl p-4 shadow-sm">
      <span className="flex items-center gap-3 flex-1 min-w-0">
        <Link
          href={`/prodavnica/${product.slug}`}
          className="shrink-0"
        >
          <Image
            src={product.image}
            alt={product.name}
            width={96}
            height={96}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover"
          />
        </Link>
        <span className="flex-1 min-w-0">
          <Link
            href={`/prodavnica/${product.slug}`}
            className="block font-bold text-brand-dark leading-snug hover:text-brand-primary transition-colors line-clamp-2"
          >
            {product.name}
          </Link>
          <span className="block font-bold text-brand-primary mt-1 whitespace-nowrap">
            {formatPrice(product.price)}
          </span>
        </span>
      </span>
      <button
        onClick={handleAdd}
        className={`w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 font-bold py-2.5 px-4 rounded-button text-sm transition-all cursor-pointer ${
          added
            ? "bg-emerald-100 text-emerald-700"
            : "bg-brand-primary hover:bg-brand-primary-hover text-white"
        }`}
      >
        {added ? (
          <>
            <Check className="w-4 h-4" /> U upitu!
          </>
        ) : (
          <>
            <Plus className="w-4 h-4" /> Dodaj u korpu
          </>
        )}
      </button>
    </span>
  )
}
