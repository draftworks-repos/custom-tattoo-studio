import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { StatCounter } from '../../components/StatCounter/StatCounter.jsx';
import { ImageTile } from '../../components/ImageTile/ImageTile.jsx';
import { images } from '../../data/images.js';
import './IntroSection.css';

const INTRO_WORDS = [
  'EVERY', 'PIECE', 'STARTS', 'WITH', 'A', 'STORY.',
  'WE', 'JUST', 'HOLD', 'THE', 'NEEDLE.'
];

export const IntroSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const wordSpans = textRef.current.querySelectorAll('.intro__word');

      if (prefersReducedMotion) {
        gsap.set(wordSpans, { color: 'var(--cream)', opacity: 1 });
        return;
      }

      // Scrub word opacity as user scrolls down
      gsap.fromTo(
        wordSpans,
        { color: 'var(--cream-mute)', opacity: 0.35 },
        {
          color: 'var(--cream)',
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: 0.5,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="section intro-section" aria-labelledby="intro-statement">
      <div className="container intro__container">
        {/* Top: Statement & Tilted Studio Photo */}
        <div className="intro__top">
          <div className="intro__text-wrap">
            <p ref={textRef} id="intro-statement" className="intro__statement">
              {INTRO_WORDS.map((word, idx) => (
                <span key={idx} className="intro__word">
                  {word}{' '}
                </span>
              ))}
            </p>
          </div>

          <div className="intro__media-wrap" data-reveal>
            <div className="intro__photo-frame">
              <ImageTile
                src={images.home.introStudio.url}
                alt={images.home.introStudio.alt}
                width={images.home.introStudio.width}
                height={images.home.introStudio.height}
                cursorView={true}
                aspectRatio="4 / 5"
              />
            </div>
          </div>
        </div>

        {/* Bottom: Three stats horizontally aligned with 2s duration */}
        <div className="intro__stats">
          <div className="intro__stat-col">
            <StatCounter
              endValue={12}
              suffix=" yrs"
              label="in business crafting custom ink"
              duration={2}
            />
          </div>
          <div className="intro__stat-col">
            <StatCounter
              endValue={4800}
              suffix="+"
              label="custom pieces safely healed"
              duration={2}
            />
          </div>
          <div className="intro__stat-col">
            <StatCounter
              endValue={6}
              label="dedicated resident artists"
              duration={2}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
