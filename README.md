# BG PET — demo prodavnica za vet apoteke i pet shop

Next.js sajt sa funkcionalnom prodavnicom: katalog proizvoda, korpa, dostava,
plaćanje i evidencija narudžbi. Koristi se kao **demo i template** za
isporuku lokalnimveterinarskim apotekama i pet shopovima.

## Struktura

```
app/
  prodavnica/      katalog + detalj proizvoda ([slug])
  upit/            upit bez porudžbine (brza forma)
  kontakt/         kontakt + mapa + radno vreme
  blog/            članci sa ugrađenim proizvodima
  actions/
    sendOrder.ts   porudžbina → email + Google Sheet
    sendInquiry.ts upit → email + Google Sheet
components/
  cart/            korpa (React context, čuva se u localStorage)
data/
  shop.ts          PROIZVODI, kategorije, brendovi  ← menja se za klijenta
  shop-info.ts     IME, telefon, adresa, radno vreme ← menja se za klijenta
  checkout.ts      dostava, plaćanje, limit besplatne dostave
  productDetails.ts
lib/
  orders.ts        upis u Google Sheet
scripts/
  test-sheet.mjs   provera da li Sheet evidencija radi
```

## Podešavanje

```bash
npm install
cp .env.example .env.local     # popuni vrednosti
npm run dev
```

`.env.example` sadrži opis svake promenljive. **Nikad ne commituj `.env.local`.**

Bez popunjenih `GOOGLE_*` promenljivih sajt radi normalno — narudžbe idu na
email, samo se ne upisuju u tabelu za praćenje.

### Google Sheet kao panel za praćenje

Umesto baze, svaka porudžbina i upit se upisuju kao red u Google Sheet
(`lib/orders.ts`). Vlasnik apoteke menja status kolone
(`Novi` → `Kontaktiran` → `Dostavljeno` → `Zatvoreno`) direktno u tabeli.

Provera da li radi:

```bash
npm run test:sheet
```

Skripta pravi probni red i ispisuje da li je upis prošao. Posle toga obriši
probni red iz tabele.

## Komande

```bash
npm run dev          # razvoj
npm run build        # produkcijski build
npm run lint         # eslint
npm run typecheck    # tsc --noEmit
npm run test:sheet   # provera Google Sheet veze
```

## Brendiranje za klijenta

Dva fajla pokrivaju sve što se menja:

1. **`data/shop-info.ts`** — ime apoteke, telefon, email, adresa, radno vreme,
   primač narudžbi. Uvezano u Navbar, Footer, SEO (`app/layout.tsx`) i kontakt.
2. **`data/shop.ts`** — proizvodi, kategorije, brendovi.

Boje su u `app/globals.css` (`@theme` — `--color-brand-primary`).

**Ostalo mora ručno:** naslovi blog članaka i tekstovi na početnoj stranici
sadrže „BG PET" u sadržaju, ne u infrastrukturi. Prođi kroz njih pre isporuke.