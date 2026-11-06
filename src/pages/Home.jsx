import React, { useRef } from 'react';
import { HeroSection } from './home/HeroSection.jsx';
import { IntroSection } from './home/IntroSection.jsx';
import { PortfolioSection } from './home/PortfolioSection.jsx';
import { StylesSection } from './home/StylesSection.jsx';
import { ProcessSection } from './home/ProcessSection.jsx';
import { ArtistsSection } from './about/ArtistsSection.jsx';
import { ReviewsSection } from './home/ReviewsSection.jsx';
import { Marquee } from '../components/Marquee/Marquee.jsx';
import { CtaBand } from '../components/CtaBand/CtaBand.jsx';
import { useReveal } from '../hooks/useReveal.js';
import './Home.css';

export const Home = () => {
  const pageRef = useRef(null);
  useReveal(pageRef);

  return (
    <main ref={pageRef} id="main-content" className="home-page">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Dual Marquee Band */}
      <Marquee />

      {/* 3. Intro Section */}
      <IntroSection />

      {/* 4. Portfolio Bounded Carousel */}
      <PortfolioSection />

      {/* 5. Styles Section */}
      <StylesSection />

      {/* 6. Process Section */}
      <ProcessSection />

      {/* 7. Meet The Crew (Artists Section) */}
      <ArtistsSection />

      {/* 8. Reviews Section */}
      <ReviewsSection />

      {/* 9. CTA Band */}
      <CtaBand
        title="YOUR SKIN. YOUR STORY. LET'S START."
        buttonText="BOOK SESSION"
      />
    </main>
  );
};
