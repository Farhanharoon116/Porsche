'use client'

import { useEffect, useRef, useState } from 'react'

const FEATURES = [
  {
    num: '01',
    title: 'Naturally aspirated',
    desc: 'A 4.0-litre flat-six that breathes without forced induction — the last of its kind, engineered in Weissach.',
  },
  {
    num: '02',
    title: '9,000 rpm redline',
    desc: 'One of the highest rev limits of any production Porsche. The wail of a race car, homologated for the road.',
  },
  {
    num: '03',
    title: 'Active aerodynamics',
    desc: 'A swan-neck rear wing and fully variable diffuser, tuned hour after hour in the wind tunnel.',
  },
  {
    num: '04',
    title: 'Forged on the track',
    desc: 'Developed on the Nürburgring Nordschleife alongside the 911 GT3 R race car. Every component validated in anger.',
  },
]

const HERITAGE = [
  { year: '1999', model: '996 GT3' },
  { year: '2006', model: '997 GT3' },
  { year: '2013', model: '991 GT3' },
  { year: '2017', model: '991.2 GT3' },
  { year: '2022', model: '992.1 GT3' },
  { year: '2025', model: '992.2 GT3' },
]

export default function AboutSection() {
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
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full bg-white"
      style={{ padding: '110px 0 90px' }}
    >
      <div
        className={`reveal-section ${visible ? 'visible' : ''} max-w-6xl mx-auto px-6 sm:px-10`}
      >
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-end">
          <div>
            <div className="kicker">About</div>
            <h2
              className="font-display mt-5 font-bold tracking-tight text-[#0a0a0a]"
              style={{ fontSize: 'clamp(2rem, 4.2vw, 3.4rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
            >
              An engineering
              <br />
              obsession.
            </h2>
          </div>
          <p className="text-neutral-600 text-[0.95rem] leading-relaxed lg:pb-2 max-w-lg">
            The 911 GT3 is the purest expression of the 911 philosophy — a car
            built around the driver, for the driver. Every component, every
            ratio, every surface exists for one purpose: to translate intent
            into velocity.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid sm:grid-cols-2 gap-x-10 gap-y-10">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="border-t border-black/10 pt-6"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.7s ${0.15 + i * 0.12}s ease`,
              }}
            >
              <div className="font-display text-neutral-400 text-sm font-medium">{f.num}</div>
              <h3 className="font-display mt-3 text-xl font-bold text-[#0a0a0a]">{f.title}</h3>
              <p className="mt-2 text-neutral-600 text-[0.9rem] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Heritage strip */}
        <div
          className="mt-16 border-t border-black/10 pt-8"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s 0.7s ease',
          }}
        >
          <div className="text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-neutral-500 mb-5">
            A lineage of speed
          </div>
          <div className="flex flex-wrap gap-3">
            {HERITAGE.map((g, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 border border-black/10 rounded-full px-4 py-2"
              >
                <span className="font-display text-[#9E221D] text-xs font-bold">{g.year}</span>
                <span className="text-xs font-semibold text-[#0a0a0a]">{g.model}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
