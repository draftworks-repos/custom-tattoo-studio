import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SectionLabel } from '../../components/SectionLabel/SectionLabel.jsx';
import { StyleRow } from '../../components/StyleRow/StyleRow.jsx';
import { ImageTile } from '../../components/ImageTile/ImageTile.jsx';
import { styles } from '../../data/styles.js';
import { images } from '../../data/images.js';
import { useCursorFine } from '../../hooks/useCursorFine.js';
import './StylesSection.css';

export const StylesSection = () => {
  const [hoveredStyle, setHoveredStyle] = useState(null);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const previewRef = useRef(null);
  const sectionRef = useRef(null);
  const isFine = useCursorFine();
  const mousePos = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);

  // Floating preview smoothly follows the cursor across the window
  useEffect(() => {
    if (!isFine) return;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (previewRef.current && isHoveringRef.current) {
        gsap.to(previewRef.current, {
          x: e.clientX + 24,
          y: e.clientY - 140,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [isFine]);

  const handleHoverStart = (style) => {
    if (!isFine || !previewRef.current) return;
    isHoveringRef.current = true;
    setHoveredStyle(style);

    const preview = previewRef.current;
    // If opening from hidden, snap to cursor immediately
    const currentOpacity = Number(gsap.getProperty(preview, 'opacity')) || 0;
    if (currentOpacity < 0.1) {
      gsap.set(preview, {
        x: mousePos.current.x + 24,
        y: mousePos.current.y - 140,
      });
    }

    gsap.to(preview, {
      opacity: 1,
      scale: 1,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    });
  };

  const handleHoverEnd = () => {
    if (!isFine || !previewRef.current) return;
    isHoveringRef.current = false;

    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.85,
      duration: 0.2,
      ease: 'power2.in',
      overwrite: 'auto',
      onComplete: () => {
        if (!isHoveringRef.current) {
          setHoveredStyle(null);
        }
      },
    });
  };

  const handleToggle = (idx) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <section ref={sectionRef} className="section styles-section" aria-labelledby="styles-title">
      <div className="container styles__container">
        <div className="styles__header" data-reveal>
          <SectionLabel number="02 /" text="STYLES" />
          <h2 id="styles-title" className="styles__title">
            PICK YOUR <span className="text-accent">POISON</span>.
          </h2>
        </div>

        {/* onMouseLeave attached to the list so hovering between rows keeps preview active */}
        <div className="styles__list" onMouseLeave={handleHoverEnd}>
          {styles.map((item, idx) => {
            const styleImg = images.home.styles[item.imageKey];
            return (
              <StyleRow
                key={item.id}
                num={item.num}
                name={item.name}
                tagline={item.tagline}
                image={styleImg}
                isExpanded={expandedIndex === idx}
                onToggle={() => handleToggle(idx)}
                onHoverStart={() => handleHoverStart(item)}
              />
            );
          })}
        </div>
      </div>

      {/* Floating Cursor Image Preview for Desktop Only */}
      {isFine && (
        <div ref={previewRef} className="styles__floating-preview" aria-hidden="true">
          {hoveredStyle && (
            <div className="styles__preview-inner">
              <ImageTile
                src={images.home.styles[hoveredStyle.imageKey]?.url}
                alt=""
                width={300}
                height={380}
                tone={true}
                aspectRatio="3 / 4"
                draggable={false}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
};
