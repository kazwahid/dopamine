'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Contact() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsFormOpen(false);
      setEmail('');
    }, 2000);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="relative w-full h-screen bg-black text-white flex flex-col justify-between p-6 sm:p-10 md:p-14 overflow-hidden select-none"
      style={{ backgroundColor: '#000000', color: '#FFFFFF' }}
    >
      {/* Background Reel */}
      <video
        src="/media/sequence-alpha.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover grayscale-[10%] brightness-90 scale-105"
      />

      {/* Contrast Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/60 pointer-events-none" />

      {/* Header */}
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

      {/* Message and Action */}
      <div className="relative z-20 flex flex-col items-end text-right max-w-xl ml-auto my-auto pr-2 md:pr-6 space-y-6">
        <h2
          className="text-2xl sm:text-3xl md:text-5xl font-mono-thin tracking-wider uppercase leading-snug text-white"
          style={{ fontWeight: 300, textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
        >
          KEEP UP WITH THE LATEST<br />
          CAMPAIGNS FROM DOPAMINE,<br />
          OR CONTACT US TO MAKE<br />
          YOUR OWN.
        </h2>

        <div>
          <motion.button
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsFormOpen(true)}
            data-cursor="[ CAMPAIGN ]"
            className="px-8 py-3.5 rounded-full bg-white text-black font-mono-thin text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition-all cursor-pointer shadow-2xl flex items-center gap-3"
          >
            <span>START A CAMPAIGN</span>
            <span>&rarr;</span>
          </motion.button>
        </div>
      </div>

      {/* Bottom Display */}
      <div className="relative z-20 flex items-end justify-between w-full pt-6">
        <div className="flex items-baseline gap-2 sm:gap-4">
          <span className="text-3xl sm:text-5xl md:text-6xl text-white/70 font-mono-thin leading-none select-none">
            &#8629;
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-[13vw] sm:text-[12vw] md:text-[10.5vw] font-black uppercase tracking-tight leading-none text-white select-none pointer-events-none"
            style={{
              fontFamily: 'var(--font-sans)',
              letterSpacing: '-0.04em',
              textShadow: '0 10px 40px rgba(0,0,0,0.85)',
            }}
          >
            CONTACT US
          </motion.h1>
        </div>

        {/* Inquiries */}
        <div className="hidden lg:block font-mono-thin text-[10px] text-white/70 text-right pb-4">
          <span className="text-white/40 block">DIRECT INQUIRIES</span>
          <a
            href="mailto:contact@dopamine.agency"
            className="text-white hover:underline font-bold tracking-wider"
          >
            CONTACT@DOPAMINE.AGENCY
          </a>
        </div>
      </div>

      {/* Interactive Modal */}
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
                <span>[ CAMPAIGN INQUIRY &bull; S.04 ]</span>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="hover:text-white/60 cursor-pointer font-bold"
                >
                  [ CLOSE &times; ]
                </button>
              </div>

              <div>
                <h3 className="text-xl font-bold uppercase tracking-wider text-white">
                  CREATE WITH DOPAMINE
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  Commission a cinematic reel, media architecture, or sound identity.
                </p>
              </div>

              {submitted ? (
                <div className="p-4 rounded-lg bg-white/10 border border-white/30 text-white text-xs text-center">
                  &check; DISPATCH TRANSMITTED. THE STUDIO WILL RESPOND SHORTLY.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-white/60 uppercase mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="founder@brand.com"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-white font-mono-thin"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 uppercase mb-1">Project Scope</label>
                    <select className="w-full px-4 py-3 rounded-lg bg-[#1a1a1c] border border-white/20 text-white focus:outline-none focus:border-white font-mono-thin">
                      <option>Full Cinematic Reel Production (4K)</option>
                      <option>Kinetic Motion & Editorial Identity</option>
                      <option>Sound Architecture & Audio Engine</option>
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
    </section>
  );
}

// Alias for compatibility
export const ContactSection = Contact;
