import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ChevronRight,
  Star,
  Check,
  Truck,
  Phone,
  ShieldCheck,
} from "lucide-react"
import {
  formatPrice,
  getCategory,
  getSubgroup,
  getProduct,
  products,
} from "../../../data/shop"
import {
  getProductDetails,
  getBrandDescription,
} from "../../../data/productDetails"
import AddToQuote from "./AddToQuote"
import ProductCard from "../../../components/cart/ProductCard"

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) return { title: "Proizvod nije pronađen" }
  return {
    title: product.name,
    description: `${product.shortDesc} Cena: ${formatPrice(product.price)}. Poručite na upit — bez plaćanja karticom.`,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = getProduct(slug)
  if (!product) notFound()
  const category = getCategory(product.category)
  const subgroup = getSubgroup(product.sub)
  const info = getProductDetails(product.slug)
  const related = products
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4)
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0

  const stockLabel =
    product.stock === "dostupno"
      ? "Dostupno u apoteci"
      : product.stock === "poslednji-komadi"
        ? "Poslednji komadi — proverite"
        : "Na upit — nabavka za 1–3 dana"
  const stockColor =
    product.stock === "dostupno"
      ? "text-green-600"
      : product.stock === "poslednji-komadi"
        ? "text-orange-600"
        : "text-blue-600"

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Breadcrumb kao kod sata */}
      <section className="pt-6 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-brand-muted">
            <Link href="/" className="hover:text-brand-primary">
              Početna
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/prodavnica" className="hover:text-brand-primary">
              Prodavnica
            </Link>
            {category && (
              <>
                <ChevronRight className="w-4 h-4" />
                <Link
                  href={`/prodavnica?category=${category.slug}`}
                  className="hover:text-brand-primary"
                >
                  {category.name}
                </Link>
              </>
            )}
            {subgroup && (
              <>
                <ChevronRight className="w-4 h-4" />
                <Link
                  href={`/prodavnica?category=${product.category}&sub=${subgroup.slug}`}
                  className="hover:text-brand-primary"
                >
                  {subgroup.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-4 h-4" />
            <span className="font-semibold text-brand-dark line-clamp-1">
              {product.name}
            </span>
          </nav>
        </div>
      </section>

      {/* Naslov + slika + info */}
      <section className="py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-4xl font-bold text-brand-dark mb-6">
            {product.name}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Levo - slika */}
            <div>
              <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-brand-bg">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={800}
                  height={600}
                  className="w-full h-72 sm:h-96 lg:h-[460px] object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {product.badges?.map((b) => (
                    <span
                      key={b}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full shadow ${
                        b === "akcija"
                          ? "bg-red-500 text-white"
                          : b === "novo"
                            ? "bg-blue-500 text-white"
                            : "bg-brand-primary text-white"
                      }`}
                    >
                      {b === "akcija" && discount > 0
                        ? `Akcija -${discount}%`
                        : b === "akcija"
                          ? "Akcija"
                          : b === "novo"
                            ? "Novo"
                            : "Naša preporuka"}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Desno - info kao kod sata */}
            <div>
              <Link
                href={`/prodavnica?brand=${encodeURIComponent(product.brand)}`}
                className="inline-block font-bold text-brand-primary hover:underline"
              >
                {product.brand}
              </Link>

              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-sm font-semibold">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-sm text-brand-muted">
                  • {product.unit}
                </span>
                <span className={`text-sm font-semibold ${stockColor}`}>
                  • {stockLabel}
                </span>
              </div>

              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl md:text-4xl font-bold text-brand-dark">
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-slate-400 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>

              <p className="text-sm text-brand-muted mt-1 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-brand-primary" />
                {info.delivery}
              </p>

              <div className="mt-6">
                <AddToQuote slug={product.slug} />
              </div>

              {/* Bulleti */}
              {info.highlights.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {info.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2.5 text-brand-dark">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-emerald-700" />
                      </span>
                      <span className="text-[15px] leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tagovi */}
              <div className="mt-6 pt-5 border-t border-slate-100 text-sm space-y-1.5">
                <p className="text-brand-muted">
                  <strong className="text-brand-dark">Kategorija:</strong>{" "}
                  {category && (
                    <Link
                      href={`/prodavnica?category=${category.slug}`}
                      className="text-brand-primary hover:underline"
                    >
                      {category.name}
                    </Link>
                  )}
                  {subgroup && (
                    <>
                      {" / "}
                      <Link
                        href={`/prodavnica?category=${product.category}&sub=${subgroup.slug}`}
                        className="text-brand-primary hover:underline"
                      >
                        {subgroup.name}
                      </Link>
                    </>
                  )}
                </p>
                <p className="text-brand-muted">
                  <strong className="text-brand-dark">Brend:</strong>{" "}
                  <Link
                    href={`/prodavnica?brand=${encodeURIComponent(product.brand)}`}
                    className="text-brand-primary hover:underline"
                  >
                    {product.brand}
                  </Link>
                </p>
                <p className="text-brand-muted">
                  <strong className="text-brand-dark">Dostava:</strong>{" "}
                  {info.delivery} • Bez plaćanja karticom
                </p>
              </div>

              <a
                href="tel:+381658665393"
                className="mt-4 inline-flex items-center gap-2 font-semibold text-brand-dark hover:text-brand-primary text-sm"
              >
                <Phone className="w-4 h-4 text-brand-primary" />
                065/866-5393 — pitajte nas o proizvodu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Detaljni opis */}
      {info.details && (
        <section className="py-10 bg-brand-bg border-y border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              Detaljni opis
            </h2>
            <p className="text-brand-muted leading-relaxed text-[15px] md:text-base">
              {info.details}
            </p>
          </div>
        </section>
      )}

      {/* Karakteristike */}
      {info.specs.length > 0 && (
        <section className="py-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              Karakteristike
            </h2>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              {info.specs.map((s, i) => (
                <div
                  key={s.label}
                  className={`grid grid-cols-2 gap-4 px-5 py-3.5 text-sm ${
                    i % 2 === 0 ? "bg-brand-bg" : "bg-white"
                  }`}
                >
                  <span className="font-bold text-brand-dark">{s.label}</span>
                  <span className="text-brand-muted">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* O brendu */}
      <section className="py-10 bg-brand-bg border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-brand-dark mb-4">
            O brendu {product.brand}
          </h2>
          <p className="text-brand-muted leading-relaxed text-[15px] md:text-base">
            {getBrandDescription(product.brand)}
          </p>
          <Link
            href={`/prodavnica?brand=${encodeURIComponent(product.brand)}`}
            className="inline-flex items-center gap-2 mt-4 text-sm font-bold text-brand-primary hover:gap-3 transition-all"
          >
            Svi {product.brand} proizvodi
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Bezbednosna napomena za apoteku */}
      {product.category === "apoteka" && (
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-slate-700">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p>
                Apotekarski preparat izdaje se uz savet apotekara. Pre primene
                pročitajte uputstvo, a u slučaju nedoumica posavetujte se sa
                veterinarom. Lekovi se ne šalju bez prethodne provere.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Slični proizvodi */}
      {related.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-brand-dark mb-6">
              Slični proizvodi
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
