import React, { useRef } from 'react';
import { ShieldCheck, FlaskConical, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '../components/SectionLabel/SectionLabel.jsx';
import { ImageTile } from '../components/ImageTile/ImageTile.jsx';
import { ArtistsSection } from './about/ArtistsSection.jsx';
import { TimelineSection } from './about/TimelineSection.jsx';
import { CtaBand } from '../components/CtaBand/CtaBand.jsx';
import { images } from '../data/images.js';
import { hygienePromises } from '../data/artists.js';
import { useReveal } from '../hooks/useReveal.js';
import './About.css';

const hygieneIcons = {
  ShieldCheck,
  FlaskConical,
  Sparkles,
};

export const About = () => {
  const pageRef = useRef(null);
  const heroImageRef = useRef(null);
  const parallaxWallRef = useRef(null);

  useReveal(pageRef);

  // Clip-path reveal on hero image + Parallax on wall image
  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      // 1. Header image reveal with clip-path inset(100% 0 0 0) -> inset(0)
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 0.9,
            ease: 'power3.inOut',
            delay: 0.2,
          }
        );
      }

      // 2. Parallax scrub on about-wall image (y 40px scrub)
      if (parallaxWallRef.current) {
        gsap.to(parallaxWallRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: parallaxWallRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    },
    { scope: pageRef }
  );

  return (
    <main ref={pageRef} id="main-content" className="about-page">
      {/* 1. Header with Clip-Path Revealed Wide Image */}
      <section className="about-header" aria-labelledby="about-hero-title">
        <div className="container about-header__container">
          <div className="about-header__text" data-reveal>
            <SectionLabel number="ABOUT /" text="OUR FOUNDATION" />
            <h1 id="about-hero-title" className="about-header__title">
              BORN IN A <span className="text-accent">BACK ROOM</span>.
            </h1>
          </div>

          <div ref={heroImageRef} className="about-header__media">
            <ImageTile
              src={images.about.hero.url}
              alt={images.about.hero.alt}
              width={images.about.hero.width}
              height={images.about.hero.height}
              aspectRatio="16 / 9"
              fetchPriority="high"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* 2. Story: Two Columns (Text Left, Image Right Offset Down 60px) */}
      <section className="section about-story" aria-labelledby="story-title">
        <div className="container about-story__container">
          <div className="about-story__left" data-reveal>
            <SectionLabel number="02 /" text="THE PHILOSOPHY" />
            <h2 id="story-title" className="about-story__heading">
              BUILT FOR COMFORT. <br />
              <span className="text-accent">GROUNDED IN CRAFT</span>.
            </h2>
            <div className="about-story__paragraphs">
              <p>
                INKED began in 2014 when four independent artists grew tired of two extremes:
                sterile, intimidating medical shops and chaotic street-corner walk-in parlors.
                We wanted a studio that felt like an artist's personal living room.
              </p>
              <p>
                Tattooing is inherently intimate. You are putting trust into our hands, our ink,
                and our machines for something permanent. That means unhurried consultations,
                custom sketches tailored directly to bodily contours, and an environment where you
                always feel listened to.
              </p>
              <p>
                We do not copy Pinterest stencils, and we will never push a client into something
                that does not sit right. Quality over volume, always.
              </p>
            </div>
          </div>

          <div className="about-story__right" data-reveal>
            <div className="about-story__photo-wrap">
              <ImageTile
                src={images.about.story.url}
                alt={images.about.story.alt}
                width={images.about.story.width}
                height={images.about.story.height}
                aspectRatio="4 / 5"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Artists Section */}
      <ArtistsSection />

      {/* 4. Timeline Section */}
      <TimelineSection />

      {/* 5. Hygiene Promise & Flash Wall with Parallax */}
      <section className="section about-hygiene" aria-labelledby="hygiene-title">
        <div className="container about-hygiene__container">
          <div className="about-hygiene__top" data-reveal>
            <SectionLabel number="05 /" text="STERILIZATION & CARE" />
            <h2 id="hygiene-title" className="about-hygiene__title">
              THE HYGIENE <span className="text-accent">PROMISE</span>.
            </h2>
            <p className="about-hygiene__subtitle">
              We operate above hospital-grade standards. Because clean skin heals true ink.
            </p>
          </div>

          {/* 3 Icon Rows */}
          <div className="about-hygiene__grid" data-reveal>
            {hygienePromises.map((item) => {
              const Icon = hygieneIcons[item.iconName] || ShieldCheck;
              return (
                <div key={item.id} className="hygiene-card">
                  <div className="hygiene-card__icon" aria-hidden="true">
                    <Icon size={26} />
                  </div>
                  <h3 className="hygiene-card__title">{item.title}</h3>
                  <p className="hygiene-card__desc">{item.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Flash Wall with Parallax Y 40px Scrub */}
          <div className="about-hygiene__wall-wrap">
            <div ref={parallaxWallRef} className="about-hygiene__wall">
              <ImageTile
                src={images.about.wall.url}
                alt={images.about.wall.alt}
                width={images.about.wall.width}
                height={images.about.wall.height}
                aspectRatio="21 / 9"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA Band */}
      <CtaBand
        title="JOIN OUR FAMILY OF HEALED INK."
        buttonText="BOOK YOUR VISIT"
      />
    </main>
  );
};
