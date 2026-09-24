'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Custom Cursor Component
 * Provides a fluid context-aware cursor follower for fine pointer devices.
 * Automatically deactivates on touch devices or when reduced motion is preferred.
 */
export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('EXPLORE');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (typeof window.matchMedia === 'function') {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const customCursorElem = target.closest('[data-cursor]') as HTMLElement | null;
        if (customCursorElem) {
          const customLabel = customCursorElem.getAttribute('data-cursor');
          if (customLabel) {
            setLabel(customLabel.replace(/^\[\s*|\s*\]$/g, ''));
            return;
          }
        }

        if (target.closest('button, a, input, [role="button"], [role="slider"]')) {
          setLabel('INTERACT');
        } else if (target.closest('#showcase-reel') || target.closest('#latest-work')) {
          setLabel('VIEW');
        } else {
          setLabel('EXPLORE');
        }
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    const animate = () => {
      followerX += (mouseX - followerX) * 0.22;
      followerY += (mouseY - followerY) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="custom-cursor-root"
      aria-hidden="true"
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
      }}
    >
      {/* Precision cursor dot */}
      <div
        ref={cursorRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#FFFFFF',
          mixBlendMode: 'difference',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      {/* Dynamic context badge follower */}
      <div
        ref={followerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          style={{
            marginLeft: 14,
            marginTop: 14,
            padding: '3px 9px',
            borderRadius: 9999,
            backgroundColor: 'rgba(10,10,12,0.85)',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#FFFFFF',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(8px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          [{label}]
        </div>
      </div>
    </div>
  );
}
