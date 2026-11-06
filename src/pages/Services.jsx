import React, { useRef } from 'react';
import { SectionLabel } from '../components/SectionLabel/SectionLabel.jsx';
import { Sticker } from '../components/Sticker/Sticker.jsx';
import { ServiceRow } from '../components/ServiceRow/ServiceRow.jsx';
import { SeenOnSkinSection } from './services/SeenOnSkinSection.jsx';
import { PricingSection } from './services/PricingSection.jsx';
import { FaqSection } from './services/FaqSection.jsx';
import { CtaBand } from '../components/CtaBand/CtaBand.jsx';
import { services } from '../data/services.js';
import { useReveal } from '../hooks/useReveal.js';
import './Services.css';

export const Services = () => {
  const pageRef = useRef(null);
  useReveal(pageRef);

  return (
    <main ref={pageRef} id="main-content" className="services-page">
      {/* 1. Services Header */}
      <section className="services-header" aria-labelledby="services-hero-title">
        <div className="container services-header__container">
          <div className="services-header__top" data-reveal>
            <SectionLabel number="SERVICES /" text="CRAFT & DISCIPLINES" />
            <div className="services-header__title-wrap">
              <h1 id="services-hero-title" className="services-header__title">
                WHAT WE DO<span className="dot-crimson">.</span>
              </h1>
              <div className="services-header__sticker">
                <Sticker rotate={-4}>Consults are free ✦</Sticker>
              </div>
            </div>
            <p className="services-header__intro">
              Custom tattooing across five distinct disciplines. Designed intentionally for your anatomy,
              engineered with single-use precision, and built to age beautifully.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Service List (6 Editorial Rows) */}
      <section className="section services-list-section" aria-label="Service Offerings">
        <div className="container services-list-section__container">
          <div className="services-list">
            {services.map((item) => (
              <ServiceRow
                key={item.num}
                num={item.num}
                name={item.name}
                description={item.description}
                meta={item.meta}
                to="/contact"
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Seen On Skin Vertical Carousel */}
      <SeenOnSkinSection />

      {/* 4. Pricing Standards (Honest Rates) */}
      <PricingSection />

      {/* 5. Studio FAQ */}
      <FaqSection />

      {/* 6. CTA Band */}
      <CtaBand
        title="READY TO INK YOUR NEXT PIECE?"
        buttonText="START A CONSULT"
      />
    </main>
  );
};
