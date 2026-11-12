'use client'

import { useEffect, useRef, useState } from 'react'

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setVisible(true)
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const specs = [
    {
      category: 'Engine',
      icon: 'fa-solid fa-gears',
      items: [
        { label: 'Configuration', value: 'Naturally aspirated flat-six' },
        { label: 'Displacement', value: '3,996 cc' },
        { label: 'Power', value: '502 hp (375 kW) at 8,400 rpm' },
        { label: 'Torque', value: '465 Nm at 6,100 rpm' },
        { label: 'Redline', value: '9,000 rpm' },
      ],
    },
    {
      category: 'Drivetrain',
      icon: 'fa-solid fa-microchip',
      items: [
        { label: 'Transmission', value: '7-speed PDK (dual-clutch)' },
        { label: 'Drive Type', value: 'Rear-wheel drive' },
        { label: 'Differential', value: 'Electronically controlled LSD' },
        { label: 'Rear-axle steering', value: 'Standard' },
        { label: 'Launch Control', value: 'Sport Response Button' },
      ],
    },
    {
      category: 'Performance',
      icon: 'fa-solid fa-gauge-high',
      items: [
        { label: '0–100 km/h', value: '3.4 seconds' },
        { label: '0–200 km/h', value: '11.4 seconds' },
        { label: 'Top Speed', value: '318 km/h (197 mph)' },
        { label: 'Nürburgring Nordschleife', value: '6:55.2 minutes' },
        { label: 'Power-to-Weight', value: '319 hp / tonne' },
      ],
    },
    {
      category: 'Chassis',
      icon: 'fa-solid fa-car',
      items: [
        { label: 'Front Suspension', value: 'MacPherson strut' },
        { label: 'Rear Suspension', value: 'Multi-link LSA' },
        { label: 'Brakes (Front)', value: '410 mm steel / optional PCCB' },
        { label: 'Wheels (Front)', value: '9J × 20" forged alloy' },
        { label: 'Wheels (Rear)', value: '11.5J × 21" forged alloy' },
      ],
    },
  ]

  const highlights = [
    {
      icon: 'fa-solid fa-droplet',
      title: 'Naturally Aspirated',
      desc: 'A 4.0L flat-six that breathes without forced induction — the last of its kind, redlined at 9,000 rpm.',
    },
    {
      icon: 'fa-solid fa-wing',
      title: 'Active Aerodynamics',
      desc: 'A variable rear wing and diffuser generate 850 kg of downforce at top speed — keeping the GT3 glued to the tarmac.',
    },
    {
      icon: 'fa-solid fa-road',
      title: 'Rear-Axle Steering',
      desc: 'Steers the rear wheels by up to 1.5° — counter at low speeds, parallel at high speeds — for scalpel-sharp turn-in.',
    },
    {
      icon: 'fa-solid fa-circle-notch',
      title: 'Forged from the Track',
      desc: 'Developed on the Nürburgring Nordschleife — every component validated by 911 GT3 R racecars in the FIA GT3 series.',
    },
  ]

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full"
      style={{
        background:
          'linear-gradient(180deg, #0a0a0a 0%, #0e0e0e 50%, #0a0a0a 100%)',
        padding: '140px 0 120px',
      }}
    >
      {/* Decorative carmine glow */}
      <div
        style={{
          position: 'absolute',
          top: '40%',
          left: '-100px',
          width: '500px',
          height: '500px',
          background:
            'radial-gradient(circle, rgba(158, 34, 29, 0.12) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-100px',
          width: '500px',
          height: '500px',
          background:
            'radial-gradient(circle, rgba(200, 50, 40, 0.08) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Section header */}
        <div
          className={`reveal-section ${visible ? 'visible' : ''}`}
          style={{ textAlign: 'center', marginBottom: '80px' }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '24px',
              padding: '6px 16px',
              borderRadius: '50px',
              border: '1px solid rgba(158, 34, 29, 0.3)',
              background: 'rgba(20, 20, 20, 0.5)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#9E221D',
                boxShadow: '0 0 8px #9E221D',
              }}
            />
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '4px',
                color: '#C83228',
                textTransform: 'uppercase',
              }}
            >
              The Machine
            </span>
          </div>

          <h2
            style={{
              fontSize: 'clamp(2.2rem, 6vw, 5rem)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#EAEAEA',
              marginBottom: '24px',
            }}
          >
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(234, 234, 234, 0.4)' }}>
              AN ENGINEERING
            </span>
            <br />
            <span
              style={{
                background: 'linear-gradient(180deg, #EAEAEA 0%, #9E221D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              OBSESSION
            </span>
          </h2>
          <p
            style={{
              maxWidth: '640px',
              margin: '0 auto',
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'rgba(234, 234, 234, 0.7)',
            }}
          >
            The 911 GT3 is the purest expression of the 911 philosophy — a
            car built around the driver, for the driver. Every component,
            every ratio, every surface exists for one purpose: to translate
            intent into velocity.
          </p>
        </div>

        {/* Highlights grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ marginBottom: '100px' }}
        >
          {highlights.map((h, i) => (
            <div
              key={i}
              className="neo-card p-6"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.8s ${i * 0.15}s cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '14px',
                  background: 'linear-gradient(145deg, #9E221D, #481412)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  boxShadow: '0 4px 15px rgba(158, 34, 29, 0.3)',
                }}
              >
                <i className={h.icon} style={{ fontSize: '1.5rem', color: '#EAEAEA' }} />
              </div>
              <h3
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  color: '#EAEAEA',
                  marginBottom: '10px',
                  letterSpacing: '-0.01em',
                }}
              >
                {h.title}
              </h3>
              <p
                style={{
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                  color: 'rgba(234, 234, 234, 0.65)',
                }}
              >
                {h.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Technical specifications */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '40px',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <h3
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontWeight: 800,
                color: '#EAEAEA',
                letterSpacing: '-0.02em',
              }}
            >
              Technical Specifications
            </h3>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '3px',
                color: 'rgba(234, 234, 234, 0.4)',
                textTransform: 'uppercase',
              }}
            >
              Model Year 2025 — Type 992.2
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specs.map((spec, i) => (
              <div
                key={i}
                className="neo-card p-8"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.8s ${0.7 + i * 0.1}s cubic-bezier(0.16, 1, 0.3, 1)`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginBottom: '24px',
                    paddingBottom: '20px',
                    borderBottom: '1px solid rgba(234, 234, 234, 0.06)',
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '12px',
                      background: 'rgba(158, 34, 29, 0.1)',
                      border: '1px solid rgba(158, 34, 29, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <i className={spec.icon} style={{ color: '#C83228', fontSize: '1.3rem' }} />
                  </div>
                  <h4
                    style={{
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: '#EAEAEA',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {spec.category}
                  </h4>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {spec.items.map((item, j) => (
                    <li
                      key={j}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        padding: '10px 0',
                        borderBottom:
                          j < spec.items.length - 1
                            ? '1px solid rgba(234, 234, 234, 0.04)'
                            : 'none',
                        gap: '20px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '0.85rem',
                          fontWeight: 500,
                          color: 'rgba(234, 234, 234, 0.5)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        {item.label}
                      </span>
                      <span
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: '#EAEAEA',
                          textAlign: 'right',
                        }}
                      >
                        {item.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Heritage timeline */}
        <div
          style={{
            marginTop: '120px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s 1s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h3
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              fontWeight: 800,
              color: '#EAEAEA',
              letterSpacing: '-0.02em',
              marginBottom: '50px',
              textAlign: 'center',
            }}
          >
            A Lineage of Speed
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
            }}
          >
            {[
              { year: '1999', model: '996 GT3', power: '360 hp', note: 'The original. Water-cooled, race-bred.' },
              { year: '2006', model: '997 GT3', power: '415 hp', note: 'Active suspension, the first to bear the GT3 RS badge.' },
              { year: '2013', model: '991 GT3', power: '475 hp', note: 'PDK only. Rear-axle steering debuts.' },
              { year: '2017', model: '991.2 GT3', power: '500 hp', note: 'The 9,000 rpm redline era begins.' },
              { year: '2022', model: '992.1 GT3', power: '502 hp', note: 'Return of the manual option. Wing reshaped.' },
              { year: '2025', model: '992.2 GT3', power: '502 hp', note: 'Refined, sharper, faster. The current benchmark.' },
            ].map((gen, i) => (
              <div
                key={i}
                className="neo-card p-6"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    fontSize: '4rem',
                    fontWeight: 900,
                    color: 'rgba(158, 34, 29, 0.08)',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1,
                  }}
                >
                  {gen.year}
                </div>
                <div
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '3px',
                    color: '#C83228',
                    textTransform: 'uppercase',
                    marginBottom: '10px',
                    position: 'relative',
                  }}
                >
                  {gen.year}
                </div>
                <h4
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: 800,
                    color: '#EAEAEA',
                    marginBottom: '8px',
                    position: 'relative',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {gen.model}
                </h4>
                <div
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: '#9E221D',
                    marginBottom: '10px',
                    position: 'relative',
                  }}
                >
                  {gen.power}
                </div>
                <p
                  style={{
                    fontSize: '0.85rem',
                    lineHeight: 1.5,
                    color: 'rgba(234, 234, 234, 0.55)',
                    position: 'relative',
                  }}
                >
                  {gen.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
