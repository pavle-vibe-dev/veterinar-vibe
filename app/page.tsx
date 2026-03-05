"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Heart, ChevronLeft, ChevronRight } from "lucide-react"
import Services from "../components/Services"
import Team from "../components/Team"
import Testimonials from "../components/Testimonials"
import TrustSection from "../components/TrustSection"

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      image: "/veterinar sa psom.jpg",
      alt: "Veterinar sa psom"
    },
    {
      image: "https://images.pexels.com/photos/6235124/pexels-photo-6235124.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
      alt: "Veterinar sa mačkom"
    },
    {
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1920&h=1080&fit=crop",
      alt: "Veterinarska klinika - moderna ordinacija"
    },
    {
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1920&h=1080&fit=crop",
      alt: "Veterinarska ambulanta - oprema i instrumenti"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Menja svakih 5 sekundi

    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }
  return (
    <>
      <div className="md:max-h-none overflow-visible">
        {/* Full-screen Hero Slider */}
        <section className="relative h-[70vh] md:h-187.5 lg:h-[85vh]">
        <div className="absolute inset-0 w-full h-full overflow-x-hidden">
        {/* Slider slike */}
        {slides.map((slide, index) => (
          <motion.img
            key={index}
            src={slide.image}
            alt={slide.alt}
            className={`absolute inset-0 w-full h-full object-cover object-center ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: index === currentSlide ? 1 : 0,
              scale: index === currentSlide ? 1 : 1.1
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        ))}

        {/* Tamni overlay za bolju vidljivost teksta */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Kontrole levo/desno */}
        <motion.button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full shadow-lg transition-colors duration-200 z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>
        
        <motion.button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full shadow-lg transition-colors duration-200 z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </motion.button>

        {/* Indikatori */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-brand-primary w-8' : 'bg-white/60'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
            />
          ))}
        </div>

        </div>

        {/* Tekst preko slike */}
        <div className="absolute inset-0 flex items-center justify-center z-10 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-20 text-center py-12">
            <motion.div 
              className="space-y-6 text-white"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.h1 
                className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight mb-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Vrhunska nega za vaše najbolje prijatelje.
              </motion.h1>
              
              <motion.p 
                className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Vaši ljubimci zaslužuju najbolju brigu. Naš tim iskusnih veterinarskih stručnjaka je tu da pruži ljubav, pažnju i profesionalnu negu koju vaši četvoronojni prijatelji zaslužuju.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.a
                  href="#zakazivanje"
                  className="w-full sm:w-auto bg-brand-primary hover:bg-brand-primary/90 text-white px-6 sm:px-8 py-4 rounded-brand font-bold text-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Zakažite pregled
                </motion.a>
                
                <motion.a
                  href="/usluge"
                  className="w-full sm:w-auto bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-2 border-white/50 px-6 sm:px-8 py-4 rounded-brand font-bold text-lg transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Saznajte više
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Floating ikonica srca */}
        <motion.div
          className="absolute top-20 right-8 bg-white p-4 rounded-full shadow-lg z-10"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Heart className="w-8 h-8 text-brand-primary" />
        </motion.div>
      </section>
      
      <div className="space-y-4 md:space-y-8">
        {/* Services sekcija */}
        <Services />
        
        {/* Team sekcija */}
        <Team />
        
        {/* Testimonials sekcija */}
        <Testimonials />
        
        {/* TrustSection sekcija */}
        <TrustSection />
      </div>
      </div>
    </>
  )
}
