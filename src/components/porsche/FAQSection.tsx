'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const FAQS = [
  {
    q: 'Is the 911 GT3 available with a manual gearbox?',
    a: 'Yes. A six-speed manual with short, precise throws is available, while the seven-speed PDK dual-clutch transmission is offered for those who prioritise shift speed and lap times. Both drive the rear wheels exclusively.',
  },
  {
    q: 'What is the difference between the GT3 and the GT3 RS?',
    a: 'The GT3 RS produces 518 hp (up from 502), carries a wider track, and generates significantly more downforce through larger active aero surfaces. The RS is more track-focused; the GT3 remains the balanced choice for road and track.',
  },
  {
    q: 'Can I take my GT3 to the track?',
    a: 'Absolutely — it is engineered for it. Motorsport-derived cooling, a track-tuned chassis and optional Porsche Ceramic Composite Brakes (PCCB) make extended track sessions possible straight from the factory. Many owners also join Porsche Sport Driving School events.',
  },
  {
    q: 'What is the Weissach Package?',
    a: 'A track-focused option set named after Porsche’s development centre. It adds carbon-fibre reinforced polymer (CFRP) components such as the roll bar and anti-roll bars, plus optional forged magnesium wheels — shaving weight where it matters most.',
  },
  {
    q: 'How is a GT3 maintained?',
    a: 'The naturally aspirated racing-derived engine follows a dedicated maintenance schedule, handled by certified technicians at every Porsche Centre. Regular oil analyses and inspection intervals keep the flat-six at full health.',
  },
]

export default function FAQSection() {
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
    <section ref={sectionRef} className="w-full bg-white border-t border-black/5">
      <div className={`reveal-section ${visible ? 'visible' : ''} max-w-6xl mx-auto px-6 sm:px-10 py-24`}>
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="kicker">FAQ</div>
            <h2
              className="font-display mt-5 font-bold tracking-tight text-[#0a0a0a]"
              style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
            >
              Questions,
              <br />
              answered.
            </h2>
            <p className="mt-4 text-neutral-600 text-[0.9rem] leading-relaxed max-w-xs">
              Everything you need to know before your first GT3 experience.
            </p>
          </div>

          <div className="lg:col-span-3">
            <Accordion type="single" collapsible className="w-full">
              {FAQS.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-black/8">
                  <AccordionTrigger className="font-display text-left text-[0.98rem] font-semibold text-[#0a0a0a] hover:no-underline hover:text-[#9E221D] py-5">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-600 text-[0.9rem] leading-relaxed">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
