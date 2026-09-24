'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * Agency Capabilities Card Model
 * Defines discipline category, title, description, and preview imagery.
 */
interface AgencyCard {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

const AGENCY_CARDS: AgencyCard[] = [
  {
    id: 'visual-identity',
    badge: 'Branding',
    title: 'Visual Identity Systems',
    description: 'Engineering visual architectures and iconic design languages that command instant recognition and deep cultural trust.',
    image: '/media/agency/gym3.jpg',
    alt: 'Gym aesthetic editorial photography',
  },
  {
    id: 'digital-architecture',
    badge: 'Strategy',
    title: 'Digital Architecture',
    description: 'Architecting high-frequency digital platforms engineered to capture, hold, and convert human attention in a noisy world.',
    image: '/media/agency/037.jpg',
    alt: 'Cathedral light grand piano',
  },
  {
    id: 'creative-development',
    badge: 'Branding',
    title: 'Creative Development',
    description: 'Defining the new standard of interactive storytelling.',
    image: '/media/agency/outfit.jpg',
    alt: 'Streetwear fashion editorial',
  },
  {
    id: 'cinematic-direction',
    badge: 'Motion',
    title: 'Cinematic Direction',
    description: 'High-impact 3D kinetics, visceral film direction, and multi-sensory atmospheres that evoke profound resonance.',
    image: '/media/agency/050.jpg',
    alt: 'Amber mist doorframe silhouette',
  },
  {
    id: 'spatial-engineering',
    badge: 'Experience',
    title: 'Spatial & WebGL',
    description: 'Pushing the edge of real-time 3D, GPU kinetics, and fluid physics for boundary-breaking web experiences.',
    image: '/media/agency/048.jpg',
    alt: 'Surreal door floating on dark ocean water',
  },
];

/* ----------------------------------------------------------------
   MADE IN EVOLVE 4 LARGE VERTICAL TILES (PURE PRESENTATION, NO TEXT)
   ---------------------------------------------------------------- */
const EVOLVE_VERTICAL_PHOTOS = [
  {
    id: 'evolve-1',
    image: '/media/agency/048.jpg',
    alt: 'Surreal door on ocean',
  },
  {
    id: 'evolve-2',
    image: '/media/agency/045.jpg',
    alt: 'High-contrast studio artifact',
  },
  {
    id: 'evolve-3',
    image: '/media/agency/mirror.jpg',
    alt: 'Reflective monolith in landscape',
  },
  {
    id: 'evolve-4',
    image: '/media/agency/gym2.jpg',
    alt: 'Editorial silhouette',
  },
];



/* ----------------------------------------------------------------
   SCROLL WORD REVEAL COMPONENT (Natural word spacing, Apple Scrub)
   Guarantees words never join together
   ---------------------------------------------------------------- */
function ScrollWordReveal({
  text,
  className = '',
  leadCount = 0,
}: {
  text: string;
  className?: string;
  leadCount?: number;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.92', 'end 0.45'],
  });

  const words = text.split(/\s+/);

  return (
    <span ref={containerRef} className={`agency-word-reveal-group ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(1, start + (1 / words.length) * 1.5);
        return (
          <WordSpan
            key={i}
            word={word}
            range={[start, end]}
            progress={scrollYProgress}
          />
        );
      })}
    </span>
  );
}

function WordSpan({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: any;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const y = useTransform(progress, range, [6, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className="agency-word-item"
    >
      {word}
    </motion.span>
  );
}

/* ----------------------------------------------------------------
   THREE-LINE HEADLINE WITH SCROLL WORD REVEAL
   Guaranteed to complete in exactly 3 lines:
   Line 1: A brand is recognized before it is understood. Your
   Line 2: visual identity shapes how people recognize you, trust you,
   Line 3: and remember you. We help define that difference.
   ---------------------------------------------------------------- */
const THREE_LINE_HEADLINE = [
  'A brand is recognized before it is understood. Your',
  'visual identity shapes how people recognize you, trust you,',
  'and remember you. We help define that difference.',
];

function ThreeLineHeadline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.90', 'end 0.30'],
  });

  // Staggered parallax for the 3 headline lines
  const line1Y = useTransform(scrollYProgress, [0, 1], [18, -12]);
  const line2Y = useTransform(scrollYProgress, [0, 1], [32, -22]);
  const line3Y = useTransform(scrollYProgress, [0, 1], [46, -30]);
  const lineYTransforms = [line1Y, line2Y, line3Y];

  const allWords = THREE_LINE_HEADLINE.join(' ').split(/\s+/);
  const totalWords = allWords.length;
  let wordCounter = 0;

  return (
    <div ref={containerRef} className="agency-three-line-headline">
      {THREE_LINE_HEADLINE.map((lineText, lineIdx) => {
        const lineWords = lineText.split(/\s+/);
        return (
          <motion.div
            key={lineIdx}
            style={{ y: lineYTransforms[lineIdx] }}
            className={`agency-headline-line agency-headline-line--${lineIdx + 1}`}
          >
            {lineWords.map((word, wordIdx) => {
              const currentIdx = wordCounter++;
              const start = currentIdx / totalWords;
              const end = Math.min(1, start + (1 / totalWords) * 1.6);
              return (
                <WordSpan
                  key={wordIdx}
                  word={word}
                  range={[start, end]}
                  progress={scrollYProgress}
                />
              );
            })}
          </motion.div>
        );
      })}
    </div>
  );
}

/* ----------------------------------------------------------------
   EXPANDING CARDS ACCORDION — PRODUX.DESIGN EFFECT
   Sharp squarish edges (0px radius), borderless, slow motion physics,
   numerics removed, minimal delayed title reveal
   ---------------------------------------------------------------- */
function AgencyCardsAccordion() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleCardClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleCardHover = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div
      className="agency-cards-accordion"
      role="region"
      aria-label="Agency capabilities interactive gallery"
    >
      {AGENCY_CARDS.map((card, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={card.id}
            role="button"
            tabIndex={0}
            aria-expanded={isActive}
            aria-label={`${card.title} — ${card.badge}`}
            data-cursor="[ EXPAND ]"
            onClick={() => handleCardClick(index)}
            onMouseEnter={() => handleCardHover(index)}
            onFocus={() => handleCardClick(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCardClick(index);
              }
            }}
            className={`agency-card ${isActive ? 'agency-card--active' : 'agency-card--collapsed'}`}
          >
            {/* Card Background Image with slow cinematic scaling */}
            <div className="agency-card__media-wrapper">
              <img
                src={card.image}
                alt={card.alt}
                loading={index < 3 ? 'eager' : 'lazy'}
                className="agency-card__img"
              />
              <div className="agency-card__overlay" />
            </div>

            {/* Glassmorphic Category Badge (Top Right) */}
            <div className={`agency-card__badge ${isActive ? 'agency-card__badge--visible' : ''}`}>
              <span>{card.badge}</span>
            </div>

            {/* Collapsed Card Minimalist Indicator (Only Category label, No numerics) */}
            <div className={`agency-card__collapsed-label ${!isActive ? 'agency-card__collapsed-label--visible' : ''}`}>
              <span className="agency-card__collapsed-badge">{card.badge}</span>
            </div>

            {/* Active Card Content — Minimal slow-motion animated title reveal */}
            <div className={`agency-card__content ${isActive ? 'agency-card__content--visible' : ''}`}>
              <h3 className="agency-card__title">{card.title}</h3>
              <p className="agency-card__description">{card.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}


/* ----------------------------------------------------------------
   STUDIO VISUAL SHOWCASE
   ---------------------------------------------------------------- */
function MadeInEvolveShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const textBoxRef = useRef<HTMLDivElement>(null);
  const [maxTravel, setMaxTravel] = useState(560);

  useEffect(() => {
    const updateTravel = () => {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        setMaxTravel(0);
        return;
      }
      if (bottomRowRef.current && textBoxRef.current) {
        const rowHeight = bottomRowRef.current.offsetHeight;
        const boxHeight = textBoxRef.current.offsetHeight;
        if (rowHeight > boxHeight) {
          setMaxTravel(rowHeight - boxHeight - 16);
        }
      }
    };
    updateTravel();
    window.addEventListener('resize', updateTravel);
    return () => window.removeEventListener('resize', updateTravel);
  }, []);

  const { scrollYProgress: evolveScroll } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: bottomScroll } = useScroll({
    target: bottomRowRef,
    offset: ['start 0.85', 'end 0.90'],
  });

  // Staggered parallax for photo tiles
  const tile0Y = useTransform(evolveScroll, [0, 1], [30, -30]);
  const tile1Y = useTransform(evolveScroll, [0, 1], [60, -50]);
  const tile2Y = useTransform(evolveScroll, [0, 1], [25, -25]);
  const tile3Y = useTransform(evolveScroll, [0, 1], [55, -45]);

  // Silky smooth spring-driven travel that glides organically with scroll all the way to the end
  const rawFallY = useTransform(bottomScroll, [0, 1], [0, maxTravel]);
  const smoothFallY = useSpring(rawFallY, { stiffness: 120, damping: 28, mass: 0.25 });

  const rawRotate = useTransform(bottomScroll, [0, 1], [0, 0.12]);
  const smoothRotate = useSpring(rawRotate, { stiffness: 120, damping: 28, mass: 0.25 });

  return (
    <div ref={containerRef} className="agency-evolve-wrapper">
      {/* Row 1: Top 2 Photos on Left with parallax, Empty space on Right */}
      <div className="agency-evolve__row agency-evolve__row--top">
        <div className="agency-evolve__row-photos">
          {[
            { ...EVOLVE_VERTICAL_PHOTOS[0], y: tile0Y },
            { ...EVOLVE_VERTICAL_PHOTOS[1], y: tile1Y },
          ].map((photo, i) => (
            <motion.div
              key={photo.id}
              style={{ y: photo.y }}
              className="agency-evolve__tile"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 1.1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="[ FOCUS ]"
            >
              <div className="agency-evolve__tile-media">
                <img
                  src={photo.image}
                  alt={photo.alt}
                  loading="lazy"
                  className="agency-evolve__tile-img"
                />
                <div className="agency-evolve__tile-overlay" />
              </div>
            </motion.div>
          ))}
        </div>
        <div className="agency-evolve__row-empty" />
      </div>

      {/* Row 2: Bottom 2 Photos on Left with parallax, Falling Sticky Text starts here on Right */}
      <div ref={bottomRowRef} className="agency-evolve__row agency-evolve__row--bottom">
        <div className="agency-evolve__row-photos">
          {[
            { ...EVOLVE_VERTICAL_PHOTOS[2], y: tile2Y },
            { ...EVOLVE_VERTICAL_PHOTOS[3], y: tile3Y },
          ].map((photo, i) => (
            <motion.div
              key={photo.id}
              style={{ y: photo.y }}
              className="agency-evolve__tile"
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 1.1, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              data-cursor="[ FOCUS ]"
            >
              <div className="agency-evolve__tile-media">
                <img
                  src={photo.image}
                  alt={photo.alt}
                  loading="lazy"
                  className="agency-evolve__tile-img"
                />
                <div className="agency-evolve__tile-overlay" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right Side: Smooth falling text synced to scroll */}
        <div className="agency-evolve__text-side">
          <motion.div
            ref={textBoxRef}
            style={{
              y: smoothFallY,
              rotate: smoothRotate,
            }}
            className="agency-evolve__falling-box"
          >
            
            <p className="agency-evolve__small-text">
              We live in an age where everything is everywhere, all the time. The real challenge is no longer visibility, but meaning.
            </p>
            <p className="agency-evolve__small-text">
              DOPAMINE© exists to build authentic connections between brands and people where every experience, physical or digital, becomes part of the same story.
            </p>
            
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
   MAIN AGENCY SECTION COMPONENT
   ---------------------------------------------------------------- */
export function AgencySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.15 });

  // Section exit curtain lift as Contact section reveals
  const { scrollYProgress: agencyScroll } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const sectionExitY = useTransform(agencyScroll, [0.85, 1], [0, -75]);

  // Multi-tier text parallax depth layers
  const taglineY = useTransform(agencyScroll, [0, 0.35], [25, -10]);
  const headlineParallaxY = useTransform(agencyScroll, [0, 0.45], [45, -15]);

  return (
    <motion.section
      id="agency"
      ref={sectionRef}
      aria-label="Agency"
      style={{ y: sectionExitY }}
      className="agency-section"
    >


      {/* ============================================================
          SHOWCASE HERO — PRODUX.DESIGN EXPANDING CARDS
          Seamless animated entry from Latest Work into Agency
          ============================================================ */}
      <div ref={headerRef} className="agency-showcase-container">
        {/* Monospace Section Tag with Parallax */}
        <motion.div
          style={{ y: taglineY }}
          className="agency-showcase__tagline"
          initial={{ opacity: 0, y: 20 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="agency-mono-label">AGENCY</span>
          <span className="agency-mono-label">[S.03]</span>
        </motion.div>

        {/* Guaranteed Exact 3-Line Headline with Scroll Word Reveal + Parallax */}
        <motion.div
          style={{ y: headlineParallaxY }}
          className="agency-showcase__header"
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <ThreeLineHeadline />
        </motion.div>

        {/* The 5 Expanding Interactive Cards (Sharp squarish edges, minimal titles) */}
        <AgencyCardsAccordion />
      </div>

      {/* Consistent Large Editorial Spacing */}
      <div className="agency-editorial-spacer" />

      {/* ============================================================
          CONTINUATION — MADE IN EVOLVE SHOWCASE
          4 Large Vertical Photo Tiles & Fully Synced Falling Text
          ============================================================ */}
      <MadeInEvolveShowcase />
    </motion.section>
  );
}

// Backwards-compatible export aliases
export const ManifestoSection = AgencySection;
export const Manifesto = AgencySection;
