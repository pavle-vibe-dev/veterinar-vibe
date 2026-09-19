"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { getProduct } from "../../data/shop"

export interface QuoteItem {
  slug: string
  qty: number
}

interface CartContextValue {
  items: QuoteItem[]
  count: number
  total: number
  add: (slug: string, qty?: number) => void
  remove: (slug: string) => void
  setQty: (slug: string, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = "bgpet-quote-v1"

function loadInitial(): QuoteItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter(
        (x): x is QuoteItem =>
          typeof x?.slug === "string" && typeof x?.qty === "number"
      )
      .map((x) => ({ slug: x.slug, qty: Math.min(99, Math.max(1, x.qty)) }))
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteItem[]>([])

  useEffect(() => {
    setItems(loadInitial())
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // ignore quota errors
    }
  }, [items])

  const add = useCallback((slug: string, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === slug)
      if (found) {
        return prev.map((i) =>
          i.slug === slug ? { ...i, qty: Math.min(99, i.qty + qty) } : i
        )
      }
      return [...prev, { slug, qty: Math.min(99, Math.max(1, qty)) }]
    })
  }, [])

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug))
  }, [])

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) =>
            i.slug === slug
              ? { ...i, qty: Math.min(99, Math.max(1, qty)) }
              : i
          )
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const { count, total } = useMemo(() => {
    let c = 0
    let t = 0
    for (const i of items) {
      c += i.qty
      const p = getProduct(i.slug)
      if (p) t += p.price * i.qty
    }
    return { count: c, total: t }
  }, [items])

  const value = useMemo(
    () => ({ items, count, total, add, remove, setQty, clear }),
    [items, count, total, add, remove, setQty, clear]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart mora biti unutar <CartProvider>")
  return ctx
}
