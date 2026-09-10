import { streamText, stepCountIs } from 'ai';
import { openai } from '@ai-sdk/openai';
import { scoreSceneTool } from '@/lib/tool';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const prompt = typeof body?.messages?.[0]?.content === 'string'
    ? body.messages[0].content
    : typeof body?.prompt === 'string' ? body.prompt : '';

  if (!prompt.trim()) {
    return new Response('Please enter a message.', { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    const demo = `Demo mode: “${prompt.trim()}” — I would score the selected cut for pacing, contrast, and emotional intent. Try the Scene Scorer to see the typed tool lifecycle.`;
    const stream = new ReadableStream({
      start(controller) {
        const encoder = new TextEncoder();
        let i = 0;
        const tick = () => {
          if (i >= demo.length) return controller.close();
          controller.enqueue(encoder.encode(demo[i++]));
          setTimeout(tick, 12);
        };
        tick();
      },
    });
    return new Response(stream, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }

  try {
    const result = streamText({
      model: openai(process.env.OPENAI_MODEL || 'gpt-4o-mini'),
      system: 'You are the Cinema Lab creative assistant. Be concise. If the user asks to score a scene, use the scoreScene tool and explain the result in plain language.',
      prompt,
      tools: { scoreScene: scoreSceneTool },
      stopWhen: stepCountIs(3),
    });
    return result.toTextStreamResponse();
  } catch {
    return new Response('The assistant is temporarily unavailable. Retry the request.', { status: 503 });
  }
}
