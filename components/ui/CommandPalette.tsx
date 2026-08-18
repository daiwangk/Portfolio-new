'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { audioState } from '@/lib/audioState'
import { playSnap, playBass } from '@/lib/audio'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// ─── Types ────────────────────────────────────────────────────────────────────

interface ActionItem {
  id: string
  label: string
  sub?: string
  badge?: string
  keywords?: string
  icon: string
  action: () => void
}

interface ActionGroup {
  group: string
  items: ActionItem[]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

function copy(text: string, label: string) {
  navigator.clipboard.writeText(text).then(() => {
    // Flash a toast via custom event — handled in CommandPalette UI
    window.dispatchEvent(new CustomEvent('cmdpalette:copied', { detail: label }))
  }).catch(() => {})
}

// ─── Action Definitions ───────────────────────────────────────────────────────

function buildActions(onClose: () => void): ActionGroup[] {
  return [
    {
      group: 'Navigate',
      items: [
        { id: 'nav-hero',       icon: '↗', label: 'Go to Hero',       badge: 'G H', keywords: 'home top', action: () => { scrollTo('#hero');       onClose() } },
        { id: 'nav-projects',   icon: '↗', label: 'Go to Projects',   badge: 'G P', keywords: 'work portfolio', action: () => { scrollTo('#projects');   onClose() } },
        { id: 'nav-experience', icon: '↗', label: 'Go to Experience', badge: 'G E', keywords: 'internship work job', action: () => { scrollTo('#experience'); onClose() } },
        { id: 'nav-learning',   icon: '↗', label: 'Go to Learning',   badge: 'G L', keywords: 'study explore', action: () => { scrollTo('#learning');   onClose() } },
        { id: 'nav-about',      icon: '↗', label: 'Go to About',      badge: 'G A', keywords: 'bio cgpa college', action: () => { scrollTo('#about');      onClose() } },
        { id: 'nav-contact',    icon: '↗', label: 'Go to Contact',    badge: 'G C', keywords: 'email phone hire', action: () => { scrollTo('#contact');    onClose() } },
      ],
    },
    {
      group: 'Copy',
      items: [
        { id: 'copy-email',    icon: '⎘', label: 'Copy email address', sub: 'daiwangk@gmail.com', keywords: 'gmail contact mail', action: () => { copy('daiwangk@gmail.com', 'Email copied'); onClose() } },
        { id: 'copy-github',   icon: '⎘', label: 'Copy GitHub URL',   sub: 'github.com/daiwangk', keywords: 'code repo link', action: () => { copy('https://github.com/daiwangk', 'GitHub URL copied'); onClose() } },
        { id: 'copy-linkedin', icon: '⎘', label: 'Copy LinkedIn URL',  sub: 'linkedin.com/in/daiwang-khera-a66b5b25a', action: () => { copy('https://linkedin.com/in/daiwang-khera-a66b5b25a', 'LinkedIn URL copied'); onClose() } },
        { id: 'copy-phone',    icon: '⎘', label: 'Copy phone number',  sub: '+91 92053 31936', action: () => { copy('+919205331936', 'Phone copied'); onClose() } },
      ],
    },
    {
      group: 'Open',
      items: [
        { id: 'open-resume',      icon: '↗', label: 'Open Resume PDF',                   sub: '/resume.pdf',                   action: () => { window.open('/resume.pdf', '_blank'); onClose() } },
        { id: 'open-legal',       icon: '↗', label: 'Open Legal & Financial Case Study',  sub: '/projects/legal-financial',     action: () => { window.location.href = '/projects/legal-financial'; onClose() } },
        { id: 'open-retail-ai',   icon: '↗', label: 'Open Retail AI Case Study',          sub: '/projects/retail-ai',           action: () => { window.location.href = '/projects/retail-ai'; onClose() } },
        { id: 'open-github',      icon: '↗', label: 'Open GitHub profile',                sub: 'github.com/daiwangk',           action: () => { window.open('https://github.com/daiwangk', '_blank'); onClose() } },
        { id: 'open-linkedin',    icon: '↗', label: 'Open LinkedIn profile',              sub: 'linkedin.com/in/daiwang-khera', action: () => { window.open('https://linkedin.com/in/daiwang-khera-a66b5b25a', '_blank'); onClose() } },
      ],
    },
    {
      group: 'Settings',
      items: [
        {
          id: 'toggle-audio', icon: '◎',
          label: audioState.enabled ? 'Disable audio haptics' : 'Enable audio haptics',
          sub: audioState.enabled ? 'Currently ON' : 'Currently OFF',
          keywords: 'sound mute toggle haptic click bass',
          action: () => {
            const next = audioState.toggle()
            if (next) setTimeout(() => playSnap(0.12), 10)
            onClose()
          },
        },
      ],
    },
  ]
}

// ─── Modal Content ────────────────────────────────────────────────────────────

function PaletteModal({ onClose }: { onClose: () => void }) {
  const reduced = useReducedMotion()
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [toastMsg, setToastMsg] = useState('')
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  // Build actions once — settings label changes on re-open which is fine
  const actions = useMemo(() => buildActions(onClose), [onClose])

  // Filter by query
  const filtered = useMemo<ActionGroup[]>(() => {
    if (!query.trim()) return actions
    const q = query.toLowerCase()
    return actions
      .map(g => ({
        ...g,
        items: g.items.filter(
          item =>
            item.label.toLowerCase().includes(q) ||
            item.sub?.toLowerCase().includes(q) ||
            item.keywords?.toLowerCase().includes(q),
        ),
      }))
      .filter(g => g.items.length > 0)
  }, [query, actions])

  const flatItems = useMemo(() => filtered.flatMap(g => g.items), [filtered])

  // Clamp selectedIdx when filtered list changes
  useEffect(() => {
    setSelectedIdx(prev => Math.min(prev, Math.max(flatItems.length - 1, 0)))
  }, [flatItems])

  // Animate in
  useEffect(() => {
    if (reduced) return
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.18, ease: 'power2.out' })
    gsap.fromTo(panelRef.current, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.22, ease: 'power3.out' })
    inputRef.current?.focus()
  }, [reduced])

  const animateClose = useCallback(() => {
    if (reduced) { onClose(); return }
    gsap.to(panelRef.current, { y: 10, opacity: 0, duration: 0.16, ease: 'power2.in' })
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.18, ease: 'power2.in', onComplete: onClose })
  }, [onClose, reduced])

  // Keyboard navigation
  const handleKey = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIdx(i => Math.min(i + 1, flatItems.length - 1))
        playSnap(0.04)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIdx(i => Math.max(i - 1, 0))
        playSnap(0.04)
        break
      case 'Enter':
        e.preventDefault()
        if (flatItems[selectedIdx]) {
          playBass(0.05)
          flatItems[selectedIdx].action()
        }
        break
      case 'Escape':
        e.preventDefault()
        animateClose()
        break
    }
  }, [flatItems, selectedIdx, animateClose])

  // Copy toast
  useEffect(() => {
    const handler = (e: Event) => {
      const msg = (e as CustomEvent).detail as string
      setToastMsg(msg)
      clearTimeout(toastTimer.current)
      toastTimer.current = setTimeout(() => setToastMsg(''), 2000)
    }
    window.addEventListener('cmdpalette:copied', handler)
    return () => window.removeEventListener('cmdpalette:copied', handler)
  }, [])

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 bg-ink/40"
        style={{ backdropFilter: 'blur(4px)' }}
        onClick={animateClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="fixed z-50 top-[14vh] left-1/2 -translate-x-1/2
                   w-full max-w-xl bg-bg border-2 border-ink/20 shadow-2xl"
        onKeyDown={handleKey}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 border-b-2 border-ink/15">
          <span className="font-mono text-[13px] text-n600 select-none">⌘</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIdx(0) }}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent font-mono text-[14px] text-ink
                       placeholder:text-n600 py-4 outline-none border-none"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className="font-mono text-[10px] border border-ink/20 px-1.5 py-0.5 text-n600">
            ESC
          </kbd>
        </div>

        {/* Action list */}
        <div className="max-h-[52vh] overflow-y-auto py-2">
          {filtered.length === 0 && (
            <p className="font-mono text-[12px] text-n600 text-center py-8">
              No results for &quot;{query}&quot;
            </p>
          )}

          {filtered.map(group => {
            let groupOffset = 0
            filtered.forEach((g, gi) => {
              if (gi < filtered.indexOf(group)) groupOffset += g.items.length
            })

            return (
              <div key={group.group}>
                <div className="px-4 pt-3 pb-1">
                  <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-n600">
                    {group.group}
                  </span>
                </div>

                {group.items.map((item, i) => {
                  const globalIdx = groupOffset + i
                  const isSelected = globalIdx === selectedIdx

                  return (
                    <button
                      key={item.id}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left
                                  transition-colors duration-100
                                  ${isSelected ? 'bg-n100' : 'hover:bg-n100/60'}`}
                      onClick={() => { playBass(0.05); item.action() }}
                      onMouseEnter={() => setSelectedIdx(globalIdx)}
                    >
                      {/* Icon */}
                      <span className="font-mono text-[13px] text-red-700 w-5 flex-shrink-0">
                        {item.icon}
                      </span>

                      {/* Label + sub */}
                      <div className="flex-1 min-w-0">
                        <span className="font-sans font-semibold text-[13.5px] text-ink block truncate">
                          {item.label}
                        </span>
                        {item.sub && (
                          <span className="font-mono text-[11px] text-n600 truncate block">
                            {item.sub}
                          </span>
                        )}
                      </div>

                      {/* Badge */}
                      {item.badge && (
                        <div className="flex gap-1 flex-shrink-0">
                          {item.badge.split(' ').map(k => (
                            <kbd
                              key={k}
                              className="font-mono text-[10px] border border-ink/20
                                         px-1.5 py-0.5 text-n700 bg-bg"
                            >
                              {k}
                            </kbd>
                          ))}
                        </div>
                      )}

                      {/* Selected enter hint */}
                      {isSelected && !item.badge && (
                        <kbd className="font-mono text-[10px] border border-ink/20
                                       px-1.5 py-0.5 text-n600 flex-shrink-0">
                          ENTER
                        </kbd>
                      )}
                    </button>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/* Footer bar */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t-2 border-ink/15">
          <span className="font-mono text-[10px] text-n600 tracking-[0.05em]">
            <kbd className="border border-ink/15 px-1 py-0.5">↑</kbd>
            <kbd className="border border-ink/15 px-1 py-0.5 ml-1">↓</kbd>
            {' '}navigate
          </span>
          <span className="font-mono text-[10px] text-n600 tracking-[0.05em]">
            <kbd className="border border-ink/15 px-1 py-0.5">ENTER</kbd>
            {' '}select
          </span>
          <span className="font-mono text-[10px] text-n600 tracking-[0.05em]">
            <kbd className="border border-ink/15 px-1 py-0.5">ESC</kbd>
            {' '}close
          </span>

          {/* Toast */}
          {toastMsg && (
            <span className="ml-auto font-mono text-[10px] text-red-700 tracking-[0.05em]">
              ✓ {toastMsg}
            </span>
          )}
        </div>
      </div>
    </>
  )
}

// ─── Public Component ─────────────────────────────────────────────────────────

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const openPalette = useCallback(() => {
    setOpen(true)
    playSnap(0.08)
  }, [])

  const closePalette = useCallback(() => setOpen(false), [])

  // Global shortcut: Ctrl+K / Cmd+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(prev => {
          if (!prev) playSnap(0.08)
          return !prev
        })
      }
      if (e.key === 'Escape' && open) {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open])

  // Custom event from navbar button
  useEffect(() => {
    const handler = () => openPalette()
    window.addEventListener('open-cmdpalette', handler)
    return () => window.removeEventListener('open-cmdpalette', handler)
  }, [openPalette])

  if (!mounted) return null

  return open
    ? createPortal(<PaletteModal onClose={closePalette} />, document.body)
    : null
}
