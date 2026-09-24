import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { Footer } from '@/components/Footer';

describe('Studio Footer Component', () => {
  test('renders the monumental giant dopamine title at the bottom', () => {
    const { container } = render(<Footer />);

    // Renders the giant brand title linking to home
    const brandLink = screen.getByRole('link', { name: /dopamine home/i });
    expect(brandLink).toBeInTheDocument();
    expect(brandLink).toHaveTextContent(/dopamine/i);

    // Verify &nearr (↗) does not exist anywhere in the footer
    expect(container.textContent).not.toContain('↗');
    expect(container.innerHTML).not.toContain('&nearr;');
  });

  test('does not render initiate collaboration, get in touch, about studio, or credits', () => {
    render(<Footer />);

    // Initiate collaboration section is removed
    expect(screen.queryByRole('heading', { name: /let's make an impact together/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/initiate collaboration/i)).not.toBeInTheDocument();

    // Get in touch and newsletter sections are removed
    expect(screen.queryByText(/get in touch/i)).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText(/enter your email/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/newsletter/i)).not.toBeInTheDocument();

    // About Studio and Credits links are removed per user request
    expect(screen.queryByText(/about studio/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/credits/i)).not.toBeInTheDocument();

    // Legacy columns and cities are not present
    expect(screen.queryByText('(a.)')).not.toBeInTheDocument();
    expect(screen.queryByText(/london/i)).not.toBeInTheDocument();
  });

  test('renders sleek social channels, direct email, studio descriptor and back to top without arrows', () => {
    render(<Footer />);

    expect(screen.getByRole('link', { name: 'Instagram' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Twitter / X' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'LinkedIn' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'TikTok' })).toBeInTheDocument();

    expect(screen.getByText(/direct inquiries/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /contact@dopamine\.agency/i })).toBeInTheDocument();
    expect(screen.getByText(/dopamine studio/i)).toBeInTheDocument();
    expect(screen.getByText(/\[ © 2026 \]/i)).toBeInTheDocument();
    expect(screen.getByText(/all rights reserved/i)).toBeInTheDocument();
    expect(screen.queryByText(/dopamine studio inc/i)).not.toBeInTheDocument();
  });

  test('triggers smooth scroll to top when clicking back to top', async () => {
    const user = userEvent.setup();
    render(<Footer />);

    const topBtn = screen.getByRole('button', { name: /scroll to top of page/i });
    await user.click(topBtn);

    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });
});



