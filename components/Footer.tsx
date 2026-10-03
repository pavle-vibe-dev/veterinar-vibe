"use client"

import { motion } from "framer-motion"
import { Phone, MapPin, Clock, Instagram, Facebook, ArrowRight } from "lucide-react"
import Link from "next/link"
import { shopInfo, fullAddress, hoursDisplay } from "../data/shop-info"
import BrandLogo from "./BrandLogo"

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white overflow-x-hidden pb-16 md:pb-0">
      {/* Tanka CTA traka umesto stare forme */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center md:text-left">
            <Phone className="w-6 h-6 text-brand-primary shrink-0" />
            <p className="text-slate-300">
              Trebate savet ili potvrdu dostupnosti?{" "}
              <a
                href={shopInfo.phoneHref}
                className="font-bold text-white hover:text-brand-primary transition-colors"
              >
                {shopInfo.phone}
              </a>
            </p>
          </div>
          <Link
            href="/upit"
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-white font-bold px-6 py-3 rounded-button transition-all shrink-0"
          >
            Pogledaj korpu
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* DONJI DEO - Info & Linkovi */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo & Opis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">
                <BrandLogo variant="light" />
              </div>
              <p className="text-slate-400 leading-relaxed">
                {shopInfo.tagline} na {shopInfo.district}u. Specializovani za medicinsku hranu, zaštitu od parazita, suplemente i opremu za Vaše ljubimce.
              </p>
            </motion.div>

            {/* Linkovi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Brzi linkovi</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/prodavnica" className="text-slate-400 hover:text-white transition-colors duration-300">
                    Prodavnica
                  </Link>
                </li>
                <li>
                  <Link href="/upit" className="text-slate-400 hover:text-white transition-colors duration-300">
                    Korpa
                  </Link>
                </li>
                <li>
                  <Link href="/dostava-i-placanje" className="text-slate-400 hover:text-white transition-colors duration-300">
                    Dostava i plaćanje
                  </Link>
                </li>
                <li>
                  <Link href="/o-nama" className="text-slate-400 hover:text-white transition-colors duration-300">
                    O nama
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-slate-400 hover:text-white transition-colors duration-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="text-slate-400 hover:text-white transition-colors duration-300">
                    Kontakt
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Kontakt info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Kontakt</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-brand-primary" />
                  <a href={shopInfo.phoneHref} className="text-slate-400 hover:text-white transition-colors duration-300">
                    {shopInfo.phone}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-brand-primary" />
                  <span className="text-slate-400">{fullAddress}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-brand-primary" />
                  <span className="text-slate-400">
                    {hoursDisplay.map((h) => `${h.days}: ${h.time}`).join(", ")}
                  </span>
                </div>
              </div>

              {/* Social media ikonice */}
              <div className="flex space-x-4 mt-6">
                <motion.a
                  href="https://www.instagram.com/_bg_pet"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-primary transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-primary transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-3 text-sm">
              <Link href="/politika-privatnosti" className="text-slate-400 hover:text-white transition-colors duration-300">
                Politika privatnosti
              </Link>
              <Link href="/uslovi-koriscenja" className="text-slate-400 hover:text-white transition-colors duration-300">
                Uslovi korišćenja
              </Link>
              <Link href="/dostava-i-placanje" className="text-slate-400 hover:text-white transition-colors duration-300">
                Dostava i plaćanje
              </Link>
            </div>
            <p className="text-slate-400">
              &copy; {new Date().getFullYear()} {shopInfo.legalName}. Sva prava zadržana. Napravljeno sa ❤️ za vaše ljubimce.
            </p>
          </div>
        </div>
      </section>
    </footer>
  )
}
