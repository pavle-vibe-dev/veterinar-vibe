import type { MetadataRoute } from "next"
import { products } from "../data/shop"
import { shopInfo } from "../data/shop-info"

export const revalidate = 86400

export default function sitemap(): MetadataRoute.Sitemap {
  const base = shopInfo.siteUrl
  const now = new Date()

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/prodavnica", priority: 0.9 },
    { path: "/upit", priority: 0.8 },
    { path: "/kontakt", priority: 0.7 },
    { path: "/blog", priority: 0.6 },
    { path: "/usluge", priority: 0.5 }
  ].map((r) => ({
    url: `${base}${r.path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: r.priority
  }))

  const productRoutes = products.map((p) => ({
    url: `${base}/prodavnica/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8
  }))

  return [...staticRoutes, ...productRoutes]
}