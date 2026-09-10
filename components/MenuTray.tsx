'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { brand } from '@/lib/brand';
import { audioEngine } from '@/lib/audio';

interface MenuTrayProps {
  currentReel: number;
  totalReels: number;
  onSelectReel: (index: number) => void;
  onOpenMenu: () => void;
  reelNames?: string[];
}

export function MenuTray({
  currentReel,
  totalReels,
  onSelectReel,
  onOpenMenu,
  reelNames = ['ALPHA', 'BETA', 'GAMMA', 'DELTA', 'FINALE'],
}: MenuTrayProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [soundPlaying, setSoundPlaying] = useState(false);

  useEffect(() => {
    return audioEngine.subscribe((p) => setSoundPlaying(p));
  }, []);

  const progress = totalReels > 1 ? currentReel / (totalReels - 1) : 0;

  const handlePointer = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const ratio = x / rect.width;
      const targetReel = Math.round(ratio * (totalReels - 1));
      onSelectReel(targetReel);
    },
    [onSelectReel, totalReels]
  );

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handlePointer(e.clientX);
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMouseMove = (e: MouseEvent) => handlePointer(e.clientX);
    const onMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, handlePointer]);

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-40 select-none pointer-events-auto"
      style={{ left: '50%', transform: 'translateX(-50%)' }}
    >
      {/* Floating Centered Glass Tray */}
      <div
        className="flex items-center gap-6 px-6 py-2.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-xl shadow-2xl"
        style={{
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.8), inset 0 1px 0 0 rgba(255,255,255,0.2)',
        }}
      >
        {/* Left: MENU Button */}
        <button
          type="button"
          onClick={() => {
            audioEngine.playShutterClick();
            onOpenMenu();
          }}
          className="text-[11px] font-mono tracking-widest text-white/70 hover:text-white uppercase transition-colors cursor-pointer bg-transparent border-none flex items-center gap-1.5"
          aria-label="Open Navigation Directory"
        >
          <span>MENU</span>
          <span className="text-white/40">+</span>
        </button>

        <span className="w-px h-3.5 bg-white/15" />

        {/* Center: Unique Centered Horizontal Scrub Bar */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-white/40 tracking-wider">
            0{currentReel + 1}
          </span>

          <div
            ref={trackRef}
            onMouseDown={onMouseDown}
            className="scroll-progress scroll-progress-scrubber relative w-32 sm:w-44 h-1.5 bg-white/15 rounded-full cursor-pointer group"
            style={{ position: 'relative' }}
          >
            {/* Active Progress Fill */}
            <div
              className="scroll-progress-fill absolute top-0 left-0 h-full bg-white rounded-full transition-all duration-300 origin-left"
              style={{
                width: `${Math.max(2, progress * 100)}%`,
                transform: progress === 0 ? 'scaleX(0)' : undefined,
                boxShadow: '0 0 8px rgba(255,255,255,0.9)',
              }}
            />

            {/* Glowing Head Node */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-white pointer-events-none transition-all duration-300"
              style={{
                left: `${progress * 100}%`,
                boxShadow: '0 0 10px #FFFFFF',
              }}
            />
          </div>

          <span className="text-[10px] font-mono text-white/80 tracking-wider">
            {reelNames[currentReel] ?? 'REEL'}
          </span>
        </div>

        <span className="w-px h-3.5 bg-white/15" />

        {/* Right: Sound Toggle */}
        <button
          type="button"
          onClick={() => {
            audioEngine.toggle();
            audioEngine.playShutterClick();
          }}
          className="text-[10px] font-mono tracking-widest text-white/70 hover:text-white uppercase transition-colors cursor-pointer bg-transparent border-none flex items-center gap-1.5"
          aria-label="Toggle Sound"
        >
          <span>AUDIO</span>
          <span className={soundPlaying ? 'text-white font-bold' : 'text-white/30'}>
            {soundPlaying ? '[ON]' : '[OFF]'}
          </span>
        </button>
      </div>
    </motion.div>
  );
}
