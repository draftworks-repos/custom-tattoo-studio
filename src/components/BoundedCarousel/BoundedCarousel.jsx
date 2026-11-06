import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ImageTile } from '../ImageTile/ImageTile.jsx';
import './BoundedCarousel.css';

export const BoundedCarousel = ({
  axis = 'x', // 'x' | 'y'
  layers = [],
  className = '',
}) => {
  const containerRef = useRef(null);
  const trackRefs = useRef([]);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container || !layers.length) return;

      const tracks = trackRefs.current.filter(Boolean);
      if (tracks.length < layers.length) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReducedMotion) return;

      const prop = axis === 'x' ? 'x' : 'y';
      const isX = axis === 'x';

      // Set up quickTo updaters for each track
      const quickSetters = tracks.map((track) =>
        gsap.quickTo(track, prop, { duration: 0.5, ease: 'power3.out' })
      );

      let currentProgress = 0;
      const dragOffsets = layers.map(() => 0);
      let isDragging = false;
      let activeTrackIdx = 0;
      let startPointerPos = 0;
      let startOffset = 0;

      // Computes and clamps travel for a given track
      const updateTracks = () => {
        tracks.forEach((track, index) => {
          if (!track) return;
          const layer = layers[index];
          const direction = layer?.direction || (index === 0 ? 1 : -1);

          let maxTravel = 0;
          if (isX) {
            maxTravel = Math.max(0, track.scrollWidth - container.clientWidth);
          } else {
            maxTravel = Math.max(0, track.scrollHeight - container.clientHeight);
          }

          if (maxTravel <= 0) {
            quickSetters[index](0);
            return;
          }

          const userDrag = dragOffsets[index] || 0;

          let targetVal = 0;
          if (direction === 1) {
            // Moves left/up as user scrolls forward
            targetVal = -(currentProgress * maxTravel) + userDrag;
          } else {
            // Moves right/down as user scrolls forward
            targetVal = -maxTravel + (currentProgress * maxTravel) + userDrag;
          }

          // Strict clamp: [ -maxTravel, 0 ] guarantees no empty gap on either edge
          const clampedVal = gsap.utils.clamp(-maxTravel, 0, targetVal);

          // Sync back user drag so drag never exceeds boundaries
          if (isDragging && index === activeTrackIdx) {
            if (direction === 1) {
              dragOffsets[index] = clampedVal - (-(currentProgress * maxTravel));
            } else {
              dragOffsets[index] = clampedVal - (-maxTravel + (currentProgress * maxTravel));
            }
          }

          quickSetters[index](clampedVal);
        });
      };

      // ScrollTrigger to track scroll progress across the container
      const st = ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          currentProgress = self.progress;
          updateTracks();
        },
        onRefreshInit: () => {
          updateTracks();
        },
      });

      // Pointer drag interaction for horizontal axis
      const onPointerDown = (e, trackIdx) => {
        if (!isX) return;
        isDragging = true;
        activeTrackIdx = trackIdx;
        startPointerPos = e.clientX;
        startOffset = dragOffsets[trackIdx] || 0;
        container.classList.add('bounded-carousel--dragging');

        const onPointerMove = (ev) => {
          if (!isDragging) return;
          const delta = ev.clientX - startPointerPos;
          dragOffsets[activeTrackIdx] = startOffset + delta;
          updateTracks();
        };

        const onPointerUp = () => {
          isDragging = false;
          container.classList.remove('bounded-carousel--dragging');
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('pointerup', onPointerUp);
        };

        window.addEventListener('pointermove', onPointerMove);
        window.addEventListener('pointerup', onPointerUp);
      };

      // Attach pointerdown to each track for drag-and-hold
      const cleanups = [];
      if (isX) {
        tracks.forEach((track, idx) => {
          const handler = (e) => onPointerDown(e, idx);
          track.addEventListener('pointerdown', handler);
          cleanups.push(() => track.removeEventListener('pointerdown', handler));
        });
      }

      // Resize observer to recalculate dimensions smoothly
      let resizeTimeout;
      const ro = new ResizeObserver(() => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          updateTracks();
        }, 150);
      });

      ro.observe(container);
      tracks.forEach((track) => ro.observe(track));

      // Initial update
      updateTracks();

      return () => {
        if (st) st.kill();
        ro.disconnect();
        clearTimeout(resizeTimeout);
        cleanups.forEach((fn) => fn());
      };
    },
    { scope: containerRef, dependencies: [axis, layers] }
  );

  return (
    <div
      ref={containerRef}
      className={`bounded-carousel bounded-carousel--${axis} ${className}`}
      data-cursor={axis === 'x' ? 'grab' : undefined}
    >
      {layers.map((layer, layerIdx) => (
        <div
          key={layerIdx}
          className={`bounded-carousel__row bounded-carousel__row--${axis}`}
        >
          <div
            ref={(el) => (trackRefs.current[layerIdx] = el)}
            className={`bounded-carousel__track bounded-carousel__track--${axis}`}
          >
            {layer.items.map((item, itemIdx) => (
              <div
                key={item.id || itemIdx}
                className={`bounded-carousel__item bounded-carousel__item--${axis}`}
                style={
                  axis === 'x' && item.width && item.height
                    ? { aspectRatio: `${item.width} / ${item.height}` }
                    : undefined
                }
              >
                <ImageTile
                  src={item.url}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  cursorView={false}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
