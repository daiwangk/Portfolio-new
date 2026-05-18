import { useRef, useLayoutEffect, useCallback } from 'react'
import gsap from 'gsap'
import './Hero.css'

const LINE1 = 'DAIWANG'
const LINE2 = 'KHERA'
const MARQUEE_TEXT =
    'RAG PIPELINES · LANGGRAPH · FASTAPI · CORRECTIVE RAG · LLM INTEGRATION · CHROMADB · N8N AUTOMATION · OPEN TO WORK · '
const MIN_FONT_PX = 48
const MAX_FONT_PX = 280

function splitChars(text) {
    return [...text].map((char, i) => (
        <span key={i} className="hero-char-wrap" aria-hidden="true">
            <span className="hero-char">{char}</span>
        </span>
    ))
}

function fitNameLines(line1, line2, targetWidth) {
    let low = MIN_FONT_PX
    let high = MAX_FONT_PX

    const applySize = (px) => {
        const size = `${px}px`
        line1.style.fontSize = size
        line2.style.fontSize = size
    }

    while (high - low > 0.25) {
        const mid = (low + high) / 2
        applySize(mid)
        const fits =
            line1.scrollWidth <= targetWidth &&
            line2.scrollWidth <= targetWidth
        if (fits) low = mid
        else high = mid
    }

    applySize(low)

    while (
        (line1.scrollWidth < targetWidth - 1 || line2.scrollWidth < targetWidth - 1) &&
        low < MAX_FONT_PX
    ) {
        low += 0.25
        applySize(low)
        if (line1.scrollWidth > targetWidth || line2.scrollWidth > targetWidth) {
            low -= 0.25
            applySize(low)
            break
        }
    }
}

function Hero() {
    const heroRef = useRef(null)
    const nameBlockRef = useRef(null)
    const nameRef = useRef(null)
    const line1Ref = useRef(null)
    const line2Ref = useRef(null)

    const fitName = useCallback(() => {
        const block = nameBlockRef.current
        const line1 = line1Ref.current
        const line2 = line2Ref.current
        if (!block || !line1 || !line2) return

        const targetWidth = block.clientWidth
        fitNameLines(line1, line2, targetWidth)
    }, [])

    useLayoutEffect(() => {
        let cancelled = false
        let gsapCtx

        const init = async () => {
            if (document.fonts?.ready) {
                await document.fonts.ready
            }
            if (cancelled) return

            fitName()

            gsapCtx = gsap.context(() => {
                const nameChars = nameRef.current?.querySelectorAll('.hero-char')
                if (nameChars?.length) {
                    gsap.from(nameChars, {
                        yPercent: 100,
                        opacity: 0,
                        duration: 0.7,
                        stagger: 0.04,
                        ease: 'power3.out',
                    })
                }
            }, heroRef)
        }

        init()

        const onResize = () => fitName()
        window.addEventListener('resize', onResize)

        return () => {
            cancelled = true
            window.removeEventListener('resize', onResize)
            gsapCtx?.revert()
        }
    }, [fitName])

    return (
        <section className="hero" id="hero" ref={heroRef}>
            <div className="hero-center">
                <div className="hero-name-block" ref={nameBlockRef}>
                    <h1 className="hero-name" ref={nameRef}>
                        <span className="hero-line" ref={line1Ref} aria-label={LINE1}>
                            {splitChars(LINE1)}
                        </span>
                        <span className="hero-name-rule" aria-hidden="true" />
                        <span
                            className="hero-line hero-line--outline"
                            ref={line2Ref}
                            aria-label={LINE2}
                        >
                            {splitChars(LINE2)}
                        </span>
                    </h1>

                    <div className="hero-marquee" aria-hidden="true">
                        <div className="hero-marquee-track">
                            <span>{MARQUEE_TEXT}</span>
                            <span>{MARQUEE_TEXT}</span>
                        </div>
                    </div>

                    <div className="hero-meta">
                        <p className="hero-meta-col hero-meta-col--left">
                            AI · ML · Automation
                        </p>
                        <span className="hero-meta-divider" aria-hidden="true" />
                        <p className="hero-meta-col hero-meta-col--right">
                            Gurgaon · India · 2026
                        </p>
                    </div>

                    <p className="hero-epigraph">
                        — Building AI systems that ship, not just demo —
                    </p>
                </div>
            </div>

            <footer className="hero-bottom">
                <div className="hero-bottom-left">
                    <a href="#projects" className="hero-cta">
                        View my work →
                    </a>
                    <span className="hero-year">2026</span>
                </div>
                <span className="hero-bottom-line" aria-hidden="true" />
                <a href="#experience" className="hero-scroll">
                    <span className="hero-scroll-label">Scroll ↓</span>
                </a>
            </footer>
        </section>
    )
}

export default Hero
