'use client'

import { useEffect, useRef, useState } from 'react'

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', interest: 'purchase', message: '' })
  const [sent, setSent] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In real life: send to /api/contact. Here we just acknowledge.
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', interest: 'purchase', message: '' })
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full"
      style={{
        background:
          'linear-gradient(180deg, #0a0a0a 0%, #141414 50%, #0a0a0a 100%)',
        padding: '140px 0 80px',
      }}
    >
      {/* Decorative glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '700px',
          background:
            'radial-gradient(circle, rgba(158, 34, 29, 0.1) 0%, transparent 70%)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '70px',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease',
          }}
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
              Get in Touch
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
              READY TO
            </span>
            <br />
            <span
              style={{
                background: 'linear-gradient(180deg, #EAEAEA 0%, #9E221D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              EXPERIENCE IT?
            </span>
          </h2>
          <p
            style={{
              maxWidth: '580px',
              margin: '0 auto',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              color: 'rgba(234, 234, 234, 0.7)',
            }}
          >
            Book a private viewing. Schedule a track day. Configure your GT3.
            Or simply ask us anything — our specialists are standing by.
          </p>
        </div>

        {/* Form + Contact Cards */}
        <div
          className="grid grid-cols-1 lg:grid-cols-5 gap-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s 0.2s ease',
          }}
        >
          {/* Form - 3 columns wide */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="neo-card"
              style={{ padding: '40px' }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '32px',
                  paddingBottom: '20px',
                  borderBottom: '1px solid rgba(234, 234, 234, 0.06)',
                }}
              >
                <i
                  className="fa-solid fa-paper-plane"
                  style={{ color: '#C83228', fontSize: '1.5rem' }}
                />
                <h3
                  style={{
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    color: '#EAEAEA',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Send a Message
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '2px',
                      color: 'rgba(234, 234, 234, 0.5)',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      background: 'rgba(20, 20, 20, 0.6)',
                      border: '1px solid rgba(234, 234, 234, 0.1)',
                      borderRadius: '10px',
                      color: '#EAEAEA',
                      fontSize: '0.95rem',
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#9E221D')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(234, 234, 234, 0.1)')}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      letterSpacing: '2px',
                      color: 'rgba(234, 234, 234, 0.5)',
                      textTransform: 'uppercase',
                      marginBottom: '8px',
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      background: 'rgba(20, 20, 20, 0.6)',
                      border: '1px solid rgba(234, 234, 234, 0.1)',
                      borderRadius: '10px',
                      color: '#EAEAEA',
                      fontSize: '0.95rem',
                      fontFamily: 'Inter, sans-serif',
                      outline: 'none',
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#9E221D')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(234, 234, 234, 0.1)')}
                  />
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '2px',
                    color: 'rgba(234, 234, 234, 0.5)',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
                  I am interested in
                </label>
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                  }}
                >
                  {[
                    { id: 'purchase', label: 'Purchase', icon: 'fa-tag' },
                    { id: 'test-drive', label: 'Test Drive', icon: 'fa-car-side' },
                    { id: 'track', label: 'Track Day', icon: 'fa-flag-checkered' },
                    { id: 'general', label: 'General', icon: 'fa-comment' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setForm({ ...form, interest: opt.id })}
                      style={{
                        padding: '10px 18px',
                        background:
                          form.interest === opt.id
                            ? 'rgba(158, 34, 29, 0.25)'
                            : 'rgba(20, 20, 20, 0.6)',
                        border: `1px solid ${
                          form.interest === opt.id
                            ? 'rgba(158, 34, 29, 0.6)'
                            : 'rgba(234, 234, 234, 0.1)'
                        }`,
                        borderRadius: '8px',
                        color:
                          form.interest === opt.id ? '#EAEAEA' : 'rgba(234, 234, 234, 0.6)',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'all 0.3s',
                      }}
                    >
                      <i className={`fa-solid ${opt.icon}`} style={{ marginRight: 6 }} />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '20px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    letterSpacing: '2px',
                    color: 'rgba(234, 234, 234, 0.5)',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}
                >
                  Your Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what you're dreaming about…"
                  style={{
                    width: '100%',
                    padding: '14px 18px',
                    background: 'rgba(20, 20, 20, 0.6)',
                    border: '1px solid rgba(234, 234, 234, 0.1)',
                    borderRadius: '10px',
                    color: '#EAEAEA',
                    fontSize: '0.95rem',
                    fontFamily: 'Inter, sans-serif',
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#9E221D')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(234, 234, 234, 0.1)')}
                />
              </div>

              <button
                type="submit"
                className="btn-carmine"
                style={{
                  width: '100%',
                  marginTop: '24px',
                  padding: '16px 32px',
                }}
              >
                {sent ? (
                  <>
                    <i className="fa-solid fa-check" /> Message Sent
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane" /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact info cards - 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {[
              {
                icon: 'fa-solid fa-location-dot',
                title: 'Porsche Centre',
                line1: 'Stuttgart-Zuffenhausen',
                line2: 'Porscheplatz 1, 70435',
                action: 'Get Directions',
              },
              {
                icon: 'fa-solid fa-phone',
                title: 'Call Us',
                line1: 'Sales: +49 711 911-0',
                line2: 'Service: +49 711 911-1234',
                action: 'Tap to Call',
              },
              {
                icon: 'fa-solid fa-envelope',
                title: 'Email Us',
                line1: 'gt3@porsche.de',
                line2: 'sales@porsche.de',
                action: 'Compose Email',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="neo-card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  gap: '16px',
                  alignItems: 'center',
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
                    flexShrink: 0,
                    boxShadow: '0 4px 15px rgba(158, 34, 29, 0.3)',
                  }}
                >
                  <i className={card.icon} style={{ color: '#EAEAEA', fontSize: '1.3rem' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      letterSpacing: '3px',
                      color: '#C83228',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                    }}
                  >
                    {card.title}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#EAEAEA' }}>
                    {card.line1}
                  </div>
                  <div
                    style={{
                      fontSize: '0.85rem',
                      color: 'rgba(234, 234, 234, 0.55)',
                      marginTop: 2,
                    }}
                  >
                    {card.line2}
                  </div>
                </div>
                <button
                  style={{
                    padding: '8px 14px',
                    background: 'transparent',
                    border: '1px solid rgba(158, 34, 29, 0.4)',
                    borderRadius: '6px',
                    color: '#C83228',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '1.5px',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  <i className="fa-solid fa-arrow-right" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: '100px',
          paddingTop: '40px',
          borderTop: '1px solid rgba(234, 234, 234, 0.06)',
        }}
      >
        <div
          className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: '#EAEAEA',
                letterSpacing: '-0.5px',
                textTransform: 'uppercase',
              }}
            >
              PORSCHE<span style={{ color: '#9E221D' }}>.</span>
            </span>
            <span
              style={{
                fontSize: '0.75rem',
                color: 'rgba(234, 234, 234, 0.4)',
                marginLeft: '8px',
              }}
            >
              · 911 GT3 Edition
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'center',
            }}
          >
            {['Instagram', 'YouTube', 'X', 'TikTok'].map((s) => (
              <a
                key={s}
                href="#"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'rgba(234, 234, 234, 0.5)',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C83228')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(234, 234, 234, 0.5)')}
              >
                {s}
              </a>
            ))}
          </div>

          <div
            style={{
              fontSize: '0.7rem',
              color: 'rgba(234, 234, 234, 0.3)',
              letterSpacing: '1px',
            }}
          >
            © 2025 Porsche AG · Made for the love of speed
          </div>
        </div>
      </footer>
    </section>
  )
}
