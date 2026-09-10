'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';

export default function AboutPage() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Subtle normalized offset (-1 to 1) for kinetic floating elements
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

      {/* Dynamic Monochrome Cursor */}
      <CustomCursor />

      <main
        id="about-content"
        className="relative w-full min-h-screen bg-black text-white select-none overflow-x-hidden"
        style={{
          backgroundColor: '#000000',
          color: '#FFFFFF',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {/* Top Header Navigation */}
        <header className="relative z-20 flex items-start justify-between w-full p-6 sm:p-10 md:p-14 font-mono-thin text-xs uppercase tracking-wider">
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center group">
            <span
              className="text-2xl sm:text-3xl font-black normal-case text-white leading-none group-hover:opacity-80 transition-opacity"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 900,
                letterSpacing: '-0.05em',
              }}
            >
              dopamine<span className="text-sm align-top ml-0.5 font-normal">&copy;</span>
            </span>
          </Link>

          {/* Center: Nav Columns */}
          <nav className="flex items-start gap-8 sm:gap-16 text-xs sm:text-[13px] font-mono-thin tracking-widest uppercase">
            <div className="flex flex-col space-y-1.5">
              <Link href="/" className="text-white hover:opacity-75 transition-opacity text-left">
                HOME
              </Link>
              <Link href="/#reels" className="text-white hover:opacity-75 transition-opacity text-left">
                WORK[03]
              </Link>
            </div>

            <div className="flex flex-col space-y-1.5">
              <span className="flex items-center gap-2 text-white font-medium">
                <span className="w-1.5 h-1.5 bg-white inline-block rounded-full" /> ABOUT
              </span>
              <Link href="/#contact" className="text-white hover:opacity-75 transition-opacity">
                CONTACT
              </Link>
            </div>
          </nav>

          {/* Right: Tagline (Matches Main Page Header) */}
          <div className="hidden sm:block text-right font-mono-thin text-[11px] sm:text-xs tracking-widest text-white uppercase">
            <div>ONLY THE</div>
            <div className="font-bold text-white">STRONG EVOLVE</div>
          </div>
        </header>

        {/* Section A: Hero */}
        <div
          className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-16 pt-8 sm:pt-14 md:pt-20 about-hero-container about-space-before-divider"
          style={{ paddingBottom: '9rem' }}
        >
          {/* Top Statement: Left Aligned */}
          <div className="about-hero-top">
            <h1
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8.5rem] font-black uppercase leading-[0.84] tracking-tight text-white m-0 p-0"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 900,
                WebkitTextStroke: '2px #FFFFFF',
                letterSpacing: '-0.04em',
              }}
            >
              WE TURN<br />
              CULTURAL<br />
              VALUE
            </h1>
          </div>

          {/* Bottom Statement: Right Aligned */}
          <div className="about-hero-bottom-wrap" style={{ marginTop: '0.25rem' }}>
            <div className="about-hero-bottom">
              <h2
                className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.2rem] xl:text-[8.5rem] font-black uppercase leading-[0.84] tracking-tight text-white m-0 p-0 text-left md:text-right"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 900,
                  WebkitTextStroke: '2px #FFFFFF',
                  letterSpacing: '-0.04em',
                }}
              >
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
                    className="about-hero-dot w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full shrink-0"
                    style={{
                      width: 'clamp(1.5rem, 3.5vw, 3.5rem)',
                      height: 'clamp(1.5rem, 3.5vw, 3.5rem)',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '50%',
                      display: 'inline-block',
                      flexShrink: 0,
                      marginRight: 'clamp(0.625rem, 1.4vw, 1.5rem)',
                    }}
                    aria-hidden="true"
                  />
                  <span>INTO</span>
                </span>
                <br />
                COMPANY<br />
                VALUE
              </h2>

              {/* Studio Introduction */}
              <div className="about-hero-intro" style={{ maxWidth: '640px' }}>
                <p
                  className="text-xl sm:text-2xl md:text-3xl font-normal leading-relaxed text-white"
                  style={{ fontFamily: 'var(--font-sans)', lineHeight: 1.45 }}
                >
                  <strong className="font-black text-white">DOPAMINE&copy;</strong> is an independent creative studio engineered for high-impact media, brand systems, and modern digital direction. We build work calibrated to capture, hold, and convert human attention in a fragmented world.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section B: Capabilities */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-16">
          {/* Section Divider (SEC. /B) */}
          <div className="about-section-divider">
            <div className="about-section-divider-line" />
            <div className="about-section-divider-meta">
              <div className="flex items-center gap-12 sm:gap-20">
                <span className="font-bold">SEC.</span>
                <span className="font-bold">/B</span>
              </div>
              <span className="about-section-divider-dot" />
            </div>
          </div>

          {/* Consistent Great Space Before & After Capabilities Content */}
          <div
            className="about-space-after-divider"
            style={{ paddingTop: '6rem', paddingBottom: '9rem' }}
          >
            {/* 3-Column Editorial Grid */}
            <div className="about-capabilities-grid items-start">
              {/* Column 1: CAPABILITIES (Clean natural thickness without text-stroke) */}
              <div>
                <h2
                  className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                  }}
                >
                  CAPABILITIES
                </h2>
              </div>

              {/* Column 2: CX, COMMERCE, & PRODUCT DESIGN (Matching font of PEOPLE heading) */}
              <div className="space-y-6">
                <h3
                  className="text-base sm:text-lg md:text-xl font-black uppercase tracking-wider text-white"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 900,
                    letterSpacing: '0.04em',
                  }}
                >
                  CX, COMMERCE, &amp;<br />PRODUCT DESIGN
                </h3>

                <ul
                  className="space-y-4 text-[15px] sm:text-base text-white font-normal leading-snug about-capability-list"
                  style={{ listStyle: 'none', listStyleType: 'none', paddingLeft: 0, marginLeft: 0 }}
                >
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Market Analysis &amp; Business Cases</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Customer Research &amp; Segmentation</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Experience Strategy &amp; AI</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Journey Mapping &amp; Prototyping</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Digital Product Architecture</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>UI &amp; Interaction Design</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Design Systems &amp; Guidelines</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>E-Commerce Platforms &amp; Shopify</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Mobile &amp; Web App Engineering</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Full-Stack CMS Implementation</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Technical Direction &amp; Architecture</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Usability Validation &amp; Performance</li>
                </ul>
              </div>

              {/* Column 3: DIGITAL-FIRST BRANDING (Matching font of PEOPLE heading) */}
              <div className="space-y-6">
                <h3
                  className="text-base sm:text-lg md:text-xl font-black uppercase tracking-wider text-white"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 900,
                    letterSpacing: '0.04em',
                  }}
                >
                  DIGITAL-FIRST BRANDING
                </h3>

                <ul
                  className="space-y-4 text-[15px] sm:text-base text-white font-normal leading-snug about-capability-list"
                  style={{ listStyle: 'none', listStyleType: 'none', paddingLeft: 0, marginLeft: 0 }}
                >
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Brand Ecosystem &amp; Roadmap</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Strategic Brand Intelligence</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Positioning &amp; Architecture</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Brand Voice &amp; Narrative</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Visual Identity Systems</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Brand Guidelines &amp; Playbooks</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Art Direction &amp; Editorial Design</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Graphic &amp; Typographic Systems</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>3D, Motion &amp; Video Production</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Naming &amp; Brand Architecture</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Go-To-Market Strategy</li>
                  <li style={{ listStyle: 'none', listStyleType: 'none' }}>Multi-Platform Campaigns</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section C: Agency Snapshot */}
        <section className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-16">
          <div className="w-full h-[1px]" style={{ backgroundColor: '#FFFFFF' }} />

          {/* Studio Masthead & Axiom */}
          <div className="py-6 sm:py-8 md:py-10 flex items-baseline justify-between">
            <span
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black normal-case text-white leading-none inline-block select-none"
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 900,
                letterSpacing: '-0.05em',
              }}
            >
              dopamine<span className="text-xl sm:text-2xl align-top ml-1 font-normal">&copy;</span>
            </span>

            <div className="text-right font-mono-thin text-xs sm:text-sm md:text-base tracking-widest text-white uppercase select-none">
              <div>ONLY THE</div>
              <div className="font-bold text-white">STRONG EVOLVE</div>
            </div>
          </div>

          {/* Section Divider (SEC. /C) */}
          <div className="about-section-divider">
            <div className="about-section-divider-line" />
            <div className="about-section-divider-meta">
              <div className="flex items-center gap-12 sm:gap-20">
                <span className="font-bold">SEC.</span>
                <span className="font-bold">/C</span>
              </div>
              <span className="about-section-divider-dot" />
            </div>
          </div>

          {/* Agency Snapshot Overview */}
          <div
            className="about-space-after-divider"
            style={{ paddingTop: '6rem', paddingBottom: '9rem' }}
          >
            <div className="about-snapshot-layout items-start">
              {/* Heading */}
              <div>
                <h3
                  className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-none"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 900,
                    letterSpacing: '-0.03em',
                  }}
                >
                  AGENCY<br />
                  SNAPSHOT
                </h3>
              </div>

              {/* Column 2: Humble Yet Impactful Snapshot Cards Grid */}
              <div className="about-snapshot-cards">
                {/* Snapshot 1: PEOPLE (10+) */}
                <div className="space-y-6">
                  <div
                    className="text-base sm:text-lg font-black uppercase tracking-wider text-white"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 900,
                      letterSpacing: '0.04em',
                    }}
                  >
                    PEOPLE
                  </div>

                  <div
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 900,
                      WebkitTextStroke: '2px #FFFFFF',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    12+
                  </div>

                  <p className="text-base sm:text-lg text-white font-normal leading-relaxed pt-2">
                    A tight collective of directors, designers, and media architects devoted entirely to singular craft over headcount.
                  </p>
                </div>

                {/* Snapshot 2: GLOBAL REACH (04) */}
                <div className="space-y-6">
                  <div
                    className="text-base sm:text-lg font-black uppercase tracking-wider text-white"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 900,
                      letterSpacing: '0.04em',
                    }}
                  >
                    GLOBAL REACH
                  </div>

                  <div
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 900,
                      WebkitTextStroke: '2px #FFFFFF',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    04
                  </div>

                  <p className="text-base sm:text-lg text-white font-normal leading-relaxed pt-2">
                    Operating across Tokyo, London, Berlin, and New York with direct creative leadership on every assignment.
                  </p>
                </div>

                {/* Snapshot 3: IN-HOUSE CRAFT*/}
                <div className="space-y-6">
                  <div
                    className="text-base sm:text-lg font-black uppercase tracking-wider text-white"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 900,
                      letterSpacing: '0.04em',
                    }}
                  >
                    IN-HOUSE CRAFT
                  </div>

                  <div
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 900,
                      WebkitTextStroke: '2px #FFFFFF',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    101%
                  </div>

                  <p className="text-base sm:text-lg text-white font-normal leading-relaxed pt-2">
                    Every commission is executed directly by principal craftspeople with zero account layers and zero outsourcing.
                  </p>
                </div>

                {/* Snapshot 4: ANNUAL COMMISSIONS (08) */}
                <div className="space-y-6">
                  <div
                    className="text-base sm:text-lg font-black uppercase tracking-wider text-white"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 900,
                      letterSpacing: '0.04em',
                    }}
                  >
                    ANNUAL COMMISSIONS
                  </div>

                  <div
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none"
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 900,
                      WebkitTextStroke: '2px #FFFFFF',
                      letterSpacing: '-0.04em',
                    }}
                  >
                    08
                  </div>

                  <p className="text-base sm:text-lg text-white font-normal leading-relaxed pt-2">
                    We intentionally cap our concurrent partnerships each year to ensure uncompromised devotion to every client.
                  </p>
                </div>
              </div>
            </div>
          </div>


        </section>

        {/* Studio Footer */}
        <Footer />
      </main>
    </>
  );
}
