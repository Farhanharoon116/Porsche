'use client'

import { useEffect, useState } from 'react'
import { scrollToId } from '@/lib/lenis'

/**
 * Footer — 90vh cinematic end-card.
 * Background video is auto-detected: drop ANY video file into
 * `public/videos/footer/` (or `public/videos/`) and it is applied
 * automatically via the /api/footer-video route. No code change needed.
 */
export default function FooterSection() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  // Auto-detect the footer video (checks public/videos/footer/ first,
  // then any other video in public/videos/ except the hero video)
  useEffect(() => {
    let cancelled = false
    fetch('/api/footer-video')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!cancelled && d?.src) setVideoSrc(d.src)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3500)
  }

  return (
    <footer
      className="relative w-full overflow-hidden bg-[#0a0a0a] text-white"
      style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column' }}
    >
      {/* Background video — auto-detected from /public/videos/footer/ */}
      {videoSrc && (
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            onCanPlay={() => setVideoLoaded(true)}
            style={{ opacity: videoLoaded ? 1 : 0, transition: 'opacity 1.2s ease' }}
          >
            <source src={videoSrc} />
          </video>
        </div>
      )}

      {/* Legibility overlays */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: videoSrc
            ? 'linear-gradient(to bottom, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.35) 35%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.92) 100%)'
            : 'radial-gradient(ellipse 80% 60% at 50% 110%, rgba(158,34,29,0.16), transparent 60%), linear-gradient(to bottom, #0a0a0a 0%, #111111 100%)',
        }}
      />

      {/* Content */}
      <div
        className="relative z-10 flex-1 flex flex-col justify-between max-w-6xl mx-auto w-full px-6 sm:px-10 pt-20 pb-8"
        style={{ minHeight: '90vh' }}
      >
        {/* Center block — big wordmark */}
        <div className="flex-1 flex flex-col items-center justify-center text-center py-10">
          <div className="kicker !text-white/60" style={{ animation: 'none' }}>
            Porsche 911 GT3 · Type 992.2
          </div>
          <div
            className="font-display font-bold uppercase mt-6"
            style={{
              fontSize: 'clamp(2.6rem, 9vw, 8rem)',
              letterSpacing: '0.08em',
              lineHeight: 1,
              textShadow: '0 4px 40px rgba(0,0,0,0.45)',
            }}
          >
            PORSCHE<span style={{ color: '#9E221D' }}>.</span>
          </div>
          <p className="mt-5 text-white/60 text-sm sm:text-base max-w-md leading-relaxed">
            A 3D interactive tribute to the 911 GT3 — precision engineering,
            raw power, timeless design.
          </p>

          {/* Newsletter */}
          <form onSubmit={handleSubscribe} className="mt-8 flex gap-2 w-full max-w-md">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="flex-1 bg-white/8 backdrop-blur-sm border border-white/15 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/35 outline-none focus:border-white/50 transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-[#0a0a0a] font-semibold text-xs tracking-wide rounded-full px-6 py-3 hover:bg-[#9E221D] hover:text-white transition-colors cursor-pointer"
            >
              {subscribed ? 'Subscribed ✓' : 'Subscribe'}
            </button>
          </form>
        </div>

        {/* Bottom block — links + social + legal */}
        <div>
          <div className="grid sm:grid-cols-3 gap-8 pb-8 border-b border-white/10">
            <div>
              <div className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/40 mb-4">
                Explore
              </div>
              <ul className="space-y-2.5">
                {[
                  { label: 'Home', id: 'home' },
                  { label: 'About', id: 'about' },
                  { label: 'Portfolio', id: 'portfolio' },
                  { label: 'Contact', id: 'contact' },
                ].map((l) => (
                  <li key={l.id}>
                    <button
                      onClick={() => scrollToId(l.id)}
                      className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/40 mb-4">
                Models
              </div>
              <ul className="space-y-2.5">
                {['911 GT3', '911 GT3 RS', '911 GT3 Touring', '911 GT3 R'].map((m) => (
                  <li key={m}>
                    <button
                      onClick={() => scrollToId('portfolio')}
                      className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer"
                    >
                      {m}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-[0.6rem] font-bold tracking-[0.2em] uppercase text-white/40 mb-4">
                Follow
              </div>
              <div className="flex gap-3">
                {[
                  { icon: 'fa-brands fa-instagram', label: 'Instagram' },
                  { icon: 'fa-brands fa-youtube', label: 'YouTube' },
                  { icon: 'fa-brands fa-x-twitter', label: 'X' },
                  { icon: 'fa-brands fa-tiktok', label: 'TikTok' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    onClick={(e) => e.preventDefault()}
                    className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/60 transition-colors"
                  >
                    <i className={s.icon} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs text-white/35">
              © 2026 · Unofficial concept site made for demonstration purposes.
            </div>
            <div className="text-xs text-white/35">
              Porsche and 911 GT3 are trademarks of Dr. Ing. h.c. F. Porsche AG.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
