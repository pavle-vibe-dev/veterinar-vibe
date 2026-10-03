import type { Metadata } from "next"
import Link from "next/link"
import { ShieldCheck, Mail, Lock, BarChart3, Cookie, UserCheck } from "lucide-react"
import { shopInfo, analyticsEnabled } from "../../data/shop-info"
import Canonical from "../../components/Canonical"

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description: `Kako ${shopInfo.name} prikuplja, koristi i čuva vaše lične podatke. Vaša prava i kontakt za pitanja o privatnosti.`,
  alternates: { canonical: "/politika-privatnosti" },
}

const sections = [
  {
    icon: ShieldCheck,
    title: "1. Ko je rukovalac podataka",
    text: `${shopInfo.legalName}, ${shopInfo.street}, ${shopInfo.zip} ${shopInfo.city} (u daljem tekstu: „${shopInfo.name}“). Sva pitanja o privatnosti šaljite na ${shopInfo.email} ili pozovite ${shopInfo.phone}.`,
  },
  {
    icon: UserCheck,
    title: "2. Koje podatke prikupljamo",
    text:
      "Prilikom slanja upita ili porudžbine unosite ime, telefon i — ako želite potvrdu na email — email adresu. Email je uvek opcion. Pored toga, beležimo sadržaj upita (artikli, količine, napomena) da bismo mogli da odgovorimo i arhiviramo komunikaciju.",
  },
  {
    icon: Lock,
    title: "3. Zašto ih koristimo",
    text:
      "Da bismo odgovorili na vaš upit, potvrdili dostupnost i cenu, izvršili porudžbinu i ispunili zakonske obaveze vođenja evidencije. Ne šaljemo vam marketinške poruke bez vašeg izričitog pristanka.",
  },
  {
    icon: BarChart3,
    title: "4. Analitika i merenje poseta",
    text: analyticsEnabled()
      ? "Ovaj sajt koristi usluge trećih strana za merenje posećenosti. Podaci se prikupljaju agregirano i ne sadrže vaše ime ni kontakt podatke."
      : "Ovaj sajt trenutno ne koristi alate za merenje posećenosti.",
  },
  {
    icon: Cookie,
    title: "5. Kolačići",
    text:
      "Sajt ne koristi kolačiće za praćenje preko više sajtova niti za prikazivanje personalizovanih oglasa. Tehnički kolačići neophodni za rad stranice ne čuvaju podatke po kojima ste prepoznatljivi.",
  },
  {
    icon: Mail,
    title: "6. Kome otkrivamo podatke",
    text:
      "Podatke prosleđujemo samo pružaocima usluga koji su nam neophodni za rad — dostavljačima i servisu za slanje email poruka — i to u meri u kojoj je potrebno za izvršenje vašeg upita. Ne prodajemo i ne ustupamo podatke trećim licima u marketinške svrhe.",
  },
]

export default function PolitikaPrivatnostiPage() {
  return (
    <div className="bg-white">
      <Canonical path="/politika-privatnosti" />

      <section className="bg-brand-bg border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <p className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-3">
            Zaštita podataka
          </p>
          <h1 className="h1 mb-4">Politika privatnosti</h1>
          <p className="paragraph">
            Vaši podaci su vaši. Ovde piše šta tačno prikupljamo, zašto i koliko
            dugo — bez sitnih slova.
          </p>
          <p className="text-sm text-brand-muted mt-4">
            Poslednje ažuriranje: {new Date().getFullYear()}.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
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

          {analyticsEnabled() && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-brand-dark mb-3">
                Alati koje koristimo
              </h2>
              <ul className="text-[15px] text-brand-muted leading-relaxed space-y-2">
                {shopInfo.gaId && (
                  <li>
                    <strong className="text-brand-dark">
                      Google Analytics
                    </strong>{" "}
                    — anonimna statistika posećenosti (Google LLC, SAD). Možete
                    da onemogućite prikupljanje pomoću{" "}
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-primary font-semibold hover:underline"
                    >
                      Google dodatka za pregledač
                    </a>
                    .
                  </li>
                )}
                {shopInfo.metaPixelId && (
                  <li>
                    <strong className="text-brand-dark">Meta Pixel</strong> —
                    merenje efikasnosti oglasa (Meta Platforms Ireland Ltd.).
                    Podacima možete da upravljate u{" "}
                    <a
                      href="https://www.facebook.com/settings?tab=ads"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-primary font-semibold hover:underline"
                    >
                      podešavanjima oglasa
                    </a>{" "}
                    na Facebook/Instagram nalogu.
                  </li>
                )}
              </ul>
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-brand-dark mb-3">
              Vaša prava
            </h2>
            <p className="text-[15px] text-brand-muted leading-relaxed mb-3">
              U svakom trenutku možete da zatražite uvid u podatke koje imamo o
              vama, njihovu ispravku, brisanje ili ograničenje obrade, kao i da
              uložite prigovor na obradu podataka. Odgovaramo u zakonskom roku.
            </p>
            <p className="text-[15px] text-brand-muted leading-relaxed">
              Ako smatrate da se vaši podaci obrađuju suprotno propisima,
              imate pravo da se obratite Agenciji za zaštitu podataka o ličnosti
              (Beograd, Bulevar kralja Aleksandra 79).
            </p>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-emerald-900 mb-2">
              Kontakt za pitanja o privatnosti
            </h2>
            <p className="text-[15px] text-emerald-900/80 leading-relaxed">
              Pišite na{" "}
              <a
                href={`mailto:${shopInfo.email}`}
                className="font-bold text-emerald-800 hover:underline"
              >
                {shopInfo.email}
              </a>{" "}
              ili pozovite{" "}
              <a
                href={shopInfo.phoneHref}
                className="font-bold text-emerald-800 hover:underline"
              >
                {shopInfo.phone}
              </a>
              .
            </p>
            <p className="text-sm text-emerald-900/70 mt-4">
              Povezano:{" "}
              <Link
                href="/uslovi-koriscenja"
                className="font-bold text-emerald-800 hover:underline"
              >
                Uslovi korišćenja
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
