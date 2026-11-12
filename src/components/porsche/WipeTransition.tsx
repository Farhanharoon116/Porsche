'use client'

import { useEffect, useState } from 'react'

interface WipeTransitionProps {
  trigger: boolean
  /** Fired once the screen is fully covered (~2s) — safe to reveal content underneath */
  onCovered?: () => void
  /** Fired when all wipes have exited (~5.5s) */
  onDone?: () => void
  delay?: number
}

/**
 * GT3 RS Wipe Transition — three layered wipes that cover the screen
 * (Carmine Crimson → Charcoal → Obsidian Black) then exit.
 */
export default function WipeTransition({ trigger, onCovered, onDone, delay = 0 }: WipeTransitionProps) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (trigger) {
      const t0 = setTimeout(() => setActive(true), delay)
      const t1 = setTimeout(() => onCovered?.(), delay + 2100)
      const t2 = setTimeout(() => onDone?.(), delay + 5500)
      return () => {
        clearTimeout(t0)
        clearTimeout(t1)
        clearTimeout(t2)
      }
    }
  }, [trigger, delay, onCovered, onDone])

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
