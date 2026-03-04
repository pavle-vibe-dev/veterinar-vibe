"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PawPrint, Phone, MapPin, Clock, Instagram, Facebook, ChevronDown, Mail, Syringe, Heart, Stethoscope, ShieldPlus, Scissors, Loader2, Check, PhoneCall, Star, Quote } from "lucide-react"

export default function Footer() {
  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    petType: "",
    service: "",
    note: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    { text: "Najbolja klinika u gradu, spasili su mog kucu!", author: "Milica P." },
    { text: "Izvanredna briga i ljubaznost. Preporučujem svima!", author: "Marko T." },
    { text: "Profesionalni pristup i stručni doktori. Hvala!", author: "Ana J." },
    { text: "Brza reakcija u hitnim situacijama. Sve preporuke!", author: "Petar K." }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [testimonials.length])

  const services = [
    { value: "vakcinacija", label: "Vakcinacija", icon: Syringe },
    { value: "pregled", label: "Opšti pregled", icon: Stethoscope },
    { value: "hirurgija", label: "Hirurgija", icon: ShieldPlus },
    { value: "ciscenje", label: "Šišanje i čišćenje", icon: Scissors },
    { value: "kontrola", label: "Kontrola zdravlja", icon: Heart }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handlePetTypeSelect = (type: string) => {
    setFormData({
      ...formData,
      petType: type
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulacija slanja forme
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset forme posle 3 sekunde
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        ownerName: "",
        petName: "",
        petType: "",
        service: "",
        note: ""
      })
    }, 3000)
  }

  return (
    <footer className="bg-brand-dark text-white">
      {/* GORNJI DEO - Booking Widget */}
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
              <h2 className="text-3xl font-bold mb-4 text-white">Brzo zakazivanje</h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Rezervišite termin za vašeg ljubimca u samo nekoliko klikova. 
                Naš tim je uvek spreman da pruži najbolju negu.
              </p>

              {/* Dodatni elementi ispod teksta */}
              <div className="flex flex-col gap-6 mt-8">
                {/* Emergency Card */}
                <motion.div
                  className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <PhoneCall className="w-6 h-6 text-red-400" />
                    </motion.div>
                    <div>
                      <div className="text-red-400 font-semibold">HITAN POZIV</div>
                      <a 
                        href="tel:+381112345678" 
                        className="text-white text-lg font-bold hover:text-red-300 transition-colors duration-300"
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
                  <span className="text-green-400 font-medium">Dežurni tim je dostupan</span>
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
                    <div>Sub: 9:00-15:00</div>
                    <div>Ned: Hitni slučajevi</div>
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
                      <div className="text-slate-400 text-xs">na osnovu 250+ Google recenzija</div>
                    </div>
                  </div>

                  {/* Carousel Citat */}
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentTestimonial}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-start space-x-2"
                      >
                        <Quote className="w-4 h-4 text-brand-primary flex-shrink-0 mt-1" />
                        <div className="italic text-slate-300 text-sm">
                          "{testimonials[currentTestimonial].text}" - {testimonials[currentTestimonial].author}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Avatar Grupa */}
                  <div className="flex items-center space-x-2">
                    <div className="flex -space-x-2">
                      {/* Avatar 1 */}
                      <div className="w-6 h-6 bg-blue-500 rounded-full border-2 border-brand-dark flex items-center justify-center">
                        <span className="text-white text-xs font-bold">M</span>
                      </div>
                      {/* Avatar 2 */}
                      <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-brand-dark flex items-center justify-center">
                        <span className="text-white text-xs font-bold">A</span>
                      </div>
                      {/* Avatar 3 */}
                      <div className="w-6 h-6 bg-purple-500 rounded-full border-2 border-brand-dark flex items-center justify-center">
                        <span className="text-white text-xs font-bold">P</span>
                      </div>
                      {/* Avatar 4 */}
                      <div className="w-6 h-6 bg-orange-500 rounded-full border-2 border-brand-dark flex items-center justify-center">
                        <span className="text-white text-xs font-bold">J</span>
                      </div>
                    </div>
                    <span className="text-slate-400 text-xs">250+ zadovoljnih klijenata</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Desno - Modern Booking Widget */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <form id="footer-booking" id="zakazivanje" onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                  {/* Red 1 - Ime vlasnika i ime ljubimca */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Ime vlasnika</label>
                      <input
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        placeholder="Vaše ime"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white/10 transition-all duration-300"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Ime ljubimca</label>
                      <input
                        type="text"
                        name="petName"
                        value={formData.petName}
                        onChange={handleInputChange}
                        placeholder="Ime ljubimca"
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white/10 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Red 2 - Vrsta ljubimca (Radio Button Group) */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-white/80 mb-3">Vrsta ljubimca</label>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button
                        type="button"
                        onClick={() => handlePetTypeSelect("pas")}
                        className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                          formData.petType === "pas" 
                            ? "border-brand-primary bg-brand-primary/20" 
                            : "border-white/20 bg-white/5 hover:border-white/40"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <PawPrint className="w-8 h-8" />
                          <span className="font-medium">Pas</span>
                        </div>
                        {formData.petType === "pas" && (
                          <motion.div
                            className="absolute top-2 right-2 w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={() => handlePetTypeSelect("macka")}
                        className={`relative p-6 rounded-xl border-2 transition-all duration-300 ${
                          formData.petType === "macka" 
                            ? "border-brand-primary bg-brand-primary/20" 
                            : "border-white/20 bg-white/5 hover:border-white/40"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex flex-col items-center space-y-2">
                          <div className="w-8 h-8 relative">
                            <div className="absolute inset-0 bg-brand-primary rounded-full opacity-80"></div>
                            <div className="absolute inset-1 bg-white rounded-full"></div>
                            <div className="absolute top-1 left-1 w-1 h-1 bg-brand-primary rounded-full"></div>
                            <div className="absolute top-1 right-1 w-1 h-1 bg-brand-primary rounded-full"></div>
                            <div className="absolute bottom-2 left-2 w-1 h-1 bg-brand-primary rounded-full"></div>
                            <div className="absolute bottom-2 right-2 w-1 h-1 bg-brand-primary rounded-full"></div>
                          </div>
                          <span className="font-medium">Mačka</span>
                        </div>
                        {formData.petType === "macka" && (
                          <motion.div
                            className="absolute top-2 right-2 w-6 h-6 bg-brand-primary rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                          >
                            <Check className="w-4 h-4 text-white" />
                          </motion.div>
                        )}
                      </motion.button>
                    </div>
                  </div>

                  {/* Red 3 - Custom Select sa ikonicama */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-white/80 mb-3">Izaberite uslugu</label>
                    <div className="relative">
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white appearance-none focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white/10 transition-all duration-300 cursor-pointer"
                      >
                        <option value="" className="bg-brand-dark text-white">Izaberite uslugu</option>
                        {services.map((service) => {
                          const Icon = service.icon
                          return (
                            <option key={service.value} value={service.value} className="bg-brand-dark text-white">
                              {service.label}
                            </option>
                          )
                        })}
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                    </div>
                  </div>

                  {/* Red 4 - Textarea */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-white/80 mb-3">Dodatna napomena (opciono)</label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      placeholder="Unesite dodatne informacije..."
                      rows={3}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white/10 transition-all duration-300 resize-none"
                    />
                  </div>

                  {/* Submit dugme sa shimmer efektom */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="relative w-full py-4 bg-brand-primary rounded-xl font-bold text-lg overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
                  >
                    {/* Shimmer efekt */}
                    <AnimatePresence>
                      {!isSubmitting && !isSubmitted && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      )}
                    </AnimatePresence>

                    {/* Dinamički sadržaj dugmeta */}
                    <AnimatePresence mode="wait">
                      {!isSubmitting && !isSubmitted && (
                        <motion.span
                          key="submit"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          Pošalji zahtev
                        </motion.span>
                      )}
                      
                      {isSubmitting && (
                        <motion.div
                          key="loading"
                          className="flex items-center justify-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <Loader2 className="w-6 h-6 animate-spin" />
                        </motion.div>
                      )}
                      
                      {isSubmitted && (
                        <motion.div
                          key="success"
                          className="flex items-center justify-center space-x-2"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <Check className="w-6 h-6" />
                          <span>Uspešno poslato!</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
                <PawPrint className="w-8 h-8 text-brand-primary" />
                <span className="text-xl font-bold text-white">VetiCare</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Vaš partner u zdravlju i sreći vaših ljubimaca. 
                Pružamo vrhunsku veterinarsku negu sa ljubavlju i stručnim pristupom.
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
                    Usluge
                  </a>
                </li>
                <li>
                  <a href="/tim" className="text-slate-400 hover:text-white transition-colors duration-300">
                    Tim
                  </a>
                </li>
                <li>
                  <a href="/kontakt" className="text-slate-400 hover:text-white transition-colors duration-300">
                    Kontakt
                  </a>
                </li>
                <li>
                  <a href="/blog" className="text-slate-400 hover:text-white transition-colors duration-300">
                    Blog
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
                  <span className="text-slate-400">Pon-Pet: 8:00-20:00, Sub: 9:00-15:00</span>
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
              © 2024 VetiCare. Sva prava zadržana. Napravljeno sa ❤️ za vaše ljubimce.
            </p>
          </div>
        </div>
      </section>
    </footer>
  )
}
