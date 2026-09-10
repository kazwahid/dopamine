export type Scene = {
  id: string;
  title: string;
  kicker: string;
  src: string;
  poster: string;
  accent: 'violet' | 'cyan' | 'amber';
  description: string;
};

export type ToolStatus =
  | 'input-streaming'
  | 'input-available'
  | 'output-available'
  | 'output-error';

export type ToolResult = {
  title: string;
  confidence: number;
  tags: string[];
  recommendation: string;
};
