/**
 * Shared mutable audio enabled state.
 * Written by AudioToggle, read by lib/audio.ts before playing any sound.
 * Persisted to localStorage.
 */

const KEY = 'dk-audio-enabled'

function readFromStorage(): boolean {
  if (typeof window === 'undefined') return true
  const stored = localStorage.getItem(KEY)
  return stored === null ? true : stored === 'true'
}

export const audioState = {
  enabled: false, // initialised on first client read
  init() {
    this.enabled = readFromStorage()
  },
  toggle() {
    this.enabled = !this.enabled
    if (typeof window !== 'undefined') {
      localStorage.setItem(KEY, String(this.enabled))
    }
    return this.enabled
  },
}
