'use client'

/**
 * CursorCompanion — pixel-art bird that follows the cursor
 * using oneko.js's actual tick-based state-machine behavior.
 *
 * Movement logic adapted from:
 *   https://github.com/adryd325/oneko.js (MIT License)
 *   Credit: adryd325 and contributors
 *
 * Visual: custom pixel-art SVG bird (cream body, orange accents)
 * — preserves the exact art from the previous implementation.
 */

'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import gsap from 'gsap'
import BirdSprite, { type BirdSpriteRefs } from '@/components/cursor/BirdSprite'
import { canUseCustomCursor } from '@/lib/cursorGuards'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// ─── oneko.js constants (exact values from source) ────────────────────────────
const NEKO_SPEED = 10          // px per tick — exactly as in oneko.js
const IDLE_NEAR  = 48          // distance threshold to enter idle
const TICK_MS    = 100         // gate: one logic tick per 100ms (oneko.js line 166)
const ALERT_HOLD = 7           // frames to show alert sprite before walking (line 256)

// ─── Idle animation durations (oneko.js frame counts) ─────────────────────────
const SLEEP_START_FRAME  = 8   // frames showing "tired" before "sleeping" (line 213)
const SLEEP_END_FRAME    = 192 // total frames for sleeping animation (line 218)
const SCRATCH_END_FRAME  = 9   // frames for scratch animations (line 228)
const IDLE_TRIGGER_MIN   = 10  // idleTime must exceed this before picking animation (line 188)
const IDLE_TRIGGER_PROB  = 200 // 1-in-200 chance per tick of picking animation (line 189)

// ─── Visual constants ──────────────────────────────────────────────────────────
const DISPLAY = 32             // size of the bird div (px)
const PIXELATED: CSSProperties = {
  width: DISPLAY,
  height: DISPLAY,
  imageRendering: 'pixelated',
}

// ─── State types ──────────────────────────────────────────────────────────────
type IdleAnim = 'sleeping' | 'scratchSelf' | null

export default function CursorCompanion() {
  const rootRef   = useRef<HTMLDivElement>(null)
  const wrapRef   = useRef<HTMLDivElement>(null)
  const spriteRefs = useRef<BirdSpriteRefs>({ wingL: null, wingR: null, body: null, eye: null })
  const reduced   = useReducedMotion()
  const [eligible, setEligible] = useState(false)

  useEffect(() => {
    setEligible(canUseCustomCursor(reduced))
  }, [reduced])

  useEffect(() => {
    if (!eligible) return
    const root = rootRef.current
    const wrap = wrapRef.current
    if (!root || !wrap) return

    // ── State variables (mirrors oneko.js) ─────────────────────────────────
    let mousePosX = 0
    let mousePosY = 0
    let nekoPosX  = -300        // off-screen until first mouse move
    let nekoPosY  = -300
    let hasMoved  = false

    let frameCount         = 0
    let idleTime           = 0
    let idleAnimation: IdleAnim = null
    let idleAnimationFrame = 0

    // ── Visual helpers ─────────────────────────────────────────────────────
    let isShowingIdle  = false
    let bobTween: gsap.core.Tween | null = null

    const applyFacing = (dir: number) => {
      gsap.set(wrap, { scaleX: dir })
    }

    const showWalkFrame = (fc: number) => {
      if (isShowingIdle) exitIdleVisual()
      // Wing flap every 3 frames, alternating up/down — gives the hop feel
      const { wingL, wingR } = spriteRefs.current
      const flapPhase = Math.floor(fc / 3) % 2
      if (wingL) gsap.set(wingL, { rotation: flapPhase === 0 ? -10 : 8 })
      if (wingR) gsap.set(wingR, { rotation: flapPhase === 0 ? 10 : -8 })
    }

    const showIdleSprite = () => {
      if (isShowingIdle) return
      isShowingIdle = true
      const { wingL, wingR } = spriteRefs.current
      gsap.to(wrap, { scaleY: 0.88, opacity: 0.6, duration: 0.4, ease: 'power2.out' })
      if (wingL) gsap.to(wingL, { rotation: -14, duration: 0.4, ease: 'power2.out' })
      if (wingR) gsap.to(wingR, { rotation: 14, duration: 0.4, ease: 'power2.out' })
      bobTween?.kill()
      bobTween = gsap.to(wrap, { y: 2, duration: 1.1, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    }

    const showSleepSprite = () => {
      // Deeper settle: squish + very slow bob
      const { eye } = spriteRefs.current
      if (eye) gsap.to(eye, { opacity: 0, duration: 0.4 })
      gsap.to(wrap, { scaleY: 0.72, opacity: 0.45, duration: 0.8, ease: 'power2.out' })
      bobTween?.kill()
      bobTween = gsap.to(wrap, { y: 3, duration: 2.2, yoyo: true, repeat: -1, ease: 'sine.inOut' })
    }

    const showAlertSprite = () => {
      // Brief upright snap before walking
      const { wingL, wingR, eye } = spriteRefs.current
      exitIdleVisual()
      gsap.to(wrap, { scaleY: 1.08, duration: 0.1, yoyo: true, repeat: 1 })
      if (eye) gsap.to(eye, { opacity: 1, duration: 0.1 })
      if (wingL) gsap.set(wingL, { rotation: 0 })
      if (wingR) gsap.set(wingR, { rotation: 0 })
    }

    const exitIdleVisual = () => {
      isShowingIdle = false
      bobTween?.kill()
      bobTween = null
      const { wingL, wingR, eye } = spriteRefs.current
      gsap.to(wrap, { scaleY: 1, opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' })
      if (wingL) gsap.set(wingL, { rotation: 0 })
      if (wingR) gsap.set(wingR, { rotation: 0 })
      if (eye) gsap.to(eye, { opacity: 1, duration: 0.2 })
    }

    // Click flap — GSAP one-off (kept from previous version)
    const onClickFlap = () => {
      const { wingL, wingR } = spriteRefs.current
      gsap.fromTo(wrap, { scaleY: 1.15 }, { scaleY: 1, duration: 0.35, ease: 'elastic.out(1, 0.55)' })
      if (wingL) gsap.fromTo(wingL, { rotation: -24 }, { rotation: 0, duration: 0.22, ease: 'power2.out' })
      if (wingR) gsap.fromTo(wingR, { rotation: 24 }, { rotation: 0, duration: 0.22, ease: 'power2.out' })
    }

    // ── oneko.js idle() — exact logic ──────────────────────────────────────
    const idle = () => {
      idleTime += 1

      // Randomly pick an idle animation (oneko.js lines 187-209)
      if (idleTime > IDLE_TRIGGER_MIN &&
          Math.floor(Math.random() * IDLE_TRIGGER_PROB) === 0 &&
          idleAnimation === null) {
        // Only using animations that work with our 2D bird (no wall-specific ones)
        idleAnimation = Math.random() < 0.5 ? 'sleeping' : 'scratchSelf'
      }

      switch (idleAnimation) {
        case 'sleeping':
          if (idleAnimationFrame < SLEEP_START_FRAME) {
            // "tired" phase
            showIdleSprite()
          } else {
            // "sleeping" phase — deeper animation
            if (idleAnimationFrame === SLEEP_START_FRAME) showSleepSprite()
            if (idleAnimationFrame > SLEEP_END_FRAME) {
              idleAnimation = null
              idleAnimationFrame = 0
            }
          }
          idleAnimationFrame += 1
          break

        case 'scratchSelf':
          // Quick scratch: wing alternation for 9 frames then reset
          showIdleSprite()
          const { wingL, wingR } = spriteRefs.current
          const phase = idleAnimationFrame % 3
          if (wingL) gsap.set(wingL, { rotation: phase === 0 ? -20 : phase === 1 ? 5 : -20 })
          if (wingR) gsap.set(wingR, { rotation: 14 })
          idleAnimationFrame += 1
          if (idleAnimationFrame > SCRATCH_END_FRAME) {
            idleAnimation = null
            idleAnimationFrame = 0
          }
          break

        default:
          // Plain idle — wing-folded settle
          showIdleSprite()
      }
    }

    // ── oneko.js frame() — exact logic ────────────────────────────────────
    const frame = () => {
      frameCount += 1
      const diffX = nekoPosX - mousePosX
      const diffY = nekoPosY - mousePosY
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2)

      // Idle threshold (oneko.js line 245)
      if (distance < NEKO_SPEED || distance < IDLE_NEAR) {
        idle()
        return
      }

      // Reset idle state when cursor is far enough
      idleAnimation = null
      idleAnimationFrame = 0

      // Alert phase: brief pause before chasing (oneko.js lines 253-258)
      if (idleTime > 1) {
        showAlertSprite()
        idleTime = Math.min(idleTime, ALERT_HOLD)
        idleTime -= 1
        return
      }

      // ── Walking ──────────────────────────────────────────────────────────
      // Direction for horizontal flip (oneko.js uses 8-way; we use L/R flip)
      if (diffX > 0.5) applyFacing(-1)       // moving left
      else if (diffX < -0.5) applyFacing(1)  // moving right

      showWalkFrame(frameCount)

      // Move exactly NEKO_SPEED px toward cursor (oneko.js lines 268-275)
      nekoPosX -= (diffX / distance) * NEKO_SPEED
      nekoPosY -= (diffY / distance) * NEKO_SPEED

      // Clamp to viewport (oneko.js lines 271-272)
      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16)
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16)

      // Direct position update — like oneko.js's style.left/top, but via transform
      gsap.set(root, { x: nekoPosX, y: nekoPosY })
    }

    // ── rAF loop with 100ms gate — exact oneko.js pattern ─────────────────
    let lastFrameTimestamp = 0
    let rafId = 0

    const onAnimationFrame = (timestamp: number) => {
      if (!lastFrameTimestamp) lastFrameTimestamp = timestamp
      if (timestamp - lastFrameTimestamp > TICK_MS) {
        lastFrameTimestamp = timestamp
        if (hasMoved) frame()
      }
      rafId = requestAnimationFrame(onAnimationFrame)
    }

    // ── Mouse listener ─────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mousePosX = e.clientX
      mousePosY = e.clientY

      if (!hasMoved) {
        hasMoved = true
        // Spawn near cursor on first move
        nekoPosX = mousePosX + 40
        nekoPosY = mousePosY + 20
        gsap.set(root, { x: nekoPosX, y: nekoPosY, opacity: 1 })
      }
    }

    // ── Mount ──────────────────────────────────────────────────────────────
    gsap.set(root, { opacity: 0, x: -300, y: -300 })
    gsap.set(wrap, { scaleX: 1, scaleY: 1, y: 0 })

    window.addEventListener('mousemove', onMove)
    document.addEventListener('click', onClickFlap)
    rafId = requestAnimationFrame(onAnimationFrame)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('click', onClickFlap)
      bobTween?.kill()
    }
  }, [eligible])

  if (!eligible) return null

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[201]"
      style={{
        width: DISPLAY,
        height: DISPLAY,
        willChange: 'transform',
        opacity: 0,
        // Use translate(-50%,-50%) so nekoPosX/Y is the center point
        transform: 'translate(-50%, -50%)',
      }}
    >
      {/* Glow layer — existing bird art visual */}
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

      {/* Main bird — wrapRef is what gets scaleX/scaleY/y animated */}
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
