# Agency Distribution Demo

An executive minimal demo platform for insurance agency distribution, showcasing four key operational areas:

- **Recruitment** - Candidate identification, screening, interview, onboarding, and lapse detection
- **Leads** - Lead generation, scoring, nurturing, and assignment
- **Sell** - Customer insights, protection analysis, needs prediction, and recommendations
- **Performance & Upskill** - Commission forecasting, performance tracking, and digital coaching

## Features

- Clean, minimal, corporate design
- Synthetic data for Singapore and Hong Kong markets
- Real-time location switching
- Comprehensive metrics and insights
- Responsive design
- **AI Multi-Agent Chat** - Claude Sonnet 4 powered intelligent assistant with specialized agents
  - Orchestrator that routes queries to specialized agents
  - Recruitment Specialist for candidate management
  - Leads Manager for pipeline optimization
  - Sales Intelligence for customer insights
  - Performance Coach for agent development
  - Real-time streaming responses
  - Multi-agent collaboration workflows

## Getting Started

### Installation

```bash
npm install
```

### Environment Configuration (Optional - for AI Chat)

The AI Multi-Agent Chat requires an Anthropic Claude API key. If you don't configure this, the regular demo pages will still work fine.

1. Create a `.env.local` file in the project root
2. Add your Anthropic API key:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
NEXT_PUBLIC_CLAUDE_MODEL=claude-sonnet-4-20250514
NEXT_PUBLIC_CLAUDE_API_URL=http://localhost:3333/api/claude
```

See [ENV_SETUP.md](./ENV_SETUP.md) for detailed instructions.

### Development

```bash
npm run dev
```

Open [http://localhost:3333](http://localhost:3333) in your browser.

### Build

```bash
npm run build
npm start
```

## Technology Stack

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS

## Project Structure

```
/app
  /api
    /claude       - Claude API proxy endpoint
    /agents       - Multi-agent orchestration API
  /recruitment    - Recruitment module
  /leads          - Leads module  
  /sell           - Sell module
  /performance    - Performance & upskill module
  /chat           - AI Multi-Agent Chat interface
  layout.tsx      - Root layout
  page.tsx        - Home page with 4 areas
  globals.css     - Global styles
/lib
  /agents
    types.ts               - Agent type definitions
    agent-definitions.ts   - Specialized agent configurations
    orchestrator.ts        - Multi-agent orchestration logic
  claude-api.ts            - Claude API client SDK
```

## AI Multi-Agent System

The platform includes an intelligent multi-agent system powered by Claude Sonnet 4:

### Orchestrator
Routes queries to the most appropriate specialist agent based on context and intent.

### Specialized Agents

1. **Recruitment Specialist** - Handles candidate identification, screening, and onboarding
2. **Leads Manager** - Manages lead generation, scoring, and conversion optimization
3. **Sales Intelligence** - Provides customer insights and product recommendations
4. **Performance Coach** - Tracks agent performance and provides development guidance

### Key Features

- Automatic query routing based on intent analysis
- Streaming responses for real-time feedback
- Multi-agent workflows for complex queries
- Context-aware responses using conversation history
- Location-specific data integration (Singapore/Hong Kong)

## Data

All data in this demo is synthetic and created for demonstration purposes only.

