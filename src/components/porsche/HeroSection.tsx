'use client'

import { useEffect, useRef, useState } from 'react'
import { scrollToId } from '@/lib/lenis'

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onCanPlay = () => setVideoLoaded(true)
    v.addEventListener('canplaythrough', onCanPlay)
    v.play().catch(() => {})
    return () => v.removeEventListener('canplaythrough', onCanPlay)
  }, [])

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Background video — bright, minimal overlay */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/gt3.jpg"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: videoLoaded ? 1 : 0.85,
            transition: 'opacity 0.8s ease',
          }}
        >
          <source src="/videos/porsche-hero.mp4" type="video/mp4" />
        </video>
        {/* Light overlay — only a soft bottom gradient for text legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.22) 32%, rgba(0,0,0,0) 55%), linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 18%)',
          }}
        />
      </div>

      {/* Content — anchored bottom-left, compact */}
      <div
        className="relative z-10 w-full px-6 sm:px-10 lg:px-16 pb-14 sm:pb-16 lg:pb-20"
        style={{ animation: 'heroUp 1s 0.15s both' }}
      >
        <div className="kicker !text-white/60" style={{ animation: 'heroUp 0.9s 0.25s both' }}>
          Porsche 911 GT3 · Type 992.2
        </div>

        <h1
          className="font-display mt-4 text-white font-bold tracking-tight max-w-3xl"
          style={{
            fontSize: 'clamp(1.9rem, 4.6vw, 3.8rem)',
            lineHeight: 1.04,
            animation: 'heroUp 0.9s 0.4s both',
            textShadow: '0 2px 24px rgba(0,0,0,0.35)',
          }}
        >
          Engineered for the track.
          <br />
          Tamed for the road.
        </h1>

        <p
          className="mt-4 text-white/70 text-sm sm:text-base font-medium max-w-xl"
          style={{ animation: 'heroUp 0.9s 0.55s both' }}
        >
          502 hp naturally aspirated flat-six · 9,000 rpm redline · 0–100 in 3.4 s
        </p>

        <div
          className="mt-6 flex flex-wrap gap-3"
          style={{ animation: 'heroUp 0.9s 0.7s both' }}
        >
          <button className="btn-light" onClick={() => scrollToId('portfolio')}>
            Explore the GT3
            <i className="fa-solid fa-arrow-right text-[0.7rem]" aria-hidden="true" />
          </button>
          <button className="btn-ghost-light" onClick={() => scrollToId('about')}>
            The Story
          </button>
        </div>
      </div>

      {/* Scroll cue — bottom right */}
      <div
        className="absolute right-6 sm:right-10 lg:right-16 bottom-14 sm:bottom-16 lg:bottom-20 z-10 hidden sm:flex flex-col items-center gap-2 text-white/60"
        style={{ animation: 'fadeIn 1s 1s both' }}
      >
        <span className="text-[0.6rem] font-semibold tracking-[0.25em] uppercase">Scroll</span>
        <i
          className="fa-solid fa-chevron-down text-xs"
          aria-hidden="true"
          style={{ animation: 'bounceDown 1.8s ease-in-out infinite' }}
        />
      </div>

      <style>{`
        @keyframes heroUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounceDown {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(6px); opacity: 1; }
        }
      `}</style>
    </section>
  )
}
