'use client';

import { useEffect, useRef, useState } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export function MotionButton({
  onComplete,
}: {
  onComplete?: (status: Exclude<Status, 'idle' | 'loading'>) => void;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const run = (forceError = false) => {
    if (status === 'loading') return;
    if (timer.current) clearTimeout(timer.current);
    setStatus('loading');
    timer.current = setTimeout(() => {
      const next: Exclude<Status, 'idle' | 'loading'> = forceError
        ? 'error'
        : Math.random() < 0.2
          ? 'error'
          : 'success';
      setStatus(next);
      onComplete?.(next);
      timer.current = setTimeout(() => setStatus('idle'), 1800);
    }, 800 + Math.random() * 400);
  };

  const label =
    status === 'loading'
      ? 'SCORING…'
      : status === 'success'
        ? 'SCORED'
        : status === 'error'
          ? 'RETRY'
          : 'SCORE SCENE';

  const icon =
    status === 'success'
      ? '✓'
      : status === 'error'
        ? '↻'
        : status === 'loading'
          ? '◌'
          : '↗';

  return (
    <div className="motion-actions">
      <button
        className={`motion-button motion-${status}`}
        type="button"
        onClick={() => run()}
        disabled={status === 'loading'}
        aria-busy={status === 'loading'}
        aria-label={label}
      >
        <span className="motion-icon" aria-hidden="true">
          {icon}
        </span>
        <span>{label}</span>
      </button>
      <button
        className="ghost-button compact"
        type="button"
        onClick={() => run(true)}
        disabled={status === 'loading'}
      >
        Force error
      </button>
    </div>
  );
}
