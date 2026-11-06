import React from 'react';
import { MousePointer } from 'lucide-react';
import { SectionLabel } from '../../components/SectionLabel/SectionLabel.jsx';
import { BoundedCarousel } from '../../components/BoundedCarousel/BoundedCarousel.jsx';
import { images } from '../../data/images.js';
import './PortfolioSection.css';

export const PortfolioSection = () => {
  const carouselLayers = [
    {
      direction: 1, // Moves left as scroll progresses
      items: images.home.layerA,
    },
    {
      direction: -1, // Moves right as scroll progresses
      items: images.home.layerB,
    },
  ];

  return (
    <section className="section portfolio-section" aria-labelledby="portfolio-title">
      <div className="container portfolio__header">
        <div className="portfolio__header-left" data-reveal>
          <SectionLabel number="01 /" text="PORTFOLIO" />
          <h2 id="portfolio-title" className="portfolio__title">
            FRESH OFF THE <span className="text-accent">SKIN</span>.
          </h2>
        </div>

        <div className="portfolio__hint" data-reveal>
          <MousePointer size={16} aria-hidden="true" />
          <span>Scroll or drag to explore</span>
        </div>
      </div>

      {/* Horizontal Bounded Dual-Layer Carousel */}
      <div className="portfolio__carousel-wrap">
        <BoundedCarousel
          axis="x"
          layers={carouselLayers}
          cursorStrength={0.12}
        />
      </div>
    </section>
  );
};
