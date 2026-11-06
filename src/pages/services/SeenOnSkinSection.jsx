import React from 'react';
import { SectionLabel } from '../../components/SectionLabel/SectionLabel.jsx';
import { Button } from '../../components/Button/Button.jsx';
import { BoundedCarousel } from '../../components/BoundedCarousel/BoundedCarousel.jsx';
import { images } from '../../data/images.js';
import './SeenOnSkinSection.css';

export const SeenOnSkinSection = () => {
  const col1 = images.services.slice(0, 4);
  const col2 = images.services.slice(4, 8);
  const col3 = images.services.slice(8, 12);

  const verticalLayers = [
    {
      direction: 1, // Moves UP with scroll
      items: col1,
    },
    {
      direction: -1, // Moves DOWN with scroll
      items: col2,
    },
    {
      direction: 1, // Moves UP with scroll
      items: col3,
    },
  ];

  return (
    <section className="section seen-on-skin" aria-labelledby="seen-title">
      <div className="container seen-on-skin__container">
        {/* Header: Title on Left, Button Right-Aligned */}
        <div className="seen-on-skin__header" data-reveal>
          <div className="seen-on-skin__header-left">
            <SectionLabel number="02 /" text="IN PRACTICE" />
            <h2 id="seen-title" className="seen-on-skin__title">
              SEEN ON <span className="text-accent">SKIN</span>.
            </h2>
          </div>

          <div className="seen-on-skin__header-right">
            <Button to="/contact" variant="primary">
              BOOK YOUR CHAIR
            </Button>
          </div>
        </div>

        {/* 3-Column Vertical Bounded Carousel Frame */}
        <div className="seen-on-skin__carousel-col" data-reveal>
          <BoundedCarousel
            axis="y"
            layers={verticalLayers}
          />
        </div>
      </div>
    </section>
  );
};
