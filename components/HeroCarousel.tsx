"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { shopInfo, isPetShop, heroImage } from "../data/shop-info"
import { products } from "../data/shop"
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

export default function HeroCarousel() {
  const [slides] = useState<Slide[]>(buildSlides)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const trackRef = useRef<HTMLDivElement>(null)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  function slideBy(dir: 1 | -1) {
    const el = trackRef.current
    if (!el) return
    const w = el.clientWidth
    if (!w) return
    const next = Math.min(slides.length - 1, Math.max(0, Math.round(el.scrollLeft / w) + dir))
    el.scrollTo({ left: next * w, behavior: "smooth" })
    pause()
  }

  // Tastatura: leve/desne strelice menjaju slajd kad je hero u vidnom polju
  // (i dok ništa ne fokusira input/mlaz teksta — da ne smeta u pretrazi)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return
      const el = trackRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      if (r.bottom < 140 || r.top > window.innerHeight * 0.75) return
      e.preventDefault()
      slideBy(e.key === "ArrowRight" ? 1 : -1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length])

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

        {/* Strelice — miš na desktopu, tap na mobilnom */}
        <button
          type="button"
          onClick={() => slideBy(-1)}
          aria-label="Prethodni slajd"
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 h-9 w-9 md:h-11 md:w-11 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>
        <button
          type="button"
          onClick={() => slideBy(1)}
          aria-label="Sledeći slajd"
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 h-9 w-9 md:h-11 md:w-11 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-all hover:bg-black/60 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        {/* Pretraga — unutar hero sekcije, pri dnu */}
        <div className="absolute inset-x-0 bottom-0 z-20 px-4 sm:px-6 lg:px-8 pb-4 md:pb-5">
          <div className="max-w-xl mx-auto">
            <SearchAutocomplete compact />
          </div>
        </div>
      </div>

      {/* Tačkice (smenjivanje slajdova) */}
      <div className="flex justify-center gap-1.5 pt-3 pb-3">
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
    </section>
  )
}
