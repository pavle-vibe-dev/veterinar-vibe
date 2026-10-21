"use client"

import Image from "next/image"
import Link from "next/link"
import Canonical from "../components/Canonical"
import { shopInfo, isPetShop, heroImage } from "../data/shop-info"
import { googleReviews } from "../data/testimonials"
import { motion } from "framer-motion"
import {
  Dog,
  Cat,
  Pill,
  ShieldCheck,
  Apple,
  Sparkles,
  ShoppingBag,
  Brush,
  Gamepad2,
  Truck,
  Stethoscope,
  Mail,
  BadgeCheck,
  ArrowRight,
  Star,
  Phone,
  MapPin,
} from "lucide-react"
import { brands, products, getCategory } from "../data/shop"
import ProductRail from "../components/ProductRail"
import SearchAutocomplete from "../components/SearchAutocomplete"
import Testimonials from "../components/Testimonials"

const mostWanted = [
  { icon: Dog, label: "Psi", href: "/prodavnica?category=hrana-psi" },
  { icon: Cat, label: "Mačke", href: "/prodavnica?category=hrana-macke" },
  { icon: Pill, label: getCategory("apoteka")?.name ?? "Apoteka", href: "/prodavnica?category=apoteka" },
  { icon: Apple, label: "Hrana", href: "/prodavnica?category=hrana-psi" },
  { icon: Sparkles, label: "Vitamini", href: "/prodavnica?category=apoteka" },
  { icon: ShoppingBag, label: "Oprema", href: "/prodavnica?category=oprema" },
  { icon: Brush, label: "Kozmetika", href: "/prodavnica?category=oprema" },
  { icon: Gamepad2, label: "Igračke", href: "/prodavnica?category=oprema" },
  // pet-shop: bez pločica koje vode na apoteku ("Apoteka", "Vitamini")
].filter((i) => !(isPetShop && i.href.includes("category=apoteka")))

const trustItems = [
  { icon: BadgeCheck, title: "Original proizvodi", desc: "Provereni dobavljači" },
  { icon: Truck, title: "Brza dostupnost", desc: "Preuzimanje ili dostava" },
  {
    icon: Stethoscope,
    title: isPetShop ? "Stručan savet" : "Savet veterinara",
    desc: "Stručna preporuka",
  },
  { icon: Mail, title: "Upit na email", desc: "Bez plaćanja karticom" },
]

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
        <p className="text-[11px] md:text-sm font-bold text-brand-primary uppercase tracking-widest mb-1.5 md:mb-2">
          {kicker}
        </p>
        <h2 className="h2">{title}</h2>
        {desc && (
          <p className="hidden sm:block text-brand-muted mt-2 max-w-2xl">
            {desc}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-primary hover:gap-3 transition-all shrink-0 pb-1"
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

      {/* HERO — full-bleed fotografija, moderan preklopni stil */}
      <section className="relative overflow-hidden rounded-b-[1.75rem] md:rounded-none">
        <Image
          src={heroImage}
          alt={`Dva srećna psa — ${shopInfo.name} ${isPetShop ? "pet shop" : "veterina i pet shop"}`}
          fill
          className="object-cover object-[62%_center] md:object-center"
          priority
          sizes="100vw"
        />
        {/* Neutralni tamni overlay (ne bojen brendom) — beli tekst ostaje
            čitljiv, a fotografija zadržava prirodne tonove bez braon mutnoće */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/78 via-slate-950/45 to-slate-950/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/45 via-transparent to-slate-950/10" />
        {/* Jači donji gradient samo na mobilnom — tekst i dugmad leže na slici */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent md:hidden" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-9 md:pt-24 md:pb-16">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {googleReviews ? (
              <p className="inline-flex items-center gap-2 text-brand-100 text-sm font-semibold bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-4 md:mb-5">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {googleReviews.rating}/5 na osnovu {googleReviews.count}{" "}
                recenzija
              </p>
            ) : (
              <p className="inline-flex items-center gap-2 text-white/90 text-xs sm:text-sm font-semibold bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-3.5 py-1.5 mb-4 md:mb-5">
                <MapPin className="w-3.5 h-3.5" />
                {shopInfo.city} • {isPetShop ? "Pet shop" : "Veterina i pet shop"}
              </p>
            )}
            <h1 className="text-[2.05rem] sm:text-5xl md:text-6xl font-bold text-white leading-[1.03] tracking-tight drop-shadow-lg">
              {shopInfo.tagline}{" "}
              <span className="text-brand-300">{shopInfo.name}</span>
            </h1>
            <p className="text-brand-50/90 text-[15px] sm:text-lg mt-3 md:mt-5 max-w-xl leading-relaxed line-clamp-3">
              Hrana, oprema i poslastice za pse i mačke. Izaberite
              proizvode, pošaljite upit na email — mi potvrđujemo cenu i
              dostupnost.
            </p>

            {/* Pretraga */}
            <div className="mt-5 md:mt-7">
              <SearchAutocomplete />
            </div>

            <div className="mt-5 md:mt-7 grid grid-cols-2 gap-2 md:flex md:flex-wrap md:gap-3">
              <Link
                href="/prodavnica"
                className="inline-flex items-center justify-center gap-2 bg-white text-brand-950 font-bold px-4 py-3 md:px-7 md:py-3.5 rounded-button hover:bg-brand-50 transition-all shadow-lg text-sm md:text-base"
              >
                Prodavnica
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold px-4 py-3 md:px-7 md:py-3.5 rounded-button hover:bg-white/10 backdrop-blur-sm transition-all text-sm md:text-base"
              >
                Pošalji upit
              </Link>
            </div>

            {/* Statistika — samo desktop, na mobilnom skraćuje hero */}
            <div className="mt-8 hidden md:flex gap-8 text-white">
              <div>
                <p className="text-2xl font-bold">{products.length}+</p>
                <p className="text-brand-100/80 text-sm">proizvoda u demo ponudi</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{brands.length}+</p>
                <p className="text-brand-100/80 text-sm">brendova</p>
              </div>
              <div>
                <p className="text-2xl font-bold">24h</p>
                <p className="text-brand-100/80 text-sm">odgovor na upit</p>
              </div>
            </div>
          </motion.div>

          {/* Staklene info kartice preko slike — samo desktop */}
          <motion.div
            className="mt-10 hidden md:grid grid-cols-3 gap-3 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
              <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center font-bold text-white shrink-0">
                %
              </div>
              <div>
                <p className="font-bold text-sm text-white">Akcija meseca</p>
                <p className="text-xs text-brand-100/80">popusti do −25%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
              <div className="w-10 h-10 bg-brand-400 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-brand-950" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">Upit na email</p>
                <p className="text-xs text-brand-100/80">bez plaćanja karticom</p>
              </div>
            </div>
            <a
              href={shopInfo.phoneHref}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 hover:bg-white/20 transition-all"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-brand-800" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">{shopInfo.phone}</p>
                <p className="text-xs text-brand-100/80">pozovite nas</p>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Trust traka */}
      <section className="border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trustItems.map((t, i) => (
            <motion.div
              key={t.title}
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center shrink-0">
                <t.icon className="w-5 h-5 text-brand-primary" />
              </div>
              <div>
                <p className="font-bold text-sm text-brand-dark">{t.title}</p>
                <p className="text-xs text-brand-muted">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NAJTRAŽENIJE */}
      <section className="py-9 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            kicker="Kategorije"
            title="Najtraženije"
            desc="Najčešće tražene kategorije naših kupaca — klik vodi u prodavnicu."
            href="/prodavnica"
          />
          <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-1 md:mx-0 md:grid md:grid-cols-8 md:gap-6 md:overflow-visible md:px-0">
            {mostWanted.map((c, i) => (
              <motion.div
                key={c.label}
                className="w-[72px] shrink-0 snap-start md:w-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={c.href} className="group flex flex-col items-center gap-2">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 p-[3px] shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <c.icon className="w-7 h-7 md:w-8 md:h-8 text-brand-700" />
                    </div>
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-brand-dark text-center group-hover:text-brand-primary transition-colors">
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
            href="/prodavnica"
          />
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
                href="/prodavnica"
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
            href="/prodavnica"
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                  className="block border border-slate-200 rounded-2xl py-6 px-4 text-center font-bold text-brand-dark hover:border-brand-primary hover:shadow-md hover:text-brand-primary transition-all bg-white"
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

      {/* SEO BLOK */}
      <section className="py-9 md:py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-2">
              {shopInfo.name}
            </p>
            <h2 className="h2">{shopInfo.tagline} Vam nudi</h2>
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

      {/* NOVO U ASORTIMANU */}
      <section className="py-9 md:py-14 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            kicker="Noviteti"
            title="Novo u asortimanu"
            desc="Najsvežije stavke u našoj ponudi."
            href="/prodavnica"
          />
          <ProductRail products={fresh} fadeFrom="from-brand-bg" />
        </div>
      </section>

      {/* RECENZIJE */}
      <Testimonials />
    </div>
  )
}
