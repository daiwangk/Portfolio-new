'use client'

import { useState, useEffect } from 'react'
import { audioState } from '@/lib/audioState'
import { playSnap } from '@/lib/audio'

export default function AudioToggle() {
  const [enabled, setEnabled] = useState(true)

  // Read initial state after hydration
  useEffect(() => {
    audioState.init()
    setEnabled(audioState.enabled)
  }, [])

  const toggle = () => {
    const next = audioState.toggle()
    setEnabled(next)
    if (next) {
      // Play confirmation snap when audio is re-enabled
      setTimeout(() => playSnap(0.12), 10)
    }
  }

  return (
    <button
      onClick={toggle}
      className="font-mono text-[11px] tracking-[0.09em] uppercase text-n600
                 hover:text-ink transition-colors duration-200 flex items-center gap-1
                 border border-ink/20 px-2 py-1 hover:border-ink/50 select-none"
      title={enabled ? 'Disable audio feedback' : 'Enable audio feedback'}
      aria-label={`Audio feedback ${enabled ? 'on' : 'off'}`}
    >
      <span className="text-[9px]">{enabled ? '●' : '○'}</span>
      <span>SND</span>
    </button>
  )
}
