"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, MessageCircle, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { use } from "react"

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)

  type BlogPostData = {
    title: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    alt: string;
    content: string;
  }

  const blogPostsData: Record<string, BlogPostData> = {
    "kako-odabrati-najbolju-zastitu-od-krpelja": {
      title: "Kako odabrati najbolju zaštitu od krpelja i buva ove sezone?",
      category: "Zdravlje",
      author: "BG PET Tim",
      date: "Mar 15, 2024",
      readTime: "6 min čitanja",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop",
      alt: "Zaštita od krpelja i buva",
      content: `
        <h2>Zašto je zaštita od parazita važna?</h2>
        <p>
          Krpelji i buve nisu samo dosadni paraziti - oni prenose ozbiljne bolesti koje mogu ugroziti zdravlje vašeg ljubimca. Pravilna zaštita tokom cele sezone je ključna, a u BG PET apoteci na Voždovcu možete pronaći sve što vam je potrebno.
        </p>
        
        <h2>Tablete protiv buva i krpelja</h2>
        <p>
          Tablete su najmoderniji vid zaštite koji deluje sistemski - ljubimac proguta tabletu i aktivne supstance kroz krvotok štite celo telo. Prednost tableta je što deluju brzo (već nakon 30 minuta) i ne mogu se isprati vodom. U našoj apoteci imamo tablete koje štite od 4 do 12 nedelja.
        </p>
        
        <h2>Ampule (Spot-on) preparati</h2>
        <p>
          Ampule se nanose direktno na kožu ljubimca, između lopatica. Ovo je klasičan i proveren metod zaštite koji pruža zaštitu do 4 nedelje. Ampule su posebno pogodne za ljubimce koji ne vole da gutaju tablete. U ponudi imamo ampule prilagođene težini ljubimca.
        </p>
        
        <h2>Ogrlice protiv krpelja</h2>
        <p>
          Ogrlice pružaju dugotrajnu zaštitu - pojedini modeli štite i do 8 meseci. Aktivne supstance se postepeno oslobađaju i šire po celom telu. Ogrlice su vodootporne i idealne za aktivne ljubimce koji često borave u prirodi.
        </p>
        
        <h2>Koju zaštitu odabrati?</h2>
        <p>
          Izbor zavisi od nekoliko faktora: načina života ljubimca, boravka u prirodi, osetljivosti na pojedine sastojke i naravno, budžeta. Naše stručno osoblje u BG PET apoteci će vam pomoći da odaberete najbolji preparat za vašeg ljubimca.
        </p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 30px 0;">
          <h3 style="color: #10b981; margin-bottom: 10px;">Imate pitanja ili želite da rezervišete ovaj proizvod za Vašeg ljubimca?</h3>
          <p style="color: #4b5563;">Pišite nam kroz formu za rezervacije!</p>
          <p><a href="/kontakt" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 10px;">Rezervišite proizvod</a></p>
        </div>
      `
    },
    "kada-je-ljubimcu-potrebna-medicinska-hrana": {
      title: "Kada je ljubimcu potrebna medicinska hrana i kako prepoznati simptome?",
      category: "Ishrana",
      author: "BG PET Tim",
      date: "Mar 10, 2024",
      readTime: "8 min čitanja",
      image: "https://cdn.pixabay.com/photo/2017/02/20/18/03/dog-2083492_1280.jpg",
      alt: "Medicinska hrana za ljubimce",
      content: `
        <h2>Šta je medicinska hrana za ljubimce?</h2>
        <p>
          Medicinska hrana (dijetetska hrana) je specijalno formulirana hrana koja pomaže u lečenju i prevenciji određenih zdravstvenih stanja. U BG PET apoteci na Voždovcu imamo širok asortiman medicinskih dijeta vodećih svetskih proizvođača.
        </p>
        
        <h2>Dijete za bubrege</h2>
        <p>
          Bubrežne dijete imaju smanjen sadržaj proteina, fosfora i natrijuma, što smanjuje opterećenje na bubrege. Ove dijete su neophodne kod hronične bubrežne insuficijencije. Simptomi uključuju pojačano pijenje vode, učestalo mokrenje, gubitak apetita i povraćanje.
        </p>
        
        <h2>Dijete za osetljiv stomak</h2>
        <p>
          Psi i mačke sa osetljivim digestivnim sistemom često pate od dijareje, povraćanja i nadutosti. Specijalne dijete za osetljiv stomak sadrže lako svarljive proteine i vlakna koja smiruju digestivni trakt. Ako vaš ljubimac često ima probleme sa varenjem, ovo je pravi izbor.
        </p>
        
        <h2>Hrana protiv alergija</h2>
        <p>
          Alergije na hranu se manifestuju kroz svrab, crvenilo kože, hronične infekcije uha i digestivne smetnje. Hrana sa hidrolizovanim proteinima ili novim izvorima proteina (poput lososa ili divljači) može pomoći u identifikaciji i lečenju alergija.
        </p>
        
        <h2>Kako prepoznati da je vreme za medicinsku hranu?</h2>
        <p>
          Obratite pažnju na promene u ponašanju, apetitu, telesnoj težini i kvalitetu dlake. Ako primetite bilo koji od navedenih simptoma, posavetujte se sa veterinarem. U BG PET apoteci možete dobiti savet o odgovarajućoj dijeti za vašeg ljubimca.
        </p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 30px 0;">
          <h3 style="color: #10b981; margin-bottom: 10px;">Imate pitanja ili želite da rezervišete ovaj proizvod za Vašeg ljubimca?</h3>
          <p style="color: #4b5563;">Pišite nam kroz formu za rezervacije!</p>
          <p><a href="/kontakt" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 10px;">Rezervišite proizvod</a></p>
        </div>
      `
    },
    "znacaj-suplemenata-u-ishrani-pasa": {
      title: "Značaj suplemenata u ishrani pasa: Da li vaš ljubimac dobija dovoljno vitamina?",
      category: "Zdravlje",
      author: "BG PET Tim",
      date: "Feb 28, 2024",
      readTime: "7 min čitanja",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=800&auto=format&fit=crop",
      alt: "Vitamini za pse",
      content: `
        <h2>Zašto su suplementi važni?</h2>
        <p>
          Iako kvalitetna hrana čini osnovu ishrane, dodatni suplementi mogu značajno unaprediti zdravlje i kvalitet života vašeg ljubimca. U BG PET apoteci na Voždovcu nudimo širok spektar suplemenata prilagođenih potrebama pasa i mačaka.
        </p>
        
        <h2>Suplementi za zglobove</h2>
        <p>
          Glukozamin, hondroitin i MSM su ključni sastojci za očuvanje zdravlja zglobova. Posebno su važni za starije pse, velike rase i radne pse. Redovna upotreba može usporiti razvoj artritisa i smanjiti bolove u zglobovima. U ponudi imamo preparate u obliku tableta, praha i poslastica.
        </p>
        
        <h2>Omega-3 masne kiseline</h2>
        <p>
          Omega-3 masne kiseline (EPA i DHA) su neophodne za zdravlje kože, dlake, srca i mozga. Posebno su korisne za ljubimce sa alergijama, upalnim procesima i problemima sa kožom. Najbogatiji izvor su riblje ulje (losos, sardina) i ulje krilova.
        </p>
        
        <h2>Vitaminski kompleksi</h2>
        <p>
          Ponekad ishrana ne pokriva sve potrebe za vitaminima i mineralima. Vitaminski kompleksi pružaju podršku imunitetu, zdravlju kože, dlake i vitalnosti. U BG PET apoteci imamo vitamine prilagođene različitim uzrastima i rasama.
        </p>
        
        <h2>Probiotici za digestiju</h2>
        <p>
          Probiotici su korisne bakterije koje podržavaju zdravu crevnu floru. Pomažu kod probavnih smetnji, dijareje, zatvora i slabijeg imuniteta. Nakon terapije antibioticima, probiotici su posebno važni za obnovu crevne flore.
        </p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 30px 0;">
          <h3 style="color: #10b981; margin-bottom: 10px;">Imate pitanja ili želite da rezervišete ovaj proizvod za Vašeg ljubimca?</h3>
          <p style="color: #4b5563;">Pišite nam kroz formu za rezervacije!</p>
          <p><a href="/kontakt" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 10px;">Rezervišite proizvod</a></p>
        </div>
      `
    },
    "nega-dlake-i-koze-tokom-leta": {
      title: "Nega dlake i kože tokom leta: Pravilan odabir šampona za osetljive ljubimce",
      category: "Nega",
      author: "BG PET Tim",
      date: "Feb 20, 2024",
      readTime: "5 min čitanja",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop",
      alt: "Nega dlake i kože",
      content: `
        <h2>Letnja nega ljubimaca</h2>
        <p>
          Leto donosi posebne izazove za kožu i dlaku vaših ljubimaca. Vrućine, sunce, prašina i alergeni mogu izazvati iritacije, svrab i isušivanje kože. U BG PET apoteci na Voždovcu imamo kompletnu ponudu preparata za letnju negu.
        </p>
        
        <h2>Šamponi za osetljivu kožu</h2>
        <p>
          Za ljubimce sa osetljivom kožom preporučujemo blage, hipoalergene šampone bez mirisa i jakih hemikalija. Ovi šamponi sadrže ovsene pahuljice, aloe veru i pantenol koji smiruju iritacije i hidriraju kožu. Posebno su pogodni za pse i mačke koje često kopkaju ili imaju perut.
        </p>
        
        <h2>Šamponi protiv parazita</h2>
        <p>
          Tokom leta, kada su buve i krpelji najaktivniji, preporučujemo upotrebu zaštitnih šampona. Ovi šamponi sadrže prirodne repelente poput ulja neema, lavande i eukaliptusa koji odbijaju parazite bez jakih hemikalija.
        </p>
        
        <h2>Regeneratori i balzami</h2>
        <p>
          Redovna upotreba regeneratora i balzama pomaže u održavanju meke i sjajne dlake. Balzami sa kokosovim uljem, shea puterom i keratinom obnavljaju oštećenu dlaku i štite je od isušivanja. U ponudi imamo i preparate za raspetljavanje dlake bez cepanja.
        </p>
        
        <h2>Dodatna oprema za negu</h2>
        <p>
          Pravilna nega podrazumeva i odgovarajuće alate - četke, češljeve, fen za sušenje i makaze. U BG PET apoteci možete pronaći kvalitetne brendove opreme za negu koji će vam olakšati svakodnevno održavanje.
        </p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 30px 0;">
          <h3 style="color: #10b981; margin-bottom: 10px;">Imate pitanja ili želite da rezervišete ovaj proizvod za Vašeg ljubimca?</h3>
          <p style="color: #4b5563;">Pišite nam kroz formu za rezervacije!</p>
          <p><a href="/kontakt" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 10px;">Rezervišite proizvod</a></p>
        </div>
      `
    },
    "kako-pravilno-cuvati-veterinarske-preparate": {
      title: "Kako pravilno čuvati veterinarske preparate kod kuće?",
      category: "Saveti",
      author: "BG PET Tim",
      date: "Feb 15, 2024",
      readTime: "4 min čitanja",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop",
      alt: "Čuvanje veterinarskih preparata",
      content: `
        <h2>Pravilno skladištenje lekova</h2>
        <p>
          Veterinarski preparati zahtevaju pravilno čuvanje kako bi zadržali svoju efikasnost. U BG PET apoteci na Voždovcu dobijate preparate sa punim rokom trajanja, a mi vam donosimo savete kako ih pravilno skladištiti kod kuće.
        </p>
        
        <h2>Temperatura i vlažnost</h2>
        <p>
          Većina veterinarskih preparata se čuva na sobnoj temperaturi (15-25°C), daleko od direktne sunčeve svetlosti i vlage. Kupatilo i kuhinja nisu idealna mesta zbog visoke vlažnosti. Optimalno mesto je suvi ormarić u hodniku ili spavaćoj sobi.
        </p>
        
        <h2>Originalno pakovanje</h2>
        <p>
          Preparate uvek čuvajte u originalnom pakovanju sa uputstvom. Nemojte prebacivati tablete u druge kutije ili mešati različite preparate. Originalno pakovanje sadrži važne informacije o roku trajanja, doziranju i sastavu.
        </p>
        
        <h2>Bezbednost dece i ljubimaca</h2>
        <p>
          Veterinarski preparati čuvajte van domašaja dece i drugih ljubimaca. Iako su namenjeni životinjama, nepravilna upotreba može biti opasna. Preporučujemo zaključane ormariće ili visoke police.
        </p>
        
        <h2>Rok trajanja i odlaganje</h2>
        <p>
          Redovno proveravajte rok trajanja preparata. Istekle preparate nemojte bacati u kućni otpad ili WC šolju - donesite ih u BG PET apoteku gde ćemo ih pravilno zbrinuti. Pazite i na promene u izgledu, mirisu ili konzistenciji preparata.
        </p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 30px 0;">
          <h3 style="color: #10b981; margin-bottom: 10px;">Imate pitanja ili želite da rezervišete ovaj proizvod za Vašeg ljubimca?</h3>
          <p style="color: #4b5563;">Pišite nam kroz formu za rezervacije!</p>
          <p><a href="/kontakt" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 10px;">Rezervišite proizvod</a></p>
        </div>
      `
    },
    "probiotici-za-pse-kada-su-potrebni": {
      title: "Probiotici za pse: Kada su potrebni i kako ih odabrati?",
      category: "Zdravlje",
      author: "BG PET Tim",
      date: "Feb 10, 2024",
      readTime: "6 min čitanja",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=800&auto=format&fit=crop",
      alt: "Probiotici za pse",
      content: `
        <h2>Šta su probiotici?</h2>
        <p>
          Probiotici su žive korisne bakterije koje unapređuju zdravlje digestivnog sistema. Kao i kod ljudi, i kod pasa i mačaka crevna flora igra ključnu ulogu u varenju, apsorpciji hranljivih materija i jačanju imuniteta. U BG PET apoteci na Voždovcu imamo probiotike prilagođene potrebama ljubimaca.
        </p>
        
        <h2>Kada su probiotici potrebni?</h2>
        <p>
          Probiotici su posebno korisni nakon terapije antibioticima, jer antibiotici uništavaju i dobre i loše bakterije. Takođe se preporučuju kod dijareje, zatvora, nadutosti, slabog apetita i stresa (preseljenje, putovanje, boravak u hotelu za ljubimce).
        </p>
        
        <h2>Kako odabrati probiotik?</h2>
        <p>
          Prilikom odabira probiotika obratite pažnju na broj CFU (jedinica koje formiraju kolonije), raznovrsnost sojeva bakterija i dodatne sastojke poput prebiotika koji podržavaju rast korisnih bakterija. Najčešći sojevi su Lactobacillus, Bifidobacterium i Enterococcus.
        </p>
        
        <h2>Probiotici u različitim formatima</h2>
        <p>
          U BG PET apoteci probiotike možete pronaći u obliku praha koji se dodaje hrani, tableta i poslastica. Praškasti probiotici su idealni za izbirljive ljubimce jer se lako mešaju sa hranom. Tablete i poslastice su praktične za svakodnevnu upotrebu.
        </p>
        
        <h2>Prebiotici vs probiotici</h2>
        <p>
          Prebiotici su vlakna koja služe kao hrana za probiotike. Najbolji rezultati se postižu kombinacijom probiotika i prebiotika (sinbiotici). U ponudi imamo i sinbiotičke preparate koji sadrže obe komponente.
        </p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 12px; margin: 30px 0;">
          <h3 style="color: #10b981; margin-bottom: 10px;">Imate pitanja ili želite da rezervišete ovaj proizvod za Vašeg ljubimca?</h3>
          <p style="color: #4b5563;">Pišite nam kroz formu za rezervacije!</p>
          <p><a href="/kontakt" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin-top: 10px;">Rezervišite proizvod</a></p>
        </div>
      `
    }
  }

  const blogPost = blogPostsData[slug] || blogPostsData["kako-odabrati-najbolju-zastitu-od-krpelja"]

  const recentPosts = [
    {
      title: "Kada je ljubimcu potrebna medicinska hrana?",
      image: "https://cdn.pixabay.com/photo/2017/02/20/18/03/dog-2083492_1280.jpg",
      slug: "kada-je-ljubimcu-potrebna-medicinska-hrana"
    },
    {
      title: "Značaj suplemenata u ishrani pasa",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=800&auto=format&fit=crop",
      slug: "znacaj-suplemenata-u-ishrani-pasa"
    },
    {
      title: "Nega dlake i kože tokom leta",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop",
      slug: "nega-dlake-i-koze-tokom-leta"
    }
  ]

  const relatedPosts = [
    {
      title: "Probiotici za pse: Kada su potrebni?",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=800&auto=format&fit=crop",
      slug: "probiotici-za-pse-kada-su-potrebni"
    },
    {
      title: "Kako pravilno čuvati veterinarske preparate?",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop",
      slug: "kako-pravilno-cuvati-veterinarske-preparate"
    }
  ]

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* BREADCRUMBS */}
      <section className="py-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-brand-muted">
            <Link href="/blog" className="hover:text-brand-primary transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-brand-dark font-medium">{blogPost.title}</span>
          </nav>
        </div>
      </section>

      {/* HERO SEKCIJA */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header informacije */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 text-sm text-brand-muted mb-4">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{blogPost.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{blogPost.date}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{blogPost.readTime}</span>
                </div>
              </div>
              
              <span className="inline-block bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                {blogPost.category}
              </span>
              
              <h1 className="h1 mb-6">{blogPost.title}</h1>
            </div>

            {/* Hero slika */}
            <div className="max-w-4xl mx-auto">
              <Image
                src={blogPost.image}
                alt={blogPost.alt}
                width={800}
                height={500}
                className="w-full max-h-125 object-cover rounded-3xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* GLAVNI SADRŽAJ */}
      <section className="py-16 bg-brand-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* LEVA KOLONA - GLAVNI SADRŽAJ */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <article className="prose prose-lg prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: blogPost.content }}></article>

              {/* SHARE DUGMIĆI */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-brand-dark">Podeli članak:</span>
                    <div className="flex space-x-2">
                      <button className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                        <Share2 className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                        <Heart className="w-4 h-4 text-slate-600" />
                      </button>
                      <button className="p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                        <MessageCircle className="w-4 h-4 text-slate-600" />
                      </button>
                    </div>
                  </div>
                  
                  <Link
                    href="/blog"
                    className="inline-flex items-center space-x-2 text-brand-primary hover:text-brand-primary/80 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Nazad na blog</span>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* DESNA KOLONA - SIDEBAR */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* CTA BOX */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-brand-dark mb-4">Potreban vam je savet?</h3>
                <p className="text-brand-muted mb-6">Pišite nam za savet o proizvodima ili rezervišite proizvod za vašeg ljubimca.</p>
                <Link
                  href="/kontakt"
                  className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center space-x-2"
                >
                  <span>Rezervišite proizvod</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* RECENT POSTS */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-brand-dark mb-6">Najnoviji članci</h3>
                <div className="space-y-4">
                  {recentPosts.map((post, index) => (
                    <Link
                      key={index}
                      href={`/blog/${post.slug}`}
                      className="flex space-x-3 group"
                    >
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-lg object-cover shrink-0"
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-brand-dark line-clamp-2 group-hover:text-brand-primary transition-colors">
                          {post.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* POVEZANI ČLANCI */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="h2 text-center mb-12">Povezani članci</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((post, index) => (
                <Link
                  key={index}
                  href={`/blog/${post.slug}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-primary transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
