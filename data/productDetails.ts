export interface ProductDetails {
  highlights: string[]
  details: string
  specs: { label: string; value: string }[]
  delivery: string
}

export const brandDescriptions: Record<string, string> = {
  Acana:
    "Acana je kanadski proizvođač biološki odgovarajuće hrane za pse i mačke. Recepture se prave od svežih, regionalnih sastojaka sa visokim udelom mesa i bez nepotrebnih punila.",
  Orijen:
    "Orijen važi za jednu od najkvalitetnijih hrana na svetu — sa udelom mesnih sastojaka do 85% i filozofijom ishrane koja prati prirodne potrebe pasa i mačaka.",
  Hills:
    "Hill's Prescription Diet je linija medicinskih dijeta nastala u saradnji sa veterinarima. Klinički testirane formule pomažu kod bubrega, digestije, kože i telesne težine.",
  NexGard:
    "NexGard (Boehringer Ingelheim) je vodeći svetski brend zaštite od spoljašnjih i unutrašnjih parazita. Ukusne tablete za žvakanje psi rado prihvataju kao poslasticu.",
  Bravecto:
    "Bravecto (MSD Animal Health) je poznat po dugotrajnoj zaštiti — jedna doza štiti i do 12 nedelja od buva i krpelja, što olakšava redovnu zaštitu tokom cele sezone.",
  Foresto:
    "Foresto ogrlice (Elanco) pružaju do 8 meseci neprekidne zaštite bez mirisa i masnih tragova. Vodootporne su i pogodne i za pse i za mačke.",
  "Anima Strath":
    "Anima Strath je švajcarski prirodni dodatak ishrani na bazi tečnog kvasca. Sa 61 nutrijentom decenijama se koristi za imunitet, dlaku i apetit ljubimaca.",
  Vethealth:
    "Vethealth je linija savremenih veterinarskih suplemenata, uključujući CBD kapi prilagođene psima i mačkama. Proizvodi se prave uz kontrolu kvaliteta i jasna uputstva za doziranje.",
  InterVet:
    "InterVet proizvodi pristupačne veterinarske suplemente za svakodnevnu upotrebu. ProbioVet linija je osmišljena za zdravu digestiju pasa i mačaka svih uzrasta.",
  Trixie:
    "Trixie je nemački gigant opreme za kućne ljubimce sa hiljadama proizvoda — od transportera i ležaljki do kozmetike i igračaka. Odnos cene i kvaliteta je njihov zaštitni znak.",
  Rogz:
    "Rogz je južnoafrički brend poznat po izdržljivim igračkama i opremi jarkih boja. Grinz lopta sa žljebovima za poslastice jedan je od njihovih najprodavanijih proizvoda.",
  Duvo:
    "Duvo+ (Laroy Group) pravi udobnu opremu za odmor ljubimaca — krevete, korpe i ćebad od prijatnih, perivih materijala koji se uklapaju u svaki dom.",
  Fruity:
    "Fruity je linija blage kozmetike za pse i mačke prijatnih voćnih mirisa. Formulacije su prilagođene osetljivoj koži ljubimaca i redovnom kupanju.",
  "Cat's Best":
    "Cat's Best je brend prirodnih posipa na bazi drvenih vlakana. Pelete upijaju tečnost i miris, a korišćeni posip se može odlagati u kućni otpad — praktičan izbor za mačje toalete.",
}

const details: Record<string, ProductDetails> = {
  "acana-grass-fed-lamb-114kg": {
    highlights: [
      "Monoproteinska formula — jagnjetina kao jedini izvor životinjskih proteina",
      "Bez žitarica, kukuruza, pšenice i soje — pogodno za osetljive pse",
      "Glukozamin i hondroitin za podršku zglobovima",
      "Jabuka, bundeva i lekovito bilje za zdravu probavu",
    ],
    details:
      "Acana Grass-Fed Lamb pravi se od jagnjetine sa pašnjaka, dopunjene iznutricama, hrskavicom i voćem i povrćem. Monoproteinski recept olakšava ishranu pasa sa intolerancijama na više vrsta mesa, a visok udeo proteina održava mišićnu masu i energiju odraslih pasa svih rasa.",
    specs: [
      { label: "Životno doba", value: "Odrasli psi (1+ godina)" },
      { label: "Proteini", value: "31%" },
      { label: "Bez žitarica", value: "Da" },
      { label: "Veličina pakovanja", value: "11.4kg" },
    ],
    delivery: "Isporuka danas za sutra",
  },
  "orijen-six-fish-macke-54kg": {
    highlights: [
      "Šest vrsta divlje ribe — losos, oslić, smuđ i druge",
      "85% mesnih sastojaka, liofilizirani komadići za ukus",
      "Prirodni izvor DHA i EPA za mozak, vid i sjajnu dlaku",
      "Bez žitarica i krompira",
    ],
    details:
      "Orijen Six Fish donosi raznovrsnost morskog plena u činiju vaše mačke. Riba se doprema sveža i sirova, a deo se liofilizuje radi očuvanja hranljivih materija. Formula je posebno pogodna za izbirljive mace i mačke kojima je potreban visok udeo proteina.",
    specs: [
      { label: "Namenjeno", value: "Odrasle mačke" },
      { label: "Proteini", value: "40%" },
      { label: "Bez žitarica", value: "Da" },
      { label: "Veličina pakovanja", value: "5.4kg" },
    ],
    delivery: "Isporuka danas za sutra",
  },
  "hills-kd-macke-15kg": {
    highlights: [
      "Kontrolisan fosfor i natrijum za podršku bubrezima",
      "Visokosvarljivi proteini smanjuju otpadne materije",
      "Dodat L-karnitin i omega masne kiseline",
      "Koristiti uz savet veterinara",
    ],
    details:
      "Hill's Prescription Diet k/d je klinički testirana dijeta za mačke sa hroničnim bubrežnim problemima. Prilagođeni nivoi proteina, fosfora i natrijuma usporavaju napredovanje bolesti i poboljšavaju apetit i kvalitet života. Prelazak na dijetu uvoditi postepeno tokom 7 dana.",
    specs: [
      { label: "Namenjeno", value: "Bubrežna podrška (mačke)" },
      { label: "Oblik", value: "Granule" },
      { label: "Veličina pakovanja", value: "1.5kg" },
      { label: "Režim", value: "Uz savet veterinara" },
    ],
    delivery: "Isporuka danas za danas",
  },
  "nexgard-spectra-s-3tbl": {
    highlights: [
      "Štiti od buva, krpelja, crevnih parazita i srčanog crva",
      "Deluje već 30 minuta nakon primene, zaštita 30 dana",
      "Ukus govedine — psi je prihvataju kao poslasticu",
      "Bezbedno za pse starije od 8 nedelja",
    ],
    details:
      "NexGard Spectra kombinuje afoksolaner i milbemicin oksim za najširu zaštitu u jednoj tableti mesečno. Kiša, kupanje i plivanje ne umanjuju dejstvo jer se aktivne supstance raspoređuju kroz krvotok. Pre primene posavetujte se sa veterinarom oko telesne težine psa.",
    specs: [
      { label: "Težina psa", value: "3.5–7.5kg (veličina S)" },
      { label: "Pakovanje", value: "3 tablete za žvakanje" },
      { label: "Primena", value: "1 tableta mesečno" },
      { label: "Štiti od", value: "Buve, krpelji, crevni paraziti, srčani crv" },
    ],
    delivery: "Isporuka danas za danas",
  },
  "bravecto-tablete-psi": {
    highlights: [
      "Jedna tableta štiti punih 12 nedelja",
      "Protiv buva i najčešćih vrsta krpelja",
      "Ukusna tableta za žvakanje — laka primena",
      "Manje doza godišnje u odnosu na mesečne preparate",
    ],
    details:
      "Bravecto tablete sa fluralaner-om pružaju tromesečnu zaštitu jednom dozom, što je idealno za vlasnike koji zaboravljaju mesečnu zaštitu. Doziranje se određuje prema telesnoj težini psa, uz savet veterinara ili apotekara.",
    specs: [
      { label: "Trajanje zaštite", value: "12 nedelja" },
      { label: "Oblik", value: "Tableta za žvakanje" },
      { label: "Pakovanje", value: "1 tableta" },
    ],
    delivery: "Isporuka danas za danas",
  },
  "foresto-ogrlica-8kg": {
    highlights: [
      "Do 8 meseci neprekidne zaštite bez mesečne primene",
      "Bez mirisa i masnih tragova na dlaci",
      "Vodootporna — kupanje ne umanjuje dejstvo",
      "Imidakloprid + flumethrin protiv buva, krpelja i vaši",
    ],
    details:
      "Foresto ogrlica postepeno oslobađa aktivne supstance koje se šire po koži i dlaci ljubimca. Jednom postavljena, štiti celu sezonu — praktično rešenje za aktivne pse i mačke koje često borave u prirodi. Dužina se podešava sečenjem viška trake.",
    specs: [
      { label: "Trajanje zaštite", value: "Do 8 meseci" },
      { label: "Za", value: "Pse i mačke do 8kg" },
      { label: "Pakovanje", value: "1 ogrlica" },
    ],
    delivery: "Isporuka danas za danas",
  },
  "anima-strath-250ml": {
    highlights: [
      "61 nutrijent — B vitamini, aminokiseline, minerali",
      "Jača imunitet, apetit i sjaj dlake",
      "100% prirodno, na bazi tečnog kvasca",
      "Za pse, mačke i male životinje",
    ],
    details:
      "Anima Strath je švajcarski klasik među dodacima ishrani. Tečni kvasac dobijen posebnim postupkom fermentacije sadrži kompletan spektar hranljivih materija koje svakodnevna hrana često ne pokriva u potpunosti. Dozira se pumpicom ili kašičicom uz obrok.",
    specs: [
      { label: "Pakovanje", value: "250ml" },
      { label: "Primena", value: "Uz hranu, svakodnevno" },
      { label: "Za", value: "Pse, mačke, glodare" },
    ],
    delivery: "Isporuka danas za danas",
  },
  "vethealth-cbd-ulje-8": {
    highlights: [
      "8% CBD ulja prilagođeno psima i mačkama",
      "Podrška kod stresa, straha od grmljavine i vožnje",
      "Pomaže kod bolova i ukočenosti zglobova",
      "Bez psihoaktivnog dejstva, sa kapaljkom za lako doziranje",
    ],
    details:
      "Vethealth CBD kapi dobijaju se od industrijske konoplje i standardizovane su na 8% kanabidiola. Koriste se kao podrška smirenju, apetitu i pokretljivosti starijih ljubimaca. Počnite sa najmanjom dozom prema težini i posavetujte se sa veterinarom.",
    specs: [
      { label: "Koncentracija", value: "8% CBD" },
      { label: "Pakovanje", value: "30ml sa kapaljkom" },
      { label: "Za", value: "Pse i mačke" },
    ],
    delivery: "Isporuka danas za sutra",
  },
  "probiovet-forte-40tbl": {
    highlights: [
      "Probiotik + prebiotik (sinbiotik) za crevnu floru",
      "Posle antibiotika, kod dijareje i promene hrane",
      "Ukusne tablete — laka primena",
      "Za pse i mačke svih uzrasta",
    ],
    details:
      "ProbioVet Forte 40 obnavlja korisne bakterije crevne flore nakon antibiotika, stresa, putovanja ili promene hrane. Redovna upotreba poboljšava varenje, konzistenciju stolice i imunitet ljubimca.",
    specs: [
      { label: "Pakovanje", value: "40 tableta" },
      { label: "Primena", value: "Uz obrok" },
      { label: "Za", value: "Pse i mačke" },
    ],
    delivery: "Isporuka danas za danas",
  },
  "trixie-wc-kutija-sa-sitom": {
    highlights: [
      "Sistem sita za lako odvajanje čistog posipa",
      "Visoke ivice — manje rasipanja oko kutije",
      "Poklopac i ručka za prenošenje",
      "Za pelet i grudvajući posip",
    ],
    details:
      "Trixie Berto olakšava svakodnevno čišćenje mačjeg toaleta: podignete sito, neiskorišćeni posip propadne nazad, a otpad ostane na situ. Dimenzije 39×22×59cm odgovaraju većini mačaka, a poklopac smanjuje mirise.",
    specs: [
      { label: "Dimenzije", value: "39×22×59cm" },
      { label: "Sistem", value: "Sito + poklopac" },
      { label: "Za posip", value: "Pelet i grudvajući" },
    ],
    delivery: "Isporuka danas za danas",
  },
  "drveni-pelet-posip-5kg": {
    highlights: [
      "100% prirodni drveni pelet, bez mirisa i prašine",
      "Odlična apsorpcija i neutralisanje mirisa",
      "Kompostabilan i ekološki",
      "Za mačke i male glodare",
    ],
    details:
      "Drveni pelet je najekonomičniji prirodni posip: tečnost se vezuje u dodiru sa peletom koji se raspada u piljevinu, pa se uklanja samo iskorišćeni deo. Pakovanje od 5kg traje jednoj mački i do mesec dana uz redovno čišćenje.",
    specs: [
      { label: "Pakovanje", value: "5kg" },
      { label: "Materijal", value: "100% drvo" },
      { label: "Za", value: "Mačke, zečeve, hrčke" },
    ],
    delivery: "Isporuka danas za danas",
  },
  "fruity-sampon-banana-250ml": {
    highlights: [
      "Blaga formula prijatnog mirisa banane",
      "Ne iritira oči i osetljivu kožu",
      "Lako se ispira, dlaka ostaje mekana",
      "Za pse i mačke",
    ],
    details:
      "Fruity šampon sa mirisom banane namenjen je redovnom kupanju pasa i mačaka. Blagi surfaktanti nežno čiste bez isušivanja kože, pa je pogodan i za često kupanje štenaca i mačića.",
    specs: [
      { label: "Pakovanje", value: "250ml" },
      { label: "Miris", value: "Banana" },
      { label: "Za", value: "Pse i mačke" },
    ],
    delivery: "Isporuka danas za danas",
  },
  "trixie-cetka-cesalj-27cm": {
    highlights: [
      "Dvostrana: meka četka + metalni češalj",
      "Uklanja opalu dlaku i sprečava ćebanje",
      "Ergonomska drška za udoban hvat",
      "Za pse i mačke srednje i duge dlake",
    ],
    details:
      "Trixie kombinovana četka pokriva svakodnevnu negu: meka strana zaglađuje i daje sjaj, a metalni češalj raščešljava poddlaku i čvorove. Redovno četkanje smanjuje linjanje po stanu i čuva zdravlje kože.",
    specs: [
      { label: "Dužina", value: "27cm" },
      { label: "Tip", value: "Četka + češalj" },
      { label: "Za dlaku", value: "Srednja i duga" },
    ],
    delivery: "Isporuka danas za sutra",
  },
  "rogz-grinz-lopta-crvena": {
    highlights: [
      "Guma sa žljebovima — puni se poslasticama",
      "Izdržljiva za žvakanje i donošenje",
      "Pluta na vodi — i za igru na plaži",
      "Jarka crvena boja, lako uočljiva",
    ],
    details:
      "Rogz Grinz spaja loptu i slagalicu: u žljebove se utisnu poslastice pa pas mora da se potrudi da ih izvadi. Odlična za samostalnu zabavu, trening i trošenje viška energije.",
    specs: [
      { label: "Materijal", value: "Prirodna guma" },
      { label: "Pakovanje", value: "1 komad" },
      { label: "Boja", value: "Crvena" },
    ],
    delivery: "Isporuka danas za danas",
  },
  "duvo-krevet-marquise-gold-85cm": {
    highlights: [
      "Prostrana korpa 85×70cm za srednje i velike pse",
      "Mekan jastuk na patent — lako pranje",
      "Visoke stranice daju osećaj sigurnosti",
      "Elegantan dezen uklapa se u enterijer",
    ],
    details:
      "Duvo Marquoise Gold krevet-korpa pruža psu njegovo mesto za odmor: podignute ivice služe kao naslon za glavu, a vađeni jastuk se pere u mašini. Punjenje zadržava oblik i nakon duže upotrebe.",
    specs: [
      { label: "Dimenzije", value: "85×70cm" },
      { label: "Tip", value: "Korpa sa jastukom" },
      { label: "Održavanje", value: "Jastuk periv u mašini" },
    ],
    delivery: "Isporuka danas za sutra",
  },
  "trixie-transporter-capri-eco": {
    highlights: [
      "Od reciklirane ekološke plastike",
      "Metalna vrata sa sigurnosnom bravom",
      "Otvori za ventilaciju sa svih strana",
      "Za mačke i male pse — put i veterinar",
    ],
    details:
      "Trixie Capri ECO je klasičan plastični transporter u ekološkom izdanju. Čvrsta konstrukcija, dobra ventilacija i vrata koja se lako otvaraju čine ga pouzdanim saputnikom za putovanja, a gornji deo se skida za lakše smeštanje uplašenih mačaka kod veterinara.",
    specs: [
      { label: "Veličina", value: "M" },
      { label: "Materijal", value: "Reciklirana plastika + metalna vrata" },
      { label: "Za", value: "Mačke i pse do 12kg" },
    ],
    delivery: "Isporuka 1–3 dana",
  },
}

export function getProductDetails(slug: string): ProductDetails {
  return (
    details[slug] || {
      highlights: [],
      details: "",
      specs: [],
      delivery: "Isporuka danas za sutra",
    }
  )
}

export function getBrandDescription(brand: string): string {
  return (
    brandDescriptions[brand] ||
    "Provereni brend iz našeg asortimana — originalni proizvodi uz savet našeg tima."
  )
}
