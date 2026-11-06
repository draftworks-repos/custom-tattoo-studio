import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useCursorFine } from '../../hooks/useCursorFine.js';
import './Cursor.css';

export const Cursor = () => {
  const isFine = useCursorFine();
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'pointer' | 'view' | 'grab' | 'grabbing'
  const isMouseDownRef = useRef(false);

  useEffect(() => {
    if (!isFine) {
      document.documentElement.classList.remove('custom-cursor-active');
      return;
    }

    // Hide native cursor when custom cursor is active on desktop
    document.documentElement.classList.add('custom-cursor-active');

    const dot = dotRef.current;
    const ring = ringRef.current;

    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power2.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power2.out' });

    let currentTarget = null;

    const updateState = (target, isDown) => {
      if (!target) return;

      if (target.closest('[data-cursor="grab"]') || target.closest('.bounded-carousel--x')) {
        setCursorState(isDown ? 'grabbing' : 'grab');
      } else if (target.closest('[data-cursor="view"]')) {
        setCursorState('view');
      } else if (
        target.closest('a, button, [role="button"], input, select, textarea, .btn, .nav__link')
      ) {
        setCursorState('pointer');
      } else {
        setCursorState('default');
      }
    };

    const onMouseMove = (e) => {
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);

      currentTarget = e.target;
      updateState(currentTarget, isMouseDownRef.current);
    };

    const onMouseDown = () => {
      isMouseDownRef.current = true;
      if (currentTarget) updateState(currentTarget, true);
    };

    const onMouseUp = () => {
      isMouseDownRef.current = false;
      if (currentTarget) updateState(currentTarget, false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isFine]);

  if (!isFine) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        className={`cursor-ring cursor-ring--${cursorState}`}
        aria-hidden="true"
      >
        <span className="cursor-ring__label">
          {cursorState === 'view' && 'VIEW'}
          {cursorState === 'grab' && 'GRAB'}
          {cursorState === 'grabbing' && 'DRAG'}
        </span>
      </div>
    </>
  );
};
