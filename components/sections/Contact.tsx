'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import MagneticButton from '@/components/ui/MagneticButton'
import Reveal from '@/components/ui/Reveal'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const CONTACT_LINKS = [
  { href: 'mailto:daiwangk@gmail.com', label: 'daiwangk@gmail.com' },
  { href: 'https://github.com/daiwangk', label: 'GitHub', external: true },
  { href: 'https://linkedin.com/in/daiwang-khera-a66b5b25a', label: 'LinkedIn', external: true },
  { href: 'tel:+919205331936', label: '+91 92053 31936' },
]

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return
    const section = sectionRef.current
    const heading = headingRef.current
    if (!section || !heading) return

    const lines = heading.querySelectorAll('[data-line]')

    // Clip-path reveal for each heading line with stagger
    gsap.fromTo(
      lines,
      { clipPath: 'inset(0 0 100% 0)', y: 24 },
      {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        duration: 0.88,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: { trigger: section, start: 'top 72%', once: true },
      },
    )

    gsap.fromTo(
      '[data-contact-reveal]',
      { clipPath: 'inset(0 0 100% 0)', y: 16 },
      {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        duration: 0.65,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: section, start: 'top 65%', once: true },
      },
    )
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-red px-[clamp(24px,5vw,72px)] pt-24 pb-24"
    >
      <div ref={headingRef}>
        <h2
          className="font-sans font-black text-bg leading-[1.06] tracking-[-0.018em] m-0
                     text-[clamp(40px,5vw,64px)]"
        >
          <span data-line className="block" style={{ clipPath: 'inset(0 0 100% 0)' }}>
            Open to work from May 2026.
          </span>
          <span data-line className="block" style={{ clipPath: 'inset(0 0 100% 0)' }}>
            Let&apos;s build something that ships.
          </span>
        </h2>
      </div>

      <div
        data-contact-reveal
        className="flex flex-wrap gap-3 mt-11"
        style={{ clipPath: 'inset(0 0 100% 0)' }}
      >
        {CONTACT_LINKS.map(({ href, label, external }) => (
          <MagneticButton
            key={label}
            href={href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            variant="ghost-on-red"
          >
            {label}
          </MagneticButton>
        ))}
      </div>

      <p
        data-contact-reveal
        className="font-mono text-[12px] tracking-[0.07em] uppercase text-bg/70 mt-9 m-0"
        style={{ clipPath: 'inset(0 0 100% 0)' }}
      >
        Based in Gurgaon, India · Open to remote
      </p>
    </section>
  )
}
