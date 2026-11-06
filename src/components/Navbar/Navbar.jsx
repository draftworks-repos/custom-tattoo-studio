import React, { useRef, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ArrowUpRight, Menu } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLenis } from '../../context/LenisContext.jsx';
import { StarGlyph } from '../StarGlyph/StarGlyph.jsx';
import { TransitionLink } from '../TransitionLink/TransitionLink.jsx';
import { MobileMenu } from '../MobileMenu/MobileMenu.jsx';
import './Navbar.css';

export const Navbar = () => {
  const navRef = useRef(null);
  const lenis = useLenis();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Clean scroll listener to update isScrolled state without layout jitter
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(currentScroll > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        ref={navRef}
        className={`nav-header ${isScrolled ? 'nav-header--scrolled' : ''}`}
      >
        <div className="container nav-header__container">
          {/* Logo */}
          <TransitionLink to="/" className="nav__logo" aria-label="INKED Tattoo Studio Home">
            INKED
          </TransitionLink>

          {/* Desktop Links */}
          <nav className="nav__links" aria-label="Primary navigation">
            <NavLink
              to="/"
              className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
              end
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="nav__star" aria-hidden="true">
                      <StarGlyph size={10} color="var(--crimson-400)" />
                    </span>
                  )}
                  <span>Home</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/services"
              className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="nav__star" aria-hidden="true">
                      <StarGlyph size={10} color="var(--crimson-400)" />
                    </span>
                  )}
                  <span>Services</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/about"
              className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="nav__star" aria-hidden="true">
                      <StarGlyph size={10} color="var(--crimson-400)" />
                    </span>
                  )}
                  <span>About</span>
                </>
              )}
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <span className="nav__star" aria-hidden="true">
                      <StarGlyph size={10} color="var(--crimson-400)" />
                    </span>
                  )}
                  <span>Contact</span>
                </>
              )}
            </NavLink>
          </nav>

          {/* Right Actions: CTA & Mobile Hamburger */}
          <div className="nav__actions">
            <TransitionLink to="/contact" className="nav__cta">
              <span>Book Session</span>
              <ArrowUpRight size={18} aria-hidden="true" />
            </TransitionLink>

            <button
              type="button"
              className="nav__hamburger"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};
