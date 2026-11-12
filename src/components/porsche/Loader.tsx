'use client'

import { useEffect } from 'react'

interface LoaderProps {
  onComplete: () => void
}

/**
 * Minimal loader — a single small spinning ring. No numbers, no text.
 */
export default function Loader({ onComplete }: LoaderProps) {
  useEffect(() => {
    const t = setTimeout(onComplete, 1500)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <div className="loader-screen" aria-busy="true" role="status">
      <div className="loader-ring" />
    </div>
  )
}
