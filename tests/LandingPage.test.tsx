import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Home from '@/app/page';

describe('Landing Page Suite', () => {
  test('renders skip link and main landmark container', () => {
    render(<Home />);

    expect(
      screen.getByRole('link', { name: /skip to main content/i })
    ).toBeInTheDocument();

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('renders hero section and studio footer without contact section', () => {
    render(<Home />);

    expect(screen.getByLabelText(/global site navigation/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/hero section/i)).toBeInTheDocument();
    expect(screen.queryByLabelText(/contact section/i)).not.toBeInTheDocument();
    expect(screen.getByLabelText(/studio footer/i)).toBeInTheDocument();
  });
});
