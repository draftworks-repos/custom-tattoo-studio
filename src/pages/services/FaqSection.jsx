import React, { useState } from 'react';
import { SectionLabel } from '../../components/SectionLabel/SectionLabel.jsx';
import { FaqItem } from '../../components/FaqItem/FaqItem.jsx';
import { faqs } from '../../data/services.js';
import './FaqSection.css';

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="section faq-section" aria-labelledby="faq-title">
      <div className="container faq-section__container">
        <div className="faq-section__header" data-reveal>
          <SectionLabel number="04 /" text="STUDIO FAQ" />
          <h2 id="faq-title" className="faq-section__title">
            COMMON <span className="text-accent">QUESTIONS</span>.
          </h2>
          <p className="faq-section__subtitle">
            Needle preparation, skin sensitivity, age verification, and aftercare routines explained in full clarity.
          </p>
        </div>

        <div className="faq-section__accordion" data-reveal>
          {faqs.map((faq, idx) => (
            <FaqItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onToggle={() => handleToggle(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
