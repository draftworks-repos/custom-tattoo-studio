import React, { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ImageTile } from '../ImageTile/ImageTile.jsx';
import './StyleRow.css';

export const StyleRow = ({
  num,
  name,
  tagline,
  image,
  isExpanded,
  onToggle,
  onHoverStart,
  onHoverEnd,
}) => {
  const contentRef = useRef(null);

  useGSAP(
    () => {
      if (!contentRef.current) return;
      if (isExpanded) {
        gsap.to(contentRef.current, {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power3.out',
        });
      } else {
        gsap.to(contentRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: 'power3.in',
        });
      }
    },
    { dependencies: [isExpanded] }
  );

  return (
    <div
      className={`style-row ${isExpanded ? 'style-row--expanded' : ''}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
    >
      <button
        type="button"
        className="style-row__button"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <div className="style-row__left">
          <span className="style-row__num text-stroke">{num}</span>
          <span className="style-row__name">{name}</span>
        </div>
        <div className="style-row__right">
          <span className="style-row__tagline">{tagline}</span>
          <span className="style-row__icon" aria-hidden="true">
            <ArrowUpRight size={26} />
          </span>
        </div>
      </button>

      {/* Inline touch-expandable container for small screens */}
      <div ref={contentRef} className="style-row__mobile-preview">
        {image && (
          <div className="style-row__img-wrap">
            <ImageTile
              src={image.url}
              alt={image.alt}
              width={image.width}
              height={image.height}
              aspectRatio="16 / 10"
            />
          </div>
        )}
      </div>
    </div>
  );
};
