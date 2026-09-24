'use client';

import React, { useState, useCallback } from 'react';
import { Loader } from '@/components/Loader';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ShowcaseReel } from '@/components/ShowcaseReel';
import { AgencySection } from '@/components/AgencySection';
import { LatestWork } from '@/components/LatestWork';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';

/**
 * Dopamine Studio Main Landing Page
 * Fullscreen neuro-cinematic experience combining hero typography,
 * dynamic media showcase reel, editorial works, agency capabilities,
 * campaign inquiries, and the studio footer.
 */
export default function Home() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  const handleScrollToShowcase = useCallback(() => {
    const el = document.getElementById('showcase-reel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleScrollToWork = useCallback(() => {
    const el = document.getElementById('latest-work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      {/* Fluid custom pointer */}
      <CustomCursor />

      {/* Molecular splash screen */}
      {!loaderComplete && (
        <Loader onComplete={() => setLoaderComplete(true)} />
      )}

      {/* Sticky Navigation Header */}
      <Header onScrollToWork={handleScrollToWork} />

      <main id="main-content" className="relative w-full overflow-x-clip bg-black">
        {/* Hero Section */}
        <Hero
          onScrollToWork={handleScrollToWork}
          onShowcaseClick={handleScrollToShowcase}
        />

        {/* Showcase Reel Section */}
        <ShowcaseReel />

        {/* Latest Work Section [S.02] */}
        <LatestWork />

        {/* Agency Capabilities Section [S.03] */}
        <AgencySection />

        {/* Studio Footer */}
        <Footer />
      </main>
    </>
  );
}
