import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ScrollProgress } from '@/components/ScrollProgress';

describe('ScrollProgress', () => {
  test('renders an aria-hidden scroll indicator', () => {
    render(<ScrollProgress />);
    const el = document.querySelector('.scroll-progress');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('aria-hidden', 'true');
  });

  test('initializes with zero scale', () => {
    render(<ScrollProgress />);
    const fill = document.querySelector('.scroll-progress-fill') as HTMLElement;
    expect(fill.style.transform).toBe('scaleX(0)');
  });
});
