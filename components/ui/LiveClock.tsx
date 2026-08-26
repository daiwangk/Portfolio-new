'use client'

import { useEffect, useState } from 'react'

export default function LiveClock() {
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    const format = () => {
      const now = new Date()
      const t = now.toLocaleTimeString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      })
      const d = now.toLocaleDateString('en-IN', {
        timeZone: 'Asia/Kolkata',
        weekday: 'short',
        day: '2-digit',
        month: 'short',
      })
      setTime(t)
      setDate(d)
    }

    format()
    const id = setInterval(format, 1000)
    return () => clearInterval(id)
  }, [])

  if (!time) return null

  return (
    <span className="font-mono text-[12px] text-n600 tracking-[0.04em] tabular-nums">
      <span className="hidden sm:inline text-n700 mr-1.5">{date} ·</span>
      {time}
      <span className="ml-1.5 text-n700">IST</span>
    </span>
  )
}
