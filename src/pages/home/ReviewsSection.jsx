import React, { useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { SectionLabel } from '../../components/SectionLabel/SectionLabel.jsx';
import { ReviewCard } from '../../components/ReviewCard/ReviewCard.jsx';
import { reviews } from '../../data/reviews.js';
import './ReviewsSection.css';

export const ReviewsSection = () => {
  const [mobileIndex, setMobileIndex] = useState(0);
  const mobileCardRef = useRef(null);

  const handlePrev = () => {
    animateMobileChange((mobileIndex - 1 + reviews.length) % reviews.length, -1);
  };

  const handleNext = () => {
    animateMobileChange((mobileIndex + 1) % reviews.length, 1);
  };

  const animateMobileChange = (newIndex, direction) => {
    if (!mobileCardRef.current) {
      setMobileIndex(newIndex);
      return;
    }

    gsap.to(mobileCardRef.current, {
      x: direction * -30,
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        setMobileIndex(newIndex);
        gsap.fromTo(
          mobileCardRef.current,
          { x: direction * 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
      },
    });
  };

  const activeMobileReview = reviews[mobileIndex];

  return (
    <section className="section reviews-section" aria-labelledby="reviews-title">
      <div className="container reviews__container">
        <div className="reviews__header" data-reveal>
          <SectionLabel number="04 /" text="WORDS" />
          <h2 id="reviews-title" className="reviews__title">
            SKIN IN THE <span className="text-accent">GAME</span>.
          </h2>
        </div>

        {/* Desktop & Tablet: Staggered Multi-Column Grid */}
        <div className="reviews__grid reviews__grid--desktop">
          {reviews.map((rev, idx) => (
            <div
              key={rev.id}
              className={`reviews__col-wrap ${idx % 3 === 1 ? 'reviews__col-wrap--mid' : ''}`}
            >
              <ReviewCard
                quote={rev.quote}
                name={rev.name}
                rotation={rev.rotation}
              />
            </div>
          ))}
        </div>

        {/* Mobile: Single Card with Animated Navigation Controls */}
        <div className="reviews__mobile-slider">
          <div ref={mobileCardRef} className="reviews__mobile-card">
            <ReviewCard
              quote={activeMobileReview.quote}
              name={activeMobileReview.name}
              rotation={0}
            />
          </div>

          <div className="reviews__mobile-controls">
            <button
              type="button"
              className="reviews__nav-btn"
              onClick={handlePrev}
              aria-label="Previous review"
            >
              <ArrowLeft size={20} />
            </button>

            <div className="reviews__dots" aria-label={`Review ${mobileIndex + 1} of ${reviews.length}`}>
              {reviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`reviews__dot ${idx === mobileIndex ? 'reviews__dot--active' : ''}`}
                  onClick={() => animateMobileChange(idx, idx > mobileIndex ? 1 : -1)}
                  aria-label={`Go to review ${idx + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              className="reviews__nav-btn"
              onClick={handleNext}
              aria-label="Next review"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
