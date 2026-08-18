'use client'

import { useEffect, useRef, ReactNode } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

interface RevealProps {
  children: ReactNode
  /** Extra delay in seconds */
  delay?: number
  /** start trigger e.g. 'top 85%' */
  start?: string
  className?: string
  /** 'clip' = clip-path wipe (for blocks/paragraphs)
   *  'rise' = overflow mask + translateY (for headlines) */
  mode?: 'clip' | 'rise'
}

/**
 * Wraps any content in a scroll-triggered reveal.
 *
 * mode="clip"  — clip-path inset(0 0 100% 0) → inset(0 0 0% 0)
 *               Combined with subtle y offset. Best for paragraphs & cards.
 *
 * mode="rise"  — overflow:hidden mask + translateY(100%) → translateY(0)
 *               Best for large headlines you don't want to clip.
 */
export default function Reveal({
  children,
  delay = 0,
  start = 'top 88%',
  className = '',
  mode = 'clip',
}: RevealProps) {
  const wrapRef  = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const reduced  = useReducedMotion()

  useEffect(() => {
    const wrap  = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner || reduced) return

    const ctx = gsap.context(() => {
      if (mode === 'clip') {
        gsap.fromTo(
          inner,
          {
            clipPath: 'inset(0 0 100% 0)',
            y: 18,
            opacity: 0,
          },
          {
            clipPath: 'inset(0 0 0% 0)',
            y: 0,
            opacity: 1,
            duration: 0.82,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: wrap,
              start,
              once: true,
            },
          },
        )
      } else {
        // rise mode: inner translates up from inside overflow-hidden wrapper
        gsap.set(wrap, { overflow: 'hidden' })
        gsap.fromTo(
          inner,
          { y: '105%' },
          {
            y: '0%',
            duration: 0.85,
            delay,
            ease: 'power4.out',
            scrollTrigger: {
              trigger: wrap,
              start,
              once: true,
            },
          },
        )
      }
    })

    return () => ctx.revert()
  }, [delay, start, mode, reduced])

  return (
    <div ref={wrapRef} className={className}>
      <div ref={innerRef}>{children}</div>
    </div>
  )
}
