"use client"

import { motion } from "framer-motion"
import { PawPrint, PhoneCall } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  return (
    <motion.nav 
      className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/60 border-b border-gray-200/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Levo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <PawPrint className="w-8 h-8 text-brand-primary group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xl font-bold text-brand-dark">VetiCare</span>
          </Link>

          {/* Linkovi - Sredina */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-brand-dark hover:text-brand-primary transition-colors duration-300 font-medium relative group"
            >
              Početna
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/usluge" 
              className="text-brand-dark hover:text-brand-primary transition-colors duration-300 font-medium relative group"
            >
              Usluge
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/blog" 
              className="text-brand-dark hover:text-brand-primary transition-colors duration-300 font-medium relative group"
            >
              Blog
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/tim" 
              className="text-brand-dark hover:text-brand-primary transition-colors duration-300 font-medium relative group"
            >
              Tim
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="/kontakt" 
              className="text-brand-dark hover:text-brand-primary transition-colors duration-300 font-medium relative group"
            >
              Kontakt
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>

          {/* Dugme - Desno */}
          <Link href="tel:+381112345678">
            <motion.div 
              className="btn-primary px-6 py-3 text-sm font-bold relative overflow-hidden cursor-pointer inline-flex items-center space-x-2"
              animate={{
                scale: [1, 1.05, 1],
                backgroundColor: [
                  "rgb(239, 68, 68)",
                  "rgb(220, 38, 38)",
                  "rgb(239, 68, 68)"
                ],
                borderColor: [
                  "rgb(239, 68, 68)",
                  "rgb(220, 38, 38)",
                  "rgb(239, 68, 68)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ 
                scale: 1.1,
                backgroundColor: "rgb(220, 38, 38)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              <PhoneCall className="w-4 h-4" />
              <motion.span
                animate={{
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                Hitan poziv
              </motion.span>
              <span className="text-xs opacity-80">011/234-5678</span>
              <motion.div
                className="absolute inset-0 bg-white opacity-0"
                animate={{
                  opacity: [0, 0.2, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.nav>
  )
}
