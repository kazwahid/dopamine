import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { MotionButton } from '@/components/MotionButton';

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
