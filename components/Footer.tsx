'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * Studio Footer Component
 * Scroll-driven brandmark scaling, ambient video backdrop, and studio directory.
 */
export function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initialize backdrop video autoplay
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.defaultMuted = true;
    vid.playsInline = true;
    try {
      const playPromise = vid.play();
      if (playPromise && typeof playPromise.catch === 'function') {
        playPromise.catch(() => {});
      }
    } catch {}
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll progress for pinned footer animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Title scale animation
  const rawScale = useTransform(
    scrollYProgress,
    [0.0, 0.08, 0.58, 0.78, 1.0],
    [0.34, 0.36, 0.92, 0.92, 0.88]
  );
  const scale = useSpring(rawScale, { stiffness: 90, damping: 24, mass: 0.45 });

  // Letter spacing animation
  const rawLetterSpacing = useTransform(
    scrollYProgress,
    [0.0, 0.08, 0.58, 0.78, 1.0],
    ['-0.052em', '-0.050em', '-0.048em', '-0.048em', '-0.052em']
  );
  const letterSpacing = useSpring(rawLetterSpacing, { stiffness: 90, damping: 24, mass: 0.45 });

  // Vertical position offset
  const rawY = useTransform(
    scrollYProgress,
    [0.0, 0.08, 0.58, 0.78, 1.0],
    [12, 10, 0, 0, -8]
  );
  const y = useSpring(rawY, { stiffness: 90, damping: 24, mass: 0.45 });

  // Ambient backdrop glow
  const rawGlow = useTransform(
    scrollYProgress,
    [0.08, 0.58, 0.78, 1.0],
    [0, 0.32, 0.32, 0.82]
  );
  const glowOpacity = useSpring(rawGlow, { stiffness: 90, damping: 24 });

  const rawGlowScale = useTransform(
    scrollYProgress,
    [0.78, 1.0],
    [1.0, 1.3]
  );
  const glowScale = useSpring(rawGlowScale, { stiffness: 85, damping: 22 });

  // Video backdrop parallax
  const rawVideoScale = useTransform(
    scrollYProgress,
    [0.0, 0.58, 0.78, 1.0],
    [1.08, 1.0, 1.0, 0.95]
  );
  const videoScale = useSpring(rawVideoScale, { stiffness: 90, damping: 24 });

  const rawVideoOpacity = useTransform(
    scrollYProgress,
    [0.0, 0.78, 1.0],
    [0.88, 0.88, 0.45]
  );
  const videoOpacity = useSpring(rawVideoOpacity, { stiffness: 90, damping: 24 });

  // Bottom column strip exit transition
  const rawStripOpacity = useTransform(
    scrollYProgress,
    [0.72, 0.90],
    [1.0, 0.0]
  );
  const stripOpacity = useSpring(rawStripOpacity, { stiffness: 90, damping: 24 });

  const rawStripY = useTransform(
    scrollYProgress,
    [0.72, 0.90],
    [0, 18]
  );
  const stripY = useSpring(rawStripY, { stiffness: 90, damping: 24 });

  return (
    <footer
      id="footer"
      ref={containerRef}
      aria-label="Studio Footer"
      className="footer-studio"
    >
      <div className="footer-studio__sticky">
        {/* Video Backdrop */}
        <div className="footer-studio__video-backdrop" aria-hidden="true">
          <motion.video
            ref={videoRef}
            src="/media/footer.mp4"
            autoPlay
            muted
            loop
            playsInline
            style={{ scale: videoScale, opacity: videoOpacity }}
            className="footer-studio__video"
          />
          <div className="footer-studio__video-overlay" />
        </div>

        {/* Ambient Glow */}
        <motion.div
          style={{ opacity: glowOpacity, scale: glowScale }}
          className="footer-studio__ambient-glow"
          aria-hidden="true"
        />

        {/* Bottom Information Strip */}
        <motion.div
          style={{ opacity: stripOpacity, y: stripY }}
          className="footer-studio__bottom-strip"
        >
          {/* Left Column: Legal */}
          <div className="footer-studio__bottom-left">
            <div className="footer-studio__legal-block">
              <span className="footer-studio__legal-line">
                <span className="footer-studio__legal-pill">[ &copy; 2026 ]</span>{' '}
                <span>DOPAMINE STUDIO</span>
              </span>
              <span className="footer-studio__legal-line">
                <span className="footer-studio__legal-slash">//</span>{' '}
                <span>ALL RIGHTS RESERVED</span>
              </span>
            </div>
          </div>

          {/* Center Column: Studio Details & Socials */}
          <div className="footer-studio__lockup">
            <div className="footer-studio__lockup-line">
              SINCE 2026
            </div>
            <div className="footer-studio__lockup-line">
              CREATIVE DIRECTION &amp; DIGITAL LAB
            </div>
            <div className="footer-studio__lockup-line">
              <span className="footer-studio__lockup-box">REMOTELY</span> / WORLDWIDE
            </div>
            <div className="footer-studio__lockup-quote">
              &ldquo;IT&rsquo;S A VIBE&rdquo;
            </div>

            {/* Social Links */}
            <nav className="footer-studio__socials" aria-label="Social Channels">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-studio__social-icon-link"
                aria-label="Instagram"
              >
                <svg
                  className="footer-studio__social-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-studio__social-icon-link"
                aria-label="Twitter / X"
              >
                <svg
                  className="footer-studio__social-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-studio__social-icon-link"
                aria-label="LinkedIn"
              >
                <svg
                  className="footer-studio__social-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-studio__social-icon-link"
                aria-label="TikTok"
              >
                <svg
                  className="footer-studio__social-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3.14 15.7a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.58a8.28 8.28 0 0 0 4.77 1.52v-3.41z" />
                </svg>
              </a>
            </nav>

            {/* Back to Top */}
            <button
              type="button"
              onClick={handleScrollToTop}
              className="footer-studio__top-minimal"
              aria-label="Scroll to top of page"
            >
              <span>BACK TO TOP</span>
              <span aria-hidden="true">&uarr;</span>
            </button>
          </div>

          {/* Right Column: Inquiries */}
          <div className="footer-studio__bottom-right">
            <div className="footer-studio__inquiries-block">
              <span className="footer-studio__inquiries-label">DIRECT INQUIRIES</span>
              <a
                href="mailto:contact@dopamine.agency"
                className="footer-studio__email-minimal"
              >
                contact@dopamine.agency
              </a>
            </div>
          </div>
        </motion.div>

        {/* Giant Scroll-Animated Title */}
        <div className="footer-studio__monument">
          <motion.div
            style={{
              scale,
              letterSpacing,
              y,
              transformOrigin: 'bottom center',
            }}
            className="footer-studio__giant-wrap"
          >
            <a
              href="/"
              className="footer-studio__giant-title"
              aria-label="Dopamine Home"
            >
              dopamine<span className="footer-studio__giant-copy">&copy;</span>
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

export const JamsFooter = Footer;
