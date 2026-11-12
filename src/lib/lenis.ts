import Lenis from 'lenis'

let lenis: Lenis | null = null
let rafHandle: number | null = null

/**
 * Initialize Locomotive-style smooth scrolling (Lenis engine — the
 * modern successor of Locomotive Scroll, built by the same team).
 * Respects prefers-reduced-motion.
 */
export function initLenis(): Lenis | null {
  if (typeof window === 'undefined') return null
  if (lenis) return lenis
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return null

  lenis = new Lenis({
    duration: 1.15,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 1.5,
  })

  const raf = (time: number) => {
    lenis?.raf(time)
    rafHandle = requestAnimationFrame(raf)
  }
  rafHandle = requestAnimationFrame(raf)

  return lenis
}

export function getLenis(): Lenis | null {
  return lenis
}

export function scrollToId(id: string, offset = -110) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    lenis.scrollTo(el, { offset, duration: 1.3 })
  } else {
    const top = el.getBoundingClientRect().top + window.pageYOffset + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

export function destroyLenis() {
  if (rafHandle !== null) cancelAnimationFrame(rafHandle)
  rafHandle = null
  lenis?.destroy()
  lenis = null
}
