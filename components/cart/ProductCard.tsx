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
      className="group bg-white rounded-xl overflow-hidden border border-slate-100 shadow-[0_1px_2px_rgba(15,23,42,0.06)] hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
      layout
    >
      <Link
        href={`/prodavnica/${product.slug}`}
        className="relative block overflow-hidden bg-slate-50"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="w-full aspect-square object-contain p-2 sm:p-3 group-hover:scale-[1.04] transition-transform duration-300"
        />
        <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 flex flex-wrap gap-1">
          {product.badges?.map((b) => (
            <span
              key={b}
              className={`text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md leading-tight ${badgeStyle(b)}`}
            >
              {b === "akcija" && discount > 0
                ? `-${discount}%`
                : badgeLabel(b)}
            </span>
          ))}
        </div>
        {product.stock !== "dostupno" && (
          <span className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 text-[9px] sm:text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-black/60 text-white backdrop-blur-sm leading-tight">
            {product.stock === "poslednji-komadi" ? "Zadnji komadi" : "Na upit"}
          </span>
        )}
      </Link>

      <div className="p-2 sm:p-3 flex flex-col flex-1">
        <p className="text-[9px] sm:text-[10px] uppercase tracking-wide text-slate-400 font-semibold truncate">
          {product.brand} · {category?.name}
        </p>
        <Link href={`/prodavnica/${product.slug}`}>
          <h3 className="text-[12px] sm:text-sm font-semibold text-brand-dark leading-snug line-clamp-2 mt-0.5 min-h-[2.6em] group-hover:text-brand-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1 mt-1">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400 shrink-0" />
          <span className="text-[10px] sm:text-xs font-semibold text-brand-dark">
            {product.rating.toFixed(1)}
          </span>
        </div>

        <div className="mt-auto pt-1.5 sm:pt-2 flex items-end justify-between gap-1.5">
          <div className="min-w-0">
            {product.oldPrice && (
              <p className="text-[10px] text-slate-400 line-through leading-none mb-0.5">
                {formatPrice(product.oldPrice)}
              </p>
            )}
            <p className="text-[13px] sm:text-base font-extrabold text-brand-dark leading-none whitespace-nowrap">
              {formatPrice(product.price)}
            </p>
            <p className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 truncate">
              {product.unit}
            </p>
          </div>
          <button
            onClick={() => add(product.slug)}
            aria-label={`Dodaj ${product.name} u korpu`}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white flex items-center justify-center shrink-0 transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
