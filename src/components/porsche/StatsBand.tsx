'use client'

const STATS = [
  { value: '502', unit: 'hp', label: 'Power Output' },
  { value: '3.4', unit: 's', label: '0–100 km/h' },
  { value: '9,000', unit: 'rpm', label: 'Redline' },
  { value: '318', unit: 'km/h', label: 'Top Speed' },
]

export default function StatsBand() {
  return (
    <section className="w-full bg-white border-b border-black/5">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12 sm:py-14">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`text-center py-4 ${i > 0 ? 'lg:border-l lg:border-black/8' : ''} ${
                i % 2 === 1 ? 'border-l border-black/8 lg:border-l' : ''
              }`}
            >
              <div className="font-display flex items-baseline justify-center gap-1">
                <span
                  className="font-bold text-[#0a0a0a]"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: '-0.03em' }}
                >
                  {s.value}
                </span>
                <span className="text-[#9E221D] font-semibold text-sm sm:text-base">{s.unit}</span>
              </div>
              <div className="mt-1.5 text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-neutral-500">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
