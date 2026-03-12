"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Navigation, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function KontaktPage() {
  return (
    <>
      {/* HERO SEKCIJA */}
      <section className="pt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="h1 mt-4 mb-2 md:mt-8 md:mb-4">Tu smo za vas i vaše ljubimce</h1>
            <p className="text-xl text-brand-muted max-w-3xl mx-auto">
              Kontaktirajte nas ili nas posetite
            </p>
          </motion.div>
        </div>
      </section>

      {/* INFO GRID */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Kartica 1: Adresa */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-4 bg-brand-primary/10 rounded-lg">
                    <MapPin className="w-8 h-8 text-brand-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Adresa</h3>
                </div>
                
                <div className="space-y-4">
                  <p className="text-slate-700 leading-relaxed text-lg">
                    Bulevar oslobođenja 45<br />
                    11000 Beograd, Srbija
                  </p>
                  
                  <Link
                    href="https://maps.google.com/?q=Bulevar+Oslobođenja+45+Beograd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Navigacija</span>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Kartica 2: Kontakt */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-4 bg-brand-primary/10 rounded-lg">
                    <Phone className="w-8 h-8 text-brand-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Telefon</h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Link
                      href="tel:+381112345678"
                      className="flex items-center space-x-2 text-slate-700 hover:text-brand-primary transition-colors duration-300 text-2xl font-bold"
                    >
                      <Phone className="w-5 h-5" />
                      <span>011/234-5678</span>
                    </Link>
                  </div>
                  
                  <div>
                    <Link
                      href="tel:+381641234567"
                      className="flex items-center space-x-2 text-slate-600 hover:text-brand-primary transition-colors duration-300"
                    >
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">+381 64 123 4567</span>
                    </Link>
                  </div>
                  
                  <div>
                    <Link
                      href="mailto:info@veticare.rs"
                      className="flex items-center space-x-2 text-slate-600 hover:text-brand-primary transition-colors duration-300"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="font-medium">info@veticare.rs</span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Kartica 3: Radno vreme */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-4 bg-brand-primary/10 rounded-lg">
                    <Clock className="w-8 h-8 text-brand-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Radno vreme</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-slate-700">
                    <span className="font-medium">Pon-Pet</span>
                    <span className="font-bold">08-20h</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="font-medium">Subota</span>
                    <span className="font-bold">08-16h</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="font-medium">Nedelja</span>
                    <span className="font-bold">09-14h</span>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-200">
                    <div className="flex justify-between items-center">
                      <span className="text-red-600 font-bold">Hitni slučajevi</span>
                      <span className="text-red-600 font-bold text-lg">24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GOOGLE MAPA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="h2 mb-4">Naša lokacija</h2>
            <p className="text-lg text-brand-muted">
              Pronađite nas u srcu Beograda
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2806.8345!2d20.4622!3d44.8125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDQ4JzQ1LjAiTiAyMMKwMjcnNDcuOSJF!5e0!3m2!1ssr!2srs!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[450px]"
              title="VetiCare Veterinarska Klinika - Lokacija"
            />
          </motion.div>
        </div>
      </section>
    </>
  )
}
