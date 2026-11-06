import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

/**
 * Hook to automatically reveal child elements marked with [data-reveal]
 * as they enter the viewport.
 */
export const useReveal = (scopeRef) => {
  useGSAP(
    () => {
      if (!scopeRef?.current) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const elements = scopeRef.current.querySelectorAll('[data-reveal]');

      if (prefersReducedMotion) {
        gsap.set(elements, { opacity: 1, y: 0 });
        return;
      }

      elements.forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
    },
    { scope: scopeRef, dependencies: [] }
  );
};
