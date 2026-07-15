"use client"

import { motion } from "framer-motion"
import { Apple, Shield, Pill, Dog, ArrowRight, Check, Star } from "lucide-react"
import Link from "next/link"

export default function AsortimanPage() {
  const categories = [
    {
      icon: Apple,
      title: "Medicinska hrana i dijete",
      description: "Specijalizovana hrana za pse i mačke sa specifičnim zdravstvenim potrebama",
      color: "from-emerald-500 to-green-600",
      items: [
        "Hrana za bubrežne dijete",
        "Hrana za osetljiv stomak",
        "Hrana protiv alergija",
        "Hrana za regulaciju težine",
        "Diabetička hrana",
        "Hrana za podršku zglobovima"
      ]
    },
    {
      icon: Shield,
      title: "Zaštita od parazita",
      description: "Najefikasnije tablete, ogrlice i ampule protiv buva i krpelja",
      color: "from-blue-500 to-blue-600",
      items: [
        "Tablete protiv buva i krpelja",
        "Ampule za zaštitu",
        "Ogrlice protiv parazita",
        "Sprejevi za zaštitu",
        "Preparati za kuću",
        "Zaštita za štence i mačiće"
      ]
    },
    {
      icon: Pill,
      title: "Suplementi i vitamini",
      description: "Dodaci ishrani za jačanje imuniteta, zglobova i sjajnu dlaku",
      color: "from-purple-500 to-purple-600",
      items: [
        "Vitaminski kompleksi",
        "Suplementi za zglobove",
        "Omega-3 masne kiseline",
        "Probiotici za digestiju",
        "Preparati za dlaku i kožu",
        "Sedativi bez recepta"
      ]
    },
    {
      icon: Dog,
      title: "Oprema i kozmetika",
      description: "Sve što Vam je potrebno za svakodnevnu negu, šampone, četke i igračke",
      color: "from-orange-500 to-orange-600",
      items: [
        "Šamponi za pse i mačke",
        "Regeneratori i balzami",
        "Četke i češljevi",
        "Igračke za žvakanje",
        "Fen i pribor za šišanje",
        "Nega ušiju i očiju"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-brand-bg overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="h1 mt-6 mb-2 md:mt-8 md:mb-4">Naš Asortiman</h1>
            <p className="text-xl text-brand-muted max-w-3xl mx-auto">
              Kompletna ponuda veterinarske apoteke BG PET na Voždovcu
            </p>
          </motion.div>
        </div>
      </section>

      {/* Kategorije */}
      {categories.map((category, catIndex) => (
        <section key={catIndex} className="py-16 bg-white even:bg-brand-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${catIndex % 2 === 1 ? 'lg:direction-rtl' : ''}`}>
              {/* Levo - Tekst */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className={`inline-flex items-center space-x-3 mb-6 px-4 py-2 bg-gradient-to-r ${category.color} text-white rounded-full`}>
                  <category.icon className="w-5 h-5" />
                  <span className="font-semibold">{category.title}</span>
                </div>

                <p className="text-lg text-brand-muted mb-8 leading-relaxed">
                  {category.description}
                </p>

                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-brand-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-brand-primary" />
                      </div>
                      <span className="text-brand-dark">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Desno - Vizuelni prikaz */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative">
                  <div className={`bg-gradient-to-br ${category.color} rounded-3xl p-8 shadow-2xl`}>
                    <div className="text-white text-center space-y-4">
                      <category.icon className="w-20 h-20 mx-auto opacity-80" />
                      <h3 className="text-2xl font-bold">{category.title}</h3>
                      <p className="text-white/80">{category.description}</p>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold text-brand-dark">Dostupno u apoteci</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      ))}

      {/* CTA sekcija */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-brand-dark mb-6">
              Želite da proverite dostupnost proizvoda?
            </h2>
            <p className="text-xl text-brand-muted mb-8 max-w-2xl mx-auto">
              Kontaktirajte nas i rezervišite proizvod pre nego što dođete
            </p>
            <motion.a
              href="/kontakt"
              className="btn-primary inline-flex items-center space-x-2 px-8 py-4 text-lg font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Rezervišite proizvod</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
