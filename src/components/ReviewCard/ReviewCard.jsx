import React from 'react';
import { Star } from 'lucide-react';
import { GoogleG } from '../GoogleG/GoogleG.jsx';
import './ReviewCard.css';

export const ReviewCard = ({ quote, name, rotation = 0, className = '' }) => {
  return (
    <article
      className={`review-card ${className}`}
      style={{ '--card-rotate': `${rotation}deg` }}
      data-reveal
    >
      {/* 5 filled gold stars */}
      <div className="review-card__stars" aria-label="5 out of 5 stars">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            fill="currentColor"
            color="var(--gold)"
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="review-card__quote">
        “{quote}”
      </blockquote>

      {/* Bottom row: Google G inside 36px cream circle + Reviewer name */}
      <div className="review-card__author">
        <GoogleG size={18} />
        <span className="review-card__name">{name}</span>
      </div>
    </article>
  );
};
