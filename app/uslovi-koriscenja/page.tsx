import type { Metadata } from "next"
import Link from "next/link"
import { FileText, ShoppingBag, Truck, Undo2, Wrench, Scale } from "lucide-react"
import { shopInfo, fullAddress } from "../../data/shop-info"
import { FREE_DELIVERY_THRESHOLD } from "../../data/checkout"
import Canonical from "../../components/Canonical"

export const metadata: Metadata = {
  title: "Uslovi korišćenja",
  description: `Uslovi kupovine u ${shopInfo.name} prodavnici — poručivanje na upit, dostava, plaćanje, odustanak i reklamacija.`,
  alternates: { canonical: "/uslovi-koriscenja" },
}

const sections = [
  {
    icon: FileText,
    title: "1. Opšte odredbe",
    text: `Ovi Uslovi uređuju kupovinu u internet prodavnici ${shopInfo.name} (u daljem tekstu: „Prodavnica“). Kupovinom potvrđujete da ste sa njima upoznati i da ih prihvatate. Prodavac je ${shopInfo.legalName}, ${fullAddress}.`,
  },
  {
    icon: ShoppingBag,
    title: "2. Poručivanje",
    text:
      "Porudžbine se šalju na upit — bez registracije i bez plaćanja karticom preko sajta. Izabrani artikli šalju se kao upit, a Prodavac odgovara telefonom ili emailom sa potvrdom dostupnosti, tačne cene i roka. Ugovor se smatra zaključenim tek kada Prodavac potvrdi porudžbinu, a Kupac to potvrdi.",
  },
  {
    icon: Truck,
    title: "3. Cene, dostava i troškovi",
    text: `Cene su iskazane u dinarima i uključuju PDV. Cena navedena uz proizvod je informativna do potvrde. Dostava u Beogradu iznosi 350 RSD, ostalim delovima Srbije 490 RSD, a za porudžbine veće od ${FREE_DELIVERY_THRESHOLD.toLocaleString("sr-RS")} RSD dostava je besplatna. Lično preuzimanje u radnji je besplatno.`,
  },
  {
    icon: Undo2,
    title: "4. Odustanak od kupovine",
    text:
      "Imate pravo da odustanete od ugovora u roku od 14 dana od dana prijema proizvoda, bez navođenja razloga. Rok se ostvaruje slanjem obaveštenja o odustanku na email Prodavca. Proizvod mora biti neoštećen i u originalnom pakovanju, sa svom pratećom dokumentacijom i računom. Trošak vraćanja snosi Kupac, osim ako je isporučen pogrešan ili neispravan proizvod.",
  },
  {
    icon: Wrench,
    title: "5. Reklamacija i materijalna neusaglašenost",
    text:
      "Za proizvode koji nisu u skladu sa ugovorom možete da podnesete reklamaciju u roku od 30 dana od dana otkrivanja neusaglašenosti. Reklamacija se podnosi emailom ili lično u radnji, a Prodavac je dužan da odgovori u roku od 8 dana. Nerešene reklamacije možete prijaviti tržišnoj inspekciji. Lekovi, lekoviti i medicinski preparati i hrana za životinje podležu posebnim uslovima čuvanja — čuvajte račun i uputstvo.",
  },
  {
    icon: Scale,
    title: "6. Žalbe i rešavanje sporova",
    text:
      "Pritužbe možete poslati emailom na adresu navedenu na stranici Kontakt. Sporovi se rešavaju sporazumno. Ako sporazum nije moguć, nadležan je sud po sedištu Prodavca, odnosno potrošač može da se obrati i telu za alternativno rešavanje potrošačkih sporova (potrošačko savetovalište pri lokalnoj samoupravi).",
  },
]

export default function UsloviKoriscenjaPage() {
  const email = shopInfo.email

  return (
    <div className="bg-white">
      <Canonical path="/uslovi-koriscenja" />

      <section className="bg-brand-bg border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <p className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-3">
            Kupovina
          </p>
          <h1 className="h1 mb-4">Uslovi korišćenja</h1>
          <p className="paragraph">
            Jednostavno: birate artikle, šaljete upit, mi potvrđujemo cenu i
            dostupnost. Bez online plaćanja i bez skrivenih troškova.
          </p>
          <p className="text-sm text-brand-muted mt-4">
            Poslednje ažuriranje: {new Date().getFullYear()}.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {(shopInfo.pib || shopInfo.registrationNo) && (
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-emerald-900 mb-2">
                Podaci o prodavcu
              </h2>
              <p className="text-[15px] text-emerald-900/80 leading-relaxed">
                Naziv: <strong>{shopInfo.legalName}</strong>
                {shopInfo.pib && (
                  <>
                    <br />
                    PIB: <strong>{shopInfo.pib}</strong>
                  </>
                )}
                {shopInfo.registrationNo && (
                  <>
                    <br />
                    Matični broj: <strong>{shopInfo.registrationNo}</strong>
                  </>
                )}
                <br />
                Adresa: {fullAddress}
                <br />
                Email: {email} • Telefon: {shopInfo.phone}
              </p>
            </div>
          )}

          {sections.map((s) => (
            <div
              key={s.title}
              className="bg-brand-bg border border-slate-100 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0">
                  <s.icon className="w-5 h-5 text-emerald-700" />
                </span>
                <h2 className="text-lg font-bold text-brand-dark">{s.title}</h2>
              </div>
              <p className="text-[15px] text-brand-muted leading-relaxed">
                {s.text}
              </p>
            </div>
          ))}

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-brand-dark mb-3">
              Intelektualna svojina
            </h2>
            <p className="text-[15px] text-brand-muted leading-relaxed">
              Tekstovi, fotografije, logotip i dizajn ovog sajta zaštićeni su
              autorskim i srodnim pravima. Nije dozvoljeno njihovo umnožavanje
              ili korišćenje u komercijalne svrhe bez pisanog odobrenja.
              Fotografije proizvoda obezbeđuje prodavac i proizvođač.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-brand-dark mb-3">
              Izmena uslova
            </h2>
            <p className="text-[15px] text-brand-muted leading-relaxed">
              Uslovi se mogu izmeniti, a nova verzija važi od dana objavljivanja
              na ovoj stranici. Za porudžbine potvrđene pre izmene primenjuje
              se verzija važeća u trenutku potvrde.
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
            <p className="text-[15px] text-emerald-900 leading-relaxed">
              Pitanja o uslovima šaljite na{" "}
              <a
                href={`mailto:${email}`}
                className="font-bold text-emerald-800 hover:underline"
              >
                {email}
              </a>{" "}
              ili pozovite{" "}
              <a
                href={shopInfo.phoneHref}
                className="font-bold text-emerald-800 hover:underline"
              >
                {shopInfo.phone}
              </a>
              . Povezano:{" "}
              <Link
                href="/politika-privatnosti"
                className="font-bold text-emerald-800 hover:underline"
              >
                Politika privatnosti
              </Link>{" "}
              i{" "}
              <Link
                href="/dostava-i-placanje"
                className="font-bold text-emerald-800 hover:underline"
              >
                Dostava i plaćanje
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
