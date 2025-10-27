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
  title: 'Neonlab.dev - Modernização e Criação de Experiências Digitais para Empresas',
  description:
    'A Neonlab.dev ajuda empresas a modernizar processos e criar experiências digitais únicas — com tecnologia, design e performance de ponta.',
  keywords: [
    // Branding e serviços
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

  authors: [{ name: 'Neonlab.dev', url: 'https://neonlab.dev' }],
  creator: 'Neonlab.dev',
  publisher: 'Neonlab.dev',

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
    title: 'Neonlab.dev - Transformando ideias em experiências digitais modernas',
    description: "A Neonlab.dev ajuda empresas a modernizar processos e criar experiências digitais únicas — com tecnologia, design e performance de ponta.",
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Neonlab.dev - Experiências Digitais Modernas',
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
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
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
