import type { MetadataRoute } from "next"
import { shopInfo } from "../data/shop-info"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${shopInfo.siteUrl}/sitemap.xml`,
    host: shopInfo.siteUrl
  }
}