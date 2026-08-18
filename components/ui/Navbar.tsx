'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import MagneticButton from '@/components/ui/MagneticButton'

const AudioToggle = dynamic(() => import('@/components/ui/AudioToggle'), {
  ssr: false,
  loading: () => (
    <span className="font-mono text-[11px] text-n600 border border-ink/20 px-2 py-1">SND</span>
  ),
})

gsap.registerPlugin(ScrollTrigger)

const NAV_LINKS = [
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#learning', label: 'Learning' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    ScrollTrigger.create({
      start: 80,
      onEnter: () => nav.classList.add('nav-scrolled'),
      onLeaveBack: () => nav.classList.remove('nav-scrolled'),
    })
  }, [])

  return (
    <nav
      ref={navRef}
      className="fixed top-0 inset-x-0 z-30 flex items-center gap-5 bg-bg/90
                 px-[clamp(24px,5vw,72px)] py-4 border-b-2 border-transparent
                 transition-colors duration-300"
      style={{ backdropFilter: 'blur(8px)' }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-sans font-black text-[17px] tracking-tight text-ink mr-auto
                   hover:text-red transition-colors duration-200"
      >
        Daiwang Khera
      </Link>

      {/* Nav links — hidden on mobile */}
      <div className="hidden md:flex items-center gap-7">
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="font-mono text-[12px] tracking-[0.08em] uppercase text-ink
                       hover:text-red transition-colors duration-200"
          >
            {label}
          </a>
        ))}
      </div>

      {/* ⌘K trigger */}
      <button
        onClick={() => window.dispatchEvent(new CustomEvent('open-cmdpalette'))}
        className="hidden md:flex items-center gap-1.5 font-mono text-[11px] tracking-[0.07em]
                   text-n600 border border-ink/20 px-2.5 py-1.5 hover:border-ink/50
                   hover:text-ink transition-colors duration-200 select-none"
        title="Open command palette (Ctrl+K)"
        aria-label="Open command palette"
      >
        <span>⌘K</span>
      </button>

      {/* Audio toggle */}
      <AudioToggle />

      {/* Resume CTA */}
      <MagneticButton
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        variant="primary"
        className="text-[13px] py-2.5 px-4"
      >
        Resume ↓
      </MagneticButton>
    </nav>
  )
}
