import { useEffect, useRef } from 'react'
import './CustomCursor.css'

const LERP = 0.12

function CustomCursor() {
    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const mouse = useRef({ x: -100, y: -100 })
    const ringPos = useRef({ x: -100, y: -100 })
    const hovering = useRef(false)
    const rafId = useRef(null)

    useEffect(() => {
        if (!window.matchMedia('(pointer: fine)').matches) return

        const dot = dotRef.current
        const ring = ringRef.current
        if (!dot || !ring) return

        const onMouseMove = (e) => {
            mouse.current.x = e.clientX
            mouse.current.y = e.clientY

            dot.style.left = `${e.clientX}px`
            dot.style.top = `${e.clientY}px`
        }

        const onMouseOver = (e) => {
            if (e.target.closest?.('a, button')) {
                hovering.current = true
                ring.classList.add('cursor-ring--hover')
            }
        }

        const onMouseOut = (e) => {
            const from = e.target.closest?.('a, button')
            if (!from) return
            const to = e.relatedTarget
            if (!to?.closest?.('a, button')) {
                hovering.current = false
                ring.classList.remove('cursor-ring--hover')
            }
        }

        const tick = () => {
            ringPos.current.x += (mouse.current.x - ringPos.current.x) * LERP
            ringPos.current.y += (mouse.current.y - ringPos.current.y) * LERP

            const scale = hovering.current ? 1.8 : 1
            ring.style.left = `${ringPos.current.x}px`
            ring.style.top = `${ringPos.current.y}px`
            ring.style.transform = `translate(-50%, -50%) scale(${scale})`

            rafId.current = requestAnimationFrame(tick)
        }

        rafId.current = requestAnimationFrame(tick)

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseover', onMouseOver)
        document.addEventListener('mouseout', onMouseOut)

        return () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseover', onMouseOver)
            document.removeEventListener('mouseout', onMouseOut)
            if (rafId.current) cancelAnimationFrame(rafId.current)
        }
    }, [])

    return (
        <>
            <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
            <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
        </>
    )
}

export default CustomCursor
