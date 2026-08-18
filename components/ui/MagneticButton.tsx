'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, type MotionStyle } from 'framer-motion'
import { playSnap } from '@/lib/audio'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  href?: string
  onClick?: () => void
  target?: string
  rel?: string
  variant?: 'primary' | 'ghost' | 'ghost-on-red'
  'data-cursor'?: string
}

const springConfig = { stiffness: 300, damping: 28, mass: 0.5 }

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  target,
  rel,
  variant = 'ghost',
  'data-cursor': dataCursor,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)
  const reduced = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(dx * 0.28)
    y.set(dy * 0.22)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  const handleEnter = () => {
    playSnap(0.06)
  }

  const variantClass = {
    primary: 'bg-red text-bg border-red hover:bg-red-700 hover:border-red-700',
    ghost: 'bg-transparent text-ink border-ink hover:bg-ink/5',
    'ghost-on-red': 'bg-transparent text-bg border-bg hover:bg-bg/10',
  }[variant]

  const baseClass = `inline-flex items-center gap-2.5 px-5 py-3 font-sans font-bold text-[15px] border-2 cursor-pointer no-underline transition-colors duration-150 select-none ${variantClass} ${className}`

  const motionStyle: MotionStyle = reduced ? {} : { x: springX, y: springY }

  const sharedProps = {
    ref,
    style: motionStyle,
    onPointerMove: handleMove,
    onPointerLeave: handleLeave,
    onPointerEnter: handleEnter,
  }

  if (href) {
    return (
      <motion.a
        {...sharedProps}
        href={href}
        target={target}
        rel={rel}
        className={baseClass}
        data-cursor={dataCursor}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      {...sharedProps}
      onClick={onClick}
      className={baseClass}
      data-cursor={dataCursor}
    >
      {children}
    </motion.button>
  )
}
