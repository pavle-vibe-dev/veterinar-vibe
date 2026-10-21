"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Plus } from "lucide-react"
import { shopInfo, isPetShop, heroImage } from "../data/shop-info"
import { products, formatPrice } from "../data/shop"
import { useCart } from "./cart/CartProvider"
import SearchAutocomplete from "./SearchAutocomplete"

type Slide = {
  image: string
  position: string
  kicker: string
  title: React.ReactNode
  subtitle: string
  cta: string
  href: string
}

const AUTOPLAY_MS = 6000

function buildSlides(): Slide[] {
  const maxDiscount = Math.max(
    0,
    ...products
      .filter((p) => p.oldPrice)
      .map((p) => Math.round((1 - p.price / (p.oldPrice as number)) * 100))
  )

  const discountSlide: Slide = {
    image: "/hero/slide-3.jpg",
    position: "object-[58%_center]",
    kicker: maxDiscount > 0 ? "Akcija" : "Noviteti",
    title:
      maxDiscount > 0 ? `Snižene cene do −${maxDiscount}%` : "Novo u asortimanu",
    subtitle:
      maxDiscount > 0
        ? "Odabrani proizvodi po posebnim cenama — dok traju zalihe."
        : "Najsvežije stavke u ponudi, spremne za upit.",
    cta: maxDiscount > 0 ? "Pogledaj akcije" : "Pogledaj novitete",
    href:
      maxDiscount > 0
        ? "/prodavnica?akcija=1&prikaz=lista"
        : "/prodavnica?prikaz=lista",
  }

  return [
    {
      image: heroImage,
      position: "object-[62%_center]",
      kicker: `${shopInfo.city} • ${isPetShop ? "Pet shop" : "Veterina i pet shop"}`,
      title: (
        <>
          {shopInfo.tagline}{" "}
          <span className="text-brand-300">{shopInfo.name}</span>
        </>
      ),
      subtitle:
        "Hrana, oprema i poslastice za pse i mačke — sve na jednom mestu.",
      cta: "U prodavnicu",
      href: "/prodavnica?prikaz=lista",
    },
    {
      image: "/hero/slide-2.jpg",
      position: "object-[60%_center]",
      kicker: "Za pse i mačke",
      title: "Sve što vaš ljubimac voli",
      subtitle:
        "Hrana, igračke i nega — izaberite proizvod i pošaljite upit u par klikova.",
      cta: "Pogledaj ponudu",
      href: "/prodavnica?prikaz=lista",
    },
    discountSlide,
    {
      image: "/hero/slide-4.jpg",
      position: "object-[55%_center]",
      kicker: "Oprema i nega",
      title: "Za udobnost i igru",
      subtitle: "Kreveti, transporteri, igračke i kozmetika za svakodnevnu negu.",
      cta: "Pogledaj opremu",
      href: "/prodavnica?category=oprema&prikaz=lista",
    },
  ]
}

/** Mini kartica proizvoda koja preklapa hero (kao kod Premium Pet-a) */
function HeroCard({
  product,
}: {
  product: (typeof products)[number]
}) {
  const { add } = useCart()
  return (
    <div className="w-[72%] sm:w-[46%] md:w-[38%] shrink-0 snap-start lg:w-auto lg:max-w-none lg:shrink bg-white rounded-2xl border border-slate-100 shadow-[0_10px_28px_rgba(15,23,42,0.14)] p-3 flex items-center gap-3 min-h-[96px]">
      <Link
        href={`/prodavnica/${product.slug}`}
        className="relative w-[68px] h-[68px] shrink-0 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden"
      >
        <Image
          src={product.image}
          alt={product.name}
          width={84}
          height={84}
          className="w-full h-full object-contain p-0.5"
        />
        {product.oldPrice && (
          <span className="absolute -top-1 -left-1 text-[9px] font-bold bg-red-500 text-white px-1 rounded leading-tight">
            -
            {Math.round((1 - product.price / product.oldPrice) * 100)}%
          </span>
        )}
      </Link>

      <div className="flex-1 min-w-0">
        <Link href={`/prodavnica/${product.slug}`}>
          <p className="text-[9.5px] uppercase tracking-wide text-slate-400 font-semibold truncate">
            {product.brand}
          </p>
          <p className="text-[12.5px] font-semibold text-brand-dark leading-[1.3] line-clamp-2 mt-0.5">
            {product.name}
          </p>
        </Link>
        <p className="text-[15.5px] font-extrabold text-brand-primary mt-1.5 leading-none">
          {formatPrice(product.price)}
        </p>
      </div>

      <button
        type="button"
        onClick={() => add(product.slug)}
        aria-label={`Dodaj ${product.name} u korpu`}
        className="w-9 h-9 shrink-0 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer"
      >
        <Plus className="w-4.5 h-4.5" />
      </button>
    </div>
  )
}

export default function HeroCarousel() {
  const [slides] = useState<Slide[]>(buildSlides)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const featured = products
    .filter((p) => p.badges?.includes("preporuka"))
    .concat(products.filter((p) => p.badges?.includes("novo")))
    .slice(0, 4)

  // Prati aktivni slajd pri ručnom swipe-u
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const onScroll = () => {
      const width = el.clientWidth
      if (!width) return
      setActive(Math.min(slides.length - 1, Math.round(el.scrollLeft / width)))
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [slides.length])

  // Automatsko listanje (pauza na dodir, poštuje reduced motion)
  useEffect(() => {
    if (paused) return
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return
    }
    const id = setInterval(() => {
      const el = trackRef.current
      if (!el) return
      const next = (Math.round(el.scrollLeft / el.clientWidth) + 1) % slides.length
      el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" })
    }, AUTOPLAY_MS)
    return () => clearInterval(id)
  }, [paused, slides.length])

  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
    }
  }, [])

  function pause() {
    setPaused(true)
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => setPaused(false), 9000)
  }

  function goTo(index: number) {
    const el = trackRef.current
    if (!el) return
    el.scrollTo({ left: index * el.clientWidth, behavior: "smooth" })
    pause()
  }

  return (
    <section className="relative" aria-roledescription="carousel" aria-label="Izdvojeno iz ponude">
      {/* Banner slike */}
      <div className="relative z-30 bg-slate-900">
        <div className="overflow-hidden">
          <div
            ref={trackRef}
            onPointerDown={pause}
            className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
          >
          {slides.map((slide, index) => (
            <div
              key={slide.image + index}
              className="relative w-full shrink-0 snap-center"
              aria-roledescription="slide"
              aria-label={`${index + 1} od ${slides.length}`}
            >
              <div className="relative h-[64vh] max-h-[560px] min-h-[400px] sm:h-[58vh] md:h-[460px]">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={index === 0}
                  sizes="100vw"
                  className={`object-cover ${slide.position} md:object-center`}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/35 to-slate-950/55" />

                <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start pt-8 md:pt-12">
                  <div>
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/80 mb-2 md:mb-2.5">
                      {slide.kicker}
                    </p>
                    {index === 0 ? (
                      <h1 className="text-[27px] sm:text-[32px] md:text-[40px] font-bold text-white leading-[1.08] tracking-tight max-w-[17rem] sm:max-w-lg md:max-w-2xl drop-shadow">
                        {slide.title}
                      </h1>
                    ) : (
                      <p className="text-[27px] sm:text-[32px] md:text-[40px] font-bold text-white leading-[1.08] tracking-tight max-w-[17rem] sm:max-w-lg md:max-w-2xl drop-shadow">
                        {slide.title}
                      </p>
                    )}
                    <p className="text-white/85 text-[14px] sm:text-[15px] md:text-base mt-2 md:mt-3 max-w-[18rem] sm:max-w-md leading-relaxed line-clamp-3">
                      {slide.subtitle}
                    </p>
                    <Link
                      href={slide.href}
                      className="inline-flex items-center gap-1.5 mt-4 md:mt-6 bg-white text-brand-950 font-bold text-[13px] md:text-sm px-5 md:px-6 py-2.5 rounded-full shadow-lg hover:bg-brand-50 transition-all"
                    >
                      {slide.cta}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* Pretraga — unutar hero sekcije, pri dnu */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-4 sm:px-6 lg:px-8 pb-4 md:pb-5">
          <div className="max-w-xl mx-auto">
            <SearchAutocomplete compact />
          </div>
        </div>
      </div>

      {/* Tačkice (smenjivanje slajdova) */}
      <div className="flex justify-center gap-1.5 pt-3 pb-1">
        {slides.map((slide, index) => (
          <button
            key={`dot-${index}`}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Prikaži slajd ${index + 1}`}
            aria-current={active === index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              active === index ? "w-6 bg-brand-primary" : "w-1.5 bg-slate-300"
            }`}
          />
        ))}
      </div>

      {/* Kartice artikala — ispod tačkica */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="no-scrollbar flex snap-x snap-mandatory gap-2.5 overflow-x-auto pt-2 pb-3 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:pb-5">
            {featured.map((p) => (
              <HeroCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
