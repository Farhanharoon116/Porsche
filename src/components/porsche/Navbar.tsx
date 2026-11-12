'use client'

import { useEffect, useState } from 'react'
import { scrollToId } from '@/lib/lenis'

type SectionId = 'home' | 'about' | 'portfolio' | 'contact'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId>('home')

  const handleNavClick = (section: SectionId) => {
    scrollToId(section)
    setActiveSection(section)
    setMenuOpen(false)
  }

  // Scroll listener updates the active bubble based on section in view
  useEffect(() => {
    const handleScroll = () => {
      const sections: SectionId[] = ['home', 'about', 'portfolio', 'contact']
      const scrollPos = window.scrollY + 220
      let current: SectionId = 'home'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollPos) current = id
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
        }}
        aria-label="Main navigation"
      >
        <div className={`glass-bubbles ${menuOpen ? 'active' : ''}`}>
          <button
            className={`nav-bubble ${activeSection === 'home' ? 'active' : ''}`}
            data-tooltip="Home"
            onClick={() => handleNavClick('home')}
            aria-label="Home"
          >
            <i className="fa-solid fa-house" aria-hidden="true"></i>
          </button>

          <button
            className={`nav-bubble ${activeSection === 'about' ? 'active' : ''}`}
            data-tooltip="About"
            onClick={() => handleNavClick('about')}
            aria-label="About"
          >
            <i className="fa-solid fa-circle-info" aria-hidden="true"></i>
          </button>

          <div className="logo-bubble" aria-label="Porsche">
            <span>PORSCHE<span className="dot">.</span></span>
          </div>

          <button
            className={`nav-bubble ${activeSection === 'portfolio' ? 'active' : ''}`}
            data-tooltip="Portfolio"
            onClick={() => handleNavClick('portfolio')}
            aria-label="Portfolio"
          >
            <i className="fa-solid fa-car-side" aria-hidden="true"></i>
          </button>

          <button
            className={`nav-bubble ${activeSection === 'contact' ? 'active' : ''}`}
            data-tooltip="Contact"
            onClick={() => handleNavClick('contact')}
            aria-label="Contact"
          >
            <i className="fa-solid fa-envelope" aria-hidden="true"></i>
          </button>
        </div>
      </nav>

      {/* Mobile menu button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'}`} aria-hidden="true"></i>
      </button>
    </>
  )
}
