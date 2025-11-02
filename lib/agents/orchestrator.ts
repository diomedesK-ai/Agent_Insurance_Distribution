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

You must route this query to ONE of these agents. The selectedAgent field must ONLY contain one of these exact values:
- "recruitment" - for hiring, candidates, interviews, onboarding, agent screening
- "leads" - for lead generation, qualification, nurturing, lead scoring
- "sell" - for sales, products, customers, cross-sell, coverage analysis
- "performance" - for agent performance, coaching, commissions, targets, forecasting
- "orchestrator" - for meetings, scheduling, general questions, multi-topic queries, or anything that doesn't fit above categories

IMPORTANT: 
- The selectedAgent value must be EXACTLY one of the 5 options above (no variations, no "none", no descriptions)
- For meeting/scheduling/calendar requests, ALWAYS use "orchestrator"
- For general queries or multi-topic questions, ALWAYS use "orchestrator"

Respond ONLY with valid JSON (no additional text):
{
  "selectedAgent": "one_of_the_five_options_above",
  "reasoning": "brief explanation",
  "confidence": 0.95,
  "requiresMultipleAgents": false
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

      console.log('🔍 Raw Routing Response:', response.substring(0, 500));

      // Parse JSON response - extract ONLY the JSON, ignore any surrounding text
      const jsonMatch = response.match(/\{[\s\S]*?\}/);
      if (jsonMatch) {
        try {
          const decision = JSON.parse(jsonMatch[0]) as OrchestratorDecision;
          
          console.log('📋 Parsed Routing Decision:', decision);
          
          // Safety check: if selectedAgent is invalid, default to orchestrator
          const validAgentIds = ['recruitment', 'leads', 'sell', 'performance', 'orchestrator'];
          
          // Clean up the selectedAgent field - extract just the agent ID
          let cleanedAgentId = decision.selectedAgent?.trim().toLowerCase() || '';
          
          // Remove any extra text like "none - requires clarification"
          if (cleanedAgentId.includes('none') || cleanedAgentId.includes('-') || cleanedAgentId.includes(' ')) {
            console.warn(`Cleaning invalid agent ID: "${cleanedAgentId}"`);
            cleanedAgentId = 'orchestrator';
          }
          
          // Validate it's one of the allowed IDs
          if (!validAgentIds.includes(cleanedAgentId)) {
            console.warn(`Invalid agent ID "${cleanedAgentId}" returned by routing. Defaulting to orchestrator.`);
            cleanedAgentId = 'orchestrator';
          }
          
          decision.selectedAgent = cleanedAgentId;
          console.log('✅ Final Selected Agent:', decision.selectedAgent);
          
          return decision;
        } catch (parseError) {
          console.error('❌ JSON Parse Error:', parseError);
          throw parseError;
        }
      }

      // Default fallback
      return {
        selectedAgent: 'orchestrator',
        reasoning: 'No JSON response from routing - defaulting to orchestrator for general handling',
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
      let isCleaningApplied = false;
      
      await this.llmApi.streamCompletion(
        messages,
        agent.systemPrompt,
        (chunk) => {
          fullResponse += chunk;
          
          // Clean routing JSON from streamed content
          const cleaned = this.cleanAgentResponse(fullResponse);
          if (cleaned !== fullResponse && !isCleaningApplied) {
            // Only log once when cleaning is applied
            console.log('🧹 Cleaned routing JSON from agent response');
            isCleaningApplied = true;
          }
          
          onChunk(chunk);
        },
        4096
      );
      return fullResponse;
    } else {
      // Non-streaming response
      const response = await this.llmApi.analyzeDocument(
        contextPrompt,
        userQuery,
        4096
      );
      return this.cleanAgentResponse(response);
    }
  }

  /**
   * Clean agent response to remove any routing metadata that shouldn't be shown to users
   */
  private cleanAgentResponse(response: string): string {
    // Remove any JSON objects that look like routing decisions
    const routingJsonPattern = /\{\s*"selectedAgent"\s*:\s*"[^"]*"[\s\S]*?\}/g;
    let cleaned = response.replace(routingJsonPattern, '');
    
    // Remove "Quick Action:" text if routing JSON was removed
    cleaned = cleaned.replace(/Quick Action:.*$/m, '').trim();
    
    // Remove any leftover multiple empty lines
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n');
    
    return cleaned.trim();
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

