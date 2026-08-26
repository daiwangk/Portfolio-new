'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import CountUp from '@/components/ui/CountUp'
import { SKILLS } from '@/lib/data'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { target: 3,   decimals: 0, suffix: '+',  label: 'Internships' },
  { target: 8.0, decimals: 1, suffix: '',   label: 'CGPA / 10'   },
  { target: 18,  decimals: 0, prefix: 'AIR ', suffix: '', label: 'NCAT 2023' },
  { target: 6,   decimals: 0, suffix: '+',  label: 'AI projects' },
]

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const reveals = sectionRef.current?.querySelectorAll('[data-reveal]')
    reveals?.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        },
      )
    })
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="border-b-2 border-ink/15 grid grid-cols-1 lg:grid-cols-[5fr_7fr]"
    >
      {/* Left — About */}
      <div className="px-[clamp(24px,5vw,72px)] py-20 lg:border-r-2 border-ink/15">
        <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-red-700 block mb-5">
          About
        </span>

        <p
          data-reveal
          className="m-0 font-sans font-black text-[25px] leading-[1.3] tracking-[-0.01em]
                     opacity-0"
        >
          Every project is an opportunity to learn something real.
        </p>

        <p
          data-reveal
          className="mt-5 text-[15px] text-n800 leading-relaxed opacity-0"
        >
          B.Tech CS at Dronacharya College of Engineering, Gurugram — CGPA 8.0, graduating 2026.
          Three internships across AI/ML, frontend and computer vision. Flagship work: a Legal &amp;
          Financial Document Intelligence system on LangGraph + CRAG, live on Hugging Face.
        </p>

        {/* Stats */}
        <div
          data-reveal
          className="flex flex-wrap gap-x-10 gap-y-8 mt-10 pt-7 border-t-2 border-ink/15 opacity-0"
        >
          {STATS.map(({ target, decimals, prefix, suffix, label }) => (
            <div key={label} className="min-w-[80px]">
              <p className="font-sans font-black text-[44px] leading-none text-red m-0">
                <CountUp
                  target={target}
                  decimals={decimals}
                  prefix={prefix}
                  suffix={suffix}
                  duration={1600}
                />
              </p>
              <p className="font-mono text-[11px] tracking-[0.09em] uppercase text-n700 mt-2.5 m-0">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Right — Skills */}
      <div className="px-[clamp(24px,5vw,72px)] py-20">
        <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-red-700 block mb-5">
          Skills &amp; tools
        </span>

        <div className="flex flex-col">
          {SKILLS.map((skill) => (
            <div
              key={skill.category}
              data-reveal
              className="flex flex-col gap-1 sm:grid sm:gap-6 py-4 border-t-2 border-ink/15 items-baseline opacity-0"
              style={{ gridTemplateColumns: '140px 1fr' }}
            >
              <span className="font-sans font-bold text-[14.5px]">{skill.category}</span>
              <span className="font-mono text-[13px] text-n800 tracking-[0.02em] leading-relaxed">
                {skill.items}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
