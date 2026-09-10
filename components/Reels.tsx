'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioEngine } from '@/lib/audio';

const REELS = [
  { id: 'beta', src: '/media/sequence-beta.mp4', code: '01' },
  { id: 'gamma', src: '/media/sequence-gamma.mp4', code: '02' },
  { id: 'delta', src: '/media/sequence-delta.mp4', code: '03' },
];

interface ReelsProps {
  activeReelIndex: number;
  setActiveReelIndex: (index: number) => void;
}

export function Reels({ activeReelIndex, setActiveReelIndex }: ReelsProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const unsub = audioEngine.subscribe((playing) => {
      setIsPlayingAudio(playing);
    });
    return unsub;
  }, []);

  const handleAudioToggle = useCallback(() => {
    const playing = audioEngine.toggle();
    setIsPlayingAudio(playing);
  }, []);

  const goToReel = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, REELS.length - 1));
      setActiveReelIndex(clamped);
      audioEngine.setReelTone(clamped);
    },
    [setActiveReelIndex]
  );

  // Auto-play active video
  useEffect(() => {
    videoRefs.current.forEach((vid, i) => {
      if (!vid) return;
      if (i === activeReelIndex) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });
  }, [activeReelIndex]);

  const progressPercent = ((activeReelIndex + 1) / REELS.length) * 100;

  return (
    <section
      id="reels"
      ref={containerRef}
      aria-label="Cinematic Reels"
      className="relative w-full h-screen bg-black text-white overflow-hidden select-none flex flex-col justify-between"
      style={{ backgroundColor: '#000000', color: '#FFFFFF' }}
    >
      {/* Top Bar: Index Counter, Scrubber, Audio Toggle */}
      <div className="relative z-40 flex items-center justify-between px-6 py-5 sm:px-12 backdrop-blur-md bg-black/40 border-b border-white/10 font-mono-thin text-xs">
        <div className="tracking-widest text-white">
          0{activeReelIndex + 1} / 0{REELS.length}
        </div>

        {/* Horizontal Scrubber */}
        <div
          role="slider"
          aria-label="Reel Scrubber"
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={activeReelIndex + 1}
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const ratio = clickX / rect.width;
            const targetIdx = Math.floor(ratio * REELS.length);
            goToReel(targetIdx);
          }}
          data-cursor="[ SCRUB REELS ]"
          className="relative max-w-xs sm:max-w-md w-full h-1.5 bg-white/20 rounded-full overflow-hidden hover:h-2 transition-all cursor-pointer scroll-progress"
        >
          <motion.div
            className="h-full bg-white rounded-full scroll-progress-fill shadow-[0_0_10px_rgba(255,255,255,0.8)]"
            animate={{ width: `${progressPercent}%` }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          />
        </div>

        {/* Sound Toggle */}
        <button
          onClick={handleAudioToggle}
          data-cursor={isPlayingAudio ? '[ MUTE SOUND ]' : '[ ACTIVATE AUDIO ]'}
          aria-label={isPlayingAudio ? 'Mute audio' : 'Activate audio'}
          className="flex items-center gap-2.5 px-2 py-1 text-white hover:opacity-80 transition-opacity uppercase tracking-widest text-[11px] group cursor-pointer"
        >
          <div className="flex items-end gap-[2px] h-3.5 w-4 justify-center">
            {[
              { h: [3, 14, 5, 12, 3], d: 0.8 },
              { h: [6, 16, 3, 10, 6], d: 0.95 },
              { h: [2, 10, 14, 5, 2], d: 0.7 },
              { h: [5, 13, 7, 14, 5], d: 1.1 },
            ].map((bar, i) => (
              <motion.span
                key={i}
                className="w-[2px] bg-white rounded-full inline-block"
                animate={
                  isPlayingAudio
                    ? { height: bar.h }
                    : { height: 2 }
                }
                transition={
                  isPlayingAudio
                    ? { repeat: Infinity, duration: bar.d, ease: 'easeInOut' }
                    : { duration: 0.2 }
                }
              />
            ))}
          </div>
          <span className="font-mono-thin text-[11px] text-white/90 group-hover:text-white">
            {isPlayingAudio ? 'AUDIO ON' : 'SOUND'}
          </span>
        </button>
      </div>

      {/* Main Fullscreen Reel Stage */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={REELS[activeReelIndex].id}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={() => {
              if (!isPlayingAudio) {
                audioEngine.ensureStarted();
                setIsPlayingAudio(true);
              } else {
                goToReel(activeReelIndex === REELS.length - 1 ? 0 : activeReelIndex + 1);
              }
            }}
            data-cursor={isPlayingAudio ? '[ NEXT REEL ]' : '[ CLICK FOR SOUND ]'}
          >
            <video
              ref={(el) => {
                videoRefs.current[activeReelIndex] = el;
              }}
              src={REELS[activeReelIndex].src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation Strip */}
      <div className="relative z-40 flex items-center justify-between px-6 py-4 sm:px-12 bg-black/30 backdrop-blur-md border-t border-white/10 font-mono-thin text-xs">
        <button
          onClick={() => goToReel(activeReelIndex - 1)}
          disabled={activeReelIndex === 0}
          className="hover:opacity-60 disabled:opacity-20 transition-opacity flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          <span>&larr;</span>
          <span className="hidden sm:inline">PREV</span>
        </button>

        {/* Dot Indicators */}
        <div className="flex items-center gap-2">
          {REELS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => goToReel(dotIdx)}
              className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                dotIdx === activeReelIndex
                  ? 'bg-white scale-125 shadow-md'
                  : 'bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => goToReel(activeReelIndex + 1)}
          disabled={activeReelIndex === REELS.length - 1}
          className="hover:opacity-60 disabled:opacity-20 transition-opacity flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          <span className="hidden sm:inline">NEXT</span>
          <span>&rarr;</span>
        </button>
      </div>
    </section>
  );
}

// Alias for compatibility
export const ReelsSection = Reels;
