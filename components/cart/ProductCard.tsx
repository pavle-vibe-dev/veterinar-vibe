"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, Plus } from "lucide-react"
import { formatPrice, getCategory, type Product } from "../../data/shop"
import { useCart } from "./CartProvider"

function badgeStyle(badge: string) {
  if (badge === "akcija") return "bg-red-500 text-white"
  if (badge === "novo") return "bg-blue-500 text-white"
  return "bg-brand-primary text-white"
}

function badgeLabel(badge: string) {
  if (badge === "akcija") return "Akcija"
  if (badge === "novo") return "Novo"
  return "Preporuka"
}

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const category = getCategory(product.category)
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0

  return (
    <motion.div
      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      whileHover={{ y: -4 }}
      layout
    >
      <Link
        href={`/prodavnica/${product.slug}`}
        className="relative block overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-40 sm:h-52 object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {product.badges?.map((b) => (
            <span
              key={b}
              className={`text-xs font-bold px-2.5 py-1 rounded-full ${badgeStyle(b)}`}
            >
              {b === "akcija" && discount > 0
                ? `-${discount}%`
                : badgeLabel(b)}
            </span>
          ))}
        </div>
        {product.stock !== "dostupno" && (
          <span className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-sm">
            {product.stock === "poslednji-komadi"
              ? "Poslednji komadi"
              : "Na upit"}
          </span>
        )}
      </Link>

      <div className="p-3 sm:p-5 flex flex-col flex-1">
        <div className="text-[11px] sm:text-xs text-brand-muted font-medium mb-1 line-clamp-2">
          {product.brand} • {category?.name} • {product.unit}
        </div>
        <Link href={`/prodavnica/${product.slug}`}>
          <h3 className="font-bold text-sm sm:text-base text-brand-dark leading-snug mb-2 hover:text-brand-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="hidden sm:block text-sm text-brand-muted line-clamp-2 mb-3">
          {product.shortDesc}
        </p>
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-semibold">{product.rating.toFixed(1)}</span>
        </div>

        <div className="mt-auto">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-2 sm:mb-3">
            <span className="text-base sm:text-xl font-bold text-brand-dark">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <span className="text-xs sm:text-sm text-slate-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => add(product.slug)}
              className="w-full inline-flex items-center justify-center gap-1.5 bg-brand-primary hover:bg-brand-primary-hover text-white font-bold py-2 sm:py-2.5 px-3 rounded-button text-xs sm:text-sm transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Dodaj u korpu
            </button>
            <Link
              href={`/prodavnica/${product.slug}`}
              className="w-full inline-flex items-center justify-center px-3 py-2 border-2 border-brand-primary/20 text-brand-primary font-bold rounded-button text-xs sm:text-sm hover:bg-emerald-50 transition-all"
            >
              Detalj
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
