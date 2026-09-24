'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

/**
 * Editorial Work Projects
 * Structured project items displayed across dynamic parallax rows.
 */
export interface WorkItem {
  id: string;
  title: string;
  client: string;
  category: string;
  date: string;
  action: string;
  poster: string;
  video: string | null;
  aspectRatio: string;
}

const LINE_1_ITEMS: WorkItem[] = [
  {
    id: 'project-01',
    title: 'THE CONFRONTATION',
    client: 'DAZN',
    category: 'CAMPAIGN TECHNOLOGY',
    date: 'AUGUST 19, 2026',
    action: 'VIEW PROJECT',
    poster: '/media/fight-poster.jpg',
    video: '/media/fight.mp4',
    aspectRatio: '1.25 / 1',
  },
  {
    id: 'project-02',
    title: 'INTERIOR RESONANCE',
    client: 'BREV STUDIO',
    category: 'FILM SOUND DESIGN',
    date: 'AUGUST 19, 2026',
    action: 'VIEW PROJECT',
    poster: '/media/room-poster.jpg',
    video: '/media/room.mp4',
    aspectRatio: '16 / 9',
  },
  {
    id: 'project-03',
    title: 'THE FOUNDERS',
    client: 'DOPAMINE© ORIGINALS',
    category: 'EDITORIAL PHOTOGRAPHY',
    date: 'AUGUST 18, 2026',
    action: 'VIEW PROJECT',
    poster: '/media/brev.jfif',
    video: null,
    aspectRatio: '3 / 4',
  },
  {
    id: 'project-04',
    title: 'HALFTONE FREQUENCY',
    client: 'STUDIO ARCHIVE',
    category: 'AI GENERATIVE SYSTEMS',
    date: 'AUGUST 10, 2026',
    action: 'READ NOW',
    poster: '/media/agency-halftone-wave.png',
    video: null,
    aspectRatio: '1 / 1',
  },
  {
    id: 'project-05',
    title: 'SEQUENCE ALPHA',
    client: 'DOPAMINE© ORIGINALS',
    category: 'MOTION PHOTOGRAPHY',
    date: 'FEBRUARY 18, 2026',
    action: 'VIEW PROJECT',
    poster: '/media/mountain.jpg',
    video: '/media/sequence-gamma.mp4',
    aspectRatio: '16 / 9',
  },
];

const LINE_2_ITEMS: WorkItem[] = [
  {
    id: 'project-06',
    title: 'PORTRAIT SERIES',
    client: 'HIGH FASHION EDITORIAL',
    category: 'PHOTOGRAPHY DIRECTION',
    date: 'JANUARY 24, 2026',
    action: 'VIEW PROJECT',
    poster: '/media/1403600.jpg',
    video: null,
    aspectRatio: '3 / 4',
  },
  {
    id: 'project-07',
    title: 'SPATIAL RESIDUE',
    client: 'EDITORIAL LAB',
    category: 'ARTIFACT LUXURY',
    date: 'JANUARY 15, 2026',
    action: 'READ NOW',
    poster: '/media/agency/045.jpg',
    video: null,
    aspectRatio: '1 / 1',
  },
  {
    id: 'project-08',
    title: 'CHROMATIC PULSE',
    client: 'CONCEPT REEL',
    category: 'DIRECTION 3D CINEMATICS',
    date: 'DECEMBER 20, 2025',
    action: 'VIEW PROJECT',
    poster: '/media/dune.jpg',
    video: '/media/sequence-delta.mp4',
    aspectRatio: '16 / 9',
  },
  {
    id: 'project-09',
    title: 'MONOLITH VOID',
    client: 'MADE IN EVOLVE',
    category: 'SPATIAL ARCHITECTURE',
    date: 'NOVEMBER 14, 2025',
    action: 'READ NOW',
    poster: '/media/agency/mirror.jpg',
    video: null,
    aspectRatio: '3 / 4',
  },
];

const ALL_WORK_ITEMS = [...LINE_1_ITEMS, ...LINE_2_ITEMS];

/**
 * Work Card Component
 * Minimal visual card displaying media preview, title, date, and category metadata.
 */
function WorkCard({
  item,
  index,
  yParallax,
}: {
  item: WorkItem;
  index: number;
  yParallax?: any;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    if (!isMobile && item.video) {
      const vid = videoRef.current;
      if (vid) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      }
    }
  }, [isMobile, item.video]);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!isMobile && item.video) {
      const vid = videoRef.current;
      if (vid) {
        vid.pause();
        vid.currentTime = 0;
      }
    }
  }, [isMobile, item.video]);

  return (
    <motion.article
      style={{ y: yParallax }}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.75,
        delay: (index % 5) * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="work-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor={item.video ? '[ WATCH ]' : '[ VIEW ]'}
    >
      {/* Visual Container with custom aspect ratio matching photo */}
      <div
        ref={visualRef}
        className={`work-card__visual ${!item.video ? 'work-card__visual--photo' : ''}`}
        style={{ aspectRatio: item.aspectRatio }}
      >
        <img
          src={item.poster}
          alt={`${item.title} — ${item.client}`}
          className={`work-card__poster ${!item.video ? 'work-card__poster--photo' : ''}`}
          loading="lazy"
          style={{
            opacity: isHovered && item.video ? 0 : 1,
          }}
        />

        {item.video && (
          <video
            ref={videoRef}
            src={item.video}
            muted
            loop
            playsInline
            preload="none"
            className="work-card__video"
            style={{
              opacity: isHovered ? 1 : 0,
            }}
          />
        )}

        <div className="work-card__overlay" />
      </div>

      {/* Meta info below the image — minimal, refined, thinner sub-descriptions */}
      <div className="work-card__info">
        <h3 className="work-card__title">{item.title}</h3>
        <div className="work-card__date">{item.date}</div>
        <div className="work-card__categories">{item.category}</div>
      </div>
    </motion.article>
  );
}

/* ----------------------------------------------------------------
   SECTION: LATEST WORK [S.02]
   Two lines of abstract work items with multi-tier tile parallax
   ---------------------------------------------------------------- */
export function LatestWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Section exit curtain lift as Agency reveals
  const sectionExitY = useTransform(scrollYProgress, [0.75, 1], [0, -85]);

  // Multi-tier text parallax layers
  const headerBarY = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const headingY = useTransform(scrollYProgress, [0, 1], [55, -55]);
  const ctaY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // Enterprise-grade multi-speed tile parallax for Line 1 and Line 2
  const tileParallax0 = useTransform(scrollYProgress, [0, 1], [25, -25]);
  const tileParallax1 = useTransform(scrollYProgress, [0, 1], [50, -45]);
  const tileParallax2 = useTransform(scrollYProgress, [0, 1], [15, -20]);
  const tileParallax3 = useTransform(scrollYProgress, [0, 1], [45, -40]);
  const tileParallax4 = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const tileParallax5 = useTransform(scrollYProgress, [0, 1], [35, -35]);
  const tileParallax6 = useTransform(scrollYProgress, [0, 1], [60, -55]);
  const tileParallax7 = useTransform(scrollYProgress, [0, 1], [20, -22]);
  const tileParallax8 = useTransform(scrollYProgress, [0, 1], [48, -46]);

  const line1Parallaxes = [tileParallax0, tileParallax1, tileParallax2, tileParallax3, tileParallax4];
  const line2Parallaxes = [tileParallax5, tileParallax6, tileParallax7, tileParallax8];

  return (
    <motion.section
      id="latest-work"
      ref={sectionRef}
      aria-label="Latest Work — S.02"
      style={{ y: sectionExitY }}
      className="latest-work-section"
    >
      {/* Subtle vertical architectural drafting grid lines matching future-vision */}
      <div className="latest-work__pinstripes" aria-hidden="true" />

      {/* Section header bar with subtle parallax */}
      <motion.div style={{ y: headerBarY }} className="latest-work__header-bar">
        <span className="latest-work__label">LATEST WORK</span>
        <span className="latest-work__section-id">[S.02]</span>
      </motion.div>

      {/* Large heading row with pronounced text parallax */}
      <div ref={headerRef} className="latest-work__heading-row">
        <motion.div style={{ y: headingY }} className="latest-work__heading-left">
          <motion.h2
            className="latest-work__title"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            LATEST
            <sup className="latest-work__count">[{String(ALL_WORK_ITEMS.length).padStart(2, '0')}]</sup>
          </motion.h2>
        </motion.div>

        <motion.a
          href="#agency"
          style={{ y: ctaY }}
          className="latest-work__cta"
          initial={{ opacity: 0, x: 20 }}
          animate={isHeaderInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          data-cursor="[ EXPLORE ]"
        >
          <span className="latest-work__cta-arrow">↗</span>
          <span>ALL WORK</span>
        </motion.a>
      </div>

      {/* Work cards in TWO LINES (Row 1 & Row 2) with parallax */}
      <div className="latest-work__two-lines">
        {/* Line 1 (5 items) */}
        <div className="latest-work__line latest-work__line--1">
          {LINE_1_ITEMS.map((item, i) => (
            <WorkCard
              key={item.id}
              item={item}
              index={i}
              yParallax={line1Parallaxes[i]}
            />
          ))}
        </div>

        {/* Line 2 (4 items) */}
        <div className="latest-work__line latest-work__line--2">
          {LINE_2_ITEMS.map((item, i) => (
            <WorkCard
              key={item.id}
              item={item}
              index={i + LINE_1_ITEMS.length}
              yParallax={line2Parallaxes[i]}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
