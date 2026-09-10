'use client';

import type { ToolResult, ToolStatus } from '@/lib/types';

const statusLabel: Record<ToolStatus, string> = {
  'input-streaming': 'streaming input',
  'input-available': 'input validated',
  'output-available': 'output ready',
  'output-error': 'tool error',
};

export function ToolCard({
  status,
  result,
  error,
}: {
  status: ToolStatus;
  result?: ToolResult;
  error?: string;
}) {
  return (
    <section
      className={`tool-card tool-${status}`}
      aria-labelledby="tool-card-title"
    >
      <div className="tool-head">
        <div>
          <span className="eyebrow">GEN UI / TOOL</span>
          <h3 id="tool-card-title">Scene intelligence</h3>
        </div>
        <span className="status-pill">{statusLabel[status]}</span>
      </div>

      {status === 'input-streaming' && (
        <p className="tool-copy">Reading the scene request…</p>
      )}

      {status === 'input-available' && (
        <p className="tool-copy">Input validated. Preparing the scorer.</p>
      )}

      {status === 'output-error' && (
        <div className="tool-error" role="alert">
          <strong>Tool failed.</strong>
          <span>{error ?? 'Something went wrong.'}</span>
        </div>
      )}

      {status === 'output-available' && result && (
        <div className="result-grid">
          <div>
            <span className="metric-label">READ</span>
            <strong>{result.title}</strong>
          </div>
          <div>
            <span className="metric-label">CONFIDENCE</span>
            <strong>{Math.round(result.confidence * 100)}%</strong>
          </div>
          <div className="result-wide">
            <span className="metric-label">TAGS</span>
            <div className="tag-row">
              {result.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <p className="result-wide recommendation">
            {result.recommendation}
          </p>
        </div>
      )}
    </section>
  );
}
