"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PawPrint, PhoneCall, Menu, X } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }
  return (
    <motion.nav 
      className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white border-b border-gray-200/10"
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

          {/* Hamburger Menu Button - Mobile */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
            aria-label="Toggle mobile menu"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6 text-slate-900" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6 text-slate-900" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          {/* Dugme - Desno (Desktop Only) */}
          <Link href="tel:+381112345678" className="hidden md:block">
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 w-full h-screen bg-white z-99999 md:hidden flex flex-col items-center justify-center"
            onClick={closeMobileMenu}
          >
            {/* X Dugme - Fixed Position */}
            <button
              onClick={closeMobileMenu}
              className="fixed top-6 right-6 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300 z-10000"
              aria-label="Close mobile menu"
            >
              <X className="w-6 h-6 text-slate-900" />
            </button>

            {/* Logo - Absolute Position */}
            <div className="absolute top-6 left-6">
              <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
                <PawPrint className="w-8 h-8 text-brand-primary" />
                <span className="text-xl font-bold text-brand-dark">VetiCare</span>
              </Link>
            </div>

            {/* Mobile Menu Links - Full Height Centered */}
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="text-2xl font-bold text-slate-900 hover:text-brand-primary transition-colors duration-300 py-2 px-4 rounded-lg"
              >
                Početna
              </Link>
              <Link
                href="/usluge"
                onClick={closeMobileMenu}
                className="text-2xl font-bold text-slate-900 hover:text-brand-primary transition-colors duration-300 py-2 px-4 rounded-lg"
              >
                Usluge
              </Link>
              <Link
                href="/blog"
                onClick={closeMobileMenu}
                className="text-2xl font-bold text-slate-900 hover:text-brand-primary transition-colors duration-300 py-2 px-4 rounded-lg"
              >
                Blog
              </Link>
              <Link
                href="/tim"
                onClick={closeMobileMenu}
                className="text-2xl font-bold text-slate-900 hover:text-brand-primary transition-colors duration-300 py-2 px-4 rounded-lg"
              >
                Tim
              </Link>
              <Link
                href="/kontakt"
                onClick={closeMobileMenu}
                className="text-2xl font-bold text-slate-900 hover:text-brand-primary transition-colors duration-300 py-2 px-4 rounded-lg"
              >
                Kontakt
              </Link>

              {/* Hitni Poziv Button - Below Kontakt */}
              <Link href="tel:+381112345678" onClick={closeMobileMenu}>
                <motion.div
                  className="btn-primary px-6 py-3 text-sm font-bold relative overflow-hidden cursor-pointer inline-flex items-center justify-center space-x-2 w-full"
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
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
