'use client'

import { useState, useEffect } from 'react'
import SpeedometerLoader from '@/components/porsche/SpeedometerLoader'
import WipeTransition from '@/components/porsche/WipeTransition'
import Navbar from '@/components/porsche/Navbar'
import HeroSection from '@/components/porsche/HeroSection'
import AboutSection from '@/components/porsche/AboutSection'
import PortfolioSection from '@/components/porsche/PortfolioSection'
import ContactSection from '@/components/porsche/ContactSection'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [wipeTrigger, setWipeTrigger] = useState(false)
  const [showContent, setShowContent] = useState(false)

  // After loader completes -> trigger wipe transition
  const handleLoadComplete = () => {
    setWipeTrigger(true)
  }

  // After wipe completes -> show content, hide loader
  const handleWipeComplete = () => {
    setLoading(false)
    setShowContent(true)
  }

  // Fallback: if for any reason loader hangs, allow escape after 6s
  useEffect(() => {
    const t = setTimeout(() => {
      if (loading) {
        setWipeTrigger(true)
      }
    }, 6000)
    return () => clearTimeout(t)
  }, [loading])

  // Handler when user clicks "Explore the GT3" in hero
  const handleEnterPortfolio = () => {
    const el = document.getElementById('portfolio')
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <>
      {/* Loader with speedometer */}
      {loading && (
        <SpeedometerLoader onComplete={handleLoadComplete} />
      )}

      {/* Wipe transition overlay */}
      <WipeTransition trigger={wipeTrigger} onComplete={handleWipeComplete} />

      {/* Main app content (only after loader + wipe) */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.8s ease',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Navbar />
        <main style={{ flex: 1 }}>
          <HeroSection onEnterPortfolio={handleEnterPortfolio} />
          <AboutSection />
          <PortfolioSection />
          <ContactSection />
        </main>
      </div>
    </>
  )
}
