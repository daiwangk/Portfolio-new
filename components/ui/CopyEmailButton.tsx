'use client'

import { useCallback, useState } from 'react'
import Toast from '@/components/ui/Toast'

const EMAIL = 'daiwangk@gmail.com'
const COPY_DURATION = 2000

export function useCopyEmail() {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(async (e?: React.MouseEvent) => {
    e?.preventDefault()
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), COPY_DURATION)
    } catch {
      // Fallback: open mailto
      window.location.href = `mailto:${EMAIL}`
    }
  }, [])

  return { copied, copy }
}

/** Drop-in email button that copies on click + shows toast */
export default function CopyEmailButton({ className = '', label = EMAIL }: {
  className?: string
  label?: string
}) {
  const { copied, copy } = useCopyEmail()

  return (
    <>
      <button
        onClick={copy}
        className={`font-mono text-[12px] tracking-[0.06em] uppercase
                    hover:text-red transition-colors duration-200 cursor-pointer
                    ${className}`}
        title="Click to copy email"
        aria-label="Copy email address"
      >
        {copied ? '[ Copied! ]' : label}
      </button>
      <Toast message="[ Email copied! ]" visible={copied} />
    </>
  )
}
