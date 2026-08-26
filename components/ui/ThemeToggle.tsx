'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  // Read saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem('dk-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved ? saved === 'dark' : prefersDark
    setDark(isDark)
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
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
      className="font-mono text-[11px] tracking-[0.07em] uppercase
                 border border-ink/20 px-2.5 py-1.5 text-n600
                 hover:border-ink/50 hover:text-ink
                 transition-colors duration-200 select-none
                 hidden sm:flex items-center gap-1.5"
    >
      <span aria-hidden="true">{dark ? '◑' : '◐'}</span>
      <span className="hidden md:inline">{dark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
