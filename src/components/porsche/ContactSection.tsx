'use client'

import { useEffect, useRef, useState } from 'react'
import { scrollToId } from '@/lib/lenis'

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
      { threshold: 0.12 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', interest: 'purchase', message: '' })
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '13px 16px',
    background: '#f7f7f5',
    border: '1px solid rgba(10,10,10,0.1)',
    borderRadius: '12px',
    color: '#0a0a0a',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-manrope), sans-serif',
    outline: 'none',
    transition: 'border-color 0.3s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.62rem',
    fontWeight: 700,
    letterSpacing: '0.18em',
    color: '#737373',
    textTransform: 'uppercase',
    marginBottom: '8px',
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full bg-[#f7f7f5] border-t border-black/5"
    >
      <div className={`reveal-section ${visible ? 'visible' : ''} max-w-6xl mx-auto px-6 sm:px-10 py-24`}>
        <div className="grid lg:grid-cols-5 gap-10">
          {/* Left — heading + info */}
          <div className="lg:col-span-2">
            <div className="kicker">Contact</div>
            <h2
              className="font-display mt-5 font-bold tracking-tight text-[#0a0a0a]"
              style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
            >
              Ready to
              <br />
              experience it?
            </h2>
            <p className="mt-4 text-neutral-600 text-[0.9rem] leading-relaxed max-w-sm">
              Book a private viewing, schedule a track day or configure your
              GT3 — our specialists are standing by.
            </p>

            <div className="mt-8 space-y-3">
              {[
                { icon: 'fa-location-dot', title: 'Porsche Centre', line: 'Porscheplatz 1, 70435 Stuttgart' },
                { icon: 'fa-phone', title: 'Call us', line: '+49 711 911-0' },
                { icon: 'fa-envelope', title: 'Email us', line: 'gt3@porsche.de' },
              ].map((c, i) => (
                <div key={i} className="min-card flex items-center gap-4 px-5 py-4">
                  <span className="w-10 h-10 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center text-sm shrink-0">
                    <i className={`fa-solid ${c.icon}`} aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.6rem] font-bold tracking-[0.16em] uppercase text-neutral-500">
                      {c.title}
                    </span>
                    <span className="block text-sm font-semibold text-[#0a0a0a] mt-0.5 truncate">{c.line}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="min-card p-7 sm:p-9" style={{ borderRadius: 22 }}>
              <div className="flex items-center gap-3 pb-6 border-b border-black/8">
                <i className="fa-solid fa-paper-plane text-[#9E221D]" aria-hidden="true" />
                <h3 className="font-display text-lg font-bold text-[#0a0a0a]">Send a message</h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-5 mt-6">
                <div>
                  <label style={labelStyle}>Full name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = '#0a0a0a')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(10,10,10,0.1)')}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@email.com"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = '#0a0a0a')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(10,10,10,0.1)')}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label style={labelStyle}>I am interested in</label>
                <div className="flex flex-wrap gap-2">
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
                      className={`px-4 py-2.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                        form.interest === opt.id
                          ? 'bg-[#0a0a0a] text-white border-[#0a0a0a]'
                          : 'bg-white text-neutral-600 border-black/10 hover:border-black/40'
                      }`}
                    >
                      <i className={`fa-solid ${opt.icon} mr-1.5`} aria-hidden="true" />
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <label style={labelStyle}>Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us what you're dreaming about…"
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={(e) => (e.target.style.borderColor = '#0a0a0a')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(10,10,10,0.1)')}
                />
              </div>

              <button type="submit" className="btn-dark w-full mt-6 !py-4">
                {sent ? (
                  <>
                    <i className="fa-solid fa-check" aria-hidden="true" /> Message sent
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane" aria-hidden="true" /> Send message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
