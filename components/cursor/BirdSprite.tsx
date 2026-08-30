'use client'

import { forwardRef, type CSSProperties, type MutableRefObject, type Ref } from 'react'

const CREAM = '#f5e6d3'
const ORANGE = '#ec3013'
const INK = '#201e1d'

type Group = 'body' | 'wingL' | 'wingR'

/** 16×16 pixel grid — cream body, orange accents on tips/beak/belly only */
const PIXELS: { x: number; y: number; c: string; g: Group }[] = [
  // Wing / ear tips (orange)
  { x: 4, y: 2, c: ORANGE, g: 'wingL' },
  { x: 5, y: 2, c: ORANGE, g: 'wingL' },
  { x: 10, y: 2, c: ORANGE, g: 'wingR' },
  { x: 11, y: 2, c: ORANGE, g: 'wingR' },
  // Head (cream)
  { x: 5, y: 3, c: CREAM, g: 'body' },
  { x: 6, y: 3, c: CREAM, g: 'body' },
  { x: 7, y: 3, c: CREAM, g: 'body' },
  { x: 8, y: 3, c: CREAM, g: 'body' },
  { x: 9, y: 3, c: CREAM, g: 'body' },
  { x: 10, y: 3, c: CREAM, g: 'body' },
  { x: 4, y: 4, c: CREAM, g: 'wingL' },
  { x: 5, y: 4, c: CREAM, g: 'wingL' },
  { x: 6, y: 4, c: CREAM, g: 'body' },
  { x: 7, y: 4, c: CREAM, g: 'body' },
  { x: 8, y: 4, c: CREAM, g: 'body' },
  { x: 9, y: 4, c: CREAM, g: 'body' },
  { x: 10, y: 4, c: CREAM, g: 'body' },
  { x: 11, y: 4, c: CREAM, g: 'wingR' },
  // Face row — eye + cheek
  { x: 4, y: 5, c: CREAM, g: 'wingL' },
  { x: 5, y: 5, c: CREAM, g: 'wingL' },
  { x: 6, y: 5, c: CREAM, g: 'body' },
  { x: 7, y: 5, c: CREAM, g: 'body' },
  { x: 8, y: 5, c: INK, g: 'body' },
  { x: 9, y: 5, c: CREAM, g: 'body' },
  { x: 10, y: 5, c: CREAM, g: 'body' },
  { x: 11, y: 5, c: CREAM, g: 'wingR' },
  // Beak
  { x: 5, y: 6, c: CREAM, g: 'wingL' },
  { x: 6, y: 6, c: CREAM, g: 'body' },
  { x: 7, y: 6, c: CREAM, g: 'body' },
  { x: 8, y: 6, c: CREAM, g: 'body' },
  { x: 9, y: 6, c: CREAM, g: 'body' },
  { x: 10, y: 6, c: ORANGE, g: 'body' },
  { x: 11, y: 6, c: ORANGE, g: 'body' },
  { x: 12, y: 6, c: ORANGE, g: 'body' },
  // Torso
  { x: 5, y: 7, c: CREAM, g: 'wingL' },
  { x: 6, y: 7, c: CREAM, g: 'body' },
  { x: 7, y: 7, c: CREAM, g: 'body' },
  { x: 8, y: 7, c: CREAM, g: 'body' },
  { x: 9, y: 7, c: CREAM, g: 'body' },
  { x: 10, y: 7, c: CREAM, g: 'body' },
  { x: 11, y: 7, c: CREAM, g: 'wingR' },
  // Belly patch (orange accent)
  { x: 6, y: 8, c: CREAM, g: 'body' },
  { x: 7, y: 8, c: ORANGE, g: 'body' },
  { x: 8, y: 8, c: ORANGE, g: 'body' },
  { x: 9, y: 8, c: ORANGE, g: 'body' },
  { x: 10, y: 8, c: CREAM, g: 'body' },
  // Lower body / tail
  { x: 6, y: 9, c: CREAM, g: 'body' },
  { x: 7, y: 9, c: CREAM, g: 'body' },
  { x: 8, y: 9, c: CREAM, g: 'body' },
  { x: 9, y: 9, c: CREAM, g: 'body' },
  { x: 8, y: 10, c: CREAM, g: 'body' },
  { x: 9, y: 10, c: CREAM, g: 'body' },
  { x: 8, y: 11, c: ORANGE, g: 'body' },
]

export interface BirdSpriteRefs {
  wingL: SVGGElement | null
  wingR: SVGGElement | null
  body: SVGGElement | null
  eye: SVGRectElement | null
}

interface BirdSpriteProps {
  className?: string
  style?: CSSProperties
  spriteRefs?: MutableRefObject<BirdSpriteRefs>
}

function PixelGroup({
  id,
  group,
  innerRef,
}: {
  id: Group
  group: Group
  innerRef?: Ref<SVGGElement>
}) {
  return (
    <g ref={innerRef} style={{ transformOrigin: `${id === 'wingL' ? '6px 4px' : id === 'wingR' ? '10px 4px' : '8px 8px'}` }}>
      {PIXELS.filter((p) => p.g === group).map((p) => (
        <rect
          key={`${p.x}-${p.y}`}
          x={p.x}
          y={p.y}
          width={1}
          height={1}
          fill={p.c}
          data-eye={p.c === INK ? 'true' : undefined}
        />
      ))}
    </g>
  )
}

const BirdSprite = forwardRef<SVGSVGElement, BirdSpriteProps>(function BirdSprite(
  { className = '', style, spriteRefs },
  ref,
) {
  return (
    <svg
      ref={ref}
      viewBox="0 0 16 16"
      width={16}
      height={16}
      className={className}
      style={{ display: 'block', ...style }}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <PixelGroup
        id="wingL"
        group="wingL"
        innerRef={(el) => {
          if (spriteRefs) spriteRefs.current.wingL = el
        }}
      />
      <PixelGroup
        id="wingR"
        group="wingR"
        innerRef={(el) => {
          if (spriteRefs) spriteRefs.current.wingR = el
        }}
      />
      <g
        ref={(el) => {
          if (spriteRefs) spriteRefs.current.body = el
        }}
        style={{ transformOrigin: '8px 8px' }}
      >
        {PIXELS.filter((p) => p.g === 'body').map((p) => (
          <rect
            key={`${p.x}-${p.y}`}
            ref={(el) => {
              if (p.c === INK && spriteRefs) spriteRefs.current.eye = el
            }}
            x={p.x}
            y={p.y}
            width={1}
            height={1}
            fill={p.c}
          />
        ))}
      </g>
    </svg>
  )
})

export default BirdSprite
