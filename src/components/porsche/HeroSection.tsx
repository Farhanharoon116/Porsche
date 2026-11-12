'use client'

import { useEffect, useRef, useState } from 'react'

interface HeroSectionProps {
  onEnterPortfolio?: () => void
}

export default function HeroSection({ onEnterPortfolio }: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const onCanPlay = () => setVideoLoaded(true)
    v.addEventListener('canplaythrough', onCanPlay)
    // Try to play
    v.play().catch(() => {})
    return () => v.removeEventListener('canplaythrough', onCanPlay)
  }, [])

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: '#0a0a0a' }}
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: videoLoaded ? 0.55 : 0,
            transition: 'opacity 1.2s ease',
          }}
          onCanPlay={() => setVideoLoaded(true)}
        >
          <source src="/videos/porsche-hero.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay gradients for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.45) 30%, rgba(10,10,10,0.85) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.6) 100%)',
          }}
        />
        {/* Carmine crimson side glow */}
        <div
          className="absolute inset-y-0 left-0 w-1/2"
          style={{
            background:
              'linear-gradient(90deg, rgba(158,34,29,0.25) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Top kicker */}
      <div
        className="absolute top-32 left-0 right-0 z-10 text-center px-4"
        style={{
          animation: 'fadeInDown 1.2s 0.3s both',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 18px',
            borderRadius: '50px',
            background: 'rgba(20, 20, 20, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(158, 34, 29, 0.3)',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#C83228',
              boxShadow: '0 0 10px #C83228',
            }}
          />
          <span
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '4px',
              color: '#EAEAEA',
              textTransform: 'uppercase',
            }}
          >
            2025 Edition · Type 992.2
          </span>
        </div>
      </div>

      {/* Main hero content */}
      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-16 text-center">
        <div
          style={{
            animation: 'fadeIn 1.4s 0.5s both',
          }}
        >
          <div
            className="hero-outline-text"
            style={{
              fontSize: 'clamp(2.5rem, 12vw, 12rem)',
              fontWeight: 800,
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: 'transparent',
            }}
          >
            BORN TO
          </div>
          <div
            className="hero-display-text hero-shadow-text"
            style={{
              background:
                'linear-gradient(180deg, #EAEAEA 0%, #C83228 50%, #9E221D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontSize: 'clamp(3.5rem, 16vw, 16rem)',
            }}
          >
            PERFORM
          </div>
          <div
            className="hero-outline-text"
            style={{
              fontSize: 'clamp(2.5rem, 12vw, 12rem)',
              fontWeight: 800,
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              textTransform: 'uppercase',
              color: 'transparent',
            }}
          >
            BUILT TO DOMINATE
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: '40px',
            maxWidth: '640px',
            margin: '40px auto 0',
            animation: 'fadeIn 1.4s 0.9s both',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)',
              fontWeight: 400,
              lineHeight: 1.6,
              color: 'rgba(234, 234, 234, 0.75)',
              letterSpacing: '0.2px',
            }}
          >
            The 911 GT3 is not a car. It is a 4.0-litre naturally aspirated
            flat-six screaming to 9,000 rpm, a chassis honed on the
            Nürburgring, and a soul forged on the track — distilled into a
            road-legal weapon.
          </p>
        </div>

        {/* CTAs */}
        <div
          style={{
            marginTop: '40px',
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeIn 1.4s 1.2s both',
          }}
        >
          <button className="btn-carmine" onClick={onEnterPortfolio}>
            <i className="fa-solid fa-play" />
            Explore the GT3
          </button>
          <button className="btn-ghost" onClick={() => {
            const el = document.getElementById('about')
            if (el) {
              const top = el.getBoundingClientRect().top + window.pageYOffset - 80
              window.scrollTo({ top, behavior: 'smooth' })
            }
          }}>
            <i className="fa-solid fa-circle-info" />
            Read the Story
          </button>
        </div>
      </div>

      {/* Bottom stats strip */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10"
        style={{
          padding: '24px',
          animation: 'fadeIn 1.4s 1.5s both',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '24px',
            padding: '20px',
            background: 'rgba(20, 20, 20, 0.5)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: '1px solid rgba(234, 234, 234, 0.05)',
          }}
        >
          {[
            { value: '502', unit: 'HP', label: 'Power Output' },
            { value: '3.4', unit: 's', label: '0–100 km/h' },
            { value: '9,000', unit: 'rpm', label: 'Redline' },
            { value: '318', unit: 'km/h', label: 'Top Speed' },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                textAlign: 'center',
                borderRight:
                  i < 3 ? '1px solid rgba(234, 234, 234, 0.08)' : 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  gap: '4px',
                }}
              >
                <span
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                    fontWeight: 800,
                    color: '#EAEAEA',
                    fontFamily: 'Inter, sans-serif',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    color: '#C83228',
                    fontFamily: 'Inter, sans-serif',
                    textTransform: 'uppercase',
                  }}
                >
                  {stat.unit}
                </span>
              </div>
              <div
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  color: 'rgba(234, 234, 234, 0.5)',
                  textTransform: 'uppercase',
                  marginTop: '4px',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Local CSS keyframes injected */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  )
}
