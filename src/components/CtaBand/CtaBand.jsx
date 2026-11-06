import React from 'react';
import { Button } from '../Button/Button.jsx';
import { StarGlyph } from '../StarGlyph/StarGlyph.jsx';
import './CtaBand.css';

export const CtaBand = ({
  title = "YOUR SKIN. YOUR STORY. LET'S START.",
  buttonText = "BOOK SESSION",
  to = "/contact",
  className = "",
}) => {
  return (
    <section className={`cta-band ${className}`} aria-labelledby="cta-title">
      <div className="container cta-band__container" data-reveal>
        <div className="cta-band__icon">
          <StarGlyph size={28} color="var(--crimson-400)" />
        </div>
        <h2 id="cta-title" className="cta-band__title">
          {title}
        </h2>
        <div className="cta-band__action">
          <Button to={to} variant="primary" showArrow={true}>
            {buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
};
