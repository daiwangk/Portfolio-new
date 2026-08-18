'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

// CRAG State Machine Architecture
// ViewBox: 600 × 400
// Main loop: Query → Retrieve ← ChromaDB → Grade → (Relevant? Generate) / (Not Relevant → Rewrite → Retrieve)

const NODES = [
  { id: 'query',    x: 220, y: 20,  w: 160, h: 34, label: 'User Query',           mono: true  },
  { id: 'chromadb', x: 400, y: 110, w: 170, h: 34, label: 'ChromaDB (MiniLM)',    mono: true  },
  { id: 'retrieve', x: 160, y: 110, w: 140, h: 34, label: 'RETRIEVE',              mono: false },
  { id: 'grade',    x: 160, y: 200, w: 140, h: 34, label: 'GRADE (8B-Instant)',    mono: false },
  { id: 'generate', x: 400, y: 200, w: 170, h: 34, label: 'GENERATE (70B)',        mono: false },
  { id: 'rewrite',  x: 160, y: 300, w: 140, h: 34, label: 'REWRITE (max 2×)',      mono: false },
]

const PATHS = [
  // Query → Retrieve
  { id: 'p-qr',   d: 'M 300 54 L 230 110',                                 label: 'embed query'    },
  // ChromaDB → Retrieve (semantic search)
  { id: 'p-cr',   d: 'M 400 127 L 300 127',                                 label: 'top-k chunks'   },
  // Retrieve → Grade
  { id: 'p-rg',   d: 'M 230 144 L 230 200',                                 label: 'chunks'         },
  // Grade → Generate (relevant)
  { id: 'p-gg',   d: 'M 300 217 L 400 217',                                 label: 'relevant ✓'     },
  // Grade → Rewrite (not relevant)
  { id: 'p-gr',   d: 'M 230 234 L 230 300',                                 label: 'not relevant'   },
  // Rewrite → Retrieve (retry loop)
  { id: 'p-loop', d: 'M 160 317 C 60 317 60 127 160 127',                  label: 'retry'          },
]

const PATH_LABELS: Record<string, { x: number; y: number }> = {
  'p-qr':   { x: 260, y: 80  },
  'p-cr':   { x: 342, y: 120 },
  'p-rg':   { x: 240, y: 175 },
  'p-gg':   { x: 345, y: 210 },
  'p-gr':   { x: 242, y: 272 },
  'p-loop': { x: 40,  y: 230 },
}

export default function CRAGBlueprint() {
  const svgRef = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || reduced) return

    const pathEls = svg.querySelectorAll<SVGPathElement>('[data-crag-path]')

    pathEls.forEach((path) => {
      const len = path.getTotalLength()
      path.style.strokeDasharray = String(len)
      path.style.strokeDashoffset = String(len)
    })

    const nodeGroups = svg.querySelectorAll<SVGGElement>('[data-crag-node]')
    gsap.set(nodeGroups, { opacity: 0 })

    const labelEls = svg.querySelectorAll<SVGTextElement>('[data-crag-label]')
    gsap.set(labelEls, { opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: 'top 72%',
        end: 'bottom 35%',
        scrub: 1.4,
      },
    })

    // Draw paths with stagger
    pathEls.forEach((path, i) => {
      tl.to(path, { strokeDashoffset: 0, ease: 'none', duration: 1 }, i * 0.6)
    })

    // Reveal nodes as paths reach them
    nodeGroups.forEach((node, i) => {
      tl.to(node, { opacity: 1, duration: 0.35, ease: 'power2.out' }, i * 0.35 + 0.2)
    })

    // Reveal path labels last
    tl.to(labelEls, { opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' }, '>-0.2')

    return () => {
      tl.scrollTrigger?.kill()
      tl.kill()
    }
  }, [reduced])

  return (
    <div className="border-2 border-ink/15 p-6 md:p-8 bg-ink/[0.015]">
      <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-red-700 block mb-5">
        CRAG State Machine — LangGraph Architecture
      </span>

      <svg
        ref={svgRef}
        viewBox="0 0 600 360"
        className="w-full max-w-2xl"
        style={{ overflow: 'visible' }}
        aria-label="CRAG state machine diagram: Query flows through Retrieve, Grade, Generate or Rewrite loop"
      >
        {/* Ghost traces */}
        {PATHS.map(({ id, d }) => (
          <path
            key={`ghost-${id}`}
            d={d}
            fill="none"
            stroke="#201e1d"
            strokeWidth="1"
            strokeOpacity="0.07"
          />
        ))}

        {/* Animated drawing paths */}
        {PATHS.map(({ id, d }) => (
          <path
            key={id}
            data-crag-path
            d={d}
            fill="none"
            stroke="#ec3013"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        ))}

        {/* Path labels */}
        {PATHS.map(({ id, label }) => {
          const pos = PATH_LABELS[id]
          return (
            <text
              key={`label-${id}`}
              data-crag-label
              x={pos.x}
              y={pos.y}
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              fill="#7c7977"
              textAnchor="middle"
            >
              {label}
            </text>
          )
        })}

        {/* Nodes */}
        {NODES.map(({ id, x, y, w, h, label, mono }) => (
          <g key={id} data-crag-node transform={`translate(${x}, ${y})`}>
            <rect
              width={w}
              height={h}
              fill="#f3f2f2"
              stroke="#201e1d"
              strokeWidth="1.5"
              strokeOpacity="0.5"
            />
            <text
              x={w / 2}
              y={h / 2 + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={mono ? '10' : '11'}
              fontFamily={mono ? 'JetBrains Mono, monospace' : 'Archivo, sans-serif'}
              fontWeight={mono ? '500' : '700'}
              fill="#201e1d"
            >
              {label}
            </text>
          </g>
        ))}
      </svg>

      <p className="font-mono text-[11px] tracking-[0.04em] text-n600 mt-5">
        Scroll through the section — the pipeline draws itself as data flows from query to grounded answer.
      </p>
    </div>
  )
}
