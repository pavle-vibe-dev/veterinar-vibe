"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Search, Package, CornerDownLeft } from "lucide-react"
import { products, formatPrice } from "../data/shop"

const MAX_SUGGESTIONS = 6

export default function SearchAutocomplete({
  placeholder = "Pretraga: npr. hills, nexgard, transporter...",
  autoFocus = false,
}: {
  placeholder?: string
  autoFocus?: boolean
}) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const wrapRef = useRef<HTMLDivElement>(null)

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return products
      .filter((p) =>
        `${p.name} ${p.brand} ${p.shortDesc}`.toLowerCase().includes(q)
      )
      .slice(0, MAX_SUGGESTIONS)
  }, [query])

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false)
        setActive(-1)
      }
    }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [])

  const goSearch = (q: string) => {
    setOpen(false)
    setActive(-1)
    router.push(q.trim() ? `/prodavnica?q=${encodeURIComponent(q.trim())}` : "/prodavnica")
  }

  const goProduct = (slug: string) => {
    setOpen(false)
    setActive(-1)
    setQuery("")
    router.push(`/prodavnica/${slug}`)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const rows = suggestions.length + (query.trim() ? 1 : 0)
    if (e.key === "ArrowDown" && rows > 0) {
      e.preventDefault()
      setOpen(true)
      setActive((i) => (i + 1) % rows)
    } else if (e.key === "ArrowUp" && rows > 0) {
      e.preventDefault()
      setActive((i) => (i - 1 + rows) % rows)
    } else if (e.key === "Enter") {
      e.preventDefault()
      if (active >= 0 && active < suggestions.length) {
        goProduct(suggestions[active].slug)
      } else {
        goSearch(query)
      }
    } else if (e.key === "Escape") {
      setOpen(false)
      setActive(-1)
    }
  }

  const show = open && query.trim().length > 0

  return (
    <div ref={wrapRef} className="relative">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (active >= 0 && active < suggestions.length) {
            goProduct(suggestions[active].slug)
          } else {
            goSearch(query)
          }
        }}
        className="flex flex-col sm:flex-row gap-3 max-w-xl"
      >
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 z-10" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
              setActive(-1)
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            autoFocus={autoFocus}
            role="combobox"
            aria-expanded={show}
            aria-controls="search-suggestions"
            aria-autocomplete="list"
            className="w-full pl-11 pr-4 py-4 rounded-2xl text-brand-dark placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-300/50 shadow-xl bg-white"
          />
        </div>
        <button
          type="submit"
          className="bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold px-8 py-4 rounded-2xl transition-all shadow-xl cursor-pointer"
        >
          Pretraži
        </button>
      </form>

      {show && (
        <div
          id="search-suggestions"
          role="listbox"
          className="absolute z-40 mt-2 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
        >
          {suggestions.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => {
                e.preventDefault()
                goProduct(p.slug)
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                i === active ? "bg-emerald-50" : "bg-white"
              }`}
            >
              <span className="relative w-10 h-10 rounded-lg bg-brand-bg overflow-hidden shrink-0">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-brand-dark truncate">
                  {p.name}
                </span>
                <span className="block text-xs text-brand-muted truncate">
                  {p.brand} • {p.unit}
                </span>
              </span>
              <span className="text-sm font-bold text-brand-dark shrink-0">
                {formatPrice(p.price)}
              </span>
            </button>
          ))}

          <button
            type="button"
            onMouseDown={(e) => {
              e.preventDefault()
              goSearch(query)
            }}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 border-t border-slate-100 text-left transition-colors ${
              active === suggestions.length ? "bg-emerald-50" : "bg-slate-50"
            }`}
          >
            <span className="flex items-center gap-2 text-sm font-semibold text-brand-dark">
              <Package className="w-4 h-4 text-brand-primary" />
              Svi rezultati za „{query.trim()}“
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-brand-muted">
              Enter
              <CornerDownLeft className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
