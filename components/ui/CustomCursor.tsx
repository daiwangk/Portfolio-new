'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const SIZE = 28

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    // Desktop pointer only
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch || reduced) return

    const ring = ringRef.current
    if (!ring) return

    document.documentElement.style.cursor = 'none'

    let mx = -300, my = -300, rx = -300, ry = -300
    const LERP = 0.13

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      rx += (mx - rx) * LERP
      ry += (my - ry) * LERP
      gsap.set(ring, { x: rx, y: ry })
    }
    gsap.ticker.add(tick)

    const onClick = () =>
      gsap.fromTo(ring, { scale: 0.7 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1,0.5)' })
    document.addEventListener('click', onClick)

    const show = () => gsap.to(ring, { opacity: 1, duration: 0.25 })
    const hide = () => gsap.to(ring, { opacity: 0, duration: 0.2 })
    document.addEventListener('mouseenter', show)
    document.addEventListener('mouseleave', hide)

    return () => {
      document.documentElement.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('click', onClick)
      document.removeEventListener('mouseenter', show)
      document.removeEventListener('mouseleave', hide)
      gsap.ticker.remove(tick)
    }
  }, [reduced])

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
