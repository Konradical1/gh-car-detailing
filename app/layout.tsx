import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/react"
import './globals.css'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import StatsTracker from "@/components/StatsTracker"

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const milner = localFont({
  src: "../public/fonts/Galderglynn Titling Bd.otf",
  variable: "--font-milner",
  display: 'swap',
})

const sprintura = localFont({
  src: "../public/fonts/Milker.otf",
  variable: "--font-sprintura",
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'GH Car Detailing | Premium Auto Detailing Services',
  description: 'Premium auto detailing services for discerning clients. Expert car care, interior & exterior detailing. Serving Cincinnati area. Call 513-448-9413 for appointments.',
  keywords: 'car detailing, auto detailing, premium car care, Cincinnati car detailing, mobile detailing, interior detailing, exterior detailing',
  authors: [{ name: 'GH Car Detailing' }],
  creator: 'GH Car Detailing',
  publisher: 'GH Car Detailing',
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    title: 'GH Car Detailing | Premium Auto Detailing Services',
    description: 'Premium auto detailing services for discerning clients. Expert car care, interior & exterior detailing. Serving Cincinnati area.',
    url: 'https://ghcardetailing.com',
    siteName: 'GH Car Detailing',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GH Car Detailing | Premium Auto Detailing Services',
    description: 'Premium auto detailing services for discerning clients. Expert car care, interior & exterior detailing.',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-384x384.png', sizes: '384x384', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    google: 'your-google-site-verification', // You'll need to add your Google Search Console verification code here
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#ffffff',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${milner.variable} ${sprintura.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className={inter.className} style={{ backgroundColor: '#ffffff', color: '#000000', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <StatsTracker />
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  )
}



import './globals.css'