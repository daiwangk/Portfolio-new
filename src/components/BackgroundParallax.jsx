import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import './BackgroundParallax.css'

/**
 * BackgroundParallax - Subtle mouse-tracking parallax background
 * 
 * Motion Logic:
 * 1. Track mouse position relative to viewport center (0,0 = center)
 * 2. Normalize to range [-1, 1] based on viewport dimensions
 * 3. Multiply by max offset (20px) for subtle movement
 * 4. Use Framer Motion's useSpring for smooth, damped interpolation
 * 5. Orb moves in OPPOSITE direction to mouse (parallax depth illusion)
 * 
 * The spring config (stiffness: 50, damping: 30) creates a slow, 
 * smooth follow that lags behind the cursor by ~200-300ms
 */

function BackgroundParallax() {
    const [isEnabled, setIsEnabled] = useState(true)

    // Spring values for smooth interpolation - two orbs with different configs
    const orb1X = useSpring(0, { stiffness: 40, damping: 30 })
    const orb1Y = useSpring(0, { stiffness: 40, damping: 30 })
    const orb2X = useSpring(0, { stiffness: 25, damping: 40 })
    const orb2Y = useSpring(0, { stiffness: 25, damping: 40 })

    useEffect(() => {
        // Disable on mobile or if reduced motion preferred
        const isMobile = window.matchMedia('(max-width: 768px)').matches
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (isMobile || prefersReducedMotion) {
            setIsEnabled(false)
            return
        }

        const handleMouseMove = (e) => {
            const centerX = window.innerWidth / 2
            const centerY = window.innerHeight / 2
            const normalizedX = (e.clientX - centerX) / centerX
            const normalizedY = (e.clientY - centerY) / centerY

            // First orb moves opposite to cursor
            orb1X.set(-normalizedX * 30)
            orb1Y.set(-normalizedY * 30)

            // Second orb moves slower, same direction (depth effect)
            orb2X.set(normalizedX * 15)
            orb2Y.set(normalizedY * 15)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [orb1X, orb1Y, orb2X, orb2Y])

    if (!isEnabled) {
        // Static fallback for mobile/reduced motion
        return (
            <div className="parallax-bg">
                <div className="parallax-orb parallax-orb-1" />
                <div className="parallax-grid" />
            </div>
        )
    }

    return (
        <div className="parallax-bg">
            <motion.div className="parallax-orb parallax-orb-1" style={{ x: orb1X, y: orb1Y }} />
            <motion.div className="parallax-orb parallax-orb-2" style={{ x: orb2X, y: orb2Y }} />
            <div className="parallax-grid" />
        </div>
    )
}

export default BackgroundParallax
