'use client'

import { useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import type { RefObject } from 'react'
import { GrainPlane } from './GrainPlane'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/** Pauses the R3F render loop when the tab is hidden to save battery. */
function VisibilityPauser() {
  const { invalidate, gl } = useThree()

  useEffect(() => {
    const onVisibility = () => {
      if (!document.hidden) invalidate()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [invalidate, gl])

  return null
}

export default function GrainCanvas() {
  const mouseRef = useMousePosition()
  const reduced = useReducedMotion()

  if (reduced) return null

  return (
    <Canvas
      orthographic
      camera={{ zoom: 1, near: 0.1, far: 10, position: [0, 0, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      frameloop="always"
    >
      <VisibilityPauser />
      <GrainPlane mouseRef={mouseRef as RefObject<{ nx: number; ny: number }>} />
    </Canvas>
  )
}
