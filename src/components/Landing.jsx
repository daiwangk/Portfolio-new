import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Landing.css'

const greetings = [
    { text: "Hello", lang: "English" },
    { text: "नमस्ते", lang: "Hindi" },
    { text: "Hola", lang: "Spanish" },
    { text: "Bonjour", lang: "French" },
    { text: "こんにちは", lang: "Japanese" },
    { text: "你好", lang: "Chinese" },
    { text: "Ciao", lang: "Italian" },
    { text: "مرحبا", lang: "Arabic" },
    { text: "Olá", lang: "Portuguese" },
    { text: "Привет", lang: "Russian" },
    { text: "안녕하세요", lang: "Korean" },
    { text: "Hallo", lang: "German" },
]

function Landing({ onComplete }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isExiting, setIsExiting] = useState(false)

    useEffect(() => {
        if (currentIndex < greetings.length - 1) {
            const timer = setTimeout(() => {
                setCurrentIndex(prev => prev + 1)
            }, 180) // Speed of cycling through greetings
            return () => clearTimeout(timer)
        } else {
            // After last greeting, wait a moment then exit
            const exitTimer = setTimeout(() => {
                setIsExiting(true)
            }, 500)
            return () => clearTimeout(exitTimer)
        }
    }, [currentIndex])

    useEffect(() => {
        if (isExiting) {
            const completeTimer = setTimeout(() => {
                onComplete()
            }, 800) // Duration of exit animation
            return () => clearTimeout(completeTimer)
        }
    }, [isExiting, onComplete])

    return (
        <motion.div
            className="landing"
            initial={{ opacity: 1 }}
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
            <div className="landing-bg">
                <div className="landing-orb orb-land-1"></div>
                <div className="landing-orb orb-land-2"></div>
            </div>

            <div className="landing-content">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        className="greeting-wrapper"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.1, ease: "easeOut" }}
                    >
                        <h1 className="greeting-text">{greetings[currentIndex].text}</h1>
                        <span className="greeting-lang">{greetings[currentIndex].lang}</span>
                    </motion.div>
                </AnimatePresence>

                {/* Progress dots */}
                <div className="greeting-progress">
                    {greetings.map((_, index) => (
                        <motion.div
                            key={index}
                            className={`progress-dot ${index <= currentIndex ? 'active' : ''}`}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: index === currentIndex ? 1.3 : 1 }}
                            transition={{ duration: 0.2 }}
                        />
                    ))}
                </div>
            </div>

            {/* Skip button */}
            <motion.button
                className="skip-btn"
                onClick={() => setIsExiting(true)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Skip →
            </motion.button>
        </motion.div>
    )
}

export default Landing
