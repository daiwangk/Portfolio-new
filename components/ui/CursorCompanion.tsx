'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import BirdSprite, { type BirdSpriteRefs } from '@/components/cursor/BirdSprite'
import { CURSOR_COMPANION_ENABLED } from '@/lib/cursorCompanion'
import { canUseCustomCursor } from '@/lib/cursorGuards'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const DISPLAY = 28
const OFFSET_X = 18   // to the right of the cursor ring
const OFFSET_Y = 12   // slightly below
const LERP = 0.07
const IDLE_MS = 1750

const PIXELATED: CSSProperties = {
  width: DISPLAY,
  height: DISPLAY,
  imageRendering: 'pixelated',
}

export default function CursorCompanion() {
  const rootRef = useRef<HTMLDivElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const facingRef = useRef(1)
  const spriteRefs = useRef<BirdSpriteRefs>({
    wingL: null,
    wingR: null,
    body: null,
    eye: null,
  })
  const reduced = useReducedMotion()
  const [eligible, setEligible] = useState(false)

  // Eligibility check — runs once after hydration
  useEffect(() => {
    if (!CURSOR_COMPANION_ENABLED) return
    setEligible(canUseCustomCursor(reduced))
  }, [reduced])

  // Main animation effect — uses useEffect (not useLayoutEffect) so refs are ready
  useEffect(() => {
    if (!eligible) return

    const root = rootRef.current
    const wrap = wrapRef.current
    if (!root || !wrap) return

    // Own mouse position tracking — no dependency on CustomCursor writing to shared store
    let mx = 0
    let my = 0
    let px = -300
    let py = -300
    let prevPx = px
    let isIdle = false
    let hasMoved = false
    let idleTimer: ReturnType<typeof setTimeout> | null = null
    let bobTween: gsap.core.Tween | null = null

    // Position off-screen initially, invisible
    gsap.set(root, { x: -300, y: -300, opacity: 0 })

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY

      if (!hasMoved) {
        hasMoved = true
        px = mx + OFFSET_X
        py = my + OFFSET_Y
        prevPx = px
        gsap.set(root, { x: px, y: py })
        gsap.to(root, { opacity: 1, duration: 0.3, ease: 'power2.out' })
      }

      // Reset idle timer on movement
      if (isIdle) exitIdle()
      if (idleTimer) clearTimeout(idleTimer)
      idleTimer = setTimeout(enterIdle, IDLE_MS)
    }

    const applyFacing = () => {
      gsap.set(wrap, { scaleX: facingRef.current })
    }

    const enterIdle = () => {
      isIdle = true
      const { wingL, wingR, eye } = spriteRefs.current
      gsap.to(wrap, { scaleY: 0.82, opacity: 0.55, duration: 0.45, ease: 'power2.out' })
      if (wingL) gsap.to(wingL, { rotation: -14, duration: 0.4, ease: 'power2.out' })
      if (wingR) gsap.to(wingR, { rotation: 14, duration: 0.4, ease: 'power2.out' })
      if (eye) gsap.to(eye, { opacity: 0, duration: 0.25 })
      bobTween?.kill()
      bobTween = gsap.to(wrap, { y: 2, duration: 1.1, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    }

    const exitIdle = () => {
      isIdle = false
      const { wingL, wingR, eye } = spriteRefs.current
      bobTween?.kill()
      bobTween = null
      gsap.to(wrap, { scaleY: 1, opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' })
      if (wingL) gsap.to(wingL, { rotation: 0, duration: 0.3, ease: 'power2.out' })
      if (wingR) gsap.to(wingR, { rotation: 0, duration: 0.3, ease: 'power2.out' })
      if (eye) gsap.to(eye, { opacity: 1, duration: 0.2 })
      applyFacing()
    }

    const flap = () => {
      if (isIdle) exitIdle()
      const { wingL, wingR } = spriteRefs.current
      gsap.fromTo(wrap, { scaleY: 1.14 }, { scaleY: 1, duration: 0.35, ease: 'elastic.out(1, 0.55)' })
      if (wingL) gsap.fromTo(wingL, { rotation: -22 }, { rotation: 0, duration: 0.22, ease: 'power2.out' })
      if (wingR) gsap.fromTo(wingR, { rotation: 22 }, { rotation: 0, duration: 0.22, ease: 'power2.out' })
    }

    const tick = () => {
      if (!hasMoved) return

      const targetX = mx + OFFSET_X
      const targetY = my + OFFSET_Y

      px += (targetX - px) * LERP
      py += (targetY - py) * LERP

      gsap.set(root, { x: px, y: py })

      // Flip direction based on horizontal movement
      if (px < prevPx - 0.15) {
        facingRef.current = -1
        applyFacing()
      } else if (px > prevPx + 0.15) {
        facingRef.current = 1
        applyFacing()
      }
      prevPx = px
    }

    window.addEventListener('mousemove', onMove)
    gsap.ticker.add(tick)
    document.addEventListener('click', flap)

    return () => {
      window.removeEventListener('mousemove', onMove)
      gsap.ticker.remove(tick)
      document.removeEventListener('click', flap)
      if (idleTimer) clearTimeout(idleTimer)
      bobTween?.kill()
    }
  }, [eligible])

  if (!eligible) return null

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[201]"
      style={{ width: DISPLAY, height: DISPLAY, willChange: 'transform', opacity: 0 }}
    >
      {/* Glow layer behind */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          filter: 'blur(4px) brightness(1.4)',
          opacity: 0.45,
          transform: 'scale(1.2)',
        }}
      >
        <BirdSprite style={PIXELATED} />
      </div>

      {/* Main bird */}
      <div
        ref={wrapRef}
        className="relative w-full h-full"
        style={{ transformOrigin: '50% 50%' }}
      >
        <BirdSprite spriteRefs={spriteRefs} style={PIXELATED} />
      </div>
    </div>
  )
}
