import React from 'react';
import './Marquee.css';

export const Marquee = ({
  items1 = [
    'FINE LINE',
    'BLACK & GREY',
    'REALISM',
    'TRADITIONAL',
    'BLACKWORK',
  ],
  items2 = [
    'CUSTOM INK',
    'STERILE MASTERY',
    'HEALED TO PERFECTION',
    'NO REGRETS',
    'FLASH FRIDAYS',
  ],
  speed = 28,
  className = '',
}) => {
  const content1 = items1.map((text, idx) => (
    <span key={idx} className="marquee__item">
      <span>{text}</span>
      <span className="marquee__glyph" aria-hidden="true">✦</span>
    </span>
  ));

  const content2 = items2.map((text, idx) => (
    <span key={idx} className="marquee__item marquee__item--alt">
      <span>{text}</span>
      <span className="marquee__glyph marquee__glyph--alt" aria-hidden="true">✦</span>
    </span>
  ));

  return (
    <div className={`marquee-wrapper ${className}`}>
      {/* First Band: Rotated -2deg, moving left */}
      <div
        className="marquee-band marquee-band--1"
        style={{ '--marquee-duration': `${speed}s` }}
      >
        <div className="marquee-band__inner">
          <div className="marquee-band__track marquee-band__track--left">
            {content1}
            {content1}
            {content1}
            {content1}
          </div>
        </div>
      </div>

      {/* Second Band: Rotated +2.5deg, moving in opposite direction (right) */}
      <div
        className="marquee-band marquee-band--2"
        style={{ '--marquee-duration': `${speed * 1.1}s` }}
      >
        <div className="marquee-band__inner">
          <div className="marquee-band__track marquee-band__track--right">
            {content2}
            {content2}
            {content2}
            {content2}
          </div>
        </div>
      </div>
    </div>
  );
};
