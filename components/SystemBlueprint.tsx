'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// System architecture: User → Rasa NLU → FastAPI / Llama 3.2 → Product DB / Response
// Coordinates in a 600×380 viewBox
const NODES = [
  { id: 'user',      x: 300, y: 28,  w: 80,  h: 32, label: 'User',            mono: true },
  { id: 'rasa',      x: 264, y: 112, w: 152, h: 36, label: 'Rasa NLU',        mono: false },
  { id: 'fastapi',   x: 80,  y: 212, w: 152, h: 36, label: 'FastAPI Service',  mono: false },
  { id: 'llama',     x: 368, y: 212, w: 152, h: 36, label: 'Llama 3.2 · Ollama', mono: false },
  { id: 'db',        x: 80,  y: 312, w: 152, h: 36, label: 'Product Database', mono: true },
  { id: 'response',  x: 368, y: 312, w: 152, h: 36, label: 'Response Template',mono: true },
]

// SVG paths connecting nodes (M = moveto, L = lineto)
const PATHS = [
  { id: 'p1', d: 'M 300 60 L 300 112',                       label: 'message' },
  { id: 'p2', d: 'M 264 130 C 200 130, 156 180, 156 212',     label: 'intent + entities' },
  { id: 'p3', d: 'M 416 130 C 480 130, 444 180, 444 212',     label: 'free-text query' },
  { id: 'p4', d: 'M 156 248 L 156 312',                       label: 'REST lookup' },
  { id: 'p5', d: 'M 444 248 L 444 312',                       label: 'generate summary' },
]

export default function SystemBlueprint() {
  const svgRef = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || reduced) return

    const pathEls = svg.querySelectorAll<SVGPathElement>('[data-bp-path]')

    // Measure all paths and set initial dashoffset (hidden)
    pathEls.forEach((path) => {
      const len = path.getTotalLength()
      path.style.strokeDasharray = String(len)
      path.style.strokeDashoffset = String(len)
    })

    // Hide node labels initially
    const nodeGroups = svg.querySelectorAll<SVGGElement>('[data-bp-node]')
    gsap.set(nodeGroups, { opacity: 0 })

    // ScrollTrigger: draw paths as the blueprint section enters view
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: 'top 70%',
        end: 'bottom 40%',
        scrub: 1.2,
      },
    })

    // Stagger paths drawing in sequence
    pathEls.forEach((path, i) => {
      tl.to(
        path,
        { strokeDashoffset: 0, ease: 'none', duration: 1 },
        i * 0.5,
      )
    })

    // Fade in nodes as paths draw into them
    nodeGroups.forEach((node, i) => {
      tl.to(
        node,
        { opacity: 1, duration: 0.4, ease: 'power2.out' },
        i * 0.4 + 0.2,
      )
    })

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [reduced])

  return (
    <div className="border-2 border-ink/15 p-6 md:p-10 bg-ink/[0.015]">
      <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-red-700 block mb-6">
        System Architecture — Retail AI Assistant
      </span>

      <svg
        ref={svgRef}
        viewBox="0 0 600 380"
        className="w-full max-w-2xl"
        style={{ overflow: 'visible' }}
        aria-label="System architecture diagram showing data flow from User through Rasa NLU to FastAPI and Llama 3.2"
      >
        {/* Paths (drawn via scrollTrigger scrub) */}
        {PATHS.map(({ id, d, label }) => (
          <g key={id}>
            {/* Ghost trace — shows full path faintly */}
            <path
              d={d}
              fill="none"
              stroke="#201e1d"
              strokeWidth="1"
              strokeOpacity="0.07"
            />
            {/* Animated drawing path */}
            <path
              data-bp-path
              d={d}
              fill="none"
              stroke="#ec3013"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Path label — midpoint */}
          </g>
        ))}

        {/* Arrow markers */}
        <defs>
          <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 L1.5,3 Z" fill="#ec3013" />
          </marker>
        </defs>

        {/* Nodes */}
        {NODES.map(({ id, x, y, w, h, label, mono }) => (
          <g key={id} data-bp-node transform={`translate(${x - w / 2}, ${y})`}>
            <rect
              width={w}
              height={h}
              fill="#f3f2f2"
              stroke="#201e1d"
              strokeWidth="1.5"
              strokeOpacity="0.5"
              rx="0"
            />
            <text
              x={w / 2}
              y={h / 2 + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={mono ? '10' : '11'}
              fontFamily={mono ? 'JetBrains Mono, monospace' : 'Archivo, sans-serif'}
              fontWeight={mono ? '400' : '700'}
              fill="#201e1d"
            >
              {label}
            </text>
          </g>
        ))}
      </svg>

      <p className="font-mono text-[11px] tracking-[0.05em] text-n600 mt-6">
        Scroll to draw the architecture — paths reveal as data flows through the system.
      </p>
    </div>
  )
}
