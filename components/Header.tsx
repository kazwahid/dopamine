'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onScrollToWork?: () => void;
}

/**
 * Global Navigation Header
 * Features brandmark, studio descriptor, direct contact link, and navigation tray menu.
 */
export function Header({ onScrollToWork }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const handleWorkClick = (e: React.MouseEvent) => {
    setMenuOpen(false);
    if (onScrollToWork) {
      e.preventDefault();
      onScrollToWork();
    } else {
      const el = document.getElementById('latest-work');
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        e.preventDefault();
        window.location.href = '/#latest-work';
      }
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById('footer');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAboutClick = (e: React.MouseEvent) => {
    setMenuOpen(false);
  };

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const navItems = [
    { label: 'Home', onClick: handleHomeClick, href: '/' },
    { label: 'Work', onClick: handleWorkClick, href: '/#latest-work' },
    { label: 'About', onClick: handleAboutClick, href: '/about' },
    { label: 'Contact', onClick: handleContactClick, href: '#footer' },
  ];

  return (
    <header
      className="header-evolve"
      aria-label="Global Site Navigation"
    >
      <div className="header-evolve__inner">
        {/* Col 1: Brandmark */}
        <div className="header-evolve__col header-evolve__brand">
          <Link
            href="/"
            onClick={handleHomeClick}
            className="header-evolve__logo"
            aria-label="Dopamine Studio Home"
          >
            dopamine<span className="header-evolve__logo-copy">&copy;</span>
          </Link>
        </div>

        {/* Col 2: Studio Description in Abstract 3-line Capitalized Layout */}
        <div className="header-evolve__col header-evolve__desc">
          <span className="header-evolve__desc-indent">Creative Direction And Brand Systems.</span>
          <span>Driven By Vision. Built With Craft</span>
          <span>And Technology.</span>
        </div>

        {/* Col 3: Email + Est */}
        <div className="header-evolve__col header-evolve__contact">
          <a href="mailto:contact@dopamine.agency" className="header-evolve__email">
            contact@dopamine.agency
          </a>
          <span className="header-evolve__est">EST 2026&copy;</span>
        </div>

        {/* Col 4: Menu Button + Compact White Stacked Tray */}
        <div
          className="header-evolve__col header-evolve__menu-col"
          ref={menuContainerRef}
        >
          <div className="header-evolve__menu-wrapper">
            <button
              type="button"
              className={`header-evolve__menu-btn ${menuOpen ? 'header-evolve__menu-btn--open' : ''}`}
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-expanded={menuOpen}
              aria-controls="header-menu-tray"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className="header-evolve__menu-label">
                {menuOpen ? 'Close' : 'Menu'}
              </span>
            </button>

            {/* Navigation Tray */}
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  id="header-menu-tray"
                  className="header-evolve__tray-box"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  <nav className="header-evolve__tray-list" aria-label="Main Navigation">
                    {navItems.map((item, idx) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: -3 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.03, duration: 0.2 }}
                      >
                        <Link
                          href={item.href}
                          onClick={item.onClick}
                          className="header-evolve__tray-item"
                        >
                          {item.label}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

