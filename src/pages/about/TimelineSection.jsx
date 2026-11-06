import React from 'react';
import { SectionLabel } from '../../components/SectionLabel/SectionLabel.jsx';
import { timelineMilestones } from '../../data/artists.js';
import './TimelineSection.css';

export const TimelineSection = () => {
  return (
    <section className="section timeline-section" aria-labelledby="timeline-title">
      <div className="container timeline-section__container">
        <div className="timeline-section__header" data-reveal>
          <SectionLabel number="04 /" text="OUR JOURNEY" />
          <h2 id="timeline-title" className="timeline-section__title">
            TEN YEARS OF <span className="text-accent">NEEDLE WORK</span>.
          </h2>
          <p className="timeline-section__subtitle">
            A decade of deliberate growth, strict sterilization standards, and independent artistry.
          </p>
        </div>

        {/* 4 Clean Milestone Cards without misaligned lines or dots */}
        <div className="timeline__grid">
          {timelineMilestones.map((item, idx) => (
            <div key={idx} className="timeline-card" data-reveal>
              <div className="timeline-card__year">{item.year}</div>
              <h3 className="timeline-card__title">{item.title}</h3>
              <p className="timeline-card__desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
