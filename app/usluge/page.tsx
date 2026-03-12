"use client"

import { motion } from "framer-motion"
import { ArrowRight, Stethoscope, ShieldPlus, Heart, Star, Quote, ChevronRight } from "lucide-react"
import Image from "next/image"

export default function UslugePage() {
  return (
    <div className="min-h-screen bg-brand-bg overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="h1 mt-6 mb-2 md:mt-8 md:mb-4">Naše Usluge</h1>
            <p className="text-xl text-brand-muted max-w-3xl mx-auto">
              Pružamo kompletnu veterinarsku negu za vaše ljubimce, od preventivnih pregleda do složenih hirurških zahvata
            </p>
          </motion.div>
        </div>
      </section>

      {/* 1. SEKCIJA: OPŠTA MEDICINA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Levo - Tekst */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <Stethoscope className="w-8 h-8 text-brand-primary" />
                <h2 className="text-3xl font-bold text-brand-dark">Opšta Medicina</h2>
              </div>
              
              <p className="text-lg text-brand-muted mb-8 leading-relaxed">
                Redovni sistematski pregledi su ključ za dug i zdrav život vašeg ljubimca. 
                Naš tim stručnjaka pruža komplementarnu negu koja obuhvata sve aspekte zdravlja vašeg četvorostrukog prijatelja.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-brand-primary/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark mb-1">Godišnji pregledi</h3>
                    <p className="text-brand-muted">Kompletan zdravstveni check-up za rano otkrivanje potencijalnih problema</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-brand-primary/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark mb-1">Laboratorija</h3>
                    <p className="text-brand-muted">Brza i precizna dijagnostika sa modernom laboratorijskom opremom</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-brand-primary/10 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-dark mb-1">Saveti o ishrani</h3>
                    <p className="text-brand-muted">Personalizirani planovi ishrane za optimalno zdravlje i vitalnost</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Desno - Slika */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <Image
                  src="/veterinar sa psom.jpg"
                  alt="Veterinar pregleda psa"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl object-cover h-100 max-w-full box-border"
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-brand-primary text-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-semibold">10+ godina iskustva</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Separator 1 */}
      <section className="relative h-64 overflow-hidden bg-linear-to-br from-brand-primary/40 to-brand-secondary/40">
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-8">
          <motion.div
            className="text-center text-white max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Quote className="w-12 h-12 text-brand-primary mx-auto mb-4" />
            <p className="text-2xl md:text-3xl font-bold mb-4 italic">
              "Ljubav prema životinjama je jedan od najplemenitijih strana ljudskog karaktera."
            </p>
            <p className="text-lg opacity-80">- Žan Žak Ruso</p>
          </motion.div>
        </div>
      </section>

      {/* 2. SEKCIJA: HIRURGIJA (Zamena strana) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Levo - Slika */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <Image
                  src="/hirurski zahvat.jpg"
                  alt="Moderna operaciona sala"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl object-cover h-100 max-w-full box-border"
                />
                <div className="absolute -top-6 -left-6 bg-white text-brand-dark p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <ShieldPlus className="w-5 h-5 text-brand-primary" />
                    <span className="font-semibold">Bezbednost na prvom mestu</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Desno - Tekst */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <ShieldPlus className="w-8 h-8 text-brand-primary" />
                <h2 className="text-3xl font-bold text-brand-dark">Hirurški Zahvati</h2>
              </div>
              
              <p className="text-lg text-brand-muted mb-8 leading-relaxed">
                Naša hirurška jedinica opremljena je najmodernijom tehnologijom, a naš tim iskusnih hirurga 
                garantuje bezbednu i efikasnu intervenciju za vašeg ljubimca.
              </p>

              <div className="bg-brand-primary/10 rounded-xl p-6 border border-brand-primary/30">
                <h3 className="font-semibold text-brand-dark mb-4">Šta obezbeđujemo:</h3>
                <ul className="space-y-3 text-brand-dark">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                    <span>Bezbednu anesteziju sa kontinuiranim monitoringom</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                    <span>Postoperativnu negu i praćenje oporavka</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                    <span>Ikusne hirurge sa specijalizacijama</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-brand-primary rounded-full"></div>
                    <span>Modernu opremu za sve tipove intervencija</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Separator 2 */}
      <section className="relative h-64 overflow-hidden bg-linear-to-br from-brand-secondary/40 to-brand-primary/40">
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center p-8">
          <motion.div
            className="text-center text-white max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Heart className="w-12 h-12 text-brand-primary mx-auto mb-4" />
            <p className="text-2xl md:text-3xl font-bold mb-4 italic">
              "Životinje su pouzdaniji, ljubazniji i manje komplikovani od ljudi."
            </p>
            <p className="text-lg opacity-80">- Džordž Eliot</p>
          </motion.div>
        </div>
      </section>

      {/* 3. SEKCIJA: STOMATOLOGIJA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Levo - Tekst */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <Heart className="w-8 h-8 text-brand-primary" />
                <h2 className="text-3xl font-bold text-brand-dark">Stomatologija</h2>
              </div>
              
              <p className="text-lg text-brand-muted mb-8 leading-relaxed">
                Zdravlje zuba je često zanemareno, ali ključno za opšte zdravlje vašeg ljubimca. 
                Naša stomatološka služba pruža kompletnu negu od čišćenja kamenca do složenih oralnih procedura.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="bg-brand-bg rounded-xl p-6">
                  <h3 className="font-semibold text-brand-dark mb-3">Uklanjanje kamenca</h3>
                  <p className="text-brand-muted text-sm">Profesionalno čišćenje zuba i prevencija bolesti desni</p>
                </div>
                <div className="bg-brand-bg rounded-xl p-6">
                  <h3 className="font-semibold text-brand-dark mb-3">Poliranje zuba</h3>
                  <p className="text-brand-muted text-sm">Estetska obrada i zaštita zubne gleđi</p>
                </div>
                <div className="bg-brand-bg rounded-xl p-6">
                  <h3 className="font-semibold text-brand-dark mb-3">Ekstrakcija zuba</h3>
                  <p className="text-brand-muted text-sm">Bezbedno uklanjanje oštećenih ili bolesnih zuba</p>
                </div>
                <div className="bg-brand-bg rounded-xl p-6">
                  <h3 className="font-semibold text-brand-dark mb-3">Oralna hirurgija</h3>
                  <p className="text-brand-muted text-sm">Složeni oralni hirurški zahvati</p>
                </div>
              </div>
            </motion.div>

            {/* Desno - Slika */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <Image
                  src="https://images.pexels.com/photos/7469274/pexels-photo-7469274.jpeg?auto=compress&cs=tinysrgb&w=600&h=400"
                  alt="Pas i veterinar - zajednički pregled"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl object-cover h-100 max-w-full box-border"
                />
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-brand-primary text-white p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 fill-current" />
                    <span className="font-semibold">Zdrav osmeh</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dugme za zakazivanje */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-brand-dark mb-6">
              Spremni ste za najbolju negu vašeg ljubimca?
            </h2>
            <p className="text-xl text-brand-muted mb-8 max-w-2xl mx-auto">
              Naš tim čeka vas sa stručnom pažnjom i modernom opremom za sve veterinarske usluge
            </p>
            <motion.a
              href="#footer-booking"
              className="btn-primary inline-flex items-center space-x-2 px-8 py-4 text-lg font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Zakažite neku od ovih usluga</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* SOCIAL PROOF SEKCIJA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="h2 mb-4">Rezultati kojima verujete</h2>
            <p className="text-lg text-brand-muted max-w-3xl mx-auto">
              Istinite priče o uspešnim tretmanima i zadovoljnim vlasnicima
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white border border-slate-100 rounded-3xl p-8 h-full">
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-brand-muted mb-6 leading-relaxed">
                  "Dr. Milan je izveo operaciju kolena mom psu, sada ponovo trči u parku! Profesoionalan pristup i izvanredna nega."
                </p>
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://i.pravatar.cc/150?img=51"
                    alt="Milan Petrović"
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full object-cover max-w-full box-border"
                  />
                  <div>
                    <p className="font-semibold text-brand-dark">Milan Petrović</p>
                    <p className="text-sm text-brand-muted">i nemački ovčar Rex</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 2 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-white border border-slate-100 rounded-3xl p-8 h-full">
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-brand-muted mb-6 leading-relaxed">
                  "Stomatološki tretman za našu mačku je bio bezbolan i efikasan. Dr. Ana je čarobna sa životinjama!"
                </p>
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://i.pravatar.cc/150?img=47"
                    alt="Jelena Marković"
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full object-cover max-w-full box-border"
                  />
                  <div>
                    <p className="font-semibold text-brand-dark">Jelena Marković</p>
                    <p className="text-sm text-brand-muted">i perzijska mačka Miki</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Testimonial 3 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-white border border-slate-100 rounded-3xl p-8 h-full">
                <div className="flex space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-brand-muted mb-6 leading-relaxed">
                  "Redovni pregledi i vakcinacija su spasili života našem ljubimcu. Preporučujem svima!"
                </p>
                <div className="flex items-center space-x-4">
                  <Image
                    src="https://i.pravatar.cc/150?img=64"
                    alt="Marko Janković"
                    width={50}
                    height={50}
                    className="w-12 h-12 rounded-full object-cover max-w-full box-border"
                  />
                  <div>
                    <p className="font-semibold text-brand-dark">Marko Janković</p>
                    <p className="text-sm text-brand-muted">i zlatni retriver Max</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ SEKCIJA */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="h2 mb-4">Sve što treba da znate</h2>
            <p className="text-lg text-brand-muted max-w-3xl mx-auto">
              Odgovori na najčešća pitanja o našim uslugama
            </p>
          </motion.div>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <details className="bg-white rounded-2xl p-6 cursor-pointer group">
                <summary className="flex items-center justify-between font-semibold text-lg text-brand-dark list-none">
                  Da li je potrebno zakazati termin unapred?
                  <ChevronRight className="w-5 h-5 text-brand-primary transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-brand-muted leading-relaxed">
                  Preporučujemo zakazivanje termina unapred kako bismo osigurali dostupnost naših veterinarskih stručnjaka. Međutim, hitne slučajeve primamo odmah bez prethodnog zakazivanja. Naša hitna služba je dostupna 24/7 za sve vanredne situacije.
                </p>
              </details>
            </motion.div>

            {/* FAQ Item 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <details className="bg-white rounded-2xl p-6 cursor-pointer group">
                <summary className="flex items-center justify-between font-semibold text-lg text-brand-dark list-none">
                  Kako da pripremim ljubimca za operaciju?
                  <ChevronRight className="w-5 h-5 text-brand-primary transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-brand-muted leading-relaxed">
                  Pre operacije, vašem ljubimcu je potrebno uzeti vodu 12 sati pre zahvata, dok hranu treba prestati davati 8-12 sati ranije. Nakon operacije, obezbedite mirno okruženje za oporavak i sledite sve naše postoperativne uputstva. Naš tim će vam detaljno objasniti sve korake pripreme i nege nakon zahvata.
                </p>
              </details>
            </motion.div>

            {/* FAQ Item 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <details className="bg-white rounded-2xl p-6 cursor-pointer group">
                <summary className="flex items-center justify-between font-semibold text-lg text-brand-dark list-none">
                  Koje su metode plaćanja dostupne?
                  <ChevronRight className="w-5 h-5 text-brand-primary transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <p className="mt-4 text-brand-muted leading-relaxed">
                  Prihvatamo sve vrste plaćanja za vašu pogodnost: gotovinu, sve vrste kreditnih i debitnih kartica, kao i plaćanje preko veterinarskog osiguranja. Takođe nudimo mogućnost rate za veće tretmane. Za više informacija o osiguranju, slobodno nas kontaktirajte.
                </p>
              </details>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}
