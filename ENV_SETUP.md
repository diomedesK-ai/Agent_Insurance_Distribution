# Environment Setup

## Setting Up Your API Key

To use the AI Multi-Agent Chat feature, you need to configure your Anthropic Claude API key.

### Step 1: Get Your API Key

1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy your API key (it starts with `sk-ant-`)

### Step 2: Create Environment File

Create a file named `.env.local` in the root of the project:

```bash
cp .env.example .env.local
```

### Step 3: Add Your API Key

Edit `.env.local` and replace `sk-ant-your-key-here` with your actual API key:

```env
ANTHROPIC_API_KEY=sk-ant-your-actual-key-here
NEXT_PUBLIC_CLAUDE_MODEL=claude-sonnet-4-20250514
NEXT_PUBLIC_CLAUDE_API_URL=http://localhost:3333/api/claude
```

### Step 4: Restart the Development Server

After adding your API key, restart the dev server:

```bash
npm run dev
```

## Verifying the Setup

1. Navigate to the AI Multi-Agent Chat page
2. Try asking a question like "Show me top candidates in Singapore"
3. The orchestrator should route your query to the appropriate agent

## Without API Key

If you don't configure the API key:
- The regular demo pages (Recruitment, Leads, Sell, Performance) will work fine
- The AI Multi-Agent Chat will show an error message when you try to send messages
- All synthetic data visualization features work without an API key

## Security Notes

- Never commit your `.env.local` file to version control
- The `.env.local` file is already in `.gitignore`
- Keep your API key secure and don't share it publicly

