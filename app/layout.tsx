import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  title: 'Neonlab.dev - Experiências Digitais com Tecnologia, Design e Performance',
  description: 'Combinamos tecnologia, design e performance para criar experiências digitais modernas que cativam e convertem.',
  keywords: ['desenvolvimento web', 'design digital', 'performance', 'react', 'nextjs', 'web development'],
  authors: [{ name: 'Neonlab.dev' }],
  creator: 'Neonlab.dev',
  publisher: 'Neonlab.dev',
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://neonlab.dev',
    siteName: 'Neonlab.dev',
    title: 'Neonlab.dev - Experiências Digitais Modernas',
    description: 'Criamos experiências digitais que cativam e convertem',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Neonlab.dev',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neonlab.dev - Experiências Digitais Modernas',
    description: 'Criamos experiências digitais que cativam e convertem',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Neonlab.dev',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
