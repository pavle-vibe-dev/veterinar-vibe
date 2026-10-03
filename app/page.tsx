"use client"

import Image from "next/image"
import Link from "next/link"
import Canonical from "../components/Canonical"
import { shopInfo } from "../data/shop-info"
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
} from "lucide-react"
import { brands, products } from "../data/shop"
import ProductCard from "../components/cart/ProductCard"
import SearchAutocomplete from "../components/SearchAutocomplete"
import Testimonials from "../components/Testimonials"

const mostWanted = [
  { icon: Dog, label: "Psi", href: "/prodavnica?category=hrana-psi" },
  { icon: Cat, label: "Mačke", href: "/prodavnica?category=hrana-macke" },
  { icon: Pill, label: "Apoteka", href: "/prodavnica?category=apoteka" },
  { icon: Apple, label: "Hrana", href: "/prodavnica?category=hrana-psi" },
  { icon: Sparkles, label: "Vitamini", href: "/prodavnica?category=apoteka" },
  { icon: ShoppingBag, label: "Oprema", href: "/prodavnica?category=oprema" },
  { icon: Brush, label: "Kozmetika", href: "/prodavnica?category=oprema" },
  { icon: Gamepad2, label: "Igračke", href: "/prodavnica?category=oprema" },
]

const trustItems = [
  { icon: BadgeCheck, title: "Original proizvodi", desc: "Provereni dobavljači" },
  { icon: Truck, title: "Brza dostupnost", desc: "Preuzimanje ili dostava" },
  { icon: Stethoscope, title: "Savet veterinara", desc: "Stručna preporuka" },
  { icon: Mail, title: "Upit na email", desc: "Bez plaćanja karticom" },
]

const seoBlocks = [
  {
    title: "Hrana za pse i mačke",
    text: "Granule, vlažna hrana i poslastice proverenih brendova — Acana, Orijen, Hills. Pomažemo da izaberete prema uzrastu, težini i aktivnosti ljubimca.",
    href: "/prodavnica?category=hrana-psi",
  },
  {
    title: "Veterinarske dijete",
    text: "Renal, gastrointestinal, hipoalergene i dijabetičke formule. Za ljubimce sa posebnim potrebama — uvek uz savet veterinara.",
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
    title: "Pitajte veterinara",
    text: "Niste sigurni šta vašem ljubimcu treba? Pošaljite upit ili pozovite — dajemo nepristrasan savet iz prakse.",
    href: "/kontakt",
  },
]

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
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
      <div>
        <p className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-2">
          {kicker}
        </p>
        <h2 className="h2">{title}</h2>
        {desc && <p className="text-brand-muted mt-2 max-w-2xl">{desc}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary hover:gap-3 transition-all shrink-0"
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
      <div className="bg-emerald-950 text-emerald-50 text-xs sm:text-sm">
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
      <section className="relative overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Dva srećna psa — BG PET veterina i pet shop"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/70 to-emerald-900/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-emerald-950/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-12 md:pt-24 md:pb-16">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            {googleReviews && (
              <p className="inline-flex items-center gap-2 text-emerald-100 text-sm font-semibold bg-white/10 border border-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 mb-5">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {googleReviews.rating}/5 na osnovu {googleReviews.count}{" "}
                recenzija
              </p>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight drop-shadow-lg">
              Veterinarska apoteka i Pet Shop{" "}
              <span className="text-emerald-300">BG PET</span>
            </h1>
            <p className="text-emerald-50/90 text-lg mt-5 max-w-xl leading-relaxed">
              Premium hrana, apoteka i oprema za pse i mačke. Izaberite
              proizvode, pošaljite upit na email — mi potvrđujemo cenu i
              dostupnost.
            </p>

            {/* Pretraga */}
            <div className="mt-7">
              <SearchAutocomplete />
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/prodavnica"
                className="inline-flex items-center gap-2 bg-white text-emerald-950 font-bold px-7 py-3.5 rounded-button hover:bg-emerald-50 transition-all shadow-lg"
              >
                Pogledaj prodavnicu
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold px-7 py-3.5 rounded-button hover:bg-white/10 backdrop-blur-sm transition-all"
              >
                Pošalji upit
              </Link>
            </div>

            {/* Statistika */}
            <div className="mt-8 flex gap-8 text-white">
              <div>
                <p className="text-2xl font-bold">{products.length}+</p>
                <p className="text-emerald-100/80 text-sm">proizvoda u demo ponudi</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{brands.length}+</p>
                <p className="text-emerald-100/80 text-sm">brendova</p>
              </div>
              <div>
                <p className="text-2xl font-bold">24h</p>
                <p className="text-emerald-100/80 text-sm">odgovor na upit</p>
              </div>
            </div>
          </motion.div>

          {/* Staklene info kartice preko slike */}
          <motion.div
            className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl"
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
                <p className="text-xs text-emerald-100/80">popusti do −25%</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3">
              <div className="w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-emerald-950" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">Upit na email</p>
                <p className="text-xs text-emerald-100/80">bez plaćanja karticom</p>
              </div>
            </div>
            <a
              href={shopInfo.phoneHref}
              className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 hover:bg-white/20 transition-all"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-emerald-800" />
              </div>
              <div>
                <p className="font-bold text-sm text-white">{shopInfo.phone}</p>
                <p className="text-xs text-emerald-100/80">pozovite nas</p>
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
              <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
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
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            kicker="Kategorije"
            title="Najtraženije"
            desc="Najčešće tražene kategorije naših kupaca — klik vodi u prodavnicu."
            href="/prodavnica"
          />
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
            {mostWanted.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={c.href} className="group flex flex-col items-center gap-2">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 p-[3px] shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <c.icon className="w-7 h-7 md:w-8 md:h-8 text-emerald-700" />
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
      <section className="py-14 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            kicker="Izdvojeno"
            title="Naša preporuka"
            desc="Proizvodi koje naši veterinari najčešće preporučuju."
            href="/prodavnica"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommended.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Promo baner */}
      <section className="py-6 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 to-emerald-600 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex-1">
              <p className="text-emerald-200 font-bold text-sm uppercase tracking-widest mb-2">
                Bez kartice • Samo upit
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Niste sigurni šta vašem ljubimcu treba?
              </h3>
              <p className="text-emerald-100 mt-2 max-w-xl">
                Pošaljite nam spisak ili opišite problem — veterinarski tim
                odgovara sa preporukom i okvirnom cenom.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/prodavnica"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-900 font-bold px-7 py-3.5 rounded-button hover:bg-emerald-50 transition-all"
              >
                Otvori prodavnicu
              </Link>
              <a
                href={shopInfo.phoneHref}
                className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold px-7 py-3.5 rounded-button hover:bg-white/10 transition-all"
              >
                <Phone className="w-4 h-4" />
                {shopInfo.phone}
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* NAJVEĆI POPUSTI */}
      <section className="py-14 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            kicker="Akcija"
            title="Najveći popusti"
            desc="Snižene cene — i dalje sve na upit, bez online plaćanja."
            href="/prodavnica"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discounted.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* BRENDOVI */}
      <section className="py-14 bg-white border-y border-slate-100">
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
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-2">
              BG PET
            </p>
            <h2 className="h2">Veterinarska apoteka i Pet Shop Vam nudi</h2>
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
      <section className="py-14 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHead
            kicker="Noviteti"
            title="Novo u asortimanu"
            desc="Najsvežije stavke u našoj ponudi."
            href="/prodavnica"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {fresh.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* RECENZIJE */}
      <Testimonials />
    </div>
  )
}
