'use client'

import { useEffect, useRef, type RefObject } from 'react'
import type { MousePosition } from '@/types'

/**
 * Tracks mouse position and exposes both pixel coords (x/y)
 * and normalized NDC coords (nx/ny in range -1..1).
 * Returns a ref (not state) so consumers can read in rAF loops
 * without triggering re-renders.
 */
export function useMousePosition(): RefObject<MousePosition> {
  const ref = useRef<MousePosition>({ x: 0, y: 0, nx: 0, ny: 0 })

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      ref.current = {
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX / window.innerWidth) * 2 - 1,
        ny: -((e.clientY / window.innerHeight) * 2 - 1),
      }
    }
    window.addEventListener('mousemove', handler, { passive: true })
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return ref
}
