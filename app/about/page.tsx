'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { FoundersSection } from '@/components/FoundersSection';

const MEDIA_LOGOS = [
  { id: 'higgsfield', file: 'higgsfield.svg', name: 'higgsfield' },
  { id: 'claude', file: 'claude.svg', name: 'Claude' },
  { id: 'adobe', file: 'adobe.svg', name: 'Adobe' },
  { id: 'figma', file: 'figma.svg', name: 'Figma' },
  { id: 'capcut', file: 'capcut.svg', name: 'CapCut' },
  { id: 'nanobanana', file: 'nanobanana.svg', name: 'Nano Banana' },
  { id: 'aionlabs', file: 'aionlabs.svg', name: 'AionLabs' },
  { id: 'notion', file: 'notion.svg', name: 'Notion' },
  { id: 'gemini', file: 'gemini.svg', name: 'Gemini' },
  { id: 'v0', file: 'v0.svg', name: 'v0' },
];

const SERVICES_DATA = [
  {
    id: 'brand-strategy',
    title: 'Brand Strategy',
    description:
      'Brand strategy defines your vision, purpose, and market position. Clear, conscious frameworks that direct communication and drive engagement.',
    image: '/media/agency/037.jpg',
  },
  {
    id: 'digital-branding',
    title: 'Digital-First Branding',
    description:
      'We build your brand identity from the ground up. Driven by market trends and style, we ensure your brand leaves an unforgettable impression.',
    image: '/media/agency/outfit.jpg',
  },
  {
    id: 'motion-video',
    title: 'Motion Video & Animation',
    description:
      'Motion visuals for modern brands and digital products. Micro-interactions, 3D animations, and brand films that bring ideas vibrantly to life.',
    image: '/media/agency/050.jpg',
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description:
      'We turn websites into immersive digital experiences. Cinematic, high-performance platforms brought alive through motion and purpose.',
    image: '/media/agency/048.jpg',
  },
  {
    id: 'social-media',
    title: 'Social Media Marketing',
    description:
      'We craft high-energy visual content that boosts brand presence. Trend-forward storytelling with sick AI motion that makes your brand feel alive.',
    image: '/media/agency/gym3.jpg',
  },
];

const SERVICES_LIST = [
  'Social Media Marketing',
  'Brand Strategy',
  'Digital-First Branding',
  'Motion Video & Animation',
  'Web Development',
];


const STUDIO_DNA_LIST = [
  'HUMAN FIRST',
  'International — Partnerships',
  'Independent Studio',
  'Zero Outsourcing',
  'AI-Native Workflow',
];

/**
 * Studio About & Editorial Page
 * Full enterprise-width layout consistent with the main page:
 * - Persistent global sticky header
 * - Expansive typographic hero statement
 * - Core services pillars
 * - Founders showcase with vector signatures
 * - Studio Information, Services, Clients, Studio DNA grid under Founders
 * - Halftone manifesto callout
 * - Masterpiece digital runway footer
 */
export default function AboutPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll-linked parallax depth for the hero section
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const yHeroTop = useTransform(heroScroll, [0, 1], [0, -80]);
  const yHeroBottom = useTransform(heroScroll, [0, 1], [0, -40]);
  const opacityHero = useTransform(heroScroll, [0, 0.85], [1, 0.2]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized offset (-1 to 1) for kinetic floating elements
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <a className="skip-link" href="#about-content">
        Skip to main content
      </a>

      {/* Custom cursor */}
      <CustomCursor />

      {/* Global Consistent Header throughout the entire website */}
      <Header />

      <main
        id="about-content"
        className="relative w-full min-h-screen bg-black text-white select-none overflow-x-clip"
        style={{
          backgroundColor: '#000000',
          color: '#FFFFFF',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {/* Full-Page Cinematic Ambient Backdrop on Hover */}
        <AnimatePresence>
          {hoveredImage && (
            <motion.div
              key={hoveredImage}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
              aria-hidden="true"
            >
              <img
                src={hoveredImage}
                alt=""
                className="w-full h-full object-cover brightness-[0.68] contrast-[1.14]"
              />
              {/* Cinematic overlays to guarantee immaculate contrast & legibility */}
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/65" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />
            </motion.div>
          )}
        </AnimatePresence>
        {/* Hero section — Standard container matching main page width */}
        <div
          ref={heroRef}
          className="about-page-container about-hero-container about-space-before-divider"
        >
          {/* Primary statement with parallax depth */}
          <motion.div
            style={{ y: yHeroTop, opacity: opacityHero }}
            className="about-hero-top"
          >
            <h1 className="about-hero-title">
              WE TURN<br />
              RAW VISION
            </h1>
          </motion.div>

          {/* Secondary statement with differential parallax */}
          <div className="about-hero-bottom-wrap">
            <motion.div
              style={{ y: yHeroBottom, opacity: opacityHero }}
              className="about-hero-bottom"
            >
              <h2 className="about-hero-title text-left md:text-right">
                <span className="inline-flex items-center">
                  <motion.span
                    animate={{
                      scale: [1, 1.08, 1],
                      x: mousePos.x * 12,
                      y: mousePos.y * 8,
                    }}
                    transition={{
                      scale: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
                      x: { type: 'spring', damping: 20, stiffness: 100 },
                      y: { type: 'spring', damping: 20, stiffness: 100 },
                    }}
                    className="about-hero-dot"
                    aria-hidden="true"
                  />
                  <span>INTO</span>
                </span>
                <br />
                CULTURAL<br />
                POWER
              </h2>

            </motion.div>
          </div>
        </div>

        {/* Services section */}
        <section className="about-page-container about-services-section">
          
          <div className="about-services-content-wrap">
            {/* Studio Statement / Sub-headline from Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="about-services-intro"
            >
              <p className="about-services-intro-p">
                <strong className="font-black text-white">DOPAMINE&copy;</strong> is an independent creative studio engineered for bold brands. We fuse cinema, strategic identity, and digital motion to create work that commands attention and defines modern culture.
              </p>
            </motion.div>

            {/* Meta Row: Our Services | Est. 2026© */}
            <div className="about-services-meta-row">
              <div className="about-services-meta-left">
                <span>Our Services</span>
              </div>
              <div className="about-services-meta-right">
                <span>Est. 2026&copy;</span>
              </div>
            </div>

            {/* Split Layout: 5 Service Blocks (Left) + Editorial Narrative (Right) */}
            <div className="about-services-split">
              {/* Left: 5 Interactive Service Boxes with Hover Reveal */}
              <div className="about-services-blocks">
                {SERVICES_DATA.map((service, index) => {
                  const isActive = activeServiceId === service.id;
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.15 }}
                      transition={{
                        duration: 0.65,
                        delay: index * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`about-service-box ${isActive ? 'is-active' : ''}`}
                      onMouseEnter={() => {
                        setActiveServiceId(service.id);
                        setHoveredImage(service.image);
                      }}
                      onMouseLeave={() => {
                        setActiveServiceId(null);
                        setHoveredImage(null);
                      }}
                      onClick={() => {
                        setActiveServiceId((prev) => {
                          const next = prev === service.id ? null : service.id;
                          setHoveredImage(next ? service.image : null);
                          return next;
                        });
                      }}
                      tabIndex={0}
                      role="region"
                      aria-label={`${service.title} capabilities`}
                      data-cursor="[ EXPAND ]"
                    >
                      <div className="about-service-box__header">
                        <h3 className="about-service-box__title">{service.title}</h3>
                        <span className="about-service-box__tap-indicator" aria-hidden="true">
                          <span className="about-service-box__tap-icon">+</span>
                        </span>
                      </div>
                      <div className="about-service-box__desc-wrap">
                        <p className="about-service-box__desc">
                          {service.description}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Right: Editorial Narrative Column */}
              <div className="about-services-editorial">
                <p>
                  Every brand is already in motion. Processes, people, perception, decisions. Our job isn&apos;t to sit on top of it. It&apos;s to step inside.
                </p>
                <p>
                  We work alongside teams, read the business and culture, identify where attention is being lost and where it needs to be amplified. We don&apos;t operate in silos: design, technology, motion and strategy move together, because that&apos;s how growth becomes sustainable.
                </p>
                <p>
                  With in-house craft collaborating in real time, we reduce friction, align decisions and turn complexity into structure. We don&apos;t add noise. We bring direction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Studio snapshot section — Standard container matching main page width */}
        <section className="about-page-container">
          <div className="w-full h-[1px]" style={{ backgroundColor: '#FFFFFF' }} />



          {/* Founders Showcase — Abstract Calligraphy & Intentional Placement */}
          <FoundersSection />

          {/* Studio Thinking, Services & Studio DNA + Logos Grid (Matching Reference Photo) */}
          <div className="about-studio-split-section">
            {/* Subtle vertical pinstripe lines across the whole section matching reference photo */}

            <div className="about-studio-split-layout">
              {/* Left Side: Thinking & Studio in Horizontal Rows with Text Writing from the Right */}
              <div className="about-studio-horizontal-rows">
                {/* Horizontal Block 1: Thinking */}
                <div className="about-horizontal-block">
                  <div className="about-horizontal-label"> THINKING </div>
                  <div className="about-horizontal-content">
                    <p className="about-horizontal-text">
                      The idea will always come first and guides everything that follows. A nuanced narrative that is strategically conscious and truly unexpected is what we use as a framework.
                    </p>
                  </div>
                </div>

                {/* Horizontal Block 2: Studio */}
                <div className="about-horizontal-block" style={{ borderBottom: 'none', paddingBottom: 0 }}>
                  <div className="about-horizontal-label"> STUDIO </div>
                  <div className="about-horizontal-content">
                    <ul className="about-horizontal-list">
                      {STUDIO_DNA_LIST.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Side: 4-Column Logo Grid from public/media/logos/ with Brand Wordmarks */}
              <div className="about-studio-split__right">
                <div className="about-logos-grid">
                  {MEDIA_LOGOS.map((logo) => (
                    <div key={logo.id} className="about-logo-cell">
                      <img
                        src={`/media/logos/${logo.file}`}
                        alt={logo.name}
                        className="about-logo-img"
                        loading="lazy"
                      />
                      <span className={`about-logo-name about-logo-name--${logo.id}`}>
                        {logo.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>



        </section>

        {/* Studio Digital Masterpiece Runway Footer */}
        <Footer />
      </main>
    </>
  );
}
