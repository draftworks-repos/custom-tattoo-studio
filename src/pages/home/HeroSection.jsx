import React, { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useLoader } from "../../context/LoaderContext.jsx";
import { StarGlyph } from "../../components/StarGlyph/StarGlyph.jsx";
import { Sticker } from "../../components/Sticker/Sticker.jsx";
import { Button } from "../../components/Button/Button.jsx";
import { LineReveal } from "../../components/LineReveal/LineReveal.jsx";
import { images } from "../../data/images.js";
import "./HeroSection.css";

export const HeroSection = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const eyebrowRef = useRef(null);
  const stylesRef = useRef(null);
  const ctaRef = useRef(null);
  const stickerRef = useRef(null);

  const { isLoaderDone } = useLoader();

  // Phase 1 — runs synchronously before the first paint so elements are
  // already hidden when the loader is covering the screen.
  // Plain useLayoutEffect (no GSAP context) means nothing gets auto-reverted
  // when Phase 2's context is set up — no flash between the two phases.
  // Guard with isLoaderDone so this is skipped on route navigations.
  useLayoutEffect(() => {
    if (isLoaderDone) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;

    if (imageRef.current) gsap.set(imageRef.current, { scale: 1.12 });
    if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 0, y: 15 });
    if (stickerRef.current) gsap.set(stickerRef.current, { opacity: 0, scale: 0.8, rotate: -15 });
    if (stylesRef.current) gsap.set(stylesRef.current, { opacity: 0, y: 15 });
    if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 0, scale: 0.9 });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — only run once on mount, before first paint

  // Phase 2 — plays the entrance timeline once the loader signals it's done.
  useGSAP(
    () => {
      const hero = heroRef.current;
      if (!hero) return;
      if (!isLoaderDone) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Entrance timeline (~1.8s total)
      if (imageRef.current) {
        tl.fromTo(
          imageRef.current,
          { scale: 1.12 },
          { scale: 1, duration: 1.6, ease: "power2.out" },
          0,
        );
      }

      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.3,
        );
      }

      if (stickerRef.current) {
        tl.fromTo(
          stickerRef.current,
          { opacity: 0, scale: 0.8, rotate: -15 },
          {
            opacity: 1,
            scale: 1,
            rotate: -6,
            duration: 0.6,
            ease: "back.out(1.5)",
          },
          0.5,
        );
      }

      if (stylesRef.current) {
        tl.fromTo(
          stylesRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.7,
        );
      }

      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" },
          0.85,
        );
      }
    },
    { scope: heroRef, dependencies: [isLoaderDone] },
  );

  return (
    <section ref={heroRef} className="hero-section" aria-label="Hero">
      {/* Background Image with warm grading */}
      <div className="hero__bg-wrap">
        <img
          ref={imageRef}
          src={images.home.heroArtist.url}
          alt={images.home.heroArtist.alt}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="hero__bg-img "
          draggable={false}
        />
        {/* Gradients matching exact reference */}
        {/* <div className="hero__overlay-horizontal" />
        <div className="hero__overlay-bottom" /> */}
      </div>

      {/* Hero Content Container */}
      <div className="container hero__container">
        <div className="hero__content">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="hero__eyebrow">
            <StarGlyph size={14} color="var(--crimson-400)" />
            <span>CUSTOM TATTOOS BY ARTISTS, FOR INDIVIDUALS.</span>
          </div>

          {/* Headline with Rotated Sticker */}
          <div className="hero__headline-wrapper">
            <LineReveal
              lines={["INK YOUR", "STORY"]}
              tag="h1"
              className="hero__title"
              triggerOnScroll={false}
              dotAfter={true}
              isReady={isLoaderDone}
            />

            {/* Rotated sticker near headline top-right */}
            <div ref={stickerRef} className="hero__sticker">
              <Sticker rotate={-6}>Walk-ins every Friday ✦</Sticker>
            </div>
          </div>

          {/* Style list with thin vertical dividers */}
          <div ref={stylesRef} className="hero__styles">
            <span>FINE LINE</span>
            <span className="hero__divider" aria-hidden="true" />
            <span>BLACK & GREY</span>
            <span className="hero__divider" aria-hidden="true" />
            <span>REALISM</span>
            <span className="hero__divider" aria-hidden="true" />
            <span>TRADITIONAL</span>
            <span className="hero__divider" aria-hidden="true" />
            <span>BLACKWORK</span>
          </div>

          {/* Primary CTA */}
          <div ref={ctaRef} className="hero__cta">
            <Button to="/contact" variant="primary">
              BOOK SESSION
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
