'use client'

import { useEffect, useRef, useState } from 'react'

interface WipeTransitionProps {
  trigger: boolean
  /** Fired once the screen is fully covered (~2s) — safe to reveal content underneath */
  onCovered?: () => void
  /** Fired when all wipes have exited (~5.5s) */
  onDone?: () => void
  delay?: number
}

/**
 * GT3 Wipe Transition — three layered wipes that cover the screen
 * (Carmine Crimson → Charcoal → Obsidian Black) then exit.
 *
 * Important: the container unmounts itself once finished. If it stayed
 * mounted it would keep covering the viewport (fixed, z-index 9999) and
 * swallow every click on the page — navbar / hero buttons would go dead.
 */
export default function WipeTransition({ trigger, onCovered, onDone, delay = 0 }: WipeTransitionProps) {
  const [active, setActive] = useState(false)
  const [finished, setFinished] = useState(false)

  // Keep callbacks in refs so the timers below are set up exactly once
  // per trigger and are never reset by parent re-renders.
  const coveredRef = useRef(onCovered)
  const doneRef = useRef(onDone)
  useEffect(() => {
    coveredRef.current = onCovered
    doneRef.current = onDone
  }, [onCovered, onDone])

  useEffect(() => {
    if (!trigger) return
    const t0 = setTimeout(() => setActive(true), delay)
    const t1 = setTimeout(() => coveredRef.current?.(), delay + 2100)
    const t2 = setTimeout(() => doneRef.current?.(), delay + 5500)
    const t3 = setTimeout(() => setFinished(true), delay + 5600)
    return () => {
      clearTimeout(t0)
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [trigger, delay])

  // Fully remove the overlay (and its pointer events) once done.
  if (!trigger || finished) return null

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
