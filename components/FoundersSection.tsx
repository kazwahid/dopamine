'use client';

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Founders Section Component
 * Displays creative director biographies, photographic portraits, and vector autograph animations.
 */
export function FoundersSection() {
  return (
    <section
      id="founders"
      aria-label="Studio Founders"
      className="relative w-full py-12 sm:py-20 md:py-28 select-none"
    >
      <div className="founders-layout">
        {/* Founder 01:  */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="founders-row-left group"
        >
          {/* Borderless Photo Frame with Top-Left Autograph */}
          <div className="founder-photo-box">
            {/* Subtle camera crosshair at corner from haoqi.design */}
            <div className="absolute -top-3 -left-3 text-white/40 font-mono text-xs pointer-events-none select-none z-20">
              +
            </div>

            <div className="founder-photo-inner">
              <img
                src="/media/agha.png"
                alt="Agha Najam"
                className="w-full h-full object-cover contrast-110 brightness-95 group-hover:scale-[1.02] transition-transform duration-700 ease-out block"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                loading="eager"
              />

              {/* Contrast vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

              {/* Monochrome Accent Square */}
              <div
                className="absolute bottom-8 right-8 z-20 pointer-events-none select-none"
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#FFFFFF',
                }}
              />

            </div>
          </div>

          {/* Founder Title — In the Empty Space in Front of Photo */}
          <div className="flex flex-col space-y-2.5 font-mono text-left max-w-sm shrink-0">
            <div
              className="text-sm sm:text-base md:text-lg tracking-widest text-white font-bold"
              style={{ fontFamily: 'var(--font-mono)' }}
            >

            </div>
            <p
              className="text-xs sm:text-sm text-white/60 leading-relaxed tracking-wider uppercase m-0"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              CREATIVE LEADER | CO FOUNDER  <br className="hidden sm:inline" />
              there is extraordinary in every ordinary
            </p>
          </div>
        </motion.div>

        {/* Founder 02:*/}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="founders-row-right group"
        >
          {/* Borderless Photo Frame with Top-Left Autograph */}
          <div className="founder-photo-box">
            {/* Subtle camera crosshair at corner from haoqi.design */}
            <div className="absolute -top-3 -right-3 text-white/40 font-mono text-xs pointer-events-none select-none z-20">
              +
            </div>

            <div className="founder-photo-inner">
              <img
                src="/media/qazi.png"
                alt="Qazi Wahid"
                className="w-full h-full object-cover contrast-110 brightness-95 group-hover:scale-[1.02] transition-transform duration-700 ease-out block"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                loading="eager"
              />

              {/* Contrast vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

              {/* Monochrome Accent Square */}
              <div
                className="absolute bottom-8 right-8 z-20 pointer-events-none select-none"
                style={{
                  width: '12px',
                  height: '12px',
                  backgroundColor: '#FFFFFF',
                }}
              />

            </div>
          </div>

          {/* Founder Title — In the Empty Space in Front of Photo (To his left) */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right space-y-2.5 font-mono max-w-sm shrink-0">
            <div
              className="text-sm sm:text-base md:text-lg tracking-widest text-white font-bold"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
            </div>
            <p
              className="text-xs sm:text-sm text-white/60 leading-relaxed tracking-wider uppercase m-0"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              CO FOUNDER | BUSINESS GROWTH <br className="hidden sm:inline" />
              Curious human, intrigued by the world around him. Often interesting, always interested
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
