"use client"

import { motion } from "framer-motion"
import { PawPrint, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Team() {
  const teamMembers = [
    {
      name: "Dr. Milan Petrović",
      title: "Specijalista hirurgije",
      pet: "Vlasnik zlatnog retrivera Maxa",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=300&h=300"
    },
    {
      name: "Dr. Ana Petrović",
      title: "Opšta praksa",
      pet: "Vlasnica mačke Mije",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Dr. Nikola Jovanović",
      title: "Specijalista kardiologije",
      pet: "Vlasnik nemačkog ovčara Beca",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=300&h=300"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Naslov sekcije */}
        <motion.h2 
          className="h2 text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Lica koja brinu o vašim ljubimcima
        </motion.h2>

        {/* Podnaslov */}
        <motion.p 
          className="text-center text-brand-muted text-lg max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Naš tim čine iskusni stručnjaci i, pre svega, veliki ljubitelji životinja.
        </motion.p>

        {/* Grid kartica */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {teamMembers.slice(0, 3).map((member, index) => (
            <motion.div
              key={index}
              className="text-center group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
            >
              {/* Slika doktora */}
              <motion.div 
                className="relative mb-6 mx-auto w-48 h-48 rounded-brand overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"
                  initial={{ opacity: 0.3 }}
                  whileHover={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  className="relative w-full h-full"
                  initial={{ filter: "grayscale(100%)" }}
                  whileHover={{ filter: "grayscale(0%)" }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, 192px"
                  />
                </motion.div>
              </motion.div>

              {/* Ime i titula */}
              <div className="space-y-2">
                <motion.div 
                  className="flex items-center justify-center gap-2"
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="text-xl font-bold text-brand-dark">
                    {member.name}
                  </h3>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      repeatDelay: index * 0.5
                    }}
                  >
                    <PawPrint className="w-4 h-4 text-brand-primary" />
                  </motion.div>
                </motion.div>

                <p className="text-brand-primary font-medium">
                  {member.title}
                </p>

                {/* Informacija o ljubimcu */}
                <motion.div 
                  className="text-sm text-brand-muted italic pt-2"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {member.pet}
                </motion.div>
              </div>

              {/* Hover efekat - linija ispod */}
              <motion.div
                className="mt-4 h-0.5 bg-gradient-to-r from-transparent via-brand-primary to-transparent"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Dugme - Upoznaj naš tim */}
        <div className="flex justify-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Link href="/tim">
              <motion.button
                className="btn-outline inline-flex items-center gap-2 group"
                whileHover={{ 
                  x: 5,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                Upoznaj naš tim
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
