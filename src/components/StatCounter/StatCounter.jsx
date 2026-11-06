import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './StatCounter.css';

export const StatCounter = ({
  endValue = 0,
  prefix = '',
  suffix = '',
  label = '',
  duration = 2,
  className = '',
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) {
        setDisplayValue(endValue);
        return;
      }

      const counterObj = { val: 0 };

      gsap.to(counterObj, {
        val: endValue,
        duration: duration,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          setDisplayValue(Math.floor(counterObj.val));
        },
      });
    },
    { scope: containerRef, dependencies: [endValue, duration] }
  );

  return (
    <div ref={containerRef} className={`stat-counter ${className}`} data-reveal>
      <div className="stat-counter__val">
        {prefix}
        {displayValue.toLocaleString()}
        {suffix}
      </div>
      <div className="stat-counter__label">{label}</div>
    </div>
  );
};
