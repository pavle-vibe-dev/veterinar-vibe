import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "../components/cart/CartProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://veterinar-vibe.vercel.app'),
  title: {
    default: 'BG PET | Veterinarska apoteka i Pet Shop',
    template: '%s | BG PET'
  },
  description: 'Veterinarska apoteka i Pet Shop na Voždovcu. Medicinska hrana, zaštita od parazita, suplementi, vitamini, oprema i kozmetika za pse i mačke.',
  keywords: ['veterinarska apoteka', 'pet shop Beograd', 'hrana za pse', 'zaštita od krpelja', 'vitamini za ljubimce', 'BG PET', 'Voždovac'],
  openGraph: {
    title: 'BG PET - Veterinarska apoteka i Pet Shop',
    images: [
      {
        url: '/hero.jpg',
        width: 1200,
        height: 630,
        alt: 'BG PET - Veterinarska apoteka i Pet Shop'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BG PET - Veterinarska apoteka i Pet Shop',
    description: 'Veterinarska apoteka i Pet Shop na Voždovcu. Medicinska hrana, zaštita od parazita, suplementi, vitamini, oprema i kozmetika za pse i mačke.',
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
