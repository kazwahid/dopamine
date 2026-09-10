import { tool } from 'ai';
import { z } from 'zod';

export const scoreSceneTool = tool({
  title: 'Score a scene',
  description: 'Scores a cinematic scene brief and returns a small structured result for the UI.',
  inputSchema: z.object({
    scene: z.enum(['ring', 'morning']).describe('The scene to score.'),
    goal: z.string().min(3).max(120).describe('What the user wants the scene to communicate.'),
  }),
  outputSchema: z.object({
    title: z.string(),
    confidence: z.number(),
    tags: z.array(z.string()),
    recommendation: z.string(),
  }),
  execute: async ({ scene, goal }) => {
    if (goal.toLowerCase().includes('fail')) {
      throw new Error('The demo tool was intentionally sabotaged. Retry with a different goal.');
    }
    const ring = scene === 'ring';
    return {
      title: ring ? 'Kinetic / focused' : 'Warm / introspective',
      confidence: ring ? 0.94 : 0.91,
      tags: ring ? ['impact', 'contrast', 'momentum'] : ['soft light', 'breath', 'memory'],
      recommendation: ring
        ? 'Use for a fast opener or a confident transition.'
        : 'Use as a slower reset, reflection beat, or closing image.',
    };
  },
});
