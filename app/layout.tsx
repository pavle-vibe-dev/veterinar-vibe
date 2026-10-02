import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Analytics from "../components/Analytics";
import StructuredData from "../components/StructuredData";
import { CartProvider } from "../components/cart/CartProvider";
import { shopInfo } from "../data/shop-info";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(shopInfo.siteUrl),
  title: {
    default: `${shopInfo.name} | ${shopInfo.tagline}`,
    template: `%s | ${shopInfo.name}`
  },
  description: `${shopInfo.tagline} na ${shopInfo.district}u. Medicinska hrana, zaštita od parazita, suplementi, vitamini, oprema i kozmetika za pse i mačke.`,
  keywords: ['veterinarska apoteka', 'pet shop Beograd', 'hrana za pse', 'zaštita od krpelja', 'vitamini za ljubimce', shopInfo.name, shopInfo.district],
  openGraph: {
    title: `${shopInfo.name} - ${shopInfo.tagline}`,
    images: [
      {
        url: '/hero.jpg',
        width: 1200,
        height: 630,
        alt: `${shopInfo.name} - ${shopInfo.tagline}`
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: `${shopInfo.name} - ${shopInfo.tagline}`,
    description: `${shopInfo.tagline} na ${shopInfo.district}u. Medicinska hrana, zaštita od parazita, suplementi, vitamini, oprema i kozmetika za pse i mačke.`,
    images: ['/hero.jpg']
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <CartProvider>
          <Analytics />
          <StructuredData />
          <Navbar />
          <main className="w-full max-w-full overflow-x-hidden min-h-screen relative block pt-16">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
