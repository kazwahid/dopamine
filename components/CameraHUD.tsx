'use client';

import { useEffect, useState } from 'react';
import { brand } from '@/lib/brand';
import { audioEngine } from '@/lib/audio';

interface CameraHUDProps {
  onOpenMenu: () => void;
  activeReel: number;
  totalReels: number;
  reelName?: string;
  onPrevReel?: () => void;
  onNextReel?: () => void;
}

export function CameraHUD({
  onOpenMenu,
  activeReel,
  totalReels,
  reelName = '',
  onPrevReel,
  onNextReel,
}: CameraHUDProps) {
  const [soundPlaying, setSoundPlaying] = useState(false);

  useEffect(() => {
    return audioEngine.subscribe((playing) => setSoundPlaying(playing));
  }, []);

  const toggleSound = () => {
    audioEngine.toggle();
    audioEngine.playShutterClick();
  };

  return (
    <header className="minimal-chrome-root" aria-label="Showcase Navigation">
      {/* Sleek Minimal Top Bar */}
      <div className="minimal-top-bar">
        {/* Left: MENU + */}
        <button
          type="button"
          onClick={() => {
            audioEngine.playShutterClick();
            onOpenMenu();
          }}
          className="minimal-btn"
          aria-label="Open Navigation Menu"
        >
          MENU +
        </button>

        {/* Center: Brand Typography */}
        <a
          href="#reel-0"
          className="brand-title"
          aria-label={`${brand.name} Home`}
        >
          {brand.name}
        </a>

        {/* Right: Sound Toggle */}
        <button
          type="button"
          onClick={toggleSound}
          className="minimal-btn"
          aria-label={soundPlaying ? 'Mute ambient sound' : 'Unmute ambient sound'}
        >
          SOUND {soundPlaying ? '[ON]' : '[OFF]'}
        </button>
      </div>

      {/* Sleek Minimal Bottom Bar */}
      <div className="minimal-bottom-bar">
        {/* Left: Reel Counter */}
        <div>
          <span>0{activeReel + 1} / 0{totalReels}</span>
        </div>

        {/* Center: Minimal Steppers */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onPrevReel}
            disabled={activeReel === 0}
            className="stepper-btn"
            aria-label="Previous Showcase Reel"
          >
            ← PREV
          </button>
          <button
            type="button"
            onClick={onNextReel}
            disabled={activeReel === totalReels - 1}
            className="stepper-btn"
            aria-label="Next Showcase Reel"
          >
            NEXT →
          </button>
        </div>

        {/* Right: Active Title */}
        <div className="hidden md:block">
          <span>{reelName}</span>
        </div>
      </div>
    </header>
  );
}
