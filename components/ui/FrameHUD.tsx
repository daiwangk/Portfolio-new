'use client'

import { useEffect, useRef, useState } from 'react'

type GLLabel = 'GL2' | 'GL1' | 'NO GL' | '...'

export default function FrameHUD() {
  const [fps, setFps] = useState(0)
  const [ms, setMs] = useState(0)
  const [glLabel, setGlLabel] = useState<GLLabel>('...')
  const lastTimeRef = useRef(performance.now())
  const rafRef = useRef(0)
  const accumRef = useRef({ fps: 0, count: 0, lastUpdate: performance.now() })

  useEffect(() => {
    // One-time WebGL detection
    const canvas = document.createElement('canvas')
    if (canvas.getContext('webgl2')) setGlLabel('GL2')
    else if (canvas.getContext('webgl')) setGlLabel('GL1')
    else setGlLabel('NO GL')

    const tick = (now: number) => {
      const delta = now - lastTimeRef.current
      lastTimeRef.current = now

      const acc = accumRef.current
      acc.fps += 1000 / delta
      acc.count++

      // Refresh every 600ms for readability
      if (now - acc.lastUpdate > 600) {
        const avgFps = Math.round(acc.fps / acc.count)
        const avgMs = parseFloat((delta).toFixed(1))
        setFps(avgFps)
        setMs(avgMs)
        acc.fps = 0
        acc.count = 0
        acc.lastUpdate = now
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Color-code FPS: green ≥ 55, amber 30–54, red < 30
  const fpsColor =
    fps >= 55 ? 'text-emerald-600' : fps >= 30 ? 'text-amber-600' : 'text-red-600'

  return (
    <span
      className={`font-mono text-[11px] tracking-[0.04em] select-none ${fpsColor}`}
      title="Real-time frame budget — requestAnimationFrame delta"
      aria-hidden="true"
    >
      [ {fps > 0 ? fps : '—'} FPS | {ms > 0 ? ms : '—'}ms | {glLabel} ]
    </span>
  )
}
