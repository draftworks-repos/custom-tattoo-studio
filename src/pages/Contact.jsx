import React, { useRef } from 'react';
import { SectionLabel } from '../components/SectionLabel/SectionLabel.jsx';
import { BookingForm } from './contact/BookingForm.jsx';
import { StudioInfo } from './contact/StudioInfo.jsx';
import { useReveal } from '../hooks/useReveal.js';
import './Contact.css';

export const Contact = () => {
  const pageRef = useRef(null);
  useReveal(pageRef);

  return (
    <main ref={pageRef} id="main-content" className="contact-page">
      {/* 1. Header (Expanded to match About section scale and width) */}
      <section className="contact-header" aria-labelledby="contact-hero-title">
        <div className="container contact-header__container">
          <div className="contact-header__text" data-reveal>
            <SectionLabel number="CONSULT /" text="BOOK YOUR SESSION" />
            <h1 id="contact-hero-title" className="contact-header__title">
              LET'S TALK <span className="text-accent">INK</span>.
            </h1>
            <p className="contact-header__notice">
              Tell us about your placement, size, and story. All consultations are complimentary with replies within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* 2 & 3. Main Form (7 cols) + Studio Info with Map (5 cols, Equal Height) */}
      <section className="section contact-body" aria-label="Booking and Studio Information">
        <div className="container contact-body__container">
          <div className="contact-body__form-col" data-reveal>
            <BookingForm />
          </div>

          <div className="contact-body__info-col" data-reveal>
            <StudioInfo />
          </div>
        </div>
      </section>
    </main>
  );
};
