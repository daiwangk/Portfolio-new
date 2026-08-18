'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import MagneticButton from '@/components/ui/MagneticButton'

export default function NotFound() {
  const numRef = useRef<HTMLSpanElement>(null)
  const reduced = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  useEffect(() => {
    const num = numRef.current
    if (!num || reduced) return

    // Initial entrance
    gsap.fromTo(num,
      { opacity: 0, y: 40, fontVariationSettings: "'wght' 100, 'wdth' 75" },
      { opacity: 1, y: 0, fontVariationSettings: "'wght' 900, 'wdth' 120",
        duration: 1.1, ease: 'power4.out', delay: 0.15 }
    )

    // Repeating glitch — rapid weight snap every few seconds
    const glitch = gsap.timeline({ repeat: -1, repeatDelay: 3, delay: 1.6 })
    glitch
      .to(num, { fontVariationSettings: "'wght' 100, 'wdth' 75", duration: 0.06, ease: 'none' })
      .to(num, { fontVariationSettings: "'wght' 900, 'wdth' 120", duration: 0.06, ease: 'none' })
      .to(num, { fontVariationSettings: "'wght' 300, 'wdth' 90", duration: 0.04, ease: 'none' })
      .to(num, { fontVariationSettings: "'wght' 900, 'wdth' 120", duration: 0.08, ease: 'none' })

    return () => { glitch.kill() }
  }, [reduced])

  return (
    <main className="min-h-screen bg-bg flex flex-col items-center justify-center
                     px-[clamp(24px,5vw,72px)] relative overflow-hidden">

      {/* Ghost background number */}
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center
                   font-sans font-black text-ink/[0.03] select-none pointer-events-none
                   leading-none"
        style={{ fontSize: 'clamp(280px, 45vw, 600px)' }}
      >
        404
      </span>

      {/* Main 404 — variable font glitch */}
      <span
        ref={numRef}
        className="font-sans font-black leading-none text-ink select-none relative z-10"
        style={{
          fontSize: 'clamp(120px, 20vw, 220px)',
          letterSpacing: '-0.04em',
          fontVariationSettings: "'wght' 900, 'wdth' 120",
          opacity: 0,
        }}
        aria-hidden="true"
      >
        404
      </span>

      {/* Label */}
      <div className="relative z-10 text-center mt-8">
        <p className="font-mono text-[12px] tracking-[0.12em] uppercase text-n600 mb-2">
          Page not found
        </p>
        <p className="text-[16px] text-n800 max-w-[42ch] leading-relaxed">
          This URL doesn&apos;t exist. You probably followed a broken link
          or typed something wrong.
        </p>
      </div>

      {/* CTA */}
      <div className="relative z-10 flex gap-3 mt-10">
        <MagneticButton href="/" variant="primary">
          ← Back to portfolio
        </MagneticButton>
        <MagneticButton href="/#contact" variant="ghost">
          Get in touch
        </MagneticButton>
      </div>

      {/* Bottom label */}
      <span className="absolute bottom-6 left-[clamp(24px,5vw,72px)]
                       font-mono text-[11px] tracking-[0.08em] uppercase text-n600">
        Daiwang Khera — Portfolio 2026
      </span>
      <span className="absolute bottom-6 right-[clamp(24px,5vw,72px)]
                       font-mono text-[11px] tracking-[0.08em] uppercase text-n600">
        Error 404
      </span>
    </main>
  )
}
