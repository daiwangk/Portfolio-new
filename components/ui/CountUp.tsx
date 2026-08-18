'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpProps {
  target: number
  decimals?: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}

export default function CountUp({
  target,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1400,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el || started) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setStarted(true)
        observer.disconnect()

        const startTime = performance.now()
        const step = (now: number) => {
          const p = Math.min(1, (now - startTime) / duration)
          const eased = 1 - Math.pow(1 - p, 3) // ease-out cubic
          setValue(target * eased)
          if (p < 1) requestAnimationFrame(step)
          else setValue(target)
        }
        requestAnimationFrame(step)
      },
      { threshold: 0.6 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, decimals, duration, started])

  return (
    <span ref={ref} className={className}>
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  )
}
