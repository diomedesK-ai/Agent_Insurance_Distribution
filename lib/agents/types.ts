export interface AgentMessage {
  id: string;
  agentId: string;
  agentName: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  metadata?: {
    thinking?: string;
    confidence?: number;
    sources?: string[];
    handoff?: string; // Agent to hand off to
  };
}

export interface AgentCapability {
  name: string;
  description: string;
  examples: string[];
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  systemPrompt: string;
  capabilities: AgentCapability[];
  color: string;
  active: boolean;
}

export interface AgentContext {
  location: 'singapore' | 'hongkong';
  currentData?: any;
  conversationHistory: AgentMessage[];
}

export interface OrchestratorDecision {
  selectedAgent: string;
  reasoning: string;
  confidence: number;
  requiresMultipleAgents: boolean;
  agentSequence?: string[];
}

