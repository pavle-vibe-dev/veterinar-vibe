import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import { isPetShop } from "../../data/shop-info"

/**
 * "Naš asortiman" (/usluge) ne postoji za čiste pet-shop tenante.
 * Tri od četiri bloka na toj stranici su apotekarski (medicinska hrana,
 * zaštita od parazita, suplementi/vitamini). notFound() → pravi 404;
 * ruta je uklonjena i iz sitemap-a za te tenante.
 */
export default function UslugeLayout({ children }: { children: ReactNode }) {
  if (isPetShop) notFound()
  return <>{children}</>
}
