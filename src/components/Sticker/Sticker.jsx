import React from 'react';
import './Sticker.css';

export const Sticker = ({ children, rotate = -6, className = '' }) => {
  return (
    <span
      className={`sticker ${className}`}
      style={{ '--sticker-rotate': `${rotate}deg` }}
    >
      {children}
    </span>
  );
};
