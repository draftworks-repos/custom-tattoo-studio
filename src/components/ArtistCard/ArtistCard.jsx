import React from 'react';
import { ImageTile } from '../ImageTile/ImageTile.jsx';
import './ArtistCard.css';

export const ArtistCard = ({
  name,
  specialty,
  image,
  shiftDown = false,
  className = '',
}) => {
  return (
    <article
      className={`artist-card ${shiftDown ? 'artist-card--shifted' : ''} ${className}`}
      data-reveal
    >
      <div className="artist-card__media">
        <ImageTile
          src={image.url}
          alt={image.alt}
          width={image.width}
          height={image.height}
          cursorView={true}
        />
      </div>
      <div className="artist-card__info">
        <h3 className="artist-card__name">{name}</h3>
        <span className="artist-card__pill">{specialty}</span>
      </div>
    </article>
  );
};
