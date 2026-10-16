import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import { isPetShop } from "../../data/shop-info"

/**
 * Blog ne postoji za čiste pet-shop tenante (businessType "pet-shop").
 * Sav blog sadržaj je veterinarko/apotekarski (zaštita od krpelja, medicinska
 * hrana, čuvanje preparata...) + "BG PET Tim" reference.
 * notFound() → pravi 404; ruta je uklonjena i iz sitemap-a za te tenante.
 */
export default function BlogLayout({ children }: { children: ReactNode }) {
  if (isPetShop) notFound()
  return <>{children}</>
}
