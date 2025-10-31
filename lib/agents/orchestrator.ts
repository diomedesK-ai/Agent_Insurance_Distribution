import { LLMApi, Message } from '../claude-api';
import { AgentMessage, AgentContext, OrchestratorDecision, Agent } from './types';
import { getAgentById, ORCHESTRATOR_AGENT } from './agent-definitions';
import { getDataContext, formatDataForAgent } from '../data-context';

export class AgentOrchestrator {
  private llmApi: LLMApi;

  constructor() {
    this.llmApi = LLMApi.getInstance();
  }

  /**
   * Route a user query to the appropriate agent(s)
   */
  async routeQuery(
    userQuery: string,
    context: AgentContext
  ): Promise<OrchestratorDecision> {
    const routingPrompt = `
Context:
- Location: ${context.location}
- Conversation history: ${context.conversationHistory.length} messages

User Query: "${userQuery}"

Analyze this query and determine:
1. Which specialized agent should handle it? (recruitment, leads, sell, performance)
2. Does it require multiple agents working together?
3. What's your confidence level?

Respond in JSON format:
{
  "selectedAgent": "agent_id",
  "reasoning": "explanation",
  "confidence": 0.95,
  "requiresMultipleAgents": false,
  "agentSequence": ["agent1", "agent2"]
}`;

    try {
      const messages: Message[] = [
        {
          role: 'user',
          content: routingPrompt
        }
      ];

      const response = await this.llmApi.analyzeDocument(
        '',
        routingPrompt,
        1024
      );

      // Parse JSON response
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const decision = JSON.parse(jsonMatch[0]);
        return decision as OrchestratorDecision;
      }

      // Default fallback
      return {
        selectedAgent: 'recruitment',
        reasoning: 'Defaulting to recruitment agent',
        confidence: 0.5,
        requiresMultipleAgents: false
      };
    } catch (error) {
      console.error('Orchestrator routing error:', error);
      // Fallback to simple keyword matching
      return this.simpleRouting(userQuery);
    }
  }

  /**
   * Execute a query with a specific agent
   */
  async executeWithAgent(
    agentId: string,
    userQuery: string,
    context: AgentContext,
    onChunk?: (chunk: string) => void
  ): Promise<string> {
    const agent = getAgentById(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }

    // Build context-aware prompt
    const contextPrompt = this.buildContextPrompt(context);
    
    const messages: Message[] = [
      ...this.convertHistoryToMessages(context.conversationHistory),
      {
        role: 'user',
        content: `${contextPrompt}\n\nUser Query: ${userQuery}`
      }
    ];

    if (onChunk) {
      // Streaming response
      let fullResponse = '';
      await this.llmApi.streamCompletion(
        messages,
        agent.systemPrompt,
        (chunk) => {
          fullResponse += chunk;
          onChunk(chunk);
        },
        4096
      );
      return fullResponse;
    } else {
      // Non-streaming response
      return await this.llmApi.analyzeDocument(
        contextPrompt,
        userQuery,
        4096
      );
    }
  }

  /**
   * Execute a multi-agent workflow
   */
  async executeMultiAgentWorkflow(
    agentSequence: string[],
    userQuery: string,
    context: AgentContext,
    onAgentStart?: (agentId: string) => void,
    onAgentComplete?: (agentId: string, response: string) => void
  ): Promise<Map<string, string>> {
    const results = new Map<string, string>();
    let accumulatedContext = userQuery;

    for (const agentId of agentSequence) {
      if (onAgentStart) {
        onAgentStart(agentId);
      }

      const response = await this.executeWithAgent(
        agentId,
        accumulatedContext,
        context
      );

      results.set(agentId, response);
      
      if (onAgentComplete) {
        onAgentComplete(agentId, response);
      }

      // Add this agent's response to context for next agent
      accumulatedContext += `\n\n[${agentId} Analysis]:\n${response}`;
    }

    return results;
  }

  /**
   * Simple keyword-based routing as fallback
   */
  private simpleRouting(query: string): OrchestratorDecision {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('candidate') || lowerQuery.includes('recruit') || 
        lowerQuery.includes('onboard') || lowerQuery.includes('interview')) {
      return {
        selectedAgent: 'recruitment',
        reasoning: 'Query contains recruitment keywords',
        confidence: 0.8,
        requiresMultipleAgents: false
      };
    }

    if (lowerQuery.includes('lead') || lowerQuery.includes('prospect') || 
        lowerQuery.includes('conversion') || lowerQuery.includes('nurtur')) {
      return {
        selectedAgent: 'leads',
        reasoning: 'Query contains lead management keywords',
        confidence: 0.8,
        requiresMultipleAgents: false
      };
    }

    if (lowerQuery.includes('customer') || lowerQuery.includes('sell') || 
        lowerQuery.includes('product') || lowerQuery.includes('coverage') ||
        lowerQuery.includes('protection gap')) {
      return {
        selectedAgent: 'sell',
        reasoning: 'Query contains sales keywords',
        confidence: 0.8,
        requiresMultipleAgents: false
      };
    }

    if (lowerQuery.includes('performance') || lowerQuery.includes('commission') || 
        lowerQuery.includes('target') || lowerQuery.includes('coach') ||
        lowerQuery.includes('forecast')) {
      return {
        selectedAgent: 'performance',
        reasoning: 'Query contains performance keywords',
        confidence: 0.8,
        requiresMultipleAgents: false
      };
    }

    // Default to orchestrator for complex queries
    return {
      selectedAgent: 'orchestrator',
      reasoning: 'Query requires analysis to determine appropriate agent',
      confidence: 0.6,
      requiresMultipleAgents: false
    };
  }

  /**
   * Build context prompt from current state
   */
  private buildContextPrompt(context: AgentContext): string {
    const dataContext = getDataContext(context.location);
    const formattedData = formatDataForAgent(dataContext);
    
    return `
Current Context:
- Location: ${context.location === 'singapore' ? 'Singapore' : 'Hong Kong'}
- Recent conversation: ${context.conversationHistory.slice(-3).map(m => `${m.agentName}: ${m.content.substring(0, 100)}...`).join('\n')}

${formattedData}

IMPORTANT: Always reference specific IDs, names, and data points from the above data. Provide concrete, actionable recommendations with specific examples from the actual data.`;
  }

  /**
   * Convert conversation history to Claude API format
   */
  private convertHistoryToMessages(history: AgentMessage[]): Message[] {
    return history.slice(-10).map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }
}

