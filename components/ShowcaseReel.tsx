'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

const SHOWCASE_VIDEO = '/media/sequence-beta.mp4';

const REEL_THUMBNAILS = [
  '/media/agency/037.jpg',
  '/media/agency/045.jpg',
  '/media/agency/048.jpg',
  '/media/agency/050.jpg',
  '/media/agency/outfit.jpg',
];

/**
 * Showcase Reel Component
 * Cinematic viewport reel featuring dynamic scroll zoom transition,
 * inline video playback, modal expand, and scrub bar.
 */
export function ShowcaseReel() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const inlineVideoRef = useRef<HTMLVideoElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);

  // Scroll reveal with central scale expansion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Scale: enters compact in center (~0.62) and expands to full (1.0) by mid-scroll
  const rawScale = useTransform(
    scrollYProgress,
    [0.08, 0.44, 0.74, 0.98],
    [0.62, 1.0, 1.0, 0.95]
  );
  const scale = useSpring(rawScale, { stiffness: 85, damping: 26, mass: 0.8 });

  // Opacity: smoothly fades in as it zooms forward
  const rawOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.28, 0.82, 0.98],
    [0.35, 1, 1, 0.2]
  );
  const opacity = useSpring(rawOpacity, { stiffness: 85, damping: 26 });

  // Subtle Y translation for weight & entry
  const rawY = useTransform(
    scrollYProgress,
    [0.08, 0.44, 0.82, 0.98],
    [80, 0, 0, -25]
  );
  const y = useSpring(rawY, { stiffness: 85, damping: 26 });

  // Section exit curtain lift as next section reveals
  const sectionExitY = useTransform(scrollYProgress, [0.72, 1], [0, -85]);

  // Label text parallax
  const metaParallaxY = useTransform(scrollYProgress, [0, 1], [20, -20]);

  // Auto-play inline video when in viewport
  useEffect(() => {
    const vid = inlineVideoRef.current;
    if (!vid) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vid.play().catch(() => { });
        } else {
          vid.pause();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(vid);
    return () => observer.disconnect();
  }, []);

  // Track progress for the inline video
  useEffect(() => {
    const vid = inlineVideoRef.current;
    if (!vid) return;
    const handleTime = () => {
      if (vid.duration) setProgress((vid.currentTime / vid.duration) * 100);
    };
    vid.addEventListener('timeupdate', handleTime);
    return () => vid.removeEventListener('timeupdate', handleTime);
  }, []);

  // Sync fullscreen video time with inline when opening
  const openFullscreen = useCallback(() => {
    setIsFullscreen(true);
    setIsMuted(false);
    setIsPaused(false);
    setTimeout(() => {
      const fsVid = fullscreenVideoRef.current;
      const inVid = inlineVideoRef.current;
      if (fsVid && inVid) {
        fsVid.currentTime = inVid.currentTime;
        fsVid.muted = false;
        fsVid.volume = 1;
        fsVid.play().catch(() => { });
        inVid.pause();
      }
    }, 100);
  }, []);

  const closeFullscreen = useCallback(() => {
    setIsFullscreen(false);
    const fsVid = fullscreenVideoRef.current;
    const inVid = inlineVideoRef.current;
    if (fsVid && inVid) {
      inVid.currentTime = fsVid.currentTime;
      inVid.muted = true;
      inVid.play().catch(() => { });
      fsVid.pause();
    }
    setIsMuted(true);
  }, []);

  const togglePlayPause = useCallback(() => {
    const vid = fullscreenVideoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().catch(() => { });
      setIsPaused(false);
    } else {
      vid.pause();
      setIsPaused(true);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const vid = fullscreenVideoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  }, []);

  // Seek video by clicking filmstrip
  const handleFilmstripClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, clickX / rect.width));
    const vid = fullscreenVideoRef.current;
    if (vid && vid.duration) {
      vid.currentTime = pct * vid.duration;
      setProgress(pct * 100);
    }
  };

  // Track fullscreen video progress
  useEffect(() => {
    const vid = fullscreenVideoRef.current;
    if (!vid || !isFullscreen) return;
    const handleTime = () => {
      if (vid.duration) setProgress((vid.currentTime / vid.duration) * 100);
    };
    vid.addEventListener('timeupdate', handleTime);
    return () => vid.removeEventListener('timeupdate', handleTime);
  }, [isFullscreen]);

  return (
    <>
      <motion.section
        id="showcase-reel"
        ref={sectionRef}
        aria-label="Showcase Reel"
        style={{ y: sectionExitY }}
        className="showcase-reel-section"
      >
        <motion.div
          style={{ opacity, scale, y }}
          className="showcase-reel__viewport"
        >
          {/* Inline auto-playing video — expands as user scrolls */}
          <div
            className="showcase-reel__video-wrap"
            onClick={openFullscreen}
            data-cursor="[ PLAY REEL ]"
          >
            <video
              ref={inlineVideoRef}
              src={SHOWCASE_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              className="showcase-reel__video"
            />
            <div className="showcase-reel__overlay" />

            {/* Centered cinema play badge */}
            <div className="showcase-reel__play-icon">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                className="showcase-reel__play-circle"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <polygon points="8,5 20,12 8,19" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Minimal progress bar */}
          <div className="showcase-reel__progress-track">
            <div
              className="showcase-reel__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Bottom metadata with parallax */}

        </motion.div>
      </motion.section>

      {/* Fullscreen overlay — Produx.design Cinema Style */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="showcase-reel__fullscreen"
          >
            <video
              ref={fullscreenVideoRef}
              src={SHOWCASE_VIDEO}
              loop
              playsInline
              className="showcase-reel__fs-video"
            />

            {/* Bottom control bar — centered together */}
            <div className="showcase-reel__fs-controls">
              <div className="showcase-reel__fs-controls-dock">
                <button
                  onClick={togglePlayPause}
                  className="showcase-reel__fs-btn"
                  aria-label={isPaused ? 'Play' : 'Pause'}
                >
                  {isPaused ? '▶' : '❚❚'}
                </button>

                {/* Filmstrip Timeline Scrubber with White Cursor */}
                <div
                  className="showcase-reel__filmstrip-track"
                  onClick={handleFilmstripClick}
                  title="Click anywhere to seek"
                >
                  {REEL_THUMBNAILS.map((thumb, idx) => (
                    <img
                      key={idx}
                      src={thumb}
                      alt={`Scene ${idx + 1}`}
                      className="showcase-reel__filmstrip-thumb"
                    />
                  ))}
                  {/* White Cursor Progress Indicator */}
                  <div
                    className="showcase-reel__filmstrip-cursor"
                    style={{ left: `${progress}%` }}
                  />
                </div>

                <button
                  onClick={toggleMute}
                  className="showcase-reel__fs-btn"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? '🔇' : '🔊'}
                </button>

                <button
                  onClick={closeFullscreen}
                  className="showcase-reel__fs-btn showcase-reel__fs-close"
                  aria-label="Close fullscreen"
                >
                  ✕
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export const ShowcaseReelSection = ShowcaseReel;
