'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  // Sync icon state with theme set by the blocking <head> script (or system default)
  useEffect(() => {
    setDark(document.documentElement.dataset.theme === 'dark')
  }, [])

  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    localStorage.setItem('dk-theme', next ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={dark ? 'Light mode' : 'Dark mode'}
      className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.07em] uppercase
                 border border-ink/20 px-2 py-1.5 sm:px-2.5 text-n600
                 hover:border-ink/50 hover:text-ink
                 transition-colors duration-200 select-none shrink-0"
    >
      <span aria-hidden="true">{dark ? '◑' : '◐'}</span>
      <span className="hidden md:inline">{dark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
