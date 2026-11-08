import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { images } from '../../data/images.js';
import { artists } from '../../data/artists.js';
import { useLoader } from '../../context/LoaderContext.jsx';
import './InitialLoader.css';

// Extract all unique image URLs used across the website
const getAllImageUrls = () => {
  const urls = new Set();
  if (images.home?.heroArtist?.url) urls.add(images.home.heroArtist.url);
  if (images.home?.introStudio?.url) urls.add(images.home.introStudio.url);
  images.home?.layerA?.forEach((item) => item.url && urls.add(item.url));
  images.home?.layerB?.forEach((item) => item.url && urls.add(item.url));
  if (images.home?.styles) {
    Object.values(images.home.styles).forEach((style) => style.url && urls.add(style.url));
  }
  images.services?.forEach((item) => item.url && urls.add(item.url));
  if (images.about?.hero?.url) urls.add(images.about.hero.url);
  if (images.about?.story?.url) urls.add(images.about.story.url);
  if (images.about?.wall?.url) urls.add(images.about.wall.url);
  artists.forEach((artist) => artist.image?.url && urls.add(artist.image.url));
  return Array.from(urls);
};

export const InitialLoader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const loaderRef = useRef(null);
  const progressObj = useRef({ val: 0 });
  const { setLoaderDone } = useLoader();

  useEffect(() => {
    // If reduced motion is preferred, immediately dismiss
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsLoaded(true);
      setLoaderDone();
      return;
    }

    // Lock scroll during initial load
    document.body.style.overflow = 'hidden';

    const urls = getAllImageUrls();
    const total = urls.length;
    let loadedCount = 0;

    if (total === 0) {
      setProgress(100);
      return;
    }

    // Function to handle image load progress
    const onImageLoaded = () => {
      loadedCount += 1;
      const targetPercent = Math.min(100, Math.round((loadedCount / total) * 100));

      gsap.to(progressObj.current, {
        val: targetPercent,
        duration: 0.35,
        ease: 'power1.out',
        onUpdate: () => {
          setProgress(Math.round(progressObj.current.val));
        },
      });
    };

    // Preload each image via native Image objects
    urls.forEach((url) => {
      const img = new Image();
      img.onload = onImageLoaded;
      img.onerror = onImageLoaded; // Still count toward 100% on error
      img.src = url;
    });

    // Safety timeout: ensure loader smoothly finishes even on slow network
    const fallbackTimer = setTimeout(() => {
      gsap.to(progressObj.current, {
        val: 100,
        duration: 0.6,
        ease: 'power2.out',
        onUpdate: () => {
          setProgress(Math.round(progressObj.current.val));
        },
      });
    }, 3500);

    return () => {
      clearTimeout(fallbackTimer);
      document.body.style.overflow = '';
    };
  }, []);

  // When progress hits 100%, hold briefly and slide up out of view
  useEffect(() => {
    if (progress >= 100 && loaderRef.current) {
      const tl = gsap.timeline({
        delay: 0.28,
        onComplete: () => {
          setIsLoaded(true);
          setLoaderDone();
          document.body.style.overflow = '';
        },
      });

      tl.to(loaderRef.current, {
        yPercent: -100,
        duration: 0.75,
        ease: 'power3.inOut',
      });
    }
  }, [progress]);

  if (isLoaded) return null;

  return (
    <aside
      ref={loaderRef}
      className="initial-loader"
      aria-label="Website loading"
      role="status"
    >
      <div className="initial-loader__counter">
        <span className="initial-loader__num">{progress}</span>
        <span className="initial-loader__percent">%</span>
        <span className="dot-crimson">.</span>
      </div>
    </aside>
  );
};
