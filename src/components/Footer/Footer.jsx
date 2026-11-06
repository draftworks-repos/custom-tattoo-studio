import React from 'react';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { useLenis } from '../../context/LenisContext.jsx';
import { TransitionLink } from '../TransitionLink/TransitionLink.jsx';
import { Sticker } from '../Sticker/Sticker.jsx';
import { Button } from '../Button/Button.jsx';
import './Footer.css';

export const Footer = () => {
  const lenis = useLenis();

  const handleBackToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__container">
        {/* Asymmetric 12-col layout */}
        <div className="footer__top">
          {/* Left 7 cols */}
          <div className="footer__left" data-reveal>
            <h2 className="footer__heading">
              GOT AN IDEA? <br />
              LET'S INK IT.
            </h2>
            <div className="footer__email-wrap">
              <a href="mailto:hello@inked.studio" className="footer__email">
                hello@inked.studio
              </a>
            </div>
            <p className="footer__bio">
              Custom tattooing rooted in patience, hygiene, and personal storytelling.
              Appointments preferred, flash drops every Friday.
            </p>
          </div>

          {/* Right 5 cols */}
          <div className="footer__right" data-reveal>
            <div className="footer__groups">
              <div className="footer__col">
                <span className="footer__col-label">Pages</span>
                <nav className="footer__nav" aria-label="Footer Navigation">
                  <TransitionLink to="/" className="footer__link">Home</TransitionLink>
                  <TransitionLink to="/services" className="footer__link">Services & Pricing</TransitionLink>
                  <TransitionLink to="/about" className="footer__link">Our Story & Crew</TransitionLink>
                  <TransitionLink to="/contact" className="footer__link">Consult & Booking</TransitionLink>
                </nav>
              </div>

              <div className="footer__col">
                <span className="footer__col-label">Social</span>
                <div className="footer__nav">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer__link">
                    Instagram <ArrowUpRight size={14} />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer__link">
                    YouTube <ArrowUpRight size={14} />
                  </a>
                  <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="footer__link">
                    WhatsApp <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              <div className="footer__col">
                <span className="footer__col-label">Visit</span>
                <address className="footer__address">
                  42 Artisan Lane<br />
                  Bandra West, Mumbai 400050<br />
                  Mon – Sat: 11am – 8pm
                </address>
              </div>
            </div>

            <div className="footer__cta-wrap">
              <Button to="/contact" variant="primary">
                Book Session
              </Button>
            </div>
          </div>
        </div>

        {/* Sticker overlapping the wordmark */}
        <div className="footer__sticker-wrap">
          <Sticker rotate={-4}>Booking open ✦</Sticker>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__copyright">
            © {new Date().getFullYear()} INKED Studio. All Rights Reserved.
          </div>
          <button
            type="button"
            className="footer__back-to-top"
            onClick={handleBackToTop}
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Giant cropped wordmark at bottom */}
      <div className="footer__wordmark" aria-hidden="true">
        INKED
      </div>
    </footer>
  );
};
