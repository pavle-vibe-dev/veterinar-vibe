"use client"

import { motion } from "framer-motion"
import { Clock, Calendar } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("Sve")

  const filters = ["Sve", "Psi", "Mačke", "Ishrana", "Zdravlje", "Nega"]

  const blogPosts = [
    {
      id: 1,
      title: "Kako odabrati najbolju zaštitu od krpelja i buva ove sezone?",
      excerpt: "Razlike između tableta, ampula i ogrlica koje imamo u apoteci. Saznajte koja zaštita je najbolja za vašeg ljubimca.",
      category: "Zdravlje",
      tag: "Psi",
      date: "Mar 15, 2024",
      readTime: "6 min čitanja",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop",
      alt: "Zaštita od krpelja i buva za pse",
      slug: "kako-odabrati-najbolju-zastitu-od-krpelja"
    },
    {
      id: 2,
      title: "Kada je ljubimcu potrebna medicinska hrana i kako prepoznati simptome?",
      excerpt: "Dijete za bubrege, stomak i alergije - naučite da prepoznate znakove i odaberete pravu hranu za vašeg ljubimca.",
      category: "Ishrana",
      tag: "Psi",
      date: "Mar 10, 2024",
      readTime: "8 min čitanja",
      image: "https://cdn.pixabay.com/photo/2017/02/20/18/03/dog-2083492_1280.jpg",
      alt: "Medicinska hrana za pse",
      slug: "kada-je-ljubimcu-potrebna-medicinska-hrana"
    },
    {
      id: 3,
      title: "Značaj suplemenata u ishrani pasa: Da li vaš ljubimac dobija dovoljno vitamina?",
      excerpt: "Jačanje imuniteta i zglobova uz pomoć pravih suplemenata. Saznajte koji dodaci su neophodni za zdravlje vašeg ljubimca.",
      category: "Zdravlje",
      tag: "Psi",
      date: "Feb 28, 2024",
      readTime: "7 min čitanja",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=800&auto=format&fit=crop",
      alt: "Vitamini i suplementi za pse",
      slug: "znacaj-suplemenata-u-ishrani-pasa"
    },
    {
      id: 4,
      title: "Nega dlake i kože tokom leta: Pravilan odabir šampona za osetljive ljubimce",
      excerpt: "Saveti za negu kože i dlake tokom toplih meseci. Kako odabrati prave preparate za osetljive pse i mačke.",
      category: "Nega",
      tag: "Mačke",
      date: "Feb 20, 2024",
      readTime: "5 min čitanja",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop",
      alt: "Nega dlake i kože kod kućnih ljubimaca",
      slug: "nega-dlake-i-koze-tokom-leta"
    },
    {
      id: 5,
      title: "Kako pravilno čuvati veterinarske preparate kod kuće?",
      excerpt: "Pravilno skladištenje lekova i preparata je ključno za njihovu efikasnost. donosimo savete za čuvanje veterinarskih proizvoda.",
      category: "Saveti",
      tag: "Psi",
      date: "Feb 15, 2024",
      readTime: "4 min čitanja",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop",
      alt: "Čuvanje veterinarskih preparata",
      slug: "kako-pravilno-cuvati-veterinarske-preparate"
    },
    {
      id: 6,
      title: "Probiotici za pse: Kada su potrebni i kako ih odabrati?",
      excerpt: "Probiotici mogu značajno poboljšati digestiju i imunitet vašeg ljubimca. Saznajte sve o probioticima za pse i mačke.",
      category: "Zdravlje",
      tag: "Mačke",
      date: "Feb 10, 2024",
      readTime: "6 min čitanja",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=800&auto=format&fit=crop",
      alt: "Probiotici za pse i mačke",
      slug: "probiotici-za-pse-kada-su-potrebni"
    }
  ]

  const filteredPosts = activeFilter === "Sve" 
    ? blogPosts 
    : blogPosts.filter(post => post.tag === activeFilter || post.category === activeFilter)

  return (
    <div className="min-h-screen bg-brand-bg overflow-x-hidden">
      {/* HERO SEKCIJA */}
      <section className="pt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="h1 mt-6 mb-2 md:mt-8 md:mb-4">BG PET Blog</h1>
            <p className="text-xl text-brand-muted max-w-3xl mx-auto">
              Saveti za zdravlje, ishranu i negu vaših ljubimaca
            </p>
          </motion.div>
        </div>
      </section>

      {/* FILTERI */}
      <section className="py-8 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-brand-primary text-white shadow-lg"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={`/blog/${post.slug}`} className="block group cursor-pointer">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                    {/* Slika */}
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.alt}
                        width={400}
                        height={250}
                        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 max-w-full box-border"
                      />
                      
                      {/* Tag */}
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center space-x-1 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium">
                          <span>{post.category}</span>
                        </span>
                      </div>
                    </div>

                    {/* Sadržaj */}
                    <div className="p-6">
                      {/* Meta informacije */}
                      <div className="flex items-center space-x-4 text-sm text-brand-muted mb-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>

                      {/* Naslov */}
                      <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-brand-primary transition-colors duration-300">
                        {post.title}
                      </h3>

                      {/* Izvod */}
                      <p className="text-brand-muted leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>

                      {/* Tag */}
                      <div className="mt-4">
                        <span className="inline-block bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm">
                          #{post.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Prazno stanje ako nema rezultata */}
          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-lg text-brand-muted">
                Nema članaka u kategoriji &ldquo;{activeFilter}&rdquo;
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
