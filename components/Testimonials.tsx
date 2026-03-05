"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import Image from "next/image"

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Marko",
      pet: "labrador Maks",
      review: "Najbolji veterinar u gradu, spasili su mog ljubimca! Profesionalan pristup i izvanredna briga.",
      avatar: "https://i.pravatar.cc/150?u=marko"
    },
    {
      id: 2,
      name: "Jelena",
      pet: "mačka Luna",
      review: "Izvanredna briga i ljubaznost. Dr. Ana je čarobna sa životinjama. Preporučujem svima!",
      avatar: "https://i.pravatar.cc/150?u=jelena"
    },
    {
      id: 3,
      name: "Petar",
      pet: "nemački ovčar Rex",
      review: "Brza reakcija u hitnim situacijama. Sve preporuke za ovu kliniku i njihov tim!",
      avatar: "https://i.pravatar.cc/150?u=petar"
    }
  ]

  return (
    <section className="py-20 bg-brand-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Naslov sekcije */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="h2 mb-4">Šta kažu vlasnici naših pacijenata</h2>
          <p className="text-lg text-brand-muted max-w-3xl mx-auto">
            Istinite priče od zadovoljnih klijenata koji nam veruju zdravlje svojih ljubimaca
          </p>
        </motion.div>

        {/* Grid kartica */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full">
                {/* Zvezdice */}
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Recenzija */}
                <p className="text-brand-muted mb-6 leading-relaxed flex-grow">
                  "{testimonial.review}"
                </p>

                {/* Profil */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={testimonial.avatar}
                      alt={`${testimonial.name} avatar`}
                      width={50}
                      height={50}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-dark">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-brand-muted">
                      i {testimonial.pet}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Review sekcija */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 bg-white rounded-2xl px-8 py-6 shadow-lg">
            {/* Google Review logo */}
            <div className="flex items-center space-x-2">
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-xl font-bold text-brand-dark">Google Review</span>
            </div>

            {/* Ocena i broj recenzija */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-brand-dark">4.9</span>
              <span className="text-brand-muted">/5</span>
            </div>

            <div className="text-brand-muted text-center">
              na osnovu <span className="font-semibold text-brand-dark">250+</span> recenzija
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
