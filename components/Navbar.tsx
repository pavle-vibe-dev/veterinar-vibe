"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Menu, X, ShoppingCart, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useCart } from "./cart/CartProvider"
import { categories, subgroupsOf } from "../data/shop"
import { shopInfo } from "../data/shop-info"
import BrandLogo from "./BrandLogo"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openShop, setOpenShop] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const { count } = useCart()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
    setOpenShop(false)
    setOpenGroup(null)
  }
  return (
    <motion.nav
      className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white border-b border-gray-200/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo - Levo */}
          <Link
            href="/"
            className="flex items-center space-x-2 group transition-transform duration-300 hover:scale-105"
          >
            <BrandLogo variant="dark" />
          </Link>

          {/* Linkovi - Sredina */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-brand-dark hover:text-brand-primary transition-colors duration-300 font-medium relative group"
            >
              Početna
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            {/* Prodavnica sa dropdown panelom (grupe + podgrupe) */}
            <div className="relative group/nav">
              <Link
                href="/prodavnica"
                className="text-brand-dark hover:text-brand-primary transition-colors duration-300 font-medium relative inline-flex items-center gap-1 py-2"
              >
                Prodavnica
                <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover/nav:rotate-180" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary group-hover/nav:w-full transition-all duration-300"></span>
              </Link>
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 invisible translate-y-2 group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0 transition-all duration-200">
                <div className="w-[580px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-6">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                    {categories.map((c) => (
                      <div key={c.slug}>
                        <Link
                          href={`/prodavnica?category=${c.slug}`}
                          className="font-bold text-brand-dark hover:text-brand-primary transition-colors"
                        >
                          {c.name}
                        </Link>
                        <div className="mt-1.5 space-y-1">
                          {subgroupsOf(c.slug).map((s) => (
                            <Link
                              key={s.slug}
                              href={`/prodavnica?category=${c.slug}&sub=${s.slug}`}
                              className="block text-sm text-slate-600 hover:text-brand-primary hover:translate-x-0.5 transition-all"
                            >
                              {s.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href="/prodavnica?prikaz=lista"
                      className="text-sm font-bold text-brand-primary hover:gap-3 inline-flex items-center gap-2 transition-all"
                    >
                      Svi proizvodi
                    </Link>
                    <Link
                      href="/upit"
                      className="text-sm font-medium text-slate-500 hover:text-brand-primary transition-colors"
                    >
                      Bez plaćanja karticom — sve na upit
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <Link 
              href="/blog" 
              className="text-brand-dark hover:text-brand-primary transition-colors duration-300 font-medium relative group"
            >
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/kontakt" 
              className="text-brand-dark hover:text-brand-primary transition-colors duration-300 font-medium relative group"
            >
              Kontakt
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Mobile desno: upit + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <Link
              href="/upit"
              className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Korpa"
            >
              <ShoppingCart className="w-6 h-6 text-slate-900" />
              {count > 0 && (
                <span className="absolute top-0 right-0 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
              aria-label="Toggle mobile menu"
            >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-slate-900" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-slate-900" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          </div>

          {/* Dugme - Desno (Desktop Only) */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/upit"
              className="relative inline-flex items-center gap-2 px-4 py-2.5 rounded-button border-2 border-brand-primary/20 text-brand-primary font-bold text-sm hover:bg-emerald-50 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Korpa</span>
              {count > 0 && (
                <span className="absolute -top-2 -right-2 min-w-6 h-6 px-1.5 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <Link href={shopInfo.phoneHref}>
            <motion.div 
              className="btn-primary px-6 py-3 text-sm font-bold relative overflow-hidden cursor-pointer inline-flex items-center space-x-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone className="w-4 h-4" />
              <span>Pozovite nas</span>
              <span className="text-xs opacity-80">{shopInfo.phone}</span>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 left-0 w-full h-screen bg-white z-[60] overflow-y-auto px-4 py-8 shadow-xl transition-transform duration-300 md:hidden pt-2"
            onClick={closeMobileMenu}
          >
            {/* Mobile Menu Links - accordion hijerarhija */}
            <div className="flex flex-col items-stretch justify-start min-h-full space-y-1 py-4 max-w-md mx-auto w-full">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="text-xl font-bold text-slate-900 hover:text-brand-primary transition-colors duration-300 py-3 px-4 rounded-lg"
              >
                Početna
              </Link>

              {/* Prodavnica accordion */}
              <div className="rounded-lg">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpenShop((v) => !v)
                  }}
                  className="w-full flex items-center justify-between text-xl font-bold text-slate-900 py-3 px-4 rounded-lg cursor-pointer"
                >
                  <span>Prodavnica</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${openShop ? "rotate-180" : ""}`}
                  />
                </button>
                {openShop && (
                  <div className="ml-2 mb-2 border-l-2 border-emerald-100 pl-3 space-y-1">
                    <Link
                      href="/prodavnica?prikaz=lista"
                      onClick={closeMobileMenu}
                      className="block text-base font-bold text-brand-primary py-2 px-3 rounded-lg"
                    >
                      Svi proizvodi
                    </Link>
                    {categories.map((c) => (
                      <div key={c.slug}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenGroup((g) => (g === c.slug ? null : c.slug))
                          }}
                          className="w-full flex items-center justify-between text-base font-bold text-slate-800 py-2 px-3 rounded-lg cursor-pointer"
                        >
                          <span>{c.name}</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${openGroup === c.slug ? "rotate-180" : ""}`}
                          />
                        </button>
                        {openGroup === c.slug && (
                          <div className="ml-2 border-l border-slate-200 pl-3 pb-1">
                            <Link
                              href={`/prodavnica?category=${c.slug}`}
                              onClick={closeMobileMenu}
                              className="block text-sm font-semibold text-slate-600 py-1.5 px-2"
                            >
                              Sve iz {c.name}
                            </Link>
                            {subgroupsOf(c.slug).map((s) => (
                              <Link
                                key={s.slug}
                                href={`/prodavnica?category=${c.slug}&sub=${s.slug}`}
                                onClick={closeMobileMenu}
                                className="block text-sm text-slate-600 py-1.5 px-2 hover:text-brand-primary"
                              >
                                {s.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/upit"
                onClick={closeMobileMenu}
                className="text-xl font-bold text-brand-primary py-3 px-4 rounded-lg"
              >
                Korpa{count > 0 ? ` (${count})` : ""}
              </Link>
              <Link
                href="/blog"
                onClick={closeMobileMenu}
                className="text-xl font-bold text-slate-900 hover:text-brand-primary transition-colors duration-300 py-3 px-4 rounded-lg"
              >
                Blog
              </Link>
              <Link
                href="/kontakt"
                onClick={closeMobileMenu}
                className="text-xl font-bold text-slate-900 hover:text-brand-primary transition-colors duration-300 py-3 px-4 rounded-lg"
              >
                Kontakt
              </Link>

              {/* Poziv Button - Below Kontakt */}
              <Link href={shopInfo.phoneHref} onClick={closeMobileMenu}>
                <motion.div
                  className="btn-primary px-6 py-3 text-sm font-bold relative overflow-hidden cursor-pointer inline-flex items-center justify-center space-x-2 w-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="w-4 h-4" />
                  <span>Pozovite nas</span>
                  <span className="text-xs opacity-80">{shopInfo.phone}</span>
                </motion.div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
