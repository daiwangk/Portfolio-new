'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { scrollVelocity } from '@/lib/velocity'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Row 1 — tech stack
const ITEMS_A = [
  'Corrective RAG', '·', 'LangGraph', '·', 'ChromaDB', '·', 'Groq',
  '·', 'FastAPI', '·', 'Rasa NLU', '·', 'Llama 3.2', '·', 'Ollama',
  '·', 'QLoRA Fine-Tuning', '·', 'Multi-Agent Systems', '·',
  'Vector Embeddings', '·', 'Docker', '·', 'n8n Automation', '·',
  'Python', '·', 'Pydantic v2', '·', 'PostgreSQL', '·', 'LlamaIndex', '·',
]

// Row 2 — design / engineering tenets (reverse direction)
const ITEMS_B = [
  'Ship fast', '·', 'No hallucination', '·', 'Grounded answers', '·',
  'Cited responses', '·', 'Local embeddings', '·', 'Ragas evaluation', '·',
  'Persistent storage', '·', 'Async APIs', '·', 'Type-safe', '·',
  'Mobile-first', '·', 'Open to work', '·', 'Gurgaon, India', '·',
  '120fps target', '·', 'Zero FOUC', '·',
]

const STRIP_A = [...ITEMS_A, ...ITEMS_A, ...ITEMS_A]
const STRIP_B = [...ITEMS_B, ...ITEMS_B, ...ITEMS_B]

const BASE_SPEED = 22

function useMarqueeRow(
  trackRef: React.RefObject<HTMLDivElement | null>,
  direction: 1 | -1,
  reduced: boolean,
) {
  useEffect(() => {
    const track = trackRef.current
    if (!track || reduced) return

    const oneCopyWidth = track.scrollWidth / 3
    let xRef = direction === 1 ? 0 : -oneCopyWidth
    let lastTime = performance.now()
    let displayVel = 0

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      displayVel += (scrollVelocity.value - displayVel) * 0.08
      const speed  = (BASE_SPEED + displayVel * 55) * direction

      xRef -= speed * dt

      if (xRef < -oneCopyWidth) xRef += oneCopyWidth
      if (xRef > 0) xRef -= oneCopyWidth

      const skewX = Math.max(-5, Math.min(5, displayVel * 1.8)) * direction

      gsap.set(track, { x: xRef, skewX, force3D: true })
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [trackRef, direction, reduced])
}

export default function Marquee() {
  const trackARef = useRef<HTMLDivElement>(null)
  const trackBRef = useRef<HTMLDivElement>(null)
  const reduced   = useReducedMotion()

  useMarqueeRow(trackARef, 1, reduced)   // forward
  useMarqueeRow(trackBRef, -1, reduced)  // reverse

  const edgeFade = (dir: 'right' | 'left') => (
    <div
      className="absolute inset-y-0 z-10 pointer-events-none w-24"
      style={{
        [dir === 'right' ? 'left' : 'right']: 0,
        background: `linear-gradient(to ${dir}, #f3f2f2, transparent)`,
      }}
    />
  )

  return (
    <div
      className="relative border-y-2 border-ink/15 overflow-hidden bg-bg"
      aria-hidden="true"
    >
      {edgeFade('right')}
      {edgeFade('left')}

      {/* Row A — forward */}
      <div className="py-3 border-b border-ink/10 overflow-hidden">
        <div
          ref={trackARef}
          className="flex items-center gap-0 whitespace-nowrap will-change-transform"
          style={{ width: 'max-content' }}
        >
          {STRIP_A.map((item, i) => (
            <span
              key={i}
              className={
                item === '·'
                  ? 'font-mono text-[13px] text-red mx-5 select-none'
                  : 'font-mono text-[12px] tracking-[0.07em] uppercase text-n700 select-none'
              }
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Row B — reverse */}
      <div className="py-3 overflow-hidden">
        <div
          ref={trackBRef}
          className="flex items-center gap-0 whitespace-nowrap will-change-transform"
          style={{ width: 'max-content' }}
        >
          {STRIP_B.map((item, i) => (
            <span
              key={i}
              className={
                item === '·'
                  ? 'font-mono text-[13px] text-red/60 mx-5 select-none'
                  : 'font-mono text-[12px] tracking-[0.07em] uppercase text-n600 select-none'
              }
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
