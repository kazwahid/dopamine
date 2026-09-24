import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Contact } from '@/components/Contact';

describe('Contact Section Suite', () => {
  test('renders CONTACT US headline and section container without overflow clipping', () => {
    render(<Contact />);

    const section = screen.getByLabelText(/contact section/i);
    expect(section).toBeInTheDocument();
    // Verify overflow-hidden is not present on the section so typography cannot be truncated
    expect(section.className).not.toContain('overflow-hidden');

    const contactHeading = screen.getByRole('heading', { level: 1, name: /contact us/i });
    expect(contactHeading).toBeInTheDocument();

    // Verify arrow indicator is present
    expect(screen.getByText('↳')).toBeInTheDocument();
  });

  test('renders DIRECT INQUIRIES link with proper mailto target', () => {
    render(<Contact />);

    expect(screen.getByText(/direct inquiries/i)).toBeInTheDocument();
    const mailtoLink = screen.getByRole('link', { name: /contact@dopamine\.agency/i });
    expect(mailtoLink).toBeInTheDocument();
    expect(mailtoLink).toHaveAttribute('href', 'mailto:contact@dopamine.agency');
  });

  test('opens campaign modal on START A CAMPAIGN click and handles form submission', async () => {
    render(<Contact />);

    const startBtn = screen.getByRole('button', { name: /start a campaign/i });
    expect(startBtn).toBeInTheDocument();

    fireEvent.click(startBtn);

    // Modal should now be open
    expect(screen.getByText(/campaign inquiry/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();

    const emailInput = screen.getByLabelText(/your email/i);
    fireEvent.change(emailInput, { target: { value: 'creator@cinema.com' } });

    const submitBtn = screen.getByRole('button', { name: /transmit campaign/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/dispatch transmitted/i);
    });
  });
});
