'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

const formulaChars = [
  { char: 'C', sub: false, key: 'c1' },
  { char: '8', sub: true, key: 'c2' },
  { char: 'H', sub: false, key: 'c3' },
  { char: '11', sub: true, key: 'c4' },
  { char: 'N', sub: false, key: 'c5' },
  { char: 'O', sub: false, key: 'c6' },
  { char: '2', sub: true, key: 'c7' },
];

export function Loader({ onComplete }: LoaderProps) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 850);
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="dopamine-formula-loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 0.98,
            transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black select-none pointer-events-none"
          style={{ backgroundColor: '#000000' }}
        >
          <div className="relative flex flex-col items-center justify-center">
            {/* Ambient Pulse Glow */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{
                scale: [0.8, 1.25, 1],
                opacity: [0.1, 0.3, 0.15],
              }}
              transition={{
                repeat: Infinity,
                duration: 3.6,
                ease: 'easeInOut',
              }}
              className="absolute w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"
            />

            {/* Formula Characters: C₈H₁₁NO₂ */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.14,
                    delayChildren: 0.25,
                  },
                },
              }}
              className="relative flex items-baseline font-mono text-white"
              style={{
                fontFamily: 'var(--font-mono)',
              }}
            >
              {formulaChars.map((item) => (
                <motion.span
                  key={item.key}
                  variants={{
                    hidden: {
                      opacity: 0,
                      y: 22,
                      filter: 'blur(10px)',
                    },
                    visible: {
                      opacity: 1,
                      y: 0,
                      filter: 'blur(0px)',
                      transition: {
                        duration: 0.75,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    },
                  }}
                  className={
                    item.sub
                      ? 'text-lg sm:text-2xl md:text-3xl text-white/60 font-light -translate-y-2 align-baseline px-0.5'
                      : 'text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight px-0.5'
                  }
                  style={{
                    textShadow: '0 0 28px rgba(255, 255, 255, 0.45)',
                  }}
                >
                  {item.char}
                </motion.span>
              ))}
            </motion.div>

            {/* Minimal Horizontal Line */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{
                scaleX: 1,
                opacity: [0, 0.7, 0.35],
              }}
              transition={{
                duration: 1.6,
                delay: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-28 sm:w-44 h-[1.5px] bg-white/50 mt-5 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Alias for compatibility
export const JamsLoader = Loader;
