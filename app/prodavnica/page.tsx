"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react"
import {
  brands,
  categories,
  subgroups,
  subgroupsOf,
  countSub,
  getCategory,
  getSubgroup,
  products,
} from "../../data/shop"
import ProductCard from "../../components/cart/ProductCard"
import Canonical from "../../components/Canonical"
import { isPetShop } from "../../data/shop-info"

type SortKey = "popular" | "price-asc" | "price-desc" | "name"

/** Koliko proizvoda se prikazuje odjednom (ostatak ide na "Učitaj još") */
const PAGE_SIZE = 12

function LoadMore({
  remaining,
  shown,
  onLoadMore,
}: {
  remaining: number
  shown: number
  onLoadMore: () => void
}) {
  if (remaining <= 0) return null
  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      <button
        onClick={onLoadMore}
        className="btn-outline px-8 py-3.5 cursor-pointer"
      >
        Učitaj još ({remaining})
      </button>
      <p className="text-xs text-brand-muted">
        Prikazano {shown} od {shown + remaining} proizvoda
      </p>
    </div>
  )
}

function ProdavnicaContent() {
  const searchParams = useSearchParams()
  const validCategory = (v: string | null) =>
    v && (v === "sve" || categories.some((c) => c.slug === v)) ? v : "sve"
  const validBrand = (v: string | null) =>
    v && (v === "svi" || brands.includes(v)) ? v : "svi"
  const validSub = (v: string | null) =>
    v && subgroups.some((s) => s.slug === v) ? v : "sve"
  const [query, setQuery] = useState(() => searchParams.get("q") || "")
  const [activeCategory, setActiveCategory] = useState(
    () => validCategory(searchParams.get("category")) as string
  )
  const [activeBrand, setActiveBrand] = useState(
    () => validBrand(searchParams.get("brand")) as string
  )
  const [activeSub, setActiveSub] = useState(
    () => validSub(searchParams.get("sub")) as string
  )
  const [onlyAction, setOnlyAction] = useState(
    () => searchParams.get("akcija") === "1"
  )
  const [sort, setSort] = useState<SortKey>("popular")
  const [showFilters, setShowFilters] = useState(false)
  /** Koliko je kartica učitano, po kombinaciji filtera (ključ = filterSig) */
  const [visibleMap, setVisibleMap] = useState<Record<string, number>>({})

  // Sinhronizacija kad se dođe linkom (npr. ?category=apoteka&sub=vitamini)
  // searchParams je spoljašnji izvor — React preporučuje key prop umesto ovoga,
  // ali filteri se menjaju i iz same forme pa stanje mora da živi u state-u.
  /* eslint-disable react-hooks/set-state-in-effect -- sync sa URL query parametrima */
  useEffect(() => {
    const q = searchParams.get("q")
    setQuery(q || "")
    setActiveCategory(validCategory(searchParams.get("category")) as string)
    setActiveBrand(validBrand(searchParams.get("brand")) as string)
    setActiveSub(validSub(searchParams.get("sub")) as string)
    setOnlyAction(searchParams.get("akcija") === "1")
  }, [searchParams])
  /* eslint-enable react-hooks/set-state-in-effect */

  const hasQ = query.trim() !== ""
  const hasCat = activeCategory !== "sve"
  const hasSub = activeSub !== "sve"
  const hasBrand = activeBrand !== "svi"

  const visibleSubs =
    activeCategory === "sve" ? subgroups : subgroupsOf(activeCategory)

  const filtered = useMemo(() => {
    let list = [...products]
    if (activeCategory !== "sve") {
      list = list.filter((p) => p.category === activeCategory)
    }
    if (activeSub !== "sve") {
      list = list.filter((p) => p.sub === activeSub)
    }
    if (activeBrand !== "svi") {
      list = list.filter((p) => p.brand === activeBrand)
    }
    if (onlyAction) {
      list = list.filter((p) => p.badges?.includes("akcija"))
    }
    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter((p) =>
        `${p.name} ${p.brand} ${p.shortDesc}`.toLowerCase().includes(q)
      )
    }
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        list.sort((a, b) => b.price - a.price)
        break
      case "name":
        list.sort((a, b) => a.name.localeCompare(b.name, "sr"))
        break
      default:
        list.sort((a, b) => b.rating - a.rating)
    }
    return list
  }, [query, activeCategory, activeSub, activeBrand, onlyAction, sort])

  // Potpis filtera — kad se promeni, lista se vraća na prvu stranicu
  const filterSig = `${query}|${activeCategory}|${activeSub}|${activeBrand}|${onlyAction}|${sort}`
  const visible = visibleMap[filterSig] ?? PAGE_SIZE
  const shown = filtered.slice(0, visible)
  const remaining = filtered.length - shown.length
  const loadMore = () =>
    setVisibleMap((m) => ({
      ...m,
      [filterSig]: (m[filterSig] ?? PAGE_SIZE) + PAGE_SIZE,
    }))

  const resetAll = () => {
    setQuery("")
    setActiveCategory("sve")
    setActiveSub("sve")
    setActiveBrand("svi")
    setOnlyAction(false)
  }

  const activeCat = getCategory(activeCategory)
  const activeSg = getSubgroup(activeSub)

  const activeChips: { key: string; label: string; clear: () => void }[] = []
  if (hasCat && activeCat)
    activeChips.push({
      key: "cat",
      label: activeCat.name,
      clear: () => {
        setActiveCategory("sve")
        setActiveSub("sve")
      },
    })
  if (hasSub && activeSg)
    activeChips.push({
      key: "sub",
      label: activeSg.name,
      clear: () => setActiveSub("sve"),
    })
  if (hasBrand)
    activeChips.push({
      key: "brand",
      label: activeBrand,
      clear: () => setActiveBrand("svi"),
    })
  if (hasQ)
    activeChips.push({
      key: "q",
      label: `„${query.trim()}”`,
      clear: () => setQuery(""),
    })
  if (onlyAction)
    activeChips.push({
      key: "akcija",
      label: "Samo akcije",
      clear: () => setOnlyAction(false),
    })

  const pickCat = (slug: string) => {
    setActiveCategory(slug)
    setActiveSub("sve")
  }

  /* ---------- LISTA sa filterima ---------- */
  const listContent = (
    <div className="min-h-screen bg-brand-bg overflow-x-hidden">
      <section className="pt-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-brand-muted mt-6">
            <Link href="/" className="hover:text-brand-primary">
              Početna
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/prodavnica" className="hover:text-brand-primary">
              Prodavnica
            </Link>
            {activeCat && activeCategory !== "sve" && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="font-semibold text-brand-dark">
                  {activeCat.name}
                </span>
              </>
            )}
            {activeSg && activeSub !== "sve" && (
              <>
                <ChevronRight className="w-4 h-4" />
                <span className="font-semibold text-brand-dark">
                  {activeSg.name}
                </span>
              </>
            )}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold text-brand-primary uppercase tracking-wide mt-4">
              Internet prodavnica na upit — bez plaćanja karticom
            </p>
            <h1 className="h1 mt-2 mb-3">
              {activeCategory === "sve" ? "Svi proizvodi" : activeCat?.name}
              {activeSub !== "sve" && activeSg ? ` — ${activeSg.name}` : ""}
            </h1>
            <p className="text-base md:text-lg text-brand-muted max-w-3xl">
              {activeCategory === "sve"
                ? "Dodajte proizvode u upit i pošaljite nam na email. Javljamo se sa potvrdom dostupnosti, cenom i dogovorom za preuzimanje ili dostavu."
                : activeCat?.seo}
            </p>
          </motion.div>

          {/* Kategorije — pločice (bez ikonica) */}
          <div className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
            <button
              onClick={() => pickCat("sve")}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                activeCategory === "sve"
                  ? "bg-brand-primary text-white shadow-md"
                  : "bg-white border border-slate-200 text-slate-600 hover:border-brand-primary hover:text-brand-primary"
              }`}
            >
              Sve ({products.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => pickCat(c.slug)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === c.slug
                    ? "bg-brand-primary text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-brand-primary hover:text-brand-primary"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Podgrupe — pločice (bez ikonica) */}
          {hasCat && (
            <div className="no-scrollbar -mx-4 mt-2 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
              <button
                onClick={() => setActiveSub("sve")}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
                  activeSub === "sve"
                    ? "bg-brand-dark text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Sve
              </button>
              {visibleSubs.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => setActiveSub(s.slug)}
                  title={s.desc}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
                    activeSub === s.slug
                      ? "bg-brand-dark text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {s.name} ({countSub(s.slug)})
                </button>
              ))}
            </div>
          )}

          {/* Pretraga + sort */}
          <div className="mt-6 flex flex-col md:flex-row gap-3 md:items-center">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  isPetShop
                    ? "Pretraga: npr. hills, acana, transporter..."
                    : "Pretraga: npr. hills, nexgard, transporter..."
                }
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-brand-bg focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters((v) => !v)}
                className="md:hidden inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-bold cursor-pointer"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filteri
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
                />
              </button>
              <div className="hidden md:flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              </div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="flex-1 md:flex-none px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary cursor-pointer"
              >
                <option value="popular">Najpopularnije</option>
                <option value="price-asc">Cena: rastuće</option>
                <option value="price-desc">Cena: opadajuće</option>
                <option value="name">Naziv A–Š</option>
              </select>
            </div>
          </div>

          {/* Aktivni filteri kao kod sata */}
          {activeChips.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-sm text-brand-muted font-medium">
                Aktivni filteri:
              </span>
              {activeChips.map((c) => (
                <button
                  key={c.key}
                  onClick={c.clear}
                  className="inline-flex items-center gap-1.5 bg-white border border-slate-200 rounded-full pl-4 pr-2.5 py-1.5 text-sm font-semibold text-brand-dark hover:border-red-300 hover:text-red-600 transition-all cursor-pointer"
                >
                  {c.label}
                  <X className="w-4 h-4" />
                </button>
              ))}
            </div>
          )}

          <div className={showFilters ? "mt-2" : "mt-2 hidden md:block"}>
            {/* Brendovi + akcija */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-sm text-brand-muted font-medium mr-1">Brend:</span>
              <button
                onClick={() => setActiveBrand("svi")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                  activeBrand === "svi"
                    ? "bg-brand-dark text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-brand-primary"
                }`}
              >
                Svi
              </button>
              {brands.map((b) => (
                <button
                  key={b}
                  onClick={() => setActiveBrand(b)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer ${
                    activeBrand === b
                      ? "bg-brand-dark text-white"
                      : "bg-white border border-slate-200 text-slate-600 hover:border-brand-primary"
                  }`}
                >
                  {b}
                </button>
              ))}
              <label className="ml-2 inline-flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyAction}
                  onChange={(e) => setOnlyAction(e.target.checked)}
                  className="w-4 h-4 accent-brand-600 cursor-pointer"
                />
                Samo akcije
              </label>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-brand-muted mb-5 md:mb-6">
            Pronađeno: <strong>{filtered.length}</strong> proizvoda
          </p>
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-100">
              <p className="text-lg font-semibold text-brand-dark mb-2">
                Nema rezultata za zadate filtere
              </p>
              <p className="text-brand-muted mb-6">
                Pokušajte sa drugom pretragom ili resetujte filtere — ili nam
                pošaljite upit, nabavljamo i po porudžbini.
              </p>
              <button
                onClick={resetAll}
                className="btn-outline px-6 py-3 cursor-pointer"
              >
                Resetuj filtere
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
                {shown.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
              <LoadMore
                remaining={remaining}
                shown={shown.length}
                onLoadMore={loadMore}
              />
            </>
          )}
        </div>
      </section>
    </div>
  )

  return listContent
}

export default function ProdavnicaPage() {
  return (
    <>
      <Canonical path="/prodavnica" />
      <Suspense
      fallback={
        <div className="min-h-screen bg-brand-bg flex items-center justify-center">
          <p className="text-brand-muted">Učitavanje prodavnice...</p>
        </div>
      }
    >
      <ProdavnicaContent />
      </Suspense>
    </>
  )
}
