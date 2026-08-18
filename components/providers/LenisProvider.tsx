'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { scrollVelocity } from '@/lib/velocity'
import { audioState } from '@/lib/audioState'
import { playBass } from '@/lib/audio'

gsap.registerPlugin(ScrollTrigger)

interface LenisProviderProps {
  children: React.ReactNode
}

const SECTION_IDS = ['#projects', '#experience', '#learning', '#about', '#contact']

export default function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialise audio preference from localStorage
    audioState.init()

    // Detect touch device — disable smooth scrolling on touch
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) return

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: false,
    })
    lenisRef.current = lenis

    // Sync Lenis RAF with GSAP ticker for seamless animation coupling
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Velocity-based inertial skew + write to shared velocity store
    lenis.on('scroll', ({ velocity }: { velocity: number }) => {
      // Write to shared store (read by Marquee)
      scrollVelocity.value = velocity

      // Skew all [data-skew] elements proportional to velocity
      const skew = velocity * -0.035
      gsap.to('[data-skew]', {
        skewY: skew,
        ease: 'power3.out',
        duration: 0.55,
        overwrite: 'auto',
      })
    })

    // Sync Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Section boundary audio triggers — 40Hz sub-bass thump when label shifts
    const sectionCleanup: (() => void)[] = []
    SECTION_IDS.forEach((id) => {
      const el = document.querySelector(id)
      if (!el) return
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        once: false,
        onEnter: () => playBass(),
        onEnterBack: () => playBass(0.04),
      })
      sectionCleanup.push(() => st.kill())
    })

    return () => {
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
      lenis.destroy()
      sectionCleanup.forEach((fn) => fn())
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
