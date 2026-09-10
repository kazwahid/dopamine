'use client';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      className="section"
      style={{
        minHeight: '80vh',
        display: 'grid',
        placeItems: 'center',
        textAlign: 'center',
      }}
    >
      <div>
        <p className="eyebrow">RECOVERY STATE</p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: 'clamp(36px, 5vw, 56px)',
            letterSpacing: '-0.03em',
            margin: '16px 0 12px',
            textTransform: 'uppercase',
          }}
        >
          Something broke the flow.
        </h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: 420, margin: '0 auto 28px' }}>
          The page hit an unexpected error. Your progress is safe — hit retry
          to pick up where you left off.
        </p>
        <button className="primary-button" onClick={() => reset()}>
          Try again
        </button>
      </div>
    </main>
  );
}
