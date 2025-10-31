export interface Message {
  role: 'user' | 'assistant';
  content: string | Array<{
    type: 'text' | 'image' | 'document';
    text?: string;
    source?: {
      type: 'base64';
      media_type: string;
      data: string;
    };
  }>;
}

export interface StreamCallback {
  (chunk: string): void;
}

export class LLMApi {
  private static instance: LLMApi;
  private apiKey: string;
  private apiUrl: string;
  private model: string;

  private constructor() {
    this.apiKey = process.env.ANTHROPIC_API_KEY || '';
    this.apiUrl = 'https://api.anthropic.com/v1/messages';
    this.model = 'claude-sonnet-4-20250514';
  }

  public static getInstance(): LLMApi {
    if (!LLMApi.instance) {
      LLMApi.instance = new LLMApi();
    }
    return LLMApi.instance;
  }

  /**
   * Stream completion with Server-Sent Events
   */
  async streamCompletion(
    messages: Message[],
    systemPrompt: string,
    onChunk: StreamCallback,
    maxTokens: number = 4096
  ): Promise<void> {
    if (!this.apiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const requestBody: any = {
      model: this.model,
      max_tokens: maxTokens,
      messages: messages,
      stream: true
    };

    if (systemPrompt) {
      requestBody.system = systemPrompt;
    }

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('No reader available');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data);
              
              if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                onChunk(parsed.delta.text);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  /**
   * Non-streaming completion
   */
  async analyzeDocument(
    content: string,
    prompt: string,
    maxTokens: number = 4096
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const messages: Message[] = [
      {
        role: 'user',
        content: `${prompt}\n\nDocument content:\n${content}`
      }
    ];

    const requestBody: any = {
      model: this.model,
      max_tokens: maxTokens,
      messages: messages,
      stream: false
    };

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.content?.[0]?.text || '';
  }

  /**
   * Multimodal document analysis (PDFs, images)
   */
  async analyzeDocumentMultimodal(
    fileBuffer: ArrayBuffer,
    fileName: string,
    mimeType: string,
    prompt: string,
    maxTokens: number = 4096
  ): Promise<string> {
    if (!this.apiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    const base64Data = Buffer.from(fileBuffer).toString('base64');
    const contentType = mimeType.startsWith('image/') ? 'image' : 'document';

    const messages: Message[] = [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: prompt
          },
          {
            type: contentType as 'image' | 'document',
            source: {
              type: 'base64',
              media_type: mimeType,
              data: base64Data
            }
          }
        ]
      }
    ];

    const requestBody: any = {
      model: this.model,
      max_tokens: maxTokens,
      messages: messages,
      stream: false
    };

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.content?.[0]?.text || '';
  }
}

