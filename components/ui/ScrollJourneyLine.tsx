'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const SECTIONS = ['#hero', '#projects', '#experience', '#learning', '#about', '#contact']

export default function ScrollJourneyLine() {
  const fillRef   = useRef<HTMLDivElement>(null)
  const dotRefs   = useRef<(HTMLDivElement | null)[]>([])
  const wrapRef   = useRef<HTMLDivElement>(null)
  const reduced   = useReducedMotion()

  useEffect(() => {
    const fill = fillRef.current
    const wrap = wrapRef.current
    if (!fill || !wrap || reduced) return

    // ── Direct scroll listener — reliable, zero overhead ────────────────
    const onScroll = () => {
      const scrolled = window.scrollY
      const total    = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? Math.min(scrolled / total, 1) : 0
      fill.style.transform = `scaleY(${progress})`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // set initial position

    // ── Section dot pulses ───────────────────────────────────────────────
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach((id, i) => {
      const el  = document.querySelector(id)
      const dot = dotRefs.current[i]
      if (!el || !dot) return

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            gsap.fromTo(
              dot,
              { scale: 1, backgroundColor: '#201e1d' },
              {
                scale: 2.4,
                backgroundColor: '#ec3013',
                duration: 0.3,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1,
                onComplete: () =>
                  gsap.set(dot, { scale: 1, backgroundColor: '#ec3013' }),
              },
            )
          }
        },
        { threshold: 0.25 },
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => {
      window.removeEventListener('scroll', onScroll)
      observers.forEach(o => o.disconnect())
    }
  }, [reduced])

  return (
    <div
      ref={wrapRef}
      className="fixed left-4 top-[72px] bottom-6 z-20 hidden lg:block pointer-events-none"
      aria-hidden="true"
    >
      {/* Rail track */}
      <div className="relative w-px h-full bg-ink/10 mx-auto">

        {/* Red fill — grows from top as you scroll */}
        <div
          ref={fillRef}
          className="absolute inset-x-0 top-0 h-full bg-red origin-top"
          style={{ transform: 'scaleY(0)', willChange: 'transform' }}
        />

        {/* Section dots at evenly spaced positions */}
        {SECTIONS.map((id, i) => (
          <div
            key={id}
            className="absolute left-1/2 -translate-x-1/2"
            style={{ top: `${(i / (SECTIONS.length - 1)) * 100}%` }}
          >
            <div
              ref={el => { dotRefs.current[i] = el }}
              className="w-[5px] h-[5px] rounded-full bg-ink/30"
              style={{ transform: 'translate(-50%, -50%)' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
