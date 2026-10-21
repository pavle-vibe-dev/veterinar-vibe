"use client"

import Image from "next/image"
import Link from "next/link"
import Canonical from "../components/Canonical"
import { shopInfo, isPetShop } from "../data/shop-info"
import { motion } from "framer-motion"
import { ShieldCheck, ArrowRight, Phone } from "lucide-react"
import { brands, products, getCategory } from "../data/shop"
import ProductRail from "../components/ProductRail"
import HeroCarousel from "../components/HeroCarousel"
import SearchAutocomplete from "../components/SearchAutocomplete"
import Testimonials from "../components/Testimonials"

const mostWanted = [
  { label: "Psi", image: "/hero/slide-3.jpg", href: "/prodavnica?category=hrana-psi" },
  { label: "Mačke", image: "/hero/slide-4.jpg", href: "/prodavnica?category=hrana-macke" },
  { label: "Oprema", image: "/products/trixie-transporter-capri-eco.jpg", href: "/prodavnica?category=oprema" },
  { label: "Igračke", image: "/products/rogz-grinz-lopta-crvena.jpg", href: "/prodavnica?category=oprema&sub=igracke" },
  { label: getCategory("apoteka")?.name ?? "Apoteka", image: "/products/nexgard-spectra-s-3tbl.jpg", href: "/prodavnica?category=apoteka" },
  // pet-shop: bez pločice koja vodi na apoteku
].filter((i) => !(isPetShop && i.href.includes("category=apoteka")))

const filterChips = [
  { label: "Sve", href: "/prodavnica?prikaz=lista" },
  { label: "Psi", href: "/prodavnica?category=hrana-psi&prikaz=lista" },
  { label: "Mačke", href: "/prodavnica?category=hrana-macke&prikaz=lista" },
  { label: "Oprema", href: "/prodavnica?category=oprema&prikaz=lista" },
  { label: "Igračke", href: "/prodavnica?category=oprema&sub=igracke&prikaz=lista" },
  { label: getCategory("apoteka")?.name ?? "Apoteka", href: "/prodavnica?category=apoteka&prikaz=lista" },
  // pet-shop: bez čipova koji vode na apoteku
].filter((i) => !(isPetShop && i.href.includes("category=apoteka")))

const seoBlocks = [
  {
    title: "Hrana za pse i mačke",
    text: "Granule, vlažna hrana i poslastice proverenih brendova — Acana, Orijen, Hills. Pomažemo da izaberete prema uzrastu, težini i aktivnosti ljubimca.",
    href: "/prodavnica?category=hrana-psi",
  },
  {
    title: isPetShop ? "Specijalne dijete" : "Veterinarske dijete",
    text: isPetShop
      ? "Renal, gastrointestinal, hipoalergene i dijabetičke formule. Za ljubimce sa posebnim potrebama — uvek po preporuci."
      : "Renal, gastrointestinal, hipoalergene i dijabetičke formule. Za ljubimce sa posebnim potrebama — uvek uz savet veterinara.",
    href: "/prodavnica?category=hrana-macke",
  },
  {
    title: "Antiparazitici i zaštita",
    text: "Tablete, ampule i ogrlice protiv buva, krpelja i crevnih parazita. Sezonska zaštita za pse i mačke svih uzrasta.",
    href: "/prodavnica?category=apoteka",
  },
  {
    title: "Vitamini i suplementi",
    text: "Omega-3, probiotici, vitaminski kompleksi i preparati za zglobove, dlaku i imunitet — za svakodnevnu vitalnost.",
    href: "/prodavnica?category=apoteka",
  },
  {
    title: "Oprema i kozmetika",
    text: "Transporteri, kreveti, šamponi, četke i igračke. Sve za negu, putovanja i igru — na jednom mestu.",
    href: "/prodavnica?category=oprema",
  },
  {
    title: isPetShop ? "Pitajte nas" : "Pitajte veterinara",
    text: isPetShop
      ? "Niste sigurni šta vašem ljubimcu treba? Pošaljite upit ili pozovite — rado pomažemo iz prakse."
      : "Niste sigurni šta vašem ljubimcu treba? Pošaljite upit ili pozovite — dajemo nepristrasan savet iz prakse.",
    href: "/kontakt",
  },
  // pet-shop: bez apotekarskih SEO blokova (Antiparazitici, Vitamini → kategorija "apoteka")
].filter((b) => !(isPetShop && b.href.includes("category=apoteka")))

function SectionHead({
  kicker,
  title,
  desc,
  href,
  hrefLabel,
}: {
  kicker: string
  title: string
  desc?: string
  href?: string
  hrefLabel?: string
}) {
  return (
    <div className="flex items-end justify-between gap-3 md:gap-4 mb-5 md:mb-8">
      <div>
        <p className="text-[10px] md:text-xs font-bold text-brand-primary uppercase tracking-[0.18em] mb-1 md:mb-2">
          {kicker}
        </p>
        <h2 className="text-[19px] sm:text-2xl md:text-3xl font-semibold text-brand-dark tracking-tight leading-tight">
          {title}
        </h2>
        {desc && (
          <p className="hidden sm:block text-brand-muted mt-2 max-w-2xl">
            {desc}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-brand-primary hover:gap-2 transition-all shrink-0 pb-0.5"
        >
          {hrefLabel || "Pogledaj sve"}
          <ArrowRight className="w-4 h-4" />
        </Link>
      )}
    </div>
  )
}

export default function Home() {
  const recommended = products
    .filter((p) => p.badges?.includes("preporuka"))
    .slice(0, 4)
  const discounted = products.filter((p) => p.oldPrice).slice(0, 4)
  const fresh = products.filter((p) => p.badges?.includes("novo")).slice(0, 4)

  return (
    <div className="w-full max-w-full overflow-x-hidden bg-white">
      <Canonical path="/" />
      {/* Promo traka */}
      <div className="bg-brand-950 text-brand-50 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-center gap-2 text-center">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>
            Internet prodavnica <strong>na upit — bez plaćanja karticom</strong>
            <span className="hidden sm:inline">
              {" "}
              • Potvrda dostupnosti isti dan • {shopInfo.phone}
            </span>
          </span>
        </div>
      </div>

      {/* HERO — kampanjski carousel (swipe na mobilnom) */}
      <HeroCarousel />

      {/* Pretraga — kompaktna traka ispod heroja */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-5">
          <SearchAutocomplete />
        </div>
      </section>

      {/* SEO BLOK */}
      <section className="py-9 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-7 md:mb-9">
            <p className="text-[10px] md:text-xs font-bold text-brand-primary uppercase tracking-[0.18em] mb-1.5">
              {shopInfo.name}
            </p>
            <h2 className="text-[19px] sm:text-2xl md:text-3xl font-semibold text-brand-dark tracking-tight leading-tight max-w-2xl">
              {isPetShop
                ? "Sve za pse i mačke — na jednom mestu"
                : "Veterina i prodavnica — sve na jednom mestu"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seoBlocks.map((b, i) => (
              <motion.div
                key={b.title}
                className="bg-brand-bg rounded-2xl p-6 border border-slate-100 hover:border-brand-primary/40 hover:shadow-md transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={b.href} className="group">
                  <h3 className="font-bold text-brand-dark mb-2 group-hover:text-brand-primary transition-colors">
                    {b.title} →
                  </h3>
                </Link>
                <p className="text-sm text-brand-muted leading-relaxed">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NAJTRAŽENIJE */}
      <section className="py-9 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            kicker="Kategorije"
            title="Najtraženije"
            desc="Najčešće tražene kategorije naših kupaca — klik vodi u prodavnicu."
            href="/prodavnica?prikaz=lista"
          />
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-5 md:gap-6 md:overflow-visible md:px-0">
            {mostWanted.map((c, i) => (
              <motion.div
                key={c.label}
                className="w-[62px] shrink-0 snap-start md:w-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={c.href} className="group flex flex-col items-center gap-1.5 md:gap-2">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden ring-2 ring-brand-100 group-hover:ring-brand-primary shadow-sm group-hover:shadow-md transition-all bg-slate-100">
                    <Image
                      src={c.image}
                      alt={c.label}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-[11px] md:text-sm font-semibold text-brand-dark text-center leading-tight group-hover:text-brand-primary transition-colors">
                    {c.label}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* NAŠA PREPORUKA */}
      <section className="py-9 md:py-14 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            kicker="Izdvojeno"
            title="Naša preporuka"
            desc={
              isPetShop
                ? "Proizvodi koje naši kupci najčešće biraju."
                : "Proizvodi koje naši veterinari najčešće preporučuju."
            }
            href="/prodavnica?prikaz=lista"
          />
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 mb-4 md:mx-0 md:px-0">
            {filterChips.map((c, i) => (
              <Link
                key={c.label}
                href={c.href}
                className={`shrink-0 px-3.5 py-1.5 rounded-lg text-[12px] md:text-sm font-semibold border transition-colors ${
                  i === 0
                    ? "bg-brand-primary text-white border-brand-primary"
                    : "bg-white border-slate-200 text-brand-dark hover:border-brand-primary hover:text-brand-primary"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>
          <ProductRail products={recommended} fadeFrom="from-brand-bg" />
        </div>
      </section>

      {/* Promo baner */}
      <section className="py-6 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-800 to-brand-600 p-6 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-5 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex-1">
              <p className="text-brand-200 font-bold text-xs md:text-sm uppercase tracking-widest mb-2">
                Bez kartice • Samo upit
              </p>
              <h3 className="text-xl md:text-3xl font-bold text-white">
                Niste sigurni šta vašem ljubimcu treba?
              </h3>
              <p className="text-brand-100 text-sm md:text-base mt-2 max-w-xl">
                Pošaljite nam spisak ili opišite problem —{" "}
                {isPetShop ? "naš tim" : "veterinarski tim"} odgovara sa
                preporukom i okvirnom cenom.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:flex flex-row gap-2 sm:gap-3 w-full md:w-auto shrink-0">
              <Link
                href="/prodavnica?prikaz=lista"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-900 font-bold px-5 md:px-7 py-3 md:py-3.5 rounded-button hover:bg-brand-50 transition-all text-sm md:text-base"
              >
                Otvori prodavnicu
              </Link>
              <a
                href={shopInfo.phoneHref}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold px-5 md:px-7 py-3 md:py-3.5 rounded-button hover:bg-white/10 transition-all text-sm md:text-base"
              >
                <Phone className="w-4 h-4" />
                {shopInfo.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NAJVEĆI POPUSTI */}
      <section className="py-9 md:py-14 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            kicker="Akcija"
            title="Najveći popusti"
            desc="Snižene cene — i dalje sve na upit, bez online plaćanja."
            href="/prodavnica?prikaz=lista"
          />
          <ProductRail products={discounted} fadeFrom="from-brand-bg" />
        </div>
      </section>

      {/* BRENDOVI */}
      <section className="py-9 md:py-14 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            kicker="Brendovi"
            title="Preko 300 brendova u ponudi"
            desc="Izdvajamo najtraženije — ostalo nabavljamo po porudžbini kroz upit."
          />
          <div className="relative -mx-4 overflow-hidden md:hidden">
            <div className="flex w-max animate-marquee">
              {[0, 1].map((group) => (
                <div
                  key={group}
                  className="flex shrink-0 gap-2.5 px-1.5"
                  aria-hidden={group === 1}
                >
                  {brands.map((b) => (
                    <Link
                      key={`${b}-${group}`}
                      href={`/prodavnica?brand=${encodeURIComponent(b)}`}
                      tabIndex={group === 1 ? -1 : undefined}
                      className="shrink-0 whitespace-nowrap border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold text-brand-dark bg-white hover:border-brand-primary hover:text-brand-primary transition-colors"
                    >
                      {b}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white to-transparent" />
          </div>

          <div className="hidden md:grid grid-cols-4 gap-4">
            {brands.map((b, i) => (
              <motion.div
                key={b}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Link
                  href={`/prodavnica?brand=${encodeURIComponent(b)}`}
                  className="block border border-slate-200 rounded-2xl py-8 px-4 text-center text-lg font-bold text-brand-dark hover:border-brand-primary hover:shadow-md hover:text-brand-primary transition-all bg-white"
                >
                  {b}
                </Link>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-brand-muted mt-6">
            + još 300 brendova dostupno po porudžbini — pošaljite nam{" "}
            <Link href="/kontakt" className="font-bold text-brand-primary">
              upit
            </Link>
            .
          </p>
        </div>
      </section>

      {/* NOVO U ASORTIMANU */}
      <section className="py-9 md:py-14 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            kicker="Noviteti"
            title="Novo u asortimanu"
            desc="Najsvežije stavke u našoj ponudi."
            href="/prodavnica?prikaz=lista"
          />
          <ProductRail products={fresh} fadeFrom="from-brand-bg" />
        </div>
      </section>

      {/* RECENZIJE */}
      <Testimonials />
    </div>
  )
}
