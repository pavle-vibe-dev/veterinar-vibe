"use client"

import { motion } from "framer-motion"
import Services from "../components/Services"
import Testimonials from "../components/Testimonials"
import TrustSection from "../components/TrustSection"

function Home() {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <section className="relative h-[400px] md:h-[85vh] overflow-hidden">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat blur-[1px]"
          style={{
            backgroundImage: "url('/hero.png')",
          }}
        />
        <div className="absolute inset-0 bg-black/60 md:bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center z-10 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-6 lg:px-20 text-center py-4">
            <motion.div
              className="space-y-6 text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Veterinarska apoteka i Pet Shop BG PET
              </motion.h1>
              <motion.p
                className="text-xl md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Sve za zdravlje, ishranu i negu Vašeg ljubimca na jednom mestu. Pronađite pravu podršku za Vašeg četvoronožnog prijatelja.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 gap-y-3 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.a
                  href="/usluge"
                  className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white px-6 sm:px-8 py-4 rounded-brand font-bold text-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Pogledajte asortiman
                </motion.a>
                <motion.a
                  href="/kontakt"
                  className="w-full sm:w-auto bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-2 border-white/50 px-6 sm:px-8 py-4 rounded-brand font-bold text-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Rezervišite proizvod
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
      <div className="space-y-4 md:space-y-8">
        <Services />
        <Testimonials />
        <TrustSection />
      </div>
    </div>
  )
}

export default Home
