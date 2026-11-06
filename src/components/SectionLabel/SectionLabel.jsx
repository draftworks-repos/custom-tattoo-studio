import React from 'react';
import { StarGlyph } from '../StarGlyph/StarGlyph.jsx';
import './SectionLabel.css';

export const SectionLabel = ({
  number,
  text,
  className = '',
  showStar = true,
}) => {
  return (
    <div className={`section-label ${className}`} data-reveal>
      {showStar && <StarGlyph size={12} color="var(--crimson-400)" />}
      {number && <span className="section-label__number">{number}</span>}
      {text && <span className="section-label__text">{text}</span>}
    </div>
  );
};
