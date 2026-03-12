"use client"

import { motion } from "framer-motion"
import { Clock, Calendar, Tag } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("Sve")

  const filters = ["Sve", "Psi", "Mačke", "Ishrana", "Zdravlje", "Saveti"]

  const blogPosts = [
    {
      id: 1,
      title: "Redovni pregledi: Zašto su bitni?",
      excerpt: "Redovni veterinarski pregledi su ključni za prevenciju bolesti i očuvanje zdravlja vašeg ljubimca. Saznajte koliko često treba da ih obavljate.",
      category: "Zdravlje",
      tag: "Psi",
      date: "Jan 29, 2024",
      readTime: "5 min čitanja",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&h=600&fit=crop",
      alt: "Veterinar pregleda psa",
      slug: "redovni-pregledi-zasto-su-bitni"
    },
    {
      id: 2,
      title: "Najbolja hrana za starije pse",
      excerpt: "Stariji psi imaju specifične nutritivne potrebe. Otkrijte koja hrana je najbolja za zdravlje i kvalitet života vašeg starijeg ljubimca.",
      category: "Ishrana",
      tag: "Psi",
      date: "Jan 27, 2024",
      readTime: "7 min čitanja",
      image: "https://cdn.pixabay.com/photo/2017/02/20/18/03/dog-2083492_1280.jpg",
      alt: "Hrana za starije pse",
      slug: "najbolja-hrana-za-starije-pse"
    },
    {
      id: 3,
      title: "Kako prepoznati stres kod mačke?",
      excerpt: "Mačke često kriju znake stresa. Naučite prepoznati simptome i kako pomoći vašoj mački da se oseća bezbedno i opušteno.",
      category: "Zdravlje",
      tag: "Mačke",
      date: "Jan 25, 2024",
      readTime: "6 min čitanja",
      image: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_1280.jpg",
      alt: "Mačka u mirnom položaju",
      slug: "kako-prepoznati-stres-kod-macke"
    },
    {
      id: 4,
      title: "Priprema ljubimca za putovanje",
      excerpt: "Planirate putovanje sa ljubimcem? Praktični saveti za bezbedno i bezbrižno putovanje, od dokumentacije do pripreme za put.",
      category: "Saveti",
      tag: "Psi",
      date: "Jan 23, 2024",
      readTime: "8 min čitanja",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=800&auto=format&fit=crop",
      alt: "Ljubimac u putovanju",
      slug: "priprema-ljubimca-za-putovanje"
    },
    {
      id: 5,
      title: "Trening socijalizacije štenaca",
      excerpt: "Rana socijalizacija je ključna za razvoj zdrave i srećne psine ličnosti. Saznajte kako pravilno socijalizovati štene.",
      category: "Saveti",
      tag: "Psi",
      date: "Jan 21, 2024",
      readTime: "10 min čitanja",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop",
      alt: "Štene u treningu",
      slug: "trening-socijalizacije-stenaca"
    },
    {
      id: 6,
      title: "Nega zuba kod kućnih ljubimaca",
      excerpt: "Oralno zdravlje je važno za opšte zdravlje ljubimca. Naučite kako pravilno čistiti zube i preventirati dentalne probleme.",
      category: "Zdravlje",
      tag: "Mačke",
      date: "Jan 19, 2024",
      readTime: "5 min čitanja",
      image: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=600&fit=crop",
      alt: "Nega zuba kod ljubimaca",
      slug: "nega-zuba-kod-kucnih-ljubimaca"
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
            <h1 className="h1 mt-6 mb-2 md:mt-8 md:mb-4">VetiCare Blog</h1>
            <p className="text-xl text-brand-muted max-w-3xl mx-auto">
              Saveti naših stručnjaka za zdrav i srećan život vaših ljubimaca
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
                Nema članaka u kategoriji "{activeFilter}"
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
