import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import './PageTransition.css';

const TransitionContext = createContext({
  navigateWithTransition: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(TransitionContext);

export const PageTransitionProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const curtainRef = useRef(null);

  const navigateWithTransition = useCallback(
    (to) => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion || !curtainRef.current) {
        navigate(to);
        return;
      }

      setIsTransitioning(true);

      gsap.to(curtainRef.current, {
        opacity: 1,
        duration: 0.35,
        ease: 'power2.inOut',
        onComplete: () => {
          navigate(to);
          // Small pause then fade out
          setTimeout(() => {
            if (curtainRef.current) {
              gsap.to(curtainRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.out',
                onComplete: () => {
                  setIsTransitioning(false);
                },
              });
            } else {
              setIsTransitioning(false);
            }
          }, 80);
        },
      });
    },
    [navigate]
  );

  return (
    <TransitionContext.Provider value={{ navigateWithTransition, isTransitioning }}>
      {children}
      <div
        ref={curtainRef}
        className="page-curtain"
        aria-hidden="true"
      />
    </TransitionContext.Provider>
  );
};
