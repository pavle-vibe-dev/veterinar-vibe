"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingBag, Phone, MapPin, Clock, Instagram, Facebook, Mail, Loader2, Check, Star } from "lucide-react"

export default function Footer() {
  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    email: "",
    productRequest: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const { bookAppointment } = await import('../app/actions/bookAppointment')

      const result = await bookAppointment({
        ownerName: formData.ownerName,
        phone: formData.phone,
        email: formData.email,
        notes: formData.productRequest,
        petName: "",
        petType: "",
        service: ""
      })

      if (result.success) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          setFormData({
            ownerName: "",
            phone: "",
            email: "",
            productRequest: ""
          })
        }, 3000)
      } else {
        alert('Greška pri slanju: ' + (result.error || 'Molimo pokušajte ponovo'))
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Greška pri slanju. Molimo pokušajte ponovo.')
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-brand-dark text-white overflow-x-hidden">
      {/* GORNJI DEO - Reservation Widget */}
      <section className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Levo - Tekst */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-4 text-white">Rezervišite proizvod</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Pošaljite nam upit za proizvod koji Vam je potreban. Javićemo Vam se u najkraćem roku sa informacijom o dostupnosti i ceni.
              </p>

              {/* Dodatni elementi ispod teksta */}
              <div className="flex flex-col gap-6 mt-8">
                {/* Kontakt Card */}
                <motion.div
                  className="bg-brand-primary/10 border border-brand-primary/20 p-4 rounded-xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-3">
                    <Phone className="w-6 h-6 text-brand-primary" />
                    <div>
                      <div className="text-brand-primary font-semibold">POZOVITE NAS</div>
                      <a
                        href="tel:+381112345678"
                        className="text-white text-lg font-bold hover:text-brand-primary transition-colors duration-300"
                      >
                        011/234-5678
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Status značka */}
                <motion.div
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="text-green-400 font-medium">Radno vreme: pogledajte ispod</span>
                </motion.div>

                {/* Radno vreme */}
                <motion.div
                  className="flex items-center space-x-3 text-slate-400"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <Clock className="w-5 h-5 text-brand-primary" />
                  <div className="text-sm">
                    <div>Pon-Pet: 8:00-20:00</div>
                    <div>Sub: 8:00-16:00</div>
                    <div>Ned: 9:00-14:00</div>
                  </div>
                </motion.div>

                {/* Social Proof Blok */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  {/* Google Rating Bedž */}
                  <div className="flex items-center space-x-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div>
                      <div className="text-white font-semibold">4.9/5</div>
                      <div className="text-slate-400 text-xs">na osnovu 150+ Google recenzija</div>
                    </div>
                  </div>

                  {/* Avatar Grupa */}
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-brand-dark flex items-center justify-center">
                        <span className="text-white text-xs font-bold">M</span>
                      </div>
                      <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-brand-dark flex items-center justify-center">
                        <span className="text-white text-xs font-bold">A</span>
                      </div>
                      <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-brand-dark flex items-center justify-center">
                        <span className="text-white text-xs font-bold">P</span>
                      </div>
                      <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-brand-dark flex items-center justify-center">
                        <span className="text-white text-xs font-bold">J</span>
                      </div>
                    </div>
                    <span className="text-slate-400 text-xs">1000+ zadovoljnih kupaca</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Desno - Reservation Widget */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <form id="rezervacija" onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  {/* Ime */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-white/80 mb-2">Ime i prezime</label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      placeholder="Vaše ime i prezime"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white/10 transition-all duration-300"
                    />
                  </div>

                  {/* Telefon */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-white/80 mb-2">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Vaš broj telefona"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white/10 transition-all duration-300"
                    />
                  </div>

                  {/* Email */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-white/80 mb-2">Email (opciono)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Vaša email adresa"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white/10 transition-all duration-300"
                    />
                  </div>

                  {/* Textarea za proizvode */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-white/80 mb-3">Porudžbina / Upit</label>
                    <textarea
                      name="productRequest"
                      value={formData.productRequest}
                      onChange={handleInputChange}
                      placeholder="Navedite naziv proizvoda, leka ili hrane koji Vam je potreban (i željenu količinu)..."
                      rows={4}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white/10 transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit dugme */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="relative w-full py-4 bg-brand-primary rounded-xl font-bold text-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
                  >
                    {!isSubmitting && !isSubmitted && (
                      <span>Pošalji upit za rezervaciju</span>
                    )}
                    {isSubmitting && (
                      <span className="flex items-center justify-center space-x-2">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        <span>Slanje...</span>
                      </span>
                    )}
                    {isSubmitted && (
                      <span className="flex items-center justify-center space-x-2">
                        <Check className="w-6 h-6" />
                        <span>Uspešno poslato!</span>
                      </span>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* DONJI DEO - Info & Linkovi */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Logo & Opis */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingBag className="w-8 h-8 text-brand-primary" />
                <span className="text-xl font-bold text-white">BG PET</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Veterinarska apoteka i Pet Shop na Voždovcu. Specializovani za medicinsku hranu, zaštitu od parazita, suplemente i opremu za Vaše ljubimce.
              </p>
            </motion.div>

            {/* Linkovi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Brzi linkovi</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/usluge" className="text-slate-400 hover:text-white transition-colors duration-300">
                    Asortiman
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-slate-400 hover:text-white transition-colors duration-300">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/kontakt" className="text-slate-400 hover:text-white transition-colors duration-300">
                    Rezervacija
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Kontakt info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Kontakt</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-brand-primary" />
                  <span className="text-slate-400">+381 11 234 5678</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-brand-primary" />
                  <span className="text-slate-400">Bulevar oslobodjenja 45, Beograd</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-brand-primary" />
                  <span className="text-slate-400">Pon-Pet: 8:00-20:00, Sub: 8:00-16:00, Ned: 9:00-14:00</span>
                </div>
              </div>

              {/* Social media ikonice */}
              <div className="flex space-x-4 mt-6">
                <motion.a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-primary transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-primary transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Copyright */}
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-slate-400">
              &copy; 2024 BG PET. Sva prava zadržana. Napravljeno sa ❤️ za vaše ljubimce.
            </p>
          </div>
        </div>
      </section>
    </footer>
  )
}
