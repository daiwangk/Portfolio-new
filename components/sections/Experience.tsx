'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Reveal from '@/components/ui/Reveal'
import { EXPERIENCE } from '@/lib/data'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const rows = sectionRef.current?.querySelectorAll('[data-exp-row]')
    rows?.forEach((row, i) => {
      gsap.fromTo(
        row,
        { clipPath: 'inset(0 0 100% 0)', y: 16 },
        {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          duration: 0.78,
          delay: i * 0.07,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 85%', once: true },
        },
      )
    })
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="px-[clamp(24px,5vw,72px)] py-20 border-b-2 border-ink/15"
    >
      {/* Header */}
      <Reveal mode="rise" className="mb-10 inline-block">
        <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-red-700 block">
          Work experience
        </span>
      </Reveal>

      {EXPERIENCE.map((exp) => (
        <div
          key={exp.title}
          data-exp-row
          data-skew
          className="grid gap-x-12 gap-y-3 py-8 border-b-2 border-ink/15 last:border-b-0
                     hover:bg-n100 transition-colors duration-300"
          style={{
            gridTemplateColumns: 'clamp(140px,16vw,200px) minmax(0,320px) minmax(0,1fr)',
            clipPath: 'inset(0 0 100% 0)',
          }}
        >
          {/* Period */}
          <span className="font-mono text-[12px] text-n600 tracking-[0.04em] pt-1">
            {exp.period}
          </span>

          {/* Title + company */}
          <div className="flex flex-col gap-2">
            <h3 className="font-sans font-black text-[20px] leading-[1.2] m-0 tracking-[-0.01em]">
              {exp.title}
            </h3>
            <span className="font-mono text-[12px] text-n700 tracking-[0.04em]">
              {exp.company}
            </span>
          </div>

          {/* Bullets */}
          <ul className="m-0 pl-4 flex flex-col gap-2 text-[14.5px] text-n800 max-w-[60ch] leading-relaxed">
            {exp.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  )
}
