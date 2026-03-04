"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PawPrint, Mail, Linkedin, X, GraduationCap, Stethoscope } from "lucide-react"
import Image from "next/image"

export default function TimPage() {
  const [selectedMember, setSelectedMember] = useState<number | null>(null)

  const teamMembers = [
    {
      name: "Dr. Marko Marković",
      title: "Hirurg",
      bio: "Sa preko 15 godina iskustva u veterinarskoj hirurgiji, specijalizovao za složene abdominalne i ortopedne operacije. Strastveni ljubitelj velikih pasa.",
      pet: "Vlasnik zlatnog retrivera Maxa",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop",
      linkedin: "#",
      email: "marko@veticare.rs",
      expertise: "Veterinarska hirurgija",
      specialty: "Abdominalne i ortopedske operacije",
      detailedBio: "Dr. Marko Marković je diplomirao na Veterinarskom fakultetu u Beogradu 2008. godine. Nakon diplomiranja, specijalizovao je veterinarsku hirurgiju sa fokusom na složenim abdominalnim operacijama i ortopedskom hirurgiji malih životinja. U svojoj karijeri izveo je preko 2000 uspešnih hirurških zahvata, od kojih su mnogi bili prvi te vrste u regionu. Njegov pristup lečenju bazira se na najnovijim svetskim standardima i individualnom pristupu svakom pacijentu. Dr. Marković redovno učestvuje na međunarodnim konferencijama i seminarima kako bi bio u toku sa najnovijim tehnologijama u veterinarskoj hirurgiji."
    },
    {
      name: "Dr. Ana Petrović",
      title: "Opšta praksa",
      bio: "Ekspert za preventivnu negu i vakcinaciju. Diplomirana na Veterinarskom fakultetu u Beogradu sa specijalizacijom iz interne medicine.",
      pet: "Vlasnica mačke Mije",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=800&auto=format&fit=crop",
      linkedin: "#",
      email: "ana@veticare.rs",
      expertise: "Interna medicina",
      specialty: "Preventivna nega i vakcinacija",
      detailedBio: "Dr. Ana Petrović je diplomirala na Veterinarskom fakultetu u Beogradu 2012. godine sa najvišim prosekom. Specijalizovala je internu medicinu sa posebnim fokusom na preventivnoj nezi i vakcinaciji malih životinja. Njen pristup pacijentima je holistički - posvećuje pažnju ne samo lečenju bolesti već i prevenciji i edukaciji vlasnika. Dr. Petrović je autor više stručnih radova o važnosti redovnih pregleda i vakcinacije. U slobodno vreme volontira u lokalnim skloništima za životinje gde pruža besplatne preglede i savete vlasnicima. Njena strast je stvaranje dugoročnog poverenja između veterinara, vlasnika i njihovih ljubimaca."
    },
    {
      name: "Dr. Nikola Janković",
      title: "Specijalista kardiologije",
      bio: "Ekspert za kardiologiju malih životinja sa 8 godina iskustva. Specijalizovan za ehokardiografiju i lečenje srčanih oboljenja kod pasa i mačaka.",
      pet: "Vlasnik nemačkog ovčara Beca",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb&w=300&h=300",
      linkedin: "#",
      email: "nikola@veticare.rs",
      expertise: "Veterinarska kardiologija",
      specialty: "Ehokardiografija i srčane bolesti",
      detailedBio: "Dr. Nikola Janković je diplomirao na Veterinarskom fakultetu u Beogradu 2016. godine. Odmah nakon diplomiranja, posvetio se kardiologiji malih životinja - specijalizaciji koja zahteva duboko poznavanje srčanih oboljenja kod pasa i mačaka. Završio je specijalizaciju iz kardiologije u Nemačkoj, gde je radio sa vodećim evropskim kardiološkim timovima. Dr. Janković je jedan od retkih veterinara u regionu koji poseduje opremu za naprednu ehokardiografiju i može da dijagnostikuje čak i najkompleksnije srčane probleme. Njegov cilj je da omogući kvalitetan život kućnim ljubimcima sa srčanim problemima kada bi to ranije bilo nemoguće."
    }
  ]

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* HERO SEKCIJA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="h1 mb-6">Upoznajte naš tim stručnjaka</h1>
            <p className="text-xl text-brand-muted max-w-3xl mx-auto">
              Ljubav prema životinjama je ono što nas povezuje.
            </p>
          </motion.div>
        </div>
      </section>

      {/* GRID SA ČLANOVIMA */}
      <section className="py-20 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className={`group cursor-pointer transition-all duration-300 ${
                  selectedMember === index ? 'opacity-100' : selectedMember !== null ? 'opacity-50' : 'opacity-100'
                }`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                onClick={() => setSelectedMember(selectedMember === index ? null : index)}
              >
                <div className={`bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  selectedMember === index ? 'ring-4 ring-brand-primary ring-opacity-30 shadow-2xl' : ''
                }`}>
                  {/* Slika */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={400}
                      height={400}
                      className="w-full h-80 object-cover rounded-t-2xl filter grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Sadržaj */}
                  <div className="p-6">
                    {/* Ime i titula */}
                    <h3 className="text-2xl font-bold text-brand-dark mb-2">{member.name}</h3>
                    <p className="text-brand-primary font-semibold mb-4">{member.title}</p>

                    {/* Bio */}
                    <p className="text-brand-muted mb-4 leading-relaxed">{member.bio}</p>

                    {/* Ljubimac Badge */}
                    <div className="flex items-center space-x-2 mb-4 p-3 bg-brand-primary/10 rounded-lg">
                      <PawPrint className="w-4 h-4 text-brand-primary" />
                      <span className="text-sm font-medium text-brand-dark">{member.pet}</span>
                    </div>

                    {/* Kontakt ikonice */}
                    <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                      <a
                        href={member.linkedin}
                        className="text-gray-400 hover:text-brand-primary transition-colors duration-300"
                        aria-label={`LinkedIn profil ${member.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-gray-400 hover:text-brand-primary transition-colors duration-300"
                        aria-label={`Email ${member.name}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* DETALJNA BIOGRAFIJA SA ANIMATEPRESENCE */}
          <AnimatePresence>
            {selectedMember !== null && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="mt-8 overflow-hidden"
              >
                <div className="bg-slate-50 rounded-2xl p-8 shadow-lg relative">
                  {/* Dugme za zatvaranje */}
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow duration-300"
                    aria-label="Zatvori biografiju"
                  >
                    <X className="w-5 h-5 text-gray-600 hover:text-brand-primary transition-colors duration-300" />
                  </button>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Leva kolona - Stručna sprema i specijalnost */}
                    <div className="space-y-6">
                      <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-3 bg-brand-primary/10 rounded-lg">
                            <GraduationCap className="w-6 h-6 text-brand-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-brand-dark">Stručna sprema</h4>
                            <p className="text-sm text-brand-muted">Veterinarski fakultet</p>
                          </div>
                        </div>
                        <p className="text-brand-dark font-medium">{teamMembers[selectedMember].expertise}</p>
                      </div>

                      <div className="bg-white rounded-xl p-6 shadow-sm">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="p-3 bg-brand-primary/10 rounded-lg">
                            <Stethoscope className="w-6 h-6 text-brand-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-brand-dark">Uža specijalnost</h4>
                            <p className="text-sm text-brand-muted">Fokus oblasti</p>
                          </div>
                        </div>
                        <p className="text-brand-dark font-medium">{teamMembers[selectedMember].specialty}</p>
                      </div>
                    </div>

                    {/* Desna kolona - Detaljna biografija */}
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                      <h4 className="font-semibold text-brand-dark mb-4">O meni</h4>
                      <div className="text-brand-muted leading-relaxed space-y-4">
                        {teamMembers[selectedMember].detailedBio.split('\n\n').map((paragraph, index) => (
                          <p key={index}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
