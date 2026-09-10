'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface HeroProps {
  onSelectReel: (index: number) => void;
  onExploreClick: () => void;
}

const ITEMS = [
  { id: 0, code: '[01]', name: 'BETA', full: 'A CONTROLLED DESCENT & TENSION' },
  { id: 1, code: '[02]', name: 'GAMMA', full: 'MOMENTUM & KINETIC BREAK' },
  { id: 2, code: '[03]', name: 'DELTA', full: 'THE QUIET RESOLUTION' },
];

export function Hero({ onSelectReel, onExploreClick }: HeroProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleItemClick = (index: number) => {
    setActiveIdx(index);
    onSelectReel(index);
  };

  return (
    <section
      id="hero"
      aria-label="Hero Section"
      className="hero-glow-bg relative w-full h-screen text-white flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Header */}
      <header className="relative z-20 flex items-start justify-between w-full font-mono-thin text-xs uppercase tracking-wider">
        {/* Brand Logo */}
        <div className="flex items-center">
          <span
            className="text-2xl sm:text-3xl font-black normal-case text-white leading-none"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 900,
              letterSpacing: '-0.05em',
            }}
          >
            dopamine<span className="text-sm align-top ml-0.5 font-normal">&copy;</span>
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex items-start gap-12 sm:gap-20 text-[11px] font-mono-thin tracking-widest uppercase">
          <div className="flex flex-col space-y-1">
            <span className="flex items-center gap-2 text-white">
              <span className="w-1.5 h-1.5 bg-white inline-block" /> HOME
            </span>
            <button
              onClick={onExploreClick}
              className="text-white/60 hover:text-white transition-colors text-left cursor-pointer"
            >
              WORK[03]
            </button>
          </div>

          <div className="hidden sm:flex flex-col space-y-1">
            <a
              href="/about"
              className="text-white/60 hover:text-white transition-colors text-left"
            >
              ABOUT
            </a>
            <a href="#contact" className="text-white/60 hover:text-white transition-colors">
              CONTACT
            </a>
          </div>
        </nav>

        {/* Tagline */}
        <div className="text-right font-mono-thin text-[11px] tracking-widest text-white/80 uppercase">
          <div>ONLY THE</div>
          <div className="text-white">STRONG EVOLVE</div>
        </div>
      </header>

      {/* Interactive Reel Index */}
      <div className="relative z-20 mt-12 mb-auto max-w-4xl w-full">
        <div className="flex flex-col font-mono-thin text-xs sm:text-sm tracking-wider uppercase">
          {ITEMS.map((item, idx) => {
            const isActive = activeIdx === idx;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveIdx(idx)}
                onClick={() => handleItemClick(idx)}
                data-cursor={`[ REEL ${item.code} ]`}
                className="cursor-pointer transition-colors duration-150 py-1"
              >
                {isActive ? (
                  <motion.div
                    layoutId="activeHeroRow"
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="bg-white text-black flex items-center justify-between px-3 py-1.5 shadow-xl font-bold"
                  >
                    <div className="flex items-center gap-3 w-36 sm:w-44 shrink-0">
                      <span className="text-[10px]">▲</span>
                      <span>{item.name}</span>
                    </div>

                    <div className="hidden md:flex items-center gap-[3px] overflow-hidden">
                      {[...Array(18)].map((_, i) => (
                        <span
                          key={i}
                          className="w-[3px] h-3 bg-black"
                          style={{
                            opacity: i % 4 === 0 ? 1 : i % 2 === 0 ? 0.7 : 0.35,
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span>{item.code} {item.full}</span>
                      <span>&rarr;</span>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-white/70 hover:text-white flex items-center justify-between px-3 py-1.5">
                    <div className="w-36 sm:w-44 shrink-0 pl-5">
                      <span>{item.name}</span>
                    </div>

                    <div className="hidden md:block w-48" />

                    <div className="shrink-0 text-white/50">
                      <span>{item.code} {item.full}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <footer className="relative z-20 flex items-end justify-between w-full font-mono-thin pt-6">
        <button
          onClick={() => handleItemClick(activeIdx)}
          data-cursor="[ PLAY ]"
          className="flex items-center gap-2 text-xs tracking-widest uppercase text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <span>►</span>
          <span>VIEW {ITEMS[activeIdx].name}</span>
        </button>

        <button
          onClick={onExploreClick}
          data-cursor="[ SCROLL ]"
          className="flex items-center gap-3 sm:gap-4 text-white hover:text-white/80 transition-colors group cursor-pointer"
        >
          <span
            className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tight leading-none"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 900,
              letterSpacing: '-0.04em',
            }}
          >
            SCROLL
          </span>
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: 'easeInOut',
            }}
            className="text-2xl sm:text-4xl md:text-5xl font-black leading-none inline-block"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 900,
            }}
          >
            &darr;
          </motion.span>
        </button>
      </footer>
    </section>
  );
}
