'use client'

import { Canvas } from '@react-three/fiber'
import type { RefObject } from 'react'
import { GrainPlane } from './GrainPlane'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useReducedMotion } from '@/hooks/useReducedMotion'

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
      <GrainPlane mouseRef={mouseRef as RefObject<{ nx: number; ny: number }>} />
    </Canvas>
  )
}
