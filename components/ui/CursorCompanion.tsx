'use client'

/**
 * CursorCompanion — classic oneko.js cat that follows the cursor.
 *
 * Movement + sprite sheet logic adapted from:
 *   https://github.com/adryd325/oneko.js (MIT License)
 *   Credit: adryd325 and contributors
 *
 * Sprite: /oneko.gif (32×32 frames in a spritesheet)
 */

import { useEffect, useRef, useState } from 'react'
import { CURSOR_COMPANION_ENABLED } from '@/lib/cursorCompanion'
import { canUseCustomCursor } from '@/lib/cursorGuards'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const NEKO_SPEED = 10
const IDLE_NEAR = 48
const TICK_MS = 100
const SIZE = 32

type SpriteName =
  | 'idle'
  | 'alert'
  | 'scratchSelf'
  | 'scratchWallN'
  | 'scratchWallS'
  | 'scratchWallE'
  | 'scratchWallW'
  | 'tired'
  | 'sleeping'
  | 'N'
  | 'NE'
  | 'E'
  | 'SE'
  | 'S'
  | 'SW'
  | 'W'
  | 'NW'

const SPRITE_SETS: Record<SpriteName, [number, number][]> = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
}

export default function CursorCompanion() {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [eligible, setEligible] = useState(false)

  useEffect(() => {
    setEligible(CURSOR_COMPANION_ENABLED && canUseCustomCursor(reduced))
  }, [reduced])

  useEffect(() => {
    if (!eligible) return
    const el = rootRef.current
    if (!el) return

    let mousePosX = 0
    let mousePosY = 0
    let nekoPosX = 32
    let nekoPosY = 32
    let hasMoved = false

    let frameCount = 0
    let idleTime = 0
    let idleAnimation: string | null = null
    let idleAnimationFrame = 0
    let lastFrameTimestamp = 0
    let rafId = 0

    const setSprite = (name: SpriteName, frame: number) => {
      const frames = SPRITE_SETS[name]
      const sprite = frames[frame % frames.length]
      el.style.backgroundPosition = `${sprite[0] * SIZE}px ${sprite[1] * SIZE}px`
    }

    const place = () => {
      // left/top (not transform) — avoids fighting React style re-renders
      el.style.left = `${nekoPosX - 16}px`
      el.style.top = `${nekoPosY - 16}px`
      el.style.opacity = '1'
    }

    const resetIdleAnimation = () => {
      idleAnimation = null
      idleAnimationFrame = 0
    }

    const idle = () => {
      idleTime += 1

      if (
        idleTime > 10 &&
        Math.floor(Math.random() * 200) === 0 &&
        idleAnimation === null
      ) {
        const available: string[] = ['sleeping', 'scratchSelf']
        if (nekoPosX < 32) available.push('scratchWallW')
        if (nekoPosY < 32) available.push('scratchWallN')
        if (nekoPosX > window.innerWidth - 32) available.push('scratchWallE')
        if (nekoPosY > window.innerHeight - 32) available.push('scratchWallS')
        idleAnimation = available[Math.floor(Math.random() * available.length)]
      }

      switch (idleAnimation) {
        case 'sleeping':
          if (idleAnimationFrame < 8) {
            setSprite('tired', 0)
          } else {
            setSprite('sleeping', Math.floor(idleAnimationFrame / 4))
            if (idleAnimationFrame > 192) resetIdleAnimation()
          }
          idleAnimationFrame += 1
          break
        case 'scratchWallN':
        case 'scratchWallS':
        case 'scratchWallE':
        case 'scratchWallW':
        case 'scratchSelf':
          setSprite(idleAnimation as SpriteName, idleAnimationFrame)
          idleAnimationFrame += 1
          if (idleAnimationFrame > 9) resetIdleAnimation()
          break
        default:
          setSprite('idle', 0)
          return
      }
    }

    const frame = () => {
      frameCount += 1
      const diffX = nekoPosX - mousePosX
      const diffY = nekoPosY - mousePosY
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2)

      if (distance < NEKO_SPEED || distance < IDLE_NEAR) {
        idle()
        return
      }

      idleAnimation = null
      idleAnimationFrame = 0

      if (idleTime > 1) {
        setSprite('alert', 0)
        idleTime = Math.min(idleTime, 7)
        idleTime -= 1
        return
      }

      let direction = ''
      direction += diffY / distance > 0.5 ? 'N' : ''
      direction += diffY / distance < -0.5 ? 'S' : ''
      direction += diffX / distance > 0.5 ? 'W' : ''
      direction += diffX / distance < -0.5 ? 'E' : ''
      if (direction) setSprite(direction as SpriteName, frameCount)
      else setSprite('idle', 0)

      nekoPosX -= (diffX / distance) * NEKO_SPEED
      nekoPosY -= (diffY / distance) * NEKO_SPEED
      nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16)
      nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16)
      place()
    }

    const onAnimationFrame = (timestamp: number) => {
      if (!el.isConnected) return
      if (!lastFrameTimestamp) lastFrameTimestamp = timestamp
      if (timestamp - lastFrameTimestamp > TICK_MS) {
        lastFrameTimestamp = timestamp
        if (hasMoved) frame()
      }
      rafId = requestAnimationFrame(onAnimationFrame)
    }

    const onMove = (e: MouseEvent) => {
      mousePosX = e.clientX
      mousePosY = e.clientY
      if (!hasMoved) {
        hasMoved = true
        // Spawn near cursor so the cat is immediately visible, then chase
        nekoPosX = Math.min(Math.max(16, mousePosX + 48), window.innerWidth - 16)
        nekoPosY = Math.min(Math.max(16, mousePosY + 48), window.innerHeight - 16)
        setSprite('alert', 0)
        place()
      }
    }

    el.style.opacity = '0'
    el.style.left = '-64px'
    el.style.top = '-64px'
    setSprite('idle', 0)

    document.addEventListener('mousemove', onMove)
    rafId = requestAnimationFrame(onAnimationFrame)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMove)
    }
  }, [eligible])

  if (!eligible) return null

  return (
    <div
      ref={rootRef}
      id="oneko"
      aria-hidden="true"
      data-cursor-companion=""
      className="fixed pointer-events-none z-[201]"
      style={{
        width: SIZE,
        height: SIZE,
        imageRendering: 'pixelated',
        backgroundImage: 'url(/oneko.gif)',
        backgroundRepeat: 'no-repeat',
        // opacity/left/top owned by the effect — React must not reset them
      }}
    />
  )
}
