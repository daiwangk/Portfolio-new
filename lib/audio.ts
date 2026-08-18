/**
 * Web Audio API micro-haptics.
 * Synthesizes a 12–15ms low-pass click when magnetic buttons snap.
 * Uses a single shared AudioContext (created on first call to avoid
 * autoplay policy issues — must be called from a user gesture).
 */

import { audioState } from './audioState'

let _ctx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!_ctx) {
    _ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
  }
  if (_ctx.state === 'suspended') {
    _ctx.resume().catch(() => {})
  }
  return _ctx
}

/** 12ms synthesized click for magnetic button snaps */
export function playSnap(volume = 0.1): void {
  if (typeof window === 'undefined' || !audioState.enabled) return
  try {
    const ctx = getCtx()
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    // Low-pass click: 800 Hz sweep → 120 Hz over 12 ms
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(1400, now)
    filter.frequency.exponentialRampToValueAtTime(120, now + 0.012)
    filter.Q.value = 0.4

    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, now)
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.012)

    gain.gain.setValueAtTime(volume, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.015)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.02)

    // Cleanup nodes after they finish
    osc.onended = () => {
      osc.disconnect()
      filter.disconnect()
      gain.disconnect()
    }
  } catch {
    // Fail silently — audio is purely additive
  }
}

/**
 * 40Hz sub-bass thump for section boundary transitions.
 * Short, punchy, barely audible — purely tactile on headphones.
 */
export function playBass(volume = 0.08): void {
  if (typeof window === 'undefined' || !audioState.enabled) return
  try {
    const ctx = getCtx()
    const now = ctx.currentTime

    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    filter.type = 'lowpass'
    filter.frequency.value = 80
    filter.Q.value = 1.2

    osc.type = 'sine'
    osc.frequency.setValueAtTime(40, now)
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.08)

    gain.gain.setValueAtTime(volume, now)
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now)
    osc.stop(now + 0.1)

    osc.onended = () => {
      osc.disconnect()
      filter.disconnect()
      gain.disconnect()
    }
  } catch {
    // Fail silently
  }
}
