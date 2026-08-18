'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const SECTION_LABELS = ['Hero', 'Projects', 'Experience', 'Learning', 'About', 'Contact']
const SECTION_IDS = ['#hero', '#projects', '#experience', '#learning', '#about', '#contact']

export default function SectionProgress() {
  const railRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const indexRef = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const fill = fillRef.current
    const label = labelRef.current
    const index = indexRef.current
    if (!fill || !label || !index) return

    // Animate fill with overall page scroll
    const scrollTrigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        gsap.set(fill, { scaleY: self.progress })
      },
    })

    // Update section label as sections enter viewport
    const cleanup: (() => void)[] = []
    SECTION_IDS.forEach((id, i) => {
      const el = document.querySelector(id)
      if (!el) return
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter: () => {
          if (label) label.textContent = SECTION_LABELS[i]
          if (index) index.textContent = `0${i + 1}`
        },
        onEnterBack: () => {
          if (label) label.textContent = SECTION_LABELS[i]
          if (index) index.textContent = `0${i + 1}`
        },
      })
      cleanup.push(() => st.kill())
    })

    return () => {
      scrollTrigger.kill()
      cleanup.forEach((fn) => fn())
    }
  }, [reduced])

  if (reduced) return null

  return (
    <div
      ref={railRef}
      className="fixed right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-3"
      aria-hidden="true"
    >
      {/* Section label */}
      <span
        ref={labelRef}
        className="font-mono text-[10px] tracking-[0.14em] uppercase text-n600 rotate-90 origin-center mb-2 whitespace-nowrap"
        style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
      >
        Hero
      </span>

      {/* Index */}
      <span
        ref={indexRef}
        className="font-mono text-[10px] tracking-[0.1em] text-n700"
      >
        01
      </span>

      {/* Rail */}
      <div className="relative w-px h-24 bg-ink/10">
        <div
          ref={fillRef}
          className="absolute top-0 left-0 w-full bg-red origin-top"
          style={{ height: '100%', transform: 'scaleY(0)' }}
        />
      </div>

      {/* Total */}
      <span className="font-mono text-[10px] tracking-[0.1em] text-ink/25">
        0{SECTION_LABELS.length}
      </span>
    </div>
  )
}
