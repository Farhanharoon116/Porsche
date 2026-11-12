'use client'

import { useEffect, useState, useRef } from 'react'

interface SpeedometerLoaderProps {
  onComplete: () => void
}

export default function SpeedometerLoader({ onComplete }: SpeedometerLoaderProps) {
  const [speed, setSpeed] = useState(0)
  const [rpm, setRpm] = useState(0)
  const [stage, setStage] = useState<'accel' | 'peak' | 'done'>('accel')
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    let start: number | null = null
    const duration = 2400 // 2.4 seconds from 0 to 100

    const animate = (ts: number) => {
      if (start === null) start = ts
      const elapsed = ts - start
      // Ease-out curve for accelerating then settling
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 2.5)
      const currentSpeed = eased * 100
      setSpeed(currentSpeed)
      // RPM mimics a high-revving flat-six — climbs fast, peaks, slight oscillation
      const rpmT = Math.min(elapsed / (duration * 0.85), 1)
      const currentRpm = rpmT >= 1 ? 9000 + Math.sin(elapsed * 0.02) * 200 : rpmT * 9000
      setRpm(currentRpm)

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setStage('peak')
        setTimeout(() => {
          setStage('done')
          setTimeout(onComplete, 250)
        }, 600)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [onComplete])

  // Speedometer geometry
  const startAngle = 135
  const endAngle = 405 // 270 degrees sweep
  const speedAngle = startAngle + (speed / 100) * (endAngle - startAngle)
  const rpmAngle = startAngle + (rpm / 9000) * (endAngle - startAngle)

  // Convert angle to coordinates on arc
  const polarToCartesian = (angle: number, radius: number, cx: number, cy: number) => {
    const rad = (angle * Math.PI) / 180
    return {
      x: Math.round((cx + radius * Math.cos(rad)) * 1000) / 1000,
      y: Math.round((cy + radius * Math.sin(rad)) * 1000) / 1000,
    }
  }

  // Describe arc path
  const describeArc = (startA: number, endA: number, radius: number, cx: number, cy: number) => {
    const start = polarToCartesian(startA, radius, cx, cy)
    const end = polarToCartesian(endA, radius, cx, cy)
    const largeArc = endA - startA <= 180 ? 0 : 1
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`
  }

  const cx = 200
  const cy = 200
  const outerRadius = 170
  const rpmRadius = 110

  // Tick marks for speed
  const ticks = []
  for (let i = 0; i <= 20; i++) {
    const angle = startAngle + (i / 20) * (endAngle - startAngle)
    const isMajor = i % 2 === 0
    const tickLen = isMajor ? 15 : 8
    const outer = polarToCartesian(angle, outerRadius - 5, cx, cy)
    const inner = polarToCartesian(angle, outerRadius - 5 - tickLen, cx, cy)
    const labelPos = polarToCartesian(angle, outerRadius - 35, cx, cy)
    ticks.push(
      <g key={`tick-${i}`}>
        <line
          x1={outer.x}
          y1={outer.y}
          x2={inner.x}
          y2={inner.y}
          stroke={isMajor ? '#EAEAEA' : 'rgba(234, 234, 234, 0.3)'}
          strokeWidth={isMajor ? 2 : 1}
        />
        {isMajor && (
          <text
            x={labelPos.x}
            y={labelPos.y}
            fill={i <= 10 ? '#EAEAEA' : '#9E221D'}
            fontSize="12"
            fontWeight="600"
            textAnchor="middle"
            dominantBaseline="middle"
            fontFamily="Inter, sans-serif"
          >
            {i * 5}
          </text>
        )}
      </g>
    )
  }

  return (
    <div className="speedometer-loader">
      <div
        style={{
          opacity: stage === 'done' ? 0 : 1,
          transform: stage === 'done' ? 'scale(1.05)' : 'scale(1)',
          transition: 'opacity 0.4s ease, transform 0.4s ease',
        }}
      >
        <svg
          className="speedo-svg"
          width="400"
          height="400"
          viewBox="0 0 400 400"
          style={{ maxWidth: '90vw', maxHeight: '90vw' }}
        >
          {/* Outer ring backdrop */}
          <circle cx={cx} cy={cy} r={outerRadius + 8} fill="none" stroke="rgba(72, 20, 18, 0.3)" strokeWidth="2" />

          {/* Speed arc background */}
          <path
            d={describeArc(startAngle, endAngle, outerRadius, cx, cy)}
            fill="none"
            stroke="#2C2C2E"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Speed arc filled */}
          <path
            d={describeArc(startAngle, speedAngle, outerRadius, cx, cy)}
            fill="none"
            stroke="url(#speedGrad)"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* RPM arc background */}
          <path
            d={describeArc(startAngle, endAngle, rpmRadius, cx, cy)}
            fill="none"
            stroke="rgba(234, 234, 234, 0.1)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* RPM arc filled */}
          <path
            d={describeArc(startAngle, rpmAngle, rpmRadius, cx, cy)}
            fill="none"
            stroke="#C83228"
            strokeWidth="3"
            strokeLinecap="round"
            opacity={0.8}
          />

          {/* Ticks */}
          {ticks}

          {/* Center hub */}
          <circle cx={cx} cy={cy} r="50" fill="#141414" stroke="#9E221D" strokeWidth="1.5" />
          <circle cx={cx} cy={cy} r="42" fill="#0a0a0a" />

          {/* Needle */}
          <g style={{ transform: `rotate(${speedAngle - 270}deg)`, transformOrigin: `${cx}px ${cy}px`, transition: 'transform 0.1s linear' }}>
            <line x1={cx} y1={cy} x2={cx} y2={cy - outerRadius + 10} stroke="#9E221D" strokeWidth="3" strokeLinecap="round" />
            <circle cx={cx} cy={cy} r="6" fill="#9E221D" />
          </g>

          {/* Digital readout */}
          <text
            x={cx}
            y={cy + 80}
            fill="#EAEAEA"
            fontSize="48"
            fontWeight="800"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            letterSpacing="-2"
          >
            {Math.round(speed)}
          </text>
          <text
            x={cx}
            y={cy + 100}
            fill="rgba(234, 234, 234, 0.5)"
            fontSize="11"
            fontWeight="600"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            letterSpacing="2"
          >
            KM / H
          </text>

          {/* Top label */}
          <text
            x={cx}
            y={cy - 80}
            fill="#9E221D"
            fontSize="10"
            fontWeight="700"
            textAnchor="middle"
            fontFamily="Inter, sans-serif"
            letterSpacing="3"
          >
            911 GT3
          </text>

          {/* Gradient defs */}
          <defs>
            <linearGradient id="speedGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#EAEAEA" />
              <stop offset="60%" stopColor="#C83228" />
              <stop offset="100%" stopColor="#9E221D" />
            </linearGradient>
          </defs>
        </svg>

        <div
          style={{
            textAlign: 'center',
            marginTop: '30px',
            color: '#EAEAEA',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <div
            style={{
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '4px',
              color: 'rgba(234, 234, 234, 0.5)',
              textTransform: 'uppercase',
              marginBottom: '8px',
            }}
          >
            {stage === 'peak' ? '0–100 km/h in 3.4s' : 'Loading'}
          </div>
          <div
            style={{
              fontSize: '1.4rem',
              fontWeight: 900,
              letterSpacing: '-0.5px',
              color: '#EAEAEA',
              textTransform: 'uppercase',
            }}
          >
            Porsche <span style={{ color: '#9E221D' }}>911 GT3</span>
          </div>
          <div
            style={{
              marginTop: '20px',
              width: '200px',
              height: '2px',
              background: '#2C2C2E',
              margin: '20px auto 0',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${speed}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #9E221D, #C83228)',
                transition: 'width 0.1s linear',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
