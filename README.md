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
  tenants/         KONFIGURACIJA PO KLJENTU (multi-tenant) ← menja se za klijenta
    index.ts       registr tenanata + izbor preko NEXT_PUBLIC_TENANT
    bg-pet.ts      demo brend (podrazumevani kad env nije setovan)
    primer.ts      šablon za novog klijenta + test multi-tenanta
  shop.ts          PROIZVODI, kategorije, brendovi  ← menja se za klijenta
  shop-info.ts     čita aktivni tenant (+ env varijable) — ne dirati
  checkout.ts      dostava, plaćanje, limit besplatne dostave (zajedničko)
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

## Više klijenata (multi-tenant)

Jedan kod → više sajtova. Svaki klijent = jedan fajl u `data/tenants/`,
a aktivan se bira env varijablom `NEXT_PUBLIC_TENANT`.

### Novi klijent — 4 koraka

1. Kopiraj `data/tenants/primer.ts` u `data/tenants/<id>.ts`
   (id = mala slova i crtice, npr. `pet-shop-jovanovic`)
2. Popuni podatke: ime, logo, boje, kontakt, adresa, bank račun, prefiks
3. Registruj ga u `data/tenants/index.ts` — jedan red u `registry`
4. Na Vercelu u projektu tog klijenta podesi `NEXT_PUBLIC_TENANT=<id>`

Iz tog fajla dolazi SVE: ime, logo, boje (tenant boja se postavlja kao
inline CSS varijabla na `<html>` u `app/layout.tsx`), kontakt, SEO naslovi,
boja u email šablonima, recenzije.

Lokalni test drugog tenanta:

```bash
set NEXT_PUBLIC_TENANT=primer && npm run dev    # Windows cmd
NEXT_PUBLIC_TENANT=primer npm run dev           # Linux/macOS
```

Nepoznat id pada NA BUILD-U sa greškom koja nabraja poznate tenante.

### Vercel — 1 projekat = 1 klijent (isti repo)

| Env varijabla | Šta razdvaja |
|---|---|
| `NEXT_PUBLIC_TENANT` | koji je klijent aktivan (**obavezno**) |
| `NEXT_PUBLIC_SITE_URL` | domen (test: `https://<id>.vercel.app`) |
| `NEXT_PUBLIC_SHOP_EMAIL` | kome stižu porudžbine |
| `GOOGLE_SHEET_ID` | njegova tabela porudžbina |
| `RESEND_API_KEY` + `ORDER_FROM_EMAIL` | njegov email domen (Resend) |

Dodavanje domena: Vercel projekt → Settings → Domains → DNS zapisi kod
registratara (A `@ → 76.76.21.21`, CNAME `www → cname.vercel-dns.com`).

### Šta je još uvek zajedničko (menja se ručno po klijentu)

- **Proizvodi** — `data/shop.ts` je zajednički za sve tenante
  (prodavnica, blog inline proizvodi, kategorije, brendovi)
- **Sadržaj** — blog članci (`app/blog/`) i neki tekstovi na početnoj
  stranici još sadrže „BG PET" — prođi kroz njih pre isporuke
  (vidi `docs/PRE-LANSIRANJE.md`, sekcija 4)
- **Slike** — `public/hero.jpg`, `public/favicon.svg`, slike proizvoda
- **Dostava i plaćanje** — `data/checkout.ts`

Prednost u odnosu na grane po klijentu: svaka ispravka u kodu važe
odmah za SVE klijente — samo odradi `git push` i Vercel redeploy-uje
sve projekte.