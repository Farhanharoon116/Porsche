'use client'

import { useEffect, useRef, useState } from 'react'

const STEPS = [
  {
    num: '01',
    title: 'Configure',
    desc: 'Build your GT3 in the Porsche configurator — paint, interior, Weissach package — alongside your Porsche Centre.',
  },
  {
    num: '02',
    title: 'Test drive',
    desc: 'Feel the flat-six on public roads first. Your Porsche Centre will arrange a drive tailored to you.',
  },
  {
    num: '03',
    title: 'Track experience',
    desc: 'Sharpen your craft with the Porsche Sport Driving School on the circuits where the GT3 was born.',
  },
  {
    num: '04',
    title: 'Delivery',
    desc: 'Take handover at the Zuffenhausen factory or your nearest Porsche Centre — the start of a long relationship.',
  },
]

export default function ProcessSection() {
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
    <section ref={sectionRef} className="w-full bg-[#f7f7f5] border-y border-black/5">
      <div className={`reveal-section ${visible ? 'visible' : ''} max-w-6xl mx-auto px-6 sm:px-10 py-24`}>
        <div className="kicker">How it works</div>
        <h2
          className="font-display mt-5 font-bold tracking-tight text-[#0a0a0a] max-w-xl"
          style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
        >
          From config to tarmac.
        </h2>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className="relative border-t border-black/10 pt-6"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.7s ${0.15 + i * 0.12}s ease`,
              }}
            >
              <div className="font-display text-4xl font-bold text-black/10">{s.num}</div>
              <h3 className="font-display mt-4 text-lg font-bold text-[#0a0a0a]">{s.title}</h3>
              <p className="mt-2 text-neutral-600 text-[0.85rem] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
