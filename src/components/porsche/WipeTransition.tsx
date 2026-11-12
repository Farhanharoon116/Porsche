'use client'

import { useEffect, useState } from 'react'

interface WipeTransitionProps {
  trigger: boolean
  onComplete?: () => void
  delay?: number
}

/**
 * GT3 RS Wipe Transition - three layered wipes that cover the screen
 * (Deep Oxblood → Satin Charcoal → Obsidian Black) then exit.
 * Total animation duration: ~5 seconds (1.5s in + 0.1 stay + 1.5s out, staggered).
 */
export default function WipeTransition({ trigger, onComplete, delay = 0 }: WipeTransitionProps) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (trigger) {
      const t1 = setTimeout(() => setActive(true), delay)
      const t2 = setTimeout(() => {
        onComplete?.()
      }, delay + 5000)
      return () => {
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
  }, [trigger, delay, onComplete])

  if (!trigger) return null

  return (
    <div className="wipe-container" style={{ pointerEvents: active ? 'all' : 'none' }}>
      <div
        className="wipe wipe-1"
        style={{
          animation: `wipeIn 1.5s forwards, wipeStay 0.1s 1.5s forwards, wipeOut 1.5s 3.1s forwards`,
        }}
      />
      <div
        className="wipe wipe-2"
        style={{
          animation: `wipeIn 1.5s 0.2s forwards, wipeStay 0.1s 1.7s forwards, wipeOut 1.5s 3.3s forwards`,
        }}
      />
      <div
        className="wipe wipe-3"
        style={{
          animation: `wipeIn 1.5s 0.4s forwards, wipeStay 0.1s 1.9s forwards, wipeOut 1.5s 3.5s forwards`,
        }}
      />
    </div>
  )
}
