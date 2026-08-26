'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

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
  duration = 1800,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || started) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        setStarted(true)

        if (reduced) {
          setValue(target)
          return
        }

        // Stagger start so multiple counters fire slightly offset
        const delay = Math.random() * 120
        setTimeout(() => {
          const startTime = performance.now()
          const step = (now: number) => {
            const p = Math.min(1, (now - startTime) / duration)
            // expo ease-out: feels snappy then settles
            const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p)
            setValue(+(target * eased).toFixed(decimals))
            if (p < 1) requestAnimationFrame(step)
            else setValue(target)
          }
          requestAnimationFrame(step)
        }, delay)
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [target, decimals, duration, started, reduced])

  return (
    <span ref={ref} className={className}>
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  )
}
