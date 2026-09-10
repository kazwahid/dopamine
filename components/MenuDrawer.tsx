'use client';

import { useEffect } from 'react';
import { brand } from '@/lib/brand';
import { audioEngine } from '@/lib/audio';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectReel: (index: number) => void;
  currentReel: number;
}

export function MenuDrawer({
  isOpen,
  onClose,
  onSelectReel,
  currentReel,
}: MenuDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    { num: '01', title: 'PROLOGUE', kicker: 'SEQUENCE ALPHA' },
    { num: '02', title: 'DESCENT', kicker: 'SEQUENCE BETA' },
    { num: '03', title: 'MOMENTUM', kicker: 'SEQUENCE GAMMA' },
    { num: '04', title: 'RESOLUTION', kicker: 'SEQUENCE DELTA' },
    { num: '05', title: 'OPTICAL LAB', kicker: '3D & KINETICS' },
    { num: '06', title: 'ARCHIVE', kicker: 'EDITORIAL FINALE' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-16 select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <span className="text-xs font-mono text-white/50 tracking-widest">[ DIRECTORY ]</span>
        <button
          type="button"
          onClick={() => {
            audioEngine.playShutterClick();
            onClose();
          }}
          className="text-xs font-mono tracking-widest text-white/70 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
          aria-label="Close Navigation Menu"
        >
          CLOSE [✕]
        </button>
      </div>

      <nav className="my-auto py-12 max-w-2xl" aria-label="Reel Directory">
        <div className="flex flex-col gap-6">
          {items.map((item, index) => {
            const isCurrent = currentReel === index;
            return (
              <button
                key={item.num}
                type="button"
                onClick={() => {
                  audioEngine.playShutterClick();
                  onSelectReel(index);
                  onClose();
                }}
                className={`group flex items-baseline justify-between text-left transition-all cursor-pointer bg-transparent border-none ${
                  isCurrent ? 'text-white font-bold' : 'text-white/50 hover:text-white'
                }`}
              >
                <div className="flex items-baseline gap-6">
                  <span className="text-xs font-mono text-white/30">{item.num}</span>
                  <span className="text-2xl md:text-4xl font-serif tracking-widest uppercase">
                    {item.title}
                  </span>
                </div>
                <span className="text-xs font-mono text-white/30 group-hover:text-white transition-colors">
                  {item.kicker}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <div className="flex items-center justify-between border-t border-white/10 pt-6 text-[10px] font-mono text-white/40">
        <span>{brand.name} // {brand.formulaTag}</span>
        <span>SCROLL OR ARROWS TO NAVIGATE</span>
      </div>
    </div>
  );
}
