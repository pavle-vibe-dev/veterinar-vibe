import { shopInfo } from "../data/shop-info"

type ParamValue = string | number | boolean | undefined | null | ParamValue[]
type Params = Record<string, ParamValue | Record<string, ParamValue> | unknown[]>

declare global {
  interface Window {
    gtag?: (command: string, event: string, params?: Params) => void
    fbq?: (
      command: string,
      event: string,
      params?: Params
    ) => void
  }
}

const pageView = (path: string) => {
  if (shopInfo.gaId && window.gtag) {
    window.gtag("event", "page_view", { page_path: path })
  }
}

export const trackPageView = (path: string) => pageView(path)

/** Proizvod dodat u korpu */
export const trackAddToCart = (name: string, price: number, qty: number) => {
  if (shopInfo.gaId && window.gtag) {
    window.gtag("event", "add_to_cart", {
      currency: "RSD",
      value: price * qty,
      items: [{ item_name: name, price, quantity: qty }]
    })
  }
  if (shopInfo.metaPixelId && window.fbq) {
    window.fbq("track", "AddToCart", {
      content_name: name,
      content_type: "product",
      value: price * qty,
      currency: "RSD"
    })
  }
}

/** Porudžbina uspešno poslata */
export const trackOrder = (orderNumber: string, total: number, itemCount: number) => {
  if (shopInfo.gaId && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: orderNumber,
      currency: "RSD",
      value: total,
      items_count: itemCount
    })
  }
  if (shopInfo.metaPixelId && window.fbq) {
    window.fbq("track", "Purchase", {
      content_ids: [orderNumber],
      content_type: "product",
      value: total,
      currency: "RSD",
      num_contents: itemCount
    })
  }
}

/** Poslat upit (kontakt / /upit bez porudžbine) */
export const trackInquiry = () => {
  if (shopInfo.gaId && window.gtag) {
    window.gtag("event", "generate_lead", { currency: "RSD", value: 0 })
  }
  if (shopInfo.metaPixelId && window.fbq) {
    window.fbq("track", "Lead")
  }
}