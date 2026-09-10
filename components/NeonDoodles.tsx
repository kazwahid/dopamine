'use client';

import React from 'react';

export function NeonDoodles() {
  return (
    <div
      className="neon-doodles-container pointer-events-none absolute inset-0 z-20 overflow-hidden"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20 }}
    >
      {/* Minimal White Crown Accent */}
      <div
        className="neon-crown"
        style={{
          position: 'absolute',
          top: '22%',
          left: '28%',
          transition: 'transform 0.7s ease',
        }}
      >
        <svg
          width="110"
          height="80"
          viewBox="0 0 130 95"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.85))' }}
        >
          <path
            d="M12 78 C25 40, 18 20, 22 14 C25 25, 45 60, 56 68 C62 48, 68 18, 72 10 C78 28, 86 58, 94 65 C102 44, 114 26, 120 18 C118 42, 116 68, 112 80 C80 84, 40 82, 12 78 Z"
            stroke="#FFFFFF"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15 82 Q65 92 115 82"
            stroke="#FFFFFF"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
