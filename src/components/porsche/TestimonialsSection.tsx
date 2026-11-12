'use client'

import { useEffect, useRef, useState } from 'react'

const QUOTES = [
  {
    quote:
      'The 9,000-rpm wail is something no turbo car will ever give you. Every drive feels like a track day — even the commute.',
    name: 'Daniel R.',
    role: 'GT3 owner · Munich',
    initials: 'DR',
  },
  {
    quote:
      'Spec’d the Weissach package and never looked back. It is the sharpest, most honest tool I have ever driven on circuit.',
    name: 'Mia K.',
    role: 'Track enthusiast · Innsbruck',
    initials: 'MK',
  },
  {
    quote:
      'I drive it to the office during the week and to the Nürburgring on weekends. Nothing else balances both lives like this car.',
    name: 'Jonas W.',
    role: 'Collector · Zurich',
    initials: 'JW',
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true)
      },
      { threshold: 0.12 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="w-full bg-white">
      <div className={`reveal-section ${visible ? 'visible' : ''} max-w-6xl mx-auto px-6 sm:px-10 py-24`}>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="kicker">Owners</div>
            <h2
              className="font-display mt-5 font-bold tracking-tight text-[#0a0a0a]"
              style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
            >
              Words from the road.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {QUOTES.map((q, i) => (
            <figure
              key={i}
              className="min-card p-7 flex flex-col"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.7s ${0.15 + i * 0.12}s ease`,
              }}
            >
              <div className="text-[#9E221D] text-sm mb-4" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((s) => (
                  <i key={s} className="fa-solid fa-star mr-1 text-[0.65rem]" />
                ))}
              </div>
              <blockquote className="text-neutral-700 text-[0.92rem] leading-relaxed flex-1">
                “{q.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-black/8 pt-5">
                <span className="w-10 h-10 rounded-full bg-[#0a0a0a] text-white font-display text-xs font-bold flex items-center justify-center">
                  {q.initials}
                </span>
                <span>
                  <span className="block text-sm font-bold text-[#0a0a0a]">{q.name}</span>
                  <span className="block text-xs text-neutral-500 mt-0.5">{q.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
