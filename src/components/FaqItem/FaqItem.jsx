import React, { useRef } from 'react';
import { Plus } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import './FaqItem.css';

export const FaqItem = ({ question, answer, isOpen = false, onToggle }) => {
  const answerRef = useRef(null);

  useGSAP(
    () => {
      if (!answerRef.current) return;
      if (isOpen) {
        gsap.to(answerRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.35,
          ease: 'power3.out',
        });
      } else {
        gsap.to(answerRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.25,
          ease: 'power3.in',
        });
      }
    },
    { dependencies: [isOpen] }
  );

  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`} data-reveal>
      <button
        type="button"
        className="faq-item__trigger"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq-item__question">{question}</span>
        <span className="faq-item__icon" aria-hidden="true">
          <Plus size={20} />
        </span>
      </button>
      <div ref={answerRef} className="faq-item__body">
        <p className="faq-item__answer">{answer}</p>
      </div>
    </div>
  );
};
