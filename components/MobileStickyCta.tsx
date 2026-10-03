"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Phone, Send } from "lucide-react"
import { shopInfo } from "../data/shop-info"

/**
 * Fiksna donja traka na mobilnim uređajima.
 * Ne prikazuje se na /upit i /kontakt (korak slanja je već tamo) —
 * inače stalno nudi glavnu akciju: pošalji upit + pozovi.
 */
export default function MobileStickyCta() {
  const pathname = usePathname()
  if (pathname === "/upit" || pathname.startsWith("/upit/")) return null
  if (pathname === "/kontakt" || pathname.startsWith("/kontakt/")) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 backdrop-blur border-t border-slate-200 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex gap-3 shadow-[0_-6px_20px_rgba(15,23,42,0.10)]"
      role="region"
      aria-label="Brza akcija"
    >
      <a
        href={shopInfo.phoneHref}
        className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-slate-200 text-brand-dark font-bold text-sm py-3 rounded-button hover:border-brand-primary hover:text-brand-primary transition-all"
      >
        <Phone className="w-4 h-4" />
        Pozovi
      </a>
      <Link
        href="/kontakt"
        className="flex-[1.5] inline-flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-sm py-3 rounded-button shadow-lg shadow-emerald-200/50 transition-all"
      >
        <Send className="w-4 h-4" />
        Pošalji upit
      </Link>
    </div>
  )
}
