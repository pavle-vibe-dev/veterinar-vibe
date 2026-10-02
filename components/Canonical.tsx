import { shopInfo } from "../data/shop-info"

/**
 * Canonical URL za client komponente koje ne mogu da export-uju metadata.
 * React podiže <link> u <head>, pa radi bez refaktora stranice.
 */
export default function Canonical({ path }: { path: string }) {
  const href = `${shopInfo.siteUrl}${path === "/" ? "" : path}`
  return <link rel="canonical" href={href} />
}