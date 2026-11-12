'use client'

import { useState, useEffect } from 'react'
import Loader from '@/components/porsche/Loader'
import WipeTransition from '@/components/porsche/WipeTransition'
import Navbar from '@/components/porsche/Navbar'
import HeroSection from '@/components/porsche/HeroSection'
import StatsBand from '@/components/porsche/StatsBand'
import BrandStrip from '@/components/porsche/BrandStrip'
import AboutSection from '@/components/porsche/AboutSection'
import PortfolioSection from '@/components/porsche/PortfolioSection'
import ProcessSection from '@/components/porsche/ProcessSection'
import TestimonialsSection from '@/components/porsche/TestimonialsSection'
import FAQSection from '@/components/porsche/FAQSection'
import ContactSection from '@/components/porsche/ContactSection'
import FooterSection from '@/components/porsche/FooterSection'
import { initLenis, destroyLenis } from '@/lib/lenis'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [wipeTrigger, setWipeTrigger] = useState(false)
  const [showContent, setShowContent] = useState(false)

  // Init Locomotive-style smooth scrolling once
  useEffect(() => {
    initLenis()
    return () => destroyLenis()
  }, [])

  const handleLoadComplete = () => {
    setWipeTrigger(true)
  }

  const handleWipeCovered = () => {
    setShowContent(true)
  }

  const handleWipeDone = () => {
    setLoading(false)
  }

  // Safety fallback — never trap the user behind the loader
  useEffect(() => {
    if (!loading) return
    const t = setTimeout(() => setWipeTrigger(true), 4000)
    return () => clearTimeout(t)
  }, [loading])

  return (
    <>
      {loading && <Loader onComplete={handleLoadComplete} />}

      <WipeTransition
        trigger={wipeTrigger}
        onCovered={handleWipeCovered}
        onDone={handleWipeDone}
      />

      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.6s ease',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: '#ffffff',
        }}
      >
        <Navbar />
        <main style={{ flex: 1 }}>
          <HeroSection />
          <StatsBand />
          <BrandStrip />
          <AboutSection />
          <PortfolioSection />
          <ProcessSection />
          <TestimonialsSection />
          <FAQSection />
          <ContactSection />
        </main>
        <FooterSection />
      </div>
    </>
  )
}
