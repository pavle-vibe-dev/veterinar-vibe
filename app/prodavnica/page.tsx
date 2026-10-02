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
  Dog,
  Cat,
  Pill,
  ShoppingBag,
  ArrowRight,
  LayoutGrid,
  Bone,
  Fish,
  Stethoscope,
  ShieldCheck,
  Droplets,
  Brush,
  Gamepad2,
  BedDouble,
  Luggage,
  type LucideIcon,
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

type SortKey = "popular" | "price-asc" | "price-desc" | "name"

const groupIcons: Record<string, LucideIcon> = {
  "hrana-psi": Dog,
  "hrana-macke": Cat,
  apoteka: Pill,
  oprema: ShoppingBag,
}

const subIcons: Record<string, LucideIcon> = {
  "granule-psi": Bone,
  "granule-macke": Fish,
  dijete: Stethoscope,
  antiparazitici: ShieldCheck,
  vitamini: Pill,
  toaleti: Droplets,
  kozmetika: Brush,
  igracke: Gamepad2,
  kreveti: BedDouble,
  transporteri: Luggage,
}

function countCat(catSlug: string) {
  return products.filter((p) => p.category === catSlug).length
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
  const forceList = searchParams.get("prikaz") === "lista"
  const hasFilters = hasQ || hasCat || hasSub || hasBrand || onlyAction

  // hub = mobilne kartice grupa; group = stranica grupe; list = filtrirana lista
  const mode: "hub" | "group" | "list" = !hasFilters && !forceList
    ? "hub"
    : hasCat && !hasSub && !hasQ && !hasBrand && !onlyAction
      ? "group"
      : "list"

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

  /* ---------- HUB kartice grupa (samo mobilni) ---------- */
  const hubContent = (
    <div className="bg-white overflow-x-hidden">
      <section className="pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center gap-1.5 text-sm text-brand-muted mb-4">
            <Link href="/" className="hover:text-brand-primary">
              Početna
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-semibold text-brand-dark">Prodavnica</span>
          </nav>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="h1 mt-2 mb-4">Internet prodavnica</h1>
            <p className="text-lg text-brand-muted leading-relaxed">
              Sve za vašeg ljubimca na jednom mestu — od hrane i opreme za pse
              i mačke do apotekarskih preparata. Izaberite grupu, pa podgrupu,
              dodajte proizvode u upit — bez plaćanja karticom.
            </p>
          </motion.div>

          <div className="mt-8 grid grid-cols-1 gap-5">
            {categories.map((c, i) => {
              const Icon = groupIcons[c.slug] || LayoutGrid
              return (
                <motion.div
                  key={c.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/prodavnica?category=${c.slug}`}
                    className="block bg-brand-bg border border-slate-100 rounded-3xl p-6 text-center active:border-brand-primary/50 transition-all"
                  >
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 p-[3px] shadow-md">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <Icon className="w-9 h-9 text-emerald-700" />
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-brand-dark mt-4">
                      {c.name}
                    </h2>
                    <p className="text-sm font-bold text-brand-primary mt-1">
                      {countCat(c.slug)}{" "}
                      {countCat(c.slug) === 1
                        ? "proizvod"
                        : countCat(c.slug) < 5
                          ? "proizvoda"
                          : "proizvoda"}
                    </p>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-8 text-center pb-4">
            <Link
              href="/prodavnica?prikaz=lista"
              className="btn-primary inline-flex items-center gap-2 px-8 py-4"
            >
              <LayoutGrid className="w-5 h-5" />
              Svi proizvodi ({products.length})
            </Link>
          </div>
        </div>
      </section>
    </div>
  )

  /* ---------- GROUP stranica grupe: SEO + okrugle podgrupe + proizvodi ---------- */
  const groupContent = activeCat && (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <section className="pt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-brand-muted mb-4">
            <Link href="/" className="hover:text-brand-primary">
              Početna
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/prodavnica" className="hover:text-brand-primary">
              Prodavnica
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="font-semibold text-brand-dark">
              {activeCat.name}
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="h1 mt-2 mb-4">{activeCat.name}</h1>
            <p className="text-brand-muted leading-relaxed">{activeCat.seo}</p>
          </motion.div>

          {/* Okrugle podgrupe kao kod sata */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {subgroupsOf(activeCategory).map((s, i) => {
              const Icon = subIcons[s.slug] || LayoutGrid
              return (
                <motion.div
                  key={s.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={`/prodavnica?category=${activeCategory}&sub=${s.slug}`}
                    className="group flex flex-col items-center gap-2 py-2"
                    title={s.desc}
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 p-[3px] shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <Icon className="w-8 h-8 md:w-9 md:h-9 text-emerald-700" />
                      </div>
                    </div>
                    <span className="text-xs md:text-sm font-semibold text-brand-dark text-center group-hover:text-brand-primary transition-colors">
                      {s.name}
                    </span>
                    <span className="text-xs text-brand-muted -mt-1">
                      ({countSub(s.slug)})
                    </span>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Proizvodi grupe */}
          <div className="mt-10 flex items-center justify-between gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-brand-dark">
              Proizvodi — {activeCat.name} ({filtered.length})
            </h2>
            <Link
              href="/prodavnica?prikaz=lista"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-primary hover:gap-2.5 transition-all shrink-0"
            >
              Svi proizvodi
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 pb-12">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )

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

          {/* Pretraga + sort */}
          <div className="mt-6 flex flex-col md:flex-row gap-3 md:items-center">
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pretraga: npr. hills, nexgard, transporter..."
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
            {/* Podgrupe */}
            <div className="mt-4">
              <p className="text-sm font-semibold text-brand-dark mb-2">
                Podgrupe:
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveSub("sve")}
                  className={`px-4 md:px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    activeSub === "sve"
                      ? "bg-brand-dark text-white shadow-lg"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Sve podgrupe
                </button>
                {visibleSubs.map((s) => (
                  <button
                    key={s.slug}
                    onClick={() => setActiveSub(s.slug)}
                    title={s.desc}
                    className={`px-4 md:px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                      activeSub === s.slug
                        ? "bg-brand-dark text-white shadow-lg"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {s.name} ({countSub(s.slug)})
                  </button>
                ))}
              </div>
            </div>

            {/* Kategorije */}
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => pickCat("sve")}
                className={`px-4 md:px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  activeCategory === "sve"
                    ? "bg-brand-primary text-white shadow-lg"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Sve ({products.length})
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => pickCat(c.slug)}
                  className={`px-4 md:px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                    activeCategory === c.slug
                      ? "bg-brand-primary text-white shadow-lg"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

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
                  className="w-4 h-4 accent-emerald-600 cursor-pointer"
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
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )

  // hub = samo mobilni; desktop odmah vidi listu
  if (mode === "hub") {
    return (
      <>
        <div className="md:hidden">{hubContent}</div>
        <div className="hidden md:block">{listContent}</div>
      </>
    )
  }
  if (mode === "group") return groupContent
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
