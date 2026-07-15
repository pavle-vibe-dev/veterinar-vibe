"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Phone, Mail, Clock, Navigation, Loader2, Check } from "lucide-react"
import Link from "next/link"

export default function KontaktPage() {
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
      const { bookAppointment } = await import('../actions/bookAppointment')

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
            <h1 className="h1 mt-4 mb-2 md:mt-8 md:mb-4">Rezervišite proizvod ili proverite dostupnost</h1>
            <p className="text-xl text-brand-muted max-w-3xl mx-auto">
              Pošaljite nam upit i javićemo Vam se u najkraćem roku
            </p>
          </motion.div>
        </div>
      </section>

      {/* FORM I INFO */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Levo - Forma za rezervaciju */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-brand-dark mb-6">Pošaljite upit</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">Ime i prezime</label>
                    <input
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      placeholder="Vaše ime i prezime"
                      required
                      className="w-full px-4 py-3 bg-brand-bg border border-slate-200 rounded-xl text-brand-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Vaš broj telefona"
                      required
                      className="w-full px-4 py-3 bg-brand-bg border border-slate-200 rounded-xl text-brand-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">Email (opciono)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Vaša email adresa"
                      className="w-full px-4 py-3 bg-brand-bg border border-slate-200 rounded-xl text-brand-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-brand-dark mb-2">Porudžbina / Upit</label>
                    <textarea
                      name="productRequest"
                      value={formData.productRequest}
                      onChange={handleInputChange}
                      placeholder="Navedite naziv proizvoda, leka ili hrane koji Vam je potreban (i željenu količinu)..."
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-brand-bg border border-slate-200 rounded-xl text-brand-dark placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:bg-white transition-all duration-300 resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full py-4 bg-brand-primary rounded-xl font-bold text-lg text-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-brand-primary-hover transition-colors duration-300"
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
                </form>
              </div>
            </motion.div>

            {/* Desno - Info kartice */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Kartica 1: Adresa */}
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-4 bg-brand-primary/10 rounded-lg">
                    <MapPin className="w-8 h-8 text-brand-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Adresa</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-slate-700 leading-relaxed text-lg">
                    Bulevar oslobođenja 45<br />
                    11000 Beograd, Srbija
                  </p>
                  <Link
                    href="https://maps.google.com/?q=Bulevar+Oslobođenja+45+Beograd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Navigacija</span>
                  </Link>
                </div>
              </div>

              {/* Kartica 2: Kontakt */}
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-4 bg-brand-primary/10 rounded-lg">
                    <Phone className="w-8 h-8 text-brand-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Telefon</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <Link
                      href="tel:+381112345678"
                      className="flex items-center space-x-2 text-slate-700 hover:text-brand-primary transition-colors duration-300 text-2xl font-bold"
                    >
                      <Phone className="w-5 h-5" />
                      <span>011/234-5678</span>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href="mailto:info@bgpet.rs"
                      className="flex items-center space-x-2 text-slate-600 hover:text-brand-primary transition-colors duration-300"
                    >
                      <Mail className="w-4 h-4" />
                      <span className="font-medium">info@bgpet.rs</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Kartica 3: Radno vreme */}
              <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-4 bg-brand-primary/10 rounded-lg">
                    <Clock className="w-8 h-8 text-brand-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Radno vreme</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-slate-700">
                    <span className="font-medium">Pon-Pet</span>
                    <span className="font-bold">08-20h</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="font-medium">Subota</span>
                    <span className="font-bold">08-16h</span>
                  </div>
                  <div className="flex justify-between text-slate-700">
                    <span className="font-medium">Nedelja</span>
                    <span className="font-bold">09-14h</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* GOOGLE MAPA */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="h2 mb-4">Naša lokacija</h2>
            <p className="text-lg text-brand-muted">
              Pronađite nas na Voždovcu
            </p>
          </motion.div>

          <motion.div
            className="rounded-2xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2806.8345!2d20.4622!3d44.8125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDTCsDQ4JzQ1LjAiTiAyMMKwMjcnNDcuOSJF!5e0!3m2!1ssr!2srs!4v1234567890"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[450px]"
              title="BG PET Veterinarska apoteka - Lokacija"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
