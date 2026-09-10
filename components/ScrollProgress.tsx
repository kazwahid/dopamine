'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

interface ScrollProgressProps {
  currentReel?: number;
  totalReels?: number;
  onSelectReel?: (index: number) => void;
  reelTitles?: string[];
}

export function ScrollProgress({
  currentReel = 0,
  totalReels = 6,
  onSelectReel,
}: ScrollProgressProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const progress = totalReels > 1 ? currentReel / (totalReels - 1) : 0;

  const handlePointer = useCallback(
    (clientX: number) => {
      if (!trackRef.current || !onSelectReel) return;
      const rect = trackRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const ratio = x / rect.width;
      const targetReel = Math.round(ratio * (totalReels - 1));
      onSelectReel(targetReel);
    },
    [onSelectReel, totalReels]
  );

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handlePointer(e.clientX);
  };

  useEffect(() => {
    if (!isDragging) return;
    const onMouseMove = (e: MouseEvent) => handlePointer(e.clientX);
    const onMouseUp = () => setIsDragging(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDragging, handlePointer]);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        className="scroll-progress-scrubber"
      >
        <div
          className="scroll-progress-fill"
          style={{
            width: `${Math.max(1, progress * 100)}%`,
            transform: progress === 0 ? 'scaleX(0)' : undefined,
          }}
        />
      </div>
    </div>
  );
}
