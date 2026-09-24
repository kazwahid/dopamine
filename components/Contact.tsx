'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/**
 * Contact Section Component [S.04]
 * Minimal seamless black backdrop matching Latest Work and Agency Section,
 * layered typographic parallax, direct contact access points, and interactive
 * campaign dispatch inquiry modal.
 */
export function Contact() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Layered typographic parallax effects
  const ctaParallaxY = useTransform(scrollYProgress, [0, 1], [15, -25]);
  const titleParallaxY = useTransform(scrollYProgress, [0, 1], [-15, -50]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsFormOpen(false);
      setEmail('');
    }, 2500);
  };

  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      aria-label="Contact Section"
      className="relative z-10 w-full min-h-screen bg-black text-white flex flex-col justify-between p-6 sm:p-10 md:p-14 pb-12 sm:pb-16 md:pb-20 lg:pb-24 select-none overflow-visible"
    >

      {/* Section header */}
      <header className="relative z-20 flex items-start justify-between w-full font-mono-thin text-xs uppercase tracking-wider">
        <div className="flex flex-col">
          <span
            className="text-2xl font-black normal-case text-white leading-none"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 900, letterSpacing: '-0.04em' }}
          >
            dopamine<span className="text-sm align-top ml-0.5 font-normal">&copy;</span>
          </span>
          <span className="text-[10px] tracking-widest text-white/70 mt-1">CONTACT</span>
        </div>

        <div className="text-right font-mono-thin text-[11px] tracking-widest text-white/80">
          [S.04]
        </div>
      </header>

      {/* Main Call to Action */}
      <motion.div
        style={{ y: ctaParallaxY }}
        className="relative z-20 flex flex-col items-end text-right max-w-xl ml-auto mt-auto mb-6 sm:mb-8 md:mb-10 pr-2 md:pr-6 space-y-4 sm:space-y-5"
      >
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-mono-thin tracking-wider uppercase leading-snug text-white"
          style={{ fontWeight: 300, textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
        >
          KEEP UP WITH THE LATEST<br />
          CAMPAIGNS FROM DOPAMINE,<br />
          OR CONTACT US TO MAKE<br />
          YOUR OWN.
        </h2>

        <div>
          <button
            type="button"
            onClick={() => setIsFormOpen(true)}
            className="px-6 py-3 rounded-full border border-white/40 text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer"
          >
            START A CAMPAIGN &rarr;
          </button>
        </div>
      </motion.div>

      {/* Typographic Display Watermark — Very Large for Beautiful Cinematic Appeal */}
      <div className="relative z-20 flex items-end justify-between w-full pt-4 sm:pt-6 pb-1">
        <motion.div style={{ y: titleParallaxY }} className="flex items-baseline gap-2 sm:gap-4 shrink-0">
          {/* Small corner icon pointing rightwards towards CONTACT US */}
          <span
            className="text-3xl sm:text-6xl md:text-7xl lg:text-8xl text-white/70 font-mono-thin leading-none select-none inline-block pb-0.5 sm:pb-2 shrink-0"
            aria-hidden="true"
          >
            &#8627;
          </span>

          <h1
            className="text-[11vw] sm:text-[13.2vw] md:text-[12.5vw] lg:text-[11.8vw] xl:text-[12.6vw] font-black uppercase tracking-tight leading-none text-white select-none pointer-events-none whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.045em',
              textShadow: '0 10px 40px rgba(0,0,0,0.85)',
            }}
          >
            CONTACT US
          </h1>
        </motion.div>

        {/* Direct Inquiries Link — Fully visible, never cut */}
        <motion.div
          style={{ y: titleParallaxY }}
          className="hidden lg:flex flex-col items-end text-right font-mono-thin text-[10px] text-white/70 pb-3 md:pb-4 shrink-0"
        >
          <span className="text-white/40 block">DIRECT INQUIRIES</span>
          <a
            href="mailto:contact@dopamine.agency"
            className="text-white hover:underline font-bold tracking-wider"
          >
            CONTACT@DOPAMINE.AGENCY
          </a>
        </motion.div>
      </div>

      {/* Campaign Inquiry Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0C0C0D] border border-white/20 text-white w-full max-w-lg p-8 rounded-2xl shadow-2xl space-y-6 font-mono-thin"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs">
                <span>[ CAMPAIGN INQUIRY ]</span>
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="hover:text-white/60 cursor-pointer font-bold"
                  aria-label="Close modal"
                >
                  &times;
                </button>
              </div>

              <div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                  CREATE WITH DOPAMINE
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  Tell us about your project or production brief.
                </p>
              </div>

              {submitted ? (
                <div className="p-4 rounded-lg bg-white/10 border border-white/30 text-white text-xs text-center" role="status">
                  &check; DISPATCH TRANSMITTED. THE STUDIO WILL RESPOND SHORTLY.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label htmlFor="inquiry-email" className="block text-white/60 uppercase mb-1">Your Email</label>
                    <input
                      id="inquiry-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="founder@brand.com"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white font-mono-thin"
                    />
                  </div>

                  <div>
                    <label htmlFor="inquiry-scope" className="block text-white/60 uppercase mb-1">Project Scope</label>
                    <select
                      id="inquiry-scope"
                      className="w-full px-4 py-3 rounded-lg bg-[#1a1a1c] border border-white/20 text-white focus:outline-none focus:border-white font-mono-thin"
                    >
                      <option>Full Cinematic Reel Production (4K)</option>
                      <option>Kinetic Motion &amp; Editorial Identity</option>
                      <option>Sound Architecture &amp; Audio Engine</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-white text-black font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors cursor-pointer"
                  >
                    TRANSMIT CAMPAIGN &rarr;
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

// Backwards-compatible export alias
export const ContactSection = Contact;
