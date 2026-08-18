'use client'

import dynamic from 'next/dynamic'

const GrainCanvas = dynamic(() => import('@/components/canvas/GrainCanvas'), {
  ssr: false,
  loading: () => null,
})

const SectionProgress = dynamic(() => import('@/components/ui/SectionProgress'), {
  ssr: false,
  loading: () => null,
})

const CommandPalette = dynamic(() => import('@/components/ui/CommandPalette'), {
  ssr: false,
  loading: () => null,
})

const SplashScreen = dynamic(() => import('@/components/ui/SplashScreen'), {
  ssr: false,
  loading: () => null,
})

const ScrollJourneyLine = dynamic(() => import('@/components/ui/ScrollJourneyLine'), {
  ssr: false,
  loading: () => null,
})

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), {
  ssr: false,
  loading: () => null,
})

// Named exports used directly in page.tsx (server component safe)
export const MarqueeClient = dynamic(() => import('@/components/ui/Marquee'), {
  ssr: false,
  loading: () => (
    <div className="border-y-2 border-ink/15 py-3.5 bg-bg" aria-hidden="true" />
  ),
})

export const FrameHUDClient = dynamic(() => import('@/components/ui/FrameHUD'), {
  ssr: false,
  loading: () => (
    <span className="font-mono text-[11px] text-n600 tracking-[0.04em]">
      [ — FPS | —ms | — ]
    </span>
  ),
})

export default function ClientOverlays() {
  return (
    <>
      {/* Entry splash — shown once per session */}
      <SplashScreen />

      {/* Custom cursor — pointer devices only */}
      <CustomCursor />

      {/* Fixed canvas overlays */}
      <GrainCanvas />

      {/* Left scroll journey line */}
      <ScrollJourneyLine />

      {/* Right section progress rail */}
      <SectionProgress />

      {/* Global ⌘K command palette */}
      <CommandPalette />
    </>
  )
}
