"use client"

import { motion } from "framer-motion"
import { Stethoscope, ShieldPlus, Ambulance, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Services() {
  const services = [
    {
      icon: Stethoscope,
      title: "Opšta Medicina",
      description: "Sistematski pregledi, vakcinacija i preventive za zdravlje vašeg ljubimca. Redovne kontrole su ključ za dug i srećan život."
    },
    {
      icon: ShieldPlus,
      title: "Hirurgija",
      description: "Bezbedni operativni zahvati sa modernom opremom i iskusnim hirurzima. Vaš ljubimac je u najboljim rukama."
    },
    {
      icon: Ambulance,
      title: "Hitna Pomoć",
      description: "Dostupni 24/7 za hitne slučajeve. Brza i efikasna intervencija kada je vreme najvažnije."
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Naslov sekcije */}
        <motion.h2 
          className="h2 text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Sveobuhvatna briga za vaše ljubimce
        </motion.h2>

        {/* Grid kartica */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            
            return (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-brand border border-slate-100 cursor-pointer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                  transition: { duration: 0.3 }
                }}
              >
                {/* Ikonica */}
                <motion.div
                  className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon className="w-8 h-8 text-brand-primary" />
                </motion.div>

                {/* Naslov */}
                <h3 className="text-xl font-bold text-brand-dark mb-4">
                  {service.title}
                </h3>

                {/* Opis */}
                <p className="text-brand-muted leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Dugme - Pogledajte sve usluge */}
        <div className="flex justify-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/usluge">
              <motion.button
                className="btn-outline inline-flex items-center gap-2 group"
                whileHover={{ 
                  x: 5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                Pogledajte sve usluge
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
