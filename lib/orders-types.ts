export type SheetLineItem = {
  name: string
  unit: string
  qty: number
  price: number
}

export type ShopOrder = {
  orderNumber: string
  customerName: string
  phone: string
  email?: string
  address: string
  city: string
  zip: string
  deliveryName: string
  deliveryPrice: number
  paymentName: string
  items: SheetLineItem[]
  subtotal: number
  total: number
  hasApotekaItems: boolean
  note?: string
}

export type ShopInquiry = {
  customerName: string
  phone: string
  email?: string
  items: SheetLineItem[]
  note?: string
}

export const sumLines = (items: SheetLineItem[]) =>
  items.reduce((sum, i) => sum + i.price * i.qty, 0)

export const formatDin = (value: number) =>
  `${value.toLocaleString("sr-RS", { maximumFractionDigits: 0 })} RSD`