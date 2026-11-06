import React from 'react';
import { SectionLabel } from '../../components/SectionLabel/SectionLabel.jsx';
import { pricingNotes } from '../../data/services.js';
import './PricingSection.css';

export const PricingSection = () => {
  return (
    <section className="section pricing-section" aria-labelledby="pricing-title">
      <div className="container pricing-section__container">
        <div className="pricing-section__header" data-reveal>
          <SectionLabel number="03 /" text="HONEST RATES" />
          <h2 id="pricing-title" className="pricing-section__title">
            CLEAR STANDARDS. <span className="text-accent">NO SURPRISES</span>.
          </h2>
          <p className="pricing-section__intro">
            We provide firm quotes during consultation before any stencil touches skin.
            Every rate includes single-use disposables, barrier preparation, and medical second-skin aftercare.
          </p>
        </div>

        {/* 3 Spacious Pricing Cards */}
        <div className="pricing-section__grid" data-reveal>
          {pricingNotes.map((note, idx) => (
            <div key={idx} className="pricing-card">
              <div className="pricing-card__header">
                <span className="pricing-card__badge">RATE 0{idx + 1}</span>
                <span className="pricing-card__amount">{note.amount}</span>
              </div>
              <h3 className="pricing-card__label">{note.label}</h3>
              <p className="pricing-card__desc">{note.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
