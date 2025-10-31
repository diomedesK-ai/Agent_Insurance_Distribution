# Multi-Agent AI System Guide

## Overview

The Agency Distribution Demo includes a sophisticated multi-agent AI system powered by Claude Sonnet 4. This system mimics a team of specialized consultants working together to answer your questions about agency operations.

## Architecture

### Orchestrator
The **Orchestrator** acts as the intelligent router and coordinator. When you ask a question, it:
1. Analyzes your query intent
2. Determines which specialist agent(s) should handle it
3. Routes the query to the appropriate agent
4. Can coordinate multi-agent workflows for complex questions

### Specialized Agents

#### 1. Recruitment Specialist (Blue)
**Expertise:** Agent recruitment and onboarding
- Candidate identification and screening
- Interview process management
- Onboarding and training
- Lapse detection and retention

**Example Questions:**
- "Show me the top candidates in Singapore"
- "Which candidates are ready for interview?"
- "What's the average match score for Hong Kong candidates?"
- "Create an onboarding plan for new agents"

#### 2. Leads Manager (Green)
**Expertise:** Lead generation and conversion
- Lead generation and source analysis
- Lead scoring and prioritization
- Nurturing strategies
- Lead-to-agent assignment optimization

**Example Questions:**
- "Which leads should we prioritize this week?"
- "What's our conversion rate in Hong Kong?"
- "Analyze high-scoring leads"
- "Recommend a nurturing strategy for new leads"

#### 3. Sales Intelligence (Purple)
**Expertise:** Customer insights and sales strategy
- Protection gap analysis
- Customer needs prediction
- Next best offer recommendations
- Product comparison and Q&A

**Example Questions:**
- "Show me customers with high protection gaps"
- "What product should we recommend to customers in Singapore?"
- "Analyze upsell opportunities"
- "Identify customers needing retirement planning"

#### 4. Performance Coach (Amber)
**Expertise:** Agent performance and development
- Performance tracking and forecasting
- Commission analysis
- Personalized coaching recommendations
- Target achievement strategies

**Example Questions:**
- "Who needs coaching this month?"
- "Forecast Q4 performance for Hong Kong agents"
- "Which agents are at risk of missing targets?"
- "Create a development plan for underperforming agents"

## How It Works

### Query Routing

1. **User Input:** You type a question in natural language
2. **Intent Analysis:** The orchestrator analyzes your query
3. **Agent Selection:** The most appropriate specialist is selected
4. **Response Generation:** The agent generates a streaming response
5. **Display:** You see which agent is responding in real-time

### Multi-Agent Workflows

For complex queries that span multiple domains, the orchestrator can:
- Activate multiple agents sequentially
- Pass context between agents
- Synthesize comprehensive responses

Example multi-domain query:
> "Show me high-potential candidates in Singapore and which leads they should be assigned to based on their skills"

This would activate:
1. **Recruitment Specialist** - Identifies high-potential candidates
2. **Leads Manager** - Analyzes lead characteristics
3. **Orchestrator** - Synthesizes optimal candidate-lead matching

## Using the Interface

### Sidebar - Agent Status

The left sidebar shows:
- **All available agents** with their roles
- **Active status** (green dot) - Agent has been used in conversation
- **Currently working** (pulsing blue dots) - Agent is generating a response
- **Location selector** - Switch between Singapore and Hong Kong data

### Main Chat Area

- **Welcome screen** shows example queries for each agent
- **Messages** display with color-coded agent badges
- **Streaming responses** show in real-time with typing indicator
- **Input field** accepts natural language queries

### Tips for Best Results

1. **Be Specific:** Mention locations (Singapore/Hong Kong) when relevant
2. **Use Domain Terms:** Keywords help with routing (candidates, leads, customers, performance)
3. **Ask Follow-ups:** The system maintains conversation context
4. **Request Details:** Ask for specific IDs, metrics, or recommendations

## Example Conversations

### Simple Query
```
You: "Show me top candidates in Singapore"
→ Recruitment Specialist activates
→ Provides candidate analysis with match scores, experience, skills
```

### Cross-Domain Query
```
You: "Which Singapore customers should we target for upselling, and which agents are best suited to handle them?"
→ Sales Intelligence analyzes high-value upsell opportunities
→ Performance Coach identifies top-performing agents
→ Orchestrator matches customers to agents
```

### Analysis Request
```
You: "Compare recruitment pipeline health between Singapore and Hong Kong"
→ Recruitment Specialist activates
→ Provides comparative analysis with metrics and insights
```

## Technical Details

### API Endpoints

- **`/api/claude`** - Direct Claude API proxy
- **`/api/agents`** - Multi-agent orchestration endpoint

### Request Format
```typescript
{
  query: string,                    // User's question
  location: 'singapore' | 'hongkong', // Data context
  conversationHistory: Message[],   // Previous messages
  stream: boolean,                  // Enable streaming
  agentId?: string                  // Optional: specify agent directly
}
```

### Response Format (Streaming)
```
data: {"type": "routing", "decision": {...}}
data: {"type": "agent-start", "agentId": "recruitment"}
data: {"type": "content", "chunk": "text"}
data: {"type": "agent-complete", "agentId": "recruitment"}
data: [DONE]
```

## System Prompts

Each agent has a specialized system prompt that defines:
- Domain expertise and responsibilities
- Data access and permissions
- Response format and style
- Citation requirements
- Professional tone and approach

The orchestrator uses a meta-prompt that includes:
- Available agents and their capabilities
- Routing decision framework
- Multi-agent workflow coordination
- Context management

## Context and Memory

The system maintains:
- **Conversation history** (last 10 messages for API calls)
- **Active agent status** (which agents have been used)
- **Location context** (Singapore or Hong Kong)
- **Current agent** (which agent is responding)

## Limitations and Notes

1. **API Key Required:** You must configure `ANTHROPIC_API_KEY` in `.env.local`
2. **Streaming Only:** The chat interface uses streaming responses for better UX
3. **Synthetic Data:** Agents work with demo data, not live production data
4. **Rate Limits:** Subject to Anthropic API rate limits
5. **Token Limits:** Complex queries may hit token limits (4096 tokens default)

## Extending the System

### Adding New Agents

1. Define agent in `lib/agents/agent-definitions.ts`
2. Add routing logic to orchestrator
3. Update UI with new agent color and status

### Customizing System Prompts

Edit the `systemPrompt` field in agent definitions to:
- Change expertise areas
- Adjust response style
- Add new capabilities
- Modify citation requirements

### Adding Data Sources

Integrate real data by:
1. Updating context building in orchestrator
2. Passing data through `AgentContext`
3. Including data in system prompts

## Troubleshooting

### "API Key not configured"
- Create `.env.local` with your Anthropic API key
- Restart the dev server

### Agent not responding
- Check browser console for errors
- Verify API key is valid
- Check Anthropic API status

### Slow responses
- Large queries take longer to process
- Streaming provides incremental feedback
- Consider adjusting `maxTokens` parameter

### Wrong agent selected
- Use domain-specific keywords
- Be more explicit about your intent
- Specify agent directly if needed

## Future Enhancements

Potential additions to the multi-agent system:
- **Voice input/output**
- **Document upload and analysis**
- **Multi-agent debate and consensus**
- **Long-term memory across sessions**
- **Integration with real data sources**
- **Proactive agent suggestions**
- **Performance analytics dashboard**

---

For setup instructions, see [ENV_SETUP.md](./ENV_SETUP.md)

For demo features, see [DEMO_GUIDE.md](./DEMO_GUIDE.md)

