'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoaderProps {
  /** Callback triggered once the wipe transition completes */
  onComplete: () => void;
}

/**
 * Brand Loader Component
 * Minimalist brandmark introduction with seamless feathered curtain reveal.
 */
export function Loader({ onComplete }: LoaderProps) {
  const [phase, setPhase] = useState<'hold' | 'wipe' | 'done'>('hold');

  useEffect(() => {
    const holdTimer = setTimeout(() => {
      setPhase('wipe');
    }, 1150);

    return () => clearTimeout(holdTimer);
  }, []);

  useEffect(() => {
    if (phase === 'wipe') {
      // Allow seamless wipe transition (1150ms) to complete before unmounting
      const wipeTimer = setTimeout(() => {
        setPhase('done');
      }, 1180);
      return () => clearTimeout(wipeTimer);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'done') {
      onComplete();
    }
  }, [phase, onComplete]);

  if (phase === 'done') return null;

  return (
    <motion.div
      className="loader-evolve"
      initial={{ y: 0 }}
      animate={phase === 'wipe' ? { y: '-100%' } : { y: 0 }}
      transition={
        phase === 'wipe'
          ? { duration: 1.15, ease: [0.76, 0, 0.24, 1] }
          : undefined
      }
      aria-hidden="true"
    >
      {/* Atmospheric Radial Aura */}
      <div className="loader-evolve__aura" />

      {/* Centered Brandmark */}
      <div className="loader-evolve__center">
        <motion.div
          className="loader-evolve__logo-box"
          initial={{ opacity: 0, scale: 0.94, filter: 'blur(10px)', letterSpacing: '0.02em' }}
          animate={
            phase === 'wipe'
              ? {
                  opacity: 0,
                  y: -38,
                  filter: 'blur(12px)',
                  scale: 0.98,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                }
              : {
                  opacity: 1,
                  scale: 1.0,
                  filter: 'blur(0px)',
                  letterSpacing: '-0.04em',
                  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
                }
          }
        >
          <span className="loader-evolve__brand-logo">
            dopamine<span className="loader-evolve__brand-copy">&copy;</span>
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export const JamsLoader = Loader;

