'use client'

import dynamic from 'next/dynamic'

const GrainCanvas = dynamic(() => import('@/components/canvas/GrainCanvas'), {
  ssr: false,
  loading: () => null,
})

// Right progress rail — desktop only (hidden on mobile via CSS)
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

const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), {
  ssr: false,
  loading: () => null,
})

// Named exports used directly in page.tsx
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

      {/* Custom cursor — pointer (desktop) only, component self-guards on touch */}
      <CustomCursor />

      {/* GLSL grain overlay */}
      <GrainCanvas />

      {/* Right section progress rail — hidden on mobile */}
      <div className="hidden md:block">
        <SectionProgress />
      </div>

      {/* Global ⌘K command palette */}
      <CommandPalette />
    </>
  )
}
