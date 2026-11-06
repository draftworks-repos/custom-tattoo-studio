import React, { useRef, useEffect } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLenis } from '../../context/LenisContext.jsx';
import { TransitionLink } from '../TransitionLink/TransitionLink.jsx';
import { Button } from '../Button/Button.jsx';
import './MobileMenu.css';

export const MobileMenu = ({ isOpen, onClose }) => {
  const menuRef = useRef(null);
  const linksRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    if (isOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    }
    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    };
  }, [isOpen, lenis]);

  useGSAP(
    () => {
      const menu = menuRef.current;
      if (!menu) return;

      const linkElements = linksRef.current?.querySelectorAll('.mobile-menu__link');

      if (isOpen) {
        gsap.to(menu, {
          autoAlpha: 1,
          duration: 0.35,
          ease: 'power2.out',
        });

        if (linkElements) {
          gsap.fromTo(
            linkElements,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              stagger: 0.08,
              ease: 'power3.out',
              delay: 0.1,
            }
          );
        }
      } else {
        gsap.to(menu, {
          autoAlpha: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    },
    { dependencies: [isOpen] }
  );

  return (
    <div
      ref={menuRef}
      className="mobile-menu"
      aria-hidden={!isOpen}
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation"
    >
      <div className="mobile-menu__header">
        <span className="mobile-menu__logo">INKED</span>
        <button
          type="button"
          className="mobile-menu__close"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={28} />
        </button>
      </div>

      <nav ref={linksRef} className="mobile-menu__nav">
        <TransitionLink to="/" className="mobile-menu__link" onClick={onClose}>
          Home
        </TransitionLink>
        <TransitionLink to="/services" className="mobile-menu__link" onClick={onClose}>
          Services
        </TransitionLink>
        <TransitionLink to="/about" className="mobile-menu__link" onClick={onClose}>
          About
        </TransitionLink>
        <TransitionLink to="/contact" className="mobile-menu__link" onClick={onClose}>
          Contact
        </TransitionLink>
      </nav>

      <div className="mobile-menu__footer">
        <Button to="/contact" variant="primary" onClick={onClose}>
          Book Session
        </Button>
        <p className="mobile-menu__contact">
          42 Artisan Lane, Bandra West, Mumbai • +91 98200 45678
        </p>
      </div>
    </div>
  );
};
