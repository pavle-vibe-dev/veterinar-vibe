# Obavezno pre lansa — lista za svakog klijenta

Ovaj demo sadrži demo podatke. Svaka stavka mora biti rešena **pre** nego što
klijent sajt stavi u javno korišćenje. Prođi kroz listu sa njim na sastanku.

---

## 1. Brend — obavezno

| # | Šta | Gde | Zamena |
|---|---|---|---|
| 1.1 | Ime apoteke | `data/shop-info.ts` → `name`, `legalName` | ime klijenta |
| 1.2 | Telefon, email | `data/shop-info.ts` → `phone`, `email` | stvarni podaci |
| 1.3 | Adresa i radno vreme | `data/shop-info.ts` → `street`, `openingHours` | stvarni podaci |
| 1.4 | Bank račun | `data/shop-info.ts` → `bankAccount` | **obavezno** — vidi razlog ispod |
| 1.5 | Boje | `app/globals.css` → `--color-brand-primary` | brend klijenta |
| 1.6 | Logo | `data/shop-info.ts` → `logo` + fajl u `public/` | prazno = ikonica + tekst |
| 1.7 | Prefiks broja porudžbine | `data/shop-info.ts` → `orderPrefix` | npr. `"AJ"` umesto `"BG"` |
| 1.8 | Domen za email | `.env.local` + Resend verifikacija | obavezno pre lansa |

> **Bank račun je bezbedan po default-u:** `bankAccount` je prazan, pa kupac
> **ne vidi nijedan broj** — piše „broj računa dobijate uz potvrdu".
> Mora se popuniti pre lansa, inače kupac ne može da plati virmanom.

> **Svi kontakt podaci su centralizovani.** Telefon, adresa i ime čitaju se iz
> `data/shop-info.ts` — nijedan broj nije utvrđen u kodu. Menjaš jedan fajl.


## 2. Proizvodi — obavezno

| # | Šta | Gde |
|---|---|---|
| 2.1 | Zameni demo proizvode svojim | `data/shop.ts` → `products` |
| 2.2 | Proveri cene (demo cene su procenjene, ne stvarne) | `data/shop.ts` |
| 2.3 | Proveri `stock` vrednosti | `data/shop.ts` → `stock` |
| 2.4 | Obriši slike proizvoda koji više ne postoje | `public/products/` |

## 3. Email i domen — obavezno

| # | Šta | Gde |
|---|---|---|
| 3.1 | `RESEND_API_KEY` za klijenta | `.env.local` |
| 3.2 | `ORDER_FROM_EMAIL` na **klijentov domen** | `.env.local` |
| 3.3 | `NEXT_PUBLIC_SHOP_EMAIL` na **klijentovu adresu** | `.env.local` |

> Resend besplatno šalje samo na adresu vlasnika naloga i ne dozvoljava
> `onboarding@resend.dev` kao pošiljaoca. Za svakog klijenta obavezan zaseban
> domen (~12€/god) + verifikacija na Resend-u.

## 4. Sadržaj — obavezno

| # | Šta | Gde |
|---|---|---|
| 4.1 | **Recenzije kupaca su izmišljene** | `data/testimonials.ts` → `testimonials = []` |
| 4.2 | Naslovi i tekstovi u blog člancima | `app/blog/` |
| 4.3 | Naslovi i tekstovi na početnoj stranici | `app/page.tsx` |
| 4.4 | TrustSection brojevi (500+ proizvoda, 1000+ kupaca…) | `components/TrustSection.tsx` |
| 4.5 | Hero slika | `public/hero.jpg` |
| 4.6 | Rating zvezdice na karticama proizvoda (`rating: 4.9`) | `data/shop.ts` → `products[].rating` |

> **Recenzije su pravni riziko.** Konkretna imena i priče koje ne postoje
> predstavljaju lažnu reklamu — kažnjivo u Srbiji. Klijent MORA da ih ukloni
> ili zameni stvarnim iskustvima pre lansa. Ovo uvek pomeni usmeno.

> **Sada je pod kontrolom:** recenzije su u `data/testimonials.ts` i sekcija
> se sama uklanja kad je niz prazan (`export const testimonials = []`).
> Lažna Google ocena (`4.9 / 150+ recenzija`) je **uklonjena iz koda** —
> blok se prikazuje samo kad `googleReviews` nije `null`.


## 5. Tehničko — preporučeno

| # | Šta | Detalj |
|---|---|---|
| 5.1 | Analytics (Meta Pixel + GA4) | bez njega ne vidiš da li je neko naručio |
| 5.2 | Fajl `robots.txt` + sitemap | za lokalni SEO |
| 5.3 | Google Business Profile | klijent mora da se pojavi na mapi |
| 5.4 | Politika privatnosti | obavezno za obradu podataka (telefon, adresa kupca) |
| 5.5 | Politika upotrebe kolačića | ako Analytics koristi kolačiće |
| 5.6 | Proveri `npm audit` pre lansa | trenutno 9 ranjivosti bez kritičnih |

## 6. Pre predaje — provera

```bash
npm run typecheck
npm run lint
npm run build
npm run test:sheet
```

Zatim ručno na sajtu:

- [ ] Korpa radi: dodaj proizvod, promeni količinu, ukloni
- [ ] Porudžbina prolazi i stiže email **tebi i kupcu**
- [ ] Pojavljuje se red u Google Sheet-u
- [ ] Upit (`/upit`) radi bez izabranih proizvoda
- [ ] Kontakt forma radi
- [ ] Mapa prikazuje **pravu** adresu
- [ ] Fajl `public/favicon.svg` postoji (inače prazna ikona u tabu)
- [ ] Nema nijednog teksta „BG PET" koji nije zamenjen ili namerno ostavljen
- [ ] Nema nijednog lažnog bank računa na ekranu
- [ ] Sajt na mobilnom (telefon, 390px) — nema odsečenog teksta