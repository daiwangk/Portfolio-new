'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface ToastProps {
  message: string
  visible: boolean
}

export default function Toast({ message, visible }: ToastProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    if (visible) {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.2, ease: 'power2.out' }
      )
    } else {
      gsap.to(ref.current, { opacity: 0, y: 4, duration: 0.15, ease: 'power2.in' })
    }
  }, [visible])

  return (
    <div
      ref={ref}
      aria-live="polite"
      className="fixed bottom-8 left-1/2 z-[300] pointer-events-none"
      style={{ transform: 'translateX(-50%)', opacity: 0 }}
    >
      <span className="font-mono text-[12px] tracking-[0.1em] uppercase
                       bg-ink text-bg px-4 py-2.5 border-2 border-ink
                       dark:bg-bg dark:text-ink">
        {message}
      </span>
    </div>
  )
}
