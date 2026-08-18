'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
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
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    ScrollTrigger.create({
      start: 80,
      onEnter: () => nav.classList.add('nav-scrolled'),
      onLeaveBack: () => nav.classList.remove('nav-scrolled'),
    })
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 inset-x-0 z-30 flex items-center gap-3 md:gap-5 bg-bg/90
                   px-[clamp(24px,5vw,72px)] py-4 border-b-2 border-transparent
                   transition-colors duration-300"
        style={{ backdropFilter: 'blur(8px)' }}
      >
        <Link
          href="/"
          className="font-sans font-black text-[17px] tracking-tight text-ink mr-auto
                     hover:text-red transition-colors duration-200"
        >
          Daiwang Khera
        </Link>

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

        <AudioToggle />

        <MagneticButton
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          className="hidden sm:inline-flex text-[13px] py-2.5 px-4"
        >
          Resume ↓
        </MagneticButton>

        <button
          type="button"
          className="md:hidden font-mono text-[11px] tracking-[0.08em] uppercase
                     border-2 border-ink px-3 py-2 text-ink"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-20 md:hidden bg-bg pt-[72px] px-[clamp(24px,5vw,72px)] pb-8"
        >
          <div className="flex flex-col gap-1 border-t-2 border-ink/15 pt-6">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                className="font-sans font-black text-[28px] tracking-tight text-ink py-3
                           border-b border-ink/10 hover:text-red transition-colors"
              >
                {label}
              </a>
            ))}
            <MagneticButton
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              className="mt-6 w-fit text-[13px]"
              onClick={closeMenu}
            >
              Resume ↓
            </MagneticButton>
          </div>
        </div>
      )}
    </>
  )
}
