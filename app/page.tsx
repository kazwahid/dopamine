'use client';

import React, { useState, useCallback } from 'react';
import { Loader } from '@/components/Loader';
import { Hero } from '@/components/Hero';
import { Reels } from '@/components/Reels';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { audioEngine } from '@/lib/audio';

export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [activeReelIndex, setActiveReelIndex] = useState(0);

  const handleSelectReel = useCallback((index: number) => {
    setActiveReelIndex(index);
    audioEngine.setReelTone(index);
    const reelsEl = document.getElementById('reels');
    if (reelsEl) {
      reelsEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleExploreClick = useCallback(() => {
    const reelsEl = document.getElementById('reels');
    if (reelsEl) {
      reelsEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      {/* Monochrome Custom Cursor */}
      <CustomCursor />

      {/* Introductory Molecular Loader */}
      {!loaderComplete && (
        <Loader onComplete={() => setLoaderComplete(true)} />
      )}

      <main id="main-content" className="relative w-full overflow-x-hidden bg-black">
        {/* Studio Hero Section */}
        <Hero
          onSelectReel={handleSelectReel}
          onExploreClick={handleExploreClick}
        />

        {/* Cinematic Reels Section */}
        <Reels
          activeReelIndex={activeReelIndex}
          setActiveReelIndex={setActiveReelIndex}
        />

        {/* Inquiries & Campaign Contact Section */}
        <Contact />

        {/* Studio Footer */}
        <Footer />
      </main>
    </>
  );
}
