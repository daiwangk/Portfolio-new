'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export const ROOT_ID = 'page-root'

const DESKTOP_MQ = '(min-width: 1024px)'
const LERP = 0.07
const IDLE_EPSILON = 0.0008

function buildPathD(pts: [number, number][]): string {
  if (pts.length < 2) return ''
  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[Math.min(pts.length - 1, i + 2)]
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`
  }
  return d
}

export default function RedThread() {
  const svgRef = useRef<SVGSVGElement>(null)
  const traceRef = useRef<SVGPathElement>(null)
  const lineRef = useRef<SVGPathElement>(null)
  const tipRef = useRef<SVGCircleElement>(null)
  const tipRingRef = useRef<SVGCircleElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!window.matchMedia(DESKTOP_MQ).matches) return

    const root = document.getElementById(ROOT_ID)
    const svg = svgRef.current
    const trace = traceRef.current
    const line = lineRef.current
    const tip = tipRef.current
    const tipRing = tipRingRef.current
    if (!root || !svg || !trace || !line || !tip || !tipRing) return

    let pathLength = 0
    let rootTop = 0
    let rootHeight = 1
    let contactTop = 0
    let progress = 0
    let target = 0
    let visible = !document.hidden

    const topOf = (selector: string) => {
      const el = root.querySelector(selector)
      if (!el) return 0
      return el.getBoundingClientRect().top + window.scrollY - rootTop
    }

    const build = () => {
      const W = root.clientWidth
      const H = root.scrollHeight
      rootHeight = H
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`)
      rootTop = root.getBoundingClientRect().top + window.scrollY

      const hero = root.querySelector('#hero')
      const heroTop = topOf('#hero')
      const heroH = hero instanceof HTMLElement ? hero.offsetHeight : 520
      const gutter = Math.min(40, W * 0.035)
      const right = W - gutter
      const left = gutter
      const mid = W * 0.5
      const marqueeMid = topOf('#marquee') + 24

      contactTop = topOf('#contact')

      const pts: [number, number][] = [
        [left + 24, heroTop + 72],
        [W * 0.76, heroTop + heroH * 0.2],
        [W * 0.58, heroTop + heroH * 0.48],
        [W * 0.84, heroTop + heroH * 0.76],
        [right, marqueeMid],
        [mid, topOf('#projects') + 1],
        [right, topOf('#projects') + 260],
        [right, topOf('#experience') - 160],
        [mid, topOf('#experience') + 1],
        [left, topOf('#experience') + 120],
        [left, topOf('#learning') - 90],
        [mid, topOf('#learning') + 1],
        [right, topOf('#learning') + 140],
        [right, topOf('#about') - 80],
        [mid, topOf('#about') + 1],
        [left, topOf('#about') + 160],
        [left, contactTop - 60],
        [mid, contactTop + 40],
      ]

      const d = buildPathD(pts)
      line.setAttribute('d', d)
      trace.setAttribute('d', d)
      pathLength = line.getTotalLength()
      line.style.strokeDasharray = `${pathLength}`
    }

    const setDraw = (p: number) => {
      if (pathLength <= 0) return

      line.style.strokeDashoffset = `${pathLength * (1 - p)}`
      const pt = line.getPointAtLength(pathLength * p)

      tip.setAttribute('cx', `${pt.x}`)
      tip.setAttribute('cy', `${pt.y}`)
      tipRing.setAttribute('cx', `${pt.x}`)
      tipRing.setAttribute('cy', `${pt.y}`)

      const atEnd = p > 0.992
      tip.style.opacity = atEnd ? '0' : '1'
      tipRing.style.opacity = atEnd ? '0' : '0.85'

      const contactFade =
        pt.y >= contactTop - 48
          ? Math.max(0, 1 - (pt.y - contactTop + 48) / 140)
          : 1
      svg.style.opacity = `${0.5 + contactFade * 0.5}`
    }

    const targetFromScroll = () => {
      const seen = window.scrollY + window.innerHeight * 0.85 - rootTop
      return Math.max(0.04, Math.min(1, seen / Math.max(1, rootHeight)))
    }

    const scheduleRebuild = () => {
      build()
      target = targetFromScroll()
      setDraw(reduced ? 1 : progress)
    }

    build()
    target = targetFromScroll()
    progress = target

    if (reduced) {
      line.style.strokeDashoffset = '0'
      tip.style.opacity = '0'
      tipRing.style.opacity = '0'
      svg.style.opacity = '0.45'
      return
    }

    const tick = () => {
      if (!visible) return

      const nextTarget = targetFromScroll()
      if (Math.abs(nextTarget - target) > IDLE_EPSILON) target = nextTarget

      const delta = target - progress
      if (Math.abs(delta) < IDLE_EPSILON) return

      progress += delta * LERP
      setDraw(progress)
    }
    gsap.ticker.add(tick)

    let resizeTimer: ReturnType<typeof setTimeout>
    const debouncedRebuild = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(scheduleRebuild, 200)
    }

    const onVisibility = () => {
      visible = !document.hidden
      if (visible) {
        target = targetFromScroll()
        setDraw(progress)
      }
    }

    window.addEventListener('resize', debouncedRebuild)
    document.addEventListener('visibilitychange', onVisibility)

    const ro = new ResizeObserver(debouncedRebuild)
    ro.observe(root)

    const onRefresh = () => debouncedRebuild()
    ScrollTrigger.addEventListener('refresh', onRefresh)

    const settleTimer = setTimeout(scheduleRebuild, 1400)
    const pinSettleTimer = setTimeout(scheduleRebuild, 2600)

    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleRebuild).catch(() => {})
    }

    return () => {
      gsap.ticker.remove(tick)
      clearTimeout(resizeTimer)
      clearTimeout(settleTimer)
      clearTimeout(pinSettleTimer)
      window.removeEventListener('resize', debouncedRebuild)
      document.removeEventListener('visibilitychange', onVisibility)
      ScrollTrigger.removeEventListener('refresh', onRefresh)
      ro.disconnect()
    }
  }, [reduced])

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-[5] hidden lg:block"
      style={{ opacity: 0.85 }}
    >
      <path ref={traceRef} fill="none" stroke="#ec3013" strokeWidth={2} opacity={0.11} />
      <path
        ref={lineRef}
        fill="none"
        stroke="#ec3013"
        strokeWidth={2.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        ref={tipRingRef}
        r={7}
        fill="none"
        stroke="#f3f2f2"
        strokeWidth={2}
        opacity={0.85}
      />
      <circle ref={tipRef} r={4.5} fill="#ec3013" />
    </svg>
  )
}
