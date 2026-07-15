"use client"

import { motion } from "framer-motion"
import { Apple, Shield, Pill, Dog, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Services() {
  const categories = [
    {
      icon: Apple,
      title: "Medicinska hrana i dijete",
      description: "Specijalizovana hrana za pse i mačke sa specifičnim zdravstvenim potrebama"
    },
    {
      icon: Shield,
      title: "Zaštita od parazita",
      description: "Najefikasnije tablete, ogrlice i ampule protiv buva i krpelja"
    },
    {
      icon: Pill,
      title: "Suplementi i vitamini",
      description: "Dodaci ishrani za jačanje imuniteta, zglobova i sjajnu dlaku"
    },
    {
      icon: Dog,
      title: "Oprema i kozmetika",
      description: "Sve što Vam je potrebno za svakodnevnu negu, šampone, četke i igračke"
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
          Naš asortiman
        </motion.h2>

        {/* Grid kartica */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon
            
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
                  {category.title}
                </h3>

                {/* Opis */}
                <p className="text-brand-muted leading-relaxed">
                  {category.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Dugme - Pogledajte ceo asortiman */}
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
                Pogledajte ceo asortiman
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
