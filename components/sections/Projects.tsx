'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { PROJECTS } from '@/lib/data'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// SVG filter for fluid hover distortion — defined once, referenced by CSS
function DistortionFilter() {
  return (
    <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0 }}>
      <defs>
        <filter id="proj-distort" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            id="proj-turbulence"
            type="fractalNoise"
            baseFrequency="0 0"
            numOctaves="3"
            seed="2"
            result="noise"
          />
          <feDisplacementMap
            id="proj-displace"
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const router = useRouter()

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const cards = [...section.querySelectorAll<HTMLElement>('[data-project-card]')]

    if (!reduced) {
      // ── Sticky Stacking Depth Accordion ──────────────────────────────
      // Each card pins at top:80px when it reaches that position.
      // While pinned, the *next* card slides over it and the pinned card
      // progressively scales down (0.94) + dims (brightness 0.72) + blurs.
      cards.forEach((card, i) => {
        const isLast = i === cards.length - 1

        // Scroll reveal — only for cards that aren't being pinned yet
        gsap.fromTo(
          card,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
          },
        )

        if (!isLast) {
          const nextCard = cards[i + 1]

          ScrollTrigger.create({
            trigger: card,
            start: 'top 80px',
            endTrigger: nextCard,
            end: 'top 80px',
            pin: true,
            pinSpacing: false,
            onUpdate: (self) => {
              // Progress 0 → 1 as next card slides over this one
              const p = self.progress
              gsap.set(card.querySelector('[data-card-inner]'), {
                scale: 1 - p * 0.058,
                filter: `brightness(${1 - p * 0.3}) blur(${p * 3}px)`,
                transformOrigin: 'top center',
                force3D: true,
              })
            },
            onLeaveBack: () => {
              // Reset when scrolling back up past the pin start
              gsap.set(card.querySelector('[data-card-inner]'), {
                scale: 1,
                filter: 'brightness(1) blur(0px)',
              })
            },
          })
        }
      })

      // ── Traveling red dot ──────────────────────────────────────────────
      const dots = section.querySelectorAll<HTMLElement>('[data-dot]')
      let dotRaf: number
      const onDotScroll = () => {
        cancelAnimationFrame(dotRaf)
        dotRaf = requestAnimationFrame(() => {
          const mid = window.innerHeight / 2
          let best: Element | null = null
          let bestD = Infinity
          dots.forEach((d) => {
            const r = d.getBoundingClientRect()
            const dist = Math.abs(r.top + r.height / 2 - mid)
            if (dist < bestD) { bestD = dist; best = d }
          })
          dots.forEach((d) => {
            const active = d === best && bestD < window.innerHeight * 0.5
            gsap.to(d, {
              scale: active ? 2.2 : 1,
              rotate: active ? 45 : 0,
              duration: 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
            })
          })
        })
      }
      window.addEventListener('scroll', onDotScroll, { passive: true })
      onDotScroll()

      // ── SVG hover distortion ───────────────────────────────────────────
      const cleanup: (() => void)[] = []
      cards.forEach((card) => {
        const turbulence = document.getElementById('proj-turbulence')
        const displace = document.getElementById('proj-displace')
        const accent = card.querySelector<HTMLElement>('[data-accent]')
        if (!turbulence || !displace || !accent) return

        const enter = () => {
          gsap.to(turbulence, { attr: { baseFrequency: '0.04 0.06' }, duration: 0.5, ease: 'power2.out' })
          gsap.to(displace, { attr: { scale: 22 }, duration: 0.5, ease: 'power2.out' })
        }
        const leave = () => {
          gsap.to(turbulence, { attr: { baseFrequency: '0 0' }, duration: 0.85, ease: 'elastic.out(1, 0.5)' })
          gsap.to(displace, { attr: { scale: 0 }, duration: 0.85, ease: 'elastic.out(1, 0.5)' })
        }
        card.addEventListener('pointerenter', enter)
        card.addEventListener('pointerleave', leave)
        cleanup.push(() => {
          card.removeEventListener('pointerenter', enter)
          card.removeEventListener('pointerleave', leave)
        })
      })

      return () => {
        window.removeEventListener('scroll', onDotScroll)
        cancelAnimationFrame(dotRaf)
        cleanup.forEach((fn) => fn())
        ScrollTrigger.getAll().forEach((st) => {
          if (st.vars.trigger && cards.includes(st.vars.trigger as HTMLElement)) {
            st.kill()
          }
        })
      }
    }
  }, [reduced])

  const handleCaseStudy = (path: string) => {
    if ('startViewTransition' in document) {
      ;(document as unknown as { startViewTransition: (cb: () => void) => void }).startViewTransition(
        () => router.push(path),
      )
    } else {
      router.push(path)
    }
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="px-[clamp(24px,5vw,72px)] pt-20 pb-4 border-b-2 border-ink/15"
    >
      <DistortionFilter />

      {/* Section header */}
      <div className="flex items-baseline gap-6 mb-4">
        <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-red-700">
          Selected projects
        </span>
        <span className="font-mono text-[11px] text-n600 tracking-[0.06em]">
          — things built while learning
        </span>
      </div>

      {PROJECTS.map((project) => (
        // Outer wrapper: full-width bg for the pin (hides underlying cards)
        <div
          key={project.num}
          data-project-card
          className="bg-bg"
        >
          {/* Inner: the content that scales/dims during stacking */}
          <div
            data-card-inner
            data-skew
            className="relative grid gap-x-12 gap-y-3 py-9 border-b-2 border-ink/15
                       hover:bg-n100 transition-colors duration-300 cursor-default
                       group"
            style={{
              gridTemplateColumns: 'clamp(80px,8vw,120px) minmax(0,360px) minmax(0,1fr)',
              transformOrigin: 'top center',
            }}
          >
            {/* Index + dot */}
            <div className="flex items-start gap-3 pt-1">
              <span
                data-dot
                className="w-2.5 h-2.5 bg-red flex-shrink-0 transition-transform duration-300"
                style={{ willChange: 'transform' }}
              />
              <span
                data-accent
                className="font-mono font-medium text-[13px] tracking-[0.08em] text-n700"
                style={{ filter: 'url(#proj-distort)' }}
              >
                {project.num}
              </span>
            </div>

            {/* Title + stack */}
            <div className="flex flex-col gap-2.5">
              <h2
                className="font-sans font-black text-[22px] leading-[1.15] tracking-[-0.01em] m-0"
                style={
                  project.isCaseStudy
                    ? { viewTransitionName: `project-title-${project.num}` }
                    : undefined
                }
              >
                {project.title}
              </h2>
              <span className="font-mono text-[11px] tracking-[0.07em] uppercase text-n600 leading-relaxed">
                {project.stack}
              </span>
            </div>

            {/* Description + link */}
            <div className="flex flex-col gap-3">
              <p className="m-0 text-[15px] max-w-[58ch] text-n800 leading-relaxed">
                {project.copy}
              </p>
              <p className="m-0 text-[13.5px] max-w-[58ch] text-n700 leading-relaxed">
                <strong className="text-ink font-bold">Learned — </strong>
                {project.learned}
              </p>
              {project.isCaseStudy ? (
                <button
                  onClick={() => handleCaseStudy(project.caseStudyPath!)}
                  className="font-mono text-[12px] tracking-[0.07em] uppercase text-red-700
                             hover:text-red transition-colors duration-200 text-left mt-1"
                >
                  {project.linkLabel}
                </button>
              ) : (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[12px] tracking-[0.07em] uppercase text-red-700
                             hover:text-red transition-colors duration-200 mt-1"
                >
                  {project.linkLabel}
                </a>
              )}
            </div>

            {/* Ghost large index */}
            <span
              aria-hidden="true"
              className="absolute right-0 top-1/2 -translate-y-1/2 font-sans font-black
                         text-[clamp(72px,8vw,110px)] leading-none text-ink/[0.035]
                         select-none pointer-events-none"
            >
              {project.num}
            </span>
          </div>
        </div>
      ))}
    </section>
  )
}
