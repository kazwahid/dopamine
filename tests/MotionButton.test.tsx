import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { MotionButton } from '@/components/MotionButton';

describe('MotionButton', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('renders an accessible button in idle state', () => {
    render(<MotionButton />);
    expect(
      screen.getByRole('button', { name: /score scene/i })
    ).toBeInTheDocument();
  });

  test('enters loading then resolves to success or error', () => {
    render(<MotionButton />);
    fireEvent.click(screen.getByRole('button', { name: /score scene/i }));
    expect(screen.getByRole('button', { name: /scoring/i })).toHaveAttribute(
      'aria-busy',
      'true'
    );
    act(() => {
      vi.advanceTimersByTime(1300);
    });
    const resolved = screen.getByRole('button', {
      name: /scored|retry/i,
    });
    expect(resolved).toBeInTheDocument();
  });

  test('exposes a deliberate error trigger', () => {
    render(<MotionButton />);
    expect(
      screen.getByRole('button', { name: /force error/i })
    ).toBeInTheDocument();
  });

  test('disables during loading to prevent double clicks', () => {
    render(<MotionButton />);
    fireEvent.click(screen.getByRole('button', { name: /score scene/i }));
    expect(screen.getByRole('button', { name: /scoring/i })).toBeDisabled();
  });

  test('returns to idle after success/error', () => {
    render(<MotionButton />);
    fireEvent.click(screen.getByRole('button', { name: /score scene/i }));
    act(() => {
      vi.advanceTimersByTime(1300);
    });
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(
      screen.getByRole('button', { name: /score scene/i })
    ).toBeInTheDocument();
  });
});
