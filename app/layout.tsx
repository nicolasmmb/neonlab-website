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
  title: 'neonlab - Modernizando ideias em experiências digitais',
  description: 'neonlab transforma suas ideias em experiências digitais modernas que cativam, engajam e convertem. Especialistas em desenvolvimento web, design de interfaces e soluções de alta performance para empresas que querem se destacar no digital.',
  keywords: [
    'neonlab',
    'neonlab.dev',
    'neonlab',
    'modernização digital',
    'criação de aplicativos',
    'experiências digitais',
    'transformação digital',
    'automação de processos',
    'tecnologia para empresas',
    'design e performance',
    'soluções sob medida',
    'consultoria tecnológica',
    // Desenvolvimento e stack
    'desenvolvimento web',
    'aplicativos web',
    'aplicativos mobile',
    'web apps',
    'Next.js',
    'React',
    'TypeScript',
    'Node.js',
    'JavaScript',
    'frontend',
    'backend',
    'fullstack',
    'API REST',
    'GraphQL',
    'integração de APIs',
    'microserviços',
    'DevOps',
    'CI/CD',
    'automação de deploy',
    'containers',
    'Docker',
    'Kubernetes',
    'N8N',
    'Python',
    'GoLang',
    // Banco de dados
    'banco de dados',
    'PostgreSQL',
    'MongoDB',
    'MySQL',
    'Firebase Realtime Database',
    'Firebase Firestore',
    'Redis',
    'database optimization',
    // Segurança
    'segurança web',
    'proteção de dados',
    'autenticação',
    'autorização',
    'OAuth',
    'JWT',
    // Infraestrutura e Cloud
    'cloud computing',
    'GCP',
    'Google Cloud Platform',
    'Firebase',
    'AWS',
    'Vercel',
    'edge functions',
    'serverless',
    // Performance e SEO
    'SEO',
    'otimização de performance',
    'Core Web Vitals',
    'acessibilidade web',
    'otimização de imagens',
    'melhorar ranking Google',
    // Design e UX/UI
    'UI/UX design',
    'design digital',
    'design system',
    'prototipagem',
    'experiência do usuário',
    'interface moderna'
  ],
  authors: [{ name: 'neonlab.dev' }],
  creator: 'neonlab.dev',
  publisher: 'neonlab.dev',

  metadataBase: new URL('https://neonlab.dev'),

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
    title: 'neonlab.dev - Transformando ideias em experiências digitais modernas',
    description: "A Neonlab.dev ajuda empresas a modernizar processos e criar experiências digitais únicas — com tecnologia, design e performance de ponta.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'neonlab.dev - Transformando ideias em experiências digitais modernas',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@neonlabdev', // se existir conta no X/Twitter
    creator: '@neonlabdev',
    title: 'Neonlab.dev - Transformando ideias em experiências digitais modernas',
    description: "A Neonlab.dev ajuda empresas a modernizar processos e criar experiências digitais únicas — com tecnologia, design e performance de ponta.",
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: [{ url: '/favicon.ico', type: 'image/x-icon' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [{ rel: 'mask-icon', url: '/favicon.svg', color: '#1C2130' }],
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
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://neonlab.dev',
  },
  category: 'Tecnologia e Desenvolvimento Web',
};

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
