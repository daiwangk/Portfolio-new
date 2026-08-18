'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function SplashScreen() {
  const overlayRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const barRef     = useRef<HTMLDivElement>(null)
  const nameRef    = useRef<HTMLSpanElement>(null)
  const [show, setShow]       = useState(false)
  const [exiting, setExiting] = useState(false)

  // Phase 1: check sessionStorage
  useEffect(() => {
    if (sessionStorage.getItem('dk-splash')) return
    setShow(true)
  }, [])

  // Phase 2: run counter + exit when overlay is in DOM
  useEffect(() => {
    if (!show) return

    const overlay  = overlayRef.current
    const counter  = counterRef.current
    const bar      = barRef.current
    const name     = nameRef.current
    if (!overlay || !counter || !bar || !name) return

    const safety = setTimeout(() => dismiss(), 6000)

    const DURATION = 1800
    const startTime = performance.now()
    let raf: number

    // Capture refs as locals — TS can't narrow inside rAF closures
    const counterEl  = counter
    const barEl      = bar
    const nameEl     = name
    const overlayEl  = overlay

    function dismiss() {
      clearTimeout(safety)
      cancelAnimationFrame(raf)
      sessionStorage.setItem('dk-splash', '1')
      setExiting(true)
      gsap.to(overlayEl, {
        yPercent: -100,
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => setShow(false),
      })
    }

    gsap.set(nameEl, { opacity: 0, y: 10 })

    function tick(now: number) {
      const elapsed = now - startTime
      const t       = Math.min(elapsed / DURATION, 1)
      const eased   = 1 - Math.pow(1 - t, 3)
      const value   = Math.round(eased * 100)

      counterEl.textContent = value.toString().padStart(2, '0')

      const wght = Math.round(200 + eased * 700)
      const wdth = Math.round(75  + eased * 45)
      counterEl.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}`

      barEl.style.transform = `scaleX(${eased})`

      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        gsap.to(nameEl, {
          opacity: 1, y: 0, duration: 0.35, ease: 'power2.out',
          onComplete: () => {
            gsap.to({}, { duration: 0.45, onComplete: dismiss })
          },
        })
      }
    }

    // Small delay before starting so component is fully painted
    const startDelay = setTimeout(() => {
      raf = requestAnimationFrame(tick)
    }, 80)

    return () => {
      clearTimeout(safety)
      clearTimeout(startDelay)
      cancelAnimationFrame(raf)
    }
  }, [show])

  if (!show) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[120] bg-ink flex flex-col items-center justify-center
                 select-none"
      style={{ pointerEvents: exiting ? 'none' : 'all' }}
      aria-hidden="true"
    >
      {/* Corner labels */}
      <span className="absolute top-6 left-[clamp(24px,5vw,72px)]
                       font-mono text-[11px] tracking-[0.1em] uppercase text-n700">
        Portfolio — 2026
      </span>
      <span className="absolute top-6 right-[clamp(24px,5vw,72px)]
                       font-mono text-[11px] tracking-[0.1em] uppercase text-n700">
        Loading
      </span>

      {/* Giant counter — variable font gets bolder as it counts */}
      <span
        ref={counterRef}
        className="font-sans text-bg leading-none tabular-nums"
        style={{
          fontSize: 'clamp(120px, 22vw, 240px)',
          letterSpacing: '-0.04em',
          fontVariationSettings: "'wght' 200, 'wdth' 75",
          willChange: 'font-variation-settings',
        }}
      >
        00
      </span>

      {/* Name — appears at 100 */}
      <span
        ref={nameRef}
        className="font-sans font-black text-bg tracking-[-0.02em] mt-4"
        style={{
          fontSize: 'clamp(18px, 2.8vw, 32px)',
          opacity: 0,
          fontVariationSettings: "'wght' 900, 'wdth' 100",
        }}
      >
        DAIWANG KHERA
      </span>

      {/* Subtitle */}
      <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-n700 mt-2">
        AI · ML Engineer
      </span>

      {/* Progress bar */}
      <div className="absolute bottom-10 left-[clamp(24px,5vw,72px)] right-[clamp(24px,5vw,72px)] h-px bg-n700/20">
        <div
          ref={barRef}
          className="h-full bg-red"
          style={{ transform: 'scaleX(0)', transformOrigin: 'left center' }}
        />
      </div>
    </div>
  )
}
