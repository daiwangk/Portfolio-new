import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useAnimationFrame } from 'framer-motion'
import './AIOrb.css'

/**
 * AIOrb - Subtle "thinking" ambient orb animation
 * 
 * Motion Logic:
 * 1. BASE FLOAT: Orb follows a slow circular/figure-8 path using sine waves
 *    - Uses time-based animation (useAnimationFrame)
 *    - X = sin(t * 0.5) * 30px, Y = sin(t * 0.7) * 20px (Lissajous curve)
 * 
 * 2. MOUSE ATTRACTION: On mouse move, orb shifts slightly toward cursor
 *    - Max 15px offset, with inverse-square falloff
 *    - Uses useSpring for smooth, damped interpolation
 * 
 * 3. PULSE: Gentle scale animation (1 → 1.08 → 1) via CSS keyframes
 *    - Separate from position for better performance
 * 
 * Combined: basePosition + mouseOffset = final position
 * Result: Calm, organic, "alive" feeling without being distracting
 */

function AIOrb() {
    const [isEnabled, setIsEnabled] = useState(true)
    const [basePos, setBasePos] = useState({ x: 0, y: 0 })
    const timeRef = useRef(0)

    // Spring for mouse attraction (very soft)
    const springConfig = { stiffness: 30, damping: 40, mass: 1.5 }
    const mouseOffsetX = useSpring(0, springConfig)
    const mouseOffsetY = useSpring(0, springConfig)

    // Check for mobile/reduced motion
    useEffect(() => {
        const isMobile = window.matchMedia('(max-width: 768px)').matches ||
                         'ontouchstart' in window
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (isMobile || prefersReducedMotion) {
            setIsEnabled(false)
        }
    }, [])

    // Floating animation using Lissajous curve - full screen coverage
    useAnimationFrame((time) => {
        if (!isEnabled) return
        
        timeRef.current = time / 1000 // Convert to seconds
        const t = timeRef.current

        // Lissajous curve covering most of viewport
        // Slower frequencies (0.15, 0.1) = ~40-60 second full cycle
        // Amplitude based on viewport size
        const amplitudeX = window.innerWidth * 0.35
        const amplitudeY = window.innerHeight * 0.3
        
        const x = Math.sin(t * 0.15) * amplitudeX + Math.sin(t * 0.08) * (amplitudeX * 0.3)
        const y = Math.sin(t * 0.1) * amplitudeY + Math.cos(t * 0.12) * (amplitudeY * 0.25)

        setBasePos({ x, y })
    })

    // Mouse attraction
    useEffect(() => {
        if (!isEnabled) return

        const handleMouseMove = (e) => {
            // Orb's resting position (center of viewport)
            const orbCenterX = window.innerWidth * 0.5
            const orbCenterY = window.innerHeight * 0.5

            // Distance from cursor to orb center
            const dx = e.clientX - orbCenterX
            const dy = e.clientY - orbCenterY
            const distance = Math.sqrt(dx * dx + dy * dy)

            // Attraction strength (stronger when closer, max 20px)
            const maxAttraction = 20
            const attractionRadius = 600 // pixels
            const strength = Math.max(0, 1 - distance / attractionRadius)

            // Normalize direction and apply strength
            if (distance > 0) {
                mouseOffsetX.set((dx / distance) * strength * maxAttraction)
                mouseOffsetY.set((dy / distance) * strength * maxAttraction)
            }
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [isEnabled, mouseOffsetX, mouseOffsetY])

    if (!isEnabled) return null

    return (
        <div className="ai-orb-container">
            <motion.div
                className="ai-orb"
                style={{
                    x: basePos.x,
                    y: basePos.y,
                    translateX: mouseOffsetX,
                    translateY: mouseOffsetY,
                }}
            >
                <div className="ai-orb-core" />
                <div className="ai-orb-glow" />
            </motion.div>
        </div>
    )
}

export default AIOrb
