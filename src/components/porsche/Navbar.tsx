'use client'

import { useEffect, useState } from 'react'

type SectionId = 'home' | 'about' | 'portfolio' | 'contact'

interface NavbarProps {
  onNavigate?: (section: SectionId) => void
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<SectionId>('home')

  // Smooth scroll handler with 80px offset for fixed navbar
  const handleNavClick = (e: React.MouseEvent, section: SectionId) => {
    e.preventDefault()
    const el = document.getElementById(section)
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setActiveSection(section)
    onNavigate?.(section)
    if (menuOpen) {
      setMenuOpen(false)
    }
  }

  // Scroll listener to update active bubble
  useEffect(() => {
    const handleScroll = () => {
      const sections: SectionId[] = ['home', 'about', 'portfolio', 'contact']
      const scrollPos = window.scrollY + 200
      let current: SectionId = 'home'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollPos) {
          current = id
        }
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
          top: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
        }}
        aria-label="Main navigation"
      >
        <div className={`glass-bubbles ${menuOpen ? 'active' : ''}`}>
          {/* Home */}
          <button
            className={`nav-bubble ${activeSection === 'home' ? 'active' : ''}`}
            data-tooltip="Home"
            onClick={(e) => handleNavClick(e, 'home')}
            aria-label="Home"
          >
            <i className="fa-solid fa-house"></i>
          </button>

          {/* About */}
          <button
            className={`nav-bubble ${activeSection === 'about' ? 'active' : ''}`}
            data-tooltip="About"
            onClick={(e) => handleNavClick(e, 'about')}
            aria-label="About"
          >
            <i className="fa-solid fa-circle-info"></i>
          </button>

          {/* Logo bubble - static, no hover */}
          <div className="logo-bubble" aria-label="Porsche logo">
            <span>PORSCHE<span className="dot">.</span></span>
          </div>

          {/* Portfolio */}
          <button
            className={`nav-bubble ${activeSection === 'portfolio' ? 'active' : ''}`}
            data-tooltip="Portfolio"
            onClick={(e) => handleNavClick(e, 'portfolio')}
            aria-label="Portfolio"
          >
            <i className="fa-solid fa-car-side"></i>
          </button>

          {/* Contact */}
          <button
            className={`nav-bubble ${activeSection === 'contact' ? 'active' : ''}`}
            data-tooltip="Contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            aria-label="Contact"
          >
            <i className="fa-solid fa-envelope"></i>
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
        <i className={`fa-solid ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
    </>
  )
}
