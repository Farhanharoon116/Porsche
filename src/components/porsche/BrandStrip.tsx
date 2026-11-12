'use client'

const MODELS = [
  '911 GT3',
  '911 GT3 RS',
  '911 GT3 Touring',
  '911 GT3 R',
  '911 GT2 RS',
  '911 Turbo S',
  '718 Cayman GT4 RS',
  'Taycan',
]

export default function BrandStrip() {
  const items = [...MODELS, ...MODELS]
  return (
    <section className="w-full bg-white border-b border-black/5 overflow-hidden py-7">
      <div className="marquee-track items-center">
        {items.map((m, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className="font-display text-sm sm:text-base font-medium tracking-[0.24em] uppercase text-neutral-400 px-8">
              {m}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E221D] shrink-0" />
          </span>
        ))}
      </div>
    </section>
  )
}
