"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"
import { productImages, type Product } from "../../data/shop"

export default function ProductGallery({
  product,
  discount = 0,
}: {
  product: Product
  discount?: number
}) {
  const images = productImages(product)
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const current = images[Math.min(index, images.length - 1)]

  const close = useCallback(() => setOpen(false), [])
  const next = useCallback(
    () => setIndex((i) => (i + 1) % images.length),
    [images.length]
  )
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + images.length) % images.length),
    [images.length]
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") next()
      if (e.key === "ArrowLeft") prev()
    }
    document.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, close, next, prev])

  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-brand-bg">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Uvećaj sliku"
          className="group block w-full cursor-zoom-in"
        >
          <Image
            src={current}
            alt={product.name}
            width={800}
            height={600}
            className="w-full h-72 sm:h-96 lg:h-[460px] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            priority
          />
        </button>

        <div className="absolute top-4 left-4 flex gap-2 pointer-events-none">
          {product.badges?.map((b) => (
            <span
              key={b}
              className={`text-xs font-bold px-3 py-1.5 rounded-full shadow ${
                b === "akcija"
                  ? "bg-red-500 text-white"
                  : b === "novo"
                    ? "bg-blue-500 text-white"
                    : "bg-brand-primary text-white"
              }`}
            >
              {b === "akcija"
                ? discount > 0
                  ? `Akcija -${discount}%`
                  : "Akcija"
                : b === "novo"
                  ? "Novo"
                  : "Naša preporuka"}
            </span>
          ))}
        </div>

        <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-xs font-semibold text-brand-dark px-3 py-1.5 rounded-full pointer-events-none opacity-90">
          <ZoomIn className="w-3.5 h-3.5" />
          Klik za uvećanje
        </div>

        {images.length > 1 && (
          <button
            type="button"
            onClick={prev}
            aria-label="Prethodna slika"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-brand-dark" />
          </button>
        )}
        {images.length > 1 && (
          <button
            type="button"
            onClick={next}
            aria-label="Sledeća slika"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-all"
          >
            <ChevronRight className="w-5 h-5 text-brand-dark" />
          </button>
        )}
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Slika ${i + 1}`}
              className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                i === index
                  ? "border-brand-primary"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              <Image
                src={src}
                alt={`${product.name} — slika ${i + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={product.name}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Zatvori"
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
          >
            <X className="w-6 h-6" />
          </button>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Prethodna slika"
              className="absolute left-3 md:left-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          <div
            className="relative max-w-5xl w-full max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current}
              alt={product.name}
              width={1400}
              height={1000}
              className="w-full max-h-[85vh] object-contain"
            />
            <p className="text-center text-white/80 text-sm mt-3">
              {product.name}
              {images.length > 1 && ` — ${index + 1}/${images.length}`}
            </p>
          </div>

          {images.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Sledeća slika"
              className="absolute right-3 md:right-8 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      )}
    </div>
  )
}
