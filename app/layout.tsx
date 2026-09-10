import type { Metadata, Viewport } from 'next';
import './globals.css';
import { brand } from '@/lib/brand';

export const metadata: Metadata = {
  title: 'dopamine© — Big Vision Thinking, Pure Reel Attitude',
  description: 'Pure media architecture. Four sequences engineered for sensory immersion.',
  openGraph: {
    title: 'dopamine©',
    description: 'Pure media architecture. Four sequences engineered for sensory immersion.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'dopamine©',
    description: 'Pure media architecture. Four sequences engineered for sensory immersion.',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Martian+Mono:wght@300;400;500;700;800&family=Space+Grotesk:wght@500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
