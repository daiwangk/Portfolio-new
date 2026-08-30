import { ImageResponse } from 'next/og'

// Brand tokens — same values as globals.css / tailwind (build-time, no CSS vars)
const INK = '#201e1d'
const BG = '#f3f2f2'
const RED = '#ec3013'

export const runtime = 'edge'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: INK,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 2,
            height: '100%',
            background: RED,
          }}
        />
        <span
          style={{
            color: BG,
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: '-0.04em',
            lineHeight: 1,
            paddingLeft: 2,
          }}
        >
          DK
        </span>
      </div>
    ),
    { ...size },
  )
}
