import { shopInfo } from "../data/shop-info"

export default function StructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "VeterinaryCare",
    "@id": `${shopInfo.siteUrl}/#apoteka`,
    name: shopInfo.name,
    legalName: shopInfo.legalName,
    description: shopInfo.description,
    url: shopInfo.siteUrl,
    telephone: shopInfo.phoneHref.replace("tel:", ""),
    email: shopInfo.email,
    priceRange: "$$",
    currenciesAccepted: "RSD",
    address: {
      "@type": "PostalAddress",
      streetAddress: shopInfo.street,
      postalCode: shopInfo.zip,
      addressLocality: shopInfo.city,
      addressCountry: "RS"
    },
    openingHoursSpecification: shopInfo.openingHours
      .filter((h) => !h.closed)
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days.includes("-")
          ? h.days
              .split("-")
              .map((d) => `https://schema.org/${dayName(d)}`)
          : `https://schema.org/${dayName(h.days)}`,
        opens: h.opens,
        closes: h.closes
      })),
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${shopInfo.siteUrl}/upit`
      },
      deliveryMethod: [
        "https://schema.org/PickupInStore",
        "https://schema.org/OnSitePickup",
        "https://schema.org/Delivery"
      ]
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

const dayName = (code: string) =>
  ({ Mo: "Monday", Tu: "Tuesday", We: "Wednesday", Th: "Thursday",
     Fr: "Friday", Sa: "Saturday", Su: "Sunday" })[code] ?? code