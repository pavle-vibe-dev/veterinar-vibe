"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, MessageCircle, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { use } from "react"

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap the params Promise
  const { slug } = use(params)
  
  // Define the type for blog post data
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
  
  // Mapiranje slug-ova na podatke o blog postovima
  const blogPostsData: Record<string, BlogPostData> = {
    "redovni-pregledi-zasto-su-bitni": {
      title: "Redovni pregledi: Zašto su bitni?",
      category: "Zdravlje",
      author: "VetiCare Tim",
      date: "Jan 29, 2024",
      readTime: "5 min čitanja",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=800&h=600&fit=crop",
      alt: "Veterinar pregleda psa",
      content: `
        <h2>Zašto su redovni pregledi ključni?</h2>
        <p>
          Redovni veterinarski pregledi su temelj preventivne nege zdravlja vašeg ljubimca. Mnogi vlasnici čekaju da se pojave simptomi pre nego što posete veterinara, ali je to često kasno. Prevencija je uvek bolja (i jeftinija) od lečenja.
        </p>
        
        <h2>Koliko često treba obavljati preglede?</h2>
        <p>
          Učestalost pregleda zavisi od starosti i zdravstvenog stanja vašeg ljubimca. Štenca i mlade životinje treba pregledati svakih 3-4 nedelje do kompletne vakcinacije. Odrasle, zdrave životinje treba posetiti veterinara najmanje jednom godišnje.
        </p>
        
        <h2>Šta se proverava na redovnom pregledu?</h2>
        <p>
          Kompletan veterinarski pregled uključuje detaljnu proveru svih sistema organa. Veterinar će proveriti oči, uši, usta, kožu, srce, pluća, i trbušnu duplju. Takođe će meriti težinu, temperaturu i proveravati opšte stanje životinje.
        </p>
        
        <h2>Rani znakovi bolesti</h2>
        <p>
          Veterinari su obučeni da prepoznaju suptilne znakove bolesti koje vlasnici mogu primetiti. Promene u ponašanju, apetitu, ili nivou energije mogu ukazivati na zdravstvene probleme. Što se bolest otkrije ranije, prognoza je bolja.
        </p>
        
        <h2>Dugoročne koristi</h2>
        <p>
          Redovni pregledi ne samo da čuvaju zdravlje vašeg ljubimca, već i grade poverenje između veterinaire, životinje i vlasnika. Ovo smanjuje stres kod budućih poseta i omogućava veterinaru da bolje upozna vašeg ljubimca.
        </p>
        
        <h2>Zaključak</h2>
        <p>
          Investiranje u redovne veterinarske preglede je jedna od najvažnijih stvari koje možete učiniti za dugoročno zdravlje i sreću vašeg ljubimca. Ne čekajte na probleme - budite proaktivni u nezi svog četvorostrukog prijatelja.
        </p>
      `
    },
    "najbolja-hrana-za-starije-pse": {
      title: "Najbolja hrana za starije pse",
      category: "Ishrana",
      author: "VetiCare Tim",
      date: "Jan 27, 2024",
      readTime: "7 min čitanja",
      image: "https://cdn.pixabay.com/photo/2017/02/20/18/03/dog-2083492_1280.jpg",
      alt: "Hrana za starije pse",
      content: `
        <h2>Specifične nutritivne potrebe starijih pasa</h2>
        <p>
          Stariji psi imaju posebne nutritivne potrebe koje se razlikuju od onih kod mladih ili odraslih pasa. Metabolizam se usporava, digestivni sistem postaje osetljiviji, a potrebe za određenim hranljivim materijama se menjaju.
        </p>
        
        <h2>Kalorijski unos i kontrola težine</h2>
        <p>
          Stariji psi su manje aktivni i imaju niže energetske potrebe. Međutim, mnogi stariji psi pate od gojaznosti koja može dovesti do ozbiljnih zdravstvenih problema. Izbor hrane sa pravilnim kalorijskim sadržajem je ključan.
        </p>
        
        <h2>Važnost proteina i aminokiselina</h2>
        <p>
          Kvalitetni proteini su važni za očuvanje mišićne mase kod starijih pasa. Međutim, digestivni sistem može biti osetljiviji, pa je važno birati lako svarljive izvore proteina kao što su piletina, riba ili jaja.
        </p>
        
        <h2>Zglobovi i pokretljivost</h2>
        <p>
          Mnogi stariji psi pate od problema sa zglobovima. Hrana obogaćena glukozaminom, hondroitinom i omega-3 masnim kiselinama može pomoći u očuvanju pokretljivosti i smanjenju upala.
        </p>
        
        <h2>Vlakna i digestija</h2>
        <p>
          Stariji psi često pate od zatvora ili drugih digestivnih problema. Adekvatan unos vlakana pomaže u regulisanju crevne flore i sprečava konstipaciju.
        </p>
        
        <h2>Vitamini i minerali</h2>
        <p>
          Antioksidansi, vitamini i minerali igraju važnu ulogu u borbi protiv oksidativnog stresa i očuvanju zdravlja ćelija. Posebno su važni vitamini E, C, selen i cink.
        </p>
      `
    },
    "kako-prepoznati-stres-kod-macke": {
      title: "Kako prepoznati stres kod mačke?",
      category: "Zdravlje",
      author: "VetiCare Tim",
      date: "Jan 25, 2024",
      readTime: "6 min čitanja",
      image: "https://images.unsplash.com/photo-1513245593221-3b243fcdb056?w=800&h=600&fit=crop",
      alt: "Mačka u mirnom položaju",
      content: `
        <h2>Znakovi stresa kod mačaka</h2>
        <p>
          Mačke su majstori u skrivanju simptoma stresa. Često vlasnici ne primećuju da njihova mačka pati od anksioznosti sve dok se ne pojave ozbiljniji zdravstveni problemi. Upoznajte se sa najčešćim znacima stresa.
        </p>
        
        <h2>Ponašanje i telesni jezik</h2>
        <p>
          Mačke pod stresom mogu postati agresivne, povučene ili preterano ljubazne. Često se sakrivaju u zatvorenim prostorima, izbegavaju kontakt sa vlasnicima ili pokazuju destruktivno ponašanje.
        </p>
        
        <h2>Fizički simptomi</h2>
        <p>
          Stres može uticati na fizičko zdravlje mačke. Možete primetiti gubitak apetita, povraćanje, dijareju ili probleme sa mokrenjem. Mačke pod stresom često imaju masnu dlaku i gube na težini.
        </p>
        
        <h2>Problemi sa mokrenjem</h2>
        <p>
          Jedan od najčešćih znakova stresa kod mačaka je idiopatska cistitis - upala mokraćne bešike bez bakterijske infekcije. Stres može dovesti do toga da mačka mokri van kutije ili ima probleme sa mokrenjem.
        </p>
        
        <h2>Preterano ližuckanje</h2>
        <p>
          Mačke pod stresom često preterano ližu svoju dlaku, što može dovesti do ćelavosti i kožnih problema. Ovo je pokušaj samoumirivanja.
        </p>
        
        <h2>Kako pomoći mački</h2>
        <p>
          Ako primetite znake stresa kod vaše mačke, važno je identifikovati uzrok. Promene u okruženju, novi članovi porodice ili životinje mogu biti okidači. Posetite veterinara radi pregleda i saveta.
        </p>
      `
    },
    "priprema-ljubimca-za-putovanje": {
      title: "Priprema ljubimca za putovanje",
      category: "Saveti",
      author: "VetiCare Tim",
      date: "Jan 23, 2024",
      readTime: "8 min čitanja",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=800&auto=format&fit=crop",
      alt: "Ljubimac u putovanju",
      content: `
        <h2>Planiranje putovanja sa ljubimcem</h2>
        <p>
          Putovanje sa ljubimcem može biti zabavno iskustvo, ali zahteva dobru pripremu. Važno je unapred isplanirati sve detalje kako bi putovanje proteklo bez stresa za vas i vašeg ljubimca.
        </p>
        
        <h2>Veterinarska dokumentacija</h2>
        <p>
          Pre putovanja obavezno posetite veterinara. Proverite da li su sve vakcinacije u redu, nabavite međunarodni pasoš za životinje ako putujete van zemlje, i razgovarajte o preventivnim merama protiv parazita.
        </p>
        
        <h2>Transport i bezbednost</h2>
        <p>
          Odaberite odgovarajući način transporta za vašeg ljubimca. Za kraća putovanja automobilom koristite specijalne transportere ili sigurnosne pojaseve. Za duža putovanja avionom informišite se o pravilima aviokompanija.
        </p>
        
        <h2>Priprema za put</h2>
        <p>
          Nekoliko dana pre putovanja naviknite ljubimca na transporter ili auto. Ponesite dovoljno hrane, vode, lekova i igračaka. Ne hranite ljubimca neposredno pre putovanja da izbegnete mučninu.
        </p>
        
        <h2>Destinacija i smeštaj</h2>
        <p>
          Proverite da li je smeštaj koji ste odabrali pet-friendly. Informišite se o lokalnim veterinarskim službama i pravilima za životinje u destinaciji koju posećujete.
        </p>
        
        <h2>Prva pomoć i hitni slučajevi</h2>
        <p>
          Uvek nosite sa sobom komplet prve pomoći za ljubimce. Znajte gde se nalazi najbliža veterinarska klinika u mestu koje posećujete i imajte kontakt informacije lokalnog veterinara.
        </p>
      `
    },
    "trening-socijalizacije-stenaca": {
      title: "Trening socijalizacije štenaca",
      category: "Saveti",
      author: "VetiCare Tim",
      date: "Jan 21, 2024",
      readTime: "10 min čitanja",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop",
      alt: "Štene u treningu",
      content: `
        <h2>Važnost rane socijalizacije</h2>
        <p>
          Rana socijalizacija je ključna za razvoj zdrave i srećne psine ličnosti. Štenci koji su dobro socijalizovani postaju samouvereni odrasli psi koji se lako prilagođavaju različitim situacijama.
        </p>
        
        <h2>Kritični period socijalizacije</h2>
        <p>
          Kritični period socijalizacije traje od 3. do 14. nedelje života štenca. Tokom ovog perioda mozak je najreceptivniji za učenje i formiranje stavova prema različitim stimulansima.
        </p>
        
        <h2>Bezbedni susreti sa drugim psima</h2>
        <p>
          Uvodite štence drugim psima postepeno. Počnite sa kratkim, pozitivnim susretima u kontrolisanom okruženju. Nadgledajte interakcije i nagradjujte dobro ponašanje.
        </p>
        
        <h2>Upoznavanje sa ljudima</h2>
        <p>
          Štenci treba da se upoznaju sa različitim tipovima ljudi - decom, muškarcima, ženama, ljudima različitih rasa. Važno je da ova iskustva budu pozitivna.
        </p>
        
        <h2>Različiti zvukovi i okruženja</h2>
        <p>
          Navikavajte štence na različite zvukove (usisivač, grmljavina, saobraćaj) i okruženja (parkovi, ulice, prodavnice). Počnite sa niskim intenzitetom i postepeno povećavajte.
        </p>
        
        <h2>Ruka na srce trening</h2>
        <p>
          Redovni trening poslušnosti pomaže štencima da se osećaju sigurno. Naučite osnovne komande i koristite pozitivno pojačavanje. Strpljenje i doslednost su ključni.
        </p>
      `
    },
    "nega-zuba-kod-kucnih-ljubimaca": {
      title: "Nega zuba kod kućnih ljubimaca",
      category: "Zdravlje",
      author: "VetiCare Tim",
      date: "Jan 19, 2024",
      readTime: "5 min čitanja",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=800&auto=format&fit=crop",
      alt: "Nega zuba kod ljubimaca",
      content: `
        <h2>Važnost oralnog zdravlja</h2>
        <p>
          Oralno zdravlje je važno za opšte zdravlje vašeg ljubimca. Nelečeni problemi sa zubima mogu dovesti do ozbiljnih zdravstvenih problema u drugim delovima tela, uključujući srce, bubrege i jetru.
        </p>
        
        <h2>Znakovi problema sa zubima</h2>
        <p>
          Obratite pažnju na loš zadah, crvene desni, kamenac, labave zube ili promene u apetitu. Ovi simptomi mogu ukazivati na parodontalne bolesti ili druge probleme.
        </p>
        
        <h2>Dnevna nega zuba kod kuće</h2>
        <p>
          Redovno četkanje zuba je najbolji način prevencije. Koristite specijalne četkice i paste za pse i mačke. Počnite postepeno da naviknete ljubimca na ovu rutinu.
        </p>
        
        <h2>Dentalne igračke i hrana</h2>
        <p>
          Dentalne igračke i hrana dizajnirana za čišćenje zuba mogu pomoći u uklanjanju naslaga. Međutim, one ne zamenjuju redovno četkanje.
        </p>
        
        <h2>Profesionalno čišćenje</h2>
        <p>
          Veterinari preporučuju profesionalno čišćenje zuba jednom ili dva puta godišnje, u zavisnosti od stanja usta vašeg ljubimca. Ovo uključuje ultrazvučno čišćenje i poliranje.
        </p>
        
        <h2>Prevencija je najbolja medicina</h2>
        <p>
          Redovna nega zuba može sprečiti ozbiljne zdravstvene probleme i uštedeti novac na veterinarskim troškovima. Počnite sa negom zuba što ranije i učinite je delom svakodnevne rutine.
        </p>
      `
    }
  }

  // Pronađi blog post na osnovu slug-a
  const blogPost = blogPostsData[slug] || blogPostsData["redovni-pregledi-zasto-su-bitni"]

  const recentPosts = [
    {
      title: "Najbolja hrana za starije pse",
      image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?q=80&w=800&auto=format&fit=crop",
      slug: "najbolja-hrana-za-starije-pse"
    },
    {
      title: "Kako prepoznati stres kod mačke?",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop",
      slug: "kako-prepoznati-stres-kod-macke"
    },
    {
      title: "Priprema ljubimca za putovanje",
      image: "https://images.unsplash.com/photo-1544191714-3d7176392070?q=80&w=800&auto=format&fit=crop",
      slug: "priprema-ljubimca-za-putovanje"
    }
  ]

  const relatedPosts = [
    {
      title: "Nega zuba kod kućnih ljubimaca",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=800&auto=format&fit=crop",
      slug: "nega-zuba-kucni-ljubimci"
    },
    {
      title: "Trening socijalizacije štenaca",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?q=80&w=800&auto=format&fit=crop",
      slug: "trening-socijalizacije-stenaca"
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
                <p className="text-brand-muted mb-6">Zakažite konsultacije sa našim veterinarskim stručnjacima.</p>
                <Link
                  href="#footer-booking"
                  className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center space-x-2"
                >
                  <span>Zakažite konsultacije</span>
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
