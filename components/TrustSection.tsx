"use client"

import { motion } from "framer-motion"

export default function TrustSection() {
  const stats = [
    {
      number: "10+",
      label: "Godina iskustva"
    },
    {
      number: "5000+",
      label: "Srećnih njuškica"
    },
    {
      number: "24/7",
      label: "Hitna pomoć"
    }
  ]

  return (
    <>
      {/* 1. DEO - STATISTIKA */}
      <section className="bg-brand-dark py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="space-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <motion.div 
                  className="text-4xl md:text-5xl font-bold text-brand-primary"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2 + 0.3,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-white text-lg font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
