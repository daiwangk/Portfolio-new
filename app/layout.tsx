import type { Metadata } from 'next'
import { Archivo, JetBrains_Mono } from 'next/font/google'
import LenisProvider from '@/components/providers/LenisProvider'
import ClientOverlays from '@/components/ClientOverlays'
import './globals.css'

// Archivo Variable — all wght + wdth axes for variable font proximity effect
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
  display: 'swap',
})

// JetBrains Mono — meta text, dates, stack tags, indices
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://daiwang-khera.vercel.app'),
  title: {
    default: 'Daiwang Khera — AI / ML Engineer',
    template: '%s | Daiwang Khera',
  },
  description:
    'Portfolio of Daiwang Khera — B.Tech CS 2026, building corrective-RAG pipelines, conversational assistants and agentic workflows with LangGraph, FastAPI, ChromaDB and Groq.',
  keywords: [
    'Daiwang Khera', 'AI engineer', 'ML engineer', 'backend developer',
    'FastAPI', 'LangGraph', 'RAG', 'CRAG', 'LLM', 'Python', 'portfolio',
    'Gurgaon', 'India',
  ],
  authors: [{ name: 'Daiwang Khera', url: 'https://github.com/daiwangk' }],
  creator: 'Daiwang Khera',
  alternates: {
    canonical: 'https://daiwang-khera.vercel.app',
  },
  openGraph: {
    title: 'Daiwang Khera — AI / ML Engineer',
    description:
      'Building corrective-RAG pipelines, conversational assistants, and agentic workflows. B.Tech CS 2026.',
    url: 'https://daiwang-khera.vercel.app',
    siteName: 'Daiwang Khera Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Daiwang Khera — AI / ML Engineer',
    description: 'Building corrective-RAG pipelines, conversational assistants, and agentic workflows.',
    creator: '@daiwangk',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Daiwang Khera',
    url: 'https://daiwang-khera.vercel.app',
    image: 'https://daiwang-khera.vercel.app/opengraph-image',
    sameAs: [
      'https://github.com/daiwangk',
      'https://linkedin.com/in/daiwang-khera-a66b5b25a',
    ],
    jobTitle: 'AI / ML Engineer',
    description:
      'B.Tech CS 2026 building corrective-RAG pipelines, conversational assistants, and agentic workflows with LangGraph, FastAPI, ChromaDB and Groq.',
    knowsAbout: [
      'Machine Learning', 'Retrieval-Augmented Generation', 'LangGraph',
      'FastAPI', 'Python', 'ChromaDB', 'Conversational AI',
    ],
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Dronacharya College of Engineering',
      address: { '@type': 'PostalAddress', addressLocality: 'Gurugram', addressCountry: 'IN' },
    },
  }

  return (
    <html lang="en" className={`${archivo.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <LenisProvider>
          {/* Client-only overlays */}
          <ClientOverlays />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
