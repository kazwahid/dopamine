import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { MotionButton } from '@/components/MotionButton';
import { Contact } from '@/components/Contact';
import { ToolCard } from '@/components/ToolCard';

describe('Primary flow primitives', () => {
  test('keyboard users can focus the main action via Tab', async () => {
    const user = userEvent.setup();
    render(<MotionButton />);
    await user.tab();
    expect(
      screen.getByRole('button', { name: /score scene/i })
    ).toHaveFocus();
  });

  test('completion callback reports error state on forced error', () => {
    vi.useFakeTimers();
    const onComplete = vi.fn();
    render(<MotionButton onComplete={onComplete} />);
    fireEvent.click(screen.getByRole('button', { name: /force error/i }));
    vi.advanceTimersByTime(1300);
    expect(onComplete).toHaveBeenCalledWith('error');
    vi.useRealTimers();
  });
});

describe('Validated Campaign Form Flow', () => {
  test('validates and submits inquiry via accessible labels and roles', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    // 1. Open form modal
    const openBtn = screen.getByRole('button', { name: /start a campaign/i });
    await user.click(openBtn);

    // 2. Locate input by placeholder/label text (query by role/label, not test ID)
    const emailInput = screen.getByPlaceholderText(/founder@brand.com/i);
    expect(emailInput).toBeRequired();

    // 3. Fill and submit
    await user.type(emailInput, 'director@dopamine.agency');
    const submitBtn = screen.getByRole('button', { name: /transmit campaign/i });
    await user.click(submitBtn);

    // 4. Assert feedback state
    expect(
      screen.getByText(/dispatch transmitted/i)
    ).toBeInTheDocument();
  });
});

describe('AI Route & Assistant States', () => {
  test('handles pending, streaming, and error states without hitting real API', async () => {
    // Mock AI route structured result
    const mockAiResponse = {
      title: 'Kinetic / focused',
      confidence: 0.94,
      tags: ['impact', 'contrast'],
      recommendation: 'Use for a fast opener.',
    };

    // 1. Pending / Input-streaming state
    const { rerender } = render(<ToolCard status="input-streaming" />);
    expect(screen.getByText(/reading the scene request/i)).toBeInTheDocument();

    // 2. Input validated / preparing state (query by exact string)
    rerender(<ToolCard status="input-available" />);
    expect(screen.getByText('input validated')).toBeInTheDocument();

    // 3. Output available with structured UI parts
    rerender(<ToolCard status="output-available" result={mockAiResponse} />);
    expect(screen.getByText('Kinetic / focused')).toBeInTheDocument();
    expect(screen.getByText(/94%/)).toBeInTheDocument();

    // 4. Designed error state with role alert
    rerender(<ToolCard status="output-error" error="Model stream interrupted. Retry available." />);
    const alert = screen.getByRole('alert');
    expect(alert).toHaveTextContent(/model stream interrupted/i);
  });
});
