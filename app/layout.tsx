import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'VetiCare | Vrhunska nega za vaše ljubimce',
    template: '%s | VetiCare'
  },
  description: 'Vodeća veterinarska klinika specijalizovana za hirurgiju, dijagnostiku i hitnu pomoć. Vaši ljubimci su kod nas u sigurnim rukama.',
  keywords: ['veterinar', 'veterinarska ambulanta', 'hitna pomoć za pse', 'lečenje mačaka', 'hirurgija ljubimaca'],
  openGraph: {
    title: 'VetiCare - Profesionalna veterinarska nega',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'VetiCare - Vrhunska veterinarska nega'
      }
    ],
    type: 'website'
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
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
