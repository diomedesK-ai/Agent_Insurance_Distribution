'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ALL_AGENTS, getAgentById } from '@/lib/agents/agent-definitions';
import { AgentMessage } from '@/lib/agents/types';

interface Message extends AgentMessage {
  isStreaming?: boolean;
}

interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  location: 'singapore' | 'hongkong';
}

export default function ChatDrawer({ isOpen, onClose, location }: ChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeAgents, setActiveAgents] = useState<Set<string>>(new Set());
  const [currentAgent, setCurrentAgent] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      agentId: 'user',
      agentName: 'You',
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: input,
          location: location,
          conversationHistory: messages.slice(-10),
          stream: true
        }),
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
      let currentResponseId = Date.now().toString() + '-response';
      let responseContent = '';
      let responseAgentId = 'orchestrator';

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

              if (parsed.type === 'routing') {
                responseAgentId = parsed.decision.selectedAgent;
                setCurrentAgent(responseAgentId);
                setActiveAgents(prev => new Set([...prev, responseAgentId]));
              } else if (parsed.type === 'agent-start') {
                responseAgentId = parsed.agentId;
                setCurrentAgent(parsed.agentId);
                setActiveAgents(prev => new Set([...prev, parsed.agentId]));
              } else if (parsed.type === 'content') {
                responseContent += parsed.chunk;
                
                setMessages(prev => {
                  const existing = prev.find(m => m.id === currentResponseId);
                  if (existing) {
                    return prev.map(m =>
                      m.id === currentResponseId
                        ? { ...m, content: responseContent, isStreaming: true }
                        : m
                    );
                  } else {
                    const agent = getAgentById(responseAgentId);
                    return [
                      ...prev,
                      {
                        id: currentResponseId,
                        agentId: responseAgentId,
                        agentName: agent?.name || 'Agent',
                        role: 'assistant' as const,
                        content: responseContent,
                        timestamp: new Date(),
                        isStreaming: true
                      }
                    ];
                  }
                });
              } else if (parsed.type === 'agent-complete') {
                setMessages(prev =>
                  prev.map(m =>
                    m.id === currentResponseId
                      ? { ...m, isStreaming: false }
                      : m
                  )
                );
                setCurrentAgent(null);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      setCurrentAgent(null);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: Date.now().toString() + '-error',
        agentId: 'system',
        agentName: 'System',
        role: 'assistant',
        content: 'Sorry, there was an error. Please ensure ANTHROPIC_API_KEY is configured.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const getAgentColor = (agentId: string) => {
    const agent = getAgentById(agentId);
    return agent?.color || 'slate';
  };

  const getAgentBadgeClasses = (agentId: string) => {
    const color = getAgentColor(agentId);
    const colorMap: Record<string, string> = {
      blue: 'bg-black border-2 border-blue-500 text-blue-400',
      green: 'bg-black border-2 border-green-500 text-green-400',
      purple: 'bg-black border-2 border-purple-500 text-purple-400',
      amber: 'bg-black border-2 border-amber-500 text-amber-400',
      slate: 'bg-black border-2 border-slate-500 text-slate-400'
    };
    return colorMap[color] || colorMap.slate;
  };

  const getAgentGradientClasses = (agentId: string) => {
    const color = getAgentColor(agentId);
    const gradientMap: Record<string, string> = {
      blue: 'from-blue-500 via-blue-400 to-cyan-400',
      green: 'from-green-500 via-emerald-400 to-teal-400',
      purple: 'from-purple-500 via-fuchsia-400 to-pink-400',
      amber: 'from-amber-500 via-yellow-400 to-orange-400',
      slate: 'from-slate-500 via-slate-400 to-slate-300'
    };
    return gradientMap[color] || gradientMap.slate;
  };

  const specialists = ALL_AGENTS.filter(a => a.id !== 'orchestrator');

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full md:w-[500px] bg-background border-l border-border z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">AI Assistant</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Agent Pills */}
          <div className="px-4 py-3 border-b border-border bg-card">
            <div className="text-xs text-muted-foreground mb-2 font-medium">Specialized Agents</div>
            <div className="flex flex-wrap gap-2">
              {specialists.map((agent) => {
                const isActive = activeAgents.has(agent.id);
                const isCurrent = currentAgent === agent.id;

                return (
                  <div
                    key={agent.id}
                    className="relative group"
                  >
                    {/* Gradient border wrapper */}
                    <div className={`rounded-full p-[2px] ${
                      isCurrent || isActive
                        ? `bg-gradient-to-r ${getAgentGradientClasses(agent.id)}`
                        : 'bg-border'
                    }`}>
                      <div
                        className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                          isCurrent
                            ? 'bg-black text-white animate-pulse'
                            : isActive
                            ? 'bg-black text-white'
                            : 'bg-background text-muted-foreground hover:bg-accent'
                        }`}
                      >
                        {agent.name}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center mt-12">
                <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm font-medium text-foreground mb-2">AI Multi-Agent Assistant</div>
                <div className="text-xs text-muted-foreground mb-6">
                  Ask questions about your agency operations
                </div>
                <div className="grid grid-cols-1 gap-2 text-left max-w-sm mx-auto">
                  {[
                    'Top candidates in ' + (location === 'singapore' ? 'Singapore' : 'Hong Kong'),
                    'High-priority leads to follow up',
                    'Protection gaps analysis',
                    'Agents needing coaching'
                  ].map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => setInput(suggestion)}
                      className="p-3 text-xs bg-card border border-border rounded-lg hover:bg-accent transition-colors text-left"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className={`text-xs font-medium mb-2 ${getAgentBadgeClasses(message.agentId)} inline-block px-2 py-0.5 rounded-full`}>
                      {message.agentName}
                    </div>
                  )}
                  <div className={`text-sm prose prose-sm max-w-none ${
                    message.role === 'user' 
                      ? 'text-primary-foreground prose-headings:text-primary-foreground prose-p:text-primary-foreground prose-strong:text-primary-foreground prose-li:text-primary-foreground prose-ul:text-primary-foreground' 
                      : 'text-foreground dark:prose-invert prose-headings:text-foreground prose-p:text-foreground prose-strong:font-bold prose-ul:my-2 prose-li:my-1'
                  }`}>
                    {message.role === 'assistant' ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </ReactMarkdown>
                    ) : (
                      message.content
                    )}
                    {message.isStreaming && (
                      <span className="inline-block w-1 h-4 bg-current ml-1 animate-pulse" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Ask anything about your agency..."
                className="flex-1 px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                disabled={loading}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="text-xs text-muted-foreground mt-2 text-center">
              Powered by Claude Sonnet 4 · Location: {location === 'singapore' ? 'Singapore' : 'Hong Kong'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

