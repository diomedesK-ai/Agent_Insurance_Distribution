import { NextRequest, NextResponse } from 'next/server';
import { AgentOrchestrator } from '@/lib/agents/orchestrator';
import { AgentContext, AgentMessage } from '@/lib/agents/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      query,
      agentId,
      location = 'singapore',
      conversationHistory = [],
      stream = true,
      multiAgent = false
    } = body;

    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    const orchestrator = new AgentOrchestrator();
    const context: AgentContext = {
      location,
      conversationHistory: conversationHistory as AgentMessage[]
    };

    // If no agent specified, route the query
    if (!agentId) {
      const decision = await orchestrator.routeQuery(query, context);
      
      if (decision.requiresMultipleAgents && decision.agentSequence) {
        // Execute multi-agent workflow
        const results = await orchestrator.executeMultiAgentWorkflow(
          decision.agentSequence,
          query,
          context
        );

        return NextResponse.json({
          type: 'multi-agent',
          decision,
          results: Object.fromEntries(results)
        });
      } else {
        // Execute with single agent - default to orchestrator if none selected
        const selectedAgentId = decision.selectedAgent || 'orchestrator';
        
        if (stream) {
          return streamSingleAgent(
            orchestrator,
            selectedAgentId,
            query,
            context,
            decision
          );
        } else {
          const response = await orchestrator.executeWithAgent(
            selectedAgentId,
            query,
            context
          );

          return NextResponse.json({
            type: 'single-agent',
            agentId: selectedAgentId,
            decision,
            response
          });
        }
      }
    } else {
      // Execute with specified agent
      if (stream) {
        return streamSingleAgent(orchestrator, agentId, query, context);
      } else {
        const response = await orchestrator.executeWithAgent(
          agentId,
          query,
          context
        );

        return NextResponse.json({
          type: 'single-agent',
          agentId,
          response
        });
      }
    }
  } catch (error: any) {
    console.error('Error in agents API route:', error);
    return NextResponse.json(
      { error: 'Internal server error', message: error.message },
      { status: 500 }
    );
  }
}

function streamSingleAgent(
  orchestrator: AgentOrchestrator,
  agentId: string,
  query: string,
  context: AgentContext,
  decision?: any
) {
  const encoder = new TextEncoder();
  
  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Send initial metadata
        if (decision) {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({
                type: 'routing',
                decision
              })}\n\n`
            )
          );
        }

        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: 'agent-start',
              agentId
            })}\n\n`
          )
        );

        // Stream the response
        await orchestrator.executeWithAgent(
          agentId,
          query,
          context,
          (chunk) => {
            controller.enqueue(
              encoder.encode(
                `data: ${JSON.stringify({
                  type: 'content',
                  chunk
                })}\n\n`
              )
            );
          }
        );

        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              type: 'agent-complete',
              agentId
            })}\n\n`
          )
        );

        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    }
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

