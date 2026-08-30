'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { canUseCustomCursor } from '@/lib/cursorGuards'

const SIZE = 28

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [eligible, setEligible] = useState(false)

  useEffect(() => {
    const ok = canUseCustomCursor(reduced)
    setEligible(ok)
    if (!ok) document.documentElement.style.cursor = ''
  }, [reduced])

  useEffect(() => {
    if (!eligible) return

    const ring = ringRef.current
    if (!ring) return

    document.documentElement.style.cursor = 'none'

    // Step 4 fix: start off-screen but at opacity 0 — no multi-second delay.
    // The ring becomes visible on the FIRST mousemove event, within one frame.
    let rx = -300
    let ry = -300
    let hasSeenMouse = false

    const onMove = (e: MouseEvent) => {
      if (!hasSeenMouse) {
        // First move: snap to cursor instantly, no lerp lag
        hasSeenMouse = true
        rx = e.clientX
        ry = e.clientY
        gsap.set(ring, { x: rx, y: ry, opacity: 1 })
        return
      }
      rx = e.clientX
      ry = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      if (!hasSeenMouse) return
      gsap.set(ring, { x: rx, y: ry })
    }
    gsap.ticker.add(tick)

    const onClick = () =>
      gsap.fromTo(ring, { scale: 0.7 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' })
    document.addEventListener('click', onClick)

    const hide = () => gsap.to(ring, { opacity: 0, duration: 0.2 })
    const show = () => { if (hasSeenMouse) gsap.to(ring, { opacity: 1, duration: 0.25 }) }
    document.addEventListener('mouseleave', hide)
    document.addEventListener('mouseenter', show)

    return () => {
      document.documentElement.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('click', onClick)
      document.removeEventListener('mouseleave', hide)
      document.removeEventListener('mouseenter', show)
      gsap.ticker.remove(tick)
    }
  }, [eligible])

  if (!eligible) return null

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[200]"
      style={{
        width: SIZE,
        height: SIZE,
        borderRadius: '50%',
        background: 'white',
        mixBlendMode: 'difference',
        transform: 'translate(-50%, -50%)',
        willChange: 'transform',
        opacity: 0,
      }}
    />
  )
}
