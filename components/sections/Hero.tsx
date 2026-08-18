'use client'

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import SplitType from 'split-type'
import MagneticButton from '@/components/ui/MagneticButton'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()
  const mouseRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)
  const splitRef = useRef<SplitType | null>(null)

  // Track cursor for variable font proximity effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  // RAF loop: compute distance from cursor to each char, interpolate font-variation-settings
  const proximityLoop = useCallback(() => {
    if (!splitRef.current?.chars) return
    const { x, y } = mouseRef.current
    const MAX_DIST = 130

    splitRef.current.chars.forEach((char) => {
      const rect = char.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dist = Math.hypot(x - cx, y - cy)
      const t = Math.max(0, 1 - dist / MAX_DIST)

      // wght: 400 → 900, wdth: 100 → 120
      const wght = Math.round(400 + t * 500)
      const wdth = Math.round(100 + t * 20)
      ;(char as HTMLElement).style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}`
      ;(char as HTMLElement).style.color =
        t > 0.6 ? `rgba(236, 48, 19, ${(t - 0.6) / 0.4 * 0.85})` : ''
    })

    rafRef.current = requestAnimationFrame(proximityLoop)
  }, [])

  useEffect(() => {
    const heading = headingRef.current
    if (!heading) return

    // SplitType: split into chars + words for stagger + proximity
    const split = new SplitType(heading, { types: 'lines,words,chars' })
    splitRef.current = split

    if (reduced) {
      // No animation — reveal immediately
      return () => {
        split.revert()
      }
    }

    // Wrap each line in an overflow mask for the slide-up effect
    split.lines?.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'
      line.parentNode?.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    // Initial state: chars hidden below mask
    gsap.set(split.lines, { y: '110%' })

    // Stagger reveal on load
    const tl = gsap.timeline({ delay: 0.25 })
    tl.to(split.lines, {
      y: '0%',
      duration: 0.9,
      stagger: 0.1,
      ease: 'power4.out',
    })

    // Reveal sub-content after heading animates
    tl.fromTo(
      '[data-hero-reveal]',
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out' },
      '-=0.4',
    )

    // Start variable font proximity RAF
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(proximityLoop)

    return () => {
      split.revert()
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [reduced, handleMouseMove, proximityLoop])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center
                 px-[clamp(24px,5vw,72px)] pt-28 pb-20
                 border-b-2 border-ink/15"
    >
      {/* Ghost oversized background index */}
      <span
        aria-hidden="true"
        className="absolute right-[clamp(24px,5vw,72px)] top-24 font-sans font-black
                   text-[clamp(120px,14vw,200px)] leading-none text-ink/[0.03]
                   select-none pointer-events-none"
      >
        DK
      </span>

      {/* Kicker */}
      <span
        data-hero-reveal
        className="font-mono text-[12px] tracking-[0.1em] uppercase text-red-700 mb-6 opacity-0"
      >
        AI · Backend · Automation — Gurgaon, India
      </span>

      {/* Main headline — variable font proximity applied to each char */}
      <h1
        ref={headingRef}
        className="font-sans font-black leading-[1.06] tracking-[-0.025em] m-0
                   text-[clamp(52px,6.5vw,92px)] max-w-[14ch]"
        style={{ fontVariationSettings: "'wght' 800, 'wdth' 100" }}
      >
        Building AI systems that ship. <span className="text-red">Not just demos.</span>
      </h1>

      {/* Description */}
      <p
        data-hero-reveal
        className="mt-9 max-w-[52ch] text-[17px] text-n800 leading-relaxed opacity-0"
      >
        B.Tech Computer Science &apos;26, Dronacharya College of Engineering. I build corrective-RAG
        pipelines, conversational assistants and agentic workflows — and the FastAPI backends that
        keep them running in production.
      </p>

      {/* CTA row */}
      <div
        data-hero-reveal
        className="flex flex-wrap gap-3 mt-9 opacity-0"
      >
        <MagneticButton href="#projects" variant="primary">
          View projects →
        </MagneticButton>
        <MagneticButton href="mailto:daiwangk@gmail.com" variant="ghost">
          daiwangk@gmail.com
        </MagneticButton>
      </div>

      {/* Status row */}
      <div
        data-hero-reveal
        className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-12 pt-8 border-t-2 border-ink/15 opacity-0"
      >
        <span className="flex items-center gap-2.5">
          <span className="w-2.5 h-2.5 bg-red animate-blink rounded-none" />
          <span className="font-mono text-[12px] tracking-[0.06em] uppercase text-red-700 bg-red/10 px-2.5 py-1">
            Open to work — May 2026
          </span>
        </span>

        <span className="font-mono text-[12px] text-n700 tracking-[0.04em]">
          B.Tech CS · CGPA 8.0 · Class of 2026
        </span>

        <div className="ml-auto flex gap-5">
          {[
            { href: 'https://github.com/daiwangk', label: 'GitHub' },
            { href: 'https://linkedin.com/in/daiwang-khera-a66b5b25a', label: 'LinkedIn' },
            { href: 'mailto:daiwangk@gmail.com', label: 'Email' },
          ].map(({ href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-mono text-[12px] tracking-[0.06em] uppercase text-n600
                         hover:text-red transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
