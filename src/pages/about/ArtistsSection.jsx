import React from 'react';
import { SectionLabel } from '../../components/SectionLabel/SectionLabel.jsx';
import { ArtistCard } from '../../components/ArtistCard/ArtistCard.jsx';
import { artists } from '../../data/artists.js';
import './ArtistsSection.css';

export const ArtistsSection = () => {
  return (
    <section className="section artists-section" aria-labelledby="artists-title">
      <div className="container artists-section__container">
        <div className="artists-section__header" data-reveal>
          <SectionLabel number="03 /" text="THE RESIDENTS" />
          <h2 id="artists-title" className="artists-section__title">
            MEET THE <span className="text-accent">CREW</span>.
          </h2>
          <p className="artists-section__desc">
            No egos, no assembly lines. Each artist runs their own dedicated chair and books limited sessions per week to keep craft uncompromised.
          </p>
        </div>

        {/* Asymmetric 4-Card Grid (2nd and 4th shifted down) */}
        <div className="artists-section__grid">
          {artists.map((artist) => (
            <ArtistCard
              key={artist.id}
              name={artist.name}
              specialty={artist.specialty}
              image={artist.image}
              shiftDown={artist.shiftDown}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
