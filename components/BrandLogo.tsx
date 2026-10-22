import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import { shopInfo } from "../data/shop-info"

type Props = {
  /** "light" = tamna pozadina (footer), "dark" = svetla pozadina (navbar) */
  variant?: "light" | "dark"
  className?: string
  /** "nav" = proporcionalno raste od mobilnog do desktopa; "footer" = fiksnо manje */
  size?: "nav" | "footer"
}

const sizeClasses = {
  nav: "h-8 sm:h-9 md:h-11 lg:h-12 w-auto max-w-[190px] md:max-w-[260px] lg:max-w-none",
  footer: "h-10 w-auto max-w-[220px]",
}

/**
 * Jedinstveni brend blok za Navbar i Footer.
 * Ako je shopInfo.logo popunjen, koristi sliku. Inace ikonica + naziv.
 * Menjaj logo u data/shop-info.ts (fajl ide u public/).
 */
export default function BrandLogo({
  variant = "dark",
  className = "",
  size = "nav",
}: Props) {
  const nameClass = variant === "light" ? "text-white" : "text-brand-dark"
  const iconClass = variant === "light" ? "text-brand-primary" : "text-brand-primary"

  if (shopInfo.logo) {
    // Na tamnoj pozadini (footer) koristi se svetla verzija ako postoji
    const src = variant === "light" && shopInfo.logoLight ? shopInfo.logoLight : shopInfo.logo
    return (
      <Image
        src={src}
        alt={shopInfo.name}
        width={220}
        height={48}
        // SVG je vektor — optimizer ga odbija bez dangerouslyAllowSVG, pa ide direktno
        unoptimized={src.endsWith(".svg")}
        className={`${sizeClasses[size]} object-contain ${className}`}
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
