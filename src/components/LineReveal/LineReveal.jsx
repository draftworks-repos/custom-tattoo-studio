import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './LineReveal.css';

export const LineReveal = ({
  lines = [],
  tag: Tag = 'h1',
  className = '',
  triggerOnScroll = true,
  dotAfter = false,
}) => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const innerSpans = containerRef.current.querySelectorAll('.line-reveal__inner');

      if (prefersReducedMotion) {
        gsap.set(innerSpans, { y: '0%', opacity: 1 });
        return;
      }

      const tweenVars = {
        y: '0%',
        duration: 0.9,
        ease: 'power4.out',
        stagger: 0.1,
      };

      if (triggerOnScroll) {
        gsap.fromTo(
          innerSpans,
          { y: '110%' },
          {
            ...tweenVars,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      } else {
        // Immediate or delay trigger (e.g. for hero entrance)
        gsap.fromTo(innerSpans, { y: '110%' }, tweenVars);
      }
    },
    { scope: containerRef, dependencies: [lines, triggerOnScroll] }
  );

  return (
    <Tag ref={containerRef} className={`line-reveal ${className}`}>
      {lines.map((line, idx) => (
        <span key={idx} className="line-reveal__mask">
          <span className="line-reveal__inner">
            {line}
            {dotAfter && idx === lines.length - 1 && (
              <span className="dot-crimson" aria-hidden="true">.</span>
            )}
          </span>
        </span>
      ))}
    </Tag>
  );
};
