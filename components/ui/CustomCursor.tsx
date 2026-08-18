'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type CursorLabel = '' | '[ VIEW ]' | '[ CASE STUDY ]' | '[ COPY ]' | '[ OPEN ]' | '[ PLAY ]'

const SIZE_DEFAULT = 28

const INTERACTIVE_SELECTOR = 'a, button, [data-cursor], [data-magnetic]'

function getLabel(el: Element | null): CursorLabel {
  if (!el) return ''
  const root = el.closest('[data-cursor]') as HTMLElement | null
  if (root) {
    const v = root.dataset.cursor
    if (v === 'view') return '[ VIEW ]'
    if (v === 'case-study') return '[ CASE STUDY ]'
    if (v === 'copy') return '[ COPY ]'
    if (v === 'open') return '[ OPEN ]'
    if (v === 'play') return '[ PLAY ]'
  }
  if (el.closest('a[href^="/projects"]')) return '[ CASE STUDY ]'
  if (el.closest('a[href^="mailto"]')) return '[ COPY ]'
  if (el.closest('a[href^="http"]')) return '[ OPEN ]'
  return ''
}

const ringStyle: CSSProperties = {
  width: SIZE_DEFAULT,
  height: SIZE_DEFAULT,
  borderRadius: '50%',
  background: 'white',
  mixBlendMode: 'difference',
  transform: 'translate(-50%, -50%)',
  willChange: 'transform, width, height',
  opacity: 0,
}

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch || reduced) return

    const ring = ringRef.current
    if (!ring) return

    document.documentElement.style.cursor = 'none'

    let mouseX = -300
    let mouseY = -300
    let ringX = -300
    let ringY = -300
    const LERP = 0.13

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      ringX += (mouseX - ringX) * LERP
      ringY += (mouseY - ringY) * LERP
      gsap.set(ring, { x: ringX, y: ringY })
    }
    gsap.ticker.add(tick)

    let currentLabel: CursorLabel = ''

    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as Element)?.closest(INTERACTIVE_SELECTOR)
      if (!interactive) return

      const nextLabel = getLabel(e.target as Element)
      if (nextLabel === currentLabel) return
      currentLabel = nextLabel
    }

    const onOut = (e: MouseEvent) => {
      const interactive = (e.target as Element)?.closest(INTERACTIVE_SELECTOR)
      if (!interactive) return

      const related = e.relatedTarget
      if (related && (related as Element).closest?.(INTERACTIVE_SELECTOR)) return

      currentLabel = ''
    }

    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    const onClick = () =>
      gsap.fromTo(ring, { scale: 0.7 }, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' })
    document.addEventListener('click', onClick)

    const show = () => gsap.to(ring, { opacity: 1, duration: 0.25 })
    const hide = () => gsap.to(ring, { opacity: 0, duration: 0.2 })
    document.addEventListener('mouseenter', show)
    document.addEventListener('mouseleave', hide)

    return () => {
      document.documentElement.style.cursor = ''
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.removeEventListener('click', onClick)
      document.removeEventListener('mouseenter', show)
      document.removeEventListener('mouseleave', hide)
      gsap.ticker.remove(tick)
    }
  }, [reduced])

  return (
    <div
      ref={ringRef}
      className="fixed top-0 left-0 z-[200] pointer-events-none flex items-center justify-center"
      style={ringStyle}
      aria-hidden="true"
    />
  )
}
