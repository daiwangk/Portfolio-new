import { useEffect, useRef } from 'react'
import './CustomCursor.css'

function CustomCursor() {
    const dotRef = useRef(null)

    useEffect(() => {
        if (!window.matchMedia('(pointer: fine)').matches) return

        const dot = dotRef.current
        if (!dot) return

        const onMouseMove = (e) => {
            dot.style.left = `${e.clientX}px`
            dot.style.top = `${e.clientY}px`
        }

        const onMouseOver = (e) => {
            if (e.target.closest?.('a, button')) {
                dot.classList.add('cursor-dot--hover')
            }
        }

        const onMouseOut = (e) => {
            const from = e.target.closest?.('a, button')
            if (!from) return
            const to = e.relatedTarget
            if (!to?.closest?.('a, button')) {
                dot.classList.remove('cursor-dot--hover')
            }
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseover', onMouseOver)
        document.addEventListener('mouseout', onMouseOut)

        return () => {
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseover', onMouseOver)
            document.removeEventListener('mouseout', onMouseOut)
        }
    }, [])

    return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
}

export default CustomCursor
