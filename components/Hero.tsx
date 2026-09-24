'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

interface HeroProps {
  /** Callback to smoothly scroll down to the Latest Work showcase */
  onScrollToWork: () => void;
  /** Callback to scroll down to the full Showcase Reel section */
  onShowcaseClick: () => void;
}

const SLIDES = [
  { id: 1, image: '/media/hero.png' },
  { id: 2, image: '/media/hero1.png' },
  { id: 3, image: '/media/hero2.png' },
];

const SLIDE_DURATION = 3500;
const TRANSITION_DURATION = 1.4;

/**
 * Hero Section Component
 * Fullscreen visual showcase carousel with scroll-linked exit parallax.
 */
export function Hero({ onScrollToWork, onShowcaseClick }: HeroProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [prevIdx, setPrevIdx] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  // Auto-advance loop every 3.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIdx(currentIdx);
      setCurrentIdx((prev) => (prev + 1) % SLIDES.length);
      setIsAnimating(true);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [currentIdx]);

  // Clear animation state after transition completes (1400ms duration)
  useEffect(() => {
    if (!isAnimating) return;
    const timer = setTimeout(() => {
      setIsAnimating(false);
      setPrevIdx(null);
    }, 1450);
    return () => clearTimeout(timer);
  }, [isAnimating]);

  // Scroll exit parallax
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const rawExitY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const exitY = useSpring(rawExitY, { stiffness: 90, damping: 26 });

  const rawExitOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.9, 0.3]);
  const exitOpacity = useSpring(rawExitOpacity, { stiffness: 90, damping: 26 });

  const footerTextY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <motion.section
      id="hero"
      ref={heroRef}
      aria-label="Hero Section"
      style={{ y: exitY, opacity: exitOpacity }}
      className="hero-evolve"
    >
      {/* Stacked Photo Layers — Right-to-Left Overlap Transition */}
      <div className="hero-evolve__slides" aria-hidden="true">
        {/* Background layer: the previous (or current resting) image */}
        {SLIDES.map((slide, idx) => (
          <div
            key={slide.id}
            className="hero-evolve__slide-bg"
            style={{
              opacity: idx === (prevIdx !== null ? prevIdx : currentIdx) ? 1 : 0,
              zIndex: 1,
            }}
          >
            <img
              src={slide.image}
              alt=""
              className="hero-evolve__slide-img"
            />
            <div className="hero-evolve__slide-overlay" />
          </div>
        ))}

        {/* Foreground layer: incoming photo wipes from right with slow-at-start, fast-to-end acceleration */}
        <AnimatePresence mode="sync">
          <motion.div
            key={`foreground-${SLIDES[currentIdx].id}`}
            className="hero-evolve__slide-fg"
            initial={{ clipPath: 'inset(0 0 0 100%)' }}
            animate={{ clipPath: 'inset(0 0 0 0%)' }}
            transition={{
              duration: TRANSITION_DURATION,
              ease: [0.7, 0, 0.84, 0], // Slow at start, accelerating to fast at end
            }}
            style={{ zIndex: 2 }}
          >
            <motion.img
              src={SLIDES[currentIdx].image}
              alt=""
              className="hero-evolve__slide-img"
              initial={{ scale: 1.05 }}
              animate={{ scale: 1.0 }}
              transition={{
                duration: TRANSITION_DURATION,
                ease: [0.7, 0, 0.84, 0],
              }}
            />
            <div className="hero-evolve__slide-overlay" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Empty spacer for open minimal feel */}
      <div className="hero-evolve__spacer" />

      {/* Hero section footer bar (No pagination dots) */}
      <motion.footer
        style={{ y: footerTextY }}
        className="hero-evolve__footer"
      >
        {/* Left: Showcase Reel trigger */}
        <button
          type="button"
          onClick={onShowcaseClick}
          data-cursor="[ REEL ]"
          className="hero-evolve__reel-btn"
          aria-label="View showcase reel"
        >
          <span>&#9654;</span>
          <span>SHOWCASE REEL</span>
        </button>

        {/* Right: Scroll to work arrow */}
        <button
          type="button"
          onClick={onScrollToWork}
          data-cursor="[ EXPLORE ]"
          className="hero-evolve__explore-btn"
          aria-label="Explore work"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: 'easeInOut',
            }}
            className="hero-evolve__explore-arrow"
          >
            &darr;
          </motion.span>
        </button>
      </motion.footer>
    </motion.section>
  );
}

