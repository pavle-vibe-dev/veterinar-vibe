"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Canonical from "../../components/Canonical"
import { motion } from "framer-motion"
import {
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  Loader2,
  Check,
  Send,
  Truck,
  Store,
  Banknote,
  Landmark,
  Wallet,
  Package,
} from "lucide-react"
import { useCart } from "../../components/cart/CartProvider"
import { trackOrder } from "../../lib/analytics"
import { formatPrice, getProduct } from "../../data/shop"
import { shopInfo } from "../../data/shop-info"
import {
  FREE_DELIVERY_THRESHOLD,
  deliveryMethods,
  paymentMethods,
  deliveryPrice,
  makeOrderNumber,
  loadOrderHistory,
  saveOrderToHistory,
  type SavedOrder,
} from "../../data/checkout"

const paymentIcons: Record<string, typeof Banknote> = {
  pouzecem: Banknote,
  virman: Landmark,
  licno: Wallet,
}

export default function UpitPage() {
  const { items, count, setQty, remove, clear } = useCart()
  const [form, setForm] = useState({
    ownerName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    note: "",
  })
  const [delivery, setDelivery] = useState("preuzimanje")
  const [payment, setPayment] = useState("licno")
  const [sending, setSending] = useState(false)
  const [sentOrder, setSentOrder] = useState<SavedOrder | null>(null)
  const [history, setHistory] = useState<SavedOrder[]>([])

  useEffect(() => {
    setHistory(loadOrderHistory())
  }, [])

  const detailed = items
    .map((i) => ({ ...i, product: getProduct(i.slug) }))
    .filter((x) => x.product)

  const subtotal = useMemo(
    () =>
      detailed.reduce((s, d) => s + (d.product ? d.product.price * d.qty : 0), 0),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items]
  )
  const shipping = deliveryPrice(delivery, subtotal)
  const total = subtotal + shipping
  const hasApoteka = detailed.some((d) => d.product?.category === "apoteka")
  const freeShipLeft = FREE_DELIVERY_THRESHOLD - subtotal

  const allowedPayments = paymentMethods.filter((p) =>
    p.allowedDelivery.includes(delivery)
  )

  const pickDelivery = (slug: string) => {
    setDelivery(slug)
    const allowed = paymentMethods.filter((p) =>
      p.allowedDelivery.includes(slug)
    )
    if (!allowed.some((p) => p.slug === payment)) {
      setPayment(allowed[0]?.slug || "virman")
    }
  }

  const deliveryName =
    deliveryMethods.find((d) => d.slug === delivery)?.name || delivery
  const paymentName =
    paymentMethods.find((p) => p.slug === payment)?.name || payment

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      const { sendOrder } = await import("../actions/sendOrder")
      const orderNumber = makeOrderNumber()
      const result = await sendOrder({
        orderNumber,
        ownerName: form.ownerName,
        phone: form.phone,
        email: form.email || undefined,
        address: delivery === "preuzimanje" ? "Lično preuzimanje" : form.address,
        city: delivery === "preuzimanje" ? "Beograd" : form.city,
        zip: delivery === "preuzimanje" ? "" : form.zip,
        note: form.note || undefined,
        deliverySlug: delivery,
        deliveryName,
        deliveryPrice: shipping,
        paymentSlug: payment,
        paymentName,
        items: detailed.map((d) => ({
          slug: d.slug,
          name: d.product!.name,
          unit: d.product!.unit,
          price: d.product!.price,
          qty: d.qty,
        })),
        subtotal,
        total,
        hasApotekaItems: hasApoteka,
      })
      if (result.success) {
        trackOrder(orderNumber, total, count)
        const saved: SavedOrder = {
          number: orderNumber,
          date: new Date().toLocaleString("sr-RS"),
          total,
          itemCount: count,
          payment: paymentName,
          delivery: deliveryName,
        }
        saveOrderToHistory(saved)
        setHistory(loadOrderHistory())
        setSentOrder(saved)
        clear()
        setForm({
          ownerName: "",
          phone: "",
          email: "",
          address: "",
          city: "",
          zip: "",
          note: "",
        })
      } else {
        alert("Greška: " + (result.error || "pokušajte ponovo"))
        setSending(false)
      }
    } catch (err) {
      console.error(err)
      alert("Greška pri slanju. Pokušajte ponovo.")
      setSending(false)
    }
  }

  /* ---------- USPEŠNO POSLATO ---------- */
  if (sentOrder) {
    return (
      <div className="min-h-screen bg-brand-bg overflow-x-hidden">
        <Canonical path="/upit" />
        <section className="pt-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <motion.div
              className="bg-white rounded-2xl border border-emerald-200 p-8 sm:p-12 text-center shadow-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-dark mb-2">
                Porudžbina primljena!
              </h1>
              <p className="text-brand-muted mb-1">
                Broj porudžbine:{" "}
                <strong className="text-brand-dark">{sentOrder.number}</strong>
              </p>
              <p className="text-brand-muted mb-6">
                Ukupno: <strong className="text-brand-dark">{formatPrice(sentOrder.total)}</strong>{" "}
                • {sentOrder.payment} • {sentOrder.delivery}
              </p>

              {sentOrder.payment.includes("Virman") && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-left mb-6">
                  <p className="font-bold text-brand-dark mb-2">
                    Uputstvo za uplatu (virman):
                  </p>
                  <p className="text-sm text-slate-700">
                    {shopInfo.bankAccount && (
                      <>
                        Račun: <strong>{shopInfo.bankAccount}</strong>
                        <br />
                      </>
                    )}
                    Poziv na broj: <strong>{sentOrder.number}</strong>
                    <br />
                    Primalac: {shopInfo.legalName}, {shopInfo.city}
                  </p>
                  {!shopInfo.bankAccount && (
                    <p className="text-sm text-slate-700 mt-2">
                      Broj računa šaljemo uz potvrdu porudžbine.
                    </p>
                  )}
                  <p className="text-xs text-slate-500 mt-2">
                    Porudžbinu šaljemo po evidentiranoj uplati.
                  </p>
                </div>
              )}
              {sentOrder.payment.includes("Pouzećem") && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-left mb-6">
                  <p className="text-sm text-slate-700">
                    Kurir stiže za 1–4 radna dana —{" "}
                    <strong>plaćate gotovinom pri prijemu</strong>. Javićemo se
                    telefonom pre slanja radi potvrde.
                  </p>
                </div>
              )}
              {sentOrder.payment.includes("apoteci") && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 text-left mb-6">
                  <p className="text-sm text-slate-700">
                    Vidimo se u apoteci — Vojvode Stepe 189, Pon–Pet
                    9–20h, Sub 10–16h. Javićemo se kad je
                    porudžbina spremna.
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => {
                    setSentOrder(null)
                    setSending(false)
                  }}
                  className="btn-outline px-8 py-3 cursor-pointer"
                >
                  Nova porudžbina
                </button>
                <Link
                  href="/prodavnica?prikaz=lista"
                  className="btn-primary inline-flex px-8 py-3 justify-center"
                >
                  Nazad u prodavnicu
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    )
  }

  /* ---------- PRAZNA KORPA + ISTORIJA ---------- */
  if (detailed.length === 0) {
    return (
      <div className="min-h-screen bg-brand-bg overflow-x-hidden">
        <Canonical path="/upit" />
        <section className="pt-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="bg-white rounded-2xl border border-slate-100 p-8 sm:p-12 text-center">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-xl font-bold text-brand-dark mb-2">
                Korpa je prazna
              </p>
              <p className="text-brand-muted mb-6">
                Dodajte proizvode iz prodavnice klikom na &bdquo;Dodaj u korpu&ldquo;.
              </p>
              <Link
                href="/prodavnica?prikaz=lista"
                className="btn-primary inline-flex px-8 py-3"
              >
                Pogledaj prodavnicu
              </Link>
            </div>

            {history.length > 0 && (
              <div className="mt-8 bg-white rounded-2xl border border-slate-100 p-6 sm:p-8">
                <h2 className="text-lg font-bold text-brand-dark mb-4">
                  Vaše prethodne porudžbine
                </h2>
                <div className="space-y-3">
                  {history.map((h) => (
                    <div
                      key={h.number}
                      className="flex flex-wrap items-center gap-x-4 gap-y-1 border border-slate-100 rounded-xl px-4 py-3 text-sm"
                    >
                      <strong className="text-brand-dark">{h.number}</strong>
                      <span className="text-brand-muted">{h.date}</span>
                      <span className="text-brand-muted">
                        {h.itemCount} stavki • {h.payment}
                      </span>
                      <strong className="ml-auto text-brand-primary">
                        {formatPrice(h.total)}
                      </strong>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-brand-muted mt-3">
                  Čuva se samo na ovom uređaju.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    )
  }

  /* ---------- CHECKOUT ---------- */
  return (
    <div className="min-h-screen bg-brand-bg overflow-x-hidden">
      <Canonical path="/upit" />
      <section className="pt-6 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/prodavnica?prikaz=lista"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-muted hover:text-brand-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Nazad u prodavnicu
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-brand-dark mt-2">
            Zaključi porudžbinu {count > 0 && `(${count})`}
          </h1>
          <p className="text-brand-muted mt-2 max-w-2xl">
            Bez plaćanja karticom — birate dostavu i plaćanje pouzećem,
            virmanom ili lično. Potvrdu dobijate telefonom/emailom.
          </p>
        </div>
      </section>

      <section className="py-8 md:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 items-start">
              <div className="lg:col-span-3 space-y-6">
                {/* 1. STAVKE */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
                  <h2 className="text-lg font-bold text-brand-dark mb-4">
                    1. Stavke u korpi
                  </h2>
                  <div className="space-y-3">
                    {detailed.map(({ slug, qty, product }) => (
                      <div
                        key={slug}
                        className="flex gap-3 sm:gap-4 items-center border border-slate-100 rounded-xl p-3"
                      >
                        <Image
                          src={product!.image}
                          alt={product!.name}
                          width={120}
                          height={90}
                          className="w-20 h-16 sm:w-24 sm:h-20 object-cover rounded-xl shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/prodavnica/${slug}`}
                            className="font-bold text-sm sm:text-base text-brand-dark hover:text-brand-primary"
                          >
                            {product!.name}
                          </Link>
                          <p className="text-xs sm:text-sm text-brand-muted">
                            {formatPrice(product!.price)} • {product!.unit}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <button
                              type="button"
                              onClick={() => setQty(slug, qty - 1)}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                              aria-label="Smanji"
                            >
                              <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                            <span className="font-bold w-7 text-center text-sm sm:text-base">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(slug, qty + 1)}
                              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-100 cursor-pointer"
                              aria-label="Povećaj"
                            >
                              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                            </button>
                            <span className="ml-auto font-bold text-sm sm:text-base">
                              {formatPrice(product!.price * qty)}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(slug)}
                          className="p-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer self-start"
                          aria-label="Ukloni"
                        >
                          <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. PODACI I ADRESA */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
                  <h2 className="text-lg font-bold text-brand-dark mb-4">
                    2. Podaci za dostavu
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Ime i prezime *
                      </label>
                      <input
                        required
                        value={form.ownerName}
                        onChange={(e) =>
                          setForm({ ...form, ownerName: e.target.value })
                        }
                        placeholder="Vaše ime"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-brand-bg focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Telefon *
                      </label>
                      <input
                        required
                        type="tel"
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        placeholder="06x xxx xx xx"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-brand-bg focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-1">
                        Email (za potvrdu porudžbine)
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        placeholder="email@primer.rs"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-brand-bg focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                      />
                    </div>
                    {delivery !== "preuzimanje" && (
                      <>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-medium mb-1">
                            Ulica i broj *
                          </label>
                          <input
                            required
                            value={form.address}
                            onChange={(e) =>
                              setForm({ ...form, address: e.target.value })
                            }
                            placeholder="Ulica i broj"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-brand-bg focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Grad *
                          </label>
                          <input
                            required
                            value={form.city}
                            onChange={(e) =>
                              setForm({ ...form, city: e.target.value })
                            }
                            placeholder="Grad"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-brand-bg focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Poštanski broj *
                          </label>
                          <input
                            required
                            value={form.zip}
                            onChange={(e) =>
                              setForm({ ...form, zip: e.target.value })
                            }
                            placeholder="11000"
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-brand-bg focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                          />
                        </div>
                      </>
                    )}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium mb-1">
                        Napomena
                      </label>
                      <textarea
                        value={form.note}
                        onChange={(e) =>
                          setForm({ ...form, note: e.target.value })
                        }
                        rows={2}
                        placeholder="Sprat, interfon, vreme dostave..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-brand-bg focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. DOSTAVA */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
                  <h2 className="text-lg font-bold text-brand-dark mb-4">
                    3. Način dostave
                  </h2>
                  <div className="space-y-3">
                    {deliveryMethods.map((d) => {
                      const price =
                        d.slug === "preuzimanje"
                          ? 0
                          : subtotal >= FREE_DELIVERY_THRESHOLD
                            ? 0
                            : d.price
                      return (
                        <label
                          key={d.slug}
                          className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-all ${
                            delivery === d.slug
                              ? "border-brand-primary bg-emerald-50/50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="delivery"
                            checked={delivery === d.slug}
                            onChange={() => pickDelivery(d.slug)}
                            className="w-4 h-4 accent-emerald-600"
                          />
                          {d.slug === "preuzimanje" ? (
                            <Store className="w-5 h-5 text-brand-primary shrink-0" />
                          ) : (
                            <Truck className="w-5 h-5 text-brand-primary shrink-0" />
                          )}
                          <span className="flex-1">
                            <span className="block font-bold text-brand-dark text-sm sm:text-base">
                              {d.name}
                            </span>
                            <span className="block text-xs sm:text-sm text-brand-muted">
                              {d.desc}
                            </span>
                          </span>
                          <strong className="text-sm sm:text-base text-brand-dark whitespace-nowrap">
                            {price === 0 ? "Besplatno" : formatPrice(price)}
                          </strong>
                        </label>
                      )
                    })}
                  </div>
                </div>

                {/* 4. PLAĆANJE */}
                <div className="bg-white rounded-2xl border border-slate-100 p-5 sm:p-6">
                  <h2 className="text-lg font-bold text-brand-dark mb-1">
                    4. Način plaćanja
                  </h2>
                  <p className="text-xs text-brand-muted mb-4">
                    Bez kartičnog plaćanja online.
                  </p>
                  <div className="space-y-3">
                    {allowedPayments.map((p) => {
                      const Icon = paymentIcons[p.slug] || Banknote
                      return (
                        <label
                          key={p.slug}
                          className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-all ${
                            payment === p.slug
                              ? "border-brand-primary bg-emerald-50/50"
                              : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment"
                            checked={payment === p.slug}
                            onChange={() => setPayment(p.slug)}
                            className="w-4 h-4 accent-emerald-600"
                          />
                          <Icon className="w-5 h-5 text-brand-primary shrink-0" />
                          <span className="flex-1">
                            <span className="block font-bold text-brand-dark text-sm sm:text-base">
                              {p.name}
                            </span>
                            <span className="block text-xs sm:text-sm text-brand-muted">
                              {p.desc}
                            </span>
                          </span>
                        </label>
                      )
                    })}
                  </div>
                  {hasApoteka && (
                    <p className="mt-4 text-xs bg-amber-50 border border-amber-200 rounded-xl p-3 text-slate-700">
                      ⚠️ Korpa sadrži apotekarske preparate — pre slanja ćemo
                      vas kontaktirati, a lekovi se izdaju uz savet apotekara.
                    </p>
                  )}
                </div>
              </div>

              {/* SAŽETAK */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 shadow-lg p-5 sm:p-6 lg:sticky lg:top-24">
                <h2 className="text-lg font-bold text-brand-dark mb-4">
                  Sažetak
                </h2>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>
                      Proizvodi ({count})
                    </span>
                    <strong className="text-brand-dark">
                      {formatPrice(subtotal)}
                    </strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Dostava — {deliveryName}</span>
                    <strong className="text-brand-dark">
                      {shipping === 0 ? "Besplatno" : formatPrice(shipping)}
                    </strong>
                  </div>
                  {delivery !== "preuzimanje" && freeShipLeft > 0 && (
                    <div className="pt-1">
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-brand-primary rounded-full transition-all"
                          style={{
                            width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-brand-muted mt-1.5">
                        Dodajte još {formatPrice(freeShipLeft)} za besplatnu
                        dostavu.
                      </p>
                    </div>
                  )}
                  <div className="border-t border-slate-100 pt-3 flex justify-between items-baseline">
                    <span className="font-bold text-brand-dark">Ukupno</span>
                    <span className="text-2xl font-bold text-brand-primary">
                      {formatPrice(total)}
                    </span>
                  </div>
                  <p className="text-xs text-brand-muted">
                    Plaćanje: {paymentName}
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="mt-5 w-full py-4 bg-brand-primary hover:bg-brand-primary-hover text-white font-bold rounded-xl transition-all disabled:opacity-50 cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Slanje...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Završi porudžbinu
                    </>
                  )}
                </button>
                <p className="text-xs text-brand-muted text-center mt-3">
                  Klikom potvrđujete porudžbinu — javljamo se radi potvrde.
                </p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}
