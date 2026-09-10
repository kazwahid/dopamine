import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ToolCard } from '@/components/ToolCard';

describe('ToolCard', () => {
  test('renders input streaming state', () => {
    render(<ToolCard status="input-streaming" />);
    expect(
      screen.getByText(/reading the scene request/i)
    ).toBeInTheDocument();
  });

  test('renders validated input state', () => {
    render(<ToolCard status="input-available" />);
    expect(screen.getByText('input validated')).toBeInTheDocument();
  });

  test('renders structured output as UI components', () => {
    render(
      <ToolCard
        status="output-available"
        result={{
          title: 'Kinetic / focused',
          confidence: 0.94,
          tags: ['impact', 'contrast'],
          recommendation: 'Use it for the opener.',
        }}
      />
    );
    expect(screen.getByText(/94%/)).toBeInTheDocument();
    expect(screen.getByText('impact')).toBeInTheDocument();
    expect(screen.getByText('contrast')).toBeInTheDocument();
  });

  test('renders a designed tool error with alert role', () => {
    render(<ToolCard status="output-error" error="Timeout" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Timeout');
  });
});
