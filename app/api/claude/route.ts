import { NextRequest, NextResponse } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    model: MODEL,
    configured: !!ANTHROPIC_API_KEY,
    timestamp: new Date().toISOString()
  });
}

export async function POST(req: NextRequest) {
  try {
    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: 'ANTHROPIC_API_KEY not configured' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { messages, systemPrompt, stream = true, maxTokens = 4096 } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    const requestBody: any = {
      model: MODEL,
      max_tokens: maxTokens,
      messages: messages,
      stream: stream
    };

    if (systemPrompt) {
      requestBody.system = systemPrompt;
    }

    const response = await fetch(ANTHROPIC_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Anthropic API error:', error);
      return NextResponse.json(
        { error: 'Failed to call Anthropic API', details: error },
        { status: response.status }
      );
    }

    if (stream) {
      // Return streaming response
      return new NextResponse(response.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    } else {
      // Return non-streaming response
      const data = await response.json();
      return NextResponse.json(data);
    }
  } catch (error: any) {
    console.error('Error in Claude API route:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

