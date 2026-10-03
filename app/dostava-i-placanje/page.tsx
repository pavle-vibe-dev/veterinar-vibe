import type { Metadata } from "next"
import Link from "next/link"
import {
  ClipboardList,
  MessageCircle,
  BadgeCheck,
  PackageCheck,
  Truck,
  CreditCard,
  Wallet,
  Store,
  Phone,
  HelpCircle,
} from "lucide-react"
import {
  deliveryMethods,
  paymentMethods,
  FREE_DELIVERY_THRESHOLD,
} from "../../data/checkout"
import { shopInfo, fullAddress } from "../../data/shop-info"
import Canonical from "../../components/Canonical"

export const metadata: Metadata = {
  title: "Dostava i plaćanje | Kako poručiti",
  description: `Kako poručiti u ${shopInfo.name} prodavnici — porudžbina na upit bez plaćanja karticom, dostava i lično preuzimanje. Cene dostave, načini plaćanja i odgovori na česta pitanja.`,
  alternates: { canonical: "/dostava-i-placanje" },
}

const steps = [
  {
    icon: ClipboardList,
    title: "1. Izaberite proizvode",
    text: "Pretražujte prodavnicu i kliknite „Dodaj u korpu“ na svaki artikal koji vam treba. Nema registracije — korpa se čuva na vašem uređaju.",
  },
  {
    icon: MessageCircle,
    title: "2. Pošaljite upit",
    text: "Otvorite korpu i pošaljite upit, ili nam pišite preko stranice Kontakt. Unesite ime i telefon — email je opcionalan.",
  },
  {
    icon: BadgeCheck,
    title: "3. Potvrđujemo cenu i dostupnost",
    text: "Javljamo se istog radnog dana — javljamo šta ima na stanju, tačnu cenu i rok isporuke.",
  },
  {
    icon: PackageCheck,
    title: "4. Preuzimanje ili dostava",
    text: "Dogovaramo termin — lično u radnji, dostava po Beogradu ili slanje kurirskom službom širom Srbije.",
  },
]

const faq = [
  {
    q: "Da li mogu da platim karticom preko sajta?",
    a: `Ne. ${shopInfo.name} je prodavnica koja radi po modelu „porudžbina na upit“ — porudžbinu šaljete bez plaćanja, a mi potvrđujemo dostupnost i cenu. Karticom ili gotovinom plaćate pri preuzimanju: u radnji, kuriru pouzećem ili po pozivu na virman.`,
  },
  {
    q: "Kako da znam da li je proizvod dostupan?",
    a: "Na svakom proizvodu stoji status dostupnosti (Dostupno u apoteci / Poslednji komadi / Na upit). Za tačnu potvrdu pošaljite upit — odgovaramo istog radnog dana, najčešće u roku od nekoliko sati.",
  },
  {
    q: "Koliko košta dostava?",
    a: `Dostava u Beogradu je ${deliveryMethods.find((d) => d.slug === "beograd")?.price} RSD, a ostalim delovima Srbije ${deliveryMethods.find((d) => d.slug === "srbija")?.price} RSD. Iznad ${FREE_DELIVERY_THRESHOLD.toLocaleString("sr-RS")} RSD dostava je besplatna. Lično preuzimanje u radnji je uvek besplatno.`,
  },
  {
    q: "Koliko traje isporuka?",
    a: "Za Beograd 1–2 radna dana, za ostatak Srbije 2–4 radna dana, računajući od dana kada potvrdimo porudžbinu. Lično preuzimanje se dogovara telefonom, istog ili sledećeg dana.",
  },
  {
    q: "Da li šaljete lekove i antiparazitike?",
    a: "Apotekarske preparate, antiparazitike i medicinsku hranu šaljemo uz prethodnu proveru i savet apotekara. Stavke koje zahtevaju recept ne šaljemo bez konsultacije sa veterinarom.",
  },
  {
    q: "Kako dobijam podatke za virman?",
    a: shopInfo.bankAccount
      ? `Broj tekućeg računa: ${shopInfo.bankAccount}.`
      : "Broj računa za uplatu šaljemo uz potvrdu porudžbine, zajedno sa predračunom. Tako izbegavamo greške u uplati i vaši podaci ostaju zaštićeni.",
  },
  {
    q: "Mogu li da vratim ili zamenim proizvod?",
    a: "Da. Imate pravo na odustanak u roku od 14 dana od prijema, kao i pravo na reklamaciju ako je proizvod neispravan ili oštećen. Postupak je opisan u Uslovima korišćenja.",
  },
  {
    q: "Mogu li da preuzmem porudžbinu lično?",
    a: `Da, lično preuzimanje je besplatno u ${shopInfo.name} — ${fullAddress}. Radno vreme pogledajte na stranici Kontakt.`,
  },
]

const iconBySlug: Record<string, typeof Truck> = {
  preuzimanje: Store,
  beograd: Truck,
  srbija: Truck,
}

const paymentIcon: Record<string, typeof Wallet> = {
  pouzecem: Wallet,
  virman: CreditCard,
  licno: Store,
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

export default function DostavaIPlacanjePage() {
  return (
    <div className="bg-white">
      <Canonical path="/dostava-i-placanje" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Naslov */}
      <section className="bg-brand-bg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <p className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-3">
            Porudžbina na upit
          </p>
          <h1 className="h1 mb-4">Kako poručiti, dostava i plaćanje</h1>
          <p className="paragraph">
            Bez registracije, bez plaćanja karticom i bez skrivenih troškova.
            Pošaljete upit — mi potvrđujemo dostupnost i cenu, pa se dogovaramo
            oko preuzimanja ili dostave.
          </p>
        </div>
      </section>

      {/* Kako poručiti */}
      <section className="py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="h2 mb-8">Kako poručiti u 4 koraka</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s) => (
              <div
                key={s.title}
                className="bg-brand-bg border border-slate-100 rounded-2xl p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="font-bold text-brand-dark mb-2">{s.title}</h3>
                <p className="text-sm text-brand-muted leading-relaxed">
                  {s.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link href="/prodavnica" className="btn-primary">
              Otvori prodavnicu
            </Link>
            <Link href="/upit" className="btn-outline">
              Pogledaj korpu
            </Link>
          </div>
        </div>
      </section>

      {/* Dostava */}
      <section className="py-14 bg-brand-bg border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Truck className="w-6 h-6 text-brand-primary" />
            <h2 className="h2">Dostava i preuzimanje</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {deliveryMethods.map((d) => {
              const Icon = iconBySlug[d.slug] || Truck
              return (
                <div
                  key={d.slug}
                  className="bg-white border border-slate-200 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-primary" />
                    </span>
                    <h3 className="font-bold text-brand-dark">{d.name}</h3>
                  </div>
                  <p className="text-sm text-brand-muted leading-relaxed mb-4">
                    {d.desc}
                  </p>
                  <p className="text-xl font-bold text-brand-dark">
                    {d.price === 0 ? "Besplatno" : `${d.price} RSD`}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex items-start gap-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
            <PackageCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <p className="text-sm text-emerald-900">
              Za porudžbine veće od{" "}
              <strong>
                {FREE_DELIVERY_THRESHOLD.toLocaleString("sr-RS")} RSD
              </strong>{" "}
              dostava je besplatna. Pakujemo pažljivo — ako je paket oštećen pri
              preuzimanju, snimite ga sa kurirom i javite nam se odmah.
            </p>
          </div>
        </div>
      </section>

      {/* Plaćanje */}
      <section className="py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <CreditCard className="w-6 h-6 text-brand-primary" />
            <h2 className="h2">Načini plaćanja</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {paymentMethods.map((p) => {
              const Icon = paymentIcon[p.slug] || Wallet
              return (
                <div
                  key={p.slug}
                  className="bg-white border border-slate-200 rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-primary" />
                    </span>
                    <h3 className="font-bold text-brand-dark">{p.name}</h3>
                  </div>
                  <p className="text-sm text-brand-muted leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-6 flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <Phone className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700">
              Ne naplaćujemo nikakve troškove obrade. Cena koju potvrdimo telefonom
              je konačna — osim dostave, koja je prikazana gore.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 bg-brand-bg border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <HelpCircle className="w-6 h-6 text-brand-primary" />
            <h2 className="h2">Česta pitanja</h2>
          </div>

          <div className="space-y-3">
            {faq.map((f) => (
              <details
                key={f.q}
                className="group bg-white border border-slate-200 rounded-2xl overflow-hidden open:border-brand-primary/40"
              >
                <summary className="flex items-start justify-between gap-4 px-5 py-4 font-bold text-brand-dark cursor-pointer list-none">
                  <span className="text-[15px] md:text-base">{f.q}</span>
                  <span className="text-brand-primary text-xl leading-none shrink-0 mt-0.5 transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-5 text-[15px] text-brand-muted leading-relaxed">
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-6 text-center">
            <p className="font-bold text-brand-dark mb-1">
              Niste pronašli odgovor?
            </p>
            <p className="text-sm text-brand-muted mb-4">
              Pozovite nas ili pošaljite upit — odgovaramo istog radnog dana.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href={shopInfo.phoneHref} className="btn-primary">
                {shopInfo.phone}
              </a>
              <Link href="/kontakt" className="btn-outline">
                Obratite nam se
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
