import React from 'react';
import './StarGlyph.css';

export const StarGlyph = ({ size = 16, color = 'var(--crimson-400)', className = '' }) => {
  return (
    <svg
      className={`star-glyph ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ color }}
    >
      <path d="M12 0C12 7 7 12 0 12C7 12 12 17 12 24C12 17 17 12 24 12C17 12 12 7 12 0Z" />
    </svg>
  );
};
