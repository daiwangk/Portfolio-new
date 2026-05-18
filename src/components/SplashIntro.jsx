import { useState, useEffect, useCallback } from 'react'
import './SplashIntro.css'

const GREETINGS = [
    { word: 'HELLO', lang: 'English' },
    { word: 'NAMASTE', lang: 'Hindi' },
    { word: 'SAT SRI AKAL', lang: 'Punjabi' },
    { word: 'BONJOUR', lang: 'French' },
    { word: 'HOLA', lang: 'Spanish' },
    { word: 'CIAO', lang: 'Italian' },
    { word: 'SALVE', lang: 'Latin' },
    { word: 'ΓΕΙΑ ΣΑΣ', lang: 'Greek' },
    { word: 'مرحبا', lang: 'Arabic', rtl: true },
    { word: 'こんにちは', lang: 'Japanese' },
]

const WORD_MS = 280
const EXIT_MS = 600

const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

function SplashIntro({ onComplete }) {
    const [index, setIndex] = useState(0)
    const [exiting, setExiting] = useState(false)

    const finish = useCallback(() => {
        sessionStorage.setItem('splashShown', 'true')
        onComplete()
    }, [onComplete])

    useEffect(() => {
        if (prefersReducedMotion()) {
            finish()
            return
        }

        let step = 0
        const interval = setInterval(() => {
            step += 1
            if (step < GREETINGS.length) {
                setIndex(step)
            } else {
                clearInterval(interval)
                setExiting(true)
            }
        }, WORD_MS)

        return () => clearInterval(interval)
    }, [finish])

    useEffect(() => {
        if (!exiting) return

        const timer = setTimeout(finish, EXIT_MS)
        return () => clearTimeout(timer)
    }, [exiting, finish])

    const handleAnimationEnd = (e) => {
        if (e.target !== e.currentTarget) return
        if (e.animationName === 'splash-exit' && exiting) {
            finish()
        }
    }

    if (prefersReducedMotion()) {
        return null
    }

    const current = GREETINGS[index]

    return (
        <div
            className={`splash ${exiting ? 'splash--exit' : ''}`}
            onAnimationEnd={handleAnimationEnd}
            aria-hidden={exiting}
            aria-live="polite"
        >
            <div className="splash-content">
                <h1
                    className="splash-word"
                    dir={current.rtl ? 'rtl' : 'ltr'}
                    lang={current.lang.toLowerCase()}
                >
                    {current.word}
                </h1>
                <p className="splash-lang">{current.lang}</p>
            </div>
        </div>
    )
}

export default SplashIntro
