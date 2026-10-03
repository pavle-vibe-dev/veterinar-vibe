import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import { shopInfo } from "../data/shop-info"

type Props = {
  /** "light" = tamna pozadina (footer), "dark" = svetla pozadina (navbar) */
  variant?: "light" | "dark"
  className?: string
}

/**
 * Jedinstveni brend blok za Navbar i Footer.
 * Ako je shopInfo.logo popunjen, koristi sliku. Inace ikonica + naziv.
 * Menjaj logo u data/shop-info.ts (fajl ide u public/).
 */
export default function BrandLogo({ variant = "dark", className = "" }: Props) {
  const nameClass = variant === "light" ? "text-white" : "text-brand-dark"
  const iconClass = variant === "light" ? "text-brand-primary" : "text-brand-primary"

  if (shopInfo.logo) {
    return (
      <Image
        src={shopInfo.logo}
        alt={shopInfo.name}
        width={200}
        height={40}
        className={`h-9 w-auto max-w-[180px] object-contain ${className}`}
        priority
      />
    )
  }

  return (
    <span className={`flex items-center space-x-2 ${className}`}>
      <ShoppingBag className={`w-8 h-8 ${iconClass}`} />
      <span className={`text-xl font-bold ${nameClass}`}>{shopInfo.name}</span>
    </span>
  )
}
