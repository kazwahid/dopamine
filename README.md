# DOPAMINE© — Studio Showcase

A high-performance media showcase platform crafted with Next.js 16, React 19, and Framer Motion. Engineered with immersive video kinetics, responsive typography, and minimalist design architecture.

## Overview

Dopamine Studio is an experiential showcase platform featuring:
- **Hero Landmark (`Hero.tsx`):** Seamless typography, interactive reel navigation, and depth parallax.
- **Showcase Reel (`ShowcaseReel.tsx`):** Center-expanding scroll zoom reveal, inline video controls, scrub timeline, and fullscreen modal mode.
- **Editorial Work Portfolio (`LatestWork.tsx`):** Two-tier dual-parallax grid highlighting creative projects.
- **Agency Capabilities (`AgencySection.tsx`):** Interactive capabilities cards detailing core disciplines.
- **Campaign Contact (`Contact.tsx`):** Video backdrop, dynamic typographic watermark, direct mail dispatch, and campaign inquiry modal.
- **Studio Footer (`Footer.tsx`):** Minimalist, high-impact design featuring scroll-driven title expansion, direct inquiries CTA, and studio directory.

## Getting Started

### Prerequisites
- Node.js 20+
- npm or pnpm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build
```bash
npm run build
npm start
```

### Running Tests
```bash
# Run unit & integration test suite
npm run test

# Run end-to-end Playwright tests
npm run e2e
```

## Architecture & Design System

- **Framework:** Next.js 16 (App Router) + React 19
- **Motion & Physics:** Framer Motion with scroll-linked spring transforms
- **Styling:** Modular CSS architecture with dark-mode contrast standards
- **Typography:** Martian Mono, Space Grotesk, and Inspire Mono
- **Accessibility:** Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`), skip links, accessible ARIA attributes, and reduced-motion detection.

## License
All rights reserved © 2026 DOPAMINE STUDIO INC.
