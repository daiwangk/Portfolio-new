import { useEffect, useRef } from 'react'
import './CustomCursor.css'

function CustomCursor() {
    const cursorRef = useRef(null)

    useEffect(() => {
        if (!window.matchMedia('(pointer: fine)').matches) return

        const cursor = cursorRef.current
        if (!cursor) return

        const onMouseMove = (e) => {
            cursor.style.left = `${e.clientX}px`
            cursor.style.top = `${e.clientY}px`
        }

        const onMouseOver = (e) => {
            if (e.target.closest?.('a, button')) {
                cursor.classList.add('cursor-diamond--hover')
            }
        }

        const onMouseOut = (e) => {
            const from = e.target.closest?.('a, button')
            if (!from) return
            const to = e.relatedTarget
            if (!to?.closest?.('a, button')) {
                cursor.classList.remove('cursor-diamond--hover')
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

    return <div ref={cursorRef} className="cursor-diamond" aria-hidden="true" />
}

export default CustomCursor
