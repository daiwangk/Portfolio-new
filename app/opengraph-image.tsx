import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Daiwang Khera — AI/ML Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#201e1d',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '72px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top-left label */}
        <span
          style={{
            position: 'absolute',
            top: 52,
            left: 72,
            color: '#7c7977',
            fontSize: 13,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: 'monospace',
          }}
        >
          Portfolio — 2026
        </span>

        {/* Ghost oversized DK */}
        <span
          style={{
            position: 'absolute',
            top: 20,
            right: 60,
            fontSize: 380,
            fontWeight: 900,
            color: 'rgba(243,242,242,0.03)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
          }}
        >
          DK
        </span>

        {/* Red accent line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 4,
            height: '100%',
            background: '#ec3013',
          }}
        />

        {/* Main name */}
        <span
          style={{
            fontSize: 76,
            fontWeight: 900,
            color: '#f3f2f2',
            letterSpacing: '-0.025em',
            lineHeight: 1,
            marginBottom: 20,
          }}
        >
          DAIWANG KHERA
        </span>

        {/* Subtitle */}
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 18,
            color: '#7c7977',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: 40,
          }}
        >
          AI · ML Engineer · Backend Systems
        </span>

        {/* Tag row */}
        <div style={{ display: 'flex', gap: 12 }}>
          {['LangGraph', 'ChromaDB', 'FastAPI', 'Groq', 'Next.js'].map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'monospace',
                fontSize: 12,
                color: '#ec3013',
                border: '1px solid rgba(236,48,19,0.3)',
                padding: '4px 10px',
                letterSpacing: '0.06em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size },
  )
}
