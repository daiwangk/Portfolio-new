import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './SplashIntro.css'

const greetings = ["Hello", "Namaste", "नमस्कारः", "こんにちは", "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", "Bonjour", "Hola"]

// Check for reduced motion preference
const prefersReducedMotion = () => 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

function SplashIntro({ onComplete }) {
    const [phase, setPhase] = useState('greetings') // greetings | tagline | name | ready
    const [greetingIndex, setGreetingIndex] = useState(0)
    const [showButton, setShowButton] = useState(false)

    const handleComplete = useCallback(() => {
        sessionStorage.setItem('splashShown', 'true')
        onComplete()
    }, [onComplete])

    // Skip animation if reduced motion is preferred
    useEffect(() => {
        if (prefersReducedMotion()) {
            setPhase('ready')
            setShowButton(true)
        }
    }, [])

    // Greetings sequence
    useEffect(() => {
        if (phase !== 'greetings') return

        if (greetingIndex < greetings.length - 1) {
            const timer = setTimeout(() => {
                setGreetingIndex(prev => prev + 1)
            }, 400)
            return () => clearTimeout(timer)
        } else {
            const timer = setTimeout(() => {
                setPhase('tagline')
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [phase, greetingIndex])

    // Tagline → Name transition
    useEffect(() => {
        if (phase === 'tagline') {
            const timer = setTimeout(() => setPhase('name'), 1200)
            return () => clearTimeout(timer)
        }
        if (phase === 'name') {
            const timer = setTimeout(() => {
                setPhase('ready')
                setShowButton(true)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [phase])

    // Auto-navigate after button appears
    useEffect(() => {
        if (showButton) {
            const timer = setTimeout(handleComplete, 3000)
            return () => clearTimeout(timer)
        }
    }, [showButton, handleComplete])

    const fadeVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    }

    return (
        <div className="splash">
            <div className="splash-content">
                <AnimatePresence mode="wait">
                    {phase === 'greetings' && (
                        <motion.h1
                            key={`greeting-${greetingIndex}`}
                            className="splash-greeting"
                            variants={fadeVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.2 }}
                        >
                            {greetings[greetingIndex]}
                        </motion.h1>
                    )}

                    {phase === 'tagline' && (
                        <motion.p
                            key="tagline"
                            className="splash-tagline"
                            variants={fadeVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            transition={{ duration: 0.3 }}
                        >
                            I build AI & backend systems<br />
                            <span className="tagline-accent">while learning every day</span>
                        </motion.p>
                    )}

                    {(phase === 'name' || phase === 'ready') && (
                        <motion.div
                            key="name"
                            className="splash-name-section"
                            variants={fadeVariants}
                            initial="hidden"
                            animate="visible"
                            transition={{ duration: 0.4 }}
                        >
                            <h1 className="splash-name">Daiwang Khera</h1>
                            <p className="splash-subtitle">
                                AI / Backend Developer · 2026 Graduate
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showButton && (
                        <motion.button
                            className="splash-cta"
                            onClick={handleComplete}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            Enter Portfolio →
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default SplashIntro
