'use client';

import React from 'react';

export function Footer() {
  return (
    <footer
      aria-label="Studio Footer"
      className="relative w-full bg-black text-white select-none flex flex-col justify-end pt-32 pb-10 px-6 sm:px-12 md:px-16 border-t border-white/10"
      style={{ backgroundColor: '#000000', color: '#FFFFFF' }}
    >
      <div className="w-full flex flex-col md:flex-row items-center md:items-end justify-between gap-8 md:gap-4 font-mono-thin text-[11px] tracking-wider uppercase">
        {/* Social Links */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-start">
          <span className="font-bold text-white tracking-widest text-xs">MADE WITH LOVE</span>

          <div className="flex items-center gap-1.5 text-white/80">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* X / Twitter */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Vimeo */}
            <a
              href="https://vimeo.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vimeo"
              className="p-1.5 rounded hover:bg-white/10 hover:text-white transition-colors flex items-center justify-center"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.396 7.164c-.093 2.026-1.507 4.799-4.245 8.32-2.839 3.676-5.244 5.515-7.215 5.515-1.229 0-2.274-1.135-3.136-3.406l-1.708-6.26c-.636-2.275-1.32-3.412-2.052-3.412-.159 0-.713.33-1.662.99l-.99-1.27c1.077-.946 2.14-1.895 3.19-2.846 1.45-1.246 2.53-1.896 3.24-1.948 1.684-.136 2.723.977 3.116 3.339.467 2.81 1.002 5.068 1.605 6.772.603 1.704 1.258 2.556 1.966 2.556.559 0 1.298-.827 2.217-2.482.918-1.655 1.41-2.909 1.474-3.76.136-1.405-.41-2.107-1.637-2.107-.584 0-1.182.13-1.794.39 1.205-3.957 3.504-5.857 6.899-5.702 2.518.114 3.695 1.714 3.535 4.801z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Studio Mark & Metadata */}
        <div className="flex flex-col items-center text-center space-y-0.5 leading-tight">
          <a
            href="/about"
            className="text-xl sm:text-2xl font-black normal-case text-white leading-none hover:opacity-80 transition-opacity inline-block mb-1"
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 900,
              letterSpacing: '-0.05em',
            }}
          >
            dopamine<span className="text-xs align-top ml-0.5 font-normal">&copy;</span>
          </a>
          <span className="text-[11px] text-white/80">SINCE 2026</span>
          <span className="text-[11px] text-white/80">DESIGNED / CURATED</span>
          <div className="text-[11px] text-white/80">
            <span className="border border-white/60 px-1.5 py-0.2 rounded-sm text-[10px] font-bold">
              REMOTELY
            </span>{' '}
            / WORLDWIDE
          </div>
          <span className="text-[11px] text-white/70 pt-0.5">
            &ldquo;IT&rsquo;S A VIBE&rdquo;
          </span>
        </div>

        {/* Colophon & Studio Monogram */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-center md:justify-end text-[10px] text-white/70">
          <span>
            SITE BY{' '}
            <a
              href="https://qaziwahid.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white hover:underline underline-offset-4 transition-all"
            >
              QAZIWAHID
            </a>
            , <span className="text-white/80">STUDIO</span>
          </span>

          <div
            className="w-6 h-6 rounded-full border border-white/30 bg-white/10 flex items-center justify-center text-white shrink-0 hover:border-white transition-colors"
            title="Dopamine"
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Alias for compatibility
export const JamsFooter = Footer;
