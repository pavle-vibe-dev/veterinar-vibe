export interface DeliveryMethod {
  slug: string
  name: string
  desc: string
  price: number // RSD
}

export interface PaymentMethod {
  slug: string
  name: string
  desc: string
  // koje dostave dozvoljavaju ovo plaćanje
  allowedDelivery: string[]
}

export const FREE_DELIVERY_THRESHOLD = 5000

export const deliveryMethods: DeliveryMethod[] = [
  {
    slug: "preuzimanje",
    name: "Lično preuzimanje",
    desc: "BG PET, Vojvode Stepe 189 — besplatno",
    price: 0,
  },
  {
    slug: "beograd",
    name: "Dostava Beograd",
    desc: "1–2 radna dana — besplatno preko 5.000 RSD",
    price: 350,
  },
  {
    slug: "srbija",
    name: "Dostava Srbija",
    desc: "2–4 radna dana — besplatno preko 5.000 RSD",
    price: 490,
  },
]

export const paymentMethods: PaymentMethod[] = [
  {
    slug: "pouzecem",
    name: "Pouzećem",
    desc: "Plaćate kuriru gotovinom pri prijemu",
    allowedDelivery: ["beograd", "srbija"],
  },
  {
    slug: "virman",
    name: "Virman (uplata na račun)",
    desc: "Uputstvo za uplatu dobijate nakon porudžbine",
    allowedDelivery: ["preuzimanje", "beograd", "srbija"],
  },
  {
    slug: "licno",
    name: "Plaćanje u apoteci",
    desc: "Karticom ili gotovinom pri preuzimanju",
    allowedDelivery: ["preuzimanje"],
  },
]

// Demo račun za virman — zameniti pravim pre produkcije
export const DEMO_BANK_ACCOUNT = "160-0000000000000-00"

export function deliveryPrice(deliverySlug: string, subtotal: number) {
  if (deliverySlug === "preuzimanje") return 0
  if (subtotal >= FREE_DELIVERY_THRESHOLD) return 0
  return (
    deliveryMethods.find((d) => d.slug === deliverySlug)?.price ?? 0
  )
}

export function makeOrderNumber() {
  const year = new Date().getFullYear()
  const rand = Math.floor(1000 + Math.random() * 9000)
  return `BG-${year}-${rand}`
}

export interface SavedOrder {
  number: string
  date: string
  total: number
  itemCount: number
  payment: string
  delivery: string
}

const HISTORY_KEY = "bgpet-orders-v1"

export function loadOrderHistory(): SavedOrder[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveOrderToHistory(order: SavedOrder) {
  try {
    const prev = loadOrderHistory()
    localStorage.setItem(HISTORY_KEY, JSON.stringify([order, ...prev].slice(0, 20)))
  } catch {
    // ignore
  }
}
