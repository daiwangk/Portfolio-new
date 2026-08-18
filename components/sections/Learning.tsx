'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { LEARNING } from '@/lib/data'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const STATUS_COLORS: Record<string, string> = {
  Exploring: 'text-ink border-ink',
  Building: 'text-red border-red',
  Experimenting: 'text-n700 border-n700',
  New: 'text-red-700 border-red-700',
}

export default function Learning() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const cards = sectionRef.current?.querySelectorAll('[data-learn-card]')
    cards?.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 82%', once: true },
        },
      )
    })
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="learning"
      className="px-[clamp(24px,5vw,72px)] pt-20 pb-24 border-b-2 border-ink/15"
    >
      <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-red-700 block mb-8">
        Learning right now — in public
      </span>

      <div
        className="grid border-t-2 border-l-2 border-ink/15"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
      >
        {LEARNING.map((item) => (
          <div
            key={item.topic}
            data-learn-card
            className="border-r-2 border-b-2 border-ink/15 p-7 flex flex-col gap-3
                       hover:bg-n100 transition-colors duration-300"
          >
            <span
              className={`font-mono text-[10px] tracking-[0.08em] uppercase border px-2 py-0.5 self-start
                          ${STATUS_COLORS[item.status] ?? 'text-ink border-ink'}`}
            >
              {item.status}
            </span>
            <h3 className="font-sans font-black text-[18px] leading-[1.2] m-0 tracking-[-0.01em]">
              {item.topic}
            </h3>
            <p className="m-0 text-[13.5px] text-n700 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
