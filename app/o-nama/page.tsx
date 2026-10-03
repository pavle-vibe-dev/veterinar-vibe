import type { Metadata } from "next"
import Link from "next/link"
import {
  Store,
  Stethoscope,
  Truck,
  HeartHandshake,
  BadgeCheck,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react"
import { shopInfo, fullAddress, hoursDisplay } from "../../data/shop-info"
import { categories } from "../../data/shop"
import Canonical from "../../components/Canonical"

export const metadata: Metadata = {
  title: "O nama",
  description: `${shopInfo.name} — ${shopInfo.tagline} na ${shopInfo.district}u. Medicinska hrana, zaštita od parazita, suplementi i oprema za pse i mačke, uz stručni savet.`,
  alternates: { canonical: "/o-nama" },
}

const values = [
  {
    icon: BadgeCheck,
    title: "Originalni proizvodi",
    text: "Radimo isključivo sa proverenim dobavljačima — ono što prodajemo jeste ono što i sami preporučujemo.",
  },
  {
    icon: Stethoscope,
    title: "Savet pre prodaje",
    text: "Niste sigurni šta ljubimcu treba? Pitajte nas. Ne prodajemo skuplje zato što je skuplje, nego zato što odgovara.",
  },
  {
    icon: Truck,
    title: "Porudžbina na upit",
    text: "Bez plaćanja karticom preko sajta. Pošaljete spisak, potvrđujemo cenu i dostupnost, pa se dogovaramo.",
  },
  {
    icon: HeartHandshake,
    title: "Dugoročna briga",
    text: "Medicinska hrana i terapija traju mesecima — vodimo evidenciju šta vaš ljubimac koristi i podsećamo na dopunu.",
  },
]

export default function ONamaPage() {
  return (
    <div className="bg-white">
      <Canonical path="/o-nama" />

      {/* Naslov */}
      <section className="bg-brand-bg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <p className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-3">
            {shopInfo.name}
          </p>
          <h1 className="h1 mb-4">
            {shopInfo.tagline} na {shopInfo.district}u
          </h1>
          <p className="paragraph">{shopInfo.description}</p>
        </div>
      </section>

      {/* Priča */}
      <section className="py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Store className="w-6 h-6 text-brand-primary" />
              <h2 className="h2">Ko smo</h2>
            </div>
            <p className="text-brand-muted leading-relaxed mb-4">
              {shopInfo.name} je {shopInfo.tagline.toLowerCase()} sa adresom na{" "}
              {fullAddress}. Bavimo se snabdevanjem vlasnika pasa i mačaka — od
              svakodnevne hrane do medicinskih preparata koje propisuje
              veterinar.
            </p>
            <p className="text-brand-muted leading-relaxed mb-4">
              Ono što nas razlikuje je jednostavan model: katalog je otvoren i
              možete da ga pregledate bez registracije, ali porudžbinu šaljete
              kao upit. Tako za svaki artikal dobijate potvrdu da je original,
              da je na stanju i koja je konačna cena — pre nego što išta platite.
            </p>
            <p className="text-brand-muted leading-relaxed">
              Radno vreme i tačnu lokaciju pogledajte na{" "}
              <Link
                href="/kontakt"
                className="text-brand-primary font-semibold hover:underline"
              >
                stranici Kontakt
              </Link>
              , a cela ponuda je u{" "}
              <Link
                href="/prodavnica"
                className="text-brand-primary font-semibold hover:underline"
              >
                prodavnici
              </Link>
              .
            </p>
          </div>

          {/* Ponuda po kategorijama */}
          <div className="bg-brand-bg border border-slate-100 rounded-3xl p-6 md:p-8">
            <h3 className="text-xl font-bold text-brand-dark mb-5">
              Šta držimo u ponudi
            </h3>
            <ul className="space-y-4">
              {categories.map((c) => (
                <li key={c.slug} className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                    <HeartHandshake className="w-4 h-4 text-emerald-700" />
                  </span>
                  <span>
                    <Link
                      href={`/prodavnica?category=${c.slug}`}
                      className="font-bold text-brand-dark hover:text-brand-primary transition-colors"
                    >
                      {c.name} →
                    </Link>
                    <span className="block text-sm text-brand-muted leading-relaxed">
                      {c.description}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Vrednosti */}
      <section className="py-14 bg-brand-bg border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="h2 mb-8">Kako radimo</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white border border-slate-100 rounded-2xl p-6"
              >
                <span className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-4">
                  <v.icon className="w-5 h-5 text-brand-primary" />
                </span>
                <h3 className="font-bold text-brand-dark mb-2">{v.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Radno vreme + CTA */}
      <section className="py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-brand-primary" />
              <h3 className="font-bold text-brand-dark">Gde smo</h3>
            </div>
            <p className="text-brand-muted text-[15px] leading-relaxed">
              {fullAddress}
            </p>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(fullAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-brand-primary hover:gap-3 transition-all"
            >
              Otvori mapu
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-brand-primary" />
              <h3 className="font-bold text-brand-dark">Radno vreme</h3>
            </div>
            <ul className="space-y-1.5 text-[15px]">
              {hoursDisplay.map((h) => (
                <li
                  key={h.days}
                  className="flex justify-between gap-4 text-brand-muted"
                >
                  <span>{h.days}</span>
                  <span
                    className={
                      h.time === "Zatvoreno"
                        ? "text-slate-400"
                        : "font-semibold text-brand-dark"
                    }
                  >
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-brand-dark rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-white text-lg mb-2">
                Imate pitanje?
              </h3>
              <p className="text-slate-300 text-[15px] leading-relaxed">
                Pozovite nas ili pošaljite upit — odgovaramo istog radnog dana.
              </p>
            </div>
            <div className="flex flex-col gap-3 mt-5">
              <a
                href={shopInfo.phoneHref}
                className="inline-flex items-center justify-center bg-brand-primary hover:bg-brand-primary-hover text-white font-bold py-3 rounded-button transition-all"
              >
                {shopInfo.phone}
              </a>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold py-3 rounded-button hover:bg-white/10 transition-all"
              >
                Pošalji upit
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
